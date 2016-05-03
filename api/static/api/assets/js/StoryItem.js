var React = require('react');
var url = require('url');
var moment = require('moment');

var NewsItem = React.createClass({
  getDomain: function () {
    return url.parse(this.props.item.url).hostname;
  },
  
  getSubtext: function () {
    return (
      <div className="newsItem-subtext">
        {this.props.item.score} points by {this.props.item.by}
      </div>
    );
  },

  getTitle: function() {
    return (
        <div className="newsItem-title">
            <a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
            <span className="newsItem-domain">
                ({this.getDomain()})
            </span>
        </div>
    );
  },

  render: function () {
    return (
     <div className="newsItem">
        {this.getTitle()}
        {this.getSubtext()}
     </div>
    );
  }
});

module.exports = NewsItem;