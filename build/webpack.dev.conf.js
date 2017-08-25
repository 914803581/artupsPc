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

config.build.multiplePageList.forEach((page) => {
  webpackConfig.entry[page] = `./src/page/${page}/${page}.js`
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

var userCenter = config.build.userCenterPage;
userCenter.list.forEach((page) => {
  let entryKey = `${(page.path || userCenter.path)}/${page.pageName}`
  webpackConfig.entry[entryKey] = `./src/views/center/entry/${page.entry}`
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist/${page.path || userCenter.path}/${page.pageName}.html`),
    template: path.resolve(__dirname, `../src/views/center/template/${page.template || userCenter.template}`),
    title: page.title,
    keywords: page.keywords || userCenter.keywords,
    description: page.description || userCenter.description,
    inject: true,
    chunks: [entryKey],
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
