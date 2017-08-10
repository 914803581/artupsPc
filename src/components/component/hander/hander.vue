<template>
	<div id="handers">
			<div class="head">
	<div class="header m">
		<h1 class="logo l">
			<a href="javascript:void(0);">
				<img src="http://test.artup.com/img/login_1.png">
			</a>
		</h1>
		<ul class="nav l">
			<li style="border: none;">
				<a href="javascript:void(0);">首页</a>
			</li>
			<li>	
				<a href="javascript:void(0);">画册</a>
			</li>
			<li>
				<a href="/bbsEdit">宝宝书</a>
			</li>
			<li>
				<a href="javascript:void(0);">框画</a>
			</li>
			<li>
				<a href="javascript:void(0);">海报</a>
			</li>
			<li>
				<a href="javascript:void(0);">台历</a>
			</li>
			<li>
				<a href="javascript:void(0);">挂历</a>
			</li>
		</ul>
		<div class="mineIM r " >
			<ol class="user_login">

				<li><a href="">&nbsp;</a></li>
				<li><a href="http://image2.artup.com/artup-build/builder/service/toIndex.do?client=pc&source=wx">扫码登录</a></li>
				
			</ol>
		</div>
		<div class="mineIM r "  style="display: none;">			
			<a class="touxiang l" href="javascript:void(0);"> 
				<img class="" src="http://img13.artimg.net/passport/avatar/002/141/731/150_150.png">
				</a>
			<div class="names l showCat" >
			<span  class="span_cut">昵称</span>			
			 <ul class="user_list">
			 	<li><a href="javascript:void(0);">我的主页</a></li>
			 	<li><a href="javascript:void(0);">账户管理</a></li>
			 	<li><a href="javascript:void(0);">订单管理</a></li>
			 	<li><a href="javascript:void(0);">优惠券</a></li>
			 	<li><a href="javascript:void(0);">我的作品</a></li>
			 	<li><a href="javascript:void(0);">我的草稿箱</a></li>
			 	<li><a href="javascript:void(0);">我的素材</a></li>			 	
			 	<li ><a href="javascript:void(0);">退出登录</a></li>
			 </ul>
			</div>
			<a class="cars">购物车有<span>1</span>件商品</a>
			<a href="/cart" class="hander_cat">
				<div class="img_cat">
					<b aot-numbers="" class="">1</b>
					<img src="http://test.artup.com/img/hander_cat.png">
				</div>
				<span>购物车</span>
			</a>
		</div>
	</div>
</div>
		
	 </div>
	</div>
</template>

<script>
	export default{
		name:"nav-hander",
		data () {
		    return {
		      msg: ''
		    }
		  },
	    methods:{
			
	    },
	    mounted(){
	    	   
		}
	}
</script>
<style>
</style>