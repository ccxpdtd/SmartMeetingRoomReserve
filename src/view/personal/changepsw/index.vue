<template>
  <div class="password-wrapper">
    <el-card class="password-card">
      <h2 class="title">修改密码</h2>
      <el-form ref="passwordForm" :model="formData" :rules="rules" label-width="0" size="medium" class="password-form">
        <el-form-item prop="oldPassword">
          <el-input v-model="formData.oldPassword" type="password" placeholder="请输入旧密码" prefix-icon="el-icon-lock"
            show-password />
        </el-form-item>

        <el-form-item prop="newPassword">
          <el-input v-model="formData.newPassword" type="password" placeholder="请输入新密码" prefix-icon="el-icon-key"
            show-password />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" type="password" placeholder="请再次输入新密码" prefix-icon="el-icon-key"
            show-password />
        </el-form-item>

        <el-form-item class="btn-group">
          <el-button type="primary" class="submit-btn" @click="submitForm">
            提交修改
          </el-button>
          <el-button class="reset-btn" @click="resetForm">
            重置
          </el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "ChangePassword",
  data() {
    return {

      formData: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.formData.newPassword) {
                callback(new Error("两次输入的新密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
    })
  },
  methods: {
    async submitForm() {

      this.$refs.passwordForm.validate(async (valid) => {
        if (!valid) return;

        const url = '/api/change_psw'
        const payload = {
          username: this.username,
          oldPassword: this.formData.oldPassword,
          newPassword: this.formData.newPassword,
        }
        const res = await this.$store.dispatch('post', { url, payload })
        if (res.data.code === 200) {
          this.$message.success('修改成功，请重新登录')
          this.$router.push({ path: '/login' })
          localStorage.removeItem('token')
        } else {
          this.$message.error(res.data.msg)
        }

      });
    },
    resetForm() {
      this.$refs.passwordForm.resetFields();
    }
  }
};
</script>

<style scoped>
.password-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;

}

.password-card {
  width: 400px;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.password-form {
  margin-top: 10px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.submit-btn {
  flex: 1;
  margin-right: 10px;
  border-radius: 8px;
}

.reset-btn {
  width: 90px;
  border-radius: 8px;
}
</style>
