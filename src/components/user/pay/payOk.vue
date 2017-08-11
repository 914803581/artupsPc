<template>
<div id="htm">
	<Handers	></Handers>
		<!--支付成功-->
		<div id="payCancel">
			<div class="topBox payOk">
				<div class="msg">
					<div class="leftBox">
						<i>√</i>
					</div>
					<div class="rightBox">
						<ul>
							<li>订单支付成功！</li>
							<li>订单号：<span>{{orderCode}}</span></li>
							<li>金额: <span>{{price}}元</span></li>
							
						</ul>
					</div>
				</div>
			</div>
			<div class="payOkBtn">
				<ul>
					<li @click="jxdz()">继续定制</li>
					<li @click='ckdd()'>查看订单</li>
				</ul>
			</div>
		</div>
		<Footers></Footers>
</div>
</template>

<script>
	import Api from '../../../API.js'
	import { MessageBox } from 'element-ui';

		export default{
			data(){
				return{
					price:0,
					orderCode:''
				}
			},
			methods:{
				jxdz(){
					location.href = '/'
				},
				ckdd(){
					
				}
		
			},
			mounted(){
				this.price = this.$route.query.price;
				this.orderCode = this.$route.query.orderCode;
		
		
			 
		}

	}
	
</script>
<style>
</style>