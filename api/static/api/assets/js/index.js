var React = require('react')
var ReactDOM = require('react-dom')

var BooksList = React.createClass({
    loadItemsFromServer: function(){
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadItemsFromServer();
        setInterval(this.loadItemsFromServer, 
                    this.props.pollInterval)
    }, 
    render: function() {
        if (this.state.data) {
            console.log('DATA!')
            var itemNodes = this.state.data.map(function(item){
                return <div className="storyItem">
                        <a className="storyTitle-link" href={item.url}> {item.title} </a>
                       </div>
            })
        }
        return (
            <div>
             {itemNodes}
            </div>
        )
    }
})

ReactDOM.render(<BooksList url='/post/' pollInterval={1000} />, 
    document.getElementById('container'))