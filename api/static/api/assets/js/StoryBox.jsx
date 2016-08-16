var React = require('react')
var $ = require('jquery')
var StoryList = require('./StoryList').StoryList
var StoryForm = require('./StoryForm')

class StoryBox extends React.Component {
  constructor(){
    super();
    this.state = {data: [], voter_data: []}
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
    this.loadVoterData = this.loadVoterData.bind(this)
  }

  loadDataFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        this.loadVoterData();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  loadVoterData() {
    $.ajax({
      url: '/api/voter/',
      dataType: 'json',
      cache: false,
      headers: {
                'Authorization': 'Token ' + localStorage.token
            },
      success: function(data) {
        this.setState({voter_data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/voter/', status, err.toString());
      }.bind(this)
    });

  }


  componentDidMount() {
    this.loadDataFromServer();
    this.loadInterval = setInterval(this.loadDataFromServer, this.props.pollInterval);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
 }

  render() {
    var new_array = this.state.data
    var new_array = new_array.push(this.state.voter_data)
    return (
      <div className="storyBox">
        <StoryList data={new_array} />
      </div>
    );
  }
}

module.exports = StoryBox;