var React = require('react')
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col

var wrongUrl = {
  color:'red'
}
class StoryForm extends React.Component {
    constructor(){
      super()
      this.state={title:'', url: '', url_format:false}
      this.handleTitleChange = this.handleTitleChange.bind(this)
      this.handleUrlChange = this.handleUrlChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleTitleChange(event) {
      this.setState({title: event.target.value})
    }

    handleUrlChange(event) {
      this.setState({url: event.target.value})
    }

    handleSubmit(event) {
      event.preventDefault();
      var title = this.state.title.trim();
      var url = this.state.url.trim();

      //var regex = RegExp("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:]])?$")
      var regex = RegExp("^(http(?:s)?\:\/\/[a-zA-Z0-9]+(?:(?:\.|\-)[a-zA-Z0-9]+)+(?:\:\d+)?(?:\/[\w\-]+)*(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$")
      console.log(regex.test(url))
      

      if (!title || !url || !regex.test(url)) {
        this.setState({url_format:true})
        return;
      }
      this.setState({url_format:false})
      this.props.onStorySubmit({title:title, url:url})
      
      this.setState({title:'', url: ''})

    }

    
    render() {
       return ( 

          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formInlineName">
            <ControlLabel> Submit Story </ControlLabel>
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <FormControl type="text" placeholder="title" value={this.state.title} onChange={this.handleTitleChange}/>
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <FormControl type="text" placeholder="http://example/story" value={this.state.url} onChange={this.handleUrlChange}/>
            </FormGroup>
            <FormGroup>
            <Button type="submit" value="POST">
              Post
            </Button>
            </FormGroup>
            <FormGroup>
              {this.props.many_request_error ? <p> Too many posts for today! </p> : <span />}
            </FormGroup>
            <FormGroup>
              {this.state.url_format && <p style={wrongUrl} > The url format seems to be incorrect! </p>}
            </FormGroup>
          </Form>
        )
    }
}



module.exports = StoryForm