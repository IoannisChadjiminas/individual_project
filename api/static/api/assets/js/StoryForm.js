var React = require('react')
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col
var Radio = require('react-bootstrap').Radio

var wrongUrl = {
  color:'red'
}

var imgwidth = {
  height:'20px',
  width:'20px'
}
class StoryForm extends React.Component {
    constructor(){
      super()
      this.state={title:'', url: '', score_lol:'', score_happy:'', score_wow:'', score_sad:'', score_angry:'', url_format:false}
      this.handleTitleChange = this.handleTitleChange.bind(this)
      this.handleUrlChange = this.handleUrlChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleLolChange = this.handleLolChange.bind(this)
      this.handleHappyChange = this.handleHappyChange.bind(this)
      this.handleWowChange = this.handleWowChange.bind(this)
      this.handleSadChange = this.handleSadChange.bind(this)
      this.handleAngryChange = this.handleAngryChange.bind(this)

    }

    handleTitleChange(event) {
      this.setState({title: event.target.value})
    }

    handleLolChange(event) {
      this.setState({score_lol:'1', score_happy:'0', score_wow:'0', score_sad:'0', score_angry:'0'})
    }

    handleHappyChange(event) {
      this.setState({score_lol:'0', score_happy:'1', score_wow:'0', score_sad:'0', score_angry:'0'})
    }

    handleWowChange(event) {
      this.setState({score_lol:'0', score_happy:'0', score_wow:'1', score_sad:'0', score_angry:'0'})
    }

    handleSadChange(event) {
      this.setState({score_lol:'0', score_happy:'0', score_wow:'0', score_sad:'1', score_angry:'0'})
    }

    handleAngryChange(event) {
      this.setState({score_lol:'0', score_happy:'0', score_wow:'0', score_sad:'0', score_angry:'1'})
    }

    handleUrlChange(event) {
      this.setState({url: event.target.value})
    }

    handleSubmit(event) {
      event.preventDefault();
      var title = this.state.title.trim()
      var url = this.state.url.trim()
      var score_lol = this.state.score_lol
      var score_happy = this.state.score_happy
      var score_wow = this.state.score_wow
      var score_sad = this.state.score_sad
      var score_angry = this.state.score_angry

      //var regex = RegExp("^((((https?|ftps?|gopher|telnet|nntp)://)|(mailto:|news:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:]])?$")
      //url_validation
      var re_weburl = new RegExp(
            "^" +
              // protocol identifier
              "(?:(?:https?|ftp)://)" +
              // user:pass authentication
              "(?:\\S+(?::\\S*)?@)?" +
              "(?:" +
                // IP address exclusion
                // private & local networks
                "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                // IP address dotted notation octets
                // excludes loopback network 0.0.0.0
                // excludes reserved space >= 224.0.0.0
                // excludes network & broacast addresses
                // (first & last IP address of each class)
                "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
              "|" +
                // host name
                "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                // domain name
                "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                // TLD identifier
                "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                // TLD may end with dot
                "\\.?" +
              ")" +
              // port number
              "(?::\\d{2,5})?" +
              // resource path
              "(?:[/?#]\\S*)?" +
            "$", "i"
          );
      console.log(re_weburl.test(url))
      

      if (!title || !url || !re_weburl.test(url) || !(score_lol && score_happy && score_wow && score_sad && score_angry )) {
        this.setState({url_format:true})
        return;
      }
   
      this.props.onStorySubmit({title:title, url:url, score_lol:score_lol, score_happy:score_happy, score_wow:score_wow, score_sad:score_sad, score_angry:score_angry})
      
      this.setState({title:'', url: '', score_lol:'', score_happy:'', score_wow:'', score_sad:'', score_angry:'', url_format:false})

    }

    
    render() {
      console.log(this.state.score_lol, this.state.score_happy, this.state.score_sad, this.state.score_wow, this.state.score_angry)
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
                        <Radio name="optradio" onChange={this.handleLolChange} inline>
              <img style={imgwidth} src="/static/api/assets/img/emoticons/lol.png" /> 
            </Radio>
            {' '}
            <Radio name="optradio" onChange={this.handleHappyChange} inline>
              <img style={imgwidth} src="/static/api/assets/img/emoticons/happy.png" />
            </Radio>
            {' '}
            <Radio name="optradio" onChange={this.handleWowChange} inline>
              <img style={imgwidth} src="/static/api/assets/img/emoticons/wow.png"/> 
            </Radio>
            {' '}
            <Radio name="optradio" onChange={this.handleSadChange} inline>
              <img style={imgwidth} src="/static/api/assets/img/emoticons/cry.png" /> 
            </Radio>
            {' '}
            <Radio name="optradio" onChange={this.handleAngryChange} inline>
              <img style={imgwidth} src="/static/api/assets/img/emoticons/angry.png"/>
            </Radio>
            <FormGroup />
            <FormGroup>
            <Button type="submit" value="POST">
              Post
            </Button>
            </FormGroup>
            <FormGroup>
              {this.props.many_request_error ? <p> Too many posts for today! </p> : <span />}
            </FormGroup>
            <FormGroup>
              {this.state.url_format && <p style={wrongUrl} > One field seems to be incorrect! </p>}
            </FormGroup>
          </Form>
        )
    }
}

module.exports = StoryForm