import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import './citiehua.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import UnifyHeader from '@/components/header/header.vue'
import UnifyFooter from '@/components/footer/footer.vue'
import mixins from '@/mixins'

Vue.mixin(mixins)
Vue.use(ElementUI)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
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
  }
})
