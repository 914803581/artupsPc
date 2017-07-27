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
			HashMap   :new HashMap(), //图片
			lomHashMap:new HashMap(), //lomo卡
			textHashMap:new HashMap() //保存的文字
			
		}
	},
	getters:{ //获取数据做逻辑上的判断
		filterCount(state){
			return state.count >=120 ? 120:state.count
		},
		footerDataGet(state){
//			return state.bbs.footerData
		}
	},
	mutations:{ //改变数据的方法集合-->记住 这个方法只能处理同步的异步的是actions函数
		getMaterials(state,obj){ //素材库付值 obj是传递过来的数据
			//给素材库付值增加一个判断标记
			obj.results.forEach(val=>{
				val.isTrue = false 
			})
			state.bbs.material = obj.results;
			$(".el-loading-mask").remove();
		},
		slectFile(state){//素材库里面，选中图片所形成的数组缓存
//			var arrImg = [];
			state.bbs.material.forEach(val=>{
				if(val.isTrue){
					state.bbs.footerData.unshift(val)
				}
			})
		},
		getTextBox(state,obj){//获取文本框的内容函数
			state.bbs.textData = obj
		},
		drapDiv(state){//拖动元素的方法
				//被拖动的元素
				var  oDrapDiv = $(".fonter_box_img > ul >li >img");
				//拖动到哪里去
				var  oDrap = document.querySelectorAll(".time_main_left .time_bg  .drapBox");

				for (var i = 0; i < oDrapDiv.length; i++) {
					oDrapDiv[i].index = i;
		//			console.log(oDrapDiv[i].src)
					oDrapDiv[i].ondragstart = function(ev){
		//				ev.preventDefault();	
						var ev = ev || window.event;
		
						//这里指定setDate的index=i
						ev.dataTransfer.setData('Index',this.index);

						this.style.background = 'green';
						
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
						$(ev.target).find(">img").attr("src",dataImg.thumbnailUrl).attr('imgStyle',dataImg.thumbnailUrl);
						state.bbs.footerData.splice(oIndex, 1);
						console.log(dataImg)
						var oPage = $(ev.target).parents(".pubilc_div").find(".page .pageleft span").attr("page");//第几页
						var oTypeStyle = $(ev.target).find(">img").attr("typestyle");//板式
						var oimgSort= $(ev.target).find(">img").attr("imgsort");//图片的顺序
//						console.log(oPage)
//						console.log('页数'+oPage)
//						console.log('板式'+oTypeStyle)
//						console.log('图片的顺序'+oimgSort)
						 var picObj = {"constName":oPage+"_"+oimgSort,"picDbId" : dataImg.dbId, "page" : oPage, "editCnfIndex" : oTypeStyle, "num" : oimgSort, "actions" : {},
                            "thumbnailImageUrl":"", "previewThumbnailImageUrl" :"", "crop" : "false","editCnfName" : ""};
						console.log(picObj)
                            
						//计算位置
						setTimeout(function(){
							dragThumb($(ev.target).find(">img"),$(ev.target))
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
		}
		
	}
})
//导出 stroe
export default store
