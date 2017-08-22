import 'cube.css/src/scss/neat.scss'
import 'element-ui/lib/theme-default/index.css'
import './album.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import SelectTpl from '../script/index.js'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import $ from 'jquery'
import Api from '../../api.js'
import Utils from '../../components/component/util'
import filter from '../../filter.js'

Vue.use(ElementUI)
var selTpl = new SelectTpl()
Vue.use(Utils)  // 工具函数
//eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    picturePrefix: '//test.artup.com/img/',
    shufflingList: ['index_03.jpg', 'index_04.jpg', 'index_05.jpg', 'index_06.jpg', 'index_07.jpg'],
    frameShowBool : true ,//true不选择框画尺寸是显示的dome   -false时候显示选择尺寸dome
    frameSize : {},//框画的尺寸
    nowSize : '',//当前框的尺寸
	nowPage : '', //当前页数
	nowColor : '', //当前color
	skuCode : '' ,//用来取价钱的sku
	price : '', //框画的价钱
	previewImageUrl : '',//框形预览图
	frameType : '', //框形
	framePage: '', //页数	
	frameColor: '', //颜色	
	editImageUrl : '' //编辑框背景图
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
		if(this.frameShowBool == true){
			this.frameShowBool = false;//选择尺寸  显示带尺寸的dome
			//this.updataTypeFn(0);//当不选择框形的时候默认选择第一个框形
		};
		$('.k1_Foot1size_click').removeClass('sizeActive');
		$('.k1_Foot1size_click').eq(index).addClass('sizeActive');
	
		var showTypeStr = 'box' + $('.k1_Foot1size_click').eq(index).attr('sizetype');//获取尺寸对应框的class
		selTpl.setShowImgSize(showTypeStr , 'picContainerOne');
		this.nowSize = $('.k1_Foot1size_click').eq(index).attr('size');
		this.updataSkuData();
	},
	/*更新sku*/
  	updataSkuData (){
  		this.skuCode = this.getFromSession("category") + '.' + this.nowSize + '.' + this.nowPage + '.' + this.nowColor;
  		//console.log(this.skuCode)
  		var jsons = {
  			category:this.getFromSession("category"),
  			parameter:this.skuCode
  		};
  		Api.sku.querySku(jsons).then(res=>{
  			console.log(res)
  			this.previewImageUrl = res.data.previewImageUrl;//框形预览图
  			this.editImageUrl = res.data.editImageUrl;//编辑框背景图
  			this.price = res.data.price;
  		});
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
			this.frameSize = res.data.attributes[2].attributeValues;
			this.frameColor = res.data.attributes[0].attributeValues;
			this.framePage = res.data.attributes[1].attributeValues;
			/*默认获取价和展示图片
			 * 默认选择第一个
			 */
			setTimeout(function(){
				that.nowSize = $('.k1_Foot1size_click').eq(0).attr('size');
				that.nowPage = $('.k1_FootPage_click').eq(0).attr('page');
				that.nowColor = $('.kuangAngle').eq(1).attr('code');
				that.updataSkuData();
			});
		}

	},err=>{
		
	});
	
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
