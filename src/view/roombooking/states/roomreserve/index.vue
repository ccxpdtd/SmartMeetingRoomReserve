<template>
  <div class="reserve-card">
    <h3 class="reserve-title">预约会议室</h3>
    <div class="reserve-form">
      <div class="form-item">
        <label class="form-label">预约日期</label>
        <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
          class="form-control"></el-date-picker>
      </div>

      <div class="form-item">
        <label class="form-label">预约时段</label>
        <el-time-picker value-format="HH:mm:ss" class="time-picker-range" is-range v-model="form.timeRange"
          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
      </div>

      <div class="form-item">
        <label class="form-label">预约事由</label>
        <el-input v-model="form.reason" type="textarea" placeholder="请输入会议主题/事由" rows="3"
          class="form-control"></el-input>
      </div>

      <div class="form-submit">
        <el-button type="primary" size="medium" class="submit-btn" @click="submitReservation">确认预约</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RoomReserveCard',
  props: {
    id: { type: Number, required: true }
  },
  data() {
    return {
      form: {
        date: '',
        timeRange: '',
        reason: '',
      }
    }
  },
  computed: {
    ...mapState({
      uid: state => state.userInfo.id,
    })
  },
  mounted() {

  },

  methods: {
    async submitReservation() {
      const url = '/api/reserve'
      const payload = {
        user_id: this.uid,
        room_id: this.id,
        reservation_date: this.form.date,
        start_time: this.form.timeRange[0],
        end_time: this.form.timeRange[1],
        reason: this.form.reason,
      }
      const res = await this.$store.dispatch('post', { url, payload })
      if (res.data.code === 200) {
        this.$message.success(res.data.msg)
        this.$router.push({ path: '/room-booking' })
      } else
        this.$message.error(res.data.msg)
    }
  }
}
</script>

<style scoped lang="scss">
.reserve-card {
  flex: 0 0 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  box-sizing: border-box;
}

.reserve-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.reserve-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;



  ::v-deep(.time-picker-range .el-range-separator) {
    color: #c2c7ce;
    padding: 0 14px; // 左右间距
    font-size: 14px; // 字号
  }


  .form-label {
    font-size: 14px;
    color: #333;
    font-weight: 500;

  }

  .form-control {
    width: 100%;
  }
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 8px;

  .submit-btn {
    width: 100%;
    padding: 10px 0;
  }
}
</style>
