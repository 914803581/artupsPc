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
			        <div class="themeDiv text-center themeStyle"> 
				        	<img class="img_div" src="http://image2.artup.com/static/pc/imgs/album/huise-255-355-4.png">
				        	<div class="thName">风景竖版</div>
				        	<div class="styleId">D01G01</div>
			        </div>
			        <div class="themeDiv text-center themeStyle">
			        		<img class="img_div" src="http://image2.artup.com/static/pc/imgs/album/huise-255-355-3.png">
			        		<div class="thName">纪实竖版</div>
			        		<div class="styleId">D02G01</div>
			        </div>
			        <div class="themeDiv text-center themeStyle">
			        		<img class="img_div" src="http://image2.artup.com/static/pc/imgs/album/huise-255-355-1.png">
			        		<div class="thName">建筑竖版</div>
			        		<div class="styleId">D04G01</div>
			        </div>
			        <div class="themeDiv text-center themeStyle">
			        		<img class="img_div select_theme" src="http://image2.artup.com/static/pc/imgs/album/huise-255-355-2.png">
			        		<div class="thName">人像竖版</div>
			        		<div class="styleId">D03G01</div>
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
	export default {
	    data () {
	      return {
	      	
	      }	
	   	},
	    components:{ //在再这里要注入我的组件
	      'nav-hander':navHander,
	      'nav-footer':footer
	    },
	    methods: {
	    
	    },
	    created(){//只执行一次
	    },
	    mounted(){
			$('.img_div').click(function(){
				$('.img_div').removeClass('active');
				$(this).addClass('active');
			})
	    }
  }
</script>

<style>
</style>