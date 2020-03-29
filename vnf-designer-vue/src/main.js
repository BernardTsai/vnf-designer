import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require("@/assets/scss/index.scss")

import "@/assets/css/global.css"
import "@/assets/css/app.css"
import "@/assets/css/component.css"
import "@/assets/css/export.css"
import "@/assets/css/flavor.css"
import "@/assets/css/image.css"
import "@/assets/css/import.css"
import "@/assets/css/modal.css"
import "@/assets/css/network.css"
import "@/assets/css/tenant.css"


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
