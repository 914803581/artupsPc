import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$http = axios

// 常量 API 接口地址
const HOST = 'http://image2.artup.com/'

// 图片服务器（静态资源）服务器地址
const STATIC_SERVER_HOST = 'http://image2.artup.com/'

// 图片测试地址
const IMG_TEST = 'http://192.168.82.119:7090/'
let urlQuery = sessionStorage.getItem('urlQuery')

const VueHttp = new Vue()
var HTTP = VueHttp.$http.create({
// baseUrl:'http:www.baidu.com',
// timeout:5000, //请求超时配置
  params: { // 每一个连接都跟手的东西，查询字符串
    book: 123,
    userDbId: '2221214',
  },
  headers: {}// 设置请求头的对象

})

// 用户名全局变量获取
// localStorage.setItem("sessionId","2141731");
// var  userDbIds = localStorage.getItem('userDbId');
// var  sessionIds = "";

/* 图片上传地址 */
const UPLOAD_URL = `${STATIC_SERVER_HOST}artup-build/builder/cors/picture/upload.do?format=json`
/* 查询素材库 */
const QUERY_PICTURE_URL = `${HOST}artup-build/service/picture/page.do?format=json&ignore=true`
/* 未完成作品 */
const QUERY_UNFINISHED_WORK_URL = `${HOST}artup-build/builder/cors/edit/queryOne.do?format=json&ignore=true`
/* 保存作品 */
const SAVE_WORK_URL = `${HOST}artup-build/builder/cors/edit/add/command.do?format=json&ignore=true`
/* 作品列表 */
const QUERY_WORK_LIST_URL = `${HOST}artup-build/builder/cors/edit/queryByPage.do?format=json&ignore=true`
/* 查询sku */
const QUERY_SKU_URL = `${HOST}artup-build/builder/sku.do?format=json&ignore=true`
/* 查询属性对象 */
const QUERY_ATTRIBUTE_URL = `${HOST}artup-build/builder/service/attributes.do?format=json&ignore=true`

/* 添加购物车 */
const ADD_CAR = `${HOST}artup-build/builder/cors/car/add/command.do?format=json&ignore=true`
/* 购物车列表 */
const CAR_LIST = `${HOST}artup-build/builder/cors/car/queryByPage.do?format=json&ignore=true`
/* 收货地址 */
const ADDRESS = `${HOST}artup-build/builder/address/queryByPage.do?format=json&ignore=true`
/* 删除收货地址 */
const DELETE_ADDRESS = `${HOST}artup-build/builder/address/delete/command.do?format=json&ignore=true`
/* 新增收货地址 */
const NEW_ADDRESS = `${HOST}artup-build/builder/address/add/command.do?format=json&ignore=true`
/* 编辑地址  提交 */
const UPDATE_ADDRESS = `${HOST}artup-build/builder/address/update/command.do?format=json&ignore=true`
/* 编辑地址 */
const EDITOR_ADDRESS = `${HOST}artup-build/builder/address/queryById.do?format=json&ignore=true`
/* 创建订单 */
const CREATE_ORDER = `${HOST}artup-build/builder/order/createOrder.do?format=json&ignore=true`
/* 克隆一个新订单 */
const CLONE_ORDER = `${HOST}artup-build/builder/order/cloneOrder.do?format=json&ignore=true`
/* 获取订单 */
const QUERY_ORDER = `${HOST}artup-build/builder/order/queryOrders.do?format=json&ignore=true`
/* 获取订单 */
const DELETE_ORDER = `${HOST}artup-build/builder/order/update/command.do?format=json&ignore=true&status=-2`

/* 查询默认地址 */
const DEFAULT_ADDRESS = `${HOST}artup-build/builder/address/queryAll.do?format=json&ignore=true&status=1&mainAddr=Y`

/* 素材dpi是否合格 */
const MATER_DPI = `${STATIC_SERVER_HOST}artup-build/builder/cors/picture/validate.do?format=json&ignore=true`

/* 订单支付 */
const ORDER_PAY = `${HOST}artup-build/builder/orderPayment/payment.do?format=json&ignore=true`

/* 修改订单状态 */
const UPDATA_ORDER_STATUS = `${HOST}artup-build/builder/order/update/command.do?format=json&ignore=true`

/* 获取订单列表 */
const ORDER_LIST_STATUS = `${HOST}artup-build/builder/order/queryByPage.do?format=json&ignore=true&pageSize=150&sort=createdDt&order=desc`

/* 取消订单 */
const CANCLE_ORDER_STATUS = `${HOST}artup-build/builder/order/update/command.do?format=json&ignore=true&status=-1`

/* 设置默认收货地址 */
const SET_DEFAULT_ADDRESS = `${HOST}/artup-build/builder/address/mainAddress.do?format=json&ignore=true`

/* 重新登录函数 */
const GER_USERDBID = `${HOST}artup-build/builder/service/tokenUrl.do?format=json`

const RELOAD_CACHE = `${HOST}artup-build/builder/service/getFromCache.do?ignore=true&format=json`

/* 首页连接 */
const INDEX_IMG = `${HOST}artup-build/builder/cors/lunbo/list.do?ignore=true&format=json&client=mobile`
// 删除购物车记录
const DELECT_CAR_RECORD = `${HOST}artup-build/builder/cors/car/delete/command.do?format=json&ignore=true`
// 删除作品
const DELECT_WORK = `${HOST}artup-build/builder/cors/edit/delete/command.do?format=json&ignore=true`

/*提交购物车*/
const SUBMIT_CARS = `${HOST}artup-build/builder/cors/car/submitCars.do?format=json&ignore=true`
//购物车物品查询
const QUERY_CAR = `${HOST}artup-build/builder/cors/car/queryAll.do?format=json&ignore=true`

// //只要访问ajax的时候，没有这个用户信息，就跳到首页去登录获取用户信息
// if (!sessionIds) {
// alert('用户信息不存在!');
// location.href='#/'
export default {
  testBaidu: {
    test: (inter) => {
      return VueHttp.$http.get(HOST + inter)
    }
  },
  sku: {
    querySku: (paraJsons) => {
      return VueHttp.$http.get(QUERY_SKU_URL, {params: paraJsons})
    },
    queryAttributes: (paraJsons) => {
      return VueHttp.$http.get(QUERY_ATTRIBUTE_URL, {params: paraJsons})
    }
  },
  car: {// 购物车
    deleteCarCorde: (jsons) => {
      return VueHttp.$http.get(DELECT_CAR_RECORD, {params: jsons})
    },
    /* 添加购物车 */
    addCar: (jsons) => {
      return VueHttp.$http.post(ADD_CAR,
        qs.stringify(jsons)
      )
    },
    queryCar:(jsons)=>{
	   		return HTTP.get(QUERY_CAR,{params:jsons})
	},
    orderPay: (jsons) => {
      return VueHttp.$http.post(ORDER_PAY,
        qs.stringify(jsons)
      )
    },
    carList: (jsons) => { // 购物车列表
      return HTTP.get(CAR_LIST, {params: jsons})
    },
    submitCars:(jsons)=>{ 
	   		return HTTP.post(SUBMIT_CARS, qs.stringify(jsons))
	},
    createOrder: (jsons) => { // 创建订单
      return VueHttp.$http.post(CREATE_ORDER,
        qs.stringify(jsons)
      )
    },
    cloneOrder: (jsons) => { // 克隆订单
      return VueHttp.$http.post(CLONE_ORDER,
        qs.stringify(jsons)
      )
    },
    queryOrder: (jsons) => { // 订单详情
      return VueHttp.$http.get(QUERY_ORDER, {params: jsons})
    },
    updataOrderStatus: (jsons) => { // 改变订单状态
      return VueHttp.$http.get(UPDATA_ORDER_STATUS, {params: jsons})
    },
    cancleOrder: (jsons) => { // 取消订单
      return VueHttp.$http.get(CANCLE_ORDER_STATUS, {params: jsons})
    },
    orderListStatus: (jsons) => {
      return VueHttp.$http.get(ORDER_LIST_STATUS, {params: jsons})
    },
    deleteOrder: (jsons) => {
      return VueHttp.$http.get(DELETE_ORDER, {params: jsons})
    }
  },
  address: {
    addressList: (jsons) => {
      return VueHttp.$http.get(ADDRESS, {params: jsons})
    },
    deleteAddress: (jsons) => {
      return VueHttp.$http.post(DELETE_ADDRESS,
        qs.stringify(jsons)
      )
      // return VueHttp.$http.get(DELETE_ADDRESS,jsons)
    },
    newAddress: (jsons) => {
      return VueHttp.$http.post(NEW_ADDRESS,
        qs.stringify(jsons)
      )
      // return VueHttp.$http.get(DELETE_ADDRESS,jsons)
    },
    updateAddress: (jsons) => { // 更新地址
      return VueHttp.$http.post(UPDATE_ADDRESS,
        qs.stringify(jsons)
      )
      // return VueHttp.$http.get(DELETE_ADDRESS,jsons)
    },
    editorAddress: (jsons) => { // 编辑地址
      return VueHttp.$http.post(EDITOR_ADDRESS,
        qs.stringify(jsons)
      )
    },
    defaultAddress: (jsons) => {
      return VueHttp.$http.get(DEFAULT_ADDRESS, {params: jsons})
    },
    setDefaultAddress: (jsons) => {
      return VueHttp.$http.get(SET_DEFAULT_ADDRESS, {params: jsons})
    }
  },
  work: { // 作品的接口post方法(保存)
    // workEdit: (jsons) => {
    //   jsons = VueHttp.sourceSession(jsons)
    //   return VueHttp.$http.post(SAVE_WORK_URL,
    //     qs.stringify(jsons)
    //   )
    // },
    // deletWork: (jsons) => {
    //   return VueHttp.$http.get(DELECT_WORK, {params: jsons})
    // },
    // workList: (paraJson) => { //作品列表查询
    //   return HTTP.get(QUERY_WORK_LIST_URL, {
    //       params: paraJson
    //     }
    //   )
    // },
    // unfinishedWork: (paramJson) => {//素材数据
    //   return VueHttp.$http.get(QUERY_UNFINISHED_WORK_URL, {
    //     params: paramJson
    //   })
    // },
    // checkDPI: (jsons) => {
    //   return VueHttp.$http.post(MATER_DPI,
    //     qs.stringify(jsons)
    //   )
    // }
  },
  // Index: { //首页和其他介绍页面需要的接口
  //   indexImg: () => {
  //     return VueHttp.$http.get(INDEX_IMG)
  //   },
  //   reloadCache: () => {
  //     return VueHttp.$http.get(RELOAD_CACHE);
  //   }
  // },
  // user: {
  //   getUserDbId: () => {
  //     return VueHttp.$http.post(GER_USERDBID)
  //   }
  // },
  Works: {
    WorkList: (paramJson) => {
      return HTTP.get(QUERY_WORK_LIST_URL,
        {
          params: paramJson
        }
      )
    },
    DeletWork: (paramJson) => {
      return HTTP.get(DELECT_WORK,
        {
          params: paramJson
        }
      )
    }
  },
  Material: {
    MaterialData: (paramJson) => { // 素材数据
      return HTTP.get(QUERY_PICTURE_URL,
        {
          params: paramJson
        }
      )
    }
  },
  UPLOAD_URL: UPLOAD_URL,

  ajax: function (url, callback) {
    console.log(arguments.length)
    if (arguments.length > 2) {
      console.log('直接调用那个对象')
    }
    if (url) {
      console.log('loading...')
      callback(this.testBaidu)
    }
    if (callback) {
      callback('123')
    }
  },
  $$ajax: function (inter, data, callback) {
    if (data && url !== '') {
      console.log('post请求')
    } else {
      console.log('loading..................')
      VueHttp.$http.get(HOST + inter).then((res) => {
        callback(res)
        // console.log(res)
      })
    }
  }

}

