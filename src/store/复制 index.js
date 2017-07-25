import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

console.log(axios)
Vue.use(Vuex)

//定义一个容器
let store = new Vuex.Store({
	state:{
		count:100
	},
	getters:{ //获取数据做逻辑上的判断
		filterCount(state){
			return state.count >=120 ? 120:state.count
		}
	},
	mutations:{ //改变数据的方法集合-->记住 这个方法只能处理同步的异步的是actions函数
		addIncrement(state,obj){//计算器+1
			console.log(obj)
			state.count+=obj.n
		},
		deIncrement(state,obj){//计算器-1
			console.log(obj)
			state.count-=obj.n;
		}
	},
	actions:{ //actions是vuex 处理异步的函数,所有的异步操作都是在这里面处理的，但是他仅仅只是处理异步处理完毕之后也是需要像mutations commit方法让mutations去改变状态的
//		addAction(context){
//			console.log(context)
//			setTimeout(()=>{//异步
//				//这里只管提交放改变状态的方法
//				context.commit("addIncrement",{n:6})
//				//这里访问同级的方法只需要,可以传递参数
//				context.dispatch("textAction",{text:'测试传递的参数字符串'})
//			},2000)
//		},
		//也可以用es6 解构负值来简写这里
		addAction({commit,dispatch}){
			setTimeout(()=>{//异步
				//这里只管提交放改变状态的方法
				commit("addIncrement",{n:6})
				//这里访问同级的方法只需要,可以传递参数
				dispatch("textAction",{text:'测试传递的参数字符串'})
			},2000)
		},
		textAction(context,obj){
			console.log('我的触发了test')			
			console.log('我接收到的上级参数...'+obj.text)
			
		}
		
	}
})
//导出 stroe
export default store
