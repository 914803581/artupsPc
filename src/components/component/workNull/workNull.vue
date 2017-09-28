<template>
  <div v-show="workNulls" id="workNull">
      <div class="text_msg">
        <i class="iconfont">&#xe611;</i>
        <span>{{text_title}}</span>
        <span>{{text_Msg}}</span>
      </div>
      <div class="div_cp">
        <ul>
          <li><a href="/album.html?category=huace&defDbId=9de2973d-3487-4b05-b556-b9b92dd75493"><img src="../../../assets/img/p_user_hander.jpg" alt=""><p>艺术画册</p></a></li>
          <li><a href="/desk.html?category=taili&defDbId=f80b4c98-15ca-4da0-b482-0c8270c2eac6"><img src="../../../assets/img/p_user_hander.jpg" alt=""><p>艺术台历</p></a></li>
          <li><a href="/album/imgEditMsg?category=baobaoshu&tplCode=pc_baobaoshu_170-235_24&defDbId=7ad740df-0b81-418f-b4b5-c078ef580b47"><img src="../../../assets/img/p_user_hander.jpg" alt=""><p>小时光</p></a></li>
          <li><a href="/framed-pictures.html?category=kuanghua&defDbId=6afedcf6-b0e4-447d-afd9-c70449f42f50"><img src="../../../assets/img/p_user_hander.jpg" alt=""><p>艺术框画</p></a></li>
          <li><a href="/poster.html?category=haibao&defDbId=d6e44ca4-511f-41d5-87df-d8d75a491c09"><img src="../../../assets/img/p_user_hander.jpg" alt=""><p>艺术海报</p></a></li>
          <li><a href="/heji.html?category=heji&defDbId=5ea5e91b-21fd-481f-ab11-c767b19eed53&tplCode=pc_heji_500X350_10"><img src="../../../assets/img/p_user_hander.jpg" alt=""><p>艺术合集</p></a></li>
        </ul>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'work-null',
    data() {
      return {
        workNulls: true,
        text_title:"空空如也",
        text_Msg:"快去下面选购您中意的产品吧！"
      }
    },
    props: ["Null_title"],
    methods: {
      openModel() {
        this.workNulls = true;
      },
      created() {

      },
      watch: {
        workNull: "openModel"
      },
      mounted() {
//          this.workNulls = this.workNull;
//          this.text_title= this.Null_title

      }
    }
  }
</script>
<style lang="less">
  #workNull{
    width: 938px;
    margin: 0 auto;
    /*border: 1px solid darkred;*/
    .text_msg{
      >i{
        display: block;
        width: 72px;
        color: #dedede;
        font-size: 72px;
        margin: 65px auto 32px;
      }
      span{
        font-size: 15px;
        line-height: 32px;
        display: block;
        text-align: center;
        color: #bcbcbc;
        letter-spacing:2px;
      }
    }
    .div_cp{//产品
      width: 100%;
      height: 196px;
      border-top: 1px solid #bebebe;
      ul{
        width: 700px;
        height: 196px;
        margin:0 auto;
        li{
          width: 116px;
          height: 196px;
          position: relative;
          overflow: hidden;
          float: left;
          a{
            display: block;
            width: 100%;
            height: 100%;overflow: hidden;
            img{
              display: block;
              width: 88px;
              height: 88px;
              margin: 42px auto 24px;
              border: 5px #fff;
              border-radius: 50%;transition: all .3s;

            }
            p{
              text-align: center;
              height: 42px;
              line-height: 42px;
              width: 100%;
              overflow: hidden;
              font-size: 14px;
              color: #333;
            }
          }
        }
        li:hover{
          p{
            color: #803636;
          }
        }
      }
    }
  }
</style>
