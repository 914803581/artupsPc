<template>
  <div class="draft-list">
    <unify-header></unify-header>
    <div class="container" ref="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">草稿箱</h2>
          <div class="operation">
            <div class="manager">
              <a href="javascript:void(0);" v-show="!managerIng" @click="managerIng=true" class="manager-btn">管理</a>
              <a href="javascript:void(0);" v-show="managerIng" @click="checkedAll" class="manager-btn">全选</a>
              <a href="javascript:void(0);" v-show="managerIng" @click="showDeleteDialogVisible"
                 class="manager-btn">删除</a>
            </div>
          </div>
          <div class="works-list">
            <div class="works-container">
              <div class="woks-data" v-for="(work,index) in workData" :key="work.id">
                <div class="img-box">
                  <el-checkbox v-show="managerIng" v-model="work.checked" class="checkbox-work"></el-checkbox>
                  <img :src="work.thumbnailImageUrl">
                  <!--<img :src="work.thumbnailImageUrl" :alt="work.name" :title="work.name" >-->
                </div>
                <label class="title">{{work.sku}}</label>
                <span class="time">{{work.updatedDt}}</span>
                <a @click="continueEdit(index)" href="javascript:void(0);" class="buy-btn">继续编辑</a>
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
        <left-menu selected="draft"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header.vue'
  import Footer from 'components/footer/footer.vue'
  import LeftMenu from 'components/center/menu.vue'
  import Api from '@/api.js'
  import {ALERT_CUSTOM} from 'base/js/common.config'

  export default {
    data: function () {
      return {
        checkedAllValue: false,
        managerIng: false,
        workData: [],
        pageSize: 9,
        total: 0,
        pageNum: 1
      }
    },
    methods: {
      continueEdit($index) { //继续编辑
        var textCode = this.workData[$index].sku.substr(0, 3)
//        var bbsSlsectDate = JSON.parse(sessionStorage.getItem("bbsSlsectDate"));
        var productData = {}
        console.log(JSON.stringify(this.workData[$index].sku))
        productData.colorName = JSON.stringify(this.workData[$index].sku).split(".")[1]
        productData.name = this.workData[$index].sku
        productData.skuCode = this.workData[$index].skuCode
        productData.category = this.workData[$index].category
        productData.price = this.workData[$index].price
        productData.skuId = this.workData[$index].skuId
        productData.size = JSON.stringify(this.workData[$index].sku).split(".")[2]
        productData.eqTitle = textCode + JSON.stringify(this.workData[$index].sku).split(".")[2]
        console.log(productData)
//        urlQuery 数据组装
        var urlQuery = {}
        urlQuery.category = this.workData[$index].category
        urlQuery.defDbId = this.workData[$index].defDbId
        urlQuery.tplCode = this.workData[$index].tplCode
//        存入session
        sessionStorage.setItem("bbsSlsectDate", JSON.stringify(productData))
        sessionStorage.setItem("urlQuery", JSON.stringify(urlQuery))
        if (textCode === "小时光") {
          location.href = "/album/maxImgEdit?dbId=" + this.workData[$index].dbId
          sessionStorage.setItem("titleName", "小时光")
        } else if (textCode === "画册.") {
          location.href = "/album/huaceEdit?dbId=" + this.workData[$index].dbId + "&eqTitle=" + textCode + JSON.stringify(this.workData[$index].sku).split(".")[2]
          sessionStorage.setItem("titleName", "画册")
        } else if (textCode === "旅行记") {
          location.href = "/album/travelEdit?dbId=" + this.workData[$index].dbId
          sessionStorage.setItem("titleName", "旅行记")
        } else if (textCode === "拾光集") {
          location.href = "/album/shiguangjiEdit?dbId=" + this.workData[$index].dbId
          sessionStorage.setItem("titleName", "拾光集")
        }
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
          status: 1,
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

  .draft-list {
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
        margin: 0 56px 28px 0;
        overflow: hidden;
        .img-box {
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
          line-height: 25px;
        }
        .buy-btn {
          position: absolute;
          right: 10px;
          bottom: 0;
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
