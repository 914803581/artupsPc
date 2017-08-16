import 'cube.css/src/scss/neat.scss'
import 'element-ui/lib/theme-default/index.css'
import './album.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import SelectTpl from '../script/index.js'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import $ from 'jquery'

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
//	$('#picContainer').css({
//		'background':'url(http://test.artup.com/builder/imgs/kuanghua/400x500-zm.jpg)',
//		
//	})
  	
  	$('.frameBox .picAndText .kuangAngle').click(function(){
  		
  	})
  	selTpl.init($('#picContainer'),'A','400x500','zm',function(ul){
		$('#picContainer').css({
		'background':'url(http://test.artup.com/builder/imgs/album/255x355-hui.jpg)',
		})
  	})
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
