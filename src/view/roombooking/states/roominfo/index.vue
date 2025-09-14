<template>
  <div class="info-card">
    <!-- 状态与基础属性 -->
    <div class="info-header">

      <div class="status-tag">
        <el-tag :type="statusText(room.state)" size="medium">{{ room.state }}</el-tag>
      </div>
      <div class="info-meta">
        <span class="meta-item"><i class="el-icon-location"></i> {{ room.floor }}</span>
        <span class="meta-item"><i class="el-icon-user"></i>容纳{{ room.capacity }}人</span>
        <span class="meta-item">{{ room.name }}</span>

      </div>
    </div>

    <!-- 设备与备注 -->
    <div class="info-content">
      <div class="info-section">
        <h4 class="section-title">设备配置</h4>
        <div class="equipment-list">
          <el-tag size="mini" class="equipment-tag">高清投影</el-tag>
          <el-tag size="mini" class="equipment-tag">视频会议系统</el-tag>
          <el-tag size="mini" class="equipment-tag">电子白板</el-tag>
          <el-tag size="mini" class="equipment-tag">空调</el-tag>
        </div>
      </div>

      <div class="info-section">
        <h4 class="section-title">会议室备注</h4>
        <p class="remark-text">{{ room.remark || '该会议室支持最大 12 人团队会议，配备双屏投影，适合远程协作与方案演示，使用后请保持环境整洁。' }}</p>
      </div>

      <div class="info-section">
        <h4 class="section-title">近期预约概览</h4>
        <div class="recent-reserve">
          <div v-for="r in room.recentReservations" :key="r.id" class="reserve-item">
            <span class="reserve-time">{{ r.start_time }}-{{ r.end_time }}</span>
            <span class="reserve-user">预约人：{{ r.username }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomInfoCard',
  props: {
    room: { type: Object, required: true }
  },
  methods: {
    statusText(state) {
      switch (state) {
        case '空闲':
          return 'success'
        case '占用':
          return 'danger'
        case '已预约':
          return 'warning'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.info-card {
  flex: 1;
  min-width: 300px;
  max-width: 450px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  box-sizing: border-box;
}

.info-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;

  .status-tag {
    margin-bottom: 4px;
  }

  .info-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    color: #666;
    font-size: 14px;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}

.info-content {
  .info-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
  }

  .equipment-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .equipment-tag {
      background-color: #f0f7ff;
      color: #409eff;
      border-color: #c6e2ff;
    }
  }

  .remark-text {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }

  .recent-reserve {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .reserve-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      background-color: #fafafa;
      border-radius: 6px;
      font-size: 14px;

      .reserve-time {
        color: #333;
      }

      .reserve-user {
        color: #666;
      }
    }
  }
}
</style>
