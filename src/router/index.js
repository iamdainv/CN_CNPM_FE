import Vue from 'vue'
import VueRouter from 'vue-router'
import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})

export default router
