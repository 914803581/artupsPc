<template>
	<div id="oddEdit">
		<div class="comtent_chanpin">
			<div class="line_comtent">
				<div class="comtent">
					<div class="title">
						<div class="title_left">
							<span>{{nowProductData.type}}{{nowProductData.category}}</span>
							<span>2017-07-14 11:05</span>
						</div>
						<div class="title_right">
							<span>{{nowProductData.size}}</span>
							<span>{{nowProductData.frameType}}</span>
							<span>￥{{nowProductData.price}}</span>
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
								<el-select v-model="sizeValue" placeholder="请选择尺寸">
								    <el-option
								      v-for="item in frameSizeData"								      
								      :value="item.code+'mm'">
								    </el-option>
								  </el-select>
								  <el-select style='margin-top: 20px;' v-model="typeValue" placeholder="请选择框形">
								    <el-option
								      v-for="item in frameTypeData"								      
								      :value="item.name">
								    </el-option>
								  </el-select>
							</div>
						</div>
					</transition>	
					<div class="box_menu">
						<ul>
							<li @click="updateStyle"><i class="iconfont"></i>更换板式</li>
							<li><i class="iconfont" style="font-size: 20px; padding: 0px;"></i>加入购物车</li> 
							<li><i class="iconfont"></i>立即购买</li> 
							<!--<li><i class="iconfont"></i>下一步</li> 
							<li><i class="iconfont"></i>保存作品</li>-->
						</ul>
					</div>
				</div>
			</div>
			<div class="comtent scrollBar time_main_left">
				<div class="waikuang time_bg" id="waikuang" style="width: 520px; height: 620px; background: url(http://image2.artup.com/static/pc/imgs/citiehua/edit/400x500-ypl.jpg); background-size: 100% 100%;">
                   <div class="drapBox">

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
			  <div style="height: 176px;background-color: #efefef;">
			  	
			  </div>
		      <div style="position: fixed;"  class="footer_img">
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
      	dataEditImg : {},//传递给图片编辑的对象
      	isimgEdit : false, //图片编辑
      	footerShow : true, //页脚控制的折叠变量
	    switchFormat : false, //控制切换板式弹框显示隐藏变量（true显示 false隐藏） 
	    selectSlide : false,  //控制选择板式下拉菜单
	    frameSizeData : {},//编辑框尺寸
	    frameTypeData : {},//编辑框类型
      	sizeValue : '',
      	typeValue : '',
      	 nowProductData:{}//编辑产品的数据
      }	
   	},
   	props:["productData"],
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
    		//$("#div_drap").Tdrag();
     },
     closeFormat (){
     	this.switchFormat = false;	
     },
     fn (){
     	this.selectSlide = !this.selectSlide;
     	//alert()
     	if(this.selectSlide == true){
     		$('#selec').slideDown()
     	}else{
     		$('#selec').slideUp()
     	}
     	
     },
     /*更新sku*/
  	updataSkuData (){
  		this.skuCode = this.getFromSession("category") + '.' + this.sizeValue + '.' + this.typeValue;
  		var jsons = {
  			category:this.getFromSession("category"),
  			parameter:this.skuCode
  		};
  		Api.sku.querySku(jsons).then(res=>{
  			console.log(res)
  			this.previewImageUrl = res.data.previewImageUrl;//框形预览图
  			this.price = res.data.price;
  		});
  	},
    },
    created(){//只执行一次
    		
    },
    mounted(){
    		var vm = this;
    		this.nowProductData = this.productData;//插件传递过来的编辑器上显示数据
    		this.$forceUpdate();
    		setTimeout(function(){
    			console.log(vm.nowProductData.category)
    			var queryObj = {'category':vm.nowProductData.category};
	   	 	sessionStorage.setItem("urlQuery",JSON.stringify(queryObj)); 
    		})
    		
    		//获取url的category值 以字符串的json格式保存到sessionStroage中
		
	   
		//获取框画的类型
		Api.sku.queryAttributes({category:this.getFromSession("category")}).then(res=>{
			if(res){
				console.log(res)
				this.frameSizeData = res.data.attributes[1].attributeValues;
				this.frameTypeData = res.data.attributes[0].attributeValues;
				
				/*默认获取价和展示图片
				 * 默认选择第一个
				 */
				setTimeout(function(){
					vm.nowSize = $('.k1_Foot1size_click').eq(0).attr('size');
					vm.nowType = $('.kuangAngle').eq(0).attr('code');
					//vm.updataSkuData();
				});
			}
	
		},err=>{
			
		});
    		//如果更换板式弹框显示
		$('.checkBS_b').click(function(e){

		})

		  
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
	@import './sass/addEdit';
</style>