import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'echarts-gl'

// require('@//assets/js/mock')
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('v-chart',ECharts)

axios.defaults.baseURL = 'http://localhost:8080/'

Vue.config.productionTip = false
Vue.prototype.$axios = axios



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
