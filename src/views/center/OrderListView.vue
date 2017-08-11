<template>
  <div class="order-manager" id="orderList">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
      	<div class="lineRs r">
			<ul id="ul_activePay" order-status="">
				<li ng-click="AllPay()">全部订单 <i class="activePay"></i></li>
				<li class="IdPay" ng-click="UnpaidPay()">待付款 <b aot-number="" class="ng-binding" style="width: 24px; right: -14px;">153</b> <i></i> </li>
				<li class="IdPay" ng-click="AlreadyPay()">已支付 <b aot-number="" class="ng-binding" style="width: 24px; right: -14px;">38</b> <i></i> </li>
				<li class="IdPay" ng-click="quantityCana()">已取消<b aot-number="" class="ng-binding" style="width: 24px; right: -14px;">14</b> <i></i> </li>
				<!-- <li ng-click="waitGoods()">待收货 <b aot-number>{{quantityWait}}</b> <i></i></li> -->
				
			</ul>
		</div>
        <div class="main">
          <div class="lineR lineR2 r">
				<div class="linetit m">
					<span class="l">订单列表</span>
					<p class="r">
						<span class="lets1 ">收货人</span>
						<span class="lets2 ">金额</span>
						<span class="lets3 ">状态</span>
						<span class="lets4 ">操作</span>
					</p>
				</div>
				<div ng-hide="totalCount==0" class="lineliet m ng-scope" order-height="" ng-repeat="order in orderList">
					<div class="linetop m">
						<span class="lines1">
							 <span class="ng-binding">2017-08-07 10:56:15</span>				
						</span>
						<span class="lines1">
							订单号：<span class="ng-binding">20170807105615939</span>
						</span>
					</div>
					<div class="linecont">
						<div class="lect1 l">
							<div class="lectmain ng-scope" ng-repeat="childOrder in order.orderItems">
								<div class="lectm_img l">
									<img ng-src="http://testpcbuilder.artup.com/upload/758a86701f2d4d29980a535c5d7066f31493877673.jpg" src="http://testpcbuilder.artup.com/upload/758a86701f2d4d29980a535c5d7066f31493877673.jpg">									
								</div>
								<div class="lectm_ct r">
									<p class="lect_top">
										<span class="1 ng-binding">
											未命名 2017-05-04 14:01
										</span>	
										<span class="lect_cer ng-binding" style="font-weight: normal;">
											
										</span>
										<span class="r ng-binding">
											x 1
										</span>
									</p>
									<p class="lect_cer ng-binding">
										海报/400X500mm                                                                                      
									</p>
									
								</div>
							</div>
							
						</div>
						<div class="lect0 lets1 l shr ng-binding" style="height: 123px;">
							彭进
						</div>
						<div class="lect0 lets2 l jine" style="height: 123px;">
							<p class="jine01 mt1">应付</p>
							<p class="jine02">￥
							 <span class="ng-binding">79.00</span></p>
							<p class="jine03">总 额 :￥<span class="ng-binding">79.00</span></p>
							<p class="jine04">（含运费：￥0）</p>
						</div>
						<div class="lect0 lets3 l fkzt" style="height: 123px;">
							<p class="ddfk mt1 ng-binding">等待支付</p>
							<!-- <p class="ywc">已完成</p> -->
							<p><a href="user.html#/orderInfo?orderId=23750">订单详情</a></p>
							<p><a href="user.html#/Logistics?orderCode=20170807105615939">查看物流</a></p>
						</div>
						<div class="lect0 lets4 l" style="height: 123px;">
						<!-- {{order.status}} -->
							<!-- ngIf: order.status!=-1 --><input class="csctbtn1 mt1 ng-scope" aa="微信支付" ng-click="payZF(order,order.paytypename)" ng-show="true" ng-if="order.status!=-1" type="button" name="" id="" value="付款"><!-- end ngIf: order.status!=-1 -->
							<!-- ngIf: order.status=='0' --><input ng-if="order.status=='0'" ng-show="true" ng-click="cancellationOrder($index)" class="csctbtn2 mt1 ng-scope" type="button" name="" id="" value="取消订单"><!-- end ngIf: order.status=='0' -->
							<!-- ngIf: order.status=='Cancel' || order.status==-1 -->
							<!-- <input ng-show="{{order.PaymentStatus!='2'}}"  ng-if="order.status=='Cancel'" ng-click="cancellationOrder($index)" class="csctbtn2 mt1" type="button" name="" id="" value="取消订单" /> -->
							<input style="cursor:default;" ng-show="false" class="csctbtn2 mt1 ng-hide" type="button" name="" id="" value="已支付">
						</div>
					</div>
				</div>
			</div>
        </div>
      <left-menu selected="order"></left-menu>
     </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header/header.vue'
  import Footer from '../../components/footer/footer.vue'
  import LeftMenu from '../../components/center/menu.vue'

  export default {
    data: function () {
      return {
        form: {
          email: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        imageUrl: ''
      }
    },
    methods: {},
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  @import "~cube.css/src/scss/neat.scss";

  .order-manager {
    .wrapper {
      width: 1152px;
      margin: 0 auto;
      overflow: hidden;
    }
    .container {
      padding: 14px 0 92px;
      background: #f1f1f1;
    }
    .main {
      position: relative;
      width: 960px;
      min-height: 668px;
      float: right;
      border-radius: 5px;
      border: 1px solid #dedede;
      background: #fff;
      h2.title {
        padding-left: 30px;
        font-size: 16px;
        line-height: 55px;
        border-bottom: 1px solid #DEDEDE;
      }
    }
  }

</style>
