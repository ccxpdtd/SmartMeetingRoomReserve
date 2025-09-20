<template>
  <div class="my-reservations-container">

    <!-- 预约列表表格 -->
    <el-card class="table-card">
      <el-table :data="handlePersonalReservations" border style="width: 100%">
        <el-table-column prop="room_name" label="会议室" width="120" align="center" />
        <el-table-column label="日期" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row && scope.row.date ? formatDate(scope.row.date) : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="timeRange" label="时间段" width="200" align="center" />
        <el-table-column prop="reason" label="预约事由" align="center" />

        <!-- 状态列 -->
        <el-table-column label="状态" width="120" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === '未开始'
              ? 'success' : 'danger'">
              {{ scope.row.state }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-popconfirm title="您确定要取消预约吗？" @confirm="cancelReservation(scope.row)">
              <el-button type="danger" size="small" slot="reference">取消预约</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>


      </el-table>
    </el-card>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: "AllBookings",
  data() {
    return {
      user_id: Number(localStorage.getItem('userId')),
    };
  },
  computed: {
    rooms() {
      return this.$store.state.rooms
    },
    reservations() {
      return this.$store.state.reservations
    },
    handlePersonalReservations() {
      let a = []
      this.reservations.forEach(item => {
        a.push({
          id: item.id,
          room_name: this.rooms.find(room => room.id === item.room_id).name,
          date: item.reservation_date || '',
          timeRange: item.start_time + ' - ' + item.end_time,
          reason: item.reason,
          state: item.state === 0 ? '未开始' : item.state === 1 ? '正在进行' : '已结束'
        })
      });
      return a
    }
  },
  mounted() {
    this.getReservations()
  },
  methods: {
    async getReservations() {
      const url = '/api/get_reservations'
      const res = await this.$store.dispatch("get", { url });
      if (res.data.code !== 200)
        this.$message.error(res.data.msg)
    },

    async cancelReservation(reservation) {
      const room_id = this.rooms.find(item => item.name === reservation.room_name).id
      const payload = { id: reservation.id, rid: room_id }
      const res = await this.$store.dispatch('post', { url: '/api/delete_reservation', payload });
      if (res.data.code === 200) {
        this.$message.success(res.data.msg)
        this.getReservations()
      } else
        this.$message.error(res.data.msg)
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    },
  }
};
</script>

<style scoped>
.my-reservations-container {
  padding: 24px;
  min-height: 100vh;
}

.table-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
}
</style>
