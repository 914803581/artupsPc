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
    listIndex: 0,
    nowSize: '',
    price: 0
  },
  components: {
    UnifyHeader,
    UnifyFooter
  },
  methods: {
    getDataGuaLi(number) {
      //获取url的category值 以字符串的json格式保存到sessionStroage中
      let queryObj = {
        'category': this.getQueryString('category'),
        'defDbId': this.getQueryString("defDbId"),
        'tplCode': this.getQueryString("tplCode")
      }
      sessionStorage.setItem("urlQuery", JSON.stringify(queryObj))
      Api.sku.queryAttributes(queryObj).then(res => {
        if (res) {
          console.log('挂历', res)
          this.attributeValues = res.data.attributes[0].attributeValues
          var attributeValues = res.data.attributes[0]
          bbsSlsectDate.name = res.data.name + '.' + attributeValues.attributeValues[number].name + '.13页'
          bbsSlsectDate.skuCode = res.data.code + '.' + attributeValues.attributeValues[number].code + '.13'
          bbsSlsectDate.size = attributeValues.attributeValues[number].name
          this.nowSize = bbsSlsectDate.skuCode
          this.updataSkuData()
        }
      }, err => {
        console.log(err)
      })
    },
    /*更新sku*/
    updataSkuData() {
      this.skuCode = this.getQueryString("category") + '.' + this.nowSize
      var jsons = {
        category: this.getQueryString("category"),
        parameter: this.skuCode
      }
      Api.sku.querySku(jsons).then(res => {
        bbsSlsectDate.tplCode = res.data.templateCode
        bbsSlsectDate.skuId = res.data.skuId
        bbsSlsectDate.price = res.data.price
        this.price = res.data.price
        bbsSlsectDate.category = res.data.category
        if (res.data.size === "500X600") {
          bbsSlsectDate.editCnfName = "pc_guali_500X600_single"
          sessionStorage.setItem('gualiType', '竖')
        } else if (res.data.size === "600X500") {
          bbsSlsectDate.editCnfName = "pc_guali_600X500_single"
          sessionStorage.setItem('gualiType', '横')
        } else if (res.data.size === "260X380") {
          bbsSlsectDate.editCnfName = "pc_guali_260X380_single"
          sessionStorage.setItem('gualiType', '小挂历')
        }
        sessionStorage.setItem("titleName", "挂历")
        setTimeout(function () {
          sessionStorage.setItem("bbsSlsectDate", JSON.stringify(bbsSlsectDate))
          var tplCode = JSON.parse(sessionStorage.getItem("urlQuery"))
          tplCode.tplCode = res.data.templateCode
          sessionStorage.setItem("urlQuery", JSON.stringify(tplCode))
        }, 100)
      })
    },
    checkData(index) {
      this.listIndex = index
      this.getDataGuaLi(index)
    }
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  },
  mounted() {
    let vm = this

    //获取挂历的基础数据
    vm.getDataGuaLi(0)
  }
})
