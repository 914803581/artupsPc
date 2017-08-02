import Vue from 'vue'
import VueRouter from 'vue-router'
// import noFound from '@/components/404'
// 宝宝书
import bbsMsg from '@/components/bbs/bbsMsg'
import bbsEdit from '@/components/bbs/bbsEdit'
import index from '@/components/component/index/index' // 首页
import testStore from '@/components/store' // 测试vuex
import WorksList from '@/views/center/WorksListView'
import DraftList from '@/views/center/DraftListView'
import MaterialList from '@/views/center/MaterialListView'
import AccountManager from '@/views/center/AccountManagerView'
import AccountSecurity from '@/views/center/AccountSecurityView'
import AddressManager from '@/views/center/AddressManagerView'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
    { // 宝宝书介绍和尺寸选择
      path: '/bbsMsg',
      name: 'bbsMsg',
      component: bbsMsg,
      meta: {
        title: '宝宝书介绍'
      }
    },
    { // 宝宝书编辑页面
      path: '/bbsEdit',
      name: 'bbsEdit',
      component: bbsEdit,
      meta: {
        title: '宝宝书编辑'
      }
    },
    { // vuex的具体使用路由暂时备份
      path: '/testStore',
      name: 'testStore',
      component: testStore
    },
    // {
    //   path: '*',
    //   // 可以直接到404自己定义的组件
    //   // component: noFound
    //   // 路由重定向的姿势 redirect ,可以写一个已经存在的路由
    //   redirect: '/bbsEdit'
    // },
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: index
    }, {
      path: '/center/works',
      name: 'WorksList',
      component: WorksList,
      meta: {
        title: '我的作品'
      }
    }, {
      path: '/center/draft',
      name: 'DraftList',
      component: DraftList,
      meta: {
        title: '草稿箱'
      }
    }, {
      path: '/center/material',
      name: 'MaterialList',
      component: MaterialList,
      meta: {
        title: '我的素材'
      }
    }, {
      path: '/center/account',
      name: 'AccountManager',
      component: AccountManager,
      meta: {
        title: '账户资料'
      }
    }, {
      path: '/center/security',
      name: 'AccountSecurity',
      component: AccountSecurity,
      meta: {
        title: '账户安全'
      }
    }, {
      path: '/center/address',
      name: 'AddressManager',
      component: AddressManager,
      meta: {
        title: '收货地址管理'
      }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log('开始路由')
//   next()
// })

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
})

export default router

