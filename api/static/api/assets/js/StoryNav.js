var React = require('react')
require('../css/storyNav.scss')
var Link = require('react-router').Link
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var NavBar = require('react-bootstrap').NavBar
var Button = require('react-bootstrap').Button
var auth = require('./auth')
var Tooltip = require('react-bootstrap').Tooltip
var OverlayTrigger = require('react-bootstrap').OverlayTrigger

var divStyle ={
  float: 'right'
}

var RecentStyle = {
  color: 'orange',
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

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler: function() {
        auth.logout()
        this.context.router.replace('/')
    },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },
    render() {
      const tooltip_lol = (
          <Tooltip id='1'><strong>Funny</strong></Tooltip>
      );

      const tooltip_happy = (
          <Tooltip id='2'><strong>Happy</strong></Tooltip>
      );

      const tooltip_wow = (
          <Tooltip id='3'><strong>Wow</strong></Tooltip>
      );

      const tooltip_sad = (
          <Tooltip id='4'><strong>Sad</strong></Tooltip>
      );

      const tooltip_angry = (
          <Tooltip id='5'><strong>Angry</strong></Tooltip>
      );
        return (
            <Grid>
            <Row className="show-grid">
            <Col md={12}> 
            <ul role="nav" className="storyEmoticons-storyNav">
                <li> <Link to="/"> <strong> Sharing Stories </strong>  </Link> </li>
                <li> <Link to="MostRecentStories"> <strong style={RecentStyle}> Recent </strong>  </Link>  </li>
                
                <li> 
                <OverlayTrigger placement="bottom" overlay={tooltip_lol}> 
                <Link to="LolStories">   
                  <img className="storyLol-storyNav" src="/static/api/assets/img/emoticons/lol.png" />
                  </Link>  
                  </OverlayTrigger> 
                </li>
                
                <li>
                  <OverlayTrigger placement="bottom" overlay={tooltip_happy}>  
                  <Link to="HappyStories">
                  <img className="storySatisfied-storyNav" src="/static/api/assets/img/emoticons/happy.png" /> 
                  </Link> 
                  </OverlayTrigger> 
                </li>
                
                <li> 
                  <OverlayTrigger placement="bottom" overlay={tooltip_wow}> 
                  <Link to="WowStories"> 
                  <img className="storyWow-storyNav" src="/static/api/assets/img/emoticons/wow.png"/> 
                  </Link>  
                  </OverlayTrigger>   
                </li>
                  
                  <li> 
                    <OverlayTrigger placement="bottom" overlay={tooltip_sad}> 
                    <Link to="SadStories">
                    <img className="storyCry-storyNav" src="/static/api/assets/img/emoticons/cry.png" />   
                    </Link>  
                    </OverlayTrigger>
                  </li>
                
                  <li> 
                    <OverlayTrigger placement="bottom" overlay={tooltip_angry}>
                    <Link to="AngryStories"> 
                    <img className="storyAngry-storyNav" src="/static/api/assets/img/emoticons/angry.png"/> 
                    </Link>
                    </OverlayTrigger>   
                  </li>

                <li style={divStyle}>
                    {this.state.loggedIn ? (
                      <a href='' onClick= {this.logoutHandler}>Log out </a>
                    ) : (
                      <Link to="SignIn"> Sign in</Link>
                    )}
                </li>
                <li style={divStyle}> <Link to="SignUp"> <strong> Sign Up  </strong> </Link>  </li>
                <li style={divStyle}> {this.state.loggedIn? <Link to='/'> </Link> : <Link to="SignIn"> <img className="storyUpload-storyNav" src="/static/api/assets/img/nav_symbols/upload-arrow.png" /> </Link>} </li>

            </ul>
            {this.props.children}
            </Col>
   
            </Row>
            </Grid>
        )
    }
})
//<li style={divStyle}> <Link to="/"> <img className="storySearch-storyNav" src="/static/api/assets/img/nav_symbols/src.jpg" /> </Link> </li>

module.exports = StoryNav;

