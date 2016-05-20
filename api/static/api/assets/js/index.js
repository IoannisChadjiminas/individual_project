/*var React = require('react')
var ReactDOM = require('react-dom')
require("../css/storyItem.scss")
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var StoryNav = require('./StoryNav')
var StoryBox = require('./StoryBox')
var StorySubmit = require('./StorySubmit')


class GridLayout extends React.Component{
  render() {
  return (
    <Grid>

    <Row className="show-grid">
    <Col md={12}> <StoryNav /> </Col>
    </Row>

    <br />
    <br />

    <Row className="show-grid">
      <Col  xsHidden smHidden md={2}>    </Col>
      <Col  md={6}> <StoryBox url={this.props.url} pollInterval={this.props.pollInterval}/>  </Col>
      <Col  xsHidden smHidden md={4}> <StorySubmit url_post={this.props.url_post} /> </Col>
    </Row>
  </Grid>)
  }
}

ReactDOM.render(<GridLayout url="/api/post.json" url_post="/api/post/" pollInterval={2000}/>, document.getElementById('container'))
//ReactDOM.render(<GridLayout url="https://glacial-caverns-82286.herokuapp.com/post.json/" url_post="https://glacial-caverns-82286.herokuapp.com/post/" pollInterval={2000}/>, document.getElementById('container'))


/*var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var App = require('./app')
var Login = require('./login')
var auth = require('./auth')

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'/app/login/',
            state: {nextPathname: '/app/'}
        })
    }
}

ReactDOM.render(
    <Router.Router history={Router.browserHistory}>
        <Router.Route path='/app/login/' component={Login} />
        <Router.Route path='/app/' component={App} onEnter={requireAuth} />
        
    </Router.Router>,
    document.getElementById('container')
)*/

var React = require('react')
var SignUpForm = require('./SignUpForm')
var ReactDOM = require('react-dom')

class SignUpSubmit extends React.Component {
    constructor() {
        super()
        this.state = {data: []}
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)

    }

    handleSignUpSubmit(userDetails) {
        $.ajax({
          url: '/api/register/',
          dataType: 'json',
          type: 'POST',
          data: userDetails,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/register/', status, err.toString());
          }.bind(this)
        });

  }

    render() {
        return (
         <div>
            <SignUpForm onSignUpSubmit={this.handleSignUpSubmit} />
         </div>
        )
    }
}

ReactDOM.render(<SignUpSubmit />, document.getElementById('container'))