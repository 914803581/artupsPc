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
        <ul class="list" :class="{cross:format,vertical:!format}" ref="pageList">
          <li class="item" v-for="page in data">
            <div class="page-img front" :style="{backgroundImage:`url(${page.front})`}"></div>
            <div class="page-img back" :style="{backgroundImage:`url(${page.back})`}"></div>
          </li>
        </ul>
        <button @click="upward"><i class="iconfont icon-shangfan"></i>上翻</button>
        <button @click="down"><i class="iconfont icon-xiafan"></i>下翻</button>
        <button @click="revolution"><i class="iconfont icon-xuanzhuan"></i>旋转</button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-undef */

  const VERTICAL_CROSS = 0
  const FORMAT_CROSS = 1
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
        format: VERTICAL_CROSS,
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
        let list = this.$refs.pageList
        this.revolutionState = this.revolutionState ? 0 : 1
        list.style.transform = 'rotateZ(' + (this.revolutionState ? '180' : '0') + 'deg)'
      }
    },
    watch: {
      pageNum: function (val) {
        let _self = this
        let top = (val === 1) ? 0 : 300
        setTimeout(function () {
          _self.$refs.pageList.style.paddingTop = `${top}px`
        }, 500)
      },
      visible: function (val) {
        this.previewDialogVisible = val
        if (sessionStorage.tailiType === '横') {
          this.format = FORMAT_CROSS
        } else {
          this.format = VERTICAL_CROSS
        }
      }
    },
    created: function () {
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  .preview {
    user-select: none;
    .el-dialog--small {
      top: 50% !important;
      width: 500px;
      margin-top: -326px;
      overflow: hidden;
    }
    .main {
      perspective: 1000px;
      text-align: center;
    }

    .list {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 0 auto 20px;
      transform-style: preserve-3d;
      transition: 800ms ease-in;
    }
    .list.vertical {
      width: 260px;
      .item {
        width: 260px;
      }
    }
    .list.cross {
      width: 360px;
      .item {
        width: 360px;
      }
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
      border: 1px solid #3a3a3a;
    }

    .page-img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      &.front {
        z-index: 100;
      }
      &.back {
        transform: rotateY(180deg);
      }
    }

    button {
      cursor: pointer;
      user-select: none;
      border: 0;
      padding: 0 1.2em;
      background: transparent;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      outline: none;
      .iconfont {
        display: block;
        font-size: 20px;
      }
    }

  }
</style>
