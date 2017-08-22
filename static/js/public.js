//HashMap取值
function HashMap () {
    /**
    * map大小
    */
    var size = 0;
    /**
    * 对象
    */
    var entry = new Object();//存放信息
    
            /**
     * @description 往hashmap中添加键值对
     * @param key 键 页码
     * @param value 值 
     */
    this.putvalue=function(key,value){
        if(!this.containsKey(key)){//没有包含时map大小+1
            size++;
        }
        entry[key]=value;//赋值
    }
    /**
     * @description 从hashmap中根据键获取值
     * @param key 键 页码
     * @return value|null
     */
    this.getvalue=function (key){
        return this.containsKey(key)?entry[key]:null;
    }
    /**
     * @description 判断是否包含key
     * @param key 键
     * @return true|false
     */
    this.containsKey=function (key){
        if(!(key in entry)){
            return false;
        }else{
            return true;
        }
        //return (null==(key in entry))?false:true;
    }
    /**
     * @description 从map中移除键值
     * @param key 键
     */
    this.remove=function (key){
        if(this.containsKey(key) && (delete entry[key])){
            size--;
        }
    }
    /**
     * @description 是否包含value
     * @param value 值
     */
    this.containsValue=function (value){
        for(var temp in entry){
            if(entry[temp]==value){
                return true;
            }
        }
        return false;
    }
    /**
     * @description 返回所有值
     * 
     */
    this.values=function (){
        var values = new Array();
        for(var temp in entry){
            values.push(entry[temp]);
        }
        return values;
    }
    /**
     * @description 返回所有键
     */
    this.keys=function (){
        var keys=new Array();
        for(var temp in entry){
            keys.push(temp);
        }
        return keys;
    }
    /**
     * @description 返回map大小
     */
    this.size=function (){
        return size;
    }
    /**
     * @description 清除map
     */
    this.removeAll=function (){
        size=0;
        entry=new Object();
    }
}
/*计算图片的缩放*/
function dragThumb(cs_src, cs_divdom) { //cs_src图片的节点,框型（固定div）的节点

	 imgWidth = parseFloat(cs_src.width());//原图宽
	 imgHeight = parseFloat(cs_src.height());//原图高
	 boxWidth = parseFloat(cs_divdom.width());//框宽
	 boxHeight = parseFloat(cs_divdom.height());//框高
	//原图和框的比例（宽）
	var oProportionWidth = boxWidth/imgWidth;
	//原图和框的比例（高）
	var oProportionHeight =boxHeight/imgHeight;
	//alert(boxWidth)
	//得到换算的最终比例mul
	var mul;
	if (oProportionWidth>oProportionHeight) {
		 mul= oProportionWidth;
	}else{
		 mul = oProportionHeight;
	}
//	console.log('比例:__',mul)
	//得到原图变小的比例大小
	imgWidth = imgWidth * mul;
		imgHeight = imgHeight * mul;
	//图片宽<盒子宽
	if (imgWidth < boxWidth) {
		imgWidth = boxWidth
	}else if(imgHeight< boxHeight){//图片高 > 盒子高
		imgHeight= boxHeight
	}
	//位移的距离盒子-图片缩小比例/2
	var dx = (boxWidth-imgWidth)/2;
	var dy = (boxHeight-imgHeight)/2;	
	//渲染定位
	cs_src.css({
		width:imgWidth+'px',
		height:imgHeight+'px',
		left:dx+'px',
		top:dy+'px'
	})
	cs_src.attr("min_scale",mul);
} 

/*校验文本框输入是否有表情*/
function isEmojiCharacter(substring) {  
    for ( var i = 0; i < substring.length; i++) {  
        var hs = substring.charCodeAt(i);  
        if (0xd800 <= hs && hs <= 0xdbff) {  
            if (substring.length > 1) {  
                var ls = substring.charCodeAt(i + 1);  
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
                if (0x1d000 <= uc && uc <= 0x1f77f) {  
                    return true;  
                }  
            }  
        } else if (substring.length > 1) {  
            var ls = substring.charCodeAt(i + 1);  
            if (ls == 0x20e3) {  
                return true;  
            }  
        } else {  
            if (0x2100 <= hs && hs <= 0x27ff) {  
                return true;  
            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
                return true;  
            } else if (0x2934 <= hs && hs <= 0x2935) {  
                return true;  
            } else if (0x3297 <= hs && hs <= 0x3299) {  
                return true;  
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
                    || hs == 0x2b50) {  
                return true;  
            }  
        }  
    }  
}

//pc宝宝书模版
/*定义宝宝书八个板式模板*/
var bbsTemplateData={
	bbs1:'<div class="time_pu"><div class="bbsClass drapBox template01"><div class="drap_img"></div><img imgSort="1" typeStyle="1" class="img_drap" src=""/></div><p textSort="1" typeStyle="1" class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs2:'<div class="time_pu"><div class="bbsClass drapBox template02"><div class="drap_img"></div><img  class="img_drap" imgSort="1" typeStyle="2" src=""/></div><p textSort="1" typeStyle="2" class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs3:'<div class="time_pu"><div class="bbsClass template03"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="3" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="3" src=""/></div></div><p textSort="1" typeStyle="3" class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs4:'<div class="time_pu"><div class="drapBox bbsClass template04"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="4" src=""/></div><p textSort="1" typeStyle="4" class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs5:'<div class="time_pu"><div class="bbsClass drapBox template05"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="5" src=""/></div><p textSort="1" typeStyle="5"  class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs6:'<div class="time_pu"><div class="bbsClass template06"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="6" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="6" src=""/></div></div><p textSort="1" typeStyle="6" class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs7:'<div class="time_pu"><div class="bbsClass template07"><div class="drapBox div_page"><div class="drap_img"></div><img imgsort="1" typestyle="7" src="" class="img_drap"></div> <div class="drapBox div_page"><div class="drap_img"></div><img imgsort="2" typestyle="7" src="" class="img_drap"></div> <div class="drapBox div_page"><div class="drap_img"></div><img imgsort="3" typestyle="7" src="" class="img_drap"></div> <div class="drapBox div_page"><div class="drap_img"></div><img imgsort="4" typestyle="7" src="" class="img_drap"></div></div> <p textsort="1" typestyle="7" class="text title_pu"></p> <div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs8:'<div class="time_pu"><div class="bbsClass template08"><div class="drapBox div_page"><div class="drap_img"></div><img imgsort="1" typestyle="8" src="" class="img_drap"></div> <div class="drapBox div_page"><div class="drap_img"></div><img imgsort="2" typestyle="8" src="" class="img_drap"></div> <div class="drapBox div_page"><div class="drap_img"></div><img imgsort="3" typestyle="8" src="" class="img_drap"></div> <div class="drapBox div_page"><div class="drap_img"></div><img imgsort="4" typestyle="8" src="" class="img_drap"></div></div> <p textsort="1" typestyle="8" class="text title_pu"></p> <div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs9:'<div class="time_pu"><div class="bbsClass bbs_hengban"><div class="drapBox div_page"><div class="drap_img"></div> <img imgsort="1" typestyle="9" src="" class="img_drap"></div></div> <p textsort="1" typestyle="8" class="hengbanText  title_pu text"></p> <div class="page"><div class="pageleft">第<span page=""></span>页</div> <div class="pageleft">第<span page=""></span>页</div></div></div>',
//	bbs10:'<div class="time_pu"><div class="bbsClass hcTemplatetext01"><div class="mainTitle title_pu" typestyle="1" textsort="1" ></div><div class="subtitle title_pu" typestyle="1" textsort="2"></div><div class="box_text"><div class="text_left title_pu" typestyle="1" textsort="3"></div><div class="text_right title_pu" typestyle="1" textsort="4"></div></div><div class="page"><div class="pageleft">第<span page=""></span>页</div><div class="pageRight"></div></div></div></div>',
//	bbs11:'<div class="time_pu"><div class="bbsClass hcTemplatetext02"><div class="mainTitle title_pu" typestyle="2" textsort="1" ></div><div class="subtitle title_pu" typestyle="2" textsort="2"></div><div class="box_text title_pu" typestyle="2" textsort="3" ></div><div class="page"><div class="pageleft">第<span page=""></span>页</div><div class="pageRight"></div></div></div></div>',
//	bbs12:'<div class="time_pu"><div class="bbsClass hcTemplatetext03"><div class="mainTitle title_pu" typestyle="3" textsort="1" ></div><div class="box_text title_pu" typestyle="3" textsort="2" ></div><div class="page"><div class="pageleft">第<span page=""></span>页</div><div class="pageRight"></div></div></div></div>'	
	//lomo卡的模版
	lomo1:'<div class="time_pu lomoTemplate"><div class="bbsClass bbs_hengban"><div class="drapBox div_page"><div class="drap_img drap_img_lomo"></div> <img imgsort="1" typestyle="1" src="" class="img_drap"></div></div>  <div class="page"><div class="pageRight pageLomo">&nbsp;</div> <div class="pageRight">6寸照片</div></div></div>',
	lomo2:'<div class="time_pu lomoTemplate"><div class="drapBox bbsClass template04"><div class="drap_img drap_img_lomo"></div><img class="img_drap" imgSort="1" typeStyle="2" src=""/></div><div  class="page"><div class="pageRight pageLomo">&nbsp;</div><div class="pageRight">LOMO卡</div></div></div>'	
};

/*定义画册八个板式模板*/
var hcTemplate225_355={//hcTemplate225_355
	bbs1:'<div class="time_pu"><div class="bbsClass drapBox template01"><div class="drap_img"></div><img imgSort="1" typeStyle="1" class="img_drap" src=""/></div><p textSort="1" typeStyle="1" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs2:'<div class="time_pu"><div class="bbsClass drapBox template02"><div class="drap_img"></div><img  class="img_drap" imgSort="1" typeStyle="2" src=""/></div><p textSort="1" typeStyle="2" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs3:'<div class="time_pu"><div class="bbsClass template03"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="3" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="3" src=""/></div></div><p textSort="1" typeStyle="3" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs4:'<div class="time_pu hcTemplate225_355"><div class="drapBox bbsClass template225_320"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="4" src=""/></div><p textSort="1" typeStyle="4" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs5:'<div class="time_pu hcTemplate225_355"><div class="bbsClass template225_157"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="5" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="5" src=""/></div></div><p textSort="1" typeStyle="5" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs6:'<div class="time_pu hcTemplate225_355"><div class="bbsClass drapBox template255_255"><div class="drap_img"></div><img imgSort="1" typeStyle="6" class="img_drap" src=""/></div><p textSort="1" typeStyle="6" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs7:'<div class="time_pu hcTemplate225_355"><div class="bbsClass drapBox template255_150"><div class="drap_img"></div><img imgSort="1" typeStyle="7" class="img_drap" src=""/></div><p textSort="1" typeStyle="7" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs8:'<div class="time_pu hcTemplate225_355"><div class="bbsClass template480_320 "><div class="drapBox div_page"><div class="drap_img"></div> <img imgsort="1" typestyle="8" src="" class="img_drap"></div></div> <p textsort="1" typestyle="8" class="hengbanText  text"></p> <div class="page"><div class="pageleft">第<span page=""></span>页</div> <div class="pageleft">第<span page=""></span>页</div></div></div>'
	
};
/*定义画册八个板式模板*/
var hcTemplate355_225={//hcTemplate355_225
	bbs1:'<div class="time_pu"><div class="bbsClass drapBox template01"><div class="drap_img"></div><img imgSort="1" typeStyle="1" class="img_drap" src=""/></div><p textSort="1" typeStyle="1" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs2:'<div class="time_pu"><div class="bbsClass drapBox template02"><div class="drap_img"></div><img  class="img_drap" imgSort="1" typeStyle="2" src=""/></div><p textSort="1" typeStyle="2" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs3:'<div class="time_pu"><div class="bbsClass template03"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="3" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="3" src=""/></div></div><p textSort="1" typeStyle="3" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs4:'<div class="time_pu hcTemplate355_225"><div class="drapBox bbsClass template325_220"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="4" src=""/></div><p textSort="1" typeStyle="4" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs5:'<div class="time_pu hcTemplate355_225"><div class="drapBox bbsClass template220_220"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="5" src=""/></div><p textSort="1" typeStyle="5" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs6:'<div class="time_pu hcTemplate355_225"><div class="bbsClass drapBox template255_255"><div class="drap_img"></div><img imgSort="1" typeStyle="6" class="img_drap" src=""/></div><p textSort="1" typeStyle="6" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs7:'<div class="time_pu hcTemplate355_225"><div class="bbsClass drapBox template255_150"><div class="drap_img"></div><img imgSort="1" typeStyle="7" class="img_drap" src=""/></div><p textSort="1" typeStyle="7" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs8:'',
	bbs9:'<div class="time_pu hcTemplate355_225"><div class="bbsClass template680_220"><div class="drapBox div_page"><div class="drap_img"></div> <img imgsort="1" typestyle="8" src="" class="img_drap"></div></div> <p textsort="1" typestyle="8" class="hengbanText  text"></p> <div class="page"><div class="pageleft">第<span page=""></span>页</div> <div class="pageleft">第<span page=""></span>页</div></div></div>'
	
};
/*定义画册八个板式模板*/
var hcTemplate360_510={//hcTemplate360_510
	bbs1:'<div class="time_pu"><div class="bbsClass drapBox template01"><div class="drap_img"></div><img imgSort="1" typeStyle="1" class="img_drap" src=""/></div><p textSort="1" typeStyle="1" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs2:'<div class="time_pu"><div class="bbsClass drapBox template02"><div class="drap_img"></div><img  class="img_drap" imgSort="1" typeStyle="2" src=""/></div><p textSort="1" typeStyle="2" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs3:'<div class="time_pu"><div class="bbsClass template03"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="3" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="3" src=""/></div></div><p textSort="1" typeStyle="3" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs4:'<div class="time_pu hcTemplate360_510"><div class="drapBox bbsClass template330_475"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="4" src=""/></div><p textSort="1" typeStyle="4" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs5:'<div class="time_pu hcTemplate360_510"><div class="bbsClass template330_235"><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="5" src=""/></div><div class="drapBox div_page"><div class="drap_img"></div><img class="img_drap" imgSort="2" typeStyle="5" src=""/></div></div><p textSort="1" typeStyle="5" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs6:'<div class="time_pu hcTemplate360_510"><div class="bbsClass drapBox template330_330"><div class="drap_img"></div><img imgSort="1" typeStyle="6" class="img_drap" src=""/></div><p textSort="1" typeStyle="6" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs7:'<div class="time_pu hcTemplate360_510"><div class="bbsClass drapBox template330_320"><div class="drap_img"></div><img imgSort="1" typeStyle="7" class="img_drap" src=""/></div><p textSort="1" typeStyle="7" class="text"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
	bbs8:'',
	bbs9:'<div class="time_pu hcTemplate360_510"><div class="bbsClass template690_475 "><div class="drapBox div_page"><div class="drap_img"></div> <img imgsort="1" typestyle="8" src="" class="img_drap"></div></div> <p textsort="1" typestyle="8" class="hengbanText  text"></p> <div class="page"><div class="pageleft">第<span page=""></span>页</div> <div class="pageleft">第<span page=""></span>页</div></div></div>'	
};


//var lomoTemplateData={
//	bbs1:'<div class="time_pu"><div class="bbsClass drapBox template05"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="5" src=""/></div><p textSort="1" typeStyle="5"  class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',
//	bbs2:'<div class="time_pu"><div class="drapBox bbsClass template04"><div class="drap_img"></div><img class="img_drap" imgSort="1" typeStyle="4" src=""/></div><p textSort="1" typeStyle="4" class="text title_pu"></p><div  class="page"><div class="pageleft">第<span></span>页</div><div class="pageRight"></div></div></div>',	
//}
//lomo卡模版的数组
var lomoData_template=[
	[
		{
			"template":bbsTemplateData.lomo1,
			"only":true
		}
	],
	[
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		},
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		}
	],
	[
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		},
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		}
	],
	[
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		},
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		}
	],
	[
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		},
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		}
	],
	[
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		},
		{
			"template":bbsTemplateData.lomo2,
			"only":false
		}
	]
//	bbsTemplateData.lomo1,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2,
//	bbsTemplateData.lomo2
]

//定义模版的数组
var bbsData_template=[
	[
		{
			"template":bbsTemplateData.bbs1,
			"only":false,
			"firstPage":true,//第一页必须有的属性
			"lastPage":false   
		}
	],
	[
		{
			"template":bbsTemplateData.bbs2,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		},
		{
			"template":bbsTemplateData.bbs3,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		}
	],
	[
		{
			"template":bbsTemplateData.bbs4,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		},
		{
			"template":bbsTemplateData.bbs5,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		}
	],
	[
		{
			"template":bbsTemplateData.bbs6,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		},
		{
			"template":bbsTemplateData.bbs7,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		}
	],
	[
		{
			"template":bbsTemplateData.bbs8,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		},
		{
			"template":bbsTemplateData.bbs8,
			"only":false,
			"firstPage":false,
			"lastPage":false 
		}
	],
	[
		{
			"template":bbsTemplateData.bbs9,
			"only":true,
			"firstPage":false,
			"lastPage":false 
		}
	],
	[
		{
			"template":bbsTemplateData.bbs2,
			"only":false,
			"firstPage":false,
			"lastPage":true  //最后一页必须有的属性
		}
	]
	
]

//原生在dom里面随意拖拽的函数
function drapDom(dragdiv){
	console.log(dragdiv)
//	var dragdiv = document.querySelector('#dragdiv');
    var x, y;  //记录到点击时鼠标到移动框左边和上边的距离
    dragdiv.addEventListener('dragstart', function (e) {
        e.dataTransfer.effectAllowed = "move";  //移动效果
        e.dataTransfer.setData("text", '');  //附加数据，　没有这一项，firefox中无法移动
        x = e.offsetX || e.layerX;
        y = e.offsetY || e.layerY;
        return true;
    }, false);

    document.addEventListener('dragover', function (e) {//取消冒泡 ,不取消则不能触发 drop事件
        e.preventDefault()|| e.stopPropagation();
    }, false);

    document.addEventListener('drop', function (e) {
        dragdiv.style.left = (e.pageX - x) + 'px';
        dragdiv.style.top = (e.pageY - y) + 'px';
        e.preventDefault() || e.stopPropagation();  //不取消，firefox中会触发网页跳转到查找setData中的内容
    }, false);
}

function pubulic_rm_bg(){//统一删除背景的函数
	$(".titlePage_bg .page_fm").removeClass("bbs_bg_orange bbs_bg_blue bbs_bg_red bbs_bg_green");
	$(".firstPage .page_bg").removeClass("bbs_bg_orange_fd bbs_bg_blue_fd bbs_bg_red_fd bbs_bg_green_fd");
	$(".lastPage .page_bg").removeClass("bbs_bg_orange_fm bbs_bg_blue_fm bbs_bg_red_fm bbs_bg_green_fm");
}
//给扉页加背景
function setBookBg(name){

	switch (name){
		case "活力橙":
	console.log(name)
		
			pubulic_rm_bg();
			$(".titlePage_bg .page_fm").addClass("bbs_bg_orange");
			$(".firstPage .page_bg").addClass("bbs_bg_orange_fd");
			$(".lastPage .page_bg").addClass("bbs_bg_orange_fm")
			break;
		case "智慧蓝":
	console.log(name)
		
			pubulic_rm_bg();
			$(".titlePage_bg .page_fm").addClass("bbs_bg_blue");
			$(".firstPage .page_bg").addClass("bbs_bg_blue_fm");
			$(".lastPage .page_bg").addClass("bbs_bg_blue_fd")
			break;
		case "欢乐红":
			pubulic_rm_bg();
			$(".titlePage_bg .page_fm").addClass("bbs_bg_red");
			$(".firstPage .page_bg").addClass("bbs_bg_red_fm");
			$(".lastPage .page_bg").addClass("bbs_bg_red_fd")
			break;
		case "健康绿":
			pubulic_rm_bg();
			$(".titlePage_bg .page_fm").addClass("bbs_bg_green");
			$(".firstPage .page_bg").addClass("bbs_bg_green_fm");
			$(".lastPage .page_bg").addClass("bbs_bg_green_fd")
			break;
			
		default:
			break;
	}
	
}
