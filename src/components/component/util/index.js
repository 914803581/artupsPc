export default{
  install(Vue,options)
  {
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
    Vue.prototype.getFromSession2 = function (name,sessionName) {
		var obj = JSON.parse(sessionStorage.getItem(name));
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