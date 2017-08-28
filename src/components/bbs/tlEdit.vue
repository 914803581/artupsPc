<template>
  <div id="bbsEdit">
    <unify-header></unify-header>
    <div class="comtent_chanpin">
      <div class="line_comtent">
        <div class="comtent">
          <div class="title">
            <div class="title_left">
              <span>台历编辑</span>
              <span>2017-07-14 11:05</span>
            </div>
            <div class="title_right">
              <span>255x355mm</span>
              <span>56页</span>
              <span>￥499</span>
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
                    <el-select @change="changeSize" size="small" v-model="optionValue" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
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
              <li><i class="iconfont">&#xe711;</i>添加组件</li>
              <li @click="bbs.Switching=true"><i class="iconfont">&#xe64f;</i>更换板式</li>
              <li @click="goCart"><i style="font-size: 20px;padding:0 ;" class="iconfont">&#xe602;</i>加入购物车</li>
              <li><i class="iconfont">&#xe629;</i>立即购买</li>
              <li @click="nextStep"><i class="iconfont">&#xe629;</i>下一步</li>
              <li @click="editWork"><i class="iconfont">&#xe612;</i>保存作品</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="line_comtent">
        <div class="comtent scrollBar">
          <div class="time_main_left time_main_left_ht">
            <div class="time_bg taili_hengban" v-for="(item,index) in bbsTemplate_data">
              <!--pubilc_div 这个class是留给整屏来定义的样式  click_template 是用vue里面的事件委派来解决避免不了的dom操作  hengban_bbs 横版增加的class  hengban_bbs 红线class-->
              <div :ddd="item[0].firstPage" class="pubilc_div pubilc_taili_div" :only="htmlTetx.only"
                   :class="{'hengban_bbs':htmlTetx.only}" v-html="htmlTetx.template"
                   @click="click_template($event,index,index2)" v-for="(htmlTetx,index2) in item">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--底部的图片-->
      <div v-DomHeight class="footer_img">
        <div class="footer_up_tittle">
          <div class="footer_left">
            <button @click="delectFooter" class="footer_btn">
              清空已放入的图片
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
              预览宝宝书
            </button>
            <button @click="open_material" class="footer_btn">
              添加图片
            </button>
          </div>
        </div>
        <el-collapse-transition>
          <div v-show="footerShow" class="fonter_box_img">
            <ul>
              <li @click="footerImgSlectFooter(index)" :class="{'img_size_border':footerImg.slectFooter}"
                  :att="footerImg.slectFooter" v-for="(footerImg,index) in $store.state.bbs.footerData"
                  draggable="true">
                <img :src="footerImg.thumbnailUrl"/>
              </li>
            </ul>
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
    <preview-book :colorName="colorName" :visible.sync="previewDialogVisible" :data="previewData"
                  @close="previewDialogVisible=false"></preview-book>
  </div>
</template>
<script>
  /* eslint-disable semi */
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
  import PreviewBook from '../album/previewBook'

  export default {
    data() {
      return {
        pickerOptions0: {//初始化日期区间函数
          disabledDate(time) {
            return time.getTime() < new Date('1/1/2017') || time.getTime() > new Date('12/31/2018');
          }
        },
        dataMonth: "",//年月绑定的值
        tailiStyle: {  //这里1等于横，2为竖
          plate: "1",
          taiLiMonth: '1', //台历默认的月份
          taiLiYear: '2017'//台历默认的年份
        },
        //选择横版还是竖版
        options: [{
          value: '横',
          label: '台历横版'
        },
          {
            value: '竖',
            label: '台历竖版'
          }
        ],
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
      PreviewBook
    },
    methods: {
      ...mapMutations({ //同步触发操作集合
        delectFooter: "delectFooterData"
      }),
      chenk_style() {//切换横版和竖版的方法
        $(".taili_pu").addClass("taili_pu_2");
        $(".taili_pu_2").removeClass("taili_pu");
      },
      changeMonth(val) {//选择的年月
        console.log("选择的年月__", val)
        this.tailiStyle.taiLiMonth = parseInt(val.split('-')[1])
        this.tailiStyle.taiLiYear = parseInt(val.split('-')[0])
        console.log(this.tailiStyle)
        this.setTailiBg();
      },
      setTailiBg() {
        var vm = this;
        if (sessionStorage.getItem('tailiType') == "横") {
          $(".comtent_chanpin .pubilc_div .time_pu .page span:nth-child(2)").each(function (i) {
            var yearBg = $(this).parents(".time_bg").next(".time_bg").find(".taili_pu >img");
            yearBg.attr("src", "http://image2.artup.com/static/pc/images/pc_taili/taili_195X145/" + vm.tailiStyle.taiLiYear + $(this).text() + ".jpg");
            if (i == 12) { //最后一页
              if (parseInt(vm.tailiStyle.taiLiYear) === 2017) {
                $(".lastPage_taili").attr("src", "http://image2.artup.com/static/pc/images/pc_taili/taili_195X145/end2017.jpg")
              } else if(parseInt(vm.tailiStyle.taiLiYear) === 2018){
                $(".lastPage_taili").attr("src", "http://image2.artup.com/static/pc/images/pc_taili/taili_195X145/end2018.jpg")
              }
            }
          })

        } else if (sessionStorage.getItem('tailiType') == "竖") {
          $(".comtent_chanpin .pubilc_div .time_pu .page span:nth-child(2)").each(function (i, el) {
            var yearBg = $(el).parents(".time_bg").next(".time_bg").find(".taili_pu_2 >img");
            yearBg.attr("src", "http://image2.artup.com/static/pc/images/pc_taili/taili_145X195/" + vm.tailiStyle.taiLiYear + $(el).text() + ".jpg");
            if (i == 12) { //最后一页
              alert(parseInt(vm.tailiStyle.taiLiYear))
              if (parseInt(vm.tailiStyle.taiLiYear) === 2017) {
                $(".lastPage_taili").attr("src", "http://image2.artup.com/static/pc/images/pc_taili/taili_145X195/end2017.jpg")
              } else if(parseInt(vm.tailiStyle.taiLiYear) === 2018){
                $(".lastPage_taili").attr("src", "http://image2.artup.com/static/pc/images/pc_taili/taili_145X195/end2018.jpg")
              }
            }

          })
        }


      },
      changeSize() { //台历的横竖
        console.log('版式______台历:_', this.optionValue)
        var vm = this;
//
        if (sessionStorage.getItem('tailiType') != this.optionValue) {
          if (this.optionValue == "横") {
            $(".taili_pu_2").addClass("taili_pu");
            $(".taili_pu").removeClass("taili_pu_2");
            sessionStorage.setItem('tailiType', this.optionValue)
            vm.setTailiBg(); //修改台历背景图片
          } else if (this.optionValue == "竖") {
            $(".taili_pu").addClass("taili_pu_2");
            $(".taili_pu_2").removeClass("taili_pu");
            sessionStorage.setItem('tailiType', this.optionValue)
            vm.setTailiBg(); //修改台历背景图片
          }

        } else {
          this.$message({
            showClose: true,
            message: '版式未发生改变',
            type: 'success'
          });
          return;
        }
      },
      goCart() { //加入购物车
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
          this.$router.push({
            path: "/user/cart",
            query: {}
          })
        }, err => {
          alert('添加购物车出错');
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
            $(el).attr("src", vm.FooterDataAuto[index].thumbnailUrl).attr('imgStyle', vm.FooterDataAuto[index].thumbnailUrl).attr("dbid", vm.FooterDataAuto[index].dbId).attr("thumbnailScale", vm.FooterDataAuto[index].thumbnailScale);
            //每次循环都取触发存储数据的操作
            vm.$store.commit("autoPushData")
            //计算位置
            setTimeout(function () {
              arrDrap.unshift(index)
              dragThumb($(el), $(el).parent())
            }, 100)
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
        var arrMap = []; //宝宝书图片的

        for (var i = 0; i < this.$store.state.editData.ImgHashMap.keys().length; i++) {

          if (this.$store.state.editData.ImgHashMap.getvalue(this.$store.state.editData.ImgHashMap.keys()[i])) {

            arrMap.push(this.$store.state.editData.ImgHashMap.getvalue(this.$store.state.editData.ImgHashMap.keys()[i]));
          }
        }

        //字符串转换数组存储到对象里面
        let bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
        this.workEdit.editPicture = JSON.stringify(arrMap);
        this.workEdit.tplCode = this.getFromSession("tplCode");
        this.workEdit.operator = "add";
        this.workEdit.category = this.getFromSession("category");
        this.workEdit.sku = bbsSlsectDate.name;
        this.workEdit.skuId = bbsSlsectDate.skuId;
        this.workEdit.status = 1;
        this.workEdit.skuCode = bbsSlsectDate.skuCode;

        $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
          if ($(el).attr("src")) { //如果src存在
            vm.workEdit.thumbnailImageUrl = $(el).attr("imgstyle");
            return false;
          } else {
            vm.workEdit.thumbnailImageUrl = "";
          }
        })
      },
      editWork() { //保存作品
        this.assembleData();
        //保存函数
        console.log(this.workEdit)
        Api.work.workEdit(this.workEdit).then((res) => {
          if (res.data.code == "success") { //如果成功
            this.$message({
              showClose: true,
              message: '作品保存成功 !',
              type: 'success'
            });
          }
          //存入编辑id
          this.workEdit.edtDbId = res.data.extraCode

          console.log('保存的code:', res.data.extraCode)
        })
      },
      nextStep() { //下一步
        //保存函数
        this.assembleData();
        var vm = this;
        console.log(this.workEdit)
        let isOK = true
        $(".comtent_chanpin .pubilc_div .bbsClass  .img_drap").each(function (index, el) {
          if (!$(el).attr("src")) { //如果src存在
            var page = $(el).parents(".pubilc_div").find(".page span:nth-of-type(2)").text();
            if (page) {
              if (page == "封面") {
                vm.$message({
                  showClose: true,
                  message: '请上传台历封面图片'
                });
                isOK = false
                return false;
              }
              vm.$message({
                showClose: true,
                message: '请上传台历第' + page + '月图片'
              });
              isOK = false
              return false;
            }
          }
        })
        if (isOK) { //作品图片全部上传完毕
          this.$message({
            showClose: true,
            message: '作品已全部上传成功,预览作品后，请添加购物车购买 !',
            type: 'success'
          });
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
        this.$store.state.editData.ImgHashMap.getvalue(constName).actions = val.postData;
        var oPage = $(".editbbs_one").parents(".pubilc_div").find(".page .pageleft span").text();
        $(".editbbs_one").next("img").attr("src", val.imgData).css("width", "100%").css("height", "100%").css("left", 0).css("top", 0)
        //      ImgHashMapBase64
        var oImgSort = $(".editbbs_one").next("img").attr("imgsort")
        var oTypesTyle = $(".editbbs_one").next("img").attr("typestyle")
        var constName = oPage + "_" + oImgSort;
        var picObj = {
          "constName": constName,
          "page": oPage,
          "editCnfIndex": oTypesTyle,
          "num": oImgSort,
          "editCnfName": "",
          "base64Img": val.imgData
        };
        if ($(".editbbs_one").hasClass("drap_img_lomo")) { //lomo
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
      click_template($event, index1, index2) { //vue模版渲染完毕之后的事件处理,index1和index2就是那个二维数组对应的索引
        this.bbs.bbs_index1 = index1; //存入二维数组的值
        this.bbs.bbs_index2 = index2;
        this.$forceUpdate();
        this.setBbsTemplate()
        this.bbsTemplate_data[index1][index2].slectTemplate = true;
        this.$nextTick();
        if ($($event.target).hasClass("drap_img")) { //点击图片调起编辑器

          if ($($event.target).next(".img_drap").attr("src") == "") {
            return;
          } //为空返回

          $(".editbbs_one").removeClass("editbbs_one");
          $($event.target).addClass("editbbs_one");
          this.dataEditImg.oSrc = $($event.target).next("img").attr("imgstyle");
          this.dataEditImg.oW = $($event.target).parent(".drapBox").width();
          this.dataEditImg.oH = $($event.target).parent(".drapBox").height();
          //点击时候获取coustName 从hashMap里面得到他有没第一次编辑的东西
          var constName = this.getCoustNameTaiLi($($event.target))

          this.dataEditImg.oActions = this.$store.state.editData.ImgHashMap.getvalue(constName).actions;
          console.log(this.dataEditImg)
          //从vuex缓存里面拿到我的数据
          //        console.log()
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
        $(".comtent_chanpin .pubilc_div .time_pu .page").each(function (i, el) {
          if (i == 0) {
            $(el).text("");
            $(el).append("<span></span>");
            $(el).append("<span></span>");
            $(el).find("span:nth-child(2)").text("封面");
          } else {
            $(el).find("span:nth-child(2)").text(i);
          }
        })
        $(".time_main_left .time_bg:last-of-type").find(".pubilc_div:nth-child(2) .time_pu >img").addClass("lastPage_taili")
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
        const TYPESTYLECOUNT = {
          1: 1,
          2: 1,
          3: 2,
          4: 1,
          5: 1,
          6: 2,
          7: 4,
          8: 4,
          9: 1
        }
        let typeStyle = []
        $('.time_main_left_ht .pubilc_div > .time_pu .bbsClass').each((i, el) => {
          typeStyle.push($(el).find('.img_drap:eq(0)').attr('typestyle'))
        })
        this.previewData = []
        let _self = this
        typeStyle.forEach((type) => {
          type = type - 0;
          let pageInfo = {
            title: '标题一二三',
            type: type,
            imgs: []
          }
          _self.previewData.push(pageInfo)
          if (type === 9) {
            _self.previewData.push(Object.assign(pageInfo, {}))
          }
        })
        this.PreviewWork.baseHashMap.keys().forEach(function (key) {
          let img = _self.PreviewWork.baseHashMap.getvalue(key)
          _self.previewData[img.page - 1].imgs.push({
            id: img.picDbId,
            index: img.num - 0,
            src: img.base64Img ? img.base64Img : img.thumbnailImageUrl
          })
        })
        this.previewData.forEach((obj) => {
          let imgList = {}
          obj.imgs.forEach((obj) => {
            imgList[obj.index] = obj
          })
          for (let i = 1; i <= TYPESTYLECOUNT[obj.type]; i++) {
            if (!imgList[i]) {
              imgList[i] = {
                isNull: true,
                id: new Date().getTime(),
                index: i,
                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWO4dOnSfwAIZgN2UcgHsgAAAABJRU5ErkJggg=='
              }
            }
          }
          let imgs = []
          for (let key in imgList) {
            imgs.push(imgList[key])
          }
          obj.imgs = imgs
        })
//        this.colorName = JSON.parse(sessionStorage.getItem("bbsSlsectDate")).colorName;
//        console.log(this.previewData)
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
      this.bbsTemplate_data = bbsData_template;
      this.setBbsTemplate();
      //默认设置背景
      this.setTailiBg()
    },
    mounted() {
      //默认的值
      sessionStorage.setItem('tailiType', '横');

      var vm = this;
      // 调用vuex里面的拖拽方法，初始化的时候
      this.setPageIndex()
      this.jisuan() // 计算页面位置
      //设置台历书皮书的操作
//      let colorName = JSON.parse(sessionStorage.getItem("bbsSlsectDate")).colorName;
      //设置背景
      //setBookBg(colorName, $(".titlePage_bg .page_fm"), $(".firstPage .page_bg"), $(".lastPage .page_bg"))
      //设置台历的背景图

      setTimeout(function () {
        $("#div_drap").Tdrag({
          handle: ".titleBox"
        });
      }, 500)
    }
  }
</script>

<style>

</style>
