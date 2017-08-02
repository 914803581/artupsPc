<template>
  <div class="material-list">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">我的素材</h2>
          <div class="operation">
            <div class="manager">
              <a href="javascript:void(0);" v-show="!managerIng" @click="managerIng=true" class="manager-btn">管理</a>
              <a href="javascript:void(0);" v-show="managerIng" class="manager-btn">全选</a>
              <a href="javascript:void(0);" v-show="managerIng" @click="managerIng=false" class="manager-btn">删除</a>
            </div>
          </div>
          <div class="works-list">
            <div class="works-container">
              <div class="woks-data" v-for="material in materialData" :key="material.id">
                <div class="img-box">
                  <img :src="material.showPath">
                </div>
                <span class="time">{{material.createTime | time}}</span>
              </div>
            </div>
          </div>
          <el-pagination
            small="false"
            layout="prev, pager, next"
            :total="50000">
          </el-pagination>
        </div>
        <left-menu selected="material"></left-menu>
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
        materialData: []
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
        this.materialData.push({
          'id': '8f5b551daa3640a08ec768e11b9081be',
          'name': null,
          'storagePath': 'http://testboss.artup.com//origin/645/0ff87cd6be7a32932bbaab98210e768324d23996befee595ef4f0ccb3d519aaa16108eb5083f437e0ecb27684fd46bbf1484623385307.JPG',
          'showPath': 'http://testboss.artup.com//material/thumb/2017/01/17/8f5b551daa3640a08ec768e11b9081be_360-240.jpg',
          'createTime': 1484623386000,
          'pixel': '3264X2448',
          'picSize': 1153434,
          'shootEqu': 'iPhone 6',
          'shootLens': null,
          'shootBurnt': '83/20',
          'aperture': '7983/3509',
          'iso': '100',
          'colorMode': '1',
          'shutter': '253/50',
          'resolvingPower': '72/1',
          'userId': '8dab7dbe6d094347ac8d2af61c4b194a',
          'ext': null,
          'ext2': null,
          'tagName': null,
          'meteringMode': null,
          'exposureProgram': null,
          'shootDate': null
        })
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  @import "~cube.css/src/scss/neat.scss";

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
        .time {
          display: block;
          margin: 10px 0 28px;
          color: #cbcbcb;
          font-size: 12px;
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
