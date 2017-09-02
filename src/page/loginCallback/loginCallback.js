  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  var userDbId = GetQueryString("userDbId") //userid
  var headImgUrl = GetQueryString("headImgUrl") //头像
  var userName = GetQueryString("userName") // userName
  if (userDbId) {
    localStorage.setItem("userDbId", userDbId)
    localStorage.setItem("userName", userName)
    localStorage.setItem("avatar", headImgUrl)
    //如果session里面没有需要跳转的连接，就跳转到首页
    if (localStorage.getItem("urlCallback")) {
      location.href = localStorage.getItem("urlCallback")
    } else {
      location.href = "/"
    }
  }

