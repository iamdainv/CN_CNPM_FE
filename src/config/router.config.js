import UserLayout from '@/views/user'
import AuthLayout from '@/views/auth'

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
                path: 'category/:categoryId',
                name: 'productsByCategory',
                component: () => import('@/views/user/products_by_category')
            },
            {
                path: 'product-detail/:productId',
                name: 'product-detail',
                component: () => import('@/views/user/product_detail')
            },
            {
                path: 'cart',
                name: 'cart',
                component: () => import('@/views/user/cart')
            },
            {
                path: 'user-info',
                component: () => import('@/views/user/user_workspace'),
                children: [
                    {
                        path: '/',
                        name: 'userInfo',
                        component: () => import('@/views/user/user_workspace/user_info')
                    },
                    {
                        path: '/user-address',
                        name: 'userAddress',
                        component: () => import('@/views/user/user_workspace/user_address')
                    },
                    {
                        path: '/user-pass',
                        name: 'userPass',
                        component: () => import('@/views/user/user_workspace/user_pass')
                    },
                    {
                        path: '/purchase',
                        name: 'purchase',
                        component: () => import('@/views/user/user_workspace/purchase')
                    }
                ]
            }
        ]
    }
]

export const asyncRouterAuth = [
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/auth/login')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/register')
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
