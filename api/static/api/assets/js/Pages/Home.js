var React = require('react')
require("../../css/storyItem.scss")
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var StoryNav = require('../StoryNav')
var StoryBox = require('../StoryBox')
var StorySubmit = require('../StorySubmit')
var Button = require('react-bootstrap').Button
var auth = require('../auth.jsx')

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
      <Col  xsHidden smHidden md={2}>    </Col>
      <Col  md={6}> <StoryBox url={this.props.url} pollInterval={this.props.pollInterval}/>  </Col>
      <Col  xsHidden smHidden md={4}> {this.state.loggedIn ? (<StorySubmit url_post={this.props.url_post} />) : (<Button> Submit a Story </Button>)}</Col>
    </Row>
  </Grid>
  )}
})


module.exports = Home;