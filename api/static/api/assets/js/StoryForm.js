var React = require('react')
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col
class StoryForm extends React.Component {
    constructor(){
      super()
      this.state={by:'', title:'', url: '', site_host:''}
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleTitleChange = this.handleTitleChange.bind(this)
      this.handleUrlChange = this.handleUrlChange.bind(this)
      this.handleSiteHostChange = this.handleSiteHostChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleNameChange(event) {
      this.setState({by: event.target.value})
    }

    handleTitleChange(event) {
      this.setState({title: event.target.value})
    }

    handleUrlChange(event) {
      this.setState({url: event.target.value})
    }

    handleSiteHostChange(event) {
      this.setState({site_host: event.target.value})
    }

    handleSubmit(event) {
      event.preventDefault();
      var by = this.state.by.trim();
      var title = this.state.title.trim();
      var url = this.state.url.trim();
      var site_host = this.state.site_host.trim()
      if (!by || !title || !url || !site_host) {
        return;
      }
      this.props.onStorySubmit({by:by, title:title, url:url, site_host:site_host})
      
      this.setState({by:'', title:'', url: '', site_host:''})

    }

    
    render() {
       return ( 

          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formInlineName">
            <ControlLabel> Submit Story </ControlLabel>
             <FormControl type="text" placeholder="Your Name" value={this.state.by} onChange={this.handleNameChange}  />
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <FormControl type="text" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/>
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <FormControl type="text" placeholder="http://example/story" value={this.state.url} onChange={this.handleUrlChange}/>
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <FormControl type="text" placeholder="Site Host" value={this.state.site_host} onChange={this.handleSiteHostChange}/>
            </FormGroup>
            <FormGroup>
            <Button type="submit" value="POST">
              Post
            </Button>
            </FormGroup>
          </Form>
        )
    }
}



module.exports = StoryForm