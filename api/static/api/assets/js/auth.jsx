var React = require('react')

module.exports = {
    login: function(username, pass, cb) {
         cb = arguments[arguments.length - 1]
         if (localStorage.token) {
              if (cb) cb(true)
              this.onChange(true)
              return
         }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
                  this.onChange(true)
            } else {
                if (cb) cb(false)
                  this.onChange(false)
            }
        })
    },        
    
    logout: function(cb) {
        delete localStorage.token
        if (cb) cb()
            this.onChange(false)
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    signup: function() {

    },

    onChange:function() {},

    onChange_home:function() {},

    getToken: function(username, pass, cb) {
        $.ajax({
            type: 'POST',
            url: '/api/obtain-auth-token/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })
            }
        })
    }, 
}