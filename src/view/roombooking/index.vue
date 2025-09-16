<template>
  <div class="status-panel">
    <!-- 顶部筛选区 -->
    <div class="status-panel__filters">
      <el-input placeholder="搜索会议室" v-model="search" class="filter-item" />
      <el-select v-model="state" placeholder="选择状态" class="filter-item">
        <el-option label="全部状态" value="all" />
        <el-option label="空闲" value="空闲" />
        <el-option label="占用" value="占用" />
        <el-option label="已预约" value="已预约" />
      </el-select>
      <el-select v-model="floor" placeholder="选择楼层" class="filter-item">
        <el-option label="全部楼层" value="all" />
        <el-option label="一楼" value="1F" />
        <el-option label="二楼" value="2F" />
        <el-option label="三楼" value="3F" />
      </el-select>
      <el-select v-model="capacity" placeholder="容纳人数" class="filter-item">
        <el-option label="全部" value="all"></el-option>
        <el-option label="1-6 人" value="1-6"></el-option>
        <el-option label="6-12 人" value="6-12"></el-option>
        <el-option label="12 人以上" value="12+"></el-option>
      </el-select>
    </div>

    <!-- 会议室状态网格 -->
    <div class="status-panel__grid">
      <div class="room-card" v-for="room in filrooms" :key="room.id" :class="{
        'state-free': room.state === '空闲',
        'state-occupied': room.state === '占用',
        'state-reserved': room.state === '已预约'
      }" @click="goToState(room.id)">
        <div class="room-name">{{ room.name }}</div>
        <div class="room-capacity">容量：{{ room.capacity }} 人</div>
        <div class="room-status">
          <i class="status-dot"></i>
          <span>{{ room.state }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomBooking',
  data() {
    return {
      search: '',
      state: 'all',
      floor: 'all',
      capacity: 'all',
    }
  },
  computed: {
    rooms() {
      return this.$store.state.rooms
    },
    //过滤
    filrooms() {
      return this.rooms.filter(room => {
        const matchesName = room.name.indexOf(this.search) !== -1; // 关键字搜索
        const stateMatch = this.state === 'all' || room.state === this.state;//状态    
        const floorMatch = this.floor === 'all' || room.floor === this.floor;//楼层
        let capacityMatch = true;//容量

        if (this.capacity === '1-6') capacityMatch = room.capacity >= 1 && room.capacity <= 6;
        else if (this.capacity === '6-12') capacityMatch = room.capacity > 6 && room.capacity <= 12;
        else if (this.capacity === '12+') capacityMatch = room.capacity > 12;

        return matchesName && stateMatch && floorMatch && capacityMatch;
      });
    }
  },
  mounted() {
    this.getRooms()
  },
  methods: {
    async getRooms() {
      const url = "/api/get_rooms"
      const res = await this.$store.dispatch("get", { url });
      if (res.data.code !== 200) {
        this.$message.error(res.data.msg || "获取会议室失败");
      }
    },
    goToState(id) {
      this.$router.push({ name: 'States', query: { id } })
    },

  }
}
</script>

<style lang="scss" scoped>
.status-panel {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 12px;

  &__filters {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .filter-item {
      margin-right: 12px;
      min-width: 150px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;

    .room-card {
      background-color: #fff;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        cursor: pointer;
      }

      .room-name {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 8px;
      }

      .room-capacity {
        font-size: 14px;
        color: #666;
        margin-bottom: 12px;
      }

      .room-status {
        display: flex;
        align-items: center;
        font-weight: 370;
        font-size: 14px;
        color: rgb(57, 57, 57);

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
      }

      &.state-free .status-dot {
        background-color: #67c23a;
      }

      &.state-occupied .status-dot {
        background-color: #f56c6c;
      }

      &.state-reserved .status-dot {
        background-color: #e6a23c;
      }
    }
  }
}
</style>
