//微信支付
function wxpay(d,callback){
	wx.config({
		debug: false,
		appId: d.appId,
		timestamp: d.timestamp,
		nonceStr: d.nonceStr,
		signature: d.signature,
		jsApiList: ["chooseWXPay"]
	});
	wx.ready(function(){
		wx.chooseWXPay({//微信支付
			timestamp: d.timeStamp,
			nonceStr: d.nonceStr,
			package: d.package,
			signType: d.signType,
			paySign: d.paySign,
			success: function (res) {
				//alert('支付成功');
				// 支付成功后的回调函数
				if(callback){
					callback(res)
				}
			},
			cancel:function(res){
				  //支付取消
				//history.back();
				if(callback){
					callback(res)
				}
			}       
		});
	});
	
	wx.error(function(res){
		alert(res.err_msg);
		history.back();
	})
}
