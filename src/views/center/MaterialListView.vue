<template>
  <div class="material-list">
    <unify-header></unify-header>
    <div class="container" ref="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">我的素材</h2>
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
              <div class="woks-data" v-for="material in materialData" :key="material.id">
                <div class="img-box">
                  <el-checkbox v-show="managerIng" v-model="material.checked" class="checkbox-material"></el-checkbox>
                  <img :src="material.thumbnailUrl">
                </div>
                <span class="time">{{material.updatedDt}}</span>
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
        <left-menu selected="material"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import Footer from 'components/footer/footer'
  import LeftMenu from 'components/center/menu'
  import {ALERT_CUSTOM} from 'base/js/common.config'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {
        checkedAllValue: false,
        managerIng: false,
        pageSize: 9,
        total: 0,
        pageNum: 1,
        materialData: []
      }
    },
    methods: {
      deleteWorkList: function () {
        let deleteArr = []
        this.materialData.forEach(function (item) {
          if (item.checked) {
            deleteArr.push(item)
          }
        })
        return deleteArr
      },
      deleteMaterial: function () {
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
          this.deleteMaterial()
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
        Api.Material.MaterialData({
          sort: 'uploadDt',
          order: 'desc',
          status: 1,
          pageNum: this.pageNum
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          let data = result ? JSON.parse(result) : ''
          if (!data) {
            return
          }
          let list = []
          data.results.forEach((item) => {
            item.checked = false
            list.push(item)
          })
          this.materialData = list
          this.total = data.totalRecord
        })
      },
      checkedAll: function () {
        this.checkedAllValue = !this.checkedAllValue
        for (let i = 0; i < this.materialData.length; i++) {
          this.materialData[i]['checked'] = this.checkedAllValue
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
    watch: {},
    mounted: function () {
      this.setMinHeight(this.$refs.container, document.body.clientHeight - 50 - 132)
    },
    created: function () {
      this.getData()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .material-list {
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
      padding-bottom: 40px;
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
        margin-right: 56px;
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
          .checkbox-material {
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
        .time {
          display: block;
          margin: 10px 0 28px;
          color: #cbcbcb;
          font-size: 12px;
        }
      }
    }
    .el-pagination {
      position: absolute;
      bottom: 10px;
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
