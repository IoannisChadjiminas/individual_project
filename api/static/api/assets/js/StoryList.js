var React = require('react')
var auth = require('./auth')
var URI = require('urijs');
var LazyLoad = require('react-lazy-load')
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
    var parser = document.createElement('a');
    parser.href = this.props.url
    var x = parser.hostname;
    var time_posted;
    var time_posted_in_min = Math.floor(this.props.time_difference/60)
    var time_posted_in_hours = Math.floor(this.props.time_difference/3600)
    var time_posted_in_days = Math.floor(this.props.time_difference/(3600*24))

    if (time_posted_in_days < 1 ){

      if (time_posted_in_hours < 1) {
        
        if (time_posted_in_min < 1) {
          time_posted = 'just now'
          }
        else {
          time_posted = time_posted_in_min.toString() + ' mins ago'
        }
      }

      else {
        time_posted = time_posted_in_hours.toString() + ' hours ago'
      }
    }

    else {
        time_posted = time_posted_in_days.toString() + ' days ago'
    }

    return (
      <div className="storySubtitle-storyItems">
        <strong> story shared by {this.props.owner}  {time_posted} via the {x} </strong>
      </div>
    )
  }
}

export class StoryWrapTitle extends React.Component {
  render() {
    return (
      <div className="storyWrapTitle-storyItems">
        <StoryTitle title={this.props.title} url={this.props.url}/>
        <StorySubtitle owner={this.props.owner} time_difference={this.props.time_difference} url={this.props.url}/>
      </div>
    )
  }
}

var spanimagestyle = {
  fontSize: '8px'
}

var imageOpacity = {
  opacity: 1
}

export class EmoticonButton extends React.Component {
  constructor(){
    super()
    this.state = {first_time: 1, score_happy: 0, score_wow:0, score_sad:0, score:0, emotion:0, data_voter:[], id_voter: [], render_story:true}
    this.handleSatisfiedclick = this.handleSatisfiedclick.bind(this)
    this.handleWowclick = this.handleWowclick.bind(this)
    this.handleCryclick = this.handleCryclick.bind(this)
    this.handleReactPoint = this.handleReactPoint.bind(this)
    this.handleReactVote = this.handleReactVote.bind(this)
    this.find_largest_score = this.find_largest_score.bind(this)
    this.loadScoresFromServer = this.loadScoresFromServer.bind(this)
    this.loadVoterId = this.loadVoterId.bind(this)
    this.updateVoterPost = this.updateVoterPost.bind(this)
    this.url_vt;
  }

  componentDidMount(){
    this.setState({score: this.props.score, score_happy: this.props.score_happy,
      score_wow: this.props.score_wow, score_sad: this.props.score_sad, emotion: this.props.emotion, render_story:true})
  }
  

  handleSatisfiedclick() {
    this.state.first_time = 0
    this.setState({score_happy: this.state.score_happy, score:this.state.score, emotion:2})
    this.handleReactPoint({score: this.state.score, score_sad: this.state.score_sad, score_wow: this.state.score_wow, score_happy:this.state.score_happy, emotion:2, render_story:true})
  }

  handleWowclick() {
    this.state.first_time = 0
    this.setState({wow: this.state.score_wow, total:this.state.score, emotion:3})
    this.handleReactPoint({score: this.state.score, score_sad: this.state.score_sad, score_wow: this.state.score_wow, score_happy:this.state.score_happy, emotion:3, render_story:true})
  }

  handleCryclick() {
    this.state.first_time = 0
    this.setState({sad: this.state.score_sad, total:this.state.score, emotion:4})
    this.handleReactPoint({score: this.state.score, score_sad: this.state.score_sad, score_wow: this.state.score_wow, score_happy:this.state.score_happy, emotion:4, render_story:true})
  }

/* This is used to update the current story with the new score */
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
        console.log("Emotion")
        console.log(this.state.emotion)
        this.handleReactVote({post: this.props.id, emotion: this.state.emotion}) //I added the net ajax call after the success of the previous one
()
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  }

/**
 * [handleReactVote description]
 * This is used to relate the voter with the post that he had ranked. After this
 * calls the loadVoterId().
 * 
 */
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
        this.loadVoterId ()
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/voter/', status, err.toString());
      }.bind(this)
    });

  }

/**
 * [loadVoterId description]
 * This is used to find the id of voter-post relation for the current user for the current post.
 * To do this initially gets data from /api/voter/. That is all the relations voter-post for all the
 * stories that the current user ranked. 
 * 
 *  Then, it runs through this data to find the relation by trying to match the current story id
 *  with the post.id in the current relation
 */
   loadVoterId () {
    $.ajax({
      url: '/api/voter/',
      dataType: 'json',
      cache: false,
      headers: {
                'Authorization': 'Token ' + localStorage.token
      },
      success: function(data) {
        this.setState({data_voter: data})
      /* this loop is used to run through the data json array in order to find the id of post-voter
      relation. This id is used to create the url to update the emotion in django-database */
        for (var k=0; k<data.length; k++)
          if (data[k].post == this.props.id){
            this.setState({id_voter: data[k].id})
            break
        }
        console.log('Id')
        console.log(data[k].id)

        /* This url address is formed in order to update the relation between the current user
        and current story. It updates the emotion field. This field is used to determine which emoticon
        is pressed by the current user for the current story */
        this.url_vt = "/api/voter/" + data[k].id + "/"
        this.updateVoterPost({emotion: this.state.emotion})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

/**
 * [updateVoterPost description]
 * This is used to update the emotion label in the relation voter-post. 
 * 
 */
  updateVoterPost(updateDetails) {
    $.ajax({
      url: this.url_vt,
      dataType: "text", 
      contetType: "application/json", //when sending data to the server, use the content types
      type: 'PUT',
      data: updateDetails,
      headers: {
                'Authorization': 'Token ' + localStorage.token
            },
      success: function(data) {
        this.setState({data: data});
        this.loadScoresFromServer()
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

  }
  
  /* This is used to load the scores for the current story. It only updates the scores when the user
  push one emoticon */

 loadScoresFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({score: data.score, score_happy: data.score_happy, score_wow: data.score_wow, score_sad: data.score_sad})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  /**
   * This function is used to find the largest score for each story in order to assign the right emoticon to each
   * story
   */
  find_largest_score(sh, sw, sd)
  {
    var score_array = {score_happy:sh, score_wow:sw, score_sad:sd}
    var sortable = []

    if (sh==sd){
      sortable.push(["score_wow", score_array[sw]])
      return sortable[0]}

    if (sh==sw && (sd<sh && sd<sw)){
      sortable.push(["score_happy", score_array[sh]])
      return sortable[0]}

    if (sd==sw && (sh<sd && sh<sw)){
      sortable.push(["score_sad", score_array[sd]])
      return sortable[0]}

    for (var score in score_array)
      sortable.push([score, score_array[score]])
    sortable.sort(function(a, b) {return b[1] - a[1]})
    return sortable[0]

  }


  render() {
    if (this.props.source == 'home_list')
    {
      var highest_score = this.find_largest_score(this.props.score_happy, this.props.score_wow, this.props.score_sad)
      
      var source_to_pic;
      var score_to_display;
      switch(highest_score[0]){
        /*case "score_lol":
          source_to_pic = 'lol.png'
          score_to_display = highest_score[1]
          break*/
        case "score_happy":
          source_to_pic = 'happy.png'
          score_to_display = highest_score[1]
          break
        case "score_sad":
          source_to_pic = 'cry.png'
          score_to_display = highest_score[1]
          break
        default:
          source_to_pic = 'wow.png'
          score_to_display = highest_score[1]
          break
        /*default:
          source_to_pic = 'angry.png'
          score_to_display = highest_score[1]*/
      }

    

    }

    // This logic is used to find the correct variable value for emotion. Emotion
    // is then used to make lighter the correct emoticon icon. The lighter emoticon 
    // shows the last selection of the user.
    //  
    // It also checks that the user is authenticated. Otherwise it sets the emotion variable to
    // zero.
    if (localStorage.token) {
      var emotion = 0

      if (this.state.first_time == 1 ){
        emotion = this.props.emotion
      }
      else
        emotion = this.state.emotion

      }
    else {
      emotion = 0
    }



    return (
     <div className="storyEmoticons-storyItems"> 
          <div className="box">
           <span className="imageBox" >
           {/*<span style={spanimagestyle}> <strong> {this.props.score_lol} </strong> </span> <img  onClick={this.handleLolclick}  className="storyLol-storyItems" src="/static/api/assets/img/emoticons/lol.png" />*/}
           <span style={spanimagestyle}> <strong> {this.state.score_happy} </strong> </span> <img style={emotion == 2 ? imageOpacity : null}  onClick={this.handleSatisfiedclick}  className="storySatisfied-storyItems" src="/static/api/assets/img/emoticons/happy.png" />
           <span style={spanimagestyle}> <strong> {this.state.score_wow} </strong> </span> <img style = {emotion == 3 ? imageOpacity : null} onClick={this.handleWowclick}  className="storyWow-storyItems" src="/static/api/assets/img/emoticons/wow.png"/> 
           <span style={spanimagestyle}> <strong> {this.state.score_sad} </strong> </span> <img style = {emotion == 4 ? imageOpacity : null} onClick={this.handleCryclick}  className="storyCry-storyItems" src="/static/api/assets/img/emoticons/cry.png" /> 
           {/*<span style={spanimagestyle}> <strong> {this.props.score_angry} </strong> </span> <img  onClick={this.handleAngryclick}  className="storyAngry-storyItems" src="/static/api/assets/img/emoticons/angry.png"/>*/}
           </span>
           {this.props.source=="home_list" ? <span className="imageRank"> {/* <span className="pplReacted"> <strong className="pplReacted-number"> {score_to_display} </strong> <span className="pplReacted-text"> </span> </span>*/} <img src={"/static/api/assets/img/emoticons/"+ source_to_pic}/> </span>
           :<span className="imageRank"> {/* <span className="pplReacted"> <strong className="pplReacted-number"> {this.props.score_display} </strong> <span className="pplReacted-text"> </span> </span> */} <img src={"/static/api/assets/img/emoticons/"+ this.props.source}/> </span>}

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
          var parser = document.createElement('a');
          parser.href = this.props.url
          var x = parser.hostname;
      return(  
        <div>
          <div  className="storyItem-storyItems">
                  <br />                  
                  <hr />
                  <div className = "storyTitle"> <StoryWrapTitle  title={this.props.title} score={this.props.score} score_lol={this.props.score_lol} score_wow={this.props.score_wow} time_difference={this.props.time_difference}  
                  score_happy={this.props.score_happy} score_angry={this.props.score_angry} score_sad={this.props.score_sad} url={this.props.url} owner={this.props.owner}/> </div>
                  <p className='snippet'> {this.props.snippet} </p>
                  <LazyLoad height={100} offset ={100} once={true}>
                  <img className = "storyImg" src={this.props.img_src} /> 
                  </LazyLoad>
                  <p className="storySubtitle-storyItems" > {x} </p>
                  <hr />
                  <EmoticonButton  id={this.props.id} score={this.props.score} score_lol={this.props.score_lol} score_wow={this.props.score_wow}  
                  score_happy={this.props.score_happy} score_angry={this.props.score_angry} score_sad={this.props.score_sad} url={"/api/post/" + this.props.id + "/"} url_voter="/api/voter/" score_display={this.props.score_display}source={this.props.source} emotion={this.props.emotion}/>
          </div>
          <hr />
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
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} owner={story.owner} score_display={story.score} time_difference={story.time_difference} img_src={story.image_src} snippet={story.snippet} source={'home_list'} emotion={story.emotion} post={story.post} sa_sh={story.sa_sh} sa_sw={story.sa_sw} sa_ss={story.sa_ss}/>
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
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} owner={story.owner} score_display={story.score_lol} time_difference={story.time_difference} img_src={story.image_src} snippet={story.snippet} source={'lol.png'}  /> 
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
            return (story.score_happy>= story.score_wow && story.score_happy> story.score_sad)?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} owner={story.owner} score_display={story.score_happy} time_difference={story.time_difference} img_src={story.image_src} snippet={story.snippet} source={'happy.png'} emotion={story.emotion} post={story.post}  />
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
            return (story.score_wow> story.score_happy  && story.score_wow> story.score_sad) || (story.score_happy == story.score_sad) ?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} owner={story.owner} score_display={story.score_wow} time_difference={story.time_difference} img_src={story.image_src} snippet={story.snippet} source={'wow.png'} emotion={story.emotion} post={story.post}  />
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
            return story.score_sad> story.score_happy && story.score_sad>= story.score_wow?
              <StoryItem key={story.id} id={story.id} score={story.score} score_lol={story.score_lol} score_wow={story.score_wow}  
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} owner={story.owner} score_display={story.score_sad} time_difference={story.time_difference} img_src={story.image_src} snippet={story.snippet} source={'cry.png'} emotion={story.emotion} post={story.post} />
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
                score_happy={story.score_happy} score_angry={story.score_angry} score_sad={story.score_sad} title={story.title} url={story.url} owner={story.owner}  score_display={story.score_angry} time_difference={story.time_difference} img_src={story.image_src} snippet={story.snippet} source={'angry.png'} />
              : <span key={story.id}  />
          })}
      </div>

    )
  }
}

