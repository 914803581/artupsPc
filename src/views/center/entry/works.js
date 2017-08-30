import '@/base/scss/common.scss'
import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '../WorksListView.vue'
import mixins from '@/mixins'

Vue.use(ElementUI)
Vue.mixin(mixins)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
