import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import './citiehua.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import UnifyHeader from '@/components/header/header.vue'
import UnifyFooter from '@/components/footer/footer.vue'
import mixins from '@/mixins'
import $ from 'jquery'
import Api from '@/api.js'
import Utils from '../../components/component/util'

Vue.mixin(mixins)
Vue.use(ElementUI)
Vue.use(Utils)  // 工具函数
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    category: '',
    picturePrefix: '//test.artup.com/img/',
    shufflingList: ['index_03.jpg', 'index_04.jpg', 'index_05.jpg', 'index_06.jpg', 'index_07.jpg'],
    drawData: null,
    drawCoreData: null,
    priceMap: {},
    currentSelect: {
      type: 0,
      size: 0,
      border: 0,
      price: 0
    }
  },
  methods: {
    select: function (type, size, border) {
      let newVal = {type: type, price: ''}
      if (size) {
        newVal.size = size
      }
      if (border) {
        newVal.border = border
      }
      if (type === 1) {
        if (!newVal.size && !this.currentSelect.size) {
          newVal.size = this.drawData.attributes[1].attributeValues[0].code
        }
        if (!newVal.border && !this.currentSelect.border) {
          newVal.border = this.drawData.attributes[0].attributeValues[0]
        }
      }
      this.currentSelect = Object.assign(this.currentSelect, newVal)
      let category = type === 1 ? 'citiehua' : 'citiehuaxin'
      let parameter = `${category}.${this.currentSelect.size}.${this.currentSelect.border.code}`
      if (!this.priceMap[parameter]) {
        this._querySku(category, parameter)
      } else {
        this.currentSelect.price = this.priceMap[parameter]
      }
    },
    drawCoreFill: function (res) {
      this.drawCoreData = res.data
    },
    drawFill: function (res) {
      this.drawData = res.data
    },
    /**
     * 获取 磁铁画、磁铁画芯 套餐
     * @private
     */
    _queryAttributes: function (category, fun) {
      Api.sku.queryAttributes({
        category: category
      }).then(res => {
        fun(res)
      })
    },
    _querySku: function (category, parameter) {
      let _self = this
      Api.sku.querySku({
        category: category,
        parameter: parameter
      }).then(res => {
        _self.currentSelect.price = res.data.price
        _self.priceMap[parameter] = res.data.price
      })
    }
  },
  components: {
    UnifyHeader,
    UnifyFooter
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
    this.category = this.getQueryString('category')
    sessionStorage.setItem('urlQuery', this.category);
    [this.category, 'citiehuaxin'].forEach(function (item) {
      this._queryAttributes(item, item === 'citiehuaxin' ? this.drawCoreFill : this.drawFill)
    }.bind(this))
  }
})
