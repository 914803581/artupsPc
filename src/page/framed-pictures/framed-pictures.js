import 'cube.css/src/scss/neat.scss'
import 'element-ui/lib/theme-default/index.css'
import './framed-pictures.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import SelectTpl from '../script/index.js'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import $ from 'jquery'
import Api from '../../api.js'
import Utils from '../../components/component/util'

Vue.use(ElementUI)
var selTpl = new SelectTpl()
Vue.use(Utils)  // 工具函数
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
  	var category = this.getQueryString('category');
    	sessionStorage.setItem("urlQuery",JSON.stringify(category)) 
  	
	Api.sku.queryAttributes({category:this.getFromSession("category")}).then(res=>{
		console.log(res)
	},err=>{
		
	})
  	const imgHttp = 'http://image2.artup.com/static/pc/imgs/';
  	$('.frameBox .picAndText .kuangAngle').click(function(){
  		
  	})
  	selTpl.init($('#picContainer'),'A','400x500','zm',function(ul){
		$('#picContainer').css({
		'background':'url('+imgHttp+'kuanghua/'+ul+'.jpg)',
		})
  	})
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
