<template>
  <header class="unify-header">
    <div class="wrapper">
      <a href="/welcome.html" class="logo">
        <h1 class="title">雅昌影像</h1>
      </a>
      <ul class="menu">
        <li class="item" v-for="item in menus">
          <a :href="item.link">{{item.label}}</a>
        </li>
      </ul>
      <div class="right-platform">
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
        <a href="/user/cart" class="shopping-cart" v-if="isLogin">
          <i class="iconfont icon-gouwuche"></i>
          <em class="shopping-count" v-show="carCount">{{carCount}}</em>
          <label>购物车</label>
        </a>
        <a class="login-register" href="javascript:void(0);" @click="login" v-if="!isLogin">
          登录/注册
        </a>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  import Api from '@/api.js'

  export default {
    name: 'nav-hander',
    data: function () {
      return {
        carCount: 0,
        menus: [{
          label: '首页',
          link: '/welcome.html'
        }, {
          label: '画册',
          link: '/album.html?category=huace&defDbId=9de2973d-3487-4b05-b556-b9b92dd75493'
        }, {
          label: '框画',
          link: '/framed-pictures.html?category=kuanghua&defDbId=6afedcf6-b0e4-447d-afd9-c70449f42f50'
        }, {
          label: '海报',
          link: '/poster.html?category=haibao&defDbId=d6e44ca4-511f-41d5-87df-d8d75a491c09'
        }, {
          label: '小时光',
          link: '/album/imgEditMsg?category=baobaoshu&tplCode=pc_baobaoshu_170-235_24_single&defDbId=7ad740df-0b81-418f-b4b5-c078ef580b47'
        }, {
          label: '台历',
          link: '/desk.html?category=taili&defDbId=f80b4c98-15ca-4da0-b482-0c8270c2eac6'
        }],
        userMenu: [{
          label: '我的主页',
          link: '/center/works.html'
        }, {
          label: '订单管理',
          link: '/center/order.html'
        }, {
          label: '我的作品',
          link: '/center/works.html'
        }, {
          label: '我的草稿箱',
          link: '/center/draft.html'
        }, {
          label: '我的素材',
          link: '/center/material.html'
        }],
        userInfo: null,
        isLogin: false
      }
    },
    methods: {
      getCarCount: function () {
        let _self = this
        Api.car.CarCount({}).then(res => {
          if (res.status === 200) {
            let count = res.request.responseText - 0
            if (!isNaN(count)) {
              _self.carCount = count > 99 ? '...' : count
            }
          }
        })
      },
      exit: function () {
        localStorage.clear()
        window.location.reload()
      }
    },
    created: function () {
      this.isLogin = this.getLoginState()
      if (this.isLogin) {
        this.getCarCount()
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .unify-header {
    display: block;
    height: 50px;
    background: #2e2e2e;

    .wrapper {
      width: 1152px;
      margin: 0 auto;
      overflow: hidden;
    }
    .logo {
      float: left;
      display: block;
      margin-top: 4px;
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
      margin-left: 88px;
      overflow: hidden;
      .item {
        display: block;
        margin-top: 12px;
        padding: 0 38px;
        float: left;
        font-size: 16px;
        line-height: 26px;
        border-left: 1px solid #5b5b5b;
        &:first-child {
          border: 0;
        }
        a {
          color: #efefef;
          outline: 0;
          &:hover {
            color: #5b5b5b;
          }
        }
      }
    }
    .right-platform {
      float: right;
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
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-top: 9px;
        border-radius: 50%;
      }
      .nickname {
        display: inline-block;
        margin-top: 12px;
        color: #fff;
        font-size: 16px;
        line-height: 26px;
        vertical-align: top;
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
      margin-left: 30px;
      padding-left: 36px;
      color: #fff;
      vertical-align: top;
      outline: 0;
      .icon-gouwuche {
        position: absolute;
        top: 12px;
        left: 0;
        font-size: 30px;
        line-height: 26px;
      }
      .shopping-count {
        position: absolute;
        top: 3px;
        left: 19px;
        display: block;
        width: 18px;
        line-height: 18px;
        font-weight: 200;
        font-size: 12px;
        font-style: normal;
        text-align: center;
        background: #a00912;
        border-radius: 50%;
      }
      label {
        display: inline-block;
        margin-top: 12px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        outline: 0;
      }
    }
    .login-register {
      display: inline-block;
      padding-top: 12px;
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
