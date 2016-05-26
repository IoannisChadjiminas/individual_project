var React = require('react')
var $ = require('jquery')
var StoryAngryList = require('./StoryList').StoryAngryList
var StoryForm = require('./StoryForm')

class StoryAngryBox extends React.Component {
  constructor(){
    super();
    this.state = {data: []}
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
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

  componentDidMount() {
    this.loadDataFromServer();
    this.loadInterval = setInterval(this.loadDataFromServer, this.props.pollInterval);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
 }

  render() {
    return (
      <div className="storyBox">
        <StoryAngryList data={this.state.data} />
      </div>
    );
  }
}

module.exports = StoryAngryBox;