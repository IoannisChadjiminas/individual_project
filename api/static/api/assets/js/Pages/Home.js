var React = require('react')
require("../../css/storyItem.scss")
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var StoryNav = require('../StoryNav')
var StoryBox = require('../StoryBox.jsx')
var StorySubmit = require('../StorySubmit')
var Button = require('react-bootstrap').Button
var auth = require('../auth.jsx')
var StoryList = require('../StoryList.js').StoryList
var Link = require('react-router').Link

const Home = React.createClass({
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
    auth.onChange_home = this.updateAuth
    auth.login()
  },

  render() {
  return (
    <Grid>
    <br />
    <br />
    <Row className="show-grid">
      <Col  xsHidden smHidden md={2} >    </Col>
      <Col  md={6}> <StoryBox url={this.props.url} pollInterval={this.props.pollInterval} /> </Col>
        {this.state.loggedIn ? (<Col  xsHidden smHidden md={4} className="storyForm"> <Col  xsHidden smHidden md={12}> <StorySubmit url_post={this.props.url_post} /> </Col> </Col>) 
        : (<Col  xsHidden smHidden md={4} className="buttonForm"> <Link to="signIn"> <Button bsStyle="primary" bsSize="large" active block >   Submit Story  </Button> </Link> </Col>  )}
    </Row>
  </Grid>
  )}
})


module.exports = Home;