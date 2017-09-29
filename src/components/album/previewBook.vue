<template>
  <div class="preview">
    <el-dialog :class="`size-${type}-${size}`"
               :title="'预览'+title"
               size="small"
               :visible.sync="previewDialogVisible"
               @close="close"
               @open="open"
               :close-on-click-modal="false">
      <div class="preview_comtent" ref="previewComtent">
        <div class="hard" ref="frontCover" v-if="!hideCover"></div>
        <div class="hard even" ref="coverPage" v-if="!hideCover"></div>
        <div class="preview_page"
             :class="[
               'style_type_'+item.type,
               {
                 'odd': index % 2,
                 'even': !(index%2)
               }
               ]" v-for="(item,index) in data">
          <div :key="img.id"
               :style="{'background-image':`url('${img.src}')`}"
               :class="['main-image','page_style_'+item.type,'img_style_'+item.type+'_'+img.index]"
               v-for="img in item.imgs"></div>
          <span :key="t.index"
                :class="['text_style_'+item.type+'_'+t.index]"
                v-for="t in item.text">{{t.text}}</span>
          <label class="title">{{item.title}}</label>
          <span class="page_num" :class="!((index+1)%2) ? 'left' : 'right'">第{{!hideCover ? index + 1 : index - 1}}页</span>
        </div>
        <div class="hard even" v-if="!hideCover"></div>
        <div class="hard" ref="lastPage" v-if="!hideCover"></div>
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
        default: '170X235'
      },
      type: {
        type: String,
        default: 'huace'
      },
      hideCover: {
        type: Boolean,
        default: false
      },
      startPage: {
        type: Number,
        default: 2
      },
      pageNum: {
        type: Number,
        default: 1
      }
    },
    data: function () {
      return {
        scale: {
          'huace342X342': {
            width: 450 * 2,
            height: 450
          },
          'huace342X250': {
            width: 450 * 2,
            height: 328
          },
          'huace250X342': {
            width: 328 * 2,
            height: 450
          },
          'huace342X500': {
            width: 308 * 2,
            height: 450
          },
          'lvxingji250mmX250mm': {
            width: 450 * 2,
            height: 450
          }
        },
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
        let _self = this
        if (!this.isTurn) {
          this.isTurn = true
          this.$nextTick(function () {
            console.log('ok:', this.colorName)
            setBookBg(this.colorName, $(this.$refs.frontCover), $(this.$refs.coverPage), $(this.$refs.lastPage))
            $(this.$refs.previewComtent).turn({
              page: _self.startPage,
              width: _self.scale[`${_self.type}${_self.size}`].width,
              height: _self.scale[`${_self.type}${_self.size}`].height,
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
      this.products = sessionStorage.titleName
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  @import "./previewBookScss/common.scss";
  @import "./previewBookScss/huace-342X342";
  @import "./previewBookScss/huace-342X250";
  @import "./previewBookScss/huace-250X342";
  @import "./previewBookScss/huace-342X500";
  @import "./previewBookScss/lvxingji-250X250";

  .style_type_100 .title {
    position: absolute;
    left: 8%;
    bottom: 32px;
    display: block;
    width: 256px;
    height: 84px;
    background: url('../../assets/img/title_logo.png') no-repeat 50%;
    background-size: 100% 100%;
  }
</style>
