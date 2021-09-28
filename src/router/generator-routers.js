// eslint-disable-next-line
import * as loginService from '@/api/general/login'
// eslint-disable-next-line
import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'

const constantRouterComponents = {
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/admin/general/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/admin/general/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/admin/general/exception/500'),

  'Analysis': () => import('@/views/admin/crm/dashboard/Analysis'),

  'Exception403': () => import(/* webpackChunkName: "fail" */ '@/views/admin/general/exception/403'),
  'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/admin/general/exception/404'),
  'Exception500': () => import(/* webpackChunkName: "fail" */ '@/views/admin/general/exception/500')

}
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: 'dashboard'
  },
  children: []
}

export const generatorDynamicRouter = (token) => {
  return new Promise((resolve, reject) => {
    loginService.getCurrentUserNav(token).then(res => {
      const { result } = res
      const menuNav = []
      const childrenNav = []
      listToTree(result, childrenNav, 0)
      console.log(childrenNav)
      rootRouter.children = childrenNav
      menuNav.push(rootRouter)
      const routers = generator(menuNav)
      routers.push(notFoundRouter)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      name: item.name || item.key || '',
      component: (constantRouterComponents[item.component || item.key]) || (() => import(`@/views/${item.component}`)),

      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }
    if (show === false) {
      currentRouter.hidden = true
    }
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    item.redirect && (currentRouter.redirect = item.redirect)
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      listToTree(list, child.children, item.id)
      if (child.children.length <= 0) {
        delete child.children
      }
      tree.push(child)
    }
  })
}
