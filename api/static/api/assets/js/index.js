var React = require('react')
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

//ReactDOM.render(<GridLayout url="http://localhost:5000/post.json" url_post="http://localhost:5000/post/" pollInterval={2000}/>, document.getElementById('container'))
ReactDOM.render(<GridLayout url="https://glacial-caverns-82286.herokuapp.com/post.json/" url_post="https://glacial-caverns-82286.herokuapp.com/post/" pollInterval={2000}/>, document.getElementById('container'))
