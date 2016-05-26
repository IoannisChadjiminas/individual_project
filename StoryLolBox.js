var React = require('react')
var $ = require('jquery')
var StoryList = require('./StoryList')
var StoryForm = require('./StoryForm')

class StoryLoLBox extends React.Component {
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
    setInterval(this.loadDataFromServer, this.props.pollInterval);
  }

  render() {
    var maxStoryLol;

    if ((this.state.data.score_lol > this.state.data.score_happy) &&
        (this.state.data.score_lol > this.state.data.score_wow) &&
        (this.state.data.score_lol > this.state.data.score_sad) &&
        (this.state.data.score_lol > this.state.data.score_angry)) 
        {
          maxStoryLol = <StoryList data={this.state.data} />
        }

    return (
      <div className="storyBox">
        {maxStoryLol}
      </div>
    );
  }
}

module.exports = StoryLoLBox;