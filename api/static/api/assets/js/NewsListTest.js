var NewsList = require('./NewsList');
var React = require('react');
var ReactDOM = require('react-dom');

$.ajax({
  url: '/post/'
}).then(function (items) {
  ReactDOM.render(<NewsList items={items}/>, $('#content')[0]);
});