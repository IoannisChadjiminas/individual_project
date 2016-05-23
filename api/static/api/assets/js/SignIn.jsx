var React = require('react')
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var LogIn = require('./login')

class SignUp extends React.Component{
  render() {
  return (
    <Grid>
      <br />
      <br />
      <Row className="show-grid">
        <Col  xsHidden smHidden md={4}>    </Col>
        <Col  md={4}> <LogIn />  </Col>
        <Col  xsHidden smHidden md={4}> </Col>
      </Row>
  </Grid>
  )
  }
}

module.exports = SignUp;