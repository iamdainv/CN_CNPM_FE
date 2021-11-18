import Vue from 'vue'
import Router from 'vue-router'
import {
  constantAdminRouterMap,
  asyncRouterMap,
  constRouteMapClient,
  asyncRouterAuthClient
} from '@/config/router.config'
import store from '@/store/index'
import NProgress from 'nprogress' // progress bar
NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouteMapClient.concat(asyncRouterMap, constantAdminRouterMap, asyncRouterAuthClient)
})

const pathRequireAuth = ['/cart', '/user-info/']

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start() // start progress bar

  if (!Vue.$cookies.get('token')) {
    console.log(pathRequireAuth.includes(routeTo.path), routeTo.path)
    if (pathRequireAuth.includes(routeTo.path)) {
      next({ path: '/auth/login' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (!store.getters.userInfo.isLogin) {
      store.dispatch('loginToken').then(data => {
        next()
      }).catch(_ => {

      })
    }
  }

  next()
})
// router.beforeResolve(async (routeTo, routeFrom, next) => {
//   console.log('routeTo', routeTo)
// })
// router.afterEach((routeTo, routeFrom) => {})
export default router
