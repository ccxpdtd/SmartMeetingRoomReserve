import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

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
        context.dispatch('switchUrl', { url: value.url, data: res.data })
      }
      return res
    } catch (error) {
      return { code: 500, message: error.message } // 保证组件能拿到结果
    }
  },
  async get(context, value) {
    try {
      const res = await axios.get(value.url)
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
      case '/api/admin/get_users':
        context.commit('setUsers', data.usersInfo)
        break
    }
  },


}

//修改state中的数据
const mutations = {
  setUser(state, value) {
    state.user.id = value.id
    state.user.username = value.username
    state.user.role = value.role
  },
  setRooms(state, value) {
    state.rooms = value
  },
  setUsers(state, value) {
    state.usersInfo.users = value.users
    state.usersInfo.total = value.total
  }
}

//保存具体的数据
const state = {
  myRoutes: myRoutes,
  token: '',
  user: {
    id: '',
    username: '',
    role: ''
  },

  rooms: [],
  usersInfo: {
    users: [],
    total: 0,
  },
}

//创建并暴露store
export default new Vuex.Store({
  actions, mutations, state
})