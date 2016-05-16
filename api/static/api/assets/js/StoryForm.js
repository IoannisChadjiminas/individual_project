var React = require('react')

class StoryForm extends React.Component {
    constructor(){
      super()
      this.state={by:'', title:'', url: '', site_host:''}
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handleTitleChange = this.handleTitleChange.bind(this)
      this.handleUrlChange = this.handleUrlChange.bind(this)
      this.handleSiteHostChange = this.handleSiteHostChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleNameChange(event) {
      this.setState({by: event.target.value})
    }

    handleTitleChange(event) {
      this.setState({title: event.target.value})
    }

    handleUrlChange(event) {
      this.setState({url: event.target.value})
    }

    handleSiteHostChange(event) {
      this.setState({site_host: event.target.value})
    }

    handleSubmit(event) {
      event.preventDefault();
      var by = this.state.by.trim();
      var title = this.state.title.trim();
      var url = this.state.url.trim();
      var site_host = this.state.site_host.trim()
      if (!by || !title || !url || !site_host) {
        return;
      }
      this.props.onStorySubmit({by:by, title:title, url:url, site_host:site_host})
      
      this.setState({by:'', title:'', url: '', site_host:''})

    }

    
    render() {
      return (
        <form className = "storyForm" onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              placeholder="Your name" 
              value={this.state.by}
              onChange={this.handleNameChange}
            />
            <br />
            <br />
            <input 
              type="text" 
              placeholder="Title"
              value={this.state.title} 
              onChange={this.handleTitleChange}
            />
            <br />
            <br />
            <input 
              type="text" 
              placeholder="http://example/story"
              value={this.state.url}
              onChange={this.handleUrlChange} 
            />
            <br />
            <br />
            <input 
              type="text" 
              placeholder="SiteHost" 
              value={this.state.site_host}
              onChange={this.handleSiteHostChange}
            />
            <br />
            <br />
            <input type="submit" value="Post" />
        </form>
        )
    }
}

module.exports = StoryForm