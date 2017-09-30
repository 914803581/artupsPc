import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import UnifyHeader from '@/components/header/header.vue'
import UnifyFooter from '@/components/footer/footer.vue'
import mixins from '@/mixins'
import Utils from '../../components/component/util'
import $ from 'jquery'
import Api from '../../api.js'

Vue.mixin(mixins)
Vue.use(ElementUI)
Vue.use(Utils)

let bbsSlsectDate = {}

var thing = new Vue({
  el: '#app',
  data: {
    picturePrefix: Api.STATIC_SERVER_HOST,
    attributes: '',
    nowSize: '',
    nowColor: '',
    skuCode: '',
    price: 0
  },
  components: {
    UnifyHeader,
    UnifyFooter
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  },
  methods: {
    //开始定制
    startCustom() {
      if (localStorage.getItem("userDbId")) {
        location.href = '/album/travelEdit'
      } else {
        this.setUrlCallback()
      }
    },
    /*更新sku*/
    updataSkuData() {
      this.skuCode = this.getFromSession("category") + '.' + this.nowSize
      var jsons = {
        category: this.getFromSession("category"),
        parameter: this.skuCode
      }
      Api.sku.querySku(jsons).then(res => {
        console.log(res)
        bbsSlsectDate.tplCode = res.data.templateCode
        bbsSlsectDate.skuId = res.data.skuId
        bbsSlsectDate.price = res.data.price
        this.price = res.data.price
        bbsSlsectDate.category = res.data.category
        bbsSlsectDate.editCnfName = "pc_lvxingji_250X250_32_single"
        sessionStorage.setItem("titleName", "旅行记")
        setTimeout(function () {
          sessionStorage.setItem("bbsSlsectDate", JSON.stringify(bbsSlsectDate))
        }, 100)
      })
    }
  },
  mounted() {
    let that = this
    //获取url的category值 以字符串的json格式保存到sessionStroage中
    let queryObj = {
      'category': this.getQueryString('category'),
      'defDbId': this.getQueryString("defDbId"),
      'tplCode': this.getQueryString("tplCode")
    }

    sessionStorage.setItem("urlQuery", JSON.stringify(queryObj))
    //获取合集的类型
    Api.sku.queryAttributes({category: this.getFromSession("category")}).then(res => {
      if (res) {
        console.log(res.data)
        var attributeValues = res.data.attributes
        bbsSlsectDate.name = res.data.name + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[1].attributeValues[0].code + '页'
        bbsSlsectDate.skuCode = res.data.code + '.' + attributeValues[0].attributeValues[0].code + '.' + attributeValues[1].attributeValues[0].code
        bbsSlsectDate.size = attributeValues[0].attributeValues[0].name
        this.nowSize = bbsSlsectDate.skuCode
        this.updataSkuData()
        // bbsSlsectDate.name = res.data.name+'.';
        // this.frameSize = res.data.attributes[1].attributeValues
        // this.frameColor = res.data.attributes[0].attributeValues
        // setTimeout(function () {
        //   that.nowSize = $('.k1_Foot1size_click').eq(0).attr('size')
        //   that.nowColor = $('.kuangAngle').eq(0).attr('code')
        //   that.nowColorZW = $('.kuangAngle').eq(0).attr('colorname')
        //   that.updataSkuData()
        // })
      }
    }, err => {
      console.log(err)
    })
  }
})
