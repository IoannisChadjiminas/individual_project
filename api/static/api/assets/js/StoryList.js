var React = require('react')
require("../css/storyItem.scss")

class StoryTitle extends React.Component {
  render() {
    return (
      <div className="storyTitle-storyItems">
        <a className="storyTitle_Link-storyItems" target="_blank" href={this.props.url}> {this.props.title} </a>
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
  render() {
    return (
     <div className="storyEmoticons-storyItems"> 
        <br />
        <hr />
          <div className="box">
           <img className="storyLol-storyItems" src="/static/api/assets/img/emoticons/lol.png" /> 
           <img className="storySatisfied-storyItems" src="/static/api/assets/img/emoticons/happy.png" />
           <img className="storyWow-storyItems" src="/static/api/assets/img/emoticons/wow.png"/> 
           <img className="storyCry-storyItems" src="/static/api/assets/img/emoticons/cry.png" /> 
           <img className="storyAngry-storyItems" src="/static/api/assets/img/emoticons/angry.png"/>
           <CommentLink />
           <ShareLink />
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
              <StoryWrapTitle title={this.props.title} url={this.props.url} by={this.props.by} site_host={this.props.site_host} /> 
              <EmoticonButton />
          </div>
          <br />
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
              <StoryItem key={story.id} title={story.title} url={story.url} by={story.by} site_host={story.site_host} />
            )
          })}
      </div>
    )
  }
}

module.exports = StoryList;



