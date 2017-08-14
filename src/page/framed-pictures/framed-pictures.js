import 'cube.css/src/scss/neat.scss'
import 'element-ui/lib/theme-default/index.css'
//import './welcome.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import SelectTpl from '../script/index.js'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'

Vue.use(ElementUI)
var selTpl = new SelectTpl()
//eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    picturePrefix: '//test.artup.com/img/',
    shufflingList: ['index_03.jpg', 'index_04.jpg', 'index_05.jpg', 'index_06.jpg', 'index_07.jpg']
  },
  components: {
    'unify-header': Header,
    'unify-footer': Footer
  },
  methods:{
  	
  },
  mounted(){
  	selTpl.init()
  }
})

