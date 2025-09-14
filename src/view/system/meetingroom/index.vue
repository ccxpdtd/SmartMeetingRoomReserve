<template>
  <div class="room-management">
    <div class="top-bar">
      <el-button type="primary" @click="addRoom">添加会议室</el-button>
      <el-input type="text" autocomplete="off" style="margin-left:10px;width:170px;" placeholder="搜索会议室"
        v-model="searchKey" />
    </div>

    <div class="table-wrapper">
      <el-table :data="filusers" stripe style="width: 100%">
        <el-table-column prop="name" label="会议室名称" width="150" align="center" />
        <el-table-column prop="floor" label="楼层" width="100" align="center" />
        <el-table-column prop="capacity" label="容量" width="100" align="center" />
        <el-table-column prop="state" label="状态" width="100" align="center" />
        <el-table-column prop="equipment" label="设备配置" align="center" />
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" circle @click="editRoom(scope.row)"></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" circle
              @click="deleteRoom(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 使用 RoomForm 子组件 -->
    <div class="room-form">
      <RoomForm :title="dialogTitle" :visible.sync="dialogVisible" :formData="form" @save="saveRoom" />
    </div>
  </div>
</template>

<script>
import RoomForm from "./roomform/index.vue";

export default {
  name: "RoomManagement",
  components: { RoomForm },
  data() {
    return {
      searchKey: '',
      dialogVisible: false,
      dialogTitle: "添加会议室",
      form: {}
    };
  },
  computed: {
    rooms() {
      return this.$store.state.rooms
    },
    filusers() {
      return this.rooms.filter(room => room.name.indexOf(this.searchKey) !== -1)
    }
  },
  mounted() {
    this.getRooms()
  },
  methods: {
    async getRooms() {
      const res = await this.$store.dispatch("get", { url: "/api/get_rooms" });
      if (res.data.code !== 200) {
        this.$message.error(res.data.msg || "获取会议室失败");
      }
    },
    addRoom() {
      this.dialogTitle = "添加会议室";
      this.form = {
        id: null,
        name: "",
        floor: "",
        capacity: null,
        state: "空闲",
        equipment: "",
        remark: ""
      };
      this.dialogVisible = true;
    },
    editRoom(row) {
      this.dialogTitle = "编辑会议室";
      this.form = { ...row };
      this.dialogVisible = true;
    },
    async saveRoom(form) {

      const res = await this.$store.dispatch('post', { url: '/api/admin/update_room', payload: form })
      if (res.data.code === 200) {
        this.dialogVisible = false;
        this.$message.success(res.data.msg)
        this.getRooms()
      } else
        this.$message.error(res.data.msg)



    },
    async deleteRoom(id) {
      const res = await this.$store.dispatch('post', { url: '/api/admin/delete_room', payload: id });
      if (res.data.code === 200) {
        this.$message.success(res.data.msg)
        this.getRooms()
      } else
        this.$message.error(res.data.msg)
    }
  }
};
</script>

<style scoped>
.room-management {
  padding: 20px;
  /* background: #f5f7fa; */
  border-radius: 12px;

  .top-bar {
    margin-bottom: 16px;
  }

  .table-wrapper {
    background: #fff;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }


}
</style>
