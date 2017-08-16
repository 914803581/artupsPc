<template>
  <header class="unify-header">
    <div class="wrapper">
      <a href="/welcome.html" class="logo">
        <h1 class="title">雅昌影业</h1>
      </a>
      <ul class="menu">
        <li class="item" v-for="item in menus">
          <a :href="item.link">{{item.label}}</a>
        </li>
      </ul>
      <div class="user-info" v-if="isLogin">
        <img :src="userInfo.avatar" class="avatar">
        <span class="nickname">{{userInfo.userName}}</span>
        <div class="user-menu">
          <ul>
            <li class="item" v-for="item in userMenu">
              <a :href="item.link">{{item.label}}</a>
            </li>
            <li class="item">
              <a href="javascript:void(0);" @click="exit">退出登录</a>
            </li>
          </ul>
        </div>
      </div>
      <a href="/cart" class="shopping-cart" v-if="isLogin">
        <i class="iconfont icon-gouwuche"></i>
        <em class="shopping-count">12</em>
        购物车
      </a>
      <a class="login-register" href="javascript:void(0);" @click="testLogin" v-if="!isLogin">
        登录/注册
      </a>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        menus: [{
          label: '首页',
          link: '/welcome.html'
        }, {
          label: '画册',
          link: '/album.html'
        }, {
          label: '磁铁画',
          link: '/magnet.html'
        }, {
          label: '框画',
          link: '/framed-pictures.html'
        }, {
          label: '海报',
          link: '/poster.html'
        }],
        userMenu: [{
          label: '我的主页',
          link: '/welcome.html'
        }, {
          label: '订单管理',
          link: '/welcome.html'
        }, {
          label: '我的作品',
          link: '/welcome.html'
        }, {
          label: '我的草稿箱',
          link: '/welcome.html'
        }, {
          label: '我的素材',
          link: '/welcome.html'
        }],
        userInfo: null,
        isLogin: false
      }
    },
    methods: {
      // TODO: 临时测试登录，待完善登录逻辑
      testLogin: function () {
        localStorage.userDbId = '2221214'
        localStorage.userName = '头条快报'
        localStorage.avatar = 'http://img13.artimg.net/passport/avatar/002/141/731/150_150.png'
        window.location.reload()
      },
      exit: function () {
        localStorage.clear()
        window.location.reload()
      },
      getLoginState: function () {
        var getData = function (key) {
          return localStorage.getItem(key)
        }
        let isLogin = window.localStorage && getData('userName') && getData('userDbId')
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
    created: function () {
      this.isLogin = this.getLoginState()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  @import "/static/font/iconfont.css";

  .unify-header {
    display: block;
    height: 50px;
    background: #2e2e2e;

    .wrapper {
      width: 1152px;
      margin: 0 auto;
      padding-top: 4px;
      font-size: 0;
    }
    .logo {
      outline: 0;
    }
    .title {
      float: left;
      width: 146px;
      height: 42px;
      text-indent: -9999px;
      background: #2e2e2e url('../../assets/img/login_1.png') no-repeat;
      background-size: 100% 100%;
    }

    .menu {
      display: block;
      float: left;
      margin-left: 92px;
      padding-top: 8px;
      overflow: hidden;
      .item {
        display: block;
        padding: 0 46px;
        float: left;
        font-size: 16px;
        line-height: 26px;
        border-left: 1px solid #5b5b5b;
        &:first-child {
          border: 0;
        }
        a {
          color: #efefef;
          &:hover {
            color: #5b5b5b;
          }
        }
      }
    }
    .user-info {
      display: inline-block;
      cursor: pointer;
      &:hover {
        .user-menu {
          display: block;
        }
        .nickname:after {
          transform: rotate(180deg);
          transition: all 0.5s;
        }
      }
      .avatar {
        padding-top: 6px;
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .nickname {
        display: inline-block;
        margin-left: 8px;
        padding: 8px 0 12px;
        font-size: 16px;
        line-height: 26px;
        color: #fff;
        &:after {
          content: '';
          display: inline-block;
          margin-left: 4px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 11px solid #c5c5c5;
        }

      }

      .user-menu {
        position: absolute;
        display: none;
        margin-left: -32px;
        background: #fff;
        width: 220px;
        z-index: 100;
        border: 1px solid #eee;
        border-radius: 4px;
        .item {
          height: 54px;
          line-height: 54px;
          border-bottom: 1px solid #eeeeee;
          text-align: center;
          a {
            font-size: 16px;
            color: #000;
            display: block;
            width: 100%;
            height: 100%;
            transition: text-indent 0.3s;
            outline: 0;
            &:hover {
              color: #a00912;
              text-indent: 10px;
            }
          }
        }
        &:hover {
          display: block;
        }
      }
    }
    .shopping-cart {
      position: relative;
      display: inline-block;
      padding-left: 36px;
      margin-left: 12px;
      font-size: 16px;
      color: #fff;
      outline: 0;
      .icon-gouwuche {
        position: absolute;
        top: -13px;
        left: 0;
        font-size: 30px;

      }
      .shopping-count {
        position: absolute;
        top: -7px;
        left: 16px;
        display: block;
        width: 20px;
        line-height: 20px;
        font-size: 12px;
        font-style: normal;
        text-align: center;
        background: #ff0000;
        border-radius: 50%;
      }
    }
    .login-register {
      display: inline-block;
      float: right;
      margin-right: 50px;
      padding-top: 8px;
      font-size: 16px;
      line-height: 26px;
      color: #fff;
      outline: 0;
      &:hover {
        color: #5b5b5b;
      }
    }

  }
</style>
