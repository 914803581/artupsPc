// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    main: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '//image2.artup.com/pc/',
    multiplePageList: ['welcome', 'album', 'magnet', 'framed-pictures', 'poster', 'desk', 'loginCallback','lxj','heji'],
    userCenterPage: {
      path: 'center',
      template: 'index.html',
      keywords: '传给雅昌,画册,装饰画,有框画,海报定制,挂历2018',
      description: '传给雅昌是雅昌集团旗下中国最大的专业艺术影像输出平台，提供画册、装饰画、框画、海报、挂历等照片产品的个性定制服务。您选一张照片，我送您一件艺术品。',
      list: [{
        title: '我的作品',
        entry: 'works.js',
        pageName: 'works',
      }, {
        title: '草稿箱',
        entry: 'draft.js',
        pageName: 'draft',
      }, {
        title: '我的素材',
        entry: 'material.js',
        pageName: 'material',
      }, {
        title: '账户资料',
        entry: 'account.js',
        pageName: 'account',
      }, {
        title: '账户安全',
        entry: 'security.js',
        pageName: 'security',
      }, {
        title: '收货地址管理',
        entry: 'address.js',
        pageName: 'address',
      }, {
        path: 'center/address',
        title: '添加收货地址',
        entry: 'address-add.js',
        pageName: 'add',
      }, {
        path: 'center/address',
        title: '修改收货地址',
        entry: 'address-edit.js',
        pageName: 'edit',
      }, {
        title: '订单管理',
        entry: 'order.js',
        pageName: 'order',
      }, {
        path: 'center/order',
        title: '订单详情',
        entry: 'order-info.js',
        pageName: 'info',
      }, {
        title: '优惠券管理',
        entry: 'coupons.js',
        pageName: 'coupons',
      }]
    },
    userPage: {
      path: 'user',
      template: 'index.html',
      keywords: '传给雅昌,画册,装饰画,有框画,海报定制,挂历2018',
      description: '传给雅昌是雅昌集团旗下中国最大的专业艺术影像输出平台，提供画册、装饰画、框画、海报、挂历等照片产品的个性定制服务。您选一张照片，我送您一件艺术品。',
      list: [{
        title: '我的作品',
        entry: 'works.js',
        pageName: 'works',
      }, {
        title: '我的素材',
        entry: 'material.js',
        pageName: 'material',
      }, {
        title: '优惠券管理',
        entry: 'coupons.js',
        pageName: 'coupons',
      }]
    },
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8089,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
