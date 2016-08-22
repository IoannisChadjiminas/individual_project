var React = require('react')
var SignUpForm = require('./SignUpForm.jsx')
var ReactDOM = require('react-dom')
var Grid = require('react-bootstrap').Grid
var Form = require('react-bootstrap').Form
var FormGroup = require('react-bootstrap').FormGroup
var ControlLabel = require('react-bootstrap').ControlLabel
var Row = require('react-bootstrap').Row
var Button = require('react-bootstrap').Button
var FormControl = require('react-bootstrap').FormControl
var Col = require('react-bootstrap').Col

class SignUpSubmit extends React.Component {
    constructor(){
      super()
      this.state = {data: [], user_exists:""}
      this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
    }

    handleSignUpSubmit(userDetails) {
        $.ajax({
          url: '/api/register/',
          dataType: 'json',
          type: 'POST',
          data: userDetails,
          success: function(data) {
            this.setState({data: data});
            this.setState({user_exists:"false"})
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/register/', status, err.toString());
            this.setState({user_exists:"true"})
          }.bind(this)
        });

  }

  render() {
  return (
    <Grid>
    <br />
    <br />
    <br />
    <br />
    <Row className="show-grid">
      <Col  xsHidden smHidden md={4} >    </Col>
      <Col  md={4} className="storyForm"> <Col md={12}> <SignUpForm onSignSubmit={this.handleSignUpSubmit} user_exists={this.state.user_exists}/> </Col> </Col> 
      <Col  xsHidden smHidden md={4}> </Col>
    </Row>
  </Grid>
  )}
}



module.exports = SignUpSubmit;