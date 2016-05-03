var React = require('react');
var url = require('url');
var moment = require('moment');

var NewsItem = React.createClass({
  getDomain: function () {
    return url.parse(this.props.item.url).hostname;
  },

  getRank: function () {
    return (
      <div className="newsItem-rank">
        {this.props.rank}.
      </div>
    );
  },
  
  getVote: function () {
    return (
      <div className="newsItem-vote">
        <a href={'https://news.ycombinator.com/vote?for=' + '&dir=up&whence=news'}>
          <img src="/static/api/assets/img/grayarrow2x.gif" width="10"/>
        </a>
      </div>
    );
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
        {this.getRank()}
        {this.getVote()}
        <div className="newsItem-itemText">
          {this.getTitle()}
          {this.getSubtext()}
        </div>
      </div>
    );
  }
});

module.exports = NewsItem;