var React = require('react')
var $ = require('jquery')
var StoryList = require('./StoryList').StoryList
var StoryForm = require('./StoryForm')

class StoryBox extends React.Component {
  constructor(){
    super();
    this.state = {data: []}
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
    this.loadVoterData = this.loadVoterData.bind(this)
    this. callLoadsInterval = this.callLoadsInterval.bind(this)
  }

  loadDataFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  loadVoterData() {
    $.ajax({
      url: '/api/voter/',
      dataType: 'json',
      cache: false,
      headers: {
                'Authorization': 'Token ' + localStorage.token
            },
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/voter/', status, err.toString());
      }.bind(this)
    });

  }

  callLoadsInterval(){
    this.loadDataFromServer()
    this.loadVoterData()
  }

  componentDidMount() {
    this.callLoadsInterval();
    this.loadInterval = setInterval(this.callLoadsInterval, this.props.pollInterval);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
 }

  render() {
    return (
      <div className="storyBox">
        <StoryList data={this.state.data} />
      </div>
    );
  }
}

module.exports = StoryBox;