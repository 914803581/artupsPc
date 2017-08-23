<template>
  <div class="address-add">
    <unify-header></unify-header>
    <div class="container">
      <div class="wrapper">
        <div class="main">
          <h2 class="title">添加地址</h2>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="addition-form">
            <el-form-item label="收货人" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="province">
              <el-select v-model="ruleForm.province" placeholder="请选择省份">
                <el-option
                  :label="province.name"
                  :value="province.id+''"
                  :key="province.id"
                  v-for="province in region"
                ></el-option>
              </el-select>
              <el-select v-show="city" v-model="ruleForm.city" placeholder="请选择城市" prop="city">
                <el-option
                  :label="city.name"
                  :value="city.id+''"
                  :key="city.id"
                  v-for="city in city"
                ></el-option>
              </el-select>
              <el-select v-show="county" v-model="ruleForm.county" placeholder="请选择区县" prop="county">
                <el-option
                  :label="county.name"
                  :value="county.id+''"
                  :key="county.id"
                  v-for="county in county"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮政编码">
              <el-input v-model="ruleForm.postcode"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="addition">
              <el-input type="textarea" v-model="ruleForm.addition"></el-input>
            </el-form-item>
            <el-form-item class="submit-item">
              <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <left-menu selected="address"></left-menu>
      </div>
    </div>
    <unify-footer></unify-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import region from 'data/region.json'
  import Header from 'components/header/header'
  import Footer from 'components/footer/footer'
  import LeftMenu from 'components/center/menu'
  import Api from '@/api.js'

  export default {
    data: function () {
      return {
        region: region,
        city: '',
        county: '',
        ruleForm: {
          name: '',
          province: '',
          city: '',
          county: '',
          postcode: '',
          phone: '',
          addition: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入收货人姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          county: [
            {required: true, message: '请选择区县', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'}
          ],
          addition: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    components: {
      'unify-header': Header,
      'unify-footer': Footer,
      'left-menu': LeftMenu
    },
    watch: {
      'ruleForm.province': function (val) {
        val = val - 0
        this.city = null
        this.ruleForm.city = ''
        this.region.forEach((province) => {
          if (province.id === val && province.venue) {
            this.city = province.venue
          }
        })
      },
      'ruleForm.city': function (val) {
        val = val - 0
        this.county = null
        if (!this.city) {
          return
        }
        this.ruleForm.county = ''
        this.city.forEach((city) => {
          if (city.id === val && city.venue) {
            this.county = city.venue
          }
        })
      }
    },
    created: function () {
      console.log(region)
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">
  @import "~cube.css/src/scss/neat.scss";

  .address-add {
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
    }
    .addition-form {
      padding-top: 20px;
      width: 700px;
      .submit-item {
        text-align: center;
      }
      .submit-btn {
        background: #a00912;
        border: 0;
      }
    }
  }

</style>
