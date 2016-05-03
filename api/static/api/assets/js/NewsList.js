var _ = require('lodash');
var NewsHeader = require('./StoryHeader');
var NewsItem = require('./StoryItem');
var React = require('react');

var NewsList = React.createClass({
  getMore: function () {
    return (
      <div className="newsList-more">
        <a className="newsList-moreLink" href="">More</a>
      </div>
    );
  },

  render: function () {
    return (
      <div className="newsList">
        <NewsHeader/>
        <div className="newsList-newsItems">
          {_(this.props.items).map(function (item, index) {
            return <NewsItem key={item.id} item={item} rank={index + 1}/>;
          }.bind(this)).value()}
          {this.getMore()}
        </div>
      </div>
    );
  }
});

module.exports = NewsList;