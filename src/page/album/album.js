import 'cube.css/src/scss/neat.scss'
import 'static/font/iconfont.css'
import 'element-ui/lib/theme-default/index.css'
import './album.scss'
import '@/base/scss/common.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import SelectTpl from '../script/index.js'
import Header from '@/components/header/header.vue'
import Footer from '@/components/footer/footer.vue'
import $ from 'jquery'
import Api from '@/api.js'
import Utils from '../../components/component/util'
import mixins from '@/mixins'
import filter from '../../filter.js'

Vue.mixin(mixins)
Vue.use(ElementUI)

var selTpl = new SelectTpl()
Vue.use(Utils)  // 工具函数
//eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    picturePrefix: '//test.artup.com/img/',
    shufflingList: ['index_03.jpg', 'index_04.jpg', 'index_05.jpg', 'index_06.jpg', 'index_07.jpg'],
    frameShowBool: true, //true不选择框画尺寸是显示的dome   -false时候显示选择尺寸dome
    frameSize: {}, //框画的尺寸
    nowSize: '', //当前框的尺寸
    nowPage: '', //当前页数
    nowColor: '', //当前color
    nowColorName: '',
    nowShowBackgroundColor: '', //当前展示框的背景色
    skuCode: '', //用来取价钱的sku
    price: '', //框画的价钱
    previewImageUrl: '', //框形预览图
    frameType: '', //框形
    framePage: '', //页数
    frameColor: '', //颜色
    editImageUrl: '', //编辑框背景图
    skuId: '', //当前产品的skuId
    templateCode: ''
  },
  components: {
    'unify-header': Header,
    'unify-footer': Footer
  },
  methods: {
    /*点击更新画册颜色
     * index: 点击对象的索引
     */
    updateColorFn(index) {
      if (this.frameShowBool === true) {
        this.frameShowBool = false //选择尺寸  显示带尺寸的dome
        //this.updataTypeFn(0);//当不选择框形的时候默认选择第一个框形
        this.updatePageFn(1)
        this.updateSizeFn(0)
      }
      $('.kuangAngle').removeClass('typeActive')
      $('.kuangAngle').eq(index).addClass('typeActive')
      this.nowShowBackgroundColor = $('.kuangAngle').eq(index).attr('color')
      this.nowColor = $('.kuangAngle').eq(index).attr('code')
      this.nowColorName = $('.kuangAngle').eq(index).attr('colorName')
      this.updataSkuData()
    },
    /*点击更新画册的页数
     * index: 点击对象的索引
     */
    updatePageFn(index) {
      if (this.frameShowBool === true) {
        this.frameShowBool = false //选择尺寸  显示带尺寸的dome
        //this.updataTypeFn(0);//当不选择框形的时候默认选择第一个框形
        this.updateSizeFn(0)
        this.updateColorFn(0)
      }
      $('.k1_FootPage_click').removeClass('typeActive')
      $('.k1_FootPage_click').eq(index).addClass('typeActive')
      this.nowPage = $('.k1_FootPage_click').eq(index).attr('page')
      this.updataSkuData()
    },
    /*点击更新框画尺寸
       * index: 点击对象的索引
       */
    updateSizeFn(index) {
      if (this.frameShowBool === true) {
        this.frameShowBool = false //选择尺寸  显示带尺寸的dome
        this.updatePageFn(1)
        this.updateColorFn(0)
        //this.updataTypeFn(0);//当不选择框形的时候默认选择第一个框形
      }
      if (index === 3) {
        $('.k1_FootPage_click').eq(0).show()
        $('.k1_FootPage_click').eq(1).hide()
        $('.k1_FootPage_click').removeClass('typeActive')
        $('.k1_FootPage_click').eq(0).addClass('typeActive')
        this.nowPage = $('.k1_FootPage_click').eq(0).attr('page')
      } else {
        $('.k1_FootPage_click').eq(1).show()
        $('.k1_FootPage_click').eq(0).hide()
        $('.k1_FootPage_click').removeClass('typeActive')
        $('.k1_FootPage_click').eq(1).addClass('typeActive')
        this.nowPage = $('.k1_FootPage_click').eq(1).attr('page')
      }
      $('.k1_Foot1size_click').removeClass('sizeActive')
      $('.k1_Foot1size_click').eq(index).addClass('sizeActive')
      var showTypeStr = 'box' + $('.k1_Foot1size_click').eq(index).attr('sizetype') //获取尺寸对应框的class
      selTpl.setShowImgSize(showTypeStr, 'picContainerOne')
      this.nowSize = $('.k1_Foot1size_click').eq(index).attr('size')
      this.updataSkuData()
    },
    /*更新sku*/
    updataSkuData() {
      this.skuCode = [this.getFromSession("category"), this.nowSize, this.nowPage, this.nowColor].join('.')
      console.log(this.skuCode)
      let jsons = {
        category: this.getFromSession("category"),
        parameter: this.skuCode
      }
      Api.sku.querySku(jsons).then(res => {
        console.log(res)
        this.previewImageUrl = res.data.previewImageUrl //框形预览图
        this.editImageUrl = res.data.editImageUrl //编辑框背景图
        this.price = res.data.price
        this.skuId = res.data.skuId
        this.templateCode = res.data.templateCode
      })
    },
    /*开始定制*/
    startCustom() {
      if (this.frameShowBool === true) {
        this.$message({
          showClose: true,
          iconClass: "atrup_Message",
          message: '请先选择您需要定制的尺寸和颜色 !',
          type: 'success'
        })
        return
      }
      if (localStorage.getItem("userDbId")) {
        let editCnfName = ''
        if (this.nowSize === '342X342') {
          editCnfName = 'pc_huace_342-342_56_single'
        }
        if (this.nowSize === '342X250') {
          editCnfName = 'pc_huace_342-250_56_single'
        }
        if (this.nowSize === '250X342') {
          editCnfName = 'pc_huace_250-342_56_single'
        }
        if (this.nowSize === '342X500') {
          editCnfName = 'pc_huace_342-500_56_single'
        }
        var jsons = {
          "colorName": this.nowColorName,
          "name": "画册." + this.nowColorName + "." + this.nowSize + '.' + this.nowPage + '页',
          "skuCode": this.skuCode,
          "category": this.getQueryString('category'),
          "price": this.price,
          "skuId": this.skuId,
          "size": this.nowSize,
          "titleName": "画册",
          "tplCode": this.templateCode,
          "editCnfName": editCnfName,
          "eqTitle": "画册." + this.nowSize
        }

        var obj = JSON.parse(sessionStorage.getItem("urlQuery"))
        obj.tplCode = this.templateCode
        sessionStorage.setItem("urlQuery", JSON.stringify(obj))
        sessionStorage.setItem('bbsSlsectDate', JSON.stringify(jsons))
        sessionStorage.setItem('titleName', '画册')

        // location.href =
        //   '/album/albumSelect?size=' + this.nowSize +
        //   "&editImageUrl=" + this.editImageUrl +
        //   "&price=" + this.price +
        //   '&sku=' + this.skuCode +
        //   '&color=' + this.nowColorName +
        //   '&category=' + this.getQueryString('category') +
        //   '&skuId=' + this.skuId +
        //   '&page=' + this.nowPage +
        //   '&templateCode=' + this.templateCode +
        //   '&editCnfName=' + editCnfName
        location.href =
          '/album/huaceEdit'
      } else {
        this.setUrlCallback()
      }
    }
  },
  mounted() {
    var that = this
    //获取url的category值 以字符串的json格式保存到sessionStroage中
    var queryObj = {
      category: this.getQueryString('category'),
      defDbId: this.getQueryString("defDbId")
    }
    sessionStorage.setItem("urlQuery", JSON.stringify(queryObj))
    //获取画册的类型
    Api.sku.queryAttributes({category: this.getFromSession("category")}).then(res => {
      if (res) {
        console.log(res)
        this.frameSize = res.data.attributes[2].attributeValues
        this.frameColor = res.data.attributes[0].attributeValues
        this.framePage = res.data.attributes[1].attributeValues
        //console.log(res.data.templateCode)
        /*默认获取价和展示图片
               * 默认选择第一个
               */
        setTimeout(function () {
          // $(".k1_FootPage_click").eq(0).hide()
          that.nowSize = $('.k1_Foot1size_click').eq(0).attr('size')
          that.nowPage = $('.k1_FootPage_click').eq(0).attr('page')
          that.nowColor = $('.kuangAngle').eq(1).attr('code')
          $('.k1_FootPage_click').eq(0).hide()
          that.updataSkuData()
        })
      }
    }, err => {
      console.log(err)
    })
  },
  created: function () {
    document.body.style.cssText = 'opacity:1;'
  }
})
