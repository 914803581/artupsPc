<template>
  <div class="works-list">
    <unify-header></unify-header>
    <div class="container" ref="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">我的作品</h2>
          <div class="operation">
            <label>作品类型</label>
            <ul class="types-filter">
              <li class="drop-down"></li>
              <li class="type" :class="{candidate:!t.selected}" v-for="t in types" @click="typeFilter(t)">
                {{t.text}}
              </li>
            </ul>
            <div class="manager">
              <a href="javascript:void(0);" v-show="!managerIng" @click="managerIng=true" class="manager-btn">管理</a>
              <a href="javascript:void(0);" v-show="managerIng" @click="checkedAll" class="manager-btn">全选</a>
              <a href="javascript:void(0);" v-show="managerIng" @click="showDeleteDialogVisible"
                 class="manager-btn">删除</a>
            </div>
          </div>
          <div class="works-list">
            <div class="works-container">
              <div class="woks-data" v-for="work in workData" :key="work.id">
                <div class="img-box">
                  <el-checkbox v-show="managerIng" v-model="work.checked" class="checkbox-work"></el-checkbox>
                  <img :src="work.thumbnailImageUrl" :alt="work.name" :title="work.name">
                </div>
                <label class="title">{{work.name}}</label>
                <span class="time">{{work.createdDt}}</span>
                <span class="type">{{work.sku}}</span>
                <a href="javascript:void(0);" @click="Purchase(work)" class="buy-btn">购买定制</a>
              </div>
            </div>
          </div>
          <el-pagination v-show="total>pageSize"
                         small
                         layout="prev, pager, next"
                         :page-size="pageSize"
                         :total="total"
                         @current-change="paging">
          </el-pagination>
        </div>
        <left-menu selected="works"></left-menu>
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
        checkedAllValue: false,
        managerIng: false,
        types: [{
          id: '',
          text: '所有类型',
          selected: true
        }, {
          id: 'huace',
          text: '画册'
        }, {
          id: 'kuanghua',
          text: '框画'
        }, {
          id: 'haibao',
          text: '海报'
        }, {
          id: 'baobaoshu',
          text: '小时光'
        }, {
          id: 'taili',
          text: '台历'
        }],
        workData: [],
        category: '',
        pageSize: 9,
        total: 0,
        pageNum: 1
      }
    },
    methods: {
      Purchase(work) {
        console.log(work)
        var jsons = {
          edtDbId: work.dbId,
          thumbnailImageUrl: work.thumbnailImageUrl,
          category: work.category,
          price: work.price,
          num: 1,
          total: work.price,
          sku: work.sku,
          skuCode: work.skuCode,
          skuId: work.skuId,
          tplCode: work.tplCode,
          status: 1,
          userDbId: localStorage.getItem("userDbId"),
          editCnfName: work.tplCode + '_single'
        }
        Api.car.addCar(jsons).then(res => {
          if (res.data.code === "success") {
//            this.$message({
//              showClose: true,
//              iconClass: "atrup_Message",
//              message: '加入购物车成功!',
//              type: 'success'
//            })
            window.location.href = "/user/cart"
          }
        })
      },
      deleteWorkList: function () {
        let deleteArr = []
        this.workData.forEach(function (work) {
          if (work.checked) {
            deleteArr.push(work)
          }
        })
        return deleteArr
      },
      deleteWork: function () {
        let deleteArr = this.deleteWorkList()
        let ids = []
        deleteArr.forEach((item) => {
          ids.push(item.dbId)
        })
        Api.Works.DeletWork({
          dbId: ids.join(',')
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          result = result ? JSON.parse(result) : ''
          if (!result) {
            return
          }
          if (result.code === 'success') {
            this.managerIng = false
            this.checkedAllValue = false
            this.getData()
          }
        })
      },
      showDeleteDialogVisible: function () {
        if (!this.deleteWorkList().length) {
          return
        }
        this.$confirm('您确定要删除吗?', '提示', ALERT_CUSTOM).then(() => {
          this.deleteWork()
        }).catch(() => {
          this.$message({
            type: 'info',
            iconClass: "atrup_Message",
            message: '已取消删除'
          })
        })
      },
      getData: function () {
        this.pageNum -= 1
        Api.Works.WorkList({
          sortField: 'createdDt',
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          order: 'desc',
          status: 2,
          category: this.category
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          let data = result ? JSON.parse(result) : ''
          if (!data) {
            return
          }
          let works = []
          data.results.forEach((work) => {
            work.checked = false
            works.push(work)
          })
          this.workData = works
          this.total = data.totalRecord
        })
      },
      typeFilter: function (type) {
        let _self = this
        this.types.forEach(function (t, i) {
          t['selected'] = false
          if (t.id === type.id) {
            _self.types.splice(i, 1)
          }
        })
        type['selected'] = true
        this.types.unshift(type)
        this.category = type.id
        this.pageNum = 1
        this.getData()
      },
      checkedAll: function () {
        this.checkedAllValue = !this.checkedAllValue
        for (let i = 0; i < this.workData.length; i++) {
          this.workData[i]['checked'] = this.checkedAllValue
        }
      },
      paging: function (val) {
        this.pageNum = val
        this.getData()
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    mounted: function () {
      this.setMinHeight(this.$refs.container, document.body.clientHeight - 50 - 132)
    },
    created: function () {
      this.getData()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .works-list {
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
      width: 960px;
      min-height: 666px;
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
        position: relative;
        label {
          margin-left: 30px;
          line-height: 76px;
          font-weight: 400;
        }
      }
      .types-filter {
        position: absolute;
        top: 16px;
        display: inline-block;
        height: 38px;
        z-index: 100;
        margin-left: 20px;
        color: #515151;
        line-height: 38px;
        overflow: hidden;
        border: 1px solid #9e9e9e;
        border-radius: 5px;
        background: #fff;
        .drop-down {
          position: absolute;
          top: 13px;
          right: 6px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 10px solid #515151;
        }
        .type {
          width: 138px;
          padding-left: 1em;
          border-bottom: 1px solid #9e9e9e;
          &:last-child {
            border: 0;
          }
          &.candidate:hover {
            cursor: pointer;
            background: rgba(139, 195, 74, .2);
          }
        }
        &:hover {
          height: auto;
          .drop-down {
            transform: rotate(180deg);
            transition: all 0.5s;
          }
        }
      }
      .manager {
        float: right;
        margin-right: 20px;
        line-height: 76px;
        a {
          margin-left: 20px;
          color: #A00912;
          font-size: 16px;
          font-weight: 400;
          outline: 0;
          &:hover {
            color: #a9372d;
          }
        }
      }
      .works-list {
        width: 892px;
        padding: 0 34px;
        overflow: hidden;
        .works-container {
          width: 948px;
          overflow: hidden;
        }
      }
      .woks-data {
        position: relative;
        float: left;
        width: 260px;
        margin-right: 56px;
        overflow: hidden;
        .img-box {
          position: relative;
          display: table-cell;
          vertical-align: middle;
          width: 258px;
          height: 195px;
          border: 1px solid #dedede;
          border-radius: 5px;
          overflow: hidden;
          background: rgba(229, 229, 229, .5);
          .checkbox-work {
            position: absolute;
            top: 4px;
            right: 8px;
          }
        }
        img {
          display: block;
          max-height: 100%;
          max-width: 100%;
          margin: 0 auto;
          transition: all ease-out 0.5s;
          &:hover {
            cursor: pointer;
            transform: scale(1.2);
          }
        }
        .title {
          display: block;
          margin-top: 8px;
          color: #303030;
          font-size: 14px;
          font-weight: 400;
        }
        .time, .type {
          display: block;
          color: #cbcbcb;
          font-size: 12px;
        }
        .type {
          margin-bottom: 28px;
        }
        .buy-btn {
          position: absolute;
          right: 10px;
          bottom: 28px;
          display: block;
          padding: 0 .8em;
          background: #a00912;
          color: #fff;
          font-size: 14px;
          line-height: 1.8;
          border-radius: 3px;
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
