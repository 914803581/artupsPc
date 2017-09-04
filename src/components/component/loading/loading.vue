<template>
  <div id="loading">
    <el-dialog :show-close="false" :modal="modalIsShow" :close-on-press-escape="false" :close-on-click-modal="false"
               :visible.sync="dialogTableVisible">
      <div class="div_loading">
        <div class="img_loading">
          <img src="http://image2.artup.com/static/pc/imgs/common/logo_1.jpg" alt="">
        </div>
        <div class="text_loading">
          {{loadingTxt}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modalIsShow:true,
        dialogTableVisible: false,
        loadingTxt: "加载中..."
      }
    },
    props: [
      "showLoading",
      "loadingText",
      "modalShow"
    ],
    methods: {
      openLoading() {
        this.dialogTableVisible = this.showLoading
        this.loadingTxt = this.loadingText
        this.modalIsShow = this.modalShow
      }
    },
    watch: {
      showLoading: "openLoading"
    },
    mounted() {
      this.dialogTableVisible = this.showLoading
      this.loadingTxt = this.loadingText
      console.log(this.modalShow)
      this.modalIsShow = this.modalShow
    }
  }
</script>

<style lang="less">
  #loading {
    .el-dialog__wrapper{

    }
    position: relative;
    z-index: 9999;
    .div_loading {
      width: 450px;
      height: 150px;
      overflow: hidden;
      color: #333;
      position: relative;
      z-index: 9999;
      box-shadow: #888888 2px 2px 2px;
      .img_loading {
        width: 150px;
        height: 150px;
        position: relative;
        float: left;
        > img {
          position: absolute;
          width: 70px;
          height: 70px;
          top: 0;
          left: 0;
          margin: auto auto;
          right: 0;
          bottom: 0;
        }
      }

      .text_loading {
        width: 300px;
        height: 150px;
        float: right;
        line-height: 150px;
        font-size: 22px;
      }

    }
    .el-dialog {
      transform: translateX(0%)
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog--small {
      position: absolute;
      top: 0 !important;
      left: 0;
      margin: auto auto;
      right: 0;
      bottom: 0;
      height: 150px;
      width: 450px;
    }

  }
</style>
