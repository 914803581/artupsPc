<template>
  <footer class="unify-footer">
    <div class="internal-links">
      <div class="wrapper">
        <ul class="links">
          <li class="item" v-for="item in internalLinks">
            <a :href="item.link">{{item.label}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright-info">
      <div class="wrapper">
        <span class="copyright">Copyright ©2002-2016 www.artup.com. All rights reserved.</span>
        <div class="records">
          <a href="http://www.miitbeian.gov.cn/" target="_blank" class="icp">京ICP备13034505号-1 </a>
          <a href="http://www.beian.gov.cn/" target="_blank" class="beijing-police">京公网安备11011302000949-1 </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        internalLinks: [{
          label: '关于我们',
          link: '/user.html#/lableCgyc'
        }, {
          label: '帮助中心',
          link: '/user.html#/lableGmlc'
        }, {
          label: '商务合作',
          link: '/user.html#/lableSwhz'
        }, {
          label: '服务条款',
          link: '/user.html#/lableFwtk'
        }, {
          label: '站点地图',
          link: '/user.html#/lableMap'
        }]
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .unify-footer {
    .wrapper {
      width: 1152px;
      margin: 0 auto;
      font-size: 0;
    }
    .links {
      text-align: center;
      .item {
        display: inline-block;
        margin-left: 66px;
        font-size: 16px;
        font-weight: 400;
        line-height: 64px;
        &:first-child {
          margin-left: 0;
        }
        a {
          color: #2d2d2d;
          &:hover {
            color: #484848;
          }
        }
      }
    }
    .internal-links {
      background: #e5e5e5;
    }
    .copyright-info {
      background: #333333;
      .copyright, .icp, .beijing-police {
        color: #a6a6a6;
        font-size: 16px;
        cursor: pointer;
        line-height: 68px;
        &:hover {
          color: #dadada;
        }
      }
      .icp {
        margin-right: 40px;
      }
      .records {
        float: right;
      }
    }
  }

</style>
