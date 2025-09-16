<template>
  <el-card class="box">
    <el-button type="primary" icon="el-icon-plus" @click="showAddUser">添加用户</el-button>
    <el-input type="text" autocomplete="off" style="margin-left:10px;width:170px;" placeholder="搜索用户名"
      v-model="searchKey" />

    <el-table style="margin:15px" :data="filusers">
      <el-table-column label="序号" width="60px" align="center" type="index"></el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="{ row }">
          {{ row.username }}
        </template>
      </el-table-column>

      <el-table-column label="密码" align="center">
        <template slot-scope="{ row, $index }">
          <span v-if="!row.changePswFlag">{{ row.password }}</span>
          <el-input v-else v-model="row.password" @keyup.enter="savePsw($index, row.id, row.password)"
            @blur="savePsw($index, row.id, row.password)"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="角色" width="80px" align="center">
        <template slot-scope="{ row }">
          {{ row.role }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="280px">
        <template slot-scope="{ row }">
          <el-popconfirm title="确定删除该用户?" @confirm="deleteUser(row.id)" style="margin-right:5px;">
            <template slot="reference">
              <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm title="确定修改用户权限?" @confirm="changeRole(row.id, row.role)">
            <template slot="reference">
              <el-button type="warning" icon="el-icon-postcard" circle size="small"></el-button>
            </template>
          </el-popconfirm>

          <el-popconfirm title="确定修改用户密码?" @confirm="showEditUser(row)" style="margin-left:5px;">
            <template slot="reference">
              <el-button type="success" icon="el-icon-edit" circle size="small"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination :current-page="pageNo" :page-size="pageSize" :page-sizes="[3, 5, 7, 9]" :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes" :total="total" @size-change="changePageSize"
      @current-change="handleCurrentChange" />

    <!-- 用户表单弹窗组件 -->
    <UserForm ref="userForm" :visible.sync="userFormVisible" :user="currentUser" @success="getUsers" />
  </el-card>
</template>

<script>
import UserForm from "./userform/index.vue";

export default {
  name: "myUser",
  components: { UserForm },
  data() {
    return {
      searchKey: "",
      pageNo: 1,
      pageSize: 5,
      userFormVisible: false,
      currentUser: null, // 传给表单组件的用户信息
    };
  },
  computed: {
    users() {
      return this.$store.state.usersData.users;
    },
    total() {
      return this.$store.state.usersData.total;
    },
    filusers() {
      return this.users.filter(user => user.username.indexOf(this.searchKey) !== -1)
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers(page = 1) {
      this.pageNo = page;
      const payload = { pageNo: this.pageNo, limit: this.pageSize };
      const res = await this.$store.dispatch('post', { url: '/api/admin/get_users', payload });
      if (res.data.code !== 200)
        this.$message.error(res.data.msg);
    },
    async deleteUser(id) {
      const res = await this.$store.dispatch('post', { url: '/api/admin/delete_user', payload: { id } });
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        this.getUsers(this.users.length > 1 ? this.pageNo : this.pageNo - 1)
      }
      else
        this.$message.error(res.data.msg);
    },
    async changeRole(id, role) {
      role = role === "admin" ? "user" : "admin";
      const res = await this.$store.dispatch('post', { url: '/api/admin/change_role', payload: { id, role } });
      if (res.data.code === 200) {
        this.$message.success(res.data.msg);
        this.getUsers(this.pageNo)
      }
      else
        this.$message.error(res.data.msg);
    },
    showAddUser() {
      this.currentUser = null;
      this.userFormVisible = true;
      // 重置表单数据，避免残留上一次的值
      this.$nextTick(() => {
        this.$refs.userForm.resetForm();
      });
    },
    showEditUser(user) {
      this.currentUser = { ...user }; // 深拷贝，防止修改列表直接变动
      this.userFormVisible = true;
    },


    handleCurrentChange(page) { this.pageNo = page; this.getUsers(page); },
    changePageSize(size) { this.pageSize = size; this.getUsers(); },
  },
};
</script>

<style scoped>
.box {
  width: 90%;
  margin: 20px auto;
}
</style>
