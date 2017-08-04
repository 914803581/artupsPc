<template>
	<div id="cart">
		<Handers	></Handers>
		<div class="p_cat ng-scope">
		<dl ng-if="!items.length==0" class="ng-scope">
		<div class="cat_hander" style="width: 1136px;">
			<i class="iconfont">&#xe603;</i> 购物车
		</div>
		<dt>
			 <div class="cat_hander">
			 	 <div class="tab01">
			 	 	
				  </div>
				  <div class="tab02">
				  	商品信息
				  </div>
				  <div class="tab03">
				  	单价
				  </div>
				  <div class="tab04">
				  	数量
				  </div>
				  <div class="tab05">
				  	小计
				  </div>
				  <div class="tab06">
				  	操作
				  </div>

			 </div>				  			
		</dt>
		<dd  class="ng-scope">
			<div class="cat_hander">
			 	 <div class="tab01" ng-click="chengSelect($index)">
			  		<p><b><i ng-show="item.Allselect" class="ng-hide"></i></b>选择</p>
				  </div>
				  <div class="tab02">
				  	<div class="img_cat">
				  		<img ng-src="http://testpcbuilder.artup.com/upload/758a86701f2d4d29980a535c5d7066f31493877673.jpg" alt="" src="http://testpcbuilder.artup.com/upload/758a86701f2d4d29980a535c5d7066f31493877673.jpg">
				  	</div>
				  	<div class="cp_msg">
				  		<span class="ng-binding">未命名 2017-05-04 14:01</span>
				  		<p class="ng-binding">海报/400X500mm                                                                                      </p>
				  	</div>
				  </div>
				  <div class="tab03">
				  	<p class="ng-binding"><b>¥</b>79<i>元</i></p>
				  </div>
				  <div class="tab04">
				  	<div class="cat_num">
				  		<a href="Javascript: void(0)" ng-click="catAdd($index)" class="cat_num_first">+</a>
				  		<b class="ng-binding">1</b>
				  		<a href="Javascript: void(0)" ng-click="catReduce($index)" class="cat_num_last">-</a>
				  	</div>
				  </div>
				  <div class="tab05">
				  	<p class="ng-binding"><b>¥</b>79<i>元</i></p>
				  </div>
				  <div class="tab06">
				  	<b ng-click="catDelect($index)"></b>
				  </div>
			</div>
		</dd>
		
		</dl>
		<ol class="pay_cat ng-scope" ng-if="!items.length==0">
			<li class="cat_pay01">
				<p ng-click="allSelect()"><b><i ng-show="Allselect" class="ng-hide"></i></b>全选</p>
			</li>
			<li ng-click="allDelect()" class="cat_pay02">
				全部删除
			</li>
			<li class="cat_pay03">
				已选商品 <i class="ng-binding">0</i> 件  合计（不含运费）：¥<b class="ng-binding">0</b> 					
				<a ng-click="confirmOrder()" href="/confimOrder">结算</a>
			</li>
			<li></li>
		</ol>
	</div>
	<Footers></Footers>
</div>

</template>

<script>
</script>

<style>
</style>