<template>
  <div class="address-manager">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">
            <span>收货地址</span>
            <div class="operation">
              <el-button class="btn" v-show="startDelete" @click="rollback" type="danger">回退</el-button>
              <el-button class="btn" v-show="startDelete" @click="deleteAddress" type="danger">删除</el-button>
              <el-button class="btn" v-show="!startDelete" @click="startDelete=true" type="danger">管理</el-button>
              <el-button class="btn" type="danger">添加</el-button>
            </div>
          </h2>
          <div class="address-list">
            <div class="address-details" :class="{last:index===addressList.length-1}" v-for="(item,index) in addressList">
              <el-radio class="radio-address" v-model="radioAddress" :label="item.dbId" v-show="startDelete"></el-radio>
              <label class="label-name">收件人：</label>
              <span class="text name">{{item.name}}</span>
              <label>联系方式：</label>
              <span class="text">{{item.mobile}}</span>
              <label>邮编：</label>
              <span class="text">100000</span>
              <p class="address">{{item.address}}</p>
              <div class="set-default-box">
                <el-button v-show="!startDelete&&!item.hasDefault" @click="setDefault(item)" class="btn" type="danger">
                  设为默认
                </el-button>
                <span v-show="!startDelete&&item.hasDefault" class="text-default">默认地址</span>
                <el-button v-show="startDelete" @click="showEditBox(item)" class="btn" type="danger">编辑</el-button>
              </div>
            </div>
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
  import Api from '../../api.js'

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
        pageNum: 1,
        addressList: [],
        radioAddress: '',
        total: 0,
        pageSize: 15
      }
    },
    methods: {
      getData: function () {
        this.pageNum -= 1
        Api.Address.List({
          status: 1,
          pageNum: this.pageNum,
          pageSize: 15,
          sort: 'createdDt'
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          let data = result ? JSON.parse(result) : ''
          if (!data) {
            return
          }
          this.total = data.totalRecord
          this.addressList = data.results
        })
      },
      rollback: function () {
        this.startDelete = false
        this.radioAddress = ''
      },
      deleteAddress: function () {
        if (!this.radioAddress) {
          return
        }
        Api.Address.Delete({
          dbId: this.radioAddress
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          if (result.code === 'success') {
            this.pageNum = 1
            this.getData()
          }
        })
      },
      setDefault: function (address) {
        Api.Address.SetDefault({
          dbId: address.dbId
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          if (result.code === 'success') {
            this.addressList.forEach((item) => {
              item.hasDefault = false
            })
            address.hasDefault = true
          }
        })
      },
      showEditBox: function (item) {
        console.log(item)
      },
      paging: function () {
        console.log(1)
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
      this.getData()
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
        &.last {
          border: 0;
        }
        label {
          margin-left: 86px;
        }
        .radio-address, .label-name {
          margin: 0;
        }
        .el-radio__label {
          display: none;
        }
        .text {
          color: #797d80;
        }
        .text.name {
          display: inline-block;
          width: 100px;
          vertical-align: top;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
