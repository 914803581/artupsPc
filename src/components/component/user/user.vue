<template>
	<div id="user">
		<div class="work m">
			<div class="workL l">
				<ul class="worklist m">
				<li class="wli1">
					个人主页
				</li>
				<li class="wli ">
					<router-link  event="click" to="work">
						我的作品
					</router-link>
				</li>
				<li class="wli">
					<router-link  event="click" to="drafts">
						草稿箱 
					</router-link>
				</li>
				<li class="wli wli001">
					<router-link  event="click" to="material">
						我的素材
					</router-link>
				</li>
				<li class="wli2">
					账户管理
				</li>
				<li class="wli">
					<a href="">账户资料</a>
				</li>
				<li class="wli">
					<a href="">账户安全</a>
				</li>
				<li class="wli wli001">
					<a href="">收货地址管理</a>
				</li>
				<!--<li class="wli2">
					<a href="">收货地址管理</a>
				</li>-->
				<li class="wli3">
					订单
				</li>
				
				<li class="wli wli001">
					<a href="">订单管理</a>
				</li>
				<li class="wli4">
					优惠券
				</li>
				<li class="wli">
					<a href="#coupon">优惠券管理</a>
				</li>
			
			</ul>
			</div>
		<div class="workR r">
			<router-view></router-view>
		</div>
	</div>
</div>
</template>

<script>
</script>

<style>
</style>