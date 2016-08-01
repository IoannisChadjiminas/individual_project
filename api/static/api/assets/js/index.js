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
var MostRecentStories =require('./Pages/MostRecentStories.jsx')
var StoryNav = require('./StoryNav')
var signUp = require('./SignUpSubmit')
var App = require('./app')
var Login = require('./login')
var SignIn = require('./SignIn')
var auth = require('./auth')
var Logout = require('./Logout.jsx')
var FetchArticle = require('./FetchArticle')
var CheckForScrappyJobs = require('./CheckForScrappyJobs')
/**
 * HomeWrapper is used to wrap the Home page with url and url-post. 
 * Then I use HomeWrapper as a component within React.Router.
 * I did this because you cant pass props in React.Router component
 */
export class HomeWrapper extends React.Component {
  render() {
    return (
      <Home url="/api/post_home.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
}

export var MostRecentStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <MostRecentStories url="/api/post_published.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

/*export var LolStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <LolStories url="/api/post_lol.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})*/

export var HappyStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <HappyStories url="/api/post_happy.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

export var WowStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <WowStories url="/api/post_wow.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

export var SadStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <SadStories url="/api/post_sad.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})

/*export var AngryStoriesWrapper = React.createClass ({
  render: function() {
    return (
      <AngryStories url="/api/post_angry.json" url_post="/api/post/" pollInterval={1000} />
    )
  }
})*/

/**
 * React Router keeps your UI in sync with the URL. SPA are web pages that load once, and when the user
 * clicks on a link or a button, JavaScript running on the page updates the address bar,
 * but the web pages is not refreshed. Management of the address bar is done by router (react-router)
 *
 * React Router is used for navigation of Single Page Applications
 */


    

ReactDOM.render(
    /**
    * hashHistory: manages the routing history with the hash portion of the url.
    * junk in the URL - it can be changed with an appropriate server-side configuration
     */
    <Router.Router history={Router.hashHistory}> 
      {/*

        Nested Routes (persisted navigation bar): 
                       (1) Let the StoryNav (navigation) have children, and move other routes underneath it
                       (2) Use IndexRoute to have our navigation along with the home page when the user 
                           visits the home page '/'
                       (3) StoryNav has Links that point to paths.
                       (4) At the end of StoryNav include {this.props.children}

        StoryNav contains Link that is used to navigating across the application. Initially we associate a certain
        path for each page (e.g path=LolStories) and then the Link which is contained in StoryNav points to 
        this path.
      */}
        <Router.Route path='/' component={StoryNav} >
          <Router.IndexRoute component={HomeWrapper} />
          {/* Adding more screens(pages) --associate a specific path on url 
          that maps to a specific component */}
          {/* Add respective paths so you can visit a certain page
              e.g http://localhost:5000/#/LolStories */}
          <Router.Route path='FetchArticle' component={FetchArticle}/>
          <Router.Route path='CheckForScrappyJobs' component={CheckForScrappyJobs}/>
          {/*<Router.Route path='LolStories' component={LolStoriesWrapper}/>*/} 
          <Router.Route path='WowStories' component={WowStoriesWrapper}/>
          <Router.Route path='SadStories' component={SadStoriesWrapper}/>
          {/*<Router.Route path='AngryStories' component={AngryStoriesWrapper}/>*/}
          <Router.Route path='HappyStories' component={HappyStoriesWrapper}/>
          <Router.Route path='MostRecentStories' component={MostRecentStoriesWrapper}/>
          <Router.Route path='SignUp' component={signUp} />
          <Router.Route path='SignIn' component={SignIn} />
          <Router.Route path='Logout' component={Logout} />
        </Router.Route>
      </Router.Router>,
    document.getElementById('container')
)