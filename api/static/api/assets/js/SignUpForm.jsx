var React = require('react')
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col

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
             <Col  xsHidden smHidden md={4}>    </Col>
             <Col md={4}>
              <ControlLabel>Name</ControlLabel>
              {' '}
             <FormControl type="text" placeholder="Jane Doe" value={this.state.username} onChange={this.handleUsernameChange}  />
             </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
            {' '}
            <FormGroup controlId="formInlineEmail">
            <Col  xsHidden smHidden md={4}>    </Col>
            <Col md={4}>
              <ControlLabel>Password</ControlLabel>
              {' '}
              <FormControl type="password" placeholder="password" value={this.state.password} onChange={this.handlePassChange}/>
            </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
            {' '}
            <FormGroup>
            <Col  xsHidden smHidden md={4}>    </Col>
            <Col md={4}>
            <Button type="submit" value="POST">
              signUp
            </Button>
            </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
          </Form>
        )
    }
}

module.exports = SignUpForm