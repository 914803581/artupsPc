<template>
  <div class="order-manager" id="orderList">
    <unify-header></unify-header>
    <div class="container" ref="container">
      <div class="wrapper">
        <div class="main">
          <div class="filter">
            <ul class="filter-list">
              <li class="item" @click="changeFilter(item)" :class="{activate:item.elect}" v-for="item in filterOptions">
                <label>{{item.label}}</label>
                <i v-show="item.countIndicator" class="count-indicator">{{item.countIndicator}}</i>
              </li>
            </ul>
          </div>
          <div class="panel">
            <div class="list-head">
              <label class="order-list">订单列表</label>
              <label class="consignee">收货人</label>
              <label class="amount">金额</label>
              <label class="state">状态</label>
              <label class="operation">操作</label>
            </div>
            <ul class="order-list" v-if="orderList.length">
              <li class="item" v-for="item in orderList">
                <div class="head">
                  <span class="time">{{item.createdDt}}</span>
                  <a class="order-id" :href="`order/info.html?id=${item.dbId}`">订单号：{{item.code}}</a>
                </div>
                <div class="order-main" :style="{height:(item.cars.length?item.cars.length*140:140)+'px'}">
                  <div class="list">
                    <div class="car" v-for="car in item.cars">
                      <img :src="car.thumbnailImageUrl" class="thumbnail">
                      <h6 class="title">{{car.sku}}</h6>
                      <h6 class="specification">{{item.createdDt}}</h6>
                    </div>
                  </div>
                  <div class="name">
                    <span class="consignee">{{item.consignee}}</span>
                  </div>
                  <div class="amount">
                    <div class="parcel">
                      <label>应付</label>
                      <span class="val">{{item.total}}</span>
                      <span class="total">{{item.total}}</span>
                      <span class="freight">（含运费:￥0）</span>
                    </div>
                  </div>
                  <div class="state">
                    <span class="state-text">{{item.orderState}}</span>
                  </div>
                  <div class="operation">
                    <div class="parcel">
                      <a href="javascript:void(0);" v-show="item.status===2" class="payment-btn"
                         @click="pay(item)">付款</a>
                      <a href="javascript:void(0);" v-show="[-1,3].indexOf(item.status) < 0" class="cancel-order"
                         @click="cancel(item)">取消订单</a>
                      <a href="javascript:void(0);" v-show="[-1].indexOf(item.status) >= 0" class="cancel-order"
                         @click="deleteOrder(item)">删除订单</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              v-show="total>pageSize"
              small
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
              @current-change="paging">
            </el-pagination>
          </div>
        </div>
        <left-menu selected="order"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header.vue'
  import Footer from 'components/footer/footer.vue'
  import LeftMenu from 'components/center/menu.vue'
  import {ALERT_CUSTOM} from 'base/js/common.config'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {
        userInfo: null,
        total: 0,
        pageSize: 5,
        pageNum: 1,
        orderList: [],
        filterOptions: [{
          label: '全部订单',
          elect: true,
          countIndicator: 0
        }, {
          label: '待付款',
          elect: false,
          countIndicator: 0,
          status: 1
        }, {
          label: '已支付',
          elect: false,
          countIndicator: 0,
          status: 3
        }, {
          label: '已取消',
          elect: false,
          countIndicator: 0,
          status: -1
        }]
      }
    },
    methods: {
      changeFilter: function (filter) {
        this.filterOptions.forEach((filter) => {
          filter.elect = false
        })
        filter.elect = true
        this.orderList = []
        this.paging(1)
      },
      paging: function (pn) {
        if (pn) {
          this.pageNum = pn
        }
        let filterElect = null
        this.filterOptions.forEach((filter) => {
          if (filter.elect) {
            filterElect = filter
          }
        })
        if (filterElect.status) {
          Api.Order.OrderListCount({
            status: filterElect.status
          }).then((result) => {
            return result.status === 200 ? result.request.response : ''
          }).then((result) => {
            filterElect.countIndicator = result - 0
          })
        }
        Api.Order.OrderList({
          pageSize: this.pageSize,
          pageNum: this.pageNum - 1,
          sort: 'createdDt',
          order: 'desc',
          status: filterElect.status
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          result = JSON.parse(result)
          this.orderList = result.results
          if (result.totalPage) {
            this.pageNum = result.totalPage
          }
          this.total = result.totalRecord
        })
      },
      pay: function (order) {
        let orderPay = order.paymentType.split('_')[1]
        location.href = `/pay/payOrder?addressId=${order.addressDbId}&userDbId=${order.userDbId}&dbId=${order.dbId}&paymentType=${orderPay}`
      },
      cancel: function (order) {
        this.$confirm('确认要取消订单吗？', ALERT_CUSTOM)
          .then(_ => {
            Api.Order.CancleOrder({
              dbId: order.dbId
            }).then((result) => {
              return result.status === 200 ? result.request.response : ''
            }).then((result) => {
              console.log(result)
            })
          })
      },
      deleteOrder: function (order) {
        let _self = this
        this.$confirm('确认要删除订单吗？', ALERT_CUSTOM)
          .then(_ => {
            Api.Order.DelOrder({
              dbId: order.dbId
            }).then((result) => {
              return result.status === 200 ? result.request.response : ''
            }).then((result) => {
              console.log(result)
              if (_self.orderList.length > 1) {
                this.paging()
              } else {
                if (_self.pageNum - 1) {
                  this.paging(_self.pageNum - 1)
                } else {
                  this.paging(1)
                }
              }
            })
          })
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      LeftMenu
    },
    watch: {},
    mounted: function () {
      this.setMinHeight(this.$refs.container, document.body.clientHeight - 50 - 132)
    },
    created: function () {
      this.paging(1)
      this.getLoginState()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .order-manager {
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
      .filter {
        padding-left: 10px;
      }
    }
    .panel {
      min-height: 560px;
      padding: 26px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #dcdcdc;
    }

    .list-head {
      font-size: 0;
      .order-list, .consignee, .amount, .state, .operation {
        display: inline-block;
        box-sizing: border-box;
        color: #303030;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
      }
      .order-list {
        width: 400px;
        padding-left: 0.46em;
        text-align: left;
      }
      .consignee {
        width: 130px;
      }
      .amount {
        width: 144px;
      }
      .state {
        width: 116px;
      }
      .operation {
        width: 116px;
      }
    }
    ul.order-list {
      min-height: 456px;
      .item {
        margin-top: 18px;
        border: 1px solid #dedede;
        border-radius: 2px;
      }
      .head {
        background: #eee;
        padding-left: 1.5em;
        color: #999;
        line-height: 40px;
        .order-id {
          color: #999;
          outline: 0;
          margin-left: 3em;
        }
      }
      .order-main {
        overflow: hidden;
        .list, .name, .amount, .state, .operation {
          float: left;
          height: 100%;
          box-sizing: border-box;
          border-right: 1px solid #dcdcdc;
        }
        .list {
          width: 399px;
          padding: 0 20px;
          .car {
            position: relative;
            margin-top: 20px;
            height: 100px;
          }
          .thumbnail {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 2px;
          }
          .title {
            position: absolute;
            top: 12px;
            left: 120px;
            width: 238px;
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .specification {
            position: absolute;
            top: 56px;
            left: 120px;
            color: #999;
          }
        }
        .name {
          position: relative;
          width: 130px;
          .consignee {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            color: #333;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            margin-top: -10px;
          }
        }
        .amount {
          position: relative;
          width: 144px;
          label, .val, .total, .freight {
            display: block;
            margin-top: 4px;
            font-size: 14px;
            text-align: center;
          }
          label {
            margin-top: 0;
            color: #000;
            font-size: 16px;
            line-height: 1;
          }
          .val {
            color: #a00912;
            &:before {
              content: '￥';
            }
          }
          .total {
            color: #999;
            &:before {
              content: '总 额：￥';
            }
          }
          .freight {
            color: #999;
            line-height: 1;
          }
          .parcel {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 92px;
            margin-top: -46px;
          }
        }
        .state {
          position: relative;
          width: 116px;
          .state-text {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            line-height: 20px;
            margin-top: -10px;
            text-align: center;
            font-weight: 400;
          }
        }
        .operation {
          position: relative;
          width: 115px;
          border-right: 0;
          .parcel {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 54px;
            margin-top: -32px;
          }
          .payment-btn {
            display: block;
            width: 80%;
            margin: 0 auto;
            line-height: 30px;
            background: #a00912;
            border-radius: 3px;
            color: #fff;
            font-size: 12px;
            text-align: center;
          }
          .cancel-order {
            display: block;
            margin-top: 20px;
            color: #3a3a3a;
            text-align: center;
            line-height: 1;
          }
        }
      }
    }
    .filter-list {
      overflow: hidden;
      .item {
        position: relative;
        float: left;
        height: 58px;
        padding-top: 14px;
        margin-right: 40px;
        box-sizing: border-box;
        &:last-child {
          margin-right: 0;
        }
        &.activate {
          label {
            border-bottom: 2px solid #c50b16;
          }
        }
        label {
          padding-bottom: 4px;
          color: #303030;
          font-size: 16px;
          font-weight: 400;

        }
        .count-indicator {
          position: absolute;
          top: 5px;
          right: -12px;
          width: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          font-style: normal;
          font-size: 12px;
          font-weight: 400;
          background: #c50b16;
          border-radius: 50%;
        }
      }
    }
    .el-pagination {
      text-align: center;
      margin-top: 30px;
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
