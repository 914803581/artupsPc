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
            <div class="time_bg" v-for="(item,index) in bbsTemplate_data">
              <!--pubilc_div 这个class是留给整屏来定义的样式  click_template 是用vue里面的事件委派来解决避免不了的dom操作-->
              <div class="pubilc_div" @click="click_template($event)" v-html="htmlTetx" v-for="(htmlTetx,index2) in item">

              </div>
            </div>
          </div>
        </div>
        <div class="shield" v-show="isShowPreview" @click="isShowPreview=false"></div>
        <div class="preview_wrapper" v-show="isShowPreview">
          <div class="preview_comtent">
            <!--<div class=""></div>-->
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
  var aa = 0;//计数器
  export default {
    data () {
      return {
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
        bbsTemplate_data:[] //宝宝书模版数据的二维数组
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
      postDatas(val){     	
        $(".editbbs_one").attr("src",val.imgData).css("width","100%").css("height","auto").css("left",0).css("top",0)
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
        if($($event.target).hasClass("img_drap")){//点击图片调起编辑器
          $(".editbbs_one").removeClass("editbbs_one");
          $($event.target).addClass("editbbs_one");
          this.dataEditImg.oSrc = $($event.target).attr("imgstyle");
          this.dataEditImg.oW = $($event.target).parent(".drapBox").width();
          this.dataEditImg.oH = $($event.target).parent(".drapBox").height();
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
        let preview = $('.preview_comtent').html('')
        $('.pubilc_div').each(function(i,dom){
          let page = $(dom).clone(true)
          page.find('.page').remove()
          preview.append(page)
        })
        preview.off('turn')
        preview.turn({
          width: 930,
          height: 540,
          autoCenter: true,
          gradients: true,
          acceleration: true
        });
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
