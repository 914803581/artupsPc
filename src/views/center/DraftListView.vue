<template>
  <div class="draft-list">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">草稿箱</h2>
          <div class="operation">
            <div class="manager">
              <a href="javascript:void(0);" v-show="!managerIng" @click="managerIng=true" class="manager-btn">管理</a>
              <a href="javascript:void(0);" v-show="managerIng" class="manager-btn">全选</a>
              <a href="javascript:void(0);" v-show="managerIng" @click="managerIng=false" class="manager-btn">删除</a>
            </div>
          </div>
          <div class="works-list">
            <div class="works-container">
              <div class="woks-data" v-for="work in workData" :key="work.id">
                <div class="img-box">
                  <img :src="work.imgPath" :alt="work.name" :title="work.name">
                </div>
                <label class="title">{{work.name}}</label>
                <span class="time">{{work.createTime | time}}</span>
                <span class="type">{{work.typeName}} {{work.size}} mm</span>
                <a href="javascript:void(0);" class="buy-btn">继续编辑</a>
              </div>
            </div>
          </div>
          <el-pagination
            small="false"
            layout="prev, pager, next"
            :total="50000">
          </el-pagination>
        </div>
        <left-menu selected="draft"></left-menu>
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
        managerIng: false,
        types: [{
          id: '-1',
          text: '所有类型',
          selected: true
        }, {
          id: 'kuanghua',
          text: '框画'
        }, {
          id: 'haibao',
          text: '海报'
        }, {
          id: 'citiehua',
          text: '磁贴画'
        }, {
          id: 'huace',
          text: '画册'
        }],
        workData: []
      }
    },
    methods: {
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
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
      for (let i = 0; i < 9; i++) {
        this.workData.push({
          id: '475bb8d4c5874f69810c30bdb4733e74',
          name: '未命名 2017-05-15 16:02',
          skuCode: 'B01004',
          material: null,
          size: '500*400',
          worksType: 'haibao',
          isrelease: null,
          createTime: 1494835379000,
          page: null,
          imgPath: 'http://testpcbuilder.artup.com/upload/475bb8d4c5874f69810c30bdb4733e741494835379.jpg',
          price: 40,
          ext: 'web',
          ext2: null,
          ext3: null,
          userId: '8dab7dbe6d094347ac8d2af61c4b194a',
          pdfPath: null,
          isRedo: null,
          productId: null,
          typeName: '海报',
          attribute: null,
          swfUrl: null
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  @import "~cube.css/src/scss/neat.scss";

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
      .number{
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
