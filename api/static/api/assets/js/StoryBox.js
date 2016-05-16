var React = require('react')
var $ = require('jquery')
var StoryList = require('./StoryList')
var StoryForm = require('./StoryForm')

class StoryBox extends React.Component {
  constructor(){
    super();
    this.state = {data: []}
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
    //this.handleStorySubmit = this.handleStorySubmit.bind(this)
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
    return (
      <div className="storyBox">
        <StoryList data={this.state.data} />
      </div>
    );
  }
}

module.exports = StoryBox;
//ReactDOM.render(<StoryForm />, document.getElementById('container'))
/*  handleStorySubmit(storyDetails) {
    $.ajax({
      url: this.props.url_post,
      dataType: 'json',
      type: 'POST',
      data: storyDetails,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url_post, status, err.toString());
      }.bind(this)
    });

  }
<StoryForm onStorySubmit={this.handleStorySubmit} /> */
