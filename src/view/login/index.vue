<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">智能会议室管理系统</h2>
      <p class="subtitle">请登录您的账号</p>

      <form class="login-form">
        <div class="form-group">
          <input type="text" placeholder="用户名" v-model="form.username" />
        </div>
        <div class="form-group">
          <input type="password" placeholder="密码" v-model="form.password" />
        </div>
        <button type="submit" class="login-btn" @keyup.enter="login" @click="login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "myLogin",
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      const payload = { username: this.form.username, password: this.form.password }
      const url = '/api/login'
      const res = await this.$store.dispatch('post', { url, payload })
      if (res.data.code === 200) {
        this.$message.success('登录成功')
        this.$router.push('/')
      } else
        this.$message.error(res.data.msg)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #a95aff, #4b8dfe); // 渐变背景
}

.login-card {
  width: 360px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  backdrop-filter: blur(10px);

  .title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  .subtitle {
    font-size: 14px;
    color: #666;
    margin-bottom: 25px;
  }

  .login-form {
    .form-group {
      margin-bottom: 20px;

      input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-size: 14px;
        outline: none;
        transition: all 0.3s ease;

        &:focus {
          border-color: #2575fc;
          box-shadow: 0 0 8px rgba(37, 117, 252, 0.3);
        }
      }
    }

    .login-btn {
      width: 100%;
      padding: 12px;
      font-size: 15px;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      background: linear-gradient(90deg, #a95aff, #4b8dfe);
      color: #fff;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(37, 117, 252, 0.3);
      }

      &:active {
        transform: translateY(1px);
        box-shadow: 0 3px 8px rgba(37, 117, 252, 0.2);
      }
    }
  }
}
</style>
