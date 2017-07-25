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
			footerData:[]//底部的缓存数据可以供拖拽到图片框
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
			//可供拖拽的数组图片
//			state.bbs.footerData.push(arrImg);
//			console.log(state.bbs.footerData)
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
