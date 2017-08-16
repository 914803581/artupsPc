<template>
  <div class="preview">
    <el-dialog :title="title" :visible.sync="previewDialogVisible">
      <div class="preview_comtent" id="previewComtent">
        <div></div>
        <div class="preview_page" :class="'style_type_'+item.type" v-for="item in data">
          <img :key="img.id" :src="img.src" :class="['page_style_'+item.type,'img_style_'+item.type+'_'+img.index]"
               v-for="img in item.imgs">
          <label class="title">{{item.title}}</label>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'previewBook',
    props: {
      title: {
        type: String,
        default: '预览画册'
      },
      previewDialogVisible: {
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  .preview {
    .preview_comtent {
      width: 900px;
      height: 550px;
      overflow: hidden;
      .preview_page {
        position: relative;
        float: left;
        width: 450px;
        height: 100%;
        overflow: hidden;
        font-size: 0;
        text-align: center;
        background: #fff;
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
