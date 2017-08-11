<template>
  <div id="bbsEdit">	
    <nav-hander></nav-hander>
    <div   class="comtent_chanpin">
      <div class="line_comtent">
        <div class="comtent">
          <div class="title">
            <div class="title_left">
              <span>宝宝书编辑</span>
              <span>2017-07-14 11:05</span>
            </div>
            <div class="title_right">
              <span>255x355mm</span>
              <span >56页</span>
              <span>￥499</span>
            </div>
          </div>
        </div>
      </div>
      <div class="line_comtent">
        <div class="comtent">    	 	
        	<!--功能div-->
        	 <div class="box_menu">
        	 	<ul>
        	 		<li><i class="iconfont">&#xe711;</i>添加组件</li>       	 		
        	 		<li @click="bbs.Switching=true"><i class="iconfont">&#xe64f;</i>更换板式</li>
        	 		<li><i style="font-size: 20px;padding:0 ;" class="iconfont">&#xe602;</i>加入购物车</li>
        	 		<li><i class="iconfont">&#xe629;</i>立即购买</li>
        	 		<li @click="editWork"><i class="iconfont">&#xe612;</i>保存作品</li>
        	 	</ul>
        	 </div>
          <div class="time_main_left">
          	<transition name="el-zoom-in-top">
          	<div v-show="bbs.Switching" id="div_drap">
		        <div class="titleBox menubar_titleBox">
		               更换版式
		            <div @click="bbs.Switching=false" class="titleClose"><i class="iconfont">&#xe746;</i></div>
		        </div>
				<div class="checkBS_b">
					<div :style="{'width':itemImg.isTrue?'90%':'45%'}" :istrue="itemImg.isTrue"   @click="chenkTemplate(index)" v-for="(itemImg,index) in mobanArr" :class="templateoindex==index?'img_div boder_actiev':'img_div'">
						<img   :src="itemImg.templateImg">
					</div>		
				</div>     
	  		</div>
          	</transition>
            <div class="time_bg" v-for="(item,index) in bbsTemplate_data">
              <!--pubilc_div 这个class是留给整屏来定义的样式  click_template 是用vue里面的事件委派来解决避免不了的dom操作  hengban_bbs 横版增加的class  hengban_bbs 红线class-->
              <div class="pubilc_div" :only="htmlTetx.only" :class="{'active_line':htmlTetx.slectTemplate,'hengban_bbs':htmlTetx.only}"    v-html="htmlTetx.template"  @click="click_template($event,index,index2)"  v-for="(htmlTetx,index2) in item">
              </div>
            </div>           
          </div>
        </div>
        <div class="shield" v-show="isShowPreview" @click="isShowPreview=false"></div>
        <div class="preview_wrapper" v-show="isShowPreview">
          <div class="preview_comtent" id="previewComtent">
            <div></div>
            <div class="preview_page" :class="'style_type_'+item.type" v-for="item in testData">
                <img :key="img.id" :src="img.src" :class="['page_style_'+item.type,'img_style_'+item.type+'_'+img.index]" v-for="img in item.imgs">
                <label class="title">{{item.title}}</label>
            </div>
          </div>
        </div>
      </div>
      <!--底部的图片-->
      <div v-DomHeight  class="footer_img">
        <div class="footer_up_tittle">
          <div class="footer_left">
            <button  @click="delectFooter" class="footer_btn">
              清空已放入的图片
            </button>
            <button  @click="autoDrapImg" v-if="FooterDataAuto.length>0"  class="footer_btn">
              自动填充<b style="font-weight: 500;">{{FooterDataAuto.length}}张</b>
            </button>
          </div>
          <div @click="checkFooterShow($event)" class="footer_center">
            <span class="imgSpan">图片<i class="iconfont">&#xe600;</i></span>
          </div>
          <div class="footer_right">
            <button class="footer_btn" @click="preview">
              预览宝宝书
            </button>
            <!--<select style="top: -2px;" class="footer_btn" name="">
              <option value="">未使用图片</option>
              <option value="">已使用图片</option>
            </select>-->
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
   		 <div-model @footerBurl="footerBoolean"  :isShowModel="isModel"></div-model>
    </transition>
    <!--图片编辑插件 postData 编辑器返回的数据-->
     <transition name="el-fade-in">
    <img-edit @postDataImg="postDatas" :dataEditJson="dataEditImg"  :isImgEdit="isimgEdit"></img-edit>
    </transition>
    <!--文字编辑框-->
     <transition name="el-fade-in">
   	 <edit-text :isEditText="iseditText"></edit-text>
    </transition>
    <!--<div-editText ></div-editText>-->
  </div>
</template>
<script>
  import { Message } from 'element-ui';
  import {mapState,mapGetters,mapActions,mapMutations} from "vuex" 	
  import Api from '../../api.js'
  import filter from '../../filter.js'
  import {DomHeight} from '../../directive.js'
  import divModel from '../component/model/model.vue'
  import imgEdit from '../component/imgEdit/imgEdit.vue'
  import editText from '../component/editText/editText.vue'
  import navHander from '../../components/component/hander/hander.vue'
  export default {
    data () {
      return {
      	mobanArr:[//模版对应的图片
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc01.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc02.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc03.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc04.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc05.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc06.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc07.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc08.jpg',
      			isTrue:false,
      		},
      		{
      			templateImg:'http://image2.artup.com/resources/static/pc/images/bbs_pc01.jpg',
      			isTrue:true
      		}
         ],
        templateoindex:0,  
      	ImgHashMapBase64:new HashMap(),
        isShowPreview:false,
        isModel:false, //素材
        isimgEdit:false, //图片编辑
        iseditText:false, //文字弹窗
        footerShow:true, //页脚控制的折叠变量
        bbs:{
          material:[],//素材库
          textModel:'', //弹出框文字
          Switching:false,  //切换板式
           					//二维数组第一位角标 bbs_index1  和二位角标        
        },
        dataEditImg:{},//传递给图片编辑的对象
        bbsTemplate_data:[], //宝宝书模版数据的二维数组
        testData :[{
  type: 1,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww3.sinaimg.cn/thumb180/7d09f171gw1f6v66s5pmgj21kw1kw7wj.jpg'
  }]
}, {
  type: 2,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww4.sinaimg.cn/thumb180/967a86b2jw1f6gebq6czaj237k1swqv7.jpg'
  }]
}, {
  type: 3,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww3.sinaimg.cn/thumb180/5a8872e0jw1f67b7yc3ahj21bh0qojwd.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 2,
    src: 'http://ww2.sinaimg.cn/thumb180/6f4a7055jw1f63pbowqchj20ku0kun29.jpg'
  }]
}, {
  type: 4,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww2.sinaimg.cn/thumb180/7e7378f1jw1exk6w83h44j20f909a759.jpg'
  }]
}, {
  type: 5,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww3.sinaimg.cn/thumb180/58d8a7e4jw1evzq3l2oazj215o1jkx1h.jpg'
  }]
}, {
  type: 6,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww2.sinaimg.cn/thumb180/005CvtJFgw1eubq12p5faj30ae06oglt.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 2,
    src: 'http://ww1.sinaimg.cn/thumb180/80cc4225jw1eik72o10oaj20hs0dcabf.jpg'
  }]
}, {
  type: 7,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww3.sinaimg.cn/thumb180/7a36eef1jw1eifrrld0qdj20hs0np3zj.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 2,
    src: 'http://ww2.sinaimg.cn/thumb180/8a11a9e4jw1ejp0vmguwhj20gm09xwfj.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 3,
    src: 'http://ww1.sinaimg.cn/thumb180/8fa20930jw1euwhwpzhhej20qo0f0ab1.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 4,
    src: 'http://ww3.sinaimg.cn/thumb180/736e2503jw1f6sfg8dsf4j20zk0zk7ey.jpg'
  }]
}, {
  type: 8,
  title: '标题123456',
  imgs: [{
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 1,
    src: 'http://ww3.sinaimg.cn/thumb180/6cbac290jw1ege2wx4v90j218g0p043f.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 2,
    src: 'http://ww2.sinaimg.cn/thumb180/005vdkp3gw1f1m5kq81omj30np0hsacb.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 3,
    src: 'http://ww4.sinaimg.cn/thumb180/6910021bjw1euivb5sf4yj20dc0hsac2.jpg'
  }, {
    id: 'deabe24d-d9c7-4b98-bf2c-7595322a6436',
    index: 4,
    src: 'http://ww3.sinaimg.cn/thumb180/7cbf7143jw1evs1s7c44ij21mw0w37fv.jpg'
  }]
}]
      }
    },
//		beforeRouteEnter(to,from,next){
//			console.log(to)
//			console.log(from)
//			next()
//		},
    components:{ //在再这里要注入我的组件
      navHander,
      divModel,
      imgEdit,
      editText
    },
    methods: {
    	   ...mapMutations({//同步触发操作集合
 			delectFooter:"delectFooterData"   	   	
    	   }),
    		autoDrapImg(){//自动填充图片的操作
    			var vm = this;
    			var arrNode=[];
			$(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function(index,el){
				if (!$(el).attr("src")) {
					arrNode.push($(el));
				}				
			})
			var arrDrap = [];//一下传递给vuex处理的数据角标
			if ($(arrNode).size()<1) {
				this.$message({
			          showClose: true,
			          message: '恭喜您图片已全部上传完毕，请加入购物车购买喲',
			          type: 'success'
				});
				return;
			}
			$(arrNode).each(function(index,el){//真正存放的操作
				if (index<vm.FooterDataAuto.length) {
					$(".editAutoDrap").removeClass("editAutoDrap");
					$(el).addClass("editAutoDrap");//编辑自动拖拽
					$(el).attr("src",vm.FooterDataAuto[index].thumbnailUrl).attr('imgStyle',vm.FooterDataAuto[index].thumbnailUrl).attr("dbid",vm.FooterDataAuto[index].dbId);						
						//每次循环都取触发存储数据的操作
						vm.$store.commit("autoPushData")
						//计算位置
						setTimeout(function(){
							arrDrap.unshift(index)						
							dragThumb($(el),$(el).parent())
						},100)
				}
			})			
			//处理图片底部自动删除的操作
			vm.$store.commit("autoDrapData",arrDrap)
			
    		},
	    	footerImgSlectFooter($index){//提交
	    		this.$store.commit("editFooterStatus",$index)
	    	},
	    	editWork(){//保存作品
	    		alert('保存作品')
	    	},
    		chenkTemplate(index){//切换模版
			var vms = true;
			var vm = this;
			this.$forceUpdate();
			this.$nextTick();
			this.bbsTemplate_data.forEach((item,i)=>{
	      		item.forEach((e,i)=>{
	      			if(e.slectTemplate){	 
	      				vms = false;
				        this.templateoindex = index;
	      			}
	      		})
	      	})
			if (vms) {
				this.$message({
			          showClose: true,
			          message: '请选择需要更换的板式页码',
			          type: 'warning'
				});vms = true;
				return;
			}
//			切换的模版索引
			var chenkIndex = 'bbs'+(index+1);
			var otemplate = this.bbsTemplate_data[this.bbs.bbs_index1][this.bbs.bbs_index2];
			
			if(this.mobanArr[index].isTrue){ //两页换横版的情况选中
				console.log("两页换横版的情况选中")
				//切换前选中的页码
				var otext = $(".time_main_left .active_line .pageleft span").text()
//				console.log(otext+'页')
				this.bbsTemplate_data[this.bbs.bbs_index1] = [];
				var josnImg = {"template":bbsTemplateData.bbs9,"only":true,"slectTemplate":true};
				this.bbsTemplate_data[this.bbs.bbs_index1].push(josnImg)
				//两页换横版的时候清空vue里面相邻所有的数据
				if (otext%2==1) {
					console.log('奇数')
					vm.$store.commit("setDrapData",{"opage":otext,"type":"奇数"});	
				}else{
					console.log('偶数')
					vm.$store.commit("setDrapData",{"opage":otext,"type":"偶数"});
				}
				setTimeout(function(){
					vm.setPageIndex()
					vm.$store.commit("drapDiv")				
				},300)
				return;
			}
			if (this.bbsTemplate_data[this.bbs.bbs_index1][0].only) {//横版换两页的情况
				console.log("横版换两页的情况")
				this.bbsTemplate_data[this.bbs.bbs_index1] = [];
				var josnImg = {"template":bbsTemplateData.bbs1,"only":false,"slectTemplate":false};
				//选中的板式
				var josnImg2 = {"template":bbsTemplateData[chenkIndex],"only":false,"slectTemplate":true};				
				var josnImg3 = {"template":bbsTemplateData.bbs1,"only":false,"slectTemplate":true};
				var josnImg4 = {"template":bbsTemplateData[chenkIndex],"only":false,"slectTemplate":false};				
				//判断角标让选择更精确
				if (this.bbs.bbs_index2==0) {
					this.bbsTemplate_data[this.bbs.bbs_index1].push(josnImg2)
					this.bbsTemplate_data[this.bbs.bbs_index1].push(josnImg);
				}else{
					this.bbsTemplate_data[this.bbs.bbs_index1].push(josnImg4)
					this.bbsTemplate_data[this.bbs.bbs_index1].push(josnImg3);
				}
			}else{
				console.log("单页兑换")
				otemplate.template = bbsTemplateData[chenkIndex]				
			}
			this.$forceUpdate();
			this.$nextTick();
			//让编辑器 重新有拖动和页数的功能
			setTimeout(function(){
				vm.setPageIndex()
				vm.$store.commit("drapDiv");			
			},300)			
    		},
		footerBoolean(val){ //素材库抬起底部图片
			var vm = this;
			this.footerShow =val;
			setTimeout(function(){
	      		vm.jisuan();// 计算页面位置
	      	},300)
		},
      postDatas(val){    
      	console.log(val)
      	//获取数据覆盖便于二次编辑
		var constName =this.getCoustName($(".editbbs_one"))
		this.$store.state.editData.ImgHashMap.getvalue(constName).actions = val.postData;
		
        $(".editbbs_one").next("img").attr("src",val.imgData).css("width","100%").css("height","100%").css("left",0).css("top",0)
//      ImgHashMapBase64
		var oPage = $(".editbbs_one").parents(".pubilc_div").find(".page .pageleft span").text();
		var oImgSort = $(".editbbs_one").next("img").attr("imgsort")
		var oTypesTyle = $(".editbbs_one").next("img").attr("typestyle")
	
		var constName = oPage+"_"+oImgSort;
		var picObj = {"constName":constName, "page" : oPage, "editCnfIndex" : oTypesTyle, "num" : oImgSort,
            "editCnfName" : "","base64Img":val.imgData};
        //存入专门的base64的图片    
        this.ImgHashMapBase64.putvalue(constName,picObj);
      },
      click_template($event,index1,index2){//vue模版渲染完毕之后的事件处理,index1和index2就是那个二维数组对应的索引
      	this.bbs.bbs_index1 = index1; //存入二维数组的值
      	this.bbs.bbs_index2 = index2;
      	this.$forceUpdate();
      	this.setBbsTemplate()
      	this.bbsTemplate_data[index1][index2].slectTemplate = true;
		this.$nextTick();
        console.log($event.target)        
        if($($event.target).hasClass("title_pu")){ // 点击文本框
          $(".editText_one").removeClass("editText_one");
          $($event.target).addClass("editText_one");
          if ($($event.target)) {
            this.$store.commit("getTextBox",$($event.target).text())
          }
          this.openTxst();//打开文字框
        }
        if($($event.target).hasClass("drap_img")){//点击图片调起编辑器

        	  if($($event.target).next(".img_drap").attr("src")==""){return;}//为空返回
        	  
          $(".editbbs_one").removeClass("editbbs_one");
          $($event.target).addClass("editbbs_one");
          
          this.dataEditImg.oSrc = $($event.target).next("img").attr("imgstyle");
          this.dataEditImg.oW = $($event.target).parent(".drapBox").width();
          this.dataEditImg.oH = $($event.target).parent(".drapBox").height();
          //点击时候获取coustName 从hashMap里面得到他有没第一次编辑的东西         
          var constName =this.getCoustName($($event.target))
		  this.dataEditImg.oActions = this.$store.state.editData.ImgHashMap.getvalue(constName).actions;
		  console.log(this.dataEditImg)
          //从vuex缓存里面拿到我的数据
//        console.log()
          this.openImgEdit();
        }
      },
      setBbsTemplate(){//设置宝宝书板式初始化数据
      	this.bbsTemplate_data.forEach((item,i)=>{
      		item.forEach((e,i)=>{
      			e.slectTemplate = false
      		})
      	})
      },
      setPageIndex(){//设置页数
        $(".comtent_chanpin .time_pu .page .pageleft span").each((i,e)=>{
			$(e).text((i+1)).attr("page",(i+1))
        })
      },
      jisuan(){//动态计算面积
        var oH = $(window).height()-$(".footer_img").height()-$("#handers .header").height()-$(".comtent_chanpin .line_comtent .comtent .title").height()-32;
		$(".time_main_left").css("height",oH+'px');
      },
      checkFooterShow($event){ //切换底部的图片显示隐藏
      	var vm = this;
      	this.footerShow = !this.footerShow;
      	setTimeout(function(){
      		vm.jisuan();// 计算页面位置
      	},300)
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

      },
      preview () {
        this.isShowPreview = true
      },
      fnd(){
      	console.log("数据改变了")
      }
    },
    computed:{
		...mapGetters({   
			FooterDataAuto:"GetFooterDataAuto"   //底部选中的图片状态
		})
    },
    watch:{
    		bbsTemplate_data:"fnd"
    },
    created(){//只执行一次
     
      //模版数据
      this.bbsTemplate_data = bbsData_template;
      console.log(this.bbsTemplate_data)
      this.setBbsTemplate();
      this.$nextTick(function () {
        $('#previewComtent').off('turn').turn({
          page:2,
          gradients: true,
          acceleration: true});
      })
      
    },
    mounted(){
      //调用vuex里面的拖拽方法，初始化的时候
      this.$store.commit("drapDiv")
      this.setPageIndex();
 	  this.jisuan();// 计算页面位置
//		 	this.$router.push({ path: '/security/iploginanalysis/'+json.name,params: { deviceId: 123}});
	  setTimeout(function(){
		$("#div_drap").Tdrag();
	  },500)


    }
  }
</script>

<style>
</style>
