import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)

import Api from '../api.js'
//定义一个容器
let store = new Vuex.Store({
	state:{
		count:100,
		bbs:{
			materialModel:false, //
			material:[], //素材库的数据
			footerData:[],//底部的缓存数据可以供拖拽到图片框
			textData:'', //文本框文字				
		},
		editData:{ //保存给后端缓存的大对象= 图片的hash lomo的hash
			ImgHashMap:new HashMap(), //图片
			lomoHashMap:new HashMap(), //lomo卡
			textHashMap:new HashMap(), //保存的文字	
			base64HashMap:new HashMap(),   //预览宝宝书需要的base数据
			baseLomoHashMap:new HashMap()  //lomo卡需要的base数据
		}
	},
	getters:{ //获取数据做逻辑上的判断
		filterCount(state){
			return state.count >=120 ? 120:state.count
		},
		GetFooterDataAuto(state){//获取页脚选中需要自动回填的图片数组
			var arr=[];//选中的临时变量
			state.bbs.footerData.forEach(val=>{
				if(val.slectFooter){
					arr.push(val)	 				
				}			
			})
			return arr
		},
		GetPreviewWork(state){ //预览产品最终需要的数据
			let preview = {};
			preview.baseHashMap = state.editData.base64HashMap;
			preview.lomoHashMap = state.editData.baseLomoHashMap;
			preview.textHashMap = state.editData.textHashMap;
			return preview;
		}
	},
	mutations:{ //改变数据的方法集合-->记住 这个方法只能处理同步的异步的是actions函数
		previewWork_lomo(state,obj){
			//存入base64给预览产品
	        state.editData.baseLomoHashMap.putvalue(obj.constName,obj.picObj);
	        console.log(state.editData.baseLomoHashMap.getvalue(obj.constName))
		},
		previewWork(state,obj){//处理预览产品的数据函数
			//存入base64给预览产品
	        state.editData.base64HashMap.putvalue(obj.constName,obj.picObj);
	        console.log(state.editData.base64HashMap.getvalue(obj.constName))
		},
		getMaterials(state,obj){ //素材库付值 obj是传递过来的数据
			//给素材库付值增加一个判断标记
			obj.results.forEach(val=>{
				val.isTrue = false 
			})
			state.bbs.material = obj.results;
			$(".el-loading-mask").remove();
		},
		slectFile(state,obj){//素材库里面，选中图片所形成的数组缓存
			obj.forEach(val=>{//变量返回的data
				val.isTrue = "true"				
				val.slectFooter = "true";//默认的值全部选中
				state.bbs.footerData.unshift(val)				
			})
		},
		delectFooterData(state){//清空底部数据
			state.bbs.footerData=[];
		},
		editFooterStatus(state,obj){//修改页脚底部的状态
			var jsonArr = state.bbs.footerData[obj]
			jsonArr.slectFooter = !jsonArr.slectFooter;
			state.bbs.footerData.splice(obj, 1, jsonArr);
		},
		getTextBox(state,obj){//获取文本框的内容函数
			state.bbs.textData = obj
		},
		setTextHashMap(state,obj){ //组装hashMap文本数据的方法
			console.log(obj)	
			var constName = obj.page+"_"+obj.textsort;
			var picObj = {"constName":constName, "page" : obj.page, "editCnfIndex" : obj.typeStyle, "num" : obj.textsort,"content":obj.txt,
            "editCnfName" : "","isOnly":false};
            //存入图片ImgHashMap
          	state.editData.textHashMap.putvalue(constName,picObj);         	                
		},
		autoPushData(state,obj){
			var edidData = $(".editAutoDrap");
			var oPage = edidData.parents(".pubilc_div").find(".page .pageleft span").attr("page");//第几页
			var oTypeStyle = edidData.attr("typestyle");//板式
			var oimgSort= edidData.attr("imgsort");//图片的顺序
	
			//如果是lomo卡
			if(edidData.parents(".lomoTemplate").size()>0){
				oPage = edidData.parents(".lomoTemplate").find(".page .pageLomo").text()
			}
			
			var constName = oPage+"_"+oimgSort;
			 	var picObj = {"constName":constName,"picDbId" : edidData.attr("dbId"), "page" : oPage, "editCnfIndex" : oTypeStyle, "num" : oimgSort, "actions" : {},
                "thumbnailImageUrl":edidData.attr("src"), "previewThumbnailImageUrl" :"", "crop" : "false","editCnfName" : "","isOnly":false};
		    //如果是横版的修改标识符
		    if(edidData.parents(".hengban_bbs").size()>0){
		    		picObj.isOnly = true;
		    }
		    
		  	//如果是lomo卡
			if(edidData.parents(".lomoTemplate").size()>0){
				//存入lomoHashMap
	        		state.editData.lomoHashMap.putvalue(constName,picObj);
	        		console.log(state.editData.lomoHashMap.getvalue(constName))
				return;	        		
			}			
		    //存入图片ImgHashMap
	        state.editData.ImgHashMap.putvalue(constName,picObj);
	        //存入base64给预览产品
	        state.editData.base64HashMap.putvalue(constName,picObj);
	        //存入base64Lomo给预览产品
	        state.editData.baseLomoHashMap.putvalue(constName,picObj);
	        
	        console.log(state.editData.ImgHashMap.getvalue(constName))
		},
		autoDrapData(state,obj){//自动填充后端的处理图片的方法
			var arrIndex = [];
			state.bbs.footerData.forEach((val,i)=>{				
				if(val.slectFooter){
					arrIndex.unshift(i)
				}
			})
			arrIndex.forEach(index=>{
				state.bbs.footerData.splice(index, 1);
			})
			//组装数据放入
			

			
			 

//          
			
			
			
			
		},
		setDrapData(state,obj){//两页换横版的时候清空vue里面相邻所有的数据
			console.log(obj)
			var oPage = obj.opage;
			if(obj.type=="奇数"){
				state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_1');
            		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_2');
            		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_3');
            		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_4');
				state.editData.textHashMap.remove((parseInt(oPage)+1)+'_1');
            		state.editData.textHashMap.remove((parseInt(oPage)+1)+'_2');
            		state.editData.textHashMap.remove((parseInt(oPage)+1)+'_3');
            		state.editData.textHashMap.remove((parseInt(oPage)+1)+'_4');				
            		state.editData.textHashMap.remove((parseInt(oPage)+1)+'_5');	
            		
            		//删除base64的
            		state.editData.base64HashMap.remove((parseInt(oPage)+1)+'_1');
            		state.editData.base64HashMap.remove((parseInt(oPage)+1)+'_2');
            		state.editData.base64HashMap.remove((parseInt(oPage)+1)+'_3');
            		state.editData.base64HashMap.remove((parseInt(oPage)+1)+'_4');
            		
            		//删除base64_lomo的
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)+1)+'_1');
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)+1)+'_2');
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)+1)+'_3');
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)+1)+'_4');
            		
			}else{
				state.editData.ImgHashMap.remove((parseInt(oPage)-1)+'_1');
            		state.editData.ImgHashMap.remove((parseInt(oPage)-1)+'_2');
            		state.editData.ImgHashMap.remove((parseInt(oPage)-1)+'_3');
            		state.editData.ImgHashMap.remove((parseInt(oPage)-1)+'_4');
				state.editData.textHashMap.remove((parseInt(oPage)-1)+'_1');
            		state.editData.textHashMap.remove((parseInt(oPage)-1)+'_2');
            		state.editData.textHashMap.remove((parseInt(oPage)-1)+'_3');
            		state.editData.textHashMap.remove((parseInt(oPage)-1)+'_4');
            		state.editData.textHashMap.remove((parseInt(oPage)-1)+'_5');
            		
            		//删除base64的
            		state.editData.base64HashMap.remove((parseInt(oPage)-1)+'_1');
            		state.editData.base64HashMap.remove((parseInt(oPage)-1)+'_2');
            		state.editData.base64HashMap.remove((parseInt(oPage)-1)+'_3');
            		state.editData.base64HashMap.remove((parseInt(oPage)-1)+'_4');
            		
            		//删除base64 lomo的
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)-1)+'_1');
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)-1)+'_2');
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)-1)+'_3');
            		state.editData.baseLomoHashMap.remove((parseInt(oPage)-1)+'_4');
            		
            		
            		
            		
			}
			state.editData.ImgHashMap.remove((parseInt(oPage))+'_1');
        		state.editData.ImgHashMap.remove((parseInt(oPage))+'_2');
        		state.editData.ImgHashMap.remove((parseInt(oPage))+'_3');
        		state.editData.ImgHashMap.remove((parseInt(oPage))+'_4');
        		state.editData.ImgHashMap.remove((parseInt(oPage))+'_5');
			state.editData.textHashMap.remove((parseInt(oPage))+'_1');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_2');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_3');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_4');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_5');
        		
        		//删除base64
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_1');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_2');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_3');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_4');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_5');
        		
        		//删除baselomo64
        		state.editData.baseLomoHashMap.remove((parseInt(oPage))+'_1');
        		state.editData.baseLomoHashMap.remove((parseInt(oPage))+'_2');
        		state.editData.baseLomoHashMap.remove((parseInt(oPage))+'_3');
        		state.editData.baseLomoHashMap.remove((parseInt(oPage))+'_4');
        		state.editData.baseLomoHashMap.remove((parseInt(oPage))+'_5');
        		
        		
		},
		oneToOneSetDrapData(state,obj){ //单页切换板式删除的操作

			var oPage = obj.opage;
			state.editData.ImgHashMap.remove((parseInt(oPage))+'_1');			
			state.editData.ImgHashMap.remove((parseInt(oPage))+'_2');			
			state.editData.ImgHashMap.remove((parseInt(oPage))+'_3');			
			state.editData.ImgHashMap.remove((parseInt(oPage))+'_4');
			state.editData.textHashMap.remove((parseInt(oPage))+'_1');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_2');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_3');
        		state.editData.textHashMap.remove((parseInt(oPage))+'_4');
        		       		
        		//删除base64
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_1');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_2');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_3');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_4');
        		state.editData.base64HashMap.remove((parseInt(oPage))+'_5');
		},
		drapDiv(state,obj){//拖动元素的方法
				//被拖动的元素
				var  oDrapDiv = $(".fonter_box_img > ul >li >img");
				//拖动到哪里去
				var  oDrap = document.querySelectorAll(".time_main_left .time_bg  .drapBox .drap_img");
				
				for (var i = 0; i < oDrapDiv.length; i++) {
					oDrapDiv[i].index = i;
		//			console.log(oDrapDiv[i].src)
					oDrapDiv[i].ondragstart = function(ev){
		//				ev.preventDefault();	
						var ev = ev || window.event;		
						//这里指定setDate的index=i
						ev.dataTransfer.setData('Index',this.index);

//						this.style.background = 'green';
						
					}
				}
				
				for (var i = 0; i < oDrap.length; i++) {
					oDrap[i].ondragover = function(ev){
						//enter和leave之间连续触发
						//要想触发drop事件，就 必须在dragover当中阻止默认事件
						//document.title = i++;		
						ev.preventDefault();	
					};
					//拖动结束
					oDrap[i].ondrop = function(ev){
						ev.preventDefault();	
						ev.stopPropagation();//预防ff图片拖出打开		
						//根据传递过来的角标拿到底部的缓存数据
						var oIndex = ev.dataTransfer.getData('Index');
						var dataImg = state.bbs.footerData[oIndex]; //每一个对象
						//回显图片和删除底部缓存
						console.log(ev.target)
//						if($(ev.target).find(">img").attr("src")){
//							console.log('有图')
//						}
						$(ev.target).next("img").attr("src",dataImg.thumbnailUrl).attr('imgStyle',dataImg.thumbnailUrl);
						state.bbs.footerData.splice(oIndex, 1);
						console.log(dataImg)
						var oPage = $(ev.target).parents(".pubilc_div").find(".page .pageleft span").attr("page");//第几页
						var oTypeStyle = $(ev.target).next(".img_drap").attr("typestyle");//板式
						var oimgSort= $(ev.target).next(".img_drap").attr("imgsort");//图片的顺序
						if(obj=="单图"){
							oPage = 1;
							oTypeStyle = 1;
							oimgSort = 1;
						}
//						console.log('页数'+oPage)
//						console.log('板式'+oTypeStyle)
//						console.log('图片的顺序'+oimgSort)
						//如果是lomo卡
						if($(ev.target).parents(".lomoTemplate").size()>0){
							oPage = $(ev.target).parents(".lomoTemplate").find(".page .pageLomo").text()
						}
						 var constName = oPage+"_"+oimgSort;
						 console.log(constName)
						 
						 var picObj = {"constName":constName,"picDbId" : dataImg.dbId, "page" : oPage, "editCnfIndex" : oTypeStyle, "num" : oimgSort, "actions" : {},
                            "thumbnailImageUrl":dataImg.thumbnailUrl, "previewThumbnailImageUrl" :"", "crop" : "false","editCnfName" : "","isOnly":false};
                        
		                if($(ev.target).parents(".pubilc_div").hasClass("hengban_bbs")){//如果拖动的图片结束是横版
		                		picObj.isOnly = true;
		                		//拖动是横版的情况删除他后面的所有图片
		                		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_1');
		                		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_2');
		                		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_3');
		                		state.editData.ImgHashMap.remove((parseInt(oPage)+1)+'_4');
		                }
		                
		                
		                //如果是lomo卡
						if($(ev.target).parents(".lomoTemplate").size()>0){
							//存入lomoHashMap
				        		state.editData.lomoHashMap.putvalue(constName,picObj);
				        		console.log(state.editData.lomoHashMap.getvalue(constName))
				        		//计算位置
							setTimeout(function(){
								$(ev.target).next("img").attr("style","")
								dragThumb($(ev.target).next("img"),$(ev.target))
							},100)
							return;	        		
						}		                
                        //存入图片ImgHashMap
                        state.editData.ImgHashMap.putvalue(constName,picObj);
                        console.log(state.editData.ImgHashMap.getvalue(constName)) 
						//存入base64给预览产品
	       			    state.editData.base64HashMap.putvalue(constName,picObj);
						//计算位置
						setTimeout(function(){
							$(ev.target).next("img").attr("style","")
							dragThumb($(ev.target).next("img"),$(ev.target))
						},100)
					}
				}
		 	}
	},
	actions:{ //actions是vuex 处理异步的函数,所有的异步操作都是在这里面处理的，但是他仅仅只是处理异步处理完毕之后也是需要像mutations commit方法让mutations去改变状态的
		//也可以用es6 解构负值来简写这里
//		addAction({commit,dispatch}){
//			setTimeout(()=>{//异步
//				//这里只管提交放改变状态的方法
//				commit("addIncrement",{n:6})
//				//这里访问同级的方法只需要,可以传递参数
//				dispatch("textAction",{text:'测试传递的参数字符串'})
//			},2000)
//		},
//		textAction(context,obj){
//			console.log('我的触发了test')			
//			console.log('我接收到的上级参数...'+obj.text)			
//		},
		getMaterial({commit,dispatch}){//素材库的数据
				var paramJson ={
					ignore:"true",
		            format:"json",
		            userDbId:"2221214",
		            status:1,
		            pageNum:0,
		            pageSize:50,
		            sort:"uploadDt",
		            order:"desc",
		            category: ""
		        } 
		        //素材库图片
		        Api.Material.MaterialData(paramJson).then((res)=>{
		        		console.log('加载完毕')
		        		commit("getMaterials",res.data)
		        })
		},
//		CutMobile({commit,dispatch}){ //裁剪
//			commit("getMaterials",'1')
//		}
		
	}
})
//导出 stroe
export default store
