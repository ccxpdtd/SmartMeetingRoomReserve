import Vue from 'vue'
import Vuex from 'vuex'
import { myRoutes } from '../router/routes'
//应用vuex插件
Vue.use(Vuex)

const actions = {
  // changeFold(context) {
  //   context.commit('CHANGEFOLD')
  // }
}//响应组件中用户的动作
const mutations = {
  // CHANGEFOLD(state) {
  //   state.layoutIsFold = !state.layoutIsFold
  // }
}//修改state中的数据
const state = {
  myRoutes: myRoutes,
  // layoutIsFold: false,
}//保存具体的数据

//创建并暴露store
export default new Vuex.Store({
  actions, mutations, state
})