<template>
  <div class="order-info" id="orderList">
    <unify-header></unify-header>
    <div class="container" ref="container">
      <div class="bread-crumbs">
        <ul class="wrapper">
          <li><a href="/center/works.html">个人中心</a></li>
          <li><a href="/center/order.html">订单管理</a></li>
          <li class="current"><span>订单详情</span></li>
        </ul>
        <h4 class="headings">
          <div class="wrapper">订单信息</div>
        </h4>
        <div class="wrapper">
          <div class="order-info">
            <div class="row">
              <label>订单编号：</label>
              <span>20170808093921401</span>
            </div>
            <div class="row">
              <label>订单状态：</label>
              <span>等待支付</span>
            </div>
            <div class="row">
              <label>商品明细：</label>
              <span>框画/棕色木框/400X500mm x 4</span>
            </div>
            <div class="row">
              <label>购买时间：</label>
              <span>2017年08月08日</span>
            </div>
            <div class="row">
              <label>交易金额：</label>
              <span>456.00元</span>
            </div>
          </div>
          <div class="consignee">
            <label>收货人信息：</label>
            <span>彭进</span>
            <p>浙江省归属感的故事会受到很多事 彭进 (收) 18301232813</p>
          </div>
          <div class="invoice">
            <h5>发票信息：</h5>
            <span>框画</span>
          </div>
          <div class="remark">
            <h5>备注信息</h5>
            <p>无</p>
          </div>
          <div class="pay-info">
            <h5>结算信息</h5>
            <div class="row">
              <label>支付方式：</label>
              <span>微信支付</span>
            </div>
            <div class="row">
              <label>商品金额：</label>
              <span>商品总金额1156.0000元 - 优惠金额 700 元 + 运费0.0000元 = 订单总金额：456.00元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../../components/header/header.vue'
  import Footer from '../../components/footer/footer.vue'
  import LeftMenu from '../../components/center/menu.vue'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {}
    },
    methods: {},
    components: {
      'unify-header': Header,
      'unify-footer': Footer
    },
    watch: {},
    mounted: function () {
      this.setMinHeight(this.$refs.container, document.body.scrollHeight - 50 - 132 - 92 - 14)
    },
    created: function () {
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .order-info {
    .wrapper {
      width: 1152px;
      margin: 0 auto;
      overflow: hidden;
    }
    .container {
      padding: 14px 0 92px;
      background: #f9f9f9;
    }
    .bread-crumbs {
      ul {
        overflow: hidden;
      }
      li {
        float: left;
        margin-right: 10px;
        &:after {
          position: relative;
          top: -1px;
          display: inline-block;
          content: '>';
          color: #999;
          margin-left: 10px;
          line-height: 40px;
        }
        a {
          color: #999;
        }
      }
      .current {
        color: #a00912;
        &:after {
          content: '';
        }
      }
      a, span {
        line-height: 40px;
      }
    }
    .headings {
      margin-top: 20px;
      line-height: 36px;
      border: 1px solid #d2d2d2;
      border-left: 0;
      border-right: 0;
      background: #eee;
      font-size: 16px;
    }
    .order-info, .consignee, .invoice, .remark, .pay-info {
      color: #666;
      font-size: 16px;
      padding: 25px 0;
      border-bottom: 1px dashed #BFBFBF;
    }
    .consignee {
      padding-top: 20px;
      p {
        line-height: 1.8;
      }
    }
    .pay-info {
      border: 0;
    }
    h5 {
      font-size: 16px;
      line-height: 32px;
    }
    .row {
      font-size: 16px;
      line-height: 36px;
      color: #666;
      label {
        font-weight: 400;
      }
      span {
        font-weight: 200;
      }
    }
  }

</style>
