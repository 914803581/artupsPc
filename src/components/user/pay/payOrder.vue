<template>
	<div id="htm">
		<Handers	></Handers>
		<!--支付页面-->
		<div id="payOrder"  >
			<div class="top">
				支付 <span>{{price}}</span>元
			</div>
			<div class="content">
				<div class="price">
					<div class="ewm">
						<p class="tit">微信扫码支付</p>
						<div  id="prView">
						</div>
						<p class="tm"><span>30分钟</span>此二维码 过期</p>
					</div>
				</div>
			</div>
		</div>
		
		
		<Footers></Footers>
		<div id="zfb_pay_fk">
	
		</div>
	</div>
	
</template>
<script>
	import Api from '../../../API.js'
	import { MessageBox } from 'element-ui';

		export default{
			data(){
				return{
					price:0,
					times:30,
					subject:''
				}
			},
			methods:{
			pay(jsons){
	        	 	Api.car.orderPay(jsons).then(res=>{  
	        	 		console.log(res)
	        	 		if(res.data.paymentType == 'zfb'){
	        	 			$('#zfb_pay_fk').html(res.data.payHtml)
	        	 		}else{
	        	 		//PC端微信扫码生成二维码
				  	 $('#prView').qrcode({
				  		 width:190,
						 height: 190,
						 text:res.data.codeUrl
				  	 });
	        	 		}
	        	 		this.price =  res.data.total;
				})
	        	}
			},
			mounted(){
				if(this.$route.query.paymentType == 'wx'){
					this.subject = '微信支付';
				}else{
					this.subject = '支付宝支付';
				}
			var jsons = {
	        		paymentType:this.$route.query.paymentType,
	        		addressId:this.$route.query.addressId,
	        		dbId:this.$route.query.dbId,
	        		userDbId:this.$route.query.userDbId,
	            client:Api.CLIENT,
	        		subject:this.subject
	        	};
			this.pay(jsons);
			if(this.$route.query.paymentType == 'wx'){
				var	timer1 = setInterval(function(){
		           Api.car.queryOrderState(jsons).then(res=>{
		           	if(res.data.status >= 3){
		           		clearInterval(timer1);
		           		 location.href="/payOk?orderCode="+res.data.code+'&price='+res.data.total;
		           	}
		           },err=>{
		           	
		           })
		        }, 5000);//设置3秒循环查询
			}else{
				$("#payOrder").hide();
			}
			
	        
			 
		}

	}
	
</script>


<style>
</style>