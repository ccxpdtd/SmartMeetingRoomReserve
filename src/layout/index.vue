<template>
  <div class="home_container">
    <div class="home_slider">
      <!-- 品牌Logo区域 -->
      <div class="sidebar-logo">
        <div class="logo-icon">
          <i class="fas fa-building"></i>
        </div>
        <span class="logo-text">智能会议室管理系统</span>
      </div>
      <!-- 菜单 -->
      <div class="sidebar-menu">
        <Slider :myRoutes="myRoutes"></Slider>
      </div>
    </div>
    <div class="home_tabbar">
      <Tabbar></Tabbar>
    </div>
    <div class="home_main">
      <Main></Main>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { jwtDecode } from "jwt-decode";

import Slider from './slider/index.vue'
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'
export default {
  name: 'myLayout',
  components: {
    Slider,
    Tabbar,
    Main
  },
  data() {
    return {
      myRoutes: []
    }
  },
  methods: {
    parsingToken() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          // 把解析出来的用户信息放进 Vuex
          this.$store.commit('setUser', {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
          })
        } catch (e) {
          console.error('Token 解析失败:', e)
        }
      }
    }
  },
  mounted() {
    //解析token
    this.parsingToken()
    //
    this.myRoutes = this.$store.state.myRoutes

  },




}
</script>

<style scoped lang="scss">
@import '../styles/variable.scss';

.home_container {
  width: 100%;
  height: 100vh;

  .home_slider {
    width: $home_slider_width;
    height: 100vh;


    /* Logo样式 */
    .sidebar-logo {
      background-color: #1a1a2e;
      height: $home_slider_logo_height;
      display: flex;
      align-items: center;
      padding: 0 15px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;

      .logo-icon {
        width: 36px;
        height: 36px;
        background-color: #4A6CF7;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        color: white;
        font-size: 18px;
      }

      .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        transition: opacity 0.3s ease;
      }
    }

    .sidebar-menu {

      height: calc(100vh - $home_slider_logo_height );
    }



  }

  .home_tabbar {
    width: calc(100% - $home_slider_width);
    height: $home_tabbar_height;
    // background-color: rgb(241, 241, 157);

    position: absolute;
    top: 0;
    left: $home_slider_width;

  }

  .home_main {
    width: calc(100% - $home_slider_width);
    height: calc(100vh - $home_tabbar_height);

    position: absolute;
    top: $home_tabbar_height;
    left: $home_slider_width;
    padding: 0 40px;

  }

}
</style>