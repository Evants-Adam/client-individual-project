import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/materialdesignicons.min.css'
import '@/assets/css/style.css'

Vue.prototype.$baseEndpoint = 'https://someone-said-that.herokuapp.com/'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
