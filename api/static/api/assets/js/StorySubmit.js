var React = require('react')
var $ = require('jquery')
var StoryForm = require('./StoryForm')
require('../css/shareStory.scss')
var auth = require('./auth')

class StorySubmit extends React.Component {
  constructor(){
    super();
    this.state = {data: []}
    this.handleStorySubmit = this.handleStorySubmit.bind(this)
  }

  handleStorySubmit(storyDetails) {
    $.ajax({
      url: this.props.url_post,
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
        console.error(this.props.url_post, status, err.toString());
      }.bind(this)
    });

  }

  render() {
    return (
      <div className="storySubmit">
        <StoryForm onStorySubmit={this.handleStorySubmit} />
      </div>
    );
  }
}

module.exports = StorySubmit;