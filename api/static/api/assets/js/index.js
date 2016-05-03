var React = require('react')
var ReactDOM = require('react-dom')
var NewsItem = require('./StoryItem');



$.ajax({
  url: '/post/'
}).then(function (items) {
  // Log the data so we can inspect it in the developer console.
  console.log('items', items);
  // Use a fake rank for now.
  ReactDOM.render(<NewsItem item={items[0]} rank={1}/>, $('#container')[0]);
});