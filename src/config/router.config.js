import { UserLayout, BasicLayout } from '@/layouts'
import AuthLayout from '@/views/client/auth'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
    children: [
      // DASHBOARD
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'home', permission: ['dashboard'], requiredLogin: true },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/admin/crm/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'], requiredLogin: true }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/admin/crm/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/sales-channel',
        name: 'sales-channel',
        redirect: 'sales-channel',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: 'menu.sales-channel', keepAlive: true, icon: 'apartment', permission: ['dashboard'] },
        children: [
          {
            path: '/sales-channel/organization',
            name: 'sales-channel.organization',
            component: () => import('@/views/admin/crm/organization'),
            meta: { title: 'menu.sales-channel.organization', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/sales-channel/staff',
            name: 'sales-channel.staff',
            component: () => import('@/views/admin/crm/dashboard/Analysis'),
            meta: { title: 'menu.sales-channel.staff', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const constRouteMapClient = [
  {
    path: '/',
    component: () => import('@/views/client/user/index'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/client/user/home/index')
      },
      {
        path: 'category/:categoryId',
        name: 'productsByCategory',
        component: () => import('@/views/client/user/products_by_category/index')
      },
      {
        path: 'product-detail/:productId',
        name: 'product-detail',
        component: () => import('@/views/client/user/product_detail/index')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/client/user/cart/index')
      },
      {
        path: 'user-info',
        component: () => import('@/views/client/user/user_workspace/index'),
        children: [
          {
            path: '/',
            name: 'userInfo',
            component: () => import('@/views/client/user/user_workspace/user_info/index')
          },
          {
            path: '/user-address',
            name: 'userAddress',
            component: () => import('@/views/client/user/user_workspace/user_address/index')
          },
          {
            path: '/user-pass',
            name: 'userPass',
            component: () => import('@/views/client/user/user_workspace/user_pass/index')
          },
          {
            path: '/purchase',
            name: 'purchase',
            component: () => import('@/views/client/user/user_workspace/purchase/index')
          }
        ]
      }
    ]
  }
]
export const asyncRouterAuthClient = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/client/auth/login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/client/auth/register')
      }
    ]
  }
]

export const constantAdminRouterMap = [
  {
    path: '/auth',
    component: UserLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'loginAdmin',
        name: 'loginAdmin',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/admin/general/auth/Login')
      },
      {
        path: 'registerAdmin',
        name: 'registerAdmin',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/admin/general/auth/Register')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/admin/general/exception/404')
  }
]
