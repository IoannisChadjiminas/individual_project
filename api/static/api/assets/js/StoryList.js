var React = require('react')
require("../css/storyItem.scss")

class StoryTitle extends React.Component {
  render() {
    return (
      <div className="storyTitle-storyItems">
        <a className="storyTitle_Link-storyItems" target="_blank" href={this.props.url}> <strong> {this.props.title} </strong> </a>
      </div>
    )
  }
}

class StorySubtitle extends React.Component {
  render() {
    return (
      <div className="storySubtitle-storyItems">
        <strong> story shared by {this.props.by} 8 hours ago via the {this.props.site_host} </strong>
      </div>
    )
  }
}

class StoryWrapTitle extends React.Component {
  render() {
    return (
      <div className="storyWrapTitle-storyItems">
        <StoryTitle title={this.props.title} url={this.props.url}/>
        <StorySubtitle by={this.props.by} site_host={this.props.site_host}/>
      </div>
    )
  }
}

class EmoticonButton extends React.Component {
  constructor(){
    super()
    this.state = {lol: 0, satisfied: 0, wow: 0, cry:0, angry:0, total:0}
    this.handleLolclick = this.handleLolclick.bind(this)
    this.handleSatisfiedclick = this.handleSatisfiedclick.bind(this)
    this.handleWowclick = this.handleWowclick.bind(this)
    this.handleCryclick = this.handleCryclick.bind(this)
    this.handleAngryclick = this.handleAngryclick.bind(this)
    this.handleReactPoint = this.handleReactPoint.bind(this)
  }

  componentDidMount(){
    this.setState({lol: this.props.score, total: this.props.score})
  }
  
  handleLolclick() {
    this.setState({lol: this.state.lol +1, total:this.state.total +1})
    this.handleReactPoint({score: this.state.total+1})

  }

  handleSatisfiedclick() {
    this.setState({satisfied: this.state.satisfied + 1, total:this.state.total +1})
    this.handleReactPoint({score: this.state.total+1})
  }

  handleWowclick() {
    this.setState({wow: this.state.wow + 1, total:this.state.total +1})
    this.handleReactPoint({score: this.state.total+1})
  }

  handleCryclick() {
    this.setState({cry: this.state.cry + 1, total:this.state.total +1})
    this.handleReactPoint({score: this.state.total+1})
  }

  handleAngryclick() {
    this.setState({angry: this.state.angry + 1, total:this.state.total +1})
    this.handleReactPoint({score: this.state.total+1})
  }

  handleReactPoint(reactPoint) {
    $.ajax({
      url: this.props.url,
      dataType: "text", 
      contetType: "application/json", //when sending data to the server, use the content types
      type: 'PUT',
      data: reactPoint,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  }


  render() {
    return (
     <div className="storyEmoticons-storyItems"> 
        <br />
        <hr />
          <div className="box">
           <img  onClick={this.handleLolclick}  className="storyLol-storyItems" src="/static/api/assets/img/emoticons/lol.png" /> 
           <img  onClick={this.handleSatisfiedclick}  className="storySatisfied-storyItems" src="/static/api/assets/img/emoticons/happy.png" />
           <img  onClick={this.handleWowclick}  className="storyWow-storyItems" src="/static/api/assets/img/emoticons/wow.png"/> 
           <img  onClick={this.handleCryclick}  className="storyCry-storyItems" src="/static/api/assets/img/emoticons/cry.png" /> 
           <img  onClick={this.handleAngryclick}  className="storyAngry-storyItems" src="/static/api/assets/img/emoticons/angry.png"/>
           <CommentLink />
           <ShareLink />
           <span className="pplReacted"> <strong className="pplReacted-number"> {this.state.total} </strong> <span className="pplReacted-text"> reacted to this! </span> </span>
    </div>

    </div>
    )
  }
}

class CommentLink extends React.Component {
    render() {
        return (
            <a className="storyComment-storyItems" href=""> <strong>comment</strong> </a>
        )
    }
}


class ShareLink extends React.Component {
    render() {
        return (
            <a className="storyShare-storyItems" href=""> <strong>share</strong> </a>
        )
    }
}

class StoryItem extends React.Component {
    render() {
      return(  
        <div>
          <div  className="storyItem-storyItems">
              <hr />
              <StoryWrapTitle  title={this.props.title} score={this.props.score} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> 
              <EmoticonButton  id={this.props.id} score={this.props.score} url={"http://localhost:5000/post/" + this.props.id + "/"} />
          </div>
          <p className="storyItem-br"/>
        </div>
        )
    }
}

class StoryList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
            return (
              <StoryItem key={story.id} id={story.id} score={story.score} title={story.title} url={story.url} by={story.by} site_host={story.site_host} />
            )
          })}
      </div>

    )
  }
}

module.exports = StoryList;



