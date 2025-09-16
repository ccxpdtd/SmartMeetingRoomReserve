<template>
  <div class="room-detail-wrapper">
    <div class="card-container">
      <!-- 左侧信息卡片 -->
      <RoomInfoCard :room="room" />
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
      room: {},
    }
  },
  mounted() {
    this.getRoomAndReservations()
  },
  methods: {
    getRoomAndReservations() {
      //获取会议室
      const id = Number(this.$route.query.id)
      this.room = this.$store.state.rooms.find(room => room.id === id)
      //获取预约记录
      // this.$store.commit('setRoom', this.room)


    }
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
