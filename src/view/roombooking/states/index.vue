<template>
  <div class="room-detail-wrapper">
    <div class="card-container">
      <!-- 左侧信息卡片 -->
      <RoomInfoCard :room="handleRoom" />
      <!-- 右侧预约卡片 -->
      <RoomReserveCard :id="Number(this.$route.query.id)" />
    </div>
  </div>
</template>

<script>
import RoomInfoCard from './roominfo/index.vue'
import RoomReserveCard from './roomreserve/index.vue'

export default {
  name: 'RoomDetail',
  components: {
    RoomInfoCard,
    RoomReserveCard
  },
  data() {
    return {
      // room: {},
      // handleRoom: {}
    }
  },
  computed: {
    users() {
      return this.$store.state.usersData.users
    },
    room() {
      return this.$store.state.rooms.find(item => item.id === Number(this.$route.query.id))
    },
    reservations() {
      return this.$store.state.reservations.filter(item => item.room_id === this.room.id)
    },
    handleRoom() {
      let handleReservations = []

      const equipmentArr = this.room.equipment
        ? this.room.equipment.split(' ')
        : [];

      this.reservations.forEach(item => {
        handleReservations.push({
          id: item.id,
          date: item.reservation_date || '',
          timeRange: item.start_time + ' - ' + item.end_time,
          user_name: this.users.find(u => u.id === item.user_id).username,
          reason: item.reason,
          state: item.state === 0 ? '未开始' : item.state === 1 ? '正在进行' : '已结束'
        })
      });
      return {
        ...this.room,
        equipment: equipmentArr,
        recentReservations: handleReservations
      }
    }

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.room-detail-wrapper {
  padding: 25px;
}

.card-container {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  /* 小屏幕适配 */
  justify-content: center;
  /* 水平居中 */
}

/* 响应式适配：小屏幕下双卡片上下排列，均占满宽度 */
@media (max-width: 992px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .info-card,
  .reserve-card {
    flex: none;
    width: 100%;
    max-width: 500px;
  }
}
</style>
