hu<template>
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
				<a href="/album/imgEditMsg?category=baobaoshu">宝宝书</a>
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
		<div v-show="!handerInfo"  class="mineIM r " >
			<ol class="user_login">

				<li><a href="">&nbsp;</a></li>
				<!--<li @click="Login"><a href="javascript:void(0)" >扫码登录</a></li>-->
				<li><a href="loginCallback?userDbId=2221214&userName=昵称啊">扫码登录</a></li>
			</ol>
		</div>
		<div v-show="handerInfo" class="mineIM r" >
			<a class="touxiang l" href="javascript:void(0);">
				<img class="" src="http://img13.artimg.net/passport/avatar/002/141/731/150_150.png">
				</a>
			<div  @mouseenter="userBox($event)"   class="names l showCat" >
			<span  class="span_cut">{{userName}}</span>
			<el-collapse-transition>
			 <ul @mouseleave="overNav($event)" v-show="navBox" class="user_list">
			 	<li><a href="javascript:void(0);">我的主页</a></li>
<!--			 	<li><a href="javascript:void(0);">账户管理</a></li>-->
			 	<li><a href="/center/order">订单管理</a></li>
			 	<!--<li><a href="javascript:void(0);">优惠券</a></li>-->
			 	<li><a href="/center/works">我的作品</a></li>
			 	<li><a href="/center/draft">我的草稿箱</a></li>
			 	<li><a href="/center/material">我的素材</a></li>
			 	<li @click="LogOut"><a href="javascript:void(0);">退出登录</a></li>
			 </ul>
			 </el-collapse-transition>
			</div>
			<a class="cars">购物车有<span>1</span>件商品</a>
			<a href="/user/cart" class="hander_cat">
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
	import Api from '@/api.js'
	export default{
		name:"nav-hander",
		data () {
		    return {
		     	handerInfo:false,
		     	userName:'',
		     	navBox:false
		    }
		  },
	    methods:{
					Login(){
							Api.user.login({"t" : "1"}).then(res=>{
									console.log(res);
									alert(res.data.authorizeCodeUrl);
									window.location.href=res.data.authorizeCodeUrl;
							},err=>{
								alert('Error');
							});
						//http://image2.artup.com/artup-build/wx/pc/authorizeCodeUrl.do?client=pc

					},
	    		//退出登录的操作
	    		LogOut(){
	    			localStorage.setItem("userDbId","");
	    			this.handerInfo=false;
	    			this.$router.push({path:"/"})
	    		},
			userBox($event){
				this.navBox = true;
				$event.stopPropagation();
			},
			overNav($event){
				$event.stopPropagation();
				this.navBox = false;

			}
	    },
	    mounted(){
	    		if (localStorage.getItem('userDbId')) {
	    			this.handerInfo = true;
	    		}
	    	   this.userName = localStorage.getItem("userName")
		}
	}
</script>
<style>

</style>
