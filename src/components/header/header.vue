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
          link: '/builder/citiehua.html'
        }, {
          label: '框画',
          link: '/framed-pictures.html'
        }, {
          label: '海报',
          link: '/poster.html'
        }]
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

  }
</style>
