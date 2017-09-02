import Api from '@/api.js'
export default{
  install(Vue,options)
  {
  	//获得coustName  宝宝书
  	 Vue.prototype.getCoustName = function (dom) {
  	 	return dom.parents(".pubilc_div").find(".pageleft span").attr("page")+'_'+dom.next("img").attr("imgsort")
  	 }
  	 //获取台历的coustName
  	 Vue.prototype.getCoustNameTaiLi = function (dom) {
  	 	return dom.parents(".pubilc_taili_div").find(".page span:nth-of-type(2)").text()+'_'+dom.next("img").attr("imgsort")
  	 }

    //开始定制或者其他需要用户权限的地方如果没有就去登录跳转，有就给当前页面字符串存入urlCallback localStorage里面
    Vue.prototype.setUrlCallback = function(){
      localStorage.setItem("urlCallback",location.href)
        Api.user.login({"t": "1"}).then(res => {
          window.location.href = res.data.authorizeCodeUrl
      }, err => {
          console.log(err)
          alert('Error')
        })
    }

  	//addToSession 循环url，存入session
    Vue.prototype.addToSession = function () {
		var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
        if(obj){
        } else {
            obj = {};
        }

        for (var key in this.$route.query){
            if(this.$route.query[key]){
              obj[key] = this.$route.query[key]
            }

        }
    		sessionStorage.setItem("urlQuery",JSON.stringify(obj))
    }
	Vue.prototype.getQueryString =  function(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
    //获取我需要对session
    Vue.prototype.getFromSession = function (sessionName) {
		var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
		if (sessionName) {
			if (obj[sessionName]) {
				return obj[sessionName];
			}
			return ''
		}
    }
     //将sessionStorage中存储的属性增加到jsons中
     Vue.prototype.sourceSession = function (jsons) {
		var obj = JSON.parse(sessionStorage.getItem("urlQuery"));
		if (jsons) {
			for (var i in obj) {
				if(obj[i] && obj[i] != ''){
					jsons[i] = obj[i]
				}
			}
			return jsons;
		}else{
			return obj;
		}
    }
     //路由返回上一页
     Vue.prototype.vurRouterGo = function () {

     	this.$router.go(-1)
    }
  }
}
