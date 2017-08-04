<template>
	<div id="confimOrder">
		<Handers	></Handers>
		<div class="order1 m ng-scope">
			<p class="ord1-tit">填写并核对订单信息</p>
			<div class="rod001">
				<div class="ord1m l">
					<!-- 默认地址 -->
					<!-- ngRepeat: address in address --><!-- ngIf: address.hasDefault --><div class="dizhi ng-scope" ng-show="selectAddressA" ng-if="address.hasDefault" ng-repeat="address in address">
						<div class="ord1m_1">
							<p class="l">收货人：<span class="ng-binding">彭进</span>电话：<span class="ng-binding">18301232813</span></p>
						</div>
						<div class="ord1m_2">
							<a class="xuanze l" href="javascript:;"><!-- ngIf: address.hasDefault --><span ng-if="address.hasDefault" class="xz01 ng-scope" href=""></span><!-- end ngIf: address.hasDefault --></a><span class="ng-binding">浙江省归属感的故事会受到很多事</span>
						</div>
					</div><!-- end ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address --><!-- ngIf: address.hasDefault --><!-- end ngRepeat: address in address -->
					<div ng-show="selectAddressA" ng-click="MoreAddress()" style="color: #A00912;cursor:pointer;" class="ord1m_3">
						更多地址&gt;&gt;
					</div>

					<!-- 全部地址 -->
					<!-- end ngRepeat: address in address -->					
					<div ng-show="!selectAddressA" style="color: #A00912;cursor:pointer;" class="ord1m_3 ng-hide">
						请选择配送地址&gt;&gt;
					</div>

					<!--<div class="dizhi" ng-repeat="address in address">
						<div class="ord1m_1">
							<p class="l">收货人：<span>张建国</span>电话：<span>135216801</span></p>
						</div>
						<div class="ord1m_2">
							<a class="xuanze l" href="javascript:;"><span class="xz01" href=""></span></a><span>北京 北京市 顺义区 天竺 空港工业区A区天纬四街7号雅昌艺术中心</span>
						</div>
					</div>-->
					
					
				</div>
				<div class="ord1m2 r">
					<p class="r"><a href="mallAsp.html#/address_add?order=add"><input class="ord1m-btm" type="button" name="" id="" value="新增收货地址"></a></p>
				</div>
			</div>
		</div>
		
		<div class="order2 m ng-scope">
			<p class="ord2-tit">
				确认订单信息
			</p>
			<p class="ord2-nav">
				<span class="l">产品信息</span>
				<span class="r">小计</span>
				<span class="r">数量</span>
				<span class="r">单价</span>
			</p>
			<div class="ord2-main">
				<!-- ngRepeat: (productIndex,product) in product_d --><div ng-repeat="(productIndex,product) in product_d" class="div_order ng-scope">				
				<div class="or2m-t m">
					<div class="or2m-t-l l">
						<div class="l img">
							<img class="l" ng-src="http://testpcbuilder.artup.com/upload/2ffdd21d8db8442da0af195a7e496ffd1494483779.jpg" src="http://testpcbuilder.artup.com/upload/2ffdd21d8db8442da0af195a7e496ffd1494483779.jpg">
						</div>
						<!--<img class="l" src="img/fan_tl_03.jpg" />-->
						<div class="l">
							<p class="p1 ng-binding">未命名 2017-05-11 14:22</p>
							<!--
							<p class="p2">尺寸：<span>{{product.Attribute |splitSize}}</span></p>
							-->
							<p class="p2"><span class="ng-binding">框画/棕色木框/400X500mm                                                                             </span></p>
						</div>
					</div>
					
					<div class="or2m-t-1 l">
						<!--
						{{product.Attribute |splitBorber}}
						-->
					</div>
					
					<div class="or2m-t-2 ritdh l">
						<span class="s1">￥</span>
						<span class="s2 ng-binding">289</span>
						<span class="s1">元</span>
					</div>
					<div class="or2m-t-2 l">
						<span class="s1">x</span>
						<span class="s2 ng-binding">4</span>
					</div>
					<div class="or2m-t-2 redd l">
						<span class="s1">￥</span>
						<span class="s2 ng-binding">1156</span>
						<span class="s1">元</span>
					</div>
				</div>
				<!--隐藏的优惠卷-->
				<div class="or2m-b m">
					<!-- <p class="or2m-b-tit" ng-if="product.result.data.couponStrategy.length > 0">可使用优惠券：
						{{product.result.data.couponStrategy.length}}
					</p> -->
					<div class="or2bm aolectActive">
						<!-- ng-if="product.ProductID == items.goodsId" -->
						<!-- ngRepeat: items in product.result.data.couponStrategy --><!-- ngIf: product.ProductID == items.goodsId --><div ng-if="product.ProductID == items.goodsId" ng-click="setCode(productIndex,$index)" ng-repeat="items in product.result.data.couponStrategy" class="ng-scope">
								
								<!-- ngRepeat: link in items.coupons track by $index -->							
						</div><!-- end ngIf: product.ProductID == items.goodsId --><!-- end ngRepeat: items in product.result.data.couponStrategy -->					
					</div>
				</div>
			</div><!-- end ngRepeat: (productIndex,product) in product_d -->
			</div>
			<div class="notes m">
				<!--隐藏的优惠卷-->
				<div class="note-top">
					<p class="ntl l">备&nbsp;&nbsp;注&nbsp;&nbsp;<span>(提示：请勿填写有关支付、收货、发票方面的信息)</span></p>
					<p class="ntr r">
					<input class="ntrtxt ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="exchangeCouponCode" name="" id="exchangeCouponCode" value="" placeholder="请输入优惠码"><input class="ntrbtn" type="button" name="" ng-click="exchangeCode()" id="" value="兑换"></p>
					<!-- <span>{{exchangeCouponCode}}</span>	 -->
				</div>
				<input ng-model="remark" class="nthbz ng-pristine ng-untouched ng-valid ng-empty" type="" name="" id="" value="" placeholder="添加订单备注，限50个字">
			</div>

			<div class="bill m">
				<span class="billl l">发票信息</span>
				<p class="billr r"><span>普通发票 （纸质）</span><span>个 人</span><span>明细</span>
				<a ng-click="invoice_edit()" href="">修改</a><span>&gt;</span></p>
			</div>
			<!---->
			<div class="pay m">
				<div class="pay-tit">
					支付方式
				</div>
				<div class="pay-cont">
				<!-- {{$index+1==page?'active':''}} -->
					<!-- <a    class="a1 l active_pay" ng-click="fn_wx()" href=""> -->
					<a class="a1 l active_pay" ng-click="fn_wx()" href="">

						<div>
							
						</div>
						<p>微信支付</p>
					</a>
					<a class="a2 l" ng-click="fn_zfb()" href="">
						<div>
							
						</div>
						<p>支付宝支付</p>
						
					</a>
				</div>
			</div>
			<!---->
			<div class="detail m">
				<div class="dtl01 r">
					<p class=""><span id="oNUmber" class="redd ng-binding">4</span>件商品，商品总金额：￥<span id="oPrice" class="ng-binding">1156.00</span></p>
					<p class="">
					享受优惠：使用优惠劵抵现 <span id="couponPrefeAmount" class="ng-binding">0.00</span> 元，<span ng-show="!manYuan==0" class="">订单总价满<span id="manYuan" class="ng-binding">1000</span>元减<span id="prefePrice" class="ng-binding">700</span>元</span> 
						<!-- ngRepeat: products in arrProductStrategys -->
					</p>
					<p class="">合计优惠金额：-￥<span id="totalPrefeAmount" class="ng-binding">700.00元</span></p>
					<p class=""><span class="bul">中通快递</span>&nbsp;&nbsp;运费：￥<span>0.00</span></p>
				</div>
			</div>
			<div class="detail m" style="clear: both;">
				<div class="money r">
					<p class="l">应付金额：<span>￥</span><span id="goodsPayAmount" class="ng-binding">456.00</span></p>
				</div>
			</div>
			<div class="detail m mt2">
				<div class="btnaa r">
					<p class="l">
					<a class="btna1" href="#userCat">返回购物车</a> <input class="btnbtn" ng-click="placeOrder()" type="button" id="" value="提交订单"></p>
				</div>
			</div>
			<div class="detail m">
				<div class="defd r" style="padding-bottom: 100px;">
					<p class="l">寄送至：<span class="ng-binding">浙江省归属感的故事会受到很多事</span></p>
					<p class="l">收货人：<span class="ng-binding">彭进</span><span class="ng-binding">18301232813</span></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>
</style>