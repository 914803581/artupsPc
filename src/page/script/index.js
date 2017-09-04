import $ from 'jquery'

function selectTpl() {
  var domObj = {} //图片对象
  return {
    // 初始化 暂时还用不到
    init: function () {
    },
    /*设置图片展示框的宽高
         * str是根据传过来的class找到对应的div
         * domStr 是要被设置的框（div）
         */
    setShowImgSize: function (str, domStr) {
      if (str) {
        var picBoxWidth = $('.' + str).width()
        var picBoxHeight = $('.' + str).height()
        $('.' + domStr).css({
          'width': picBoxWidth + 'px',
          'height': picBoxHeight + 'px'
        })
        console.log(str)
        console.log(picBoxHeight)
        console.log(picBoxWidth)
        domObj.width = picBoxWidth
        domObj.height = picBoxHeight
        $('.shwoImgBox').removeClass('boxBorderNoe')
        $('.' + str).addClass('boxBorderNoe')
        //console.log(domeSize)
        //callBack(domeSize);
      }
    },
    /*获取编辑框的宽高
         * 返回dome对象
         * width，height
         */
    getEditFrameSize: function () {
      return domObj
    }

  }
}

export default selectTpl
