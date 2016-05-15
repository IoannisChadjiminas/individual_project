var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: './api/static/api/assets/js/index.js', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

  output: {
      path: path.resolve('./api/static/api/assets/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
         new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        })
  ], //add all common plugins here

  module: {
    loaders: [
    {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    }
    ], //add all common loaders here
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}