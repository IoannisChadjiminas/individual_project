var React = require('react')
var auth = require('./auth')
var withRouter = require('react-router').withRouter
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col
var Link = require('react-router').Link

var spanNewUserstyle = {
  float: 'right',
  fontSize: '10px',
  marginTop: '15px',
  paddingRight: '4px'
};

var spanstyle = {
  float: 'right',
  marginTop: '9px',
};

const login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false,
        username: '',
        password: '',
      }
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    handleUsernameChange(event){
      this.setState({username:event.target.value})
    },

    handlePassChange(event){
      this.setState({password:event.target.value})
    },

    handleSubmit(event) {
      event.preventDefault()
      var username = this.state.username.trim()
      username = username.replace(/\s/g, '')
      var password = this.state.password.trim()
      if (!username || !password) {
            return;
        }
      
      auth.login(username, password, (loggedIn) => {
        this.context.router.replace('/')

      })

      this.setState({error:false, username:' ', password:''})

      if (!auth.loggedIn())
        this.setState({error:true})
    },

    render() {
       return ( 
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formInlineName">
            <ControlLabel>LogIn</ControlLabel>
            {' '}
            </FormGroup>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name</ControlLabel>
              {' '}
             <FormControl type="text" placeholder="jane_doe" value={this.state.username} onChange={this.handleUsernameChange}  />
            </FormGroup>
            {' '}
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Password</ControlLabel>
              {' '}
              <FormControl type="password" placeholder="password" value={this.state.password} onChange={this.handlePassChange}/>
            </FormGroup>
            {' '}
            <FormGroup>
            <Button type="submit" value="POST">
              SignIn
            </Button>
            <span style={spanstyle}> <Link to="SignUp"> Register </Link> </span> <span> </span> <span style={spanNewUserstyle}> new user? </span>
            </FormGroup>
            <FormGroup>
              {this.state.error && (
              <p>Bad login information</p>
              )}
            </FormGroup>
          </Form>
        )
    }
  })
)

module.exports = login; 