var React = require('react')
var $ = require('jquery')
var StoryForm = require('./StoryForm')
require('../css/shareStory.scss')
var auth = require('./auth')

class StorySubmit extends React.Component {
  constructor(){
    super();
    this.state = {data: [], many_request_error:false}
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
        this.setState({many_request_error:false})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url_post, status, err.toString());
        this.setState({many_request_error:true})
      }.bind(this)
    });

  }

  render() {
    return (
      <div className="storySubmit">
        <StoryForm onStorySubmit={this.handleStorySubmit} many_request_error={this.state.many_request_error}/>
      </div>
    );
  }
}

module.exports = StorySubmit;