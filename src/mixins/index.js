import Api from '@/api.js'

export default {
  data: function () {
    return {
      userInfo: null,
      request: new function () {
        let name, value
        let str = location.href
        let num = str.indexOf('?')
        str = str.substr(num + 1)
        let arr = str.split('&')
        for (let i = 0; i < arr.length; i++) {
          num = arr[i].indexOf('=')
          if (num > 0) {
            name = arr[i].substring(0, num)
            value = arr[i].substr(num + 1)
            this[name] = value
          }
        }
      }
    }
  },
  methods: {
    setMinHeight: function (dom, minHeight) {
      dom.style.minHeight = `${minHeight}px`
    },
    login: function () {
      Api.user.login({"t": "1"}).then(res => {
        window.location.href = res.data.authorizeCodeUrl
      }, err => {
        console.log(err)
        alert('Error')
      })
    },
    getLoginState: function () {
      localStorage.urlCallback = location.href
      var getData = function (key) {
        return localStorage.getItem(key)
      }
      let isLogin = localStorage && getData('userName') && getData('userDbId')
      if (isLogin) {
        this.userInfo = {
          userDbId: getData('userDbId'),
          userName: getData('userName'),
          avatar: getData('avatar')
        }
      }
      return isLogin
    }
  },
  components: {},
  watch: {},
  created: function () {
  }
}
