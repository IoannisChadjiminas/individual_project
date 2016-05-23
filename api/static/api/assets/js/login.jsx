var React = require('react')
var auth = require('./auth')
var withRouter = require('react-router').withRouter
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col
/*module.exports = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    handleSubmit: function(e) {
        e.preventDefault()

        var username = this.refs.username.value
        var pass = this.refs.pass.value

        auth.login(username, pass, (loggedIn) => {
            this.context.router.replace('/')
        })
    },
    
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" ref="username"/>
                <input type="password" placeholder="password" ref="pass"/>
                <input type="submit"/>
            </form>
        )    
    }
})*/


const login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false,
        username: '',
        password: ''
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

      event.preventDefault();
      var username = this.state.username.trim()
      var password = this.state.password.trim()
      if (!username || !password) {
            return;
        }
      
      auth.login(username, password, (loggedIn) => {
        this.context.router.replace('/')

      })
      this.setState({username:' ', password:' '})

      if (!auth.loggedIn())
        this.setState({error:true})
    },

    render() {
       return ( 
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formInlineName">
             <Col  xsHidden smHidden md={4}>    </Col>
             <Col md={4}>
              <ControlLabel>Name</ControlLabel>
              {' '}
             <FormControl type="text" placeholder="Jane Doe" onChange={this.handleUsernameChange}  />
             </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
            {' '}
            <FormGroup controlId="formInlineEmail">
            <Col  xsHidden smHidden md={4}>    </Col>
            <Col md={4}>
              <ControlLabel>Password</ControlLabel>
              {' '}
              <FormControl type="password" placeholder="password" onChange={this.handlePassChange}/>
            </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
            {' '}
            <FormGroup>
            <Col  xsHidden smHidden md={4}>    </Col>
            <Col md={4}>
            <Button type="submit" value="POST">
              signIn
            </Button>
            </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
            <FormGroup>
            <Col  xsHidden smHidden md={4}>    </Col>
            <Col md={4}>
              {this.state.error && (
              <p>Bad login information</p>
              )}
            </Col>
            <Col  xsHidden smHidden md={4}>    </Col>
            </FormGroup>
          </Form>
        )
    }
  })
)

module.exports = login; 