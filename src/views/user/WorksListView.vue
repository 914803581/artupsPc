<template>
  <div class="works-list">
    <unify-header></unify-header>
    <page-top selected="works"></page-top>
    <div class="container">
      <div class="wrapper">
        <a href="/center/works.html" class="btn btn-manager">管理我的作品</a>
        <div class="works">
          <div class="works-container">
            <div class="woks-data" v-for="work in workData" :key="work.id">
              <div class="img-box">
                <img :src="work.thumbnailImageUrl" :alt="work.sku" :title="work.sku">
              </div>
              <label class="title">{{work.name}}</label>
              <span class="time">{{work.createdDt}}</span>
              <span class="type">{{work.sku}}</span>
              <a href="javascript:void(0);" class="buy-btn">购买定制</a>
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
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import UnifyHeader from 'components/header/header'
  import UnifyFooter from 'components/footer/footer'
  import PageTop from 'components/user/top'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {
        workData: [],
        pageSize: 12,
        total: 0,
        pageNum: 1
      }
    },
    methods: {
      paging: function (val) {
        this.pageNum = val
        this.getData()
      },
      getData: function () {
        this.pageNum -= 1
        Api.Works.WorkList({
          sortField: 'createdDt',
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          order: 'desc',
          category: ''
        }).then((result) => {
          return result.status === 200 ? result.request.response : ''
        }).then((result) => {
          let data = result ? JSON.parse(result) : ''
          if (!data) {
            return
          }
          this.workData = data.results
          this.total = data.totalRecord
        })
      }
    },
    components: {
      UnifyHeader,
      UnifyFooter,
      PageTop
    },
    watch: {},
    created: function () {
      this.getData()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .works-list {
    a.btn {
      display: inline-block;
      padding: 0 1.2em;
      background: #a00912;
      line-height: 26px;
      font-size: 13px;
      color: #fff;
      border-radius: 4px;
      &:hover {
        background: #a9372d;
      }
    }
    .wrapper {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }
    .container {
      min-height: 350px;
      padding: 14px 0 92px;
      background: #f9f9f9;
    }
    .btn-manager {
      float: right;
      margin-right: 22px;
    }
    .works {
      width: 1200px;
      margin-top: 40px;
      overflow: hidden;
      .works-container {
        width: 1252px;
        overflow: hidden;
      }
    }
    .woks-data {
      position: relative;
      float: left;
      width: 260px;
      margin-right: 53px;
      overflow: hidden;
      .img-box {
        width: 258px;
        height: 195px;
        border: 1px solid #dedede;
        border-radius: 5px;
        overflow: hidden;
        background: rgba(229, 229, 229, .5);
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
    .el-pagination {
      text-align: center;
      margin: 20px 0 40px;
      button:hover {
        color: #a00912;
      }
      .el-pager li:hover {
        color: #a00912;
      }
      li {
        background: transparent;
      }
      .number {
        padding: 0 15px;
        font-size: 14px;

      }
      .number.active {
        border-color: transparent;
        color: #a00912;
      }
      button {
        background: transparent;
      }
    }
  }
</style>
