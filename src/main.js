import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import { default as request } from './utils/request'
import { hasPermission } from './utils/hasPermission'

Vue.use(ElementUI, { locale })

// 生产环境时自动设置为 false 以阻止 web 在启动时生成生产提示
Vue.config.productionTip = false

// 全局的常量
Vue.prototype.request = request
Vue.prototype.hasPermission = hasPermission

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
