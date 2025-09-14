<template>
  <div class="statistics-container">
    <!-- 页面标题 -->
    <h2 class="page-title">统计报表</h2>

    <div class="stats-grid">
      <!-- 左侧：使用频率图表 -->
      <el-card class="chart-card">
        <div class="card-title">会议室使用频率（近7天）</div>
        <div ref="usageChart" class="chart"></div>
      </el-card>

      <!-- 右侧：使用比例图表 -->
      <el-card class="chart-card">
        <div class="card-title">会议室使用比例</div>
        <div ref="ratioChart" class="chart"></div>
      </el-card>
    </div>

    <!-- 下方：统计卡片 -->
    <div class="summary-cards">
      <el-card class="summary-card">
        <div class="card-value">42</div>
        <div class="card-label">本月总预约</div>
      </el-card>
      <el-card class="summary-card">
        <div class="card-value">18</div>
        <div class="card-label">已完成会议</div>
      </el-card>
      <el-card class="summary-card">
        <div class="card-value">3</div>
        <div class="card-label">取消预约</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "StatisticsReport",
  mounted() {
    this.initUsageChart();
    this.initRatioChart();
  },
  methods: {
    // 折线图：会议室使用频率
    initUsageChart() {
      const chart = echarts.init(this.$refs.usageChart);
      chart.setOption({
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: { type: "value" },
        series: [
          {
            data: [5, 8, 6, 10, 12, 7, 9],
            type: "line",
            smooth: true,
            areaStyle: { color: "#409EFF33" },
            itemStyle: { color: "#409EFF" },
          },
        ],
      });
    },

    // 饼图：会议室使用比例
    initRatioChart() {
      const chart = echarts.init(this.$refs.ratioChart);
      chart.setOption({
        tooltip: { trigger: "item" },
        legend: { bottom: 0 },
        series: [
          {
            type: "pie",
            radius: "65%",
            data: [
              { value: 12, name: "会议室 A" },
              { value: 9, name: "会议室 B" },
              { value: 6, name: "会议室 C" },
              { value: 4, name: "会议室 D" },
            ],
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
.statistics-container {
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

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.chart-card {
  padding: 16px;
  border-radius: 12px;
}

.card-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: #555;
}

.chart {
  width: 100%;
  height: 300px;
}

.summary-cards {
  display: flex;
  gap: 24px;
}

.summary-card {
  flex: 1;
  text-align: center;
  border-radius: 12px;
  padding: 20px;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 6px;
}

.card-label {
  font-size: 14px;
  color: #666;
}
</style>
