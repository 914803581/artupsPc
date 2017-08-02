import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// 引入ajax注入原型
import Axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router' // 引入路由
import store from '@/store' // 引入vuex
// 自定义的一些全局组件
import Handers from '@/components/component/hander'
import Footers from '@/components/component/footer'
import utils from './components/component/util'

Vue.use(ElementUI)
Vue.use(VueAxios, Axios) // 引入ajax

Vue.use(Handers)
Vue.use(Footers)
Vue.use(utils)  // 工具函数

// 线上环境的时候隐藏一些打印的东西
// Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
