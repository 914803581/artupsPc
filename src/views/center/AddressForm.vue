<template>
  <div class="address-form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
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
            :value="county.name"
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
        <el-button class="submit-btn" type="primary" @click="submitForm('ruleForm')">{{dbId ? '确认修改' : '立即创建'}}
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import region from 'data/region.json'
  import Api from '@/api.js'

  export default {
    props: {
      dbId: {
        type: String,
        default: ''
      },
      returnUrl: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        region: region,
        city: '',
        county: '',
        ruleForm: {
          name: '',
          province: '',
          provinceText: '',
          city: '',
          cityText: '',
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
            {required: true, message: '请填写手机号', trigger: 'blur'},
            {min: 11, message: '手机号长度为11位', trigger: 'blur'}
          ],
          addition: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getCallbackPage: function () {
        let callbackPage = this.returnUrl
        if (!callbackPage) {
          callbackPage = '/center/address.html'
        }
        return callbackPage
      },
      submitForm(formName) {
        let _self = this
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return
          }
          let form = this.ruleForm
          if (this.dbId) {
            Api.Address.Edit({
              dbId: this.dbId,
              name: form.name,
              mobile: form.phone,
              province: [form.provinceText, form.cityText, form.county].join(','),
              address: form.addition,
              mainAddr: 'Y'
            }).then((result) => {
              return result.status === 200 ? result.request.response : ''
            }).then((result) => {
              result = JSON.parse(result)
              if (result.code === 'success') {
                this.$alert('修改成功', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                    localStorage.removeItem(`Address${_self.dbId}`)
                    location.href = _self.getCallbackPage()
                  }
                })
              }
            })
            return
          }
          Api.Address.Add({
            name: form.name,
            mobile: form.phone,
            province: [form.provinceText, form.cityText, form.county].join(','),
            address: form.addition,
            mainAddr: 'Y'
          }).then((result) => {
            return result.status === 200 ? result.request.response : ''
          }).then((result) => {
            result = JSON.parse(result)
            if (result.code === 'success') {
              this.$alert('添加成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  location.href = _self.getCallbackPage()
                }
              })
            }
          })
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      fillEditData: function (dbId) {
        let _self = this
        let address = localStorage[`Address${dbId}`]
        if (!address) {
          location.href = this.getCallbackPage()
        }
        address = JSON.parse(address)
        let provinceArray = address.province
        if (provinceArray) {
          provinceArray = provinceArray.split(',')
        }
        this.ruleForm = {
          name: address.name,
          province: '',
          provinceText: provinceArray ? provinceArray[0] : '',
          city: '',
          cityText: provinceArray && provinceArray.length >= 2 ? provinceArray[1] : '',
          county: provinceArray && provinceArray.length >= 3 ? provinceArray[2] : '',
          postcode: '',
          phone: address.mobile,
          addition: address.address
        }
        let citys = null
        if (this.ruleForm.provinceText) {
          for (let i = 0; i < this.region.length; i++) {
            let item = this.region[i]
            if (item.name === _self.ruleForm.provinceText) {
              citys = item.venue
              _self.ruleForm.province = item.id + ''
              break
            }
          }
          if (this.ruleForm.cityText && citys) {
            for (let i = 0; i < citys.length; i++) {
              let item = citys[i]
              if (item.name === _self.ruleForm.cityText) {
                this.ruleForm.city = item.id + ''
                break
              }
            }
          }
        }
      }
    },
    watch: {
      'ruleForm.province': function (val) {
        this.city = null
        let _self = this
        this.region.forEach((province) => {
          if (province.id === val - 0) {
            _self.ruleForm.provinceText = province.name
            _self.city = province.venue ? province.venue : null
            if (_self.ruleForm.city) {
              let count = 0
              _self.city.forEach((item) => {
                if (item.id + '' === _self.ruleForm.city) {
                  count++
                }
              })
              if (!count) {
                _self.ruleForm.city = ''
              }
            }
          }
        })
      },
      'ruleForm.city': function (val) {
        let _self = this
        this.county = null
        if (!this.city) {
          return
        }
        this.city.forEach((city) => {
          if (city.id === val - 0) {
            _self.ruleForm.cityText = city.name
            _self.county = city.venue ? city.venue : null
            if (_self.ruleForm.county) {
              let count = 0
              _self.county.forEach((item) => {
                if (item.name === _self.ruleForm.county) {
                  count++
                }
              })
              if (!count) {
                _self.ruleForm.county = ''
              }
            }
          }
        })
      }
    },
    created: function () {
      if (this.dbId) {
        this.fillEditData(this.dbId)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/sass">

  .address-form {
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

</style>
