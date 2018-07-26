import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/token' // 验权

const whiteList = ['/login'] // 白名单,不需要登录的路由

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 尝试获取cookie中token
  if (getToken()) {
    // 有token
    if (to.path === '/login') {
      // 但是下一跳是登录页
      // 转到首页
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 如果没有角色名
      if (store.getters.roleName === null) {
        // 获取用户信息
        store.dispatch('Info').then(res => {
          // 生成路由
          store.dispatch('GenerateRoutes', res.data).then(() => {
            router.addRoutes(store.getters.addRoutes)
            next({ ...to })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 如果路径不是白名单内的,而且又没有登录,就转到登录页
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
