import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  //登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //注册
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  //订单
  {
    path: '/orders',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'orders',
        component: () => import('@/views/orders/index'),
        meta: { title: '订单管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  //结算
  {
    path: '/settlement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'settlement',
        component: () => import('@/views/settlement/index'),
        meta: { title: '结算管理', icon: 'el-icon-money' }
      }
    ]
  },
  // 应用
  {
    path: '/app',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'app',
        component: () => import('@/views/app/index'),
        meta: { title: '应用管理', icon: 'el-icon-s-platform' }
      }
    ]
  },
  //登录
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'record',
        component: () => import('@/views/record/index'),
        meta: { title: '登录记录', icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/doc',
    component: Layout,
    redirect: '/doc/index',
    name: 'doc',
    meta: { title: '开发文档', icon: 'el-icon-document' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/doc/index'),
        meta: { title: '商户API文档', icon: 'el-icon-document' }
      },
      {
        path: 'aliPid',
        name: 'aliPid',
        component: () => import('@/views/doc/aliPid'),
        meta: { title: '获取支付宝PID', icon: 'el-icon-document' }
      },
      {
        path: 'cardId',
        name: 'cardId',
        component: () => import('@/views/doc/cardId'),
        meta: { title: '获取银行卡ID', icon: 'el-icon-document' }
      },
    ]
  },
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/pay',
    name: 'channel',
    meta: { title: '支付通道', icon: 'example' },
    children: [
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/channel/pay'),
        meta: {
          title: '支付通道配置',
          icon: 'el-icon-s-tools',
          roles: [1],
        }
      }
    ]
  },
  // {
  //   path: '/channel',
  //   component: Layout,
  //   redirect: '/channel/pay',
  //   name: 'channel',
  //   meta: { title: '支付通道', icon: 'example' },
  //   children: [
  //     {
  //       path: 'pay',
  //       name: 'pay',
  //       component: () => import('@/views/channel/pay'),
  //       meta: {
  //         title: '支付通道配置',
  //         icon: 'el-icon-s-tools',
  //         roles: ['admin'],
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/doc',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/pay',
    name: 'channel',
    meta: { title: '支付通道', icon: 'example' },
    children: [
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/channel/pay'),
        meta: {
          title: '支付通道配置',
          icon: 'el-icon-s-tools',
          roles: [1],
        }
      }
    ]
  },
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
