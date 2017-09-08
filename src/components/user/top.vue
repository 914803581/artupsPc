<template>
  <div class="user-top">
    <div class="user-bg">
      <a href="/center/account.html" class="avatar">
        <img :src="userAvatar"/>
      </a>
      <span class="nickname">{{nickname}}</span>
      <p class="signature">{{signature}}</p>
    </div>
    <ul class="menus">
      <li class="item" :class="{selected:selected===item.id}" v-for="item in menus">
        <a :href="item.path">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        menus: [{
          id: 'works',
          title: '个人主页',
          path: '/user/works.html'
        }, {
          title: '草稿箱',
          path: '/center/draft.html'
        }, {
          id: 'material',
          title: '我的素材',
          path: '/user/material.html'
        }, {
          id: 'coupons',
          title: '我的优惠券',
          path: '/user/coupons.html'
        }, {
          title: '我的订单',
          path: '/center/order.html'
        }],
        userAvatar: localStorage['avatar'] ? localStorage['avatar'] : '',
        nickname: localStorage['userName'] ? localStorage['userName'] : '',
        signature: '我从小到大没什么梦想，一直在路上不问远方，只是衷心希望自己成为一个很厉害的人，你问我什么算厉害，大概就是能有朝一日，保护好爱人，对得起朋友，赡养好家人吧。​​​​'
      }
    },
    props: ['selected']
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  .user-top {
    .user-bg {
      height: 366px;
      background: url('../../assets/img/p_user_ng.jpg');
    }
    .avatar {
      display: block;
      width: 120px;
      height: 120px;
      margin: 0 auto;
      padding-top: 40px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .nickname, .signature {
      display: block;
      width: 600px;
      margin: 20px auto 0;
      color: #fff;
      text-align: center;
      font-size: 16px;
      &:before {
        content: '签名：';
      }
    }
    .nickname:before {
      content: '昵称：';

    }
    .menus {
      width: 100%;
      margin-top: 26px;
      border-bottom: 1px solid #a6a6a6;
      text-align: center;
      .item {
        display: inline-block;
        line-height: 1;
        padding-bottom: 16px;
        a {
          display: block;
          padding: 0 20px;
          color: #333333;
          font-size: 16px;
          font-weight: 400;
          outline: 0;
          border-left: 1px solid #000;
        }
        &:first-child a {
          border: 0;
        }
        &.selected {
          border-bottom: 2px solid #000;
        }
      }
    }
  }
</style>
