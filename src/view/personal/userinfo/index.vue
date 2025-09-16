<template>
  <div class="profile-page" style="padding: 20px; max-width: 600px; margin: auto;">
    <el-card class="box-card">

      <el-descriptions title="用户信息" :column=1 border>
        <el-descriptions-item label="用户ID">{{ user.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ user.role }}</el-descriptions-item>
      </el-descriptions>

      <div style="text-align: center; margin-top: 20px;">
        <el-button type="primary" @click="editProfile">编辑信息</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserInfo",
  computed: {
    ...mapState({
      user: state => state.userInfo
    })
  },

  methods: {
    editProfile() {
      // 可跳转到修改密码或编辑信息页面
      this.$router.push("/profile/edit");
    }
  }
};
</script>

<style scoped>
.profile-page .box-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
