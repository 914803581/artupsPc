import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import '@/base/scss/common.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import SelectTpl from '../script/index.js'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import $ from 'jquery'
import Api from '@/api.js'
import Utils from '../../components/component/util'
import mixins from '@/mixins'
import filter from '../../filter.js'

Vue.mixin(mixins)
Vue.use(ElementUI)

var selTpl = new SelectTpl()
Vue.use(Utils)  // 工具函数
//eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    picturePrefix: '//test.artup.com/img/'
  },
  components: {
    'unify-header': Header,
    'unify-footer': Footer
  },
  methods: {},
  mounted() {
    var that = this
    //获取url的category值 以字符串的json格式保存到sessionStroage中
    var queryObj = {
      category: this.getQueryString('category'),
      defDbId: this.getQueryString("defDbId")
    }
    sessionStorage.setItem("urlQuery", JSON.stringify(queryObj))
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
