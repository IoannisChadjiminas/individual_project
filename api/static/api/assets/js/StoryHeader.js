var React = require('react');
var _ = require('lodash');

var NewsHeader = React.createClass({
  //getLogo: function () {
  //  return (
  //    <div className="newsHeader-logo">
  //      <a href="https://www.ycombinator.com"><img src="/static/api/assets/img/y18.gif"/></a>
  //    </div>
  //  );
  //},

  getTitle: function () {
    return (
      <div className="newsHeader-title">
        <a className="newsHeader-textLink" href=""> Sharing Stories </a>
      </div>
    );
  },
  
  getLogin: function () {
    return (
      <div className="newsHeader-login">
        <a className="newsHeader-textLink" href="">login</a>
      </div>
    );
  },

  getNav: function () {
    var navLinks = [
      {
        name: 'happy',
        url: 'happy'
      },
      {
        name: 'angry',
        url: 'angry'
      },
      {
        name: 'sad',
        url: 'sad'
      },
      {
        name: 'inspiring',
        url: 'inspiring'
      },
      {
        name: 'wow',
        url: 'wow'
      },
    ];
    return (
      <div className="newsHeader-nav">
        {_(navLinks).map(function (navLink) {
          return (
            <a key={navLink.url} className="newsHeader-navLink newsHeader-textLink" href={navLink.url}>
              {navLink.name}
            </a>
          );
        }).value()}
      </div>
    );
  },
  
  render: function () {
    return (
      <div className="newsHeader">
        {this.getTitle()}
        {this.getNav()}
        {this.getLogin()}
      </div>
    );
  },



});

module.exports = NewsHeader;