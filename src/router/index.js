import Vue from 'vue'

//引入路由
import vueRouter from "vue-router"

import noFound from '@/components/404'
//宝宝书
import bbsMsg from '@/components/bbs/bbsMsg'

import bbsEdit from '@/components/bbs/bbsEdit'

//首页
import index from '@/components/component/index/index'

//user
import user from '@/components/component/user/user'
//user/work
import work from '@/components/component/user/work/work'
//user/work/drafts
import drafts from '@/components/component/user/work/drafts'
//user/work/material
import material from '@/components/component/user/work/material'


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
	      meta:{
	      	title:"宝宝书介绍"
	      },
	      component: bbsMsg
	    },
		{ //宝宝书编辑页面
	      path: '/bbsEdit',
	      name: 'bbsEdit',
	      meta:{
	      	title:"宝宝书编辑"
	      },
	      component: bbsEdit
	    },
	    { //vuex的具体使用路由暂时备份
	      path: '/testStore',
	      name: 'testStore',
	      component: testStore
	    },
//	    {   
//	     	path:'*',
//	     	//可以直接到404自己定义的组件
////	    		component: noFound
//	    		//路由重定向的姿势 redirect ,可以写一个已经存在的路由
//	    		redirect:'/bbsEdit'	    		
//	    },
	    {
	    	   path:'/index',
	    	   name:'index',
	    	   meta:{
	    	   	   title:'首页'
	    	   },
	    	   component:index
	    },
	    //商铺详情页
        {
            path: '/user',
            name:'user',
            component: user,
            children: [{
                path: '/work', //work
                name:'work',
                meta:{
			    	   	   title:'我的作品'
			    	   },
                component: work,
            },{
            		path: '/drafts', //work
                name:'drafts',
                meta:{
			    	   	   title:'草稿箱'
			    	   },
                component: drafts,
            },{
            		path: '/material', //work
                name:'material',
                meta:{
			    	   	   title:'素材库'
			    	   },
                component: material,
            }]
        },
	    
	  ]
})
//router.beforeEach((to,from,next)=>{
//	console.log('开始路由')
//	next();
//})
router.afterEach((to,from,next)=>{
	if (to.meta.title) {
		window.document.title = to.meta.title
	}
})
//暴露出路由对象
export default  router

