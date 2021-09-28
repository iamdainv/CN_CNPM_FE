import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})
router.beforeEach((routeTo, routeFrom, next) => {
  if (routeTo.meta.requiredLogin === true && !store.getters.token) {
    next({ name: 'login' })
  } else {
    next()
  }
})
// router.beforeResolve(async (routeTo, routeFrom, next) => {})
// router.afterEach((routeTo, routeFrom) => {})
export default router
