<template>
	<div id="bbsEdit">
		<nav-hander></nav-hander>
		<div   class="comtent_chanpin">
			<div class="line_comtent">
				<div class="comtent">
					<!--title-->
					<div class="title">
						<div class="title_left">
							<span>画册编辑</span>
							<span>未命名 2017-07-14 11:05</span>
						</div>
						<div class="title_right">
							<span>255x355mm</span>
							<span @click="openImgEdit">56页</span>
							<span @click="openTxst">￥499</span>
						</div>
					</div>
				</div>
			</div>	
			<div class="line_comtent">
				<div class="comtent">
					<div class="time_main_left">
						<div class="time_bg">
							<div class="time_pu">
								<div class="bbsClass drapBox template01">
									<img src=""/>
								</div>	
								<p class="text"></p>
								<div class="page">
									1
								</div>
							</div>
							<div class="time_pu">
								<div class="bbsClass drapBox template02">
								<img src=""/>
									
								</div>	
								<p class="text"></p>
								<div class="page">
									2
								</div>
							</div>
						</div>
						<div class="time_bg">
							<div class="time_pu">
								<div class="bbsClass template03">
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
								</div>	
								<p class="text"></p>
								<div class="page">
									3
								</div>
							</div>
							<div class="time_pu">
								<div class="drapBox bbsClass template04">
									<img src=""/>
								</div>	
								<p class="text"></p>
								<div class="page">
									4
								</div>
							</div>
						</div>
					   
						<div class="time_bg">
							<div class="time_pu">
								<div class="bbsClass drapBox template05">
									<img src=""/>
								</div>	
								<p class="text"></p>
								<div class="page">
									5
								</div>
							</div>
							<div class="time_pu">
								<div class="bbsClass template06">
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
								</div>	
								<p class="text"></p>
								<div class="page">
									6
								</div>
							</div>
						</div>					
						<div class="time_bg">
							<div class="time_pu">
								<div class="bbsClass template07">
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>								
								</div>	
								<p class="text"></p>
								<div class="page">
									7
								</div>
							</div>
							<div class="time_pu">
								<div class="bbsClass template08">
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
									<div class="drapBox div_page">
										<img src=""/>
									</div>
								</div>	
								<p class="text"></p>
								<div class="page">
									8
								</div>
							</div>
						</div>
					</div>				
				</div>
			</div>	
    			<!--底部的图片-->
    			<div v-DomHeight  class="footer_img">
    				<div class="footer_up_tittle">
    					<div class="footer_left">
    						<button  class="footer_btn">
    							清空已放入的图片
    						</button>
    						<button class="footer_btn">
    							自动填充2张
    						</button>
    					</div>
    					<div @click="checkFooterShow($event)" class="footer_center">
    						<span class="imgSpan">图片<i class="iconfont">&#xe600;</i></span>
    					</div>
    					<div class="footer_right">
    						<button class="footer_btn">
    							预览宝宝书
    						</button>    					
    						<select style="top: -2px;" class="footer_btn" name="">
    							<option value="">未使用图片</option>
    							<option value="">已使用图片</option>
    						</select>
    						<button @click="open_material" class="footer_btn">
    							添加图片
    						</button>
    					</div>
    				</div>
    				<!--<el-collapse-transition>-->
	    				<div v-DomDrap  class="fonter_box_img">
	    					<ul>
	    						<li draggable="true">
	    							<img src="../../../../artupApp/src/assets/img/xsg_fsfm.jpg"/>
	    						</li>
	    						<li  v-for="(footerImg,index) in $store.state.bbs.footerData" draggable="true">
	    							<img :src="footerImg.thumbnailUrl"/>
	    						</li>
	    						
	    						<!--<li draggable="true">
	    							<img src="../../../../artupApp/src/assets/img/xsg_fsfm.jpg"/>
	    						</li>   						-->
	    					</ul>
	    				</div>
	    			<!--</el-collapse-transition>-->	
    			</div>
		</div>
		<!--模态框素材库-->
		<div-model  :isShowModel="isModel"></div-model>
		<!--图片编辑插件-->
		<img-edit :isImgEdit="isimgEdit"></img-edit>
		<!--文字编辑框-->
		<edit-text :isEditText="iseditText"></edit-text>
		<!--<div-editText ></div-editText>-->
		<!--<div id="div_drap"  style="display: none;background: #fff;position: absolute;top: 0;width: 200px;height: 400px;border: 1px solid red;line-height: 400px;text-align: center;">
			我是可以拖拽的内容
		</div>-->
	</div>
</template>
<script>	
	import Api from '../../api.js'
	import filter from '../../filter.js'
	import {DomHeight} from '../../directive.js'
	import divModel from '../component/model/model.vue'
	import imgEdit from '../component/imgEdit/imgEdit.vue'
	import editText from '../component/editText/editText.vue'
	import navHander from '../../components/component/hander/hander.vue'
	var aa = 0;//计数器
	export default {
		data() {
			return {
				isModel:false, //素材
				isimgEdit:false, //图片编辑
				iseditText:false, //文字弹窗
				footerShow:true, //页脚控制的折叠变量
				bbs:{
					material:[],//素材库
				}
			}
		},
//		beforeRouteEnter(to,from,next){
//			console.log(to)
//			console.log(from)
//			next()
//		},
		components:{  
	       navHander,
	       divModel,
	       imgEdit,
	       editText
	   	},
		 methods: {
		 	jisuan(){		 		
	 			  $("#bbsEdit").css("height",$(window).height()+'px');
			      var oH = $(window).height()-($(".footer_img").height()+$("#handers").height()+$(".title").height()+30);
			  	  $("#bbsEdit .time_main_left").css("height",oH+'px');	
		 	},
		 	checkFooterShow($event){ //切换底部的图片显示隐藏		 	
		 		if ($($event.target).hasClass("imgSpan")) {
					var bb = ++aa;
					var footer = $($event.target).parents(".footer_img").find(".fonter_box_img");
		 			if (bb %2==1) {
		 				footer.show();
		 			}else{
		 				footer.hide();
		 			}		 			
		 			this.jisuan();
		 		}
		 	},
		 	open_material(){ //打开素材库
		 		this.isModel= !this.isModel
		 	},
		 	openTxst(){//打开文字框
		 		this.iseditText = !this.iseditText;
		 	},
		 	openImgEdit(){
		 		this.isimgEdit = !this.isimgEdit;
		 	},
		 	get_material(){
		 		
		 	}
		 },
		 computed:{
		 	
		 },
		 created(){//只执行一次
		 	this.jisuan();// 计算页面位置	 	
		 },
		 mounted(){
		 	console.log(this.$store.state.bbs.footerData)
//		 	this.$router.push({ path: '/security/iploginanalysis/'+json.name,params: { deviceId: 123}});
			
//			var dragdiv = document.querySelector('#div_drap');

//			$("#div_drap").dragDiv()
//			$(document).each(function(){
//				$(this).find("#div_drap").dragging({
//					move : 'both',
//					randomPosition : false
//				});
//			});
			
			
		 }
	}
</script>

<style>
</style>