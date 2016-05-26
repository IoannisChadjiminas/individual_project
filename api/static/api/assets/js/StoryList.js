var React = require('react')
var auth = require('./auth')
require("../css/storyItem.scss")


export class StoryTitle extends React.Component {
  render() {
    return (
      <div className="storyTitle-storyItems">
        <a className="storyTitle_Link-storyItems" target="_blank" href={this.props.url}> <strong> {this.props.title} </strong> </a>
      </div>
    )
  }
}

export class StorySubtitle extends React.Component {
  render() {
    return (
      <div className="storySubtitle-storyItems">
        <strong> story shared by {this.props.by} 8 hours ago via the {this.props.site_host} </strong>
      </div>
    )
  }
}

export class StoryWrapTitle extends React.Component {
  render() {
    return (
      <div className="storyWrapTitle-storyItems">
        <StoryTitle title={this.props.title} url={this.props.url}/>
        <StorySubtitle by={this.props.by} site_host={this.props.site_host}/>
      </div>
    )
  }
}

var spanimagestyle = {
  fontSize: '8px'
}

export class EmoticonButton extends React.Component {
  constructor(){
    super()
    this.state = {lol: 0, happy: 0, wow: 0, sad:0, angry:0, total:0}
    this.handleLolclick = this.handleLolclick.bind(this)
    this.handleSatisfiedclick = this.handleSatisfiedclick.bind(this)
    this.handleWowclick = this.handleWowclick.bind(this)
    this.handleCryclick = this.handleCryclick.bind(this)
    this.handleAngryclick = this.handleAngryclick.bind(this)
    this.handleReactPoint = this.handleReactPoint.bind(this)
    this.handleReactVote = this.handleReactVote.bind(this)
  }

  componentDidMount(){
    this.setState({lol: this.props.score_lol, total: this.props.score, happy: this.props.score_happy,
      wow: this.props.score_wow, sad: this.props.score_sad, angry: this.props.score_angry })
  }
  
  handleLolclick() {
    this.setState({lol: this.state.lol, total:this.state.total})
    this.handleReactPoint({score: this.state.total, score_lol:this.state.lol, emotion:1})

  }

  handleSatisfiedclick() {
    this.setState({happy: this.state.happy, total:this.state.total})
    this.handleReactPoint({score: this.state.total, score_happy:this.state.happy, emotion:2})
  }

  handleWowclick() {
    this.setState({wow: this.state.wow, total:this.state.total})
    this.handleReactPoint({score: this.state.total, score_wow: this.state.wow, emotion:3})
  }

  handleCryclick() {
    this.setState({sad: this.state.sad, total:this.state.total})
    this.handleReactPoint({score: this.state.total, score_sad: this.state.sad, emotion:4})
  }

  handleAngryclick() {
    this.setState({angry: this.state.angry, total:this.state.total})
    this.handleReactPoint({score: this.state.total, score_angry: this.state.angry, emotion:5})
    
  }

  handleReactPoint(reactPoint) {
    $.ajax({
      url: this.props.url,
      dataType: "text", 
      contetType: "application/json", //when sending data to the server, use the content types
      type: 'PUT',
      data: reactPoint,
      headers: {
                'Authorization': 'Token ' + localStorage.token
            },
      success: function(data) {
        this.setState({data: data});
        this.handleReactVote({post: this.props.id}) //I added the net ajax call after the success of the previous one
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  }

  handleReactVote(reactVote) {
    $.ajax({
      url: '/api/voter/',
      dataType: 'json',
      type: 'POST',
      data: reactVote,
      headers: {
                'Authorization': 'Token ' + localStorage.token
            },
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/voter/', status, err.toString());
      }.bind(this)
    });

  }


  render() {
    return (
     <div className="storyEmoticons-storyItems"> 
        <br />
        <hr />
          <div className="box">
           <span className="imageBox" >
           <span style={spanimagestyle}> <strong> {this.props.score_lol} </strong> </span> <img  onClick={this.handleLolclick}  className="storyLol-storyItems" src="/static/api/assets/img/emoticons/lol.png" /> 
           <span style={spanimagestyle}> <strong> {this.props.score_happy} </strong> </span> <img  onClick={this.handleSatisfiedclick}  className="storySatisfied-storyItems" src="/static/api/assets/img/emoticons/happy.png" />
           <span style={spanimagestyle}> <strong> {this.props.score_wow} </strong> </span> <img  onClick={this.handleWowclick}  className="storyWow-storyItems" src="/static/api/assets/img/emoticons/wow.png"/> 
           <span style={spanimagestyle}> <strong> {this.props.score_sad} </strong> </span> <img  onClick={this.handleCryclick}  className="storyCry-storyItems" src="/static/api/assets/img/emoticons/cry.png" /> 
           <span style={spanimagestyle}> <strong> {this.props.score_angry} </strong> </span> <img  onClick={this.handleAngryclick}  className="storyAngry-storyItems" src="/static/api/assets/img/emoticons/angry.png"/>
           <CommentLink />
           <ShareLink />
           </span>
           {this.props.source=="home_list" ? <span className="pplReacted"> <strong className="pplReacted-number"> {this.props.score_display} </strong> <span className="pplReacted-text"> reacted!</span> </span>
           :<span className="imageRank"> <span className="pplReacted"> <strong className="pplReacted-number"> {this.props.score_display} </strong> <span className="pplReacted-text"> </span> </span> <img src={"/static/api/assets/img/emoticons/"+ this.props.source}/> </span>}

    </div>

    </div>
    )
  }
}

export class CommentLink extends React.Component {
    render() {
        return (
            <a className="storyComment-storyItems" href=""> <strong>comment</strong> </a>
        )
    }
}


export class ShareLink extends React.Component {
    render() {
        return (
            <a className="storyShare-storyItems" href=""> <strong>share</strong> </a>
        )
    }
}

export class StoryItem extends React.Component {
    render() {
      return(  
        <div>
          <div  className="storyItem-storyItems">
              <hr />
              <StoryWrapTitle  title={this.props.title} score={this.props.score} score_lol={this.props.score_lol} score_wow={this.props.score_wow}  
                score_happy={this.props.score_happy} score_angry={this.props.score_angry} score_sad={this.props.score_sad} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> 
              <EmoticonButton  id={this.props.id} score={this.props.score} score_lol={this.props.score_lol} score_wow={this.props.score_wow}  
                score_happy={this.props.score_happy} score_angry={this.props.score_angry} score_sad={this.props.score_sad} url={"/api/post/" + this.props.id + "/"} url_voter="/api/voter/" score_display={this.props.score_display} source={this.props.source}/>
          </div>
          <p className="storyItem-br"/>
        </div>
        )
    }
}

export class StoryList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
              return <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} by={story.by} site_host={story.site_host} score_display={story.score} source={'home_list'}  />
          })}
      </div>

    )
  }
}


export class StoryLolList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
            return story.score_lol> story.score_happy && story.score_lol> story.score_wow && story.score_lol> story.score_sad && story.score_lol> story.score_angry ?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} by={story.by} site_host={story.site_host} score_display={story.score_lol} source={'lol.png'} />
              : <span key={story.id}  />
          })}
      </div>

    )
  }
}

export class StoryHappyList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
            return story.score_happy> story.score_lol && story.score_happy> story.score_wow && story.score_happy> story.score_sad && story.score_happy> story.score_angry ?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} by={story.by} site_host={story.site_host}score_display={story.score_happy} source={'happy.png'}  />
              : <span key={story.id}  />
          })}
      </div>

    )
  }
}

export class StoryWowList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
            return story.score_wow> story.score_happy && story.score_wow> story.score_lol && story.score_wow> story.score_sad && story.score_wow> story.score_angry ?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} by={story.by} site_host={story.site_host}score_display={story.score_wow} source={'wow.png'}  />
              : <span key={story.id}  />
          })}
      </div>

    )
  }
}

export class StorySadList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
            return story.score_sad> story.score_happy && story.score_sad> story.score_wow && story.score_sad> story.score_lol && story.score_sad> story.score_angry ?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} by={story.by} site_host={story.site_host} score_display={story.score_sad} source={'cry.png'} />
              : <span key={story.id}  />
          })}
      </div>

    )
  }
}

export class StoryAngryList extends React.Component {
  render() {
    return (
      <div className="storyList">
          {this.props.data.map(function(story){
            return story.score_angry> story.score_happy && story.score_angry> story.score_wow && story.score_angry> story.score_lol && story.score_angry> story.score_sad ?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} by={story.by} site_host={story.site_host} score_display={story.score_angry} source={'angry.png'} />
              : <span key={story.id}  />
          })}
      </div>

    )
  }
}

