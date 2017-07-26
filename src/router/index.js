import Vue from 'vue'

//引入路由
import vueRouter from "vue-router"

import noFound from '@/components/404'
//宝宝书
import bbsMsg from '@/components/bbs/bbsMsg'
import bbsEdit from '@/components/bbs/bbsEdit'

//测试vuex
import testStore from '@/components/store'
//注入路由
Vue.use(vueRouter)
let router =  new vueRouter({	
	mode:'history',
	routes: [
		{ //宝宝书介绍和尺寸选择
	      path: '/bbsMsg',
	      name: 'bbsMsg',
	      component: bbsMsg
	    },
		{ //宝宝书编辑页面
	      path: '/bbsEdit',
	      name: 'bbsEdit',
	      component: bbsEdit
	    },
	    { //vuex的具体使用路由暂时备份
	      path: '/testStore',
	      name: 'testStore',
	      component: testStore
	    },
	    {   
	     	path:'*',
	     	//可以直接到404自己定义的组件
//	    		component: noFound
	    		//路由重定向的姿势 redirect ,可以写一个已经存在的路由
	    		redirect:'/bbsEdit'	    		
	    }
	    
	  ]
})
//router.beforeEach((to,from,next)=>{
//	console.log('开始路由')
//	next();
//})
//router.afterEach((to,from,next)=>{
//	console.log('进入路由,可以用此方法来写每个导航的title')
//	if (to.meta.title) {
//		window.document.title = to.meta.title
//	}
//})
//暴露出路由对象
export default  router

