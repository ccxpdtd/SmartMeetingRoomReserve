import Layout from "../layout/index.vue"
import Login from '../view/login/index.vue'

//无孩
import States from '../view/roombooking/states/index.vue'
import RoomBooking from '../view/roombooking/index.vue'
import MyBookings from '../view/mybookings/index.vue'
import Statistics from '../view/statistics/index.vue'
//有孩
// import Personal from '../view/personal/index.vue'
import UserInfo from '../view/personal/userinfo/index.vue'
import ChangePsw from '../view/personal/changepsw/index.vue'
import Notice from '../view/personal/notice/index.vue'

// import System from '../view/system/index.vue'
import User from '../view/system/user/index.vue'
import MeetingRoom from '../view/system/meetingroom/index.vue'
import Role from '../view/system/role/index.vue'
import Log from '../view/system/log/index.vue'

export const myRoutes = [

  {
    path: "/",
    component: Layout,
    name: 'layout',
    redirect: '/room-booking',
    meta: {
      title: '首页',
      hidden: true,
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: '/room-booking',
        component: RoomBooking,
        name: 'RoomBookings',
        meta: {
          title: '会议室预约',
          hidden: false,
          icon: 'el-icon-date',
        }
      },
      {
        path: '/my-bookings',
        component: MyBookings,
        name: 'MyBookings',
        meta: {
          title: '我的预约',
          hidden: false,
          icon: 'el-icon-time',
        }
      },
      {
        path: '/statistics',
        component: Statistics,
        name: 'Statistics',
        meta: {
          title: '统计报表',
          hidden: false,
          icon: 'el-icon-s-data',
        }
      },
      {
        path: '/states',
        component: States,
        name: 'States',
        query: {},
        meta: {
          title: '状态面板',
          hidden: true,
          icon: 'el-icon-view',
        }
      },
    ]
  },
  {
    path: '/personal',
    component: Layout,
    name: 'Personal',
    redirect: '/personal/user-info',
    meta: {
      title: '个人设置',
      icon: 'el-icon-setting',
      hidden: false,
    },
    children: [
      {
        path: '/personal/user-info',
        component: UserInfo,
        name: 'UserInfo',
        meta: {
          title: '个人信息',
          hidden: false,
          icon: 'el-icon-user-solid',
        },
      },
      {
        path: '/personal/change-psw',
        component: ChangePsw,
        name: 'ChangePsw',
        meta: {
          title: '修改密码',
          hidden: false,
          icon: 'el-icon-lock',
        },
      },
      {
        path: '/personal/notice',
        component: Notice,
        name: 'Notice',
        meta: {
          title: '通知设置',
          hidden: false,
          icon: 'el-icon-message',
        },
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    redirect: '/system/users',
    meta: {
      title: '系统管理',
      hidden: false,
      icon: 'el-icon-monitor',
    },
    children: [
      {
        path: '/system/users',
        component: User,
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'el-icon-user-solid',
        },
      },
      {
        path: '/system/meeting-room',
        component: MeetingRoom,
        name: 'MeetingRoom',
        meta: {
          title: '会议室管理',
          hidden: false,
          icon: 'el-icon-coffee-cup',
        },
      },
      {
        path: '/system/role',
        component: Role,
        name: 'Role',
        meta: {
          title: '角色权限',
          hidden: false,
          icon: 'el-icon-postcard',
        },
      },
      {
        path: '/system/log',
        component: Log,
        name: 'Log',
        meta: {
          title: '系统日志',
          hidden: false,
          icon: 'el-icon-document',
        },
      },
    ]
  },



  {
    path: "/login",
    component: Login,
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion'
    }
  },
  {
    path: "/404",
    // component: NotFound,
    name: 'notFound',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete'
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意',
      hidden: true,
      icon: 'DocumentDelete'
    }
  },
]
