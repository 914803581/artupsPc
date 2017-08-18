<template>
  <div class="preview">
    <el-dialog :title="title" :size="size" :visible.sync="previewDialogVisible" @close="close" @open="open"
               :close-on-click-modal="false">
      <div class="preview_comtent" ref="previewComtent">
        <div class="hard book-name">{{title}}[封面]</div>
        <div class="hard"></div>
        <div class="preview_page" :class="'style_type_'+item.type" v-for="item in data">
          <img :key="img.id" :src="img.src" :class="['page_style_'+item.type,'img_style_'+item.type+'_'+img.index]"
               v-for="img in item.imgs">
          <label class="title">{{item.title}}</label>
        </div>
        <div class="hard"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-undef */

  export default {
    props: {
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
      }
    },
    watch: {
      visible: function (val) {
        this.previewDialogVisible = val
      }
    },
    created: function () {
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  .preview {
    .el-dialog--small {
      width: 940px;
    }
    .preview_comtent {
      width: 900px;
      height: 550px;
      overflow: hidden;
      border-radius: 4px;
      .hard {
        background: #ccc !important;
        color: #333;
        box-shadow: inset 0 0 5px #666;
        font-weight: bold;
      }
      .book-name {
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
          bottom: 4px;
          display: block;
          width: 100%;
          font-size: 16px;
          font-weight: 400;
          text-align: center;
        }
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
          height: 496px;
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
    }
  }
</style>
