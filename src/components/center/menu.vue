<template>
  <div class="center-left-menu">
    <dl class="menu-list" v-for="item in menus">
      <dt><i class="iconfont" :class="item.icon"></i>{{item.title}}</dt>
      <dd class="item" :class="{selected:page.id===selected}" v-for="page in item.child">
        <a :href="page.path">{{page.label}}</a>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        menus: [{
          title: '个人主页',
          icon: 'icon-account',
          child: [{
            id: 'works',
            label: '我的作品',
            path: '/center/works'
          }, {
            id: 'draft',
            label: '草稿箱',
            path: '/center/draft'
          }, {
            id: 'material',
            label: '我的素材',
            path: '/center/material'
          }]
        }, {
          title: '账户管理',
          icon: 'icon-bussinesscard',
          child: [{
            id: 'account',
            label: '账户资料',
            path: '/center/account'
          }, {
            id: 'security',
            label: '账户安全',
            path: '/center/works'
          }, {
            id: 'address',
            label: '收获地址管理',
            path: '/center/works'
          }]
        }, {
          title: '订单',
          icon: 'icon-manageorder',
          child: [{
            id: 'order',
            label: '订单管理',
            path: '/center/works'
          }]
        }, {
          title: '优惠券',
          icon: 'icon-discount',
          child: [{
            id: 'coupons',
            label: '优惠券管理',
            path: '/center/works'
          }]
        }]
      }
    },
    props: ['selected']
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  .center-left-menu {
    width: 172px;
    border-radius: 5px;
    border: 1px solid #dedede;
    background: #fff;
    .menu-list {
      dt, dd {
        font-size: 16px;
        line-height: 55px;
      }
      dt {
        padding-left: 20px;
        font-weight: 600;
        border-bottom: 1px solid #e5e5e5;
        .iconfont {
          margin-right: 20px;
          font-weight: 500;
        }
      }
      dd {
        transition: all 0.5s;
        font-weight: 400;
        a{
          outline: 0;
        }
        &:hover {
          text-indent: 6px;
        }
        &.selected {
          font-weight: 500;
        }
      }
      dd a {
        padding-left: 56px;
        color: #303030;
        &:hover {
          color: #575757;
        }
      }
    }
  }
</style>
