import Vue from 'vue'
import Router from 'vue-router'
import {
  constantAdminRouterMap,
  asyncRouterMap,
  constRouteMapClient,
  asyncRouterAuthClient
} from '@/config/router.config'
// import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouteMapClient.concat(asyncRouterMap, constantAdminRouterMap, asyncRouterAuthClient)
})
router.beforeEach((routeTo, routeFrom, next) => {
  // if (routeTo.meta.requiredLogin === true && !store.getters.token) {
  //   next({ name: '/' })
  // } else {
  //   next()
  // }
  next()
})
// router.beforeResolve(async (routeTo, routeFrom, next) => {})
// router.afterEach((routeTo, routeFrom) => {})
export default router
