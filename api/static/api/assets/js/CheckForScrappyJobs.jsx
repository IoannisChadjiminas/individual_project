var React = require('react')
var ReactDOM = require('react-dom')
var FetchArticle = require('./FetchArticle')


/**
 * This class is used to fetch the last finished job (id) from app.scrapinghub.
 *
 * Then the fetched job id is passed to the FetchArticle.jsc in order to fetch the last item from storage.scrapinghub.
 */
class CheckForScrappyJobs extends React.Component {
    constructor() {
        super();
        this.state = {data:[]}
        this.loadDataFromServer = this.loadDataFromServer.bind(this)
        this.ajax_success = 0;
    }

  loadDataFromServer () {
    this.last_job_url = "https://app.scrapinghub.com/api/jobs/list.json?apikey=9b8c6f1e505f486080ce81ba15e6faf2&project=81339&spider=bbc_spider&state=finished&count=1&format=json"
    this.request = $.ajax({
      url: this.last_job_url,
      dataType: 'json',
      cache: false,
      success: function(data) {
                this.setState({data: data})
                this.ajax_success = 1;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.last_job_url, status, err.toString());
      }.bind(this)
    });
}

    componentDidMount(){
       console.log('mountCheck')
        this.loadDataFromServer()
        this.loadInterval = setInterval(this.loadDataFromServer, 20000)
    }

    componentWillUnmount () {
        console.log('unmout_Check')
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
        this.request.abort()
    }

  render() {
    return (
      <div>
       {this.ajax_success == 1 ? <FetchArticle jobid={this.state.data.jobs[0].id} /> : null}
       {this.ajax_success=0}
      </div>
    )
  }
}

module.exports = CheckForScrappyJobs