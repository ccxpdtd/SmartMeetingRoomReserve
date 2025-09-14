<template>
  <el-dialog :title="user ? '编辑用户' : '添加用户'" :visible="internalVisible" width="400px" @close="close">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username" :disabled="!!user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formData.role">
          <el-option label="admin" value="admin"></el-option>
          <el-option label="user" value="user"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    user: { type: Object, default: null },
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
        role: "user"
      },
      internalVisible: this.visible
    };
  },
  mounted() {


  },
  watch: {

    // 监听父组件传入的 visible prop
    visible(val) {
      // 当父组件控制弹窗显示/隐藏时，更新内部状态 internalVisible
      // 保证弹窗可以响应父组件的变化
      this.internalVisible = val;
    },

    // 监听组件内部的 internalVisible
    internalVisible(val) {
      // 当 internalVisible 变为 false（弹窗关闭）时，通知父组件更新 visible
      // 避免直接修改 props，遵循 Vue 单向数据流原则
      if (!val) this.$emit("update:visible", false);
    },

    // 监听传入的 user 对象（用于编辑或添加用户）
    user: {
      handler(newVal) {
        if (newVal) {
          // 如果传入了用户对象（编辑），则将表单数据初始化为该用户信息
          this.formData = { ...newVal };
        } else {
          // 如果没有传入用户对象（添加），则清空表单，默认角色为 'user'
          this.formData = { username: "", password: "", role: "user" };
        }
      },
      // immediate: true 表示组件初始化时立即执行一次 handler
      // 保证弹窗打开时表单数据正确显示
      immediate: true
    }
  },

  methods: {
    resetForm() {
      this.formData = { username: "", password: "", role: "user" };
    },
    close() {
      this.internalVisible = false; // 触发 watcher 通知父组件
    },
    async submitForm() {

      const url = this.user ? '/api/admin/update_user' : '/api/admin/add_user';
      const res = await this.$store.dispatch('post', { url, payload: this.formData });
      if (res.data.code === 200) {
        this.$message.success(this.user ? "修改成功" : "添加成功");
        // 通知父组件操作成功，父组件可以刷新列表等
        this.$emit("success");
        // 调用 close 方法关闭弹窗
        this.close();
      } else
        this.$message.error(res.data.msg);

    }
  }
};
</script>
