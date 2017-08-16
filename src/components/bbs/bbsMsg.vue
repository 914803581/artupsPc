<template>
	<div id="bbsMsg">
		<unify-header></unify-header>
		<div class="div-box">
				
				<div class="img_tl_bg active_04">
					<!--<img src="img/fan210.jpg" style="position: absolute;top: -100px; left: 70px;">-->
				</div>
				<div class="text">
					<span>小时光</span>
					<p>小小的时光，记录点滴美好</p>
				</div>
				<div class="preview">					
					<dl  class="hc-dl">
					 <dt style="padding-bottom: 20px;" class="dt-botton">
						<h4 id="clickH1"><b>请选择颜色</b>  <span style="display: none;">修改</span> </h4>
						<ul class="hc-color bbs_msg">
							<li  :data-code="color.code"  :data-name="color.name" :dbId ="color.dbId" @click="checkWork(index)" :class="{'line':codeNumber==index}"  v-for="(color,index) in attributes[0].attributeValues"  class="li-color5 ">
								<b :style="{'background':color.attr}"></b>
								<p>{{color.name}}</p>
							</li>						
						</ul>
					</dt>
					<dd class="" style="float: left;width: 143px;">
						<h4 id="clickH2"> 尺寸</h4>
						<ol class="ol-size bbs_msg" style="display: block;">
							<li :dbId ="size.dbId" :data-code="size.code"  :data-name="size.name" v-for="size in attributes[2].attributeValues"  class="li-off line">{{size.code}}mm</li>
						</ol>
					</dd>
					<dd class="" style="float: left;width: 200px;">
						<h4 id="clickH2"> 页数</h4>
						<ol class="ol-size bbs_msg" style="display: block;">
							<li :dbId ="page.dbId" :data-code="page.code" :data-name="page.name" v-for="page in attributes[1].attributeValues"  class="li-off line">{{page.code}}页</li>
						</ol>
					</dd>
					<br>
					<br>
					<br>
					<dt style="">					
						<div class="pices">
							¥ <i>{{price}}</i> CNY
						</div>
						<a href="/album/imgEdit" class="sib-a">开始定制</a>
					</dt>
				</dl>
				</div>							
			</div>
			<div id="contents">
			<div class="xsg">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li>小时光</li>
						<li>小小的时光，记录点滴美好</li>
						<li>采撷照片中的点滴美好，定制一本专属于宝宝的小时光；触手的温暖，记录成长的多彩回忆，珍藏全家的美好时光。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/500.jpg" alt="">
				</div>
			</div>
		</div>
		<div class="xsg2">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li>小时光</li>
						<li>一本只属于宝宝的人生故事</li>
						<li>留存点滴记忆，书写美好人生；人生的每一个阶段，小时光为你印出感动。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/359.png" alt="">
				</div>
				<div class="bbswzdb">
					<ul>
						<li>出生了，睁眼了，会笑了，满月了，百天了，会叫爸妈了，会走路了，周岁了，上幼儿园了…</li>
						<li>一辈子的“第一次”，怎能不珍藏！</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="xsg3">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li>小时光</li>
						<li>送给宝宝珍藏一生的礼物</li>
						<li>我是记录者，你是演绎者；一本本装满爱的小时光，相约与你一起翻阅回味。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/357.png" alt="">
				</div>
				<div class="bbswzdb">
					<ul>
						<li>时光易逝，害怕宝宝跟自己一样错过儿时的成长瞬间？</li>
						<li>我正奋笔，为你疾书。</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="xsg4">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li>小时光</li>
						<li>珍藏全家人共享的点滴美好</li>
						<li>触摸到的记忆，随手可翻的温暖；小小的时光，珍藏有亲情作伴的点滴美好。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/400.jpg" alt="">
				</div>
				<div class="bbswzdb">
					<ul>
						<li>宝宝成长的每一步，全家人都不愿缺席</li>
						<li>一人记录，全家共享。</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="xsg5">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li>产品特性</li>
						<li>暖心套装 随时随心记录成长</li>
						<li class="lh">一套小时光内含一本精致书册，十张简约LOMO卡，一张主题照片。</li>
						<li class="lh">放在家里，夹在桌上，随手可翻，抬头可见，让回忆更加丰富清晰。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/501.jpg" alt="">
				</div>
				<div class="bbswzdb">
					<ul>
						<li>·专为宝宝 定制的精致书册，完整记录宝宝点滴成长。爱的每一步，我都陪你。</li>
						<li>·简约LOMO卡，贴在墙上，夹在桌上，写满祝福与家人分享。瞬间的记录，永恒的感动。</li>
						<li>·6寸定制主题照片，贴在书册扉页，让整本记忆更加清晰；为爷爷奶奶、姥姥姥爷选择不同的主题照，定制专属馈赠。</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="xsg5">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li style="height: 10px;"></li>
						<li>多彩封面 给回忆不一样的炫彩 </li>
						<li class="lh">智慧蓝、欢乐红、活力橙、健康绿，四种颜色封面供选，书盒及书壳混色配搭。</li>
						<li class="lh">为你打造多彩记忆，让每一份热情感动都有处安放。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/001_03.png" alt="">
				</div>
				
				</div>
			</div>
		</div>
		<div class="xsg6">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li style="height: 10px;"></li>
						<li>轻奢礼盒 珍藏馈赠总相宜</li>
						<li class="lh">礼盒封面烫哑银字体设计，表层覆进口艺术纸，含蓄内敛；</li>
						<li class="lh">边楞45°斜面设计。看得见的细节，处处让你爱不释手。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/00_03.png" alt="">
				</div>				
			</div>
		</div>
		<div class="xsg7">
			<div class="xsgContent">
				<div class="bbswz">
					<ul>
						<li style="height: 10px;"></li>
						<li>专属定制 不辜负用心的美好</li>
						<li class="lh">一键上传你喜爱的照片，海量图片自动排版，更有多种模板风格供选，随心设计。</li>
						<li class="lh">私人定制，只给与众不同的你。</li>
					</ul>
				</div>
				<div class="bbstpone">
					<img src="http://image2.artup.com/static/pc/bbs/33_06.png" alt="">
				</div>				
			</div>
		</div>
		<div class="xsg8">
			<div class="xsgContent">
				<div class="sxgwz">
					<ul>
						<li>匠心雕琢 每一份精致时光</li>
						<li>二十余年专业印刷，优选进口环保纸，色彩高保真还原，呈现宝宝可爱笑颜；</li>
						<li>精装硬质书壳，内含海绵弹力夹层，厚实抗压；锁线胶装，可180度平铺，视觉更顺畅舒适。</li>
						<li>清晰悦目的专属回忆，珍藏百年。</li>
					</ul>
				</div>
				<div class="bbsImg">
					<img src="http://image2.artup.com/static/pc/bbs/bbs-00.png">
				</div>
			</div>
		</div>
		<img style="display: block;width: 800px;margin: 0 auto;" src="http://image2.artup.com/static/pc/bbs/bbs_0pj.jpg">
		<Footers></Footers>
	</div>
</template>

<script>
	import Api from '../../api.js'
	import filter from '../../filter.js'
	import navHander from '../../components/component/hander/hander.vue'
	import Header from '@/components/header/header.vue'
	export default {
		data() {
			return {
				price:0,//价格
				codeNumber:0,
				attributes:[], //全部的属性
				bbsSlsectDate:{}
			}
		},
		components:{  
	       'unify-header': Header
	   },
		 methods: {
		 	checkWork($index){ //切换选项
		 		var vm = this;
		 		this.codeNumber = $index;
		 		setTimeout(function(){
				 	vm.getPrice($(".bbs_msg .line"));		    
				},100)
		 	},
		 	getPrice(dom){//获得页面的价格
					this.bbsSlsectDate={};
					//获得页面的颜色
				 	this.bbsSlsectDate.colorName = dom.eq(0).find("p").text().trim();				 	
					var dataCode = '';//请求价格需要的参数
					var dataCode2 = '';//后端需要的参数
					dom.each(function(index,el){
						dataCode+=$(this).attr("data-code")+'.'
						dataCode2+=$(this).attr("data-name")+'.'
					})
					console.log(dataCode)
					console.log(dataCode2)
					//组装后端需要的数据暂存浏览器
					this.bbsSlsectDate.name = sessionStorage.getItem('titleName')+'.'+dataCode2;
					this.bbsSlsectDate.skuCode = this.getFromSession("category")+'.'+dataCode;
					this.bbsSlsectDate.category = this.getFromSession("category"); //类型字段
					console.log(this.attributes)
					//console.log(this.getFromSession("category"))
					var paramsJson = {
						"category": this.getFromSession("category"),
						"parameter" : dataCode
					};
				 	//请求价格:			
					Api.sku.querySku(paramsJson).then((res)=>{
						//价格计算
						 this.price = res.data.price;
						 this.bbsSlsectDate.price = res.data.price;
						 this.bbsSlsectDate.skuId = res.data.skuId;
						 sessionStorage.setItem("bbsSlsectDate",JSON.stringify(this.bbsSlsectDate))
					})
			}
		 },
		 mounted(){
		 	var vm = this;
		 	//拿到url东西?category存入session里面
		 	this.addToSession();		 	
		 	var paraAttributeJson = {  
				category: this.getFromSession("category") //类型
			};
		 	Api.sku.queryAttributes(paraAttributeJson).then((res)=>{
				//添加1个titleName
				 sessionStorage.setItem('titleName',res.data.name);
		
				  this.attributes = res.data.attributes;
				  console.log(this.attributes)
				 //默认的价格
				 setTimeout(function(){
				 	vm.getPrice($(".bbs_msg .line"));				    
				 },100)	 
			});
		 	
		 	
		 	
		 	
		 }
	}
</script>

<style lang="less">
	
	#bbsMsg{
.xsg{
	width: 100%;
	height: 760px;
	background: #f8f8f8;
}
.xsgContent{
	width: 1196px;
	margin: 0 auto;
}
.bbswz{
	width: 100%;
	height: 270px;
}
.bbswz ul li{
	width: 100%;
	text-align: center;
	height: 90px;
	line-height: 90px;
	color: #000;
}
.bbswz ul li:first-child{
	color: #757575;
	font-size: 30px;
}
.bbswz ul li:nth-child(2){
	color: #000;
	font-size: 50px;
}
.bbswz ul li:nth-child(3){
	color: #000;
	font-size: 18px;
}
.bbstpone{
	height: 430px;
	width: 100%;
}
.bbstpone img{
	display: block;
	margin: 0 auto;
	
}
.xsg2{
	height: 870px;
	width: 100%;
	background: #f3f3f3;
	
}
.xsg2 .xsgContent{
}
.bbswzdb{
	width: 100%;
	height: 60px;
	margin-top: 40px;
	font-size: 18px;
}
.bbswzdb ul li{
	height: 30px;
	width: 100%;
	text-align: center;
	
}
.xsg3{
	height: 860px;
	width: 100%;
	background: #fff;
	
}
.xsg4{
	height: 820px;
	width: 100%;
	background: #fafafa;
}
.xsg4 .bbstpone{
	height: 420px;
	width: 100%;
}
.xsg5{
	height: 900px;
	width: 100%;
}
.xsg6{
	height: 880px;
}
.lh{
	height: 30px !important;
	line-height: 30px !important;
	font-size: 18px;
}
.xsg7{
	height: 820px;
}
.xsg7 .bbstpone{
	margin-top: 20px;
}
.xsg8{
	height: 1000px;
	background: #f9f9f9;
}
.sxgwz{
	height: 230px;
}
.sxgwz ul li{
	text-align: center;
	height: 30px;
	line-height: 30px;	
	font-size: 18px;
}
.sxgwz ul li:nth-child(1){
	height: 100px;
	font-size: 50px;
	color: #000;
	line-height: 100px;
}
.bbsImg{
	height: 752px;
	width: 100%;
}
.bbsImg img{
	display: block;
	margin: 0 auto;
}
.xsg9{
	height: 630px;
	background: #fff;
	margin-bottom: 60px;
}
.wznr ul li{
	height: 90px;
	line-height: 90px;
	font-size: 24px;
	color: #424242;
}
.wznr ul li:nth-child(1){
	color: #757575;
	text-align: center;
	font-size: 31px;
}






/*banenr-bg*/
 .div-box{width: 1120px;height: 780px;margin: 0 auto;position: relative;z-index: 99;}
 .text{width: 561px;height: 129px;float: right;margin-top: 80px;margin-bottom: 30px;}
 
.text span{height: 56px;line-height: 56px;color: #000;font-size: 40px;font-family: "微软雅黑";font-weight: 600;}
 .text p{height: 38px;line-height: 38px;color: #555;font-size: 18px;font-family: "微软雅黑";margin-top: 6px;}
 .preview{width: 560px;height: 415px;float: right;position: relative;overflow: hidden;}
 .div-box .hc-dl{width: 560px;height: 415px;animation: 1s topN ease-in-out;}
 .div-box .hc-dl dt{width: 560px;}
 .div-box .hc-dl  h4{width: 560px;height: 52px;line-height: 60px;font-size: 15px;font-family: arial;text-indent: 4px;font-weight: bold;overflow: hidden;cursor: pointer;}
 .div-box .hc-dl  h4 span{font-size: 13px;color: #08c;float: right;font-family: "微软雅黑";font-weight: 100;}
 .div-box .hc-dl  .hc-color{width: 550px;margin-left: 6px;overflow: hidden;border-top: 1px solid #bfbfbf;padding-top: 20px;}
 .div-box .hc-dl  .hc-color >li{position: relative;width: 123px;height: 70px;border-radius: 5px;border: 1px solid #d6d6d6;float: left;margin-right:16px;margin-bottom: 16px;}
 .div-box .hc-dl  .hc-color >li:last-of-type{margin-right: 0;}
 .div-box .hc-dl  .hc-color >li b{display: block;width: 31px;height: 31px;background: #747474;border-radius: 50%;margin: 0 auto;margin-top: 7px;position: relative;}
 .div-box .hc-dl  .hc-color >li p{text-align: center;font-size: 13px;margin-top: 8px ;font-family: "微软雅黑" !important;}
 .div-box .hc-dl  h4 span:hover{text-decoration: underline;}

 .div-box .hc-dl  .hc-color .li-color2 b{background: #747474;}
 .div-box .hc-dl  .hc-color .li-color2 b:before{position: absolute;content: '';width: 31px;height: 31px;background: #010101;border-radius: 50%;top: 0px;right: -6px;;}
 .div-box .hc-dl  .hc-color .li-color1 b{background: #010101;}
 .div-box .hc-dl  .hc-color .li-color1 b:before{position: absolute;content: '';width: 31px;height: 31px;background: #747474;border-radius: 50%;top: 0px;right: -6px;}
 .div-box .hc-dl  .hc-color .li-color5 b{background: #222054;}
 .div-box .hc-dl  .hc-color .li-color6 b{background: #c11351;}
 .div-box .hc-dl  .hc-color .li-color7 b{background: #ff620c;}
 .div-box .hc-dl  .hc-color .li-color8 b{background: #054e3a;}
.div-box .hc-dl  .hc-color >li:hover{border: 1px solid #777; cursor: pointer ;}
.ol-size li:hover{border: 1px solid #555555;cursor: pointer;}
.ol-size li:hover{border: 1px solid #555555;cursor: pointer;}
.ol-size{margin-left: 6px;overflow: hidden;}
.ol-size li{width: 122px;height: 37px;border-radius: 5px;border: 1px solid #c3c3c3;float: left;margin-right: 13px;line-height: 37px;text-align: center;margin-bottom: 30px;}
 .line{border: 1px solid #49a9d9 !important;}
 .off{display: none;}
 .off2{display: none !important;}
 .sib-a{width: 145px;height: 32px;line-height: 32px;display: block;border: 1px solid #010101;font-size: 14px;color: #fff;font-family: arial;position: relative;border-radius: 4px;text-align: center;margin-top: 40px;background: #010101;}
.sib-a:hover{background: #323232;}
.sib-a:active{top: 1px;}

.pices{font-size: 20px;color: #1a1a1a;line-height: 30px;text-indent: 3px;font-weight: bold;clear: both;}

.img_tl_bg{display: block;width: 500px;height: 424px;position: absolute;left: 0px;top: 100px;z-index: 999;background: url(http://image2.artup.com/static/pc/bbs/bbs_01.png) no-repeat;background-size: 100%;}

body .active_01{background: url(http://image2.artup.com/static/pc/bbs/bbs_05.png) no-repeat;background-size: 100%;}
body .active_02{background: url(http://image2.artup.com/static/pc/bbs/bbs_04.png) no-repeat;background-size: 100%;}
body .active_03{background: url(http://image2.artup.com/static/pc/bbs/bbs_03.png) no-repeat;background-size: 100%;}
body .active_04{background: url(http://image2.artup.com/static/pc/bbs/bbs_02.png) no-repeat;background-size: 100%;}
		
	}
	
</style>