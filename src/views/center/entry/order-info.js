import '@/base/scss/common.scss'
import 'cube.css/src/scss/neat.scss'
import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '../OrderInfoView.vue'
import mixins from '@/mixins'
import utils from '@/components/component/util'

Vue.use(ElementUI)
Vue.mixin(mixins)
Vue.use(utils)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
