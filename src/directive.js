// directive 自定义指令的js
import Vue from 'vue'

let $ = window.jQuery
// 注册一个全局自定义指令 v-DomHeight 这个指令是操作index的swipe快DOM的高度
let DomHeight = Vue.directive('DomHeight', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) { // 拿到dom动态算出高度
    // $("#bbsEdit").css("height",$(window).height()+'px');
    // console.log($(window).height()-$("#handers").height()-$(".title").height()-40-$(el).height())
    // var oH = $(window).height()- $(el).height()-$("#handers").height()-$(".title").height()-40;
    // $("#bbsEdit .time_main_left").css("height",oH+'px');
    // $("#bbsEdit .fonter_box_img > ul")
  }
})

// 让元素可以拖拽到元素框，正确的回显的指令
let DomDrap = Vue.directive('DomDrap', {
  inserted: function (el) {
    // 被拖动的元素
    let oDrapDiv = $('.fonter_box_img > ul >li >img')
    // 拖动到哪里去
    let oDrap = document.querySelectorAll('.time_main_left .time_bg  .drapBox')
    let i = 0
    for (; i < oDrapDiv.length; i++) {
      oDrapDiv[i].index = i
      // console.log(oDrapDiv[i].src)
      oDrapDiv[i].ondragstart = function (ev) {
        // ev.preventDefault();
        ev = ev || window.event
        // 这里指定setDate的index=i
        ev.dataTransfer.setData('name', this.index)
        ev.dataTransfer.setData('oSrc', this.src)
        this.style.background = 'green'
      }
    }
    i = 0
    for (; i < oDrap.length; i++) {
      oDrap[i].ondragover = function (ev) {
        // enter和leave之间连续触发
        // 要想触发drop事件，就 必须在dragover当中阻止默认事件
        // document.title = i++;
        ev.preventDefault()
      }
      // 拖动结束
      oDrap[i].ondrop = function (ev) {
        ev.preventDefault()
        ev.stopPropagation()// 预防ff图片拖出打开
        // console.log(ev.dataTransfer.getData('name'))
        // console.log(ev.dataTransfer.getData('oSrc'))
        $(ev.target).find('>img').attr('src', ev.dataTransfer.getData('oSrc'))
        // 计算位置
        // console.log(dragThumb)
        // setTimeout(function () {
        //   dragThumb($(ev.target).find('>img'), $(ev.target))
        // }, 100)
      }
    }
  }
})
export {DomHeight, DomDrap}
