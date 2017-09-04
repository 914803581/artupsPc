<template>
  <div class="coupons-list">
    <unify-header></unify-header>
    <page-top selected="coupons"></page-top>
    <div class="container">
      <div class="wrapper">
        <div class="coupons">
          <div class="coupons-container">
          </div>
        </div>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import UnifyHeader from 'components/header/header'
  import UnifyFooter from 'components/footer/footer'
  import PageTop from 'components/user/top'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {}
    },
    methods: {},
    components: {
      UnifyHeader,
      UnifyFooter,
      PageTop
    },
    watch: {},
    created: function () {
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .coupons-list {
    a.btn {
      display: inline-block;
      padding: 0 1.2em;
      background: #a00912;
      line-height: 26px;
      font-size: 13px;
      color: #fff;
      border-radius: 4px;
      &:hover {
        background: #a9372d;
      }
    }
    .wrapper {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }
    .container {
      min-height: 350px;
      padding: 14px 0 92px;
      background: #f9f9f9;
    }
    .coupons {
      width: 1200px;
      margin-top: 40px;
      overflow: hidden;
      .coupons-container {
        width: 1252px;
        overflow: hidden;
      }
    }
    .el-pagination {
      text-align: center;
      margin: 20px 0 40px;
      button:hover {
        color: #a00912;
      }
      .el-pager li:hover {
        color: #a00912;
      }
      li {
        background: transparent;
      }
      .number {
        padding: 0 15px;
        font-size: 14px;

      }
      .number.active {
        border-color: transparent;
        color: #a00912;
      }
      button {
        background: transparent;
      }
    }
  }
</style>
