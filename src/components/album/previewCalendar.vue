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
        <ul class="list" ref="pageList">
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
        <button @click="upward">上翻</button>
        <button @click="down">下翻</button>
        <button @click="revolution">旋转</button>
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
      }
    },
    data: function () {
      return {
        pageNum: 1,
        revolutionState: 0,
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
        var items = this.$refs.pageList.getElementsByClassName('item')
        if (this.pageNum > items.length) {
          return
        }
        var last = items[items.length - this.pageNum]
        last.style.transform = 'rotateX(' + (180 - this.pageNum) + 'deg)'
        this.pageNum++
        setTimeout(function () {
          last.getElementsByClassName('back')[0].style.zIndex = '200'
        }, 1000)
      },
      down: function () {
        let _self = this
        if (this.pageNum <= 1) {
          return
        }
        this.pageNum--
        var items = this.$refs.pageList.getElementsByClassName('item')
        var last = items[items.length - this.pageNum]
        last.style.transform = 'rotateX(0deg)'
        setTimeout(function () {
          last.getElementsByClassName('back')[0].style.zIndex = '1'
        }, 1000)
        if (this.pageNum === 1 && this.revolutionState) {
          setTimeout(function () {
            _self.$refs.pageList.style.transform = 'rotateZ(0deg)'
          }, 1020)
        }
      },
      revolution: function () {
        if (this.pageNum === 1 && !this.revolutionState) {
          return
        }
        var list = this.$refs.pageList
        this.revolutionState = this.revolutionState ? 0 : 1
        list.style.transform = 'rotateZ(' + (this.revolutionState ? '180' : '0') + 'deg)'
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
      width: 500px;
      margin-top: -326px;
    }
    .main {
      perspective: 1000px;
      text-align: center;
    }

    .list {
      position: relative;
      padding-top: 300px;
      width: 300px;
      height: 300px;
      margin: 0 auto 20px;
      transform-style: preserve-3d;
      transition: 800ms ease-in;
    }

    .item {
      position: absolute;
      bottom: 0;
      width: 300px;
      height: 300px;
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
      width: 300px;
      height: 300px;
      &.front {
        z-index: 100;
      }
    }

    button {
      font-size: 20px;
    }

  }
</style>
