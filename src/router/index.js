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
import OrderList from '@/views/center/OrderListView'
import CouponList from '@/views/center/CouponListView'
import UserWorks from '@/views/user/WorksListView'
import UserMaterial from '@/views/user/MaterialListView'
import UserCoupons from '@/views/user/CouponListView'
import cart from '@/components/user/cart/cart'//购物车
import confimOrder from '@/components/user/order/confimOrder'//确认订单
import loginCallback from '@/components/user/loginCallback'//登陆跳转
import payOrder from '@/components/user/pay/payOrder'//支付页面
import payCancel from '@/components/user/pay/payCancel'//取消支付
import payOk from '@/components/user/pay/payOk'//取消支付
import framedEdit from '@/components/framed/framedEdit'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  routes: [
    { // 宝宝书介绍和尺寸选择
      path: '/album/imgEditMsg',
      name: 'imgEditMsg',
      component: bbsMsg,
      meta: {
        title: '宝宝书介绍'
      }
    },
    { // 宝宝书编辑页面
      path: '/album/imgEdit',
      name: 'imgEdit',
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
      beforeEnter: function () {
        location.href = '/welcome.html'
      }
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
    }, {
      path: '/center/order',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '订单管理'
      }
    }, {
      path: '/center/coupons',
      name: 'CouponList',
      component: CouponList,
      meta: {
        title: '优惠券管理'
      }
    }, {
      path: '/user/works',
      name: 'UserWorks',
      component: UserWorks,
      meta: {
        title: '我的作品'
      }
    }, {
      path: '/user/material',
      name: 'UserMaterial',
      component: UserMaterial,
      meta: {
        title: '我的素材'
      }
    }, {
      path: '/user/coupons',
      name: 'UserCoupons',
      component: UserCoupons,
      meta: {
        title: '我的优惠券'
      }
    }, {
      path: '/user/cart',
      name: 'cart',
      component: cart,
      meta: {
        title: '购物车'
      }
    }, {
      path: '/order/confim',
      name: 'confimOrder',
      component: confimOrder,
      meta: {
        title: '确认订单'
      }
    }, {
      path: '/user/loginCallback',
      name: 'loginCallback',
      component: loginCallback,
      meta: {
        title: '登陆'
      }
    }, {
      path: '/pay/payOrder',
      name: 'payOrder',
      component: payOrder,
      meta: {
        title: '支付'
      }
    }, {
      path: '/pay/payOk',
      name: 'payOk',
      component: payOk,
      meta: {
        title: '支付成功'
      }
    }, {
      path: '/framed/framedEdit',
      name: 'framedEdit',
      component: framedEdit,
      meta: {
        title: '框画编辑'
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

