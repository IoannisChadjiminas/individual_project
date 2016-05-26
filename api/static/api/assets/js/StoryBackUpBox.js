var React = require('react')
var $ = require('jquery')
var StoryList = require('./StoryList').StoryList
var StoryLolList = require('./StoryList').StoryLolList
var StoryHappyList = require('./StoryList').StoryHappyList
var StoryWowList = require('./StoryList').StoryWowList
var StorySadList = require('./StoryList').StorySadList
var StoryAngryList = require('./StoryList').StoryAngryList
var StoryForm = require('./StoryForm')

class StoryBox extends React.Component {
  constructor(){
    super();
    this.state = {data: [], data_lol: [], data_happy: [], data_wow:[], data_sad:[], data_angry:[]}
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
    this.loadDataLolFromServer = this.loadDataLolFromServer.bind(this)
    this.loadDataHappyFromServer = this.loadDataHappyFromServer.bind(this)
    this.loadDataWowFromServer = this.loadDataWowFromServer.bind(this)
    this.loadDataSadFromServer = this.loadDataSadFromServer.bind(this)
    this.loadDataAngryFromServer = this.loadDataAngryFromServer.bind(this)
    this.callLoadsInterval = this.callLoadsInterval.bind(this)

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

  loadDataLolFromServer () {
    $.ajax({
      url: '/api/post_lol.json',
      dataType: 'json',
      cache: false,
      success: function(data_lol) {
        this.setState({data_lol: data_lol});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/post_lol.json', status, err.toString());
      }.bind(this)
    });
  }

  loadDataHappyFromServer () {
    $.ajax({
      url: '/api/post_happy.json',
      dataType: 'json',
      cache: false,
      success: function(data_happy) {
        this.setState({data_happy: data_happy});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/post_happy.json', status, err.toString());
      }.bind(this)
    });
  }

  loadDataWowFromServer () {
    $.ajax({
      url: '/api/post_wow.json',
      dataType: 'json',
      cache: false,
      success: function(data_wow) {
        this.setState({data_wow: data_wow});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/post_wow.json', status, err.toString());
      }.bind(this)
    });
  }

  loadDataSadFromServer () {
    $.ajax({
      url: '/api/post_sad.json',
      dataType: 'json',
      cache: false,
      success: function(data_sad) {
        this.setState({data_sad: data_sad});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/post_sad.json', status, err.toString());
      }.bind(this)
    });
  }

  loadDataAngryFromServer () {
    $.ajax({
      url: '/api/post_angry.json',
      dataType: 'json',
      cache: false,
      success: function(data_angry) {
        this.setState({data_angry: data_angry});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/post_angry.json', status, err.toString());
      }.bind(this)
    });
  }

  callLoadsInterval(){
    this.loadDataFromServer();
    this.loadDataLolFromServer();
    this.loadDataHappyFromServer();
    this.loadDataWowFromServer();
    this.loadDataSadFromServer();
    this.loadDataAngryFromServer();
  }

  componentDidMount() {
    this.callLoadsInterval()
    this.loadInterval = setInterval(this.callLoadsInterval, this.props.pollInterval);
    /*
    this.loadLolInterval = setInterval(this.loadDataLolFromServer, this.props.pollInterval);
    this.loadHappyInterval = setInterval(this.loadDataHappyFromServer, this.props.pollInterval);
    this.loadWowInterval = setInterval(this.loadDataWowFromServer, this.props.pollInterval);
    this.loadSadInterval = setInterval(this.loadDataSadFromServer, this.props.pollInterval);
    this.loadAngryInterval = setInterval(this.loadDataAngryFromServer, this.props.pollInterval);
    */
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
    this.loadInterval && this.setState({
    loading: false
});

/*
    this.loadLolInterval && clearInterval(this.loadLolInterval);
    this.loadLolInterval = false;

    this.loadHappyInterval && clearInterval(this.loadHappyInterval);
    this.loadHappyInterval = false;

    this.loadWowInterval && clearInterval(this.loadWowInterval);
    this.loadWowInterval = false;

    this.loadSadInterval && clearInterval(this.loadSadInterval);
    this.loadSadInterval = false;

    this.loadAngryInterval && clearInterval(this.loadAngryInterval);
    this.loadAngryInterval = false;
  */
 }

  render() {
      var storyList;
      if (this.props.select === 'home') {
        storyList = <StoryList data={this.state.data} />
      } else if (this.props.select === 'lol') {
        storyList = <StoryLolList data={this.state.data_lol} />
      } else if (this.props.select === 'happy') {
        storyList = <StoryHappyList data={this.state.data_happy} />
      } else if (this.props.select === 'wow') {
        storyList = <StoryWowList data={this.state.data_wow} />
      } else if (this.props.select === 'sad') {
        storyList = <StorySadList data={this.state.data_sad} />
      } else if (this.props.select === 'angry') {
        storyList = <StoryAngryList data={this.state.data_angry} />
      } 
    return (
      <div className="storyBox">
        {storyList}
      </div>
    );
  }
}

module.exports = StoryBox;
