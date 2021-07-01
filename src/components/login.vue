<style lang="less">
.login_main {
  margin-top: 45vh;
  margin-left: calc(50vw - 130px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 260px;
}
</style>
<template>
  <div v-loading="loading"
       class="login_main">
    <el-input placeholder="请输入密码"
              v-model="input"
              show-password
              @keydown.enter.native="login"></el-input>
    <el-button style="margin-top:20px;"
               type="primary"
               size="mini"
               @click="login">登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      loading: false,
    }
  },
  methods: {
    login() {
      if (!this.input) {
        this.$message.error('请输入密码。')
        return
      }
      this.loading = true
      this.$axios
        .post(`${this.urls}login`, { password: this.input })
        .then((res) => {
          this.$router.push({ path: '/home' })
          console.log(res)
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('密码错误!请重试。')
          this.loading = false
        })
    },
  },
}
</script>