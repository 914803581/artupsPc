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
              <span>台历.<span id="colour">白色</span>.{{tailiSize}}.13页</span>
              <span></span>
              <span><i class="iconfont">&#xe6e2;</i>59.80</span>
            </div>
          </div>
          <transition name="el-zoom-in-top">
            <div v-show="bbs.Switching" id="div_drap">
              <div class="titleBox menubar_titleBox">
                更换版式
                <div @click="bbs.Switching=false" class="titleClose"><i class="iconfont">&#xe746;</i></div>
              </div>
              <div class="checkBS_b">
                <ul>
                  <li>选择尺寸:</li>
                  <li>
                    <div class="el-radio-group">
                      <label @click="checkTemplateTaili('横')" class="el-radio-button">
                        <span class="el-radio-button__inner">横版</span></label>
                      <label class="el-radio-button">
                        <span @click="checkTemplateTaili('竖')" class="el-radio-button__inner">竖版</span>
                      </label>
                    </div>
                  </li>
                  <li>选择起始年月:</li>
                  <li>
                    <el-date-picker @change="changeMonth" style="width: 164px;" :picker-options="pickerOptions0"
                                    size="small"
                                    v-model="dataMonth" type="month" placeholder="选择台历开始的年月">
                    </el-date-picker>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
          <!--功能div-->
          <div class="box_menu">
            <ul>
              <!--<li><i class="iconfont">&#xe711;</i>添加组件</li>-->
              <li @click="bbs.Switching=true"><i class="iconfont">&#xe64f;</i>更换板式</li>
              <li @click="nextStep('1')"><i style="font-size: 20px;padding:0;" class="iconfont">&#xe602;</i>加入购物车</li>
              <li @click="nextStep('2')"><i class="iconfont">&#xe629;</i>立即购买</li>
              <!--<li @click="nextStep"><i class="iconfont">&#xe629;</i>下一步</li>-->
              <!--这里保存是要先验证，然后在保存-->
              <!--<li ><i class="iconfont">&#xe612;</i>保存作品</li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="line_comtent" id="guali">
        <div class="comtent scrollBar">
          <div class="time_main_left time_main_left_ht">
            <div class="time_bg guali_hengban taili_hengban" :index-stort="index" v-for="(item,index) in bbsTemplate_data">
              <!--pubilc_div 这个class是留给整屏来定义的样式  click_template 是用vue里面的事件委派来解决避免不了的dom操作  hengban_bbs 横版增加的class  hengban_bbs 红线class-->
              <div :ddd="item[0].firstPage" class="pubilc_div" :only="htmlTetx.only"
                   :class="{'hengban_bbs':htmlTetx.only}" v-html="htmlTetx.template"
                   @click="click_template($event,index,index2)" v-for="(htmlTetx,index2) in item">
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
            <button class="footer_btn" @click="preview">
              预览台历
            </button>
            <button @click="open_material" class="footer_btn">
              添加图片
            </button>
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="footerShow" class="fonter_box_img">
            <ul v-if="$store.state.bbs.footerData.length > 0">
              <li :style="{backgroundImage: 'url(\''+footerImg.thumbnailUrl+'\')'}"  class="bg_cover" @click="footerImgSlectFooter(index)" :class="{'img_size_border':footerImg.slectFooter}"
                  :att="footerImg.slectFooter" v-for="(footerImg,index) in $store.state.bbs.footerData"
                  draggable="true">
                <img  style="filter:alpha(opacity=0);opacity: 0" :src="footerImg.thumbnailUrl"/>
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
        tailiSize: JSON.parse(sessionStorage.getItem("bbsSlsectDate")).size,
        sLoading: false,
        sloadingText: "数据保存中...",
        checkTaiLiData: [], //切换尺寸时候已经有图片的保存的节点
        pickerOptions0: { //初始化日期区间函数
          disabledDate(time) {
            return time.getTime() < new Date('1/1/2017') || time.getTime() > new Date('1/31/2018');
          }
        },
        dataMonth: '2017-01', //年月绑定的值
//        isOk:false,
        tailiStyle: {  //这里1等于横，2为竖
          plate: "1",
          taiLiMonth: '1', //台历默认的月份
          taiLiYear: '2017'//台历默认的年份
        },
        options: [{ //选择横版还是竖版
          value: '横',
          label: '台历横版'
        }, {
          value: '竖',
          label: '台历竖版'
        }],
        optionValue: '', //选中的横竖板式
        colorName: '',
        previewDialogVisible: false,
        mobanArr: [],
        templateoindex: 0,
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
        bbsTemplate_data: [], //宝宝书模版数据的二维数组
        tplCode: 'pc_baobaoshu_170-235_24_single', //暂时写死的1个数据
        workEdit: {}, //素材保存组装传给后端的数据
        previewData: []
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
      checkTemplateTaili(tel) {
        var vm = this;
        if (sessionStorage.getItem('tailiType') !== tel) {
          vm.$confirm('切换版式之后编辑器内图片会被清空', '台历提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            customClass: 'artup_MessageBox'
          }).then(() => {
            if (tel === "横") {
              $(".taili_pu_2").addClass("taili_pu");
              $(".taili_pu").removeClass("taili_pu_2");
              sessionStorage.setItem('tailiType', tel)
              vm.tailiSize = "195X145"
              vm.setTailiBg(); //修改台历背景图片
            } else if (tel === "竖") {
              $(".taili_pu").addClass("taili_pu_2");
              $(".taili_pu_2").removeClass("taili_pu");
              sessionStorage.setItem('tailiType', tel)
              vm.setTailiBg(); //修改台历背景图片
              vm.tailiSize = "145X195"
            }
            vm.$store.commit('removeAllImgHashMap')//指向vuex 清除里面所有的数据
            //修改session的值
            let bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
            this.updataSkuData(this.tailiSize,bbsSlsectDate.colorName);
          }).catch(() => {
            vm.$message({
              type: 'success',
              iconClass: "atrup_Message",
              message: '已取消'
            });
          });
        } else {
          vm.$message({
            type: 'success',
            iconClass: "atrup_Message",
            message: '尺寸未发生改变'
          });
        }
      },
      changeMonth(val) { //选择的年月
        console.log("选择的年月__", val)
        var vm = this;
        vm.dataMonth = val;
        vm.tailiStyle.taiLiMonth = parseInt(val.split('-')[1])
        vm.tailiStyle.taiLiYear = parseInt(val.split('-')[0])
        console.log('台历数据', vm.bbsTemplate_data);
        if (vm.tailiStyle.taiLiMonth) { // 选择多少月
          console.log('月份__', vm.tailiStyle.taiLiMonth)
          vm.setPageIndex();
        }
        vm.setTailiBg();
      },
      setTailiBg() { //设置台历的背景
        var vm = this;
        if (sessionStorage.getItem('tailiType') === "横") {
          setBg("横", "taili_145X195");
        } else {
          setBg("竖", "taili_145X195");
        }

        function setBg(ifflag, str) { //ifflag判断条件 路径 taili_145X195
          if (sessionStorage.getItem('tailiType') === ifflag) {
            $(".comtent_chanpin .pubilc_div .time_pu .page span:nth-child(2)").each(function (index, els) {
              if (index > 0) {
                var oPage = $(this).text();// 页码
                var year = parseInt($(this).prev(".year").text())
                var yearBg = $(this).parents(".time_bg").find(".time_pu >img");
                yearBg.attr("src", "http://image2.artup.com/static/pc/images/pc_taili/" + str + "/" + year + oPage + ".jpg");
              }
            })
            if (parseInt(vm.tailiStyle.taiLiYear) === 2017) {
              $(".lastPage_taili").attr("src", "http://image2.artup.com/static/pc/images/pc_taili/" + str + "/end2017.jpg")
            } else if (parseInt(vm.tailiStyle.taiLiYear) === 2018 || parseInt(vm.tailiStyle.taiLiMonth) > 1) {
              $(".lastPage_taili").attr("src", "http://image2.artup.com/static/pc/images/pc_taili/" + str + "/end2018.jpg")
            }
          }
        }

        vm.setPageIndex();
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
        $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
          if (!$(el).attr("src")) {
            arrNode.push($(el));
          }
        })
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
            vm.$store.commit("autoPushDataTaili",'taili')
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
        //切换尺寸的时候重新组装数据
//       function  updataSkuData(nowSize, nowColor) {
//          var skuCode = 'taili' + '.' + nowSize + '.' + nowColor
//          var jsons = {
//            category: 'taili',
//            parameter: skuCode
//          }
//          Api.sku.querySku(jsons).then(res => {
//            console.log('日历参数___', res)
//          })
//        }
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
      //切换尺寸的时候重新组装数据
      updataSkuData(nowSize, nowColor) {
        var skuCode = 'taili' + '.' + nowSize + '.' + nowColor
        var jsons = {
          category: 'taili',
          parameter: skuCode
        }
        let bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
        Api.sku.querySku(jsons).then(res => {
          this.workEdit.tplCode = res.data.templateCode;
          this.workEdit.sku = bbsSlsectDate.name.split('.')[0]+'.'+bbsSlsectDate.name.split('.')[1]+'.'+nowSize;
          this.workEdit.skuId = res.data.skuId;
          this.workEdit.status = 2;
          this.workEdit.skuCode = skuCode;

          bbsSlsectDate.size = nowSize
          bbsSlsectDate.name = bbsSlsectDate.name.split('.')[0]+'.'+bbsSlsectDate.name.split('.')[1]+'.'+nowSize
          bbsSlsectDate.tplCode = res.data.templateCode
          bbsSlsectDate.editCnfName = res.data.templateCode+'_single'
          bbsSlsectDate.skuId = res.data.skuId
          bbsSlsectDate.skuCode = skuCode

          sessionStorage.setItem("bbsSlsectDate",JSON.stringify(bbsSlsectDate));
        })
      },
      editWork(val) { //保存作品
        this.assembleData();
        //唤出loading...
        this.sLoading = true
        this.sloadingText = "台历保存中..."
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
        console.log(this.workEdit)
        let isOK = true
        $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
          if (!$(el).attr("src")) { //如果src存在
            var page = $(el).parents(".pubilc_div").find(".page span:nth-of-type(2)").text();
            if (page) {
              if (page === "封面") {
                vm.$message({
                  showClose: true,
                  iconClass: "atrup_Message",
                  message: '请上传台历封面图片'
                });
                isOK = false
                return false;
              }
              vm.$message({
                iconClass: "atrup_Message",
                showClose: true,
                message: '请上传台历' + $(el).parents(".pubilc_div").find(".page span:nth-of-type(1)").text() + page + '月图片'
              });
              isOK = false
              return false;
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
        var constName = this.getCoustNameTaiLi($(".editbbs_one"))
//        if(constName==="封面_1"){
//          constName="0_1"
//        }
        this.$store.state.editData.ImgHashMap.getvalue(constName).actions = val.postData;
        var oPage = $(".editbbs_one").parents(".pubilc_taili_div").find(".page span:nth-of-type(2)").text();
        if(oPage==="封面"){ //如果是台历有封面的情况
          oPage = 0
        }
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
//          alert(constName)
          this.$store.commit("previewWork", {
            constName: constName,
            picObj: picObj
          })
        }
      },
      click_template($event, index1, index2) { //vue模版渲染完毕之后的事件处理,index1和index2就是那个二维数组对应的索引
        this.bbs.bbs_index1 = index1; //存入二维数组的值
        this.bbs.bbs_index2 = index2;
        this.$forceUpdate();
        this.setBbsTemplate()
        this.bbsTemplate_data[index1][index2].slectTemplate = true;
        this.$nextTick();
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
          var constName = this.getCoustNameTaiLi($($event.target))
          this.dataEditImg.oActions = this.$store.state.editData.ImgHashMap.getvalue(constName).actions
//          console.log(this.dataEditImg)
          //从vuex缓存里面拿到我的数据
          this.openImgEdit();
        }
      },
      setBbsTemplate() { //设置宝宝书板式初始化数据
        this.bbsTemplate_data.forEach((item, i) => {
          item.forEach((e, i) => {
            e.slectTemplate = false
          })
        })
      },
      setPageIndex() { //设置页数
        var vm = this;
        $(".comtent_chanpin .pubilc_div .time_pu .page").each(function (i, el) {
          if (i === 0) {
            $(el).text("");
            $(el).append("<span></span>");
            $(el).append("<span></span>");
            $(el).find("span:nth-child(2)").text("封面");
          } else {
            if (vm.tailiStyle.taiLiMonth > 1) {
              $(el).find("span:nth-child(2)").text(i + (vm.tailiStyle.taiLiMonth - 1));
              $(".comtent_chanpin .pubilc_div .time_pu .page span:nth-child(2)").each(function (index, els) {
                if ($(this).text() > 12) {
                  $(this).text(parseInt($(this).text()) - 12)
                  if (parseInt(vm.tailiStyle.taiLiYear) < 2018) {
                    $(this).prev("span").text(parseInt(vm.tailiStyle.taiLiYear) + 1 + '年')
                  } else {
                    $(this).prev("span").text(parseInt(vm.tailiStyle.taiLiYear) + '年')
                  }
                }
              })
            } else {
              $(el).find("span:nth-child(2)").text(i);
              $(el).find(".year").text(vm.tailiStyle.taiLiYear + '年')
            }
          }
        })
        $(".time_main_left .time_bg:last-of-type").find(".pubilc_div:nth-child(1) .time_pu >img").addClass("lastPage_taili")
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
      get_material() {

      },
      preview() {
        let _self = this
        this.previewData = []
        let defaultImg = 'data:image/png;base64,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'
        for (let i = 12; i >= 0; i--) {
          let calendar = defaultImg
          if (i) {
            let years = _self.dataMonth.split('-')[0] - 0
            let months = (parseInt(_self.dataMonth.split('-')[1]) - 1) + i - 1
            let date = new Date(years, months)
            calendar = `http://image2.artup.com/static/pc/images/pc_taili/taili_145X195/${date.getFullYear()}${(date.getMonth() + 1)}.jpg`
          }
          this.previewData.push({
            front: calendar,
            back: defaultImg
          })
        }
        this.previewData[0].back = 'http://image2.artup.com/static/pc/images/pc_taili/taili_145X195/end2017.jpg'
        this.PreviewWork.baseHashMap.keys().forEach(function (key) {
          let img = _self.PreviewWork.baseHashMap.getvalue(key)
          let pageNum = img.page - 0
          let userImg = img.base64Img ? img.base64Img : img.thumbnailImageUrl
          if (!pageNum) {
            _self.previewData[13 - (pageNum + 1)].front = userImg
          } else {
            let years = _self.dataMonth.split('-')[0] - 0
            let months = (parseInt(_self.dataMonth.split('-')[1]) - 1) + pageNum - 1
            let date = new Date(years, months)
            let calendar = `http://image2.artup.com/static/pc/images/pc_taili/taili_145X195/${date.getFullYear()}${(date.getMonth() + 1)}.jpg`
            _self.previewData[13 - pageNum - 1].front = calendar
            _self.previewData[13 - pageNum].back = userImg
          }
        })
        this.previewDialogVisible = true
      },
      fnd() {
        console.log("数据改变了")
      }
    },
    computed: {
      ...mapGetters({
        FooterDataAuto: "GetFooterDataAuto", // 底部选中的图片状态
        PreviewWork: "GetPreviewWork" // 预览产品需要数据的变量
      })
    },
    watch: {
      bbsTemplate_data: "fnd"
    },
    created() {
      // 宝宝书模版数据
      // eslint-disable-next-line camelcase
      this.bbsTemplate_data = guaLiData_template
      this.setBbsTemplate()
    },
    mounted() {
      //默认设置背景
      var vm = this
      // 调用vuex里面的拖拽方法，初始化的时候
      this.setPageIndex()
      this.jisuan() // 计算页面位置
      setTimeout(function () {
        $("#div_drap").Tdrag({
          handle: ".titleBox"
        });
        if (sessionStorage.getItem('tailiType') === "横") {
          $(".taili_pu_2").addClass("taili_pu")
          $(".taili_pu").removeClass("taili_pu_2")
//          vm.optionValue = sessionStorage.getItem('tailiType');
          vm.setTailiBg() //修改台历背景图片
        } else if (sessionStorage.getItem('tailiType') === "竖") {
          $(".taili_pu").addClass("taili_pu_2")
          $(".taili_pu_2").removeClass("taili_pu")
          vm.setTailiBg(); //修改台历背景图片
        }
        //如果是咖啡色
        if (JSON.parse(sessionStorage.getItem("bbsSlsectDate")).colorName == "coffee") {
//          $(".comtent_chanpin .pubilc_div .time_pu .bbsClass .drap_img").eq(0).css("background","#6A3906")
          $("#colour").text("咖啡色")
        }
      }, 500)
      setTimeout(function () {
        isOk = true
      }, 2000)
    }
  }
</script>


