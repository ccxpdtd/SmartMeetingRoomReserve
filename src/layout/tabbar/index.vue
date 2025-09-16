<template>
  <header class="app-header">
    <div class="header-left">

      <!-- <button class="sidebar-toggle" @click="toggleSidebar">
        <i class="el-icon-menu"></i>
      </button> -->

      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item) in $route.matched" :key="item.path" :to="{ path: item.path }">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>

      </div>

    </div>

    <div class="header-right">
      <!-- 搜索框 -->
      <div class="search-box">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="搜索..." />
      </div>

      <!-- 通知图标 -->
      <div class="header-icon">
        <el-badge :value="3" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>

      <!-- 消息图标 -->
      <div class="header-icon">
        <el-badge is-dot class="item">
          <i class="el-icon-chat-line-square"></i>
        </el-badge>
      </div>

      <!-- 用户头像 -->
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="user-link">
            <img src="https://picsum.photos/id/1005/200/200" alt="用户头像" class="user-avatar">
            <span class="user-name">{{ username }}</span>
            <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">

            <el-dropdown-item command="账户设置">
              <i class="el-icon-setting"></i> 账户设置
            </el-dropdown-item>
            <el-dropdown-item divided command="退出登录">
              <i class="el-icon-switch-button"></i> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'myTabbar',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      username: state => state.userInfo.username,
      role: state => state.user.userInfo.role
    })
  },
  mounted() {

  },
  methods: {

    toggleSidebar() {

    },
    handleCommand(command) {
      if (command === '账户设置') {
        this.goToPersonal()
      } else if (command === '退出登录') {
        this.goToLogin()
      }
    },
    goToPersonal() {
      this.$router.push({ path: '/personal/user-info' })
    },
    goToLogin() {
      this.$router.push({ path: '/login' })
      localStorage.removeItem('token')
    }
  },

}
</script>

<style scoped>
.app-header {
  height: 100%;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  position: relative;
  z-index: 5;
}

.header-left {
  display: flex;
  align-items: center;
}

/* 侧边栏切换按钮 */
.sidebar-toggle {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  color: #4E5969;
  font-size: 18px;
  cursor: pointer;
  margin-right: 20px;
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  background-color: #F2F3F5;
  color: #1D2129;
}

/* 面包屑导航 */
.breadcrumb {
  font-size: 14px;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #4A6CF7;
  font-weight: 500;
}

.el-breadcrumb__separator {
  color: #C9CDD4;
  margin: 0 8px;
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
}

/* 搜索框 */
.search-box {
  position: relative;
  margin-right: 20px;
}

.search-box input {
  width: 200px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid #E5E6EB;
  background-color: #F7F8FA;
  padding-left: 34px;
  padding-right: 12px;
  font-size: 13px;
  color: #4E5969;
  transition: all 0.2s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4A6CF7;
  background-color: #FFFFFF;
  width: 240px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #86909C;
  font-size: 14px;
}

/* 头部图标 */
.header-icon {
  margin-right: 16px;
  position: relative;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4E5969;
  font-size: 18px;
  transition: all 0.2s ease;
}

.header-icon:hover {
  background-color: #F2F3F5;
  color: #1D2129;
}

.el-badge__content {
  background-color: #FF4D4F;
}

/* 用户信息 */
.user-info {
  margin-left: 10px;
}

.user-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.user-link:hover {
  background-color: #F2F3F5;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
}

.user-link:hover .user-avatar {
  border-color: #E5E6EB;
}

.user-name {
  margin: 0 8px;
  font-size: 14px;
  color: #1D2129;
  font-weight: 500;
}

.user-link i {
  font-size: 12px;
  color: #86909C;
  transition: transform 0.2s ease;
}

.user-link:hover i {
  transform: translateY(1px);
}

/* 用户下拉菜单 */
.user-dropdown {
  min-width: 160px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  border: none;
}

.el-dropdown-item {
  padding: 10px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.el-dropdown-item i {
  margin-right: 8px;
  font-size: 14px;
  color: #86909C;
}

.el-dropdown-item:hover {
  background-color: #F7F8FA;
  color: #4A6CF7;
}

.el-dropdown-item:hover i {
  color: #4A6CF7;
}
</style>