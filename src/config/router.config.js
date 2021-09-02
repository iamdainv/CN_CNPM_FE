import UserLayout from '@/views/user'

export const asyncRouterMap = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/user/home')
      },
      {
        path: '/category/:categoryId',
        name: 'productsByCategory',
        component: () => import('@/views/user/products_by_category')
      },
      {
        path: '/product-detail/:productId',
        name: 'product-detail',
        component: () => import('@/views/user/product_detail')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/user/cart')
      }
    ]
  }
]

export const constantRouterMap = [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/general/exception/404')
  }
]
