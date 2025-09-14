<template>
  <div class="my-reservations-container">
    <!-- 页面标题 -->
    <h2 class="page-title">我的预约</h2>

    <!-- 预约列表表格 -->
    <el-card class="table-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="room" label="会议室" width="120" />
        <el-table-column prop="date" label="日期" width="100" />
        <el-table-column prop="time" label="时间段" width="120" />
        <el-table-column prop="purpose" label="用途" />

        <!-- 状态列 -->
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '待使用'
              ? 'success'
              : scope.row.status === '已完成'
                ? 'info'
                : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" v-if="scope.row.status === '待使用'">修改</el-button>
            <el-button size="mini" type="danger" v-if="scope.row.status === '待使用'">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "myBookings",
  data() {
    return {
      tableData: [
        {
          room: "会议室 A",
          date: "2025-09-20",
          time: "10:00 - 11:00",
          purpose: "项目讨论",
          status: "待使用",
        },
        {
          room: "会议室 B",
          date: "2025-09-10",
          time: "14:00 - 15:30",
          purpose: "部门例会",
          status: "已完成",
        },
        {
          room: "会议室 C",
          date: "2025-09-05",
          time: "09:00 - 10:00",
          purpose: "面试安排",
          status: "已取消",
        },
      ],
    };
  },
};
</script>

<style scoped>
.my-reservations-container {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.table-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
}
</style>
