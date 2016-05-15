var React = require('react')
var ReactDOM = require('react-dom')
require("../css/storyItem.scss")
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var StoryNav = require('./StoryNav')
var StoryBox = require('./StoryBox')


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
      <Col  md={7}> <StoryBox url={this.props.url} pollInterval={this.props.pollInterval}/>  </Col>
      <Col  xsHidden smHidden md={3}> </Col>
    </Row>
  </Grid>)
  }
}



ReactDOM.render(<GridLayout url="https://glacial-caverns-82286.herokuapp.com/post.json" pollInterval={2000}/>, document.getElementById('container'))

//ReactDOM.render(<GridLayout title="Hezbollah says commander killed by Syrian insurgent shelling" url="http://www.dailymail.co.uk/wires/pa/article-3588667/New-London-Mayor-vows-clean-capitals-toxic-air.html" by="Ioannis" site_host="Guardian"/>, document.getElementById('container'))