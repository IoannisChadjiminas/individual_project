var React = require('react')
require('../css/storyNav.scss')

var divStyle ={
  float: 'right'
}

class StoryNav extends React.Component {
    render() {
        return (
            <ul className="storyEmoticons-storyNav">
                <li> <a href=""> <strong> Sharing Stories </strong>  </a>  </li>
                <li> <a href=""> <img className="storyLol-storyNav" src="/static/api/assets/img/emoticons/lol.png" />  </a>  </li>
                <li> <a href=""> <img className="storySatisfied-storyNav" src="/static/api/assets/img/emoticons/happy.png" /> </a>  </li>
                <li> <a href=""> <img className="storyWow-storyNav" src="/static/api/assets/img/emoticons/wow.png"/> </a>  </li>
                <li> <a href=""> <img className="storyCry-storyNav" src="/static/api/assets/img/emoticons/cry.png" />  </a>  </li>
                <li> <a href="">  <img className="storyAngry-storyNav" src="/static/api/assets/img/emoticons/angry.png"/>  </a>  </li>
                <li style={divStyle}> <a href=""> <strong> Sign Up </strong> </a>  </li>
                <li style={divStyle}> <a href=""> <strong> Login </strong> </a>  </li>
                <li style={divStyle}> <a href=""> <img className="storySearch-storyNav" src="/static/api/assets/img/nav_symbols/src.jpg" /> </a> </li>
                <li style={divStyle}> <a href=""> <img className="storyUpload-storyNav" src="/static/api/assets/img/nav_symbols/upload-arrow.png" /> </a> </li>
            </ul>
        )
    }
}

            //<li style={divStyle}> <a className="active" href=""> About </a> </li>

module.exports = StoryNav;