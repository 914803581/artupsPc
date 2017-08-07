import Vue from 'vue'
// 2017年04月10日15:02:01 作者:827879040@qq.com vue全局过滤器测试
// 定义全局过滤器
Vue.filter('sum', function (value) {   // 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  return value + 40
})

Vue.filter('json', function (value) {   // 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  console.log(value)
  return JSON.stringify(value)
})

Vue.filter('time', function (value) {
  let date = new Date(value)
  let Y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let i = date.getMinutes()
  let s = date.getSeconds()
  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (H < 10) {
    H = '0' + H
  }
  if (i < 10) {
    i = '0' + i
  }
  if (s < 10) {
    s = '0' + s
  }
  return [Y, '-', m, '-', d, ' ', H, ':', i, ':' + s].join('')
})
//计算价格保留两位小数
Vue.filter("toFixedTwo",function(value){
	if (value) {
		
		return parseFloat(value.toFixed(2));
	}
})