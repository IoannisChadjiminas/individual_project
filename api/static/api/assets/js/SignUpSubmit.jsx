var React = require('react')
var SignUpForm = require('./SignUpForm')
var ReactDOM = require('react-dom')

class SignUpSubmit extends React.Component {
    constructor() {
        super()
        this.state = {data: []}
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
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/register/', status, err.toString());
          }.bind(this)
        });

  }

    render() {
        return (
         <div>
            <SignUpForm onSignUpSubmit={this.handleSignUpSubmit} />
         </div>
        )
    }
}

module.exports = SignUpSubmit;