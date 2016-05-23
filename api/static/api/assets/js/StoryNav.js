var React = require('react')
require('../css/storyNav.scss')
var Link = require('react-router').Link
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var auth = require('./auth')

var divStyle ={
  float: 'right'
}


const StoryNav = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },
    render() {
        return (
            <Grid>
            <Row className="show-grid">
            <Col md={12}> 
            <ul role="nav" className="storyEmoticons-storyNav">
                <li> <Link to="/"> <strong> Sharing Stories </strong>  </Link> </li>
                <li> <Link to="LolStories"> <img className="storyLol-storyNav" src="/static/api/assets/img/emoticons/lol.png" />  </Link>  </li>
                <li> <Link to="HappyStories"> <img className="storySatisfied-storyNav" src="/static/api/assets/img/emoticons/happy.png" /> </Link>  </li>
                <li> <Link to="WowStories"> <img className="storyWow-storyNav" src="/static/api/assets/img/emoticons/wow.png"/> </Link>  </li>
                <li> <Link to="SadStories"> <img className="storyCry-storyNav" src="/static/api/assets/img/emoticons/cry.png" />  </Link>  </li>
                <li> <Link to="AngryStories"> <img className="storyAngry-storyNav" src="/static/api/assets/img/emoticons/angry.png"/>  </Link>  </li>
                <li style={divStyle}>
                    {this.state.loggedIn ? (
                      <Link to="Logout">Log out</Link>
                    ) : (
                      <Link to="SignIn"> Sign in</Link>
                    )}
                </li>
                <li style={divStyle}> <Link to="SignUp"> <strong> Sign Up  </strong> </Link>  </li>
                <li style={divStyle}> <Link to="/"> <img className="storySearch-storyNav" src="/static/api/assets/img/nav_symbols/src.jpg" /> </Link> </li>
                <li style={divStyle}> <Link to="/"> <img className="storyUpload-storyNav" src="/static/api/assets/img/nav_symbols/upload-arrow.png" /> </Link> </li>

            </ul>
            {this.props.children}
            </Col>
            </Row>
            </Grid>
        )
    }
})

module.exports = StoryNav;

