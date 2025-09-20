<template>
  <div class="sidebar-container">

    <!-- 导航菜单 -->
    <el-menu class="el-menu-vertical-demo" background-color="#1a1a2e" text-color="#a0aec0" active-text-color="#4cc3ff"
      unique-opened :default-active="$route.path" router>


      <div v-for="route in myRoutes" :key="route.path">

        <!-- 没有子路由 -->
        <template v-if="!route.children">
          <template v-if="!route.meta.hidden">
            <el-menu-item :index="route.path">
              <i :class="route.meta.icon"></i>
              <span slot="title">{{ route.meta.title }}</span>
            </el-menu-item>
          </template>
        </template>

        <!-- 有一个子路由:展示孩子 -->
        <template v-if="route.children && route.children.length == 1">
          <template v-if="!route.children[0].meta.hidden"> <!--？？？-->
            <el-menu-item :index="route.children[0].path">
              <i :class="route.children[0].meta.icon"></i>
              <span slot="title">{{ route.children[0].meta.title }}</span>
            </el-menu-item>
          </template>
        </template>

        <!-- 有多个子路由：展示孩子 -->
        <template v-if="route.children && route.children.length > 1">
          <template v-if="route.meta.hidden">
            <mySlider :myRoutes="route.children"></mySlider>
          </template>

          <el-submenu v-else :index="route.path">
            <template slot="title">
              <i :class="route.meta.icon"></i>
              <span slot="title">{{ route.meta.title }}</span>
            </template>
            <mySlider :myRoutes="route.children"></mySlider>
          </el-submenu>
        </template>
      </div>
    </el-menu>

  </div>
</template>

<script>

export default {
  name: 'mySlider',
  props: ['myRoutes'],
  data() {
    return {
      // layoutIsFold: false
    }
  },

  methods: {

  },
  mounted() {
    // console.log('slider/myRoutes:', this.myRoutes);

  }

}
</script>

<style scoped>
.sidebar-container {
  background-color: #1a1a2e;
  color: #e2e8f0;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}


/* 菜单样式 */
.el-menu-vertical-demo {
  background-color: transparent;
  border-right: none;
  flex: 1;
  overflow: hidden;
}

.el-menu-item,
.el-submenu__title {
  color: #a0aec0;
  height: 52px;
  line-height: 52px;
  font-size: 14px;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.el-menu-item i,
.el-submenu__title i {

  font-size: 16px;
  width: 20px;
  text-align: center;
  margin-right: 30px;
}

.el-menu-item.is-active {
  background-color: #162447 !important;
  color: #4cc3ff !important;
  border-left: 3px solid #4cc3ff;
}

.el-menu-item:not(.is-active):hover,
.el-submenu__title:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  color: #e2e8f0 !important;
}

.el-submenu .el-menu-item {
  padding-left: 50px !important;
}


/* 折叠状态样式 */
.el-menu--collapse {
  width: 64px;
}

.el-menu--collapse .logo-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
  display: none;
}

.el-menu--collapse .sidebar-logo {
  justify-content: center;
  display: none;
}

.el-menu--collapse .logo-icon {
  /* margin-right: 0; */
  display: none;
}
</style>