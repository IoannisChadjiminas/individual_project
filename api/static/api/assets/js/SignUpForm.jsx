var React = require('react')

class SignUpForm extends React.Component {
    constructor(){
        super()
        this.state = {username:'', password: ''}
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleUsernameChange(event){
        this.setState({username: event.target.value})
    }

    handlePassChange(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        var username = this.state.username.trim()
        var password = this.state.password.trim()
        if (!username || !password) {
            return;
        }
        this.props.onSignUpSubmit({username: username, password: password})
        this.setState({username:' ', password:' '})
    }

    render() {
       return ( <form className="form" onSubmit={this.handleSubmit} > 
            <input 
                type="text" 
                placeholder="username"
                onChange={this.handleUsernameChange} 
            />
            <input 
                type="password" 
                placeholder="password" 
                onChange={this.handlePassChange}
            />

            <input 
                type="submit" value="POST"
            />
        </form>
        )
    }
}

module.exports = SignUpForm