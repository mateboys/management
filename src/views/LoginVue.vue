<template>
  <div>
    <div :style="bgImage" class="bg-image"></div>
    <el-row type="flex" justify="center">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h2>杰希物流后台管理系统</h2>
        </div>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名:" prop="username">
              <el-input v-model.trim="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model.trim="ruleForm.password" @keyup.enter.native="login"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="login" :loading="loading">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { post } from '@/utils/http'
import { setToken } from '@/utils/auth'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      bgImage: {
        backgroundImage: 'url(' + require('../assets/bg.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^\w{4,8}$/, message: '用户名必须是4-8位的数字字母组合', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\w{4,8}$/, message: '密码必须是4-8位的数字字母组合', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setRole']),
    login() {
      //对整个表单进行校验
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //登录逻辑
          this.loading = true
          post('/login', this.ruleForm)
            .then(res => {
              // axios({
              //     url: 'http://localhost:8080/login',
              //     method: 'post',
              //     data: this.ruleForm,
              //     //data:{
              //     //    username:this.ruleForm.username,
              //     //    password:this.ruleForm.password
              //     // }
              this.loading = false
              setToken(res.token) //将token存入cookie
              this.setRole(res.role) //将角色存入vuex
              sessionStorage.setItem('nickname', res.nickname)
              this.$router.push({ path: '/index' })
              console.log('true', res)
            })
            .catch(error => {
              this.loading = false
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 500px;
  margin-bottom: 20px;
  margin-top: 200px;
  h2 {
    text-align: center;
  }
}
// 背景图片
.bg-image {
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
}
</style>
