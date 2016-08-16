var React = require('react')
var $ = require('jquery')
var StoryList = require('./StoryList').StoryList
var StoryForm = require('./StoryForm')

class StoryBox extends React.Component {
  constructor(){
    super();
    this.state = {data: []}
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
      {/* Should treat the state object as immutable, 
      and you need to re-create the array so its pointing to a new object, set the new item, then reset the state.*/}
      for (var i=0; i<this.state.data.length; i++){
        for (var j=0; j< data.length; j++)
          if (this.state.data[i].id == data[j].post) {
             this.state.data[i]["emotion"] = data[j].emotion
             break
          }
          else {
              this.state.data[i]["emotion"] = -1
          }
     }
          var newArray = this.state.data;     
          this.setState({data: newArray});
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
    return (
      <div className="storyBox">
        <StoryList data={this.state.data} />
      </div>
    );
  }
}

module.exports = StoryBox;