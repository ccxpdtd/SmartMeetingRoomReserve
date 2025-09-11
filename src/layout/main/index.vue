<template>
  <div class="content-wrapper">

    <!-- 主内容框 -->
    <div class="content-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myMain',
}
</script>

<style scoped lang="scss">
.content-wrapper {
  width: 100%;
  height: 100%;

  .content-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    /* 超出时出现竖向滚动条 */
    // background: #dfdfdf;
    box-sizing: border-box;
    padding: 25px;
  }

}
</style>