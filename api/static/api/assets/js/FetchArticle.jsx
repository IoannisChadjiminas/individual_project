var React = require('react')
var ReactDOM = require('react-dom')
var url= require('locutus/php/url')
var auth = require('./auth')

/**
 * This class is used to fetch stories from the storage.scrapinghub
 *
 * Once it fetches the stories, it passes them to Azure Sentiment Analysis System.
 *
 * Finally, it passes the stories and the corresponding sentiment score to the Django Database
 * 
 */ 
class FetchArticle extends React.Component {
    constructor() {
        super();
        this.state = {data:[], story_info:[]}
        this.loadDataFromScrapinghubServer = this.loadDataFromScrapinghubServer.bind(this)
        this.loadDataFromAzureServer = this.loadDataFromAzureServer.bind(this)
        this.ajax_success = 0;
        this.request
    }

  /**
   * Fetch stories scraped from the scraping hub server
   * 
   * nProps are the next props passed when new props passed to the component
   */
  loadDataFromScrapinghubServer (nProps) {
    console.log('load_server_fetch')
    this.story_url = "https://storage.scrapinghub.com/items/" + nProps.jobid + "?apikey=9b8c6f1e505f486080ce81ba15e6faf2&format=json"
    this.request = $.ajax({
      url: this.story_url,
      dataType: 'json',
      cache: false,
      success: function(data) {
                // Run through the fetched item array, and
                // for each scraped item pass the contents to the Azure server
                for (var key in data) {
                  if (data.hasOwnProperty(key)) {
                    this.loadDataFromAzureServer(data[key])
                }
                }
                this.ajax_success = 1;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.story_url, status, err.toString());
      }.bind(this)
    });
}

/**
 * Loads the stories to the Azure Server for sentiment analysis
 *
 * Then, it passes the stories along with the corresponding score to be stored in Django Database
 * 
 */
loadDataFromAzureServer (crawl_data) {
    // These parameters are needed to be authenticated to the Azure Server
    this.account_key = 'WlX/QiJ11tXq0TEss4CMwaRgEblmv2aDFnWKiLeIFAA'
    this.base_url = 'https://api.datamarket.azure.com/data.ashx/amla/text-analytics/v1'
    this.input_text = crawl_data.text // pass almost all the text for sentiment analysis
    this.creds = window.btoa('AccountKey:' + this.account_key)
    this.params = this.input_text
    this.sentiment_url = this.base_url + '/GetSentiment?' + 'Text='+url.urlencode(this.params)
    console.log('ajax')
    this.request = $.ajax({
      url: this.sentiment_url,
      dataType: 'json',
      cache: false,
      headers: {
                'Authorization':('Basic '+ this.creds) //
            },
      success: function(data) {
        this.setState({data: data, story_info:crawl_data})
        console.log(data.Score + crawl_data.title)
        console.log(crawl_data.image_src)

        /**
         *  Check the sentiment analysis score, if it is  bigger than a threshold 
         *  find an initial score
         */
      if (data.Score >= 0.85) {
        crawl_data.score_happy = 1;
        crawl_data['sa_sh'] = 1
        crawl_data['sa_sw'] = 0
        crawl_data['sa_ss'] = 0
      }

      else if (data.Score >=0.40 && data.Score < 0.85) {
        crawl_data.score_wow = 1;
        crawl_data['sa_sh'] = 0
        crawl_data['sa_sw'] = 1
        crawl_data['sa_ss'] = 0
      }

      else {
        crawl_data.score_sad = 1;
        crawl_data['sa_sh'] = 0
        crawl_data['sa_sw'] = 0
        crawl_data['sa_ss'] = 1
      }


      if (crawl_data.image_src != "url" || crawl_data.title != "title") // ignore stories that don't have an image url address or title
          this.postDataToDjangoServer(crawl_data)

      }.bind(this),
      error: function(xhr, status, err) {
        console.log('test')
        console.error(this.sentiment_url, status, err.toString());
      }.bind(this)
    });
}


/** Post the stories to the Django Database */
  postDataToDjangoServer(storyDetails) {
    $.ajax({
      url: '/api/post_scraper/',
      dataType: 'json',
      type: 'POST',
      data: storyDetails,
      headers: {
                'Authorization': 'Token ' + localStorage.token
      },
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/post_scraper/', status, err.toString());
      }.bind(this)
    });

  }   
    
     componentDidMount(){
      this.loadDataFromScrapinghubServer(this.props)
    }

    componentWillUnmount(){
      this.request.abort()
    }

    componentWillReceiveProps(nextProps){
        this.loadDataFromScrapinghubServer(nextProps)
    }

  render() {
    return (
      null
    )
  }
}

module.exports = FetchArticle