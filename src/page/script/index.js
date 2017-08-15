import $ from 'jquery'
function selectTpl(){
	return {
		init:function(dom,sizeType,size,type,callBack){
			var urls = '';
			if(!sizeType){
				sizeType = 'A';
			}
			var sizeTypeDom = 'box'+sizeType;
			var picBoxWidth = $('.'+sizeTypeDom).width();
			var picBoxHeight = $('.'+sizeTypeDom).height();
			var nowSize = size;
	
				dom.css({
					'width':picBoxWidth+'px',
					'height':picBoxHeight+'px'
				})

			urls = nowSize +'-'+ type;
			callBack(urls)
			
		}
	}
}

export default selectTpl;
