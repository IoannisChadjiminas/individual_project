var React = require('react')
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col
var Link = require('react-router').Link
var auth = require('./auth')



var spanAlreadyUserstyle = {
  float: 'right',
  fontSize: '10px',
  marginTop: '15px',
  paddingRight: '4px'
};

var spanstyle = {
  float: 'right',
  marginTop: '9px',
};


class SignUpForm extends React.Component {
    constructor() {
      super()
      this.state = {username:'', password: ''}
      this.handleUsernameChange = this.handleUsernameChange.bind(this)
      this.handlePassChange = this.handlePassChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleUsernameChange (event) {
        this.setState({username: event.target.value})
    }

    handlePassChange (event) {
        this.setState({password: event.target.value})
    }

    handleSubmit (event) {
        event.preventDefault();
        var username = this.state.username.trim()
        var password = this.state.password.trim()
        if (!username || !password) {
            return;
        }

        this.props.onSignSubmit({username: username, password: password})
        this.setState({username:'', password:''})


    }

    render() {
       return ( 

          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name</ControlLabel>
              {' '}
             <FormControl type="text" placeholder="Jane Doe" value={this.state.username} onChange={this.handleUsernameChange}  />
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
              SignUp
            </Button>
            <span style={spanstyle}> <Link to="SignIn"> SignIn </Link> </span> <span> </span> <span style={spanAlreadyUserstyle}> already user? </span>
            </FormGroup>
            <FormGroup>
              {this.props.user_exists ? <p> This username already exists! </p> : <Link to='/'> </Link>}
            </FormGroup>
          </Form>
        )
    }
}

module.exports = SignUpForm