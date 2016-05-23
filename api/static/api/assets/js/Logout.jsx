var React = require('react')
var auth = require('./auth')

module.exports = React.createClass({            
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    logoutHandler: function() {
        auth.logout()
        this.context.router.replace('/')
    },

    render: function() {
        return (
            <div>
            <p> You are now logged in </p>
            <p> Are you sure that you want to logout? </p>
            <button onClick={this.logoutHandler}>Log out</button>
            </div>
        )        
    }
})