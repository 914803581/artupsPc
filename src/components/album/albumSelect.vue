<template>
	<div id="albumSelect">
		<nav-hander></nav-hander>
		<div class="oprateOut">
		    <div class="oprateBox">
		        <div class="space"></div>
		        <div class="titleName">选择画册主题</div>
		        <div class="oprateBtn">
		            <div class="btnStyle cancel">取消</div>
		            <div class="btnStyle create">创建画册</div>
		        </div>
		    </div>
		</div>
		<div class="container-box">
		    <div class="container-fluid ">
		        <div class="row themeBox">
			        <div @click='checkActive(index)' class="themeDiv text-center themeStyle" v-for="(item,index) in typeDataList"> 
				        	<img class="img_div" :src="picturePrefix+item">
				        	<div class="thName">风景竖版</div>
				        	<div class="styleId">D01G01</div>
			        </div>
		        </div>
		    </div>
		</div>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import navHander from '../header/header.vue'
	import footer from '../footer/footer.vue'
  	import Api from '../../api.js'
	
	export default {
	    data () {
	      return {
	      	picturePrefix : Api.STATIC_SERVER_HOST,
	      	typeDataList : {}//板式数组
	      }	
	   	},
	    components:{ //在再这里要注入我的组件
	      'nav-hander':navHander,
	      'nav-footer':footer
	    },
	    methods: {
		    checkActive(index){//选中样式
		    		$('.img_div').removeClass('active');
		    		$('.img_div').eq(index).addClass('active');
		    }
	    },
	    created(){//只执行一次
	    },
	    mounted(){
	    		var jsons = {
		    		"colorName":this.$route.query.color,
		    		"name":"画册."+this.$route.query.color+"."+this.$route.query.size+'.'+this.$route.query.page,
		    		"skuCode":this.$route.query.sku,
		    		"category":this.$route.query.category,
		    		"price":this.$route.query.price,
		    		"skuId":this.$route.query.skuId,
		    		"size":this.$route.query.size,
		    		"titleName":"画册"
	    		};
	    		sessionStorage.setItem('bbsSlsectDate',JSON.stringify(jsons));
	    		sessionStorage.setItem('titleName','画册');
	    		var typeDataList = this.$route.query.editImageUrl;
	    		this.typeDataList =  typeDataList.split(',');
	    		console.log(this.typeDataList)
	    		console.log(this.$route.query.editImageUrl)
			$('.img_div').click(function(){
				$('.img_div').removeClass('active');
				$(this).addClass('active');
			})
	    }
  }
</script>

<style>
</style>