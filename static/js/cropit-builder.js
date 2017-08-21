function build() {
	//图片数据base64数据
	//var imageData = $('.image-editor').cropit('export');
	//选择图片
	var myImg = document.querySelector(".cropit-preview-image");
	//var matrix = window.getComputedStyle(myImg).transform;
	var matrix = $(myImg).css('transform');
	//框的宽度
	var kuangWidth = $('.cropit-preview-image-container').width();
	var kuangHeight = $('.cropit-preview-image-container').height();
	//var aa = $('.image-editor').cropit('rotates', myImg.action);
	//var angule = document.querySelector(".cropit-preview-image").style.transform;
	var styles = $(".cropit-preview-image").attr("style");
	var arr = matrix.replace(/[^0-9\-\.,]/g, '').split(',');
	var angule; //获取到的transfrom里面的属性
	var anguleArr = styles.split(';');
	for(var i = 0; i < anguleArr.length; i++) {
		if(anguleArr[i].indexOf('transform:') > -1) {
			var transform = anguleArr[i].substring(12);
			if(transform.indexOf('translate') > -1) {
				angule = transform;

			}

		}
	}
	//定义要判断的字符串
	//var str = angule;
	//定义正则表达式对象，\表示转义字符,原点表示任意字符，+表示出现次数至少1次，igm表示忽略大小写，且全局匹配
	pattern = new RegExp("\\((.| )+?\\)", "igm");
	//取出匹配正则表达式的内容
	var newStr = angule.match(pattern);

	//缩放比例
	var scale = Number(newStr[1].replace(/\(/, "").replace(/\)/, ""))
	//旋转角度
	var rotat = Number(newStr[2].replace(/\(/, "").replace(/\)/, "").replace("deg", ""));
	//判断偏移量第一次的没有偏移的时候如果不是number是NaN的时候手动赋值0
	var deviation = newStr[0].replace(/\(/, "").replace(/\)/, "").split(',');

	//X轴方向的偏移量
	var deviationX = Number(deviation[0].replace('px', ''));
	//Y轴偏移量
	var deviationY = Number(deviation[1].replace('px', ''));

	if(isNaN(deviationX)) {
		deviationX = 0;
	}
	if(isNaN(deviationY)) {
		deviationY = 0;
	}
	//alert(kuangWidth/scale*120)
	//原图中的偏移量X
	var nowdeviationX = Number(Math.abs(deviationX) / scale).toFixed(2);
	//原图中的偏移量Y
	var nowdeviationY = Number(Math.abs(deviationY) / scale).toFixed(2);
	//当图片旋转90时

	if(rotat == 90 && nowdeviationX > 0) {
		nowdeviationX = Number(myImg.height - Math.abs(deviationX) / scale).toFixed(2);

	}
	//当图片旋转180时
	if(rotat == 180 && nowdeviationX > 0) {
		nowdeviationX = Number(myImg.width - Math.abs(deviationX) / scale).toFixed(2);

	}
	if(rotat == 180 && nowdeviationY > 0) {
		nowdeviationY = Number(myImg.height - Math.abs(deviationY) / scale).toFixed(2);

	}
	//当图片旋转270时
	if(rotat == 270 && nowdeviationY > 0) {
		nowdeviationY = Number(Math.abs(myImg.width - Math.abs(deviationY) / scale)).toFixed(2);
	}
	//需要截取的宽度
	var nowWidth = Number(kuangWidth / scale).toFixed(2);
	//需要截取的高度度
	var nwHeight = Number(kuangHeight / scale).toFixed(2);
	var cropitData = {};
	cropitData.x = nowdeviationX;
	cropitData.y = nowdeviationY;
	cropitData.width = nowWidth;
	cropitData.height = nwHeight;
	cropitData.rotate = rotat;
	cropitData.scale = scale;
	cropitData.init = "false";

	return cropitData;

}