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
    picturePrefix : Api.STATIC_SERVER_HOST,
    shufflingList : ['index_03.jpg', 'index_04.jpg', 'index_05.jpg', 'index_06.jpg', 'index_07.jpg'],
    frameSize : {},//框画的尺寸
    frameType : {},//框画的类型
    frameShowBool : true ,//true不选择框画尺寸是显示的dome   -false时候显示选择尺寸dome
	nowSize : '',//当前框的尺寸
	nowType : '', //当前框的类型
	skuCode : '' ,//用来取价钱的sku
	price : '', //框画的价钱
	//editFrameSize : {}//图片编辑框的宽高obj{width,height}
  },
  components: {
    'unify-header': Header,
    'unify-footer': Footer
  },
  methods:{
  	/*点击更新框画尺寸
  	 * index: 点击对象的索引
  	 */
  	updateSizeFn (index){
  		$('.k1_Foot1size_click').removeClass('sizeActive');
  		$('.k1_Foot1size_click').eq(index).addClass('sizeActive');
  		this.frameShowBool = false;//选择尺寸  显示带尺寸的dome
  		var showTypeStr = 'box' + $('.k1_Foot1size_click').eq(index).attr('sizetype');//获取尺寸对应框的class
  		selTpl.setShowImgSize(showTypeStr , 'picContainerOne');
  		this.nowSize = $('.k1_Foot1size_click').eq(index).attr('size');
  		this.updataSkuData();
  		//this.editFrameSize = selTpl.getEditFrameSize();
  	},
  	/*点击更新框形
  	 * index：点击对象的索引
  	 */
  	updataTypeFn (index){
  		$('.kuangAngle').removeClass('typeActive');
  		$('.kuangAngle').eq(index).addClass('typeActive');
  		this.nowType = $('.kuangAngle').eq(index).attr('code');
  		this.updataSkuData();
  	},
  	/*更新sku*/
  	updataSkuData (){
  		this.skuCode = this.getFromSession("category") + '.' + this.nowSize + '.' + this.nowType;
  		var jsons = {
  			category:this.getFromSession("category"),
  			parameter:this.skuCode
  		};
  		Api.sku.querySku(jsons).then(res=>{
  			this.price = res.data.price;
  		});
  	},
  	/*开始定制*/
  	startCustom (){
  		location.href = '/framed/framedEdit?size='+this.nowSize;
  	}
  	
  },
  mounted(){
  	var that = this;
  	//获取url的category值 以字符串的json格式保存到sessionStroage中
	var queryObj = {'category':this.getQueryString('category')};
    	sessionStorage.setItem("urlQuery",JSON.stringify(queryObj)); 
	//获取框画的类型
	Api.sku.queryAttributes({category:this.getFromSession("category")}).then(res=>{
		if(res){
			console.log(res)
			this.frameSize = res.data.attributes[1].attributeValues;
			this.frameType = res.data.attributes[0].attributeValues;
			/*默认获取价和展示图片
			 * 默认选择第一个
			 */
			setTimeout(function(){
				that.nowSize = $('.k1_Foot1size_click').eq(0).attr('size');
				that.nowType = $('.kuangAngle').eq(0).attr('code');
				that.updataSkuData();
			});
		}

	},err=>{
		
	});
  },
  created: function () {
    document.body.style.cssText = 'opacity:1';
  }
})
