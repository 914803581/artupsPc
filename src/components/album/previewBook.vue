<template>
  <div class="preview">
    <el-dialog :title="title" :size="size" :visible.sync="previewDialogVisible" @close="close" @open="open"
               :close-on-click-modal="false">
      <div class="preview_comtent" ref="previewComtent">
        <div class="hard" ref="frontCover"></div>
        <div class="hard even" ref="coverPage"></div>
        <div class="preview_page"
             :class="[
               getProductsClass(),
               'style_type_'+item.type,
               {
                 'odd': index % 2 && item.type !== 9,
                 'even': !(index%2) && item.type !== 9,
                 't9_left': index%2 && item.type === 9,
                 't9_right': !(index%2) && item.type === 9
               }
               ]" v-for="(item,index) in data">
          <img :key="img.id"
               :src="img.src"
               :class="['page_style_'+item.type,'img_style_'+item.type+'_'+img.index]"
               v-for="img in item.imgs">
          <span :key="t.index"
                :class="['page_style_'+item.type,'text_style_'+item.type+'_'+t.index]"
                v-for="t in item.text">{{t.text}}</span>
          <label v-if="item.type !== 9 || (item.type === 9 && index%2)" class="title">{{item.title}}</label>
          <span class="page_num" :class="!((index+1)%2) ? 'left' : 'right'">第{{index + 1}}页</span>
        </div>
        <div class="hard even"></div>
        <div class="hard" ref="lastPage"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-undef */
  const PRODUCTS_TIME = '小时光'
  const PRODUCTS_ALBUM = '画册'
  export default {
    props: {
      colorName: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '预览画册'
      },
      visible: {
        type: Boolean,
        default: false
      },
      interval: {
        type: Number,
        default: 4000
      },
      data: {
        type: Array,
        default: []
      },
      size: {
        type: String,
        default: 'small'
      },
      pageNum: {
        type: Number,
        default: 1
      }
    },
    data: function () {
      return {
        products: '',
        isTurn: false,
        previewDialogVisible: this.visible
      }
    },
    methods: {
      close: function () {
        this.$emit('close', false)
      },
      open: function () {
        if (!this.isTurn) {
          this.isTurn = true
          this.$nextTick(function () {
            setBookBg(this.colorName, $(this.$refs.frontCover), $(this.$refs.coverPage), $(this.$refs.lastPage))
            $(this.$refs.previewComtent).turn({
              page: 2,
              width: 900,
              autoCenter: true,
              gradients: true,
              acceleration: true
            })
          })
        } else {
          $(this.$refs.previewComtent).turn('page', 2)
        }
      },
      getProductsClass: function () {
        if (this.products === PRODUCTS_TIME) {
          return 'products-type-time'
        }
        if (this.products === PRODUCTS_ALBUM) {
          return 'products-type-album'
        }
      }
    },
    watch: {
      visible: function (val) {
        this.previewDialogVisible = val
      }
    },
    created: function () {
      this.products = sessionStorage.titleName
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  .preview {
    .el-dialog--small {
      top: 50% !important;
      width: 940px;
      margin-top: -326px;
    }
    .preview_comtent {
      width: 900px;
      height: 550px;
      overflow: hidden;
      border-radius: 4px;
      .hard {
        background: #f1f1f1;
        color: #333;
        box-shadow: inset 0 0 5px #666;
        font-weight: bold;
        line-height: 550px;
        text-align: center;
      }
      .odd {
        background-image: linear-gradient(right, #FFF 95%, #C4C4C4 100%);
        box-shadow: inset 0 0 5px #666;
      }
      .even {
        background-image: linear-gradient(left, #fff 95%, #dadada 100%);
        box-shadow: inset 0 0 5px #666;
      }

      .style_type_9 {
        box-shadow: 0 0 0 0 #666;
        &.t9_left {
          box-shadow: 3px -3px 5px -3px #666 inset;
          .img_style_9_1 {
            width: 200%;
            height: 500px;
          }
        }
        &.t9_right {
          box-shadow: -3px -3px 5px -3px #666 inset;
          .img_style_9_1 {
            position: absolute;
            left: -100%;
            width: 200%;
            height: 500px;
          }
        }
        &:focus {
          outline: 0 !important;
        }
      }

      .preview_page {
        position: relative;
        float: left;
        width: 450px;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 0;
        text-align: center;
        background: #fff;
        user-select: none;
        &:nth-child(even) {
          border: 0;
        }
        .title {
          position: absolute;
          bottom: 14px;
          display: block;
          width: 100%;
          font-size: 16px;
          font-weight: 400;
          text-align: center;
        }
        .page_num {
          position: absolute;
          bottom: 4px;
          font-size: 12px;
          &.left {
            left: 4px;
          }
          &.right {
            right: 4px;
          }
        }

      }
      .products-type-time {
        .page_style_1 {
          position: relative;
          top: 50%;
          left: 50%;
          display: block;
          width: 360px;
          height: 360px;
          margin: -180px 0 0 -180px;
        }
        .page_style_2 {
          position: relative;
          top: 50%;
          left: 50%;
          display: block;
          width: 360px;
          height: 466px;
          margin: -233px 0 0 -180px;
        }
        .page_style_3 {
          display: block;
          width: 360px;
          height: 230px;
          margin: 20px auto;
        }
        .page_style_4 {
          position: relative;
          top: 50%;
          left: 50%;
          display: block;
          width: 360px;
          height: 470px;
          margin: -248px 0 0 -180px;
        }
        .page_style_5 {
          position: relative;
          top: 50%;
          left: 50%;
          display: block;
          width: 360px;
          height: 330px;
          margin: -165px 0 0 -180px;
        }
        .page_style_6 {
          display: inline-block;
          width: 180px;
          height: 360px;
          margin: 80px 20px 0 0;
          &.img_style_6_2 {
            margin-right: 0;
          }
        }
        .page_style_7, .page_style_8 {
          display: inline-block;
          width: 180px;
          height: 180px;
          margin: 20px 20px 0 0;
          &.img_style_7_1, &.img_style_7_2 {
            margin-top: 60px;
          }
          &.img_style_7_2, &.img_style_7_4, &.img_style_8_2, &.img_style_8_4 {
            margin-right: 0;
          }
        }
        .page_style_8 {
          height: 220px;
          &.img_style_8_1, &.img_style_8_2 {
            margin-top: 30px;
          }
        }
      }
      .products-type-album {
        .page_style_1 {
          font-size: 0;
          &.text_style_1_1, &.text_style_1_2 {
            display: block;
            width: 88%;
            margin: 20px 0 0 6%;
            height: 50px;
            font-size: 12px;
            border: 1px solid #eee;
            background: #eee;
            box-shadow: 3px 3px 3px #999;
          }
          &.text_style_1_2 {
            line-height: 30px;
            height: 30px;
          }

          &.text_style_1_3, &.text_style_1_4 {
            display: inline-block;
            margin: 40px 0 0 6%;
            box-sizing: border-box;
            width: 41%;
            height: 350px;
            border: 1px solid #eee;
            background: #eee;
            box-shadow: 3px 3px 3px #999;
          }
          &.text_style_1_3 {
            margin-left: 0;
          }
        }
        .page_style_2 {

        }
        .page_style_3 {

        }
      }

    }
  }
</style>
