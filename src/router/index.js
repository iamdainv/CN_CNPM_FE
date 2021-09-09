import Vue from 'vue'
import VueRouter from 'vue-router'
import { asyncRouterMap, asyncRouterAuth, constantRouterMap } from '@/config/router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap, asyncRouterAuth)
})

export default router
