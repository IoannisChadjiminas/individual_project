var React = require('react')
var StoryNav = require('../StoryNav')
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col

class WowStories extends React.Component {

render(){
        return (
            <Grid>
                <br />
                <br />
                <Row className="show-grid">
                  <Col  xsHidden smHidden md={2}>    </Col>
                  <Col  md={6}> <p> Wow </p>  </Col>
                  <Col  xsHidden smHidden md={4}>  </Col>
                </Row>
            </Grid>
        )
    }   
}

module.exports = WowStories;