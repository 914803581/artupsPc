var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.main,
      template: path.resolve(__dirname, '../multiple/index.html'),
      inject: true,
      resourcePrefix: '/',
      chunks: ['manifest', 'vendor', 'main']
    }),
    new FriendlyErrorsPlugin()
  ]
});

['home', 'album', 'magnet', 'framed-pictures', 'poster'].forEach((page) => {
  webpackConfig.entry[page] = `./src/script/${page}.js`
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist/${page}.html`),
    template: path.resolve(__dirname, `../multiple/${page}.html`),
    inject: true,
    chunks: [page],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    resourcePrefix: '/',
    chunksSortMode: 'dependency'
  }));
});

module.exports = webpackConfig
