//ReactDOM.render(<GridLayout url="/api/post.json" url_post="/api/post/" pollInterval={2000}/>, document.getElementById('container'))
var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router')
var Home = require('./Pages/Home.js')
var LolStories = require('./Pages/LolStories.jsx')
var HappyStories = require('./Pages/HappyStories.jsx')
var WowStories = require('./Pages/WowStories.jsx')
var SadStories = require('./Pages/SadStories.jsx')
var AngryStories = require('./Pages/AngryStories.jsx')
var StoryNav = require('./StoryNav')
var signUp = require('./SignUpSubmit')
var App = require('./app')
var Login = require('./login')
var auth = require('./auth')
var Logout = require('./Logout.jsx')

var HomeWrapper = React.createClass ({
  render: function() {
    return (
      <Home url="/api/post.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

var LolStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <LolStories url="/api/post_lol.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

var HappyStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <HappyStories url="/api/post_happy.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

var WowStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <WowStories url="/api/post_wow.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

var SadStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <SadStories url="/api/post_sad.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

var AngryStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <AngryStories url="/api/post_angry.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({ 
            pathname:'SignIn',
            state: {nextPathname: '/'}
        })
    }
}


ReactDOM.render(
    <Router.Router history={Router.hashHistory}>
        <Router.Route path='/' component={StoryNav} >
          <Router.IndexRoute component={HomeWrapper} />
          <Router.Route path='LolStories' component={LolStoriesWrapper}/>
          <Router.Route path='WowStories' component={WowStoriesWrapper}/>
          <Router.Route path='SadStories' component={SadStoriesWrapper}/>
          <Router.Route path='AngryStories' component={AngryStoriesWrapper}/>
          <Router.Route path='SignUp' component={signUp} />
          <Router.Route path='SignIn' component={Login} />
          <Router.Route path='Logout' component={Logout} />
          <Router.Route path='HappyStories' component={HappyStoriesWrapper}/>
        </Router.Route>
      </Router.Router>,
    document.getElementById('container')
)
//ReactDOM.render(<GridLayout url="https://glacial-caverns-82286.herokuapp.com/post.json/" url_post="https://glacial-caverns-82286.herokuapp.com/post/" pollInterval={2000}/>, document.getElementById('container'))


/*
var React = require('react')
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
)
*/

/*var React = require('react')
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

ReactDOM.render(<SignUpSubmit />, document.getElementById('container'))*/