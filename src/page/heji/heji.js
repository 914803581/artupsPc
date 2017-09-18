import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import UnifyHeader from '@/components/header/header.vue'
import UnifyFooter from '@/components/footer/footer.vue'
import mixins from '@/mixins'
import $ from 'jquery'
import Api from '../../api.js'

Vue.mixin(mixins)
Vue.use(ElementUI)

var thing = new Vue({
  el: '#app',
  data: {
    picturePrefix: Api.STATIC_SERVER_HOST
  },
  components: {
    UnifyHeader,
    UnifyFooter
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
