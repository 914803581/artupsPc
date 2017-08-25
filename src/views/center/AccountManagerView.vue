<template>
  <div class="account-info">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">账户资料</h2>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="昵称" :rules="[{required:true,message:'请输入邮箱地址',trigger:'blur'}]">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="签名" :rules="[{required:true,message:'请输入邮箱地址',trigger:'blur'}]">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item v-model="form.email" prop="email" label="邮箱"
                          :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}]">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-form>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="danger" class="save-btn" @click="onSubmit">保存</el-button>
        </div>
        <left-menu selected="account"></left-menu>
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
        imageUrl: ''
      }
    },
    methods: {
      onSubmit: function () {
        console.log('ok')
      },
      handleAvatarSuccess: function (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload: function (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {},
    created: function () {
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .account-info {
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
      .el-form {
        width: 527px;
        margin-top: 20px;
      }
      .save-btn {
        display: block;
        padding: 8px 2em;
        margin: 60px auto 0;
        background: #a00912;
        border: 0;
        &:hover {
          background: #c51b25;
        }
      }
      .avatar-uploader {
        position: absolute;
        top: 120px;
        right: 100px;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }

  .el-picker-panel {
    width: 350px !important;
  }
</style>
