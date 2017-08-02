<template>
  <div class="address-manager">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">
            <span>收货地址</span>
            <div class="operation">
              <el-button class="btn" v-show="startDelete" @click="startDelete=false" type="danger">回退</el-button>
              <el-button class="btn" v-show="startDelete" type="danger">删除</el-button>
              <el-button class="btn" v-show="!startDelete" @click="startDelete=true" type="danger">管理</el-button>
              <el-button class="btn" type="danger">添加</el-button>
            </div>
          </h2>
          <div class="address-list">
            <div class="address-details" v-for="item in addressList">
              <label>收件人：</label>
              <span class="text">{{item.name}}</span>
              <label>联系方式：</label>
              <span class="text">{{item.phone}}</span>
              <label>邮编：</label>
              <span class="text">{{item.zipCode}}</span>
              <p class="address">{{item.areaDetail}}</p>
              <div class="set-default-box">
                <el-button v-show="!item.hasDefault" class="btn" type="danger">设为默认</el-button>
                <span v-show="item.hasDefault" class="text-default">默认地址</span>
              </div>
            </div>
          </div>
        </div>
        <left-menu selected="address"></left-menu>
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
      return {
        form: {
          email: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        imageUrl: '',
        startDelete: false,
        addressList: []
      }
    },
    methods: {},
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
      for (let i = 0; i < 15; i++) {
        this.addressList.push({
          'hasDefault': false,
          'areaDetail': '浙江省归属感的故事会受到很多事',
          'zipCode': '111111',
          'regionId': 100,
          'phone': '18301232813',
          'name': '彭进',
          'id': 546,
          'addressArea': '浙江省'
        })
      }
      this.addressList[3].hasDefault = true
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  @import "~cube.css/src/scss/neat.scss";

  .address-manager {
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
      .address-list {
        padding: 20px 34px;
      }
      .address-details {
        position: relative;
        padding: 24px 0;
        color: #a3a3a3;
        border-bottom: 1px solid #dedede;
        &:last-child {
          border: 0;
        }
        label {
          margin-left: 86px;
          &:first-child {
            margin: 0;
          }
        }
        .text {
          color: #797d80;
        }
        .address {
          margin-top: 12px;
          color: #797d80;
          font-size: 16px;
          font-weight: 400;
          line-height: 36px;
        }
      }
      .set-default-box {
        position: absolute;
        top: 20px;
        right: 0;
        width: 200px;
        height: 80px;
        border-left: 1px solid #dedede;
        .text-default {
          display: block;
          width: 100px;
          line-height: 26px;
          text-align: center;
        }
        .btn, .text-default {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          margin: -13px 0 0 -50px;
        }
      }
    }
  }

</style>
