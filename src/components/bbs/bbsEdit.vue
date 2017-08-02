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
              <span >56页</span>
              <span>￥499</span>
            </div>
          </div>
        </div>
      </div>
      <div class="line_comtent">
        <div class="comtent">
          <div class="time_main_left">
            <div class="time_bg" v-for="(item,index) in bbsTemplate_data">
              <!--pubilc_div 这个class是留给整屏来定义的样式  click_template 是用vue里面的事件委派来解决避免不了的dom操作-->
              <div class="pubilc_div" @click="click_template($event)" v-html="htmlTetx" v-for="(htmlTetx,index2) in item">
                
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
            <button class="footer_btn" @click="preview">
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
        <div   class="fonter_box_img">
          <ul>
            <li  v-for="(footerImg,index) in $store.state.bbs.footerData" draggable="true">
              <img :src="footerImg.thumbnailUrl"/>
            </li>
          </ul>
        </div>
        <!--</el-collapse-transition>-->
      </div>
    </div>
    <!--模态框素材库-->
    <div-model  :isShowModel="isModel"></div-model>
    <!--图片编辑插件 postData 编辑器返回的数据-->
    <img-edit @postDataImg="postDatas" :dataEditJson="dataEditImg"  :isImgEdit="isimgEdit"></img-edit>
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
  //如果是这种组件我要在这里 引入他

  var aa = 0;//计数器
  export default {
    data () {
      return {
      	ImgHashMapBase64:new HashMap(),
        isShowPreview:false,
        isModel:false, //素材
        isimgEdit:false, //图片编辑
        iseditText:false, //文字弹窗
        footerShow:true, //页脚控制的折叠变量
        bbs:{
          material:[],//素材库
          textModel:'' //弹出框文字
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
      click_template($event){//vue模版渲染完毕之后的事件处理
        console.log($event.target)
        if($($event.target).hasClass("text")){ // 点击文本框
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
      setPageIndex(){//设置页数
        $(".comtent_chanpin .time_pu .page .pageleft span").each((i,e)=>{
			$(e).text((i+1)).attr("page",(i+1))
        })
      },
      jisuan(){//动态计算面积
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

      },
      preview () {
        this.isShowPreview = true
      }
    },
    computed:{

    },
    created(){//只执行一次
      this.jisuan();// 计算页面位置
      //模版数据
      this.bbsTemplate_data = bbsData_template;
      console.log(this.bbsTemplate_data)
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
