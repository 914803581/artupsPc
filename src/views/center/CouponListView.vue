<template>
  <div class="coupon-manager">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">
            <span>优惠券管理</span>
            <div class="operation">
              <el-input class="in-promo-code" v-model="input" placeholder="请输入优惠码"></el-input>
              <el-button class="btn btn-exchange" type="danger">兑换</el-button>
            </div>
          </h2>
          <div class="coupon-list">
            <div class="coupon-container">
              <div class="coupon-data" v-for="coupon in couponData" :key="coupon.couponCode">
                <div class="amount">
                  <div class="coupon-amount">
                    <span class="digital">{{coupon.prefeAmount}}</span>
                    <span class="unit">元</span>
                  </div>
                  <strong class="type">代金券</strong>
                </div>
                <div class="details">
                  <em class="seal" :class="{overdue:coupon.isExpire==='Y',use:coupon.isUse==='Y'}"
                      v-show="coupon.isExpire==='Y'||coupon.isUse==='Y'"></em>
                  <span class="name">{{coupon.couponName}}</span>
                  <strong class="instructions">{{couponType[coupon.productType]}}</strong>
                  <span class="coupon-num">劵号：{{coupon.couponCode}}</span>
                  <span class="time">{{coupon.validEndDate}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-pagination
            small
            layout="prev, pager, next"
            :total="50000">
          </el-pagination>
        </div>
        <left-menu selected="coupons"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import UnifyHeader from 'components/header/header'
  import UnifyFooter from 'components/footer/footer'
  import LeftMenu from 'components/center/menu'

  export default {
    data: function () {
      return {
        input: '',
        couponData: [],
        couponType: {
          all: '全系列产品均可使用'
        }
      }
    },
    methods: {},
    components: {
      UnifyHeader,
      UnifyFooter,
      LeftMenu
    },
    watch: {},
    created: function () {
      for (let i = 0; i < 10; i++) {
        this.couponData.push({
          'isUse': 'Y',
          'couponName': 'all_40',
          'prefeAmount': 40,
          'validStartDate': '2017-03-30',
          'validEndDate': '2017-04-08',
          'isExpire': 'Y',
          'prefeType': 'dixian',
          'couponCode': '3wmPv3lc78HG',
          'productType': 'all'
        })
      }
      this.couponData[3].isUse = 'N'
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .coupon-manager {
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
        margin-right: 20px;
      }
      .in-promo-code {
        display: inline-block;
        width: 285px;
        input {
          &:-ms-input-placeholder {
            text-align: center;
          }
          &::-webkit-input-placeholder {
            text-align: center;
          }
        }
      }
      .btn-exchange {
        line-height: 36px;
      }
      .coupon-list {
        width: 892px;
        padding: 10px 34px 0;
      }
      .coupon-container {
        width: 916px;
        font-size: 0;
      }
      .coupon-data {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        width: 436px;
        height: 125px;
        margin: 20px 20px 0 0;
        color: #d2d2d2;
        border: 1px solid #d2d2d2;
        border-radius: 6px;
        .amount {
          position: relative;
          width: 116px;
          height: 100%;
          background: #d2d2d2;
          border-right: 4px dotted #fff;
          .coupon-amount {
            position: absolute;
            top: 20px;
            right: 0;
            left: 0;
            display: block;
            font-size: 0;
            color: #fff;
            text-align: center;
          }
          .digital {
            display: inline;
            font-size: 27px;
          }
          .unit {
            display: inline;
            font-size: 18px;
            font-weight: 400;
          }
          .type {
            position: absolute;
            top: 62px;
            left: 50%;
            width: 70%;
            margin-left: -35%;
            font-size: 18px;
            text-align: center;
            line-height: 2.4;
            color: #fff;
            border-top: 2px solid #fff;
          }
        }
        .details {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 120px;
          right: 0;
          padding: 16px 0 0 23px;
          .time {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding-right: 18px;
            display: block;
            font-size: 12px;
            text-align: right;
            line-height: 22px;
            border-top: 1px dashed #d2d2d2;
            &:before {
              content: '有效期至：';
              font-weight: 600;
            }
          }
          .name, .instructions, .coupon-num {
            display: block;
            line-height: 1;
          }
          .name {
            font-weight: 900;
            font-size: 16px;
          }
          .instructions {
            font-size: 14px;
            margin-top: 12px;
          }
          .coupon-num {
            font-size: 14px;
            margin-top: 14px;
          }
        }
      }
      .seal {
        position: absolute;
        top: 18px;
        right: 16px;
        display: block;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 3px solid #d2d2d2;
        &:before {
          content: '';
          display: block;
          width: 50px;
          height: 50px;
          margin: 5px auto 0;
          border: 2px solid #d2d2d2;
          border-radius: 50%;
        }
        &:after {
          content: '';
          position: absolute;
          top: 22px;
          left: 5px;
          padding: 0 1px;
          display: block;
          font-size: 15px;
          font-style: normal;
          font-weight: 600;
          letter-spacing: 3px;
          color: #d2d2d2;
          line-height: 1.3;
          background: #fff;
          transform: rotate(-28deg);
        }
        &.overdue {
          &:after {
            content: '已过期';
          }
        }
        &.use {
          &:after {
            content: '已使用';
          }
        }
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
      .number {
        padding: 0 15px;
        font-size: 14px;
      }
      .number.active {
        border-color: #fff;
        background-color: #fff;
        color: #a00912;
      }
    }
  }
</style>
