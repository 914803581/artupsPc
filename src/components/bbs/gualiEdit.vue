<template>
  <div id="bbsEdit">
    <unify-header></unify-header>
    <!--loading -->
    <Loading :loadingText="sloadingText" :showLoading="sLoading"></Loading>
    <div class="comtent_chanpin">
      <div class="line_comtent">
        <div class="comtent">
          <div class="title">
            <div class="title_left">
              <span>挂历编辑</span>
              <span></span>
            </div>
            <div class="title_right">
              <span>挂历.<span id="colour"></span>{{size}}.13页</span>
              <span></span>
              <span><i class="iconfont">&#xe6e2;</i>{{price}}</span>
            </div>
          </div>
          <transition name="el-zoom-in-top">
            <div v-show="bbs.Switching" id="div_drap">
              <div class="titleBox menubar_titleBox">
                更换版式
                <div @click="bbs.Switching=false" class="titleClose"><i class="iconfont">&#xe746;</i></div>
              </div>
              <div class="checkBS_b">

              </div>
            </div>
          </transition>
          <!--功能div-->
          <div class="box_menu">
            <ul>
              <!--<li><i class="iconfont">&#xe711;</i>添加组件</li>-->
              <!--<li @click="bbs.Switching=true"><i class="iconfont">&#xe64f;</i>更换板式</li>-->
              <li @click="nextStep('1')"><i style="font-size: 20px;padding:0;" class="iconfont">&#xe602;</i>加入购物车</li>
              <li @click="nextStep('2')"><i class="iconfont">&#xe629;</i>立即购买</li>
              <!--<li @click="nextStep"><i class="iconfont">&#xe629;</i>下一步</li>-->
              <!--这里保存是要先验证，然后在保存-->
              <!--<li ><i class="iconfont">&#xe612;</i>保存作品</li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="line_comtent">
        <div class="comtent scrollBar">
          <div class="time_main_left" id="gualiEdit">
            <div :class="{'taili_shu':titleMsg==='竖','taili_xiaoguali':titleMsg==='小挂历'}" class="time_bg heji_hengban" :index-stort="index"
                 v-for="(item,index) in bbsTemplate_data">
              <!--pubilc_div 这个class是留给整屏来定义的样式  click_template 是用vue里面的事件委派来解决避免不了的dom操作  hengban_bbs 横版增加的class  hengban_bbs 红线class  @click="click_template($event)"-->
              <div :ddd="item[0].firstPage" class="pubilc_div pubilc_heji_div" :only="htmlTetx.double"
                   :class="{'hengban_bbs':htmlTetx.double}" v-html="htmlTetx.template"
                   @click="click_template($event)" v-for="(htmlTetx,index2) in item">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--底部的图片-->
      <div v-DomHeight style="position: fixed;height: auto" class="footer_img">
        <div class="footer_up_tittle">
          <div class="footer_left">
            <button @click="delectFooter" class="footer_btn">
              清空底部图片
            </button>
            <button @click="autoDrapImg" v-if="FooterDataAuto.length>0" class="footer_btn">
              自动填充<b style="font-weight: 500;">{{FooterDataAuto.length}}张</b>
            </button>
          </div>
          <div @click="checkFooterShow($event)" class="footer_center">
            <span class="imgSpan">图片<i class="iconfont">&#xe600;</i></span>
          </div>
          <div class="footer_right">
            <!--<button class="footer_btn" @click="preview">-->
            <!--预览合集-->
            <!--</button>-->
            <button @click="open_material" class="footer_btn">
              添加图片
            </button>
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="footerShow" class="fonter_box_img">
            <ul v-if="$store.state.bbs.footerData.length > 0">
              <li :style="{backgroundImage: 'url(\''+footerImg.thumbnailUrl+'\')'}" class="bg_cover"
                  @click="footerImgSlectFooter(index)" :class="{'img_size_border':footerImg.slectFooter}"
                  :att="footerImg.slectFooter" v-for="(footerImg,index) in $store.state.bbs.footerData"
                  draggable="true">
                <img style="filter:alpha(opacity=0);opacity: 0" :src="footerImg.thumbnailUrl"/>
              </li>
            </ul>
            <p style="line-height: 116px;text-align: center;font-size: 16px;color: #6b6b6b;"
               v-if="$store.state.bbs.footerData.length==0">选择“添加图片”来开始使用</p>

          </div>
        </el-collapse-transition>
      </div>
    </div>
    <!--模态框素材库-->
    <transition name="el-fade-in">
      <div-model @footerBurl="footerBoolean" :isShowModel="isModel"></div-model>
    </transition>
    <!--图片编辑插件 postData 编辑器返回的数据-->
    <transition name="el-fade-in">
      <img-edit @postDataImg="postDatas" :dataEditJson="dataEditImg" :isImgEdit="isimgEdit"></img-edit>
    </transition>
    <!--文字编辑框-->
    <transition name="el-fade-in">
      <edit-text :isEditText="iseditText"></edit-text>
    </transition>
    <!--<div-editText ></div-editText>-->
    <preview-calendar :colorName="colorName" :visible.sync="previewDialogVisible" :data="previewData"
                      @close="previewDialogVisible=false"></preview-calendar>
  </div>
</template>
<script>
  /* eslint-disable semi,no-undef */
  import {Message} from 'element-ui'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import Header from '@/components/header/header.vue'
  import Api from '../../api.js'
  import filter from '../../filter.js'
  import {DomHeight} from '../../directive.js'
  import divModel from '../component/model/model.vue'
  import imgEdit from '../component/imgEdit/imgEdit.vue'
  import editText from '../component/editText/editText.vue'
  import navHander from '../../components/component/hander/hander.vue'
  import PreviewCalendar from '../album/previewCalendar.vue'

  let isOk = false;
  export default {
    data() {
      return {
        size: '',
        titleMsg: '',//横隔竖着的标识符
        tailiSize: "",
        sLoading: false,
        sloadingText: "数据保存中...",
        colorName: '',
        previewDialogVisible: false,
        mobanArr: [],
        ImgHashMapBase64: new HashMap(),
        isShowPreview: false,
        isModel: false, //素材
        isimgEdit: false, //图片编辑
        iseditText: false, //文字弹窗
        footerShow: true, //页脚控制的折叠变量
        bbs: {
          material: [], //素材库
          textModel: '', //弹出框文字
          Switching: false, //切换板式
          // 二维数组第一位角标 bbs_index1  和二位角标
          extraCode: '' //保存之后，随机生成的一个编辑code码
        },
        dataEditImg: {}, //传递给图片编辑的对象
        bbsTemplate_data: [
          [{
            "template": bbsTemplateData.guali1,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs1"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ], [{
            "template": bbsTemplateData.guali2,
            "only": false,
            "double": true,
            "firstPage": false,
            "lastPage": false,
            "type": "bbs2"
          }
          ]
        ],
        tplCode: 'pc_heji_500X350_10_single', //合集
        workEdit: {}, //素材保存组装传给后端的数据
        previewData: [],
        price:0
      }
    },
    //		beforeRouteEnter(to,from,next){
    //			console.log(to)
    //			console.log(from)
    //
    //			next();
    //
    //		},
    components: { //在再这里要注入我的组件
      'unify-header': Header,
      divModel,
      imgEdit,
      editText,
      PreviewCalendar
    },
    methods: {
      ...mapMutations({ //同步触发操作集合
        delectFooter: "delectFooterData"
      }),
      click_template($event) { //vue模版渲染完毕之后的事件处理,index1和index2就是那个二维数组对应的索引
        if ($($event.target).hasClass("drap_img")) { //点击图片调起编辑器
          if ($($event.target).next(".img_drap").attr("src") === "") {
            return;
          } //为空返回
          $(".editbbs_one").removeClass("editbbs_one");
          $($event.target).addClass("editbbs_one");
          this.dataEditImg.oSrc = $($event.target).next("img").attr("imgstyle")
          this.dataEditImg.oW = $($event.target).parent(".drapBox").width()
          this.dataEditImg.oH = $($event.target).parent(".drapBox").height()
          //点击时候获取coustName 从hashMap里面得到他有没第一次编辑的东西
          var constName = this.getCoustName($($event.target))
          console.log(this.$store.state.editData.ImgHashMap.getvalue(constName))
          this.dataEditImg.oActions = this.$store.state.editData.ImgHashMap.getvalue(constName).actions
//          console.log(this.dataEditImg)
          //从vuex缓存里面拿到我的数据
          this.openImgEdit();
        }
      },
      setPageIndex() { //设置页数和下面的背景图
        $(".comtent_chanpin .time_pu .page .pageleft span").each((i, e) => {
          $(e).text('2018年' + i + '月').attr("page", i);
        })
        //设置对应的背景图
        $("#gualiEdit .guali_img img").each(function (i, e) {
          $(this).attr("src", "http://image2.artup.com/static/pc/images/guali_template/guali_600*500/gualishu2018" + (i + 1) + ".png")
        })
      },
      goCart(val) { //加入购物车
        //字符串转换数组存储到对象里面
        let bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
        var jsons = {
          operator: "add",
          userDbId: localStorage.getItem("userDbId"),
          category: bbsSlsectDate.category, //产品类型这里是宝宝书,暂时写死
          edtDbId: this.workEdit.edtDbId, //编辑的id
          price: bbsSlsectDate.price,
          num: "1",
          thumbnailImageUrl: "", //首页图
          total: bbsSlsectDate.price,
          sku: bbsSlsectDate.name,
          skuCode: bbsSlsectDate.skuCode,
          skuId: bbsSlsectDate.skuId
        }
        Api.car.addCar(jsons).then(res => {
          console.log(res);
          this.sLoading = false
          if (val == "1") {
            this.$message({
              showClose: true,
              iconClass: "atrup_Message",
              message: '成功添加购物车!',
              type: 'success'
            });
            this.$router.push({
              path: "/user/cart",
              query: {}
            })
          } else {
            this.$message({
              showClose: true,
              iconClass: "atrup_Message",
              message: '请点击结算，立即购买吧!',
              type: 'success'
            });
            this.$router.push({
              path: "/user/cart",
              query: {"carDbId": res.data.extraCode}
            })
          }
        }, err => {
          console.log(err)
          this.$message({
            showClose: true,
            iconClass: "atrup_Message",
            message: '添加购物车出错!',
            type: 'success'
          });
        })
      },
      autoDrapImg() { //自动填充图片的操作
        var vm = this;
        var arrNode = [];
        if(vm.titleMsg=="小挂历"){
          $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
            if(index>0){
              if (!$(el).attr("src")) {
                arrNode.push($(el));
              }
            }
          })
        } else{
          $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
            if (!$(el).attr("src")) {
              arrNode.push($(el));
            }
          })
        }
        var arrDrap = []; //一下传递给vuex处理的数据角标
        if ($(arrNode).size() < 1) {
          this.$message({
            iconClass: "atrup_Message",
            showClose: true,
            message: '恭喜您图片已全部上传完毕，请加入购物车购买喲',
            type: 'success'
          });
          return;
        }
        $(arrNode).each(function (index, el) { //真正存放的操作
          if (index < vm.FooterDataAuto.length) {
            $(".editAutoDrap").removeClass("editAutoDrap");
            $(el).addClass("editAutoDrap"); //编辑自动拖拽
            $(el).attr("src", vm.FooterDataAuto[index].thumbnailUrl)
              .attr('imgStyle', vm.FooterDataAuto[index].thumbnailUrl)
              .attr("dbid", vm.FooterDataAuto[index].dbId)
              .attr("thumbnailScale", vm.FooterDataAuto[index].thumbnailScale)
            //每次循环都取触发存储数据的操作
            vm.$store.commit("autoPushData", 'heji')
            //计算位置
            setTimeout(function () {
              arrDrap.unshift(index)
              dragThumb($(el), $(el).parent())
            }, 200)
          }
        })
        //处理图片底部自动删除的操作
        vm.$store.commit("autoDrapData", arrDrap)
      },
      footerImgSlectFooter($index) { //提交
        this.$store.commit("editFooterStatus", $index)
      },
      assembleData() { //执行保存工作组装数据的公共函数
        var vm = this;
        var arrMap = []; //没有图片的空数组
        for (var i = 0; i < this.$store.state.editData.ImgHashMap.keys().length; i++) {
          if (this.$store.state.editData.ImgHashMap.getvalue(this.$store.state.editData.ImgHashMap.keys()[i])) {
            arrMap.push(this.$store.state.editData.ImgHashMap.getvalue(this.$store.state.editData.ImgHashMap.keys()[i]))
          }
        }
        //字符串转换数组存储到对象里面
        let bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
//        updataSkuData(this.tailiSize,bbsSlsectDate.colorName);

        this.workEdit.editPicture = JSON.stringify(arrMap);
        this.workEdit.tplCode = bbsSlsectDate.tplCode;
        this.workEdit.operator = "add";
        this.workEdit.category = this.getFromSession("category");
        this.workEdit.sku = bbsSlsectDate.name;
        this.workEdit.skuId = bbsSlsectDate.skuId;
        this.workEdit.status = 2;
        this.workEdit.skuCode = bbsSlsectDate.skuCode;
        this.workEdit.startDt = vm.dataMonth;
        this.workEdit.defDbId = this.getFromSession("defDbId");
        $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
          if ($(el).attr("src")) { //如果src存在
            vm.workEdit.thumbnailImageUrl = $(el).attr("imgstyle");
            return false;
          } else {
            vm.workEdit.thumbnailImageUrl = "";
          }
        })
      },
      editWork(val) { //保存作品
        this.assembleData();
        //唤出loading...
        this.sLoading = true
        this.sloadingText = "挂历保存中..."
        //保存函数
        console.log(this.workEdit)
        Api.work.workEdit(this.workEdit).then((res) => {
          console.log(res);
          if (res.data.code === 'success') { //如果成功
            //存入编辑id
            this.workEdit.edtDbId = res.data.extraCode
            this.goCart(val); //执行加入购物车的操作
            console.log('保存的code:', res.data.extraCode)
          }
        })
      },
      nextStep(val) { //下一步
        //保存函数
        this.assembleData();
        var vm = this;
        let isOK = true
        $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
          if (!$(el).attr("src")) { //如果src存在
            var page = $(el).parents(".pubilc_div").find(".page span").text();
            console.log(page)
            if (page) {
              if(page=="2018年0月"){
                page="2018年封面"
              }
              if(vm.titleMsg=="小挂历" &&  page=="2018年封面"){
                return
              }else{
                vm.$message({
                  iconClass: "atrup_Message",
                  showClose: true,
                  message: '请上传挂历' + page + '图片'
                });
                isOK = false
                return false;
              }

            }
          }
        })
        if (isOK) { //作品图片全部上传完毕
          vm.editWork(val); //执行保存的工作
        }
      },
      footerBoolean(val) { //素材库抬起底部图片
        var vm = this;
        this.footerShow = val;
        setTimeout(function () {
          vm.jisuan(); // 计算页面位置
        }, 300)
      },
      postDatas(val) { //获取数据覆盖便于二次编辑
        var constName = this.getCoustName($(".editbbs_one"))
        this.$store.state.editData.ImgHashMap.getvalue(constName).actions = val.postData;
        var oPage = $(".editbbs_one").parents(".pubilc_heji_div").find(".pageleft span").attr("page");
        $(".editbbs_one").next("img").attr("src", val.imgData).css("width", "100%").css("height", "100%").css("left", 0).css("top", 0)
        //      ImgHashMapBase64
        var oImgSort = $(".editbbs_one").next("img").attr("imgsort")
        var oTypesTyle = $(".editbbs_one").next("img").attr("typestyle")
        constName = oPage + "_" + oImgSort;
        var picObj = {
          "constName": constName,
          "page": oPage,
          "editCnfIndex": oTypesTyle,
          "num": oImgSort,
          "editCnfName": "",
          "base64Img": val.imgData
        };
        if ($(".editbbs_one").hasClass("drap_img_lomo")) { //lomo
//          alert(constName)
          this.$store.commit("previewWork_lomo", {
            constName: constName,
            picObj: picObj
          })
        } else {
          //拿constName去替换vuex里面已经存在的数据给预览产品
          this.$store.commit("previewWork", {
            constName: constName,
            picObj: picObj
          })
        }
      },
      jisuan() { //动态计算面积
        console.log($(".comtent_chanpin .line_comtent .comtent .title").height())
        var oH = $(window).height() - $(".footer_img").height() - $(".unify-header").height() - $(".comtent_chanpin .line_comtent .comtent .title").height() - 2;
        $(".line_comtent .scrollBar").css("height", oH + 'px');
      },
      checkFooterShow($event) { //切换底部的图片显示隐藏
        var vm = this;
        this.footerShow = !this.footerShow;
        setTimeout(function () {
          vm.jisuan(); // 计算页面位置
        }, 300)
      },
      open_material() { //打开素材库
        this.isModel = !this.isModel
      },
      openTxst() { //打开文字框
        this.iseditText = !this.iseditText;
      },
      openImgEdit() {
        this.isimgEdit = !this.isimgEdit;
      },
      preview() {
      }
    },
    computed: {
      ...mapGetters({
        FooterDataAuto: "GetFooterDataAuto", // 底部选中的图片状态
        PreviewWork: "GetPreviewWork" // 预览产品需要数据的变量
      })
    },
    watch: {},
    created() {
    },
    mounted() {
      //默认设置背景
      var vm = this
      let bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"))
      vm.size = bbsSlsectDate.size
      vm.titleMsg = sessionStorage.getItem('gualiType')
      vm.price = bbsSlsectDate.price
      vm.setPageIndex()
      this.jisuan() // 计算页面位置
      setTimeout(function () {
        $("#div_drap").Tdrag({
          handle: ".titleBox"
        });
      }, 500)
      setTimeout(function () {
        isOk = true
      }, 2000)
    }
  }
</script>
