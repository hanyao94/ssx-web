import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

// const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noRedirect` will not redirect in the levelBar
 * noDropDown : if `noDropDown:true` will not has submenu in the sidebar
 * meta : `{ permission: ['a:xx'] }`  will control the page permission
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/401', component: () => import('@/views/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    icon: 'dashboard',
    noDropDown: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', noCache: true }
    }]
  }]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    icon: 'permission',
    noDropDown: true,
    children: [{
      path: 'index',
      name: 'Role',
      component: () => import('@/views/role/index'),
      meta: { permission: ['role:list'] }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    icon: 'username',
    noDropDown: true,
    children: [{
      path: 'index',
      name: 'User',
      component: () => import('@views/user/index'),
      meta: { permission: ['user:list'] }
    }]
  },
  {
    path: '/user/center',
    component: Layout,
    redirect: '/user/center/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'UserCenter',
      component: () => import('@views/userCenter/index')
    }]
  }
]

