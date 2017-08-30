<template>
  <div class="address-add">
    <unify-header></unify-header>
    <div class="container" ref="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">修改地址</h2>
          <address-form :dbId="dbId"></address-form>
        </div>
        <left-menu selected="address"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import Footer from 'components/footer/footer'
  import LeftMenu from 'components/center/menu'
  import AddressForm from './AddressForm'
  import * as helper from 'base/js/helper.js'

  export default {
    data: function () {
      return {
        dbId: ''
      }
    },
    methods: {},
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      LeftMenu,
      AddressForm
    },
    mounted: function () {
      this.setMinHeight(this.$refs.container, document.body.clientHeight - 50 - 132)
    },
    created: function () {
      let callbackPage = localStorage['AddressEditCallBackPage']
      if (!callbackPage) {
        callbackPage = '/center/address.html'
      }
      this.dbId = helper.getQueryString('dbId')
      if (this.dbId) {
        if (!localStorage[`Address${this.dbId}`]) {
          location.href = callbackPage
        }
      } else {
        location.href = callbackPage
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .address-add {
    .btn {
      padding: 0 1.6em;
      font-size: 14px;
      line-height: 26px;
      background: #a00912;
      border: 0;
      &:hover {
        background: #c51b25;
      }
    }
    .wrapper {
      width: 1152px;
      margin: 0 auto;
      overflow: hidden;
    }
    .container {
      padding: 14px 0 92px;
      background: #f1f1f1;
    }
    .main {
      position: relative;
      width: 960px;
      min-height: 668px;
      float: right;
      border-radius: 5px;
      border: 1px solid #dedede;
      background: #fff;
      h2.title {
        padding-left: 30px;
        font-size: 16px;
        line-height: 55px;
        border-bottom: 1px solid #DEDEDE;
      }
      .operation {
        float: right;
        margin-right: 22px;
      }
    }
  }

</style>
