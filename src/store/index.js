import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import { myRoutes } from '../router/routes'

//应用vuex插件
Vue.use(Vuex)

//响应组件中用户的动作
const actions = {

  async post(context, value) {
    // console.log('value.url', value.url);
    // console.log('value.payload', value.payload);
    try {
      const res = await axios.post(value.url, value.payload)
      console.log('post/res:', value.url, res);
      if (res.data.code === 200) {
        context.dispatch('switchUrl', { url: value.url, data: res.data || [] })
      }
      return res
    } catch (error) {
      return { code: 500, message: error.message } // 保证组件能拿到结果
    }
  },
  async get(context, value) {
    try {
      const res = await axios.get(value.url, { params: value.query || {} })
      console.log('get/res:', res);
      if (res.data.code === 200) {
        context.dispatch('switchUrl', { url: value.url, data: res.data })
      }
      return res
    } catch (error) {
      return { code: 500, message: error.message } // 保证组件能拿到结果
    }

  },
  switchUrl(context, { url, data }) {
    switch (url) {
      case '/api/login':
        localStorage.setItem('token', data.token)
        break
      case '/api/get_rooms':
        context.commit('setRooms', data.rooms)
        break
      case '/api/get_reservations':
        context.commit('setReservations', data.reservations)
        break

      case '/api/admin/get_users':
        context.commit('setUsersData', data.usersData)
        break
    }
  },
}

//修改state中的数据
const mutations = {
  setUserInfo(state, value) {
    state.userInfo.id = value.id
    state.userInfo.username = value.username
    state.userInfo.role = value.role
  },
  setRooms(state, value) {
    state.rooms = value
  },
  setReservations(state, value) {
    state.reservations = value
  },

  setUsersData(state, value) {
    state.usersData.users = value.users
    state.usersData.total = value.total
  },
}

//保存具体的数据
const state = {
  myRoutes: myRoutes,
  token: '',

  userInfo: {
    id: '',
    username: '',
    role: ''
  },
  rooms: [],
  reservations: [],

  usersData: {
    users: [],
    total: 0,
  },


}


//创建并暴露store
export default new Vuex.Store({
  actions, mutations, state,
  plugins: [
    createPersistedState({
      // 关键：只持久化 user 和 rooms 模块，排除 permission、route 等路由相关模块
      paths: ['rooms', 'reservations', 'usersData'],
      storage: window.localStorage, // 存储方式不变
    })
  ]
})