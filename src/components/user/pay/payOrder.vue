<template>
	<div id="htm">
		<Handers	></Handers>
		<!--支付页面-->
		<div id="payOrder" >
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
	</div>
</template>
<script>
	import Api from '../../../API.js'
	import { MessageBox } from 'element-ui';

		export default{
			data(){
				return{
					price:0
				}
			},
			methods:{
			pay(jsons){
	        	 	Api.car.orderPay(jsons).then(res=>{  
	        	 		console.log(res)
	        	 		this.price =  res.data.total;
					//PC端微信扫码生成二维码
				  	 $('#prView').qrcode({
				  		 width:190,
						 height: 190,
						 text:res.data.codeUrl
				  	 });
	//			    		  if(res.data.code === 'success'){
//								if(this.$route.query.paymentType==='WX'){//手机微信支付 
//									wxpay(res.data,function callback(res){ 
//										if(res.errMsg=="chooseWXPay:fail"){
//											alert('调起支付失败');
//											Api.car.updataOrderStatus2Pay({dbId:jsons.dbId, status:1}).then(res=>{
//												if(res.data.code == 'success'){
//													location.href="#orderList"
//												}
//												
//											},err=>{
//												alert('请求数据失败');
//											})
//											
//										}else if(res.errMsg == "chooseWXPay:cancel" ) {//用户取消订单
//			                                
//											Api.car.updataOrderStatus2Pay({dbId:jsons.dbId, status:1}).then(res=>{
//												if(res.data.code == 'success'){
//
//													location.href="#orderList"
//												}
//												
//											},err=>{
//												alert('请求数据失败');
//			                                    location.href="#orderList";
//											})
//											alert('用户取消支付');
//											location.href="#orderList";
//											
//										}else{
//											alert('支付成功');
//
//			                                location.href="#orderList";
//										}
//									}); 
//								}
//							} else {
//								
//			                    if(res.data.acquireOpenId && res.data.acquireOpenId === 'Y'){ 
//			                        window.location.href= res.data.codeUrl;
//			                    } else if(res.data.pay && res.data.pay === 'Y'){ 
//			                        window.location.href="#user";
//			                    }
//			                    else {
//			                        alert('支付失败');
//			                        Api.car.updataOrderStatus2Pay({dbId:jsons.dbId, status:1}).then(res=>{
//			                        if(res.data.code == 'success'){ 
//			                           window.location.href="#orderList"
//			                        }
//			                        
//			                        },err=>{
//			                            alert('请求数据失败');
//			                        })
//			                    }
//			    				
//							}
//			    	   },err=>{ 
//			    		alert('请求数据失败');
				})
	        		}
		
			},
			mounted(){
			var jsons = {
	        		paymentType:'wx',
	        		addressId:this.$route.query.addressId,
	        		dbId:this.$route.query.dbId,
	        		userDbId:this.$route.query.userDbId,
	            client:Api.CLIENT,
	        		subject:'微信支付'
	        	};
			this.pay(jsons)

					 
			}

		}
	
</script>


<style>
</style>