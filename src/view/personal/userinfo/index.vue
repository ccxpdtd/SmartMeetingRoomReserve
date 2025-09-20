<template>
  <div class="profile-page" style="padding: 20px; max-width: 600px; margin: auto;">
    <el-card class="box-card">

      <el-descriptions title="个人信息" :column=1 border>
        <el-descriptions-item label="用户ID">{{ user.id }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ user.username }}</el-descriptions-item>
        <!-- <el-descriptions-item label="角色">{{ user.role }}</el-descriptions-item> -->
      </el-descriptions>


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

  }
};
</script>

<style scoped>
.profile-page .box-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
