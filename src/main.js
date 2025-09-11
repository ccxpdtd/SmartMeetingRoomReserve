import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './styles/index.scss'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from "./router/index"


Vue.config.productionTip = false

import store from './store/index.js'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
