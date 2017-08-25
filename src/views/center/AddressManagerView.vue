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
              <el-button class="btn" type="danger" @click="addition">添加</el-button>
            </div>
          </h2>
          <div class="address-list">
            <div class="address-details" :class="{last:index===addressList.length-1}"
                 v-for="(item,index) in addressList">
              <el-radio class="radio-address" v-model="radioAddress" :label="item.dbId" v-show="startDelete"></el-radio>
              <label class="label-name">收件人：</label>
              <span class="text name">{{item.name}}</span>
              <label>联系方式：</label>
              <span class="text">{{item.mobile}}</span>
              <label>邮编：</label>
              <span class="text">100000</span>
              <p class="address">{{item.province}},{{item.address}}</p>
              <div class="set-default-box">
                <el-button v-show="!startDelete&&!item.hasDefault" @click="setDefault(item)" class="btn" type="danger">
                  设为默认
                </el-button>
                <span v-show="!startDelete&&item.hasDefault" class="text-default">默认地址</span>
                <el-button v-show="startDelete" @click="showEditBox(item)" class="btn" type="danger">编辑</el-button>
              </div>
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
        addAddressDialogFormVisible: false,
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
        pageSize: 5
      }
    },
    methods: {
      addition: function () {
        location.href = 'address/add.html'
      },
      getData: function (pn) {
        if (pn) {
          this.pageNum = pn
        }
        Api.Address.List({
          status: 1,
          pageNum: this.pageNum - 1,
          pageSize: this.pageSize,
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
        let _self = this
        if (!this.radioAddress) {
          this.$alert('请选择需要删除的地址！', '提示')
          return
        }
        this.$confirm('确定要删除该地址信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Api.Address.Delete({
            dbId: _self.radioAddress
          }).then((result) => {
            return result.status === 200 ? result.request.response : ''
          }).then((result) => {
            result = JSON.parse(result)
            if (result.code === 'success') {
              if (_self.addressList.length > 1) {
                _self.getData()
              } else {
                _self.pageNum--
                if (_self.pageNum) {
                  _self.getData()
                }
              }
            }
          })
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
      paging: function (pn) {
        this.getData(pn)
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
      this.getData(1)
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

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
        padding: 0 34px 20px;
        margin-bottom: 38px;
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
    .el-pagination {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      text-align: center;
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
