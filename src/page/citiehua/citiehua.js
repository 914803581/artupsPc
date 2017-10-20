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
    sizeList: [{
      id: 'A',
      size: '300x400',
      price: 399,
      hxprice: 79
    }, {
      id: 'B',
      size: '400x300',
      price: 399,
      hxprice: 79
    }, {
      id: 'C',
      size: '400x600',
      price: 499,
      hxprice: 119
    }, {
      id: 'D',
      size: '600x400',
      price: 499,
      hxprice: 119
    }],
    borderList: [{
      color: 'yms',
      name: '原木色实木框'
    }, {
      color: 'hs',
      name: '黑色实木框'
    }],
    currentSelect: {
      type: 0,
      size: 0,
      border: 0
    }
  },
  methods: {
    /*更新sku*/
    // updataSkuData() {
    //   this.skuCode = this.getFromSession("category") + '.' + this.nowSize + '.' + this.nowType
    //   var jsons = {
    //     category: this.getFromSession("category"),
    //     parameter: this.skuCode
    //   }
    //   Api.sku.querySku(jsons).then(res => {
    //     console.log(res)
    //     this.previewImageUrl = res.data.previewImageUrl //框形预览图
    //     this.editImageUrl = res.data.editImageUrl //编辑框背景图
    //     this.price = res.data.price
    //     this.templateCode = res.data.templateCode
    //     this.skuId = res.data.skuId
    //   })
    // },
    select: function (type, size, border) {
      size = !size ? this.sizeList[0] : size
      border = !border ? this.borderList[0] : border
      this.currentSelect = {
        type: type,
        size: size,
        border: border
      }
    }
  },
  components: {
    UnifyHeader,
    UnifyFooter
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  },
  mounted() {
    let vm = this
    //获取url的category值 以字符串的json格式保存到sessionStroage中
    let queryObj = {'category': this.getQueryString('category')}
    vm.category = this.getQueryString('category')
    sessionStorage.setItem("urlQuery", vm.category)
    //获取磁贴画的类型
    Api.sku.queryAttributes(queryObj).then(res => {
      if (res) {
        console.log('磁贴画', res)
      }
    }, err => {
      console.log(err)
    })
    //获取磁贴画芯的类型
    Api.sku.queryAttributes({'category': 'citiehuaxin'}).then(res => {
      if (res) {
        console.log('磁贴画心', res)
      }
    }, err => {
      console.log(err)
    })
  }
})
