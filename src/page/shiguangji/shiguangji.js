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
Vue.use(Utils)
let bbsSlsectDate = {}

var selTpl = new SelectTpl()
Vue.use(Utils)  // 工具函数
//eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    // picturePrefix: '//test.artup.com/img/'
    picturePrefix: Api.STATIC_SERVER_HOST,
    nowSize: '',
    attributeValues: {},
    lineIndex: 0 //选中的索引
  },
  components: {
    'unify-header': Header,
    'unify-footer': Footer
  },
  methods: {
    checkColor(oIndex) {
      this.lineIndex = oIndex
      // alert(oIndex)
      this.getData(oIndex)
    },
    /*更新sku*/
    updataSkuData() {
      this.skuCode = this.getQueryString("category") + '.' + this.nowSize
      var jsons = {
        category: this.getQueryString("category"),
        parameter: this.skuCode
      }
      Api.sku.querySku(jsons).then(res => {
        console.log(res)
        bbsSlsectDate.tplCode = res.data.templateCode
        bbsSlsectDate.skuId = res.data.skuId
        bbsSlsectDate.price = res.data.price
        this.price = res.data.price
        bbsSlsectDate.category = res.data.category
        bbsSlsectDate.editCnfName = "pc_shiguangji_170X235_24_single"
        sessionStorage.setItem("titleName", "拾光集")
        setTimeout(function () {
          sessionStorage.setItem("bbsSlsectDate", JSON.stringify(bbsSlsectDate))
          var tplCode = JSON.parse(sessionStorage.getItem("urlQuery"))
          tplCode.tplCode = res.data.templateCode
          sessionStorage.setItem("urlQuery", JSON.stringify(tplCode))
        }, 100)
      })
    },
    //  获取最初数据
    getData(munber) {
      Api.sku.queryAttributes({category: this.getQueryString("category")}).then(res => {
        console.log(res.data.attributes[0].attributeValues)
        console.log(res.data.attributes[1].attributeValues)
        console.log(res.data.attributes[2].attributeValues)
        this.attributeValues = res.data.attributes
        var attributeValues = res.data.attributes
        bbsSlsectDate.name = res.data.name + '.' + attributeValues[1].attributeValues[munber].name + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[2].attributeValues[0].code + '页'
        bbsSlsectDate.skuCode = res.data.code + '.' + attributeValues[1].attributeValues[munber].code + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[2].attributeValues[0].code
        bbsSlsectDate.size = attributeValues[0].attributeValues[0].name
        bbsSlsectDate.colorName = attributeValues[1].attributeValues[munber].name
        // bbsSlsectDate.colorName = attributeValues[1].attributeValues[0].namebbsSlsectDate.name = res.data.name + '.' + attributeValues[1].attributeValues[0].name + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[2].attributeValues[0].code + '页'
        // bbsSlsectDate.skuCode = res.data.code + '.' + attributeValues[1].attributeValues[0].code + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[2].attributeValues[0].code
        // bbsSlsectDate.size = attributeValues[0].attributeValues[0].name
        // bbsSlsectDate.colorName = attributeValues[1].attributeValues[0].name
        this.nowSize = bbsSlsectDate.skuCode
        this.updataSkuData()
      })
    }
  },
  mounted() {
    var vm = this
    //获取url的category值 以字符串的json格式保存到sessionStroage中
    let queryObj = {
      'category': this.getQueryString('category'),
      'defDbId': this.getQueryString("defDbId"),
      'tplCode': this.getQueryString("tplCode")
    }
    sessionStorage.setItem("urlQuery", JSON.stringify(queryObj))
    //获取合集的类型
    this.getData(0)
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
