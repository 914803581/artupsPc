<template>
  <div class="preview">
    <el-dialog :title="title"
               :size="size"
               :visible.sync="previewDialogVisible"
               @close="close"
               @open="open"
               :close-on-click-modal="false"
    >
      <div class="main">
        <ul class="list">
          <li class="item">
            <img src="http://wx3.sinaimg.cn/mw690/c5131475ly1fj22y6b46nj20m80b4mx0.jpg" class="page-img front">
            <img src="http://wx1.sinaimg.cn/mw690/6f86dff2gy1finrexen6qg205k05jb2c.gif" class="page-img back">
          </li>
          <li class="item">
            <img src="http://wx1.sinaimg.cn/mw690/6f86dff2gy1finrexen6qg205k05jb2c.gif" class="page-img front">
            <img src="http://wx1.sinaimg.cn/mw690/648f6403gy1fj1wrixepaj20qo0zkds0.jpg" class="page-img back">
          </li>
          <li class="item">
            <img src="http://wx2.sinaimg.cn/mw690/9b7d8157gy1fj2qfzsoqjj20h70chgnf.jpg" class="page-img front">
            <img src="http://wx3.sinaimg.cn/mw690/006yiDbvgy1fj1wtkl9klj30u01hc17e.jpg" class="page-img back">
          </li>
          <li class="item">
            <img src="http://wx2.sinaimg.cn/mw690/9b7d8157gy1fj2qfz67urj20j60bsac9.jpg" class="page-img front">
            <img src="http://wx3.sinaimg.cn/mw690/006yiDbvgy1fj1wu2vr5bj30qh0yqn9q.jpg" class="page-img back">
          </li>
          <li class="item">
            <img src="http://wx2.sinaimg.cn/mw690/9b7d8157gy1fj2qfxow4bj20hr0k7tca.jpg" class="page-img front">
            <img src="http://wx2.sinaimg.cn/mw690/cc4db942ly1fj2poodxquj20sg1dcqd1.jpg" class="page-img back">
          </li>
          <li class="item">
            <img src="http://wx1.sinaimg.cn/mw690/9b7d8157gy1fj2qfwh8ucj20j60ivq6y.jpg" class="page-img front">
            <img src="http://wx3.sinaimg.cn/mw690/9b7d8157gy1fj2r20zudhj20c8096dg1.jpg" class="page-img back">
          </li>
        </ul>
        <button id="upward">向上</button>
        <button id="down">向下</button>
        <button id="revolution">转</button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-undef */

  export default {
    props: {
      colorName: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '预览台历'
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
        } else {
        }
      },
      upward: function () {

      },
      down: function () {

      },
      revolution: function () {

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
      top: 50% !important;
      width: 940px;
      margin-top: -326px;
    }
    .main {
      perspective: 1000px;
      height: 800px;
    }

    .list {
      position: relative;
      padding-top: 400px;
      width: 400px;
      height: 400px;
      margin: 0 auto;
      transform-style: preserve-3d;
      transition: 800ms ease-in;
    }

    .item {
      position: absolute;
      bottom: 0;
      width: 400px;
      height: 400px;
      transform-style: preserve-3d;
      transform-origin: top;
      transform: rotateX(0deg);
      transition: 1.5s ease-in;
    }

    .page-img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 400px;
      height: 400px;
      &.front {
        z-index: 100;
      }
    }

    button {
      font-size: 20px;
    }

  }
</style>
