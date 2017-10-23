import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import UnifyHeader from '@/components/header/header.vue'
import UnifyFooter from '@/components/footer/footer.vue'
import mixins from '@/mixins'
import $ from 'jquery'
import Api from '@/api.js'
import Utils from '../../components/component/util'

var bbsSlsectDate = {}

Vue.mixin(mixins)
Vue.use(ElementUI)
Vue.use(Utils)  // 工具函数
//eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    picturePrefix: '//test.artup.com/img/',
    attributeValues: [],
    listIndex: 0
  },
  components: {
    UnifyHeader,
    UnifyFooter
  },
  methods: {},
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  },
  mounted() {
    let vm = this
    //获取url的category值 以字符串的json格式保存到sessionStroage中
    let queryObj = {'category': this.getQueryString('category')}
    sessionStorage.setItem("urlQuery", this.getQueryString('category'))
    //获取挂历的基础数据
    Api.sku.queryAttributes(queryObj).then(res => {
      if (res) {
        console.log('挂历', res)
        this.attributeValues = res.data.attributes[0].attributeValues
        // var attributeValues = res.data.attributes[0]
        // bbsSlsectDate.name = res.data.name + '.' + attributeValues[0].attributeValues[0].name + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[2].attributeValues[0].code + '页'
        // bbsSlsectDate.skuCode = res.data.code + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[2].attributeValues[0].code
        // bbsSlsectDate.size = attributeValues[0].attributeValues[0].name
        // bbsSlsectDate.colorName = attributeValues[1].attributeValues[0].name
        // this.nowSize = bbsSlsectDate.skuCode
        // this.updataSkuData()
      }
    }, err => {
      console.log(err)
    })
  }
})
