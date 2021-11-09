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
    meta: { title: 'menu.home', breadcrumbText: 'menu.home' },
    redirect: 'dashboard',
    children: [
      // DASHBOARD
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard/Analysis'),
        hideChildrenInMenu: true,
        meta: {
          title: 'menu.home',
          keepAlive: true,
          icon: 'home',
          permission: ['dashboard'],
          requiredLogin: true
        }
      },
      {
        path: '/product',
        name: 'product',
        redirect: 'grocery.product',
        component: RouteView,
        hideChildrenInMenu: false,
        meta: { title: 'menu.product', breadcrumbText: 'menu.product', keepAlive: true, icon: 'file-done', permission: ['dashboard'] },
        children: [
          {
            path: '/grocery/product',
            name: 'grocery.product',
            component: () => import('@/views/admin/grocery/product/Index'),
            meta: { title: 'menu.product.item', pageName: 'menu.product.item', breadcrumbText: 'menu.product.item', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/grocery/category',
            name: 'grocery.category',
            component: () => import('@/views/admin/grocery/category/Index'),
            meta: { title: 'menu.product.category', pageName: 'menu.product.category', breadcrumbText: 'menu.product.category', keepAlive: false, permission: ['dashboard'] }
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
        path: '/product/:slugWithId',
        name: 'product-detail',
        exact: true,
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
    exact: true,
    component: () => import(/* webpackChunkName: "fail" */ '@/views/admin/general/exception/404')
  }
]
