<template>
	<div id="oddEdit">
		<div class="comtent_chanpin">
			<div class="line_comtent">
				<div class="comtent">
					<div class="title">
						<div class="title_left">
							<span>作品</span>
							<span>2017-07-14 11:05</span>
						</div>
						<div class="title_right">
							<span>255x355mm</span>
							<span>56页</span>
							<span>￥499</span>
						</div>
					</div>
					 <transition name="el-zoom-in-top">
						<div id="div_drap" v-show="switchFormat" >
							<div  class="titleBox menubar_titleBox">
				               更换版式{{switchFormat}}
				            <div  class="titleClose" @click="closeFormat">
				            		<i class="iconfont"></i>
				            </div>
							</div>
							<div class="checkBS_b">
								<select name="">
									<option value="">700x500</option>
									<option value="">700x500</option>
									<option value="">700x500</option>
									<option value="">700x500</option>
								</select>
							</div>
						</div>
					</transition>	
					<div class="box_menu">
						<ul>
							<li @click="updateStyle"><i class="iconfont"></i>更换板式</li>
							<li><i class="iconfont" style="font-size: 20px; padding: 0px;"></i>加入购物车</li> 
							<li><i class="iconfont"></i>立即购买</li> 
							<li><i class="iconfont"></i>下一步</li> 
							<li><i class="iconfont"></i>保存作品</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="comtent scrollBar time_main_left" style="height: 872px;">
				<div class="waikuang time_bg" id="waikuang" style="width: 520px; height: 620px; background: url(http://image2.artup.com/static/pc/imgs/citiehua/edit/400x500-ypl.jpg); background-size: 100% 100%;">
                   <div class="drapBox"  style="width: 400px; height: 500px; position: absolute; top: 50%; left: 50%; margin-top: -250px; margin-left: -200px;">

	                   <!--<div class="k_AlertBox" id="alertBox">
	                        <div class="k_AlertBox_span">
	                            !
	                        </div>
	                        <div class="k_AlertInfo" id="alertInfo" style="">像素不足，请替换图片</div>
	                    </div>-->
	                 	
	                    <div @click="deitImgFn($event)" class="drap_img img_box" >
	                        
	                    </div>
	                   	<img draggable="false" class="drap_img" src="" alt="" /> 
	                   	<div class="div_alert">
	                 		
	                 	</div>
                   </div>
                </div>
			</div> 	
			  <!--底部的图片-->
			  <!--v-DomHeight-->
		      <div   class="footer_img">
		        <div class="footer_up_tittle">
		          <div class="footer_left">
		            <!--<button  class="footer_btn">
		              清空已放入的图片
		            </button>
		            <button   v-if="FooterDataAuto.length>0"  class="footer_btn">
		              自动填充<b style="font-weight: 500;">{{FooterDataAuto.length}}张</b>
		            </button>-->
		          </div>
		          <div @click="checkFooterShow($event)" class="footer_center">
		            <span class="imgSpan">图片<i class="iconfont">&#xe600;</i></span>
		          </div>
		          <div class="footer_right">
		            <button class="footer_btn">
		              预览
		            </button>
		            <button @click="open_material" class="footer_btn">
		              添加图片
		            </button>
		          </div>
		        </div>
		        <el-collapse-transition>
		        <div  v-show="footerShow" class="fonter_box_img">
		          <ul>
		            <li @click="footerImgSlectFooter(index)"  :class="{'img_size_border':footerImg.slectFooter}" :att="footerImg.slectFooter"  v-for="(footerImg,index) in $store.state.bbs.footerData" draggable="true">
		              <img :src="footerImg.thumbnailUrl"/>
		            </li>
		          </ul>
		        </div>
		        </el-collapse-transition>
		      </div>
		</div>
		 <!--模态框素材库-->
	     <transition name="el-fade-in">
	   		 <div-model @footerBurl="footerBoolean"  :typeWork="'单图'" :isShowModel="isModel"></div-model>
	    </transition>
	    <!--图片编辑插件 postData 编辑器返回的数据-->
	     <transition name="el-fade-in">
	    		<img-edit @postDataImg="postDatas"  :dataEditJson="dataEditImg"  :isImgEdit="isimgEdit"></img-edit>
	    </transition>
	    
	</div>
</template>

<script>
  import { Message } from 'element-ui';
  import {mapState,mapGetters,mapActions,mapMutations} from "vuex" 	
  import Api from '../../../api.js'
  import filter from '../../../filter.js'
  import {DomHeight} from '../../../directive.js'
  import divModel from '../model/model.vue'
  import imgEdit from '../imgEdit/imgEdit.vue'
  import editText from '../editText/editText.vue'
export default {
    data () {
      return {
      	isModel:false,//素材库
      	dataEditImg:{},//传递给图片编辑的对象
      	isimgEdit:false, //图片编辑
      	footerShow:true, //页脚控制的折叠变量
	    switchFormat : false //控制切换板式弹框显示隐藏变量（true显示 false隐藏） 
      
      	
      }	
   	},
   	props:[""],
    components:{ //在再这里要注入我的组件
	  divModel,
      imgEdit
    },
    methods: {
    		checkFooterShow($event){ //切换底部的图片显示隐藏
      	var vm = this;
      	this.footerShow = !this.footerShow;
//    	setTimeout(function(){
//    		vm.jisuan();// 计算页面位置
//    	},300)
      },
    	   //调起图片编辑器
    	   deitImgFn($event){
    	   	 if($($event.target).next(".img_drap").attr("src")==""){return;}//为空返回
        	  
          $(".editbbs_one").removeClass("editbbs_one");
          $($event.target).addClass("editbbs_one");
          
          this.dataEditImg.oSrc = $($event.target).next("img").attr("imgstyle");
          this.dataEditImg.oW = $($event.target).parent(".drapBox").width();
          this.dataEditImg.oH = $($event.target).parent(".drapBox").height();
          
           //点击时候获取coustName 从hashMap里面得到他有没第一次编辑的东西         
          var constName ='1_1';
		  this.dataEditImg.oActions = this.$store.state.editData.ImgHashMap.getvalue(constName).actions;
    	      this.openImgEdit();
    	   },
	   open_material(){ //打开素材库
          this.isModel= !this.isModel
       },
     	footerBoolean(val){ //素材库抬起底部图片
		var vm = this;
		this.footerShow =val;
//		setTimeout(function(){
//	  		vm.jisuan();// 计算页面位置
//	  	},300)
	 },
	 openImgEdit(){
        this.isimgEdit = !this.isimgEdit;
      },
     postDatas(val){    
      	console.log(val)
      	//获取数据覆盖便于二次编辑
		var constName ='1_1';
		this.$store.state.editData.ImgHashMap.getvalue(constName).actions = val.postData;		
        $(".editbbs_one").next("img").attr("src",val.imgData).css("width","100%").css("height","100%").css("left",0).css("top",0)
     },
     updateStyle (){
     	this.switchFormat = true;
    		$("#div_drap").Tdrag();
     },
     closeFormat (){
     	this.switchFormat = false;	
     }
    },
    created(){//只执行一次
    		
    },
    mounted(){
    		//如果更换板式弹框显示
		$('.checkBS_b').click(function(e){

		})

		  
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
	@import './sass/addEdit';
</style>