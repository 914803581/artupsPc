import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// 引入ajax注入原型
import Axios from 'axios'
import VueAxios from 'vue-axios'

// 引入路由
import router from '@/router'
// 引入vuex
import store from '@/store'
Vue.use(ElementUI)
// 引入ajax
Vue.use(VueAxios, Axios)

//自定义的一些全局组件
import Handers from '@/components/component/hander'
import Footers from '@/components/component/footer'
import utils from './components/component/util';

Vue.use(Handers)
Vue.use(Footers)
Vue.use(utils) //工具函数




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
