<template>
  <div class="works-list">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <left-menu selected="works"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header/header.vue'
  import Footer from '../../components/footer/footer.vue'
  import LeftMenu from '../../components/center/menu.vue'

  export default {
    data: function () {
      return {}
    },
    methods: {},
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
      console.log('ok')
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  .works-list {
    .wrapper {
      width: 1152px;
      margin: 0 auto;
    }
    .container {
      padding: 14px 0 92px;
      background: #f1f1f1;
    }
  }
</style>
