var React = require('react')
var ReactDOM = require('react-dom')
require("../css/storyItem.scss")
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var StoryNav = require('./StoryNav')
var StoryItem = require('./StoryItem')

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
     <Col    xsHidden smHidden md={2}>    </Col>
      <Col  md={7}> <StoryItem title= {this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> </Col>
      <Col  xsHidden smHidden md={3}> </Col>
      <br />
    </Row>

    <br />
    <br />

    <Row className="show-grid">
      <Col  xsHidden smHidden md={2}>    </Col>
      <Col  md={7}> <StoryItem title= {this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> </Col>
      <Col  xsHidden smHidden md={3}>  </Col>
      <br />
    </Row>

    <br />
    <br />

    <Row className="show-grid">
      <Col  xsHidden smHidden md={2}>   </Col>
      <Col  md={7}> <StoryItem title= {this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> </Col>
      <br />
    </Row>

    <br />
    <br />

    <Row className="show-grid">
      <Col  xsHidden smHidden md={2}>   </Col>
      <Col  md={7}> <StoryItem title= {this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> </Col>
      <br />
    </Row>

    <br />
    <br />

    <Row className="show-grid">
      <Col  xsHidden smHidden md={2}>   </Col>
      <Col  md={7}> <StoryItem title= {this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> </Col>
      <br />
    </Row>

    <br />
    <br />

    <Row className="show-grid">
      <Col  xsHidden smHidden md={2}>    </Col>
      <Col md={7}> <StoryItem title= {this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> </Col>
    </Row>

  </Grid>)
  }
}


ReactDOM.render(<GridLayout title="Hezbollah says commander killed by Syrian insurgent shelling" url="http://www.dailymail.co.uk/wires/pa/article-3588667/New-London-Mayor-vows-clean-capitals-toxic-air.html" by="Ioannis" site_host="Guardian"/>, document.getElementById('container'))