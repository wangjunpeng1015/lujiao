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
  // {
  //   path: '/register',
  //   component: () => import('@/views/register/index'),
  //   hidden: true
  // },
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
      meta: { title: '数据统计', icon: 'iconfont iconicon-test' }
    }]
  },
]
export const asyncRoutes = [
  // 云靓刷
  {
    path: '/ylsPay',
    component: Layout,
    redirect: '/ylsPay/orders',
    name: 'yls',
    meta: {
      title: '云靓刷通道',
      icon: 'iconfont iconshangjia',
    },
    children: [
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/ylsPay/set'),
        meta: {
          title: '支付宝通道配置',
          icon: 'iconfont iconzhifubao1',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'vxset',
        name: 'vxset',
        component: () => import('@/views/ylsPay/vxset'),
        meta: {
          title: '微信通道配置',
          icon: 'iconfont iconweixin1',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/ylsPay/Orders'),
        meta: {
          title: '云靓刷订单',
          icon: 'el-icon-s-order',
        }
      },
      // {
      //   path: 'introduce',
      //   name: 'introduce',
      //   component: () => import('@/views/ylsPay/Introduce'),
      //   meta: {
      //     title: '云靓刷通道介绍',
      //     icon: 'el-icon-info',
      //   }
      // }
    ]
  },
  // 钱方H5
  {
    path: '/qfPay',
    component: Layout,
    redirect: '/qfPay/orders',
    name: 'qfpay',
    meta: {
      title: '钱方H5通道',
      icon: 'iconfont iconshangjia',
    },
    children: [
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/qfPay/set'),
        meta: {
          title: '支付宝通道配置',
          icon: 'iconfont iconzhifubao1',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'vxset',
        name: 'set',
        component: () => import('@/views/qfPay/vxset'),
        meta: {
          title: '微信通道配置',
          icon: 'iconfont iconweixin1',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/qfPay/Orders'),
        meta: {
          title: '钱方H5订单',
          icon: 'el-icon-s-order',
        }
      },
      // {
      //   path: 'introduce',
      //   name: 'introduce',
      //   component: () => import('@/views/qfPay/Introduce'),
      //   meta: {
      //     title: '钱方H5介绍',
      //     icon: 'el-icon-info',
      //   }
      // }
    ]
  },
  // 支付宝扫码
  {
    path: '/aliScan',
    component: Layout,
    redirect: '/aliScan/orders',
    name: 'aliScan',
    meta: {
      title: '支付宝扫码通道',
      icon: 'iconfont iconzhifubao1',
    },
    children: [
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/aliScan/set'),
        meta: {
          title: '通道配置',
          icon: 'el-icon-s-tools',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/aliScan/Orders'),
        meta: {
          title: '支付宝扫码订单',
          icon: 'el-icon-s-order',
        }
      }
    ]
  },
  // 微信扫码
  {
    path: '/wechatScan',
    component: Layout,
    redirect: '/wechatScan/orders',
    name: 'wechatScan',
    meta: {
      title: '微信赞赏码码通道',
      icon: 'iconfont iconweixin1',
    },
    children: [
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/wechatScan/set'),
        meta: {
          title: '通道配置',
          icon: 'el-icon-s-tools',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/wechatScan/Orders'),
        meta: {
          title: '微信赞赏码订单',
          icon: 'el-icon-s-order',
        }
      }
    ]
  },
  // 钱方
  // {
  //   path: '/personalCode',
  //   component: Layout,
  //   redirect: '/personalCode/orders',
  //   name: 'personalCode',
  //   meta: {
  //     icon: 'iconfont iconshangjia',
  //     title: '钱方固码通道',
  //   },
  //   children: [
  //     {
  //       path: 'set',
  //       name: 'set',
  //       component: () => import('@/views/personalCode/set'),
  //       meta: {
  //         title: '通道配置',
  //         icon: 'el-icon-s-tools',
  //         roles: [1, 3, 4],
  //       }
  //     },
  //     {
  //       path: 'orders',
  //       name: 'orders',
  //       component: () => import('@/views/personalCode/orders'),
  //       meta: {
  //         title: '钱方固码订单',
  //         icon: 'el-icon-s-order',
  //       }
  //     },
  //     {
  //       path: 'introduce',
  //       name: 'introduce',
  //       component: () => import('@/views/personalCode/Introduce'),
  //       meta: {
  //         title: '钱方通道介绍',
  //         icon: 'el-icon-info',
  //       }
  //     }
  //   ]
  // },
  // 宝转卡
  {
    path: '/aliCard',
    component: Layout,
    redirect: '/aliCard/orders',
    name: 'personalCode',
    meta: {
      icon: 'iconfont iconshuaqiaqiapianyinhangqia',
      title: '宝转卡通道',
    },
    children: [
      {
        path: 'set',
        name: 'set',
        component: () => import('@/views/aliCard/set'),
        meta: {
          title: '通道配置',
          icon: 'el-icon-s-tools',
          roles: [1, 3, 4],
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/aliCard/orders'),
        meta: {
          title: '宝转卡订单',
          icon: 'iconfont iconshuaqiaqiapianyinhangqia',
        }
      },
      {
        path: 'introduce',
        name: 'introduce',
        component: () => import('@/views/aliCard/Introduce'),
        meta: {
          title: '宝转卡介绍',
          icon: 'el-icon-info',
        }
      }
    ]
  },
  // 经费
  // {
  //   path: '/funds',
  //   component: Layout,
  //   redirect: '/funds/set',
  //   name: 'funds',
  //   meta: {
  //     title: '经费通道',
  //     icon: 'iconfont iconshuidi',
  //   },
  //   children: [
  //     {
  //       path: 'set',
  //       name: 'set',
  //       component: () => import('@/views/Funds/Set'),
  //       meta: {
  //         title: '通道配置',
  //         icon: 'el-icon-s-tools',
  //         roles: [1, 3, 4],
  //       }
  //     },
  //     {
  //       path: 'orders',
  //       name: 'orders',
  //       component: () => import('@/views/Funds/Orders'),
  //       meta: {
  //         title: '经费订单',
  //         icon: 'el-icon-s-order',
  //       }
  //     },
  //     {
  //       path: 'introduce',
  //       name: 'introduce',
  //       component: () => import('@/views/Funds/Introduce'),
  //       meta: {
  //         title: '经费模式介绍',
  //         icon: 'el-icon-info',
  //       }
  //     }
  //   ]
  // },
  // 转账
  // {
  //   path: '/transfer',
  //   component: Layout,
  //   redirect: '/transfer/set',
  //   name: 'transfer',
  //   meta: {
  //     title: '转账码',
  //     icon: 'iconfont iconzhuanzhang',
  //   },
  //   children: [
  //     {
  //       path: 'set',
  //       name: 'set',
  //       component: () => import('@/views/transfer/set'),
  //       meta: {
  //         title: '通道配置',
  //         icon: 'el-icon-s-tools',
  //         roles: [1, 3, 4],
  //       }
  //     },
  //     {
  //       path: 'orders',
  //       name: 'orders',
  //       component: () => import('@/views/transfer/Orders'),
  //       meta: {
  //         title: '转账码订单',
  //         icon: 'iconfont iconzhuanzhang',
  //       }
  //     }
  //   ]
  // },

  // 当面付
  // {
  //   path: '/facePay',
  //   component: Layout,
  //   redirect: '/facePay/set',
  //   name: 'funds',
  //   meta: {
  //     title: '当面付通道',
  //     icon: 'iconfont icon-dangmianfu-',
  //   },
  //   children: [
  //     {
  //       path: 'set',
  //       name: 'set',
  //       component: () => import('@/views/facePay/set'),
  //       meta: {
  //         title: '通道配置',
  //         icon: 'el-icon-s-tools',
  //         roles: [1, 3, 4],
  //       }
  //     },
  //     {
  //       path: 'orders',
  //       name: 'orders',
  //       component: () => import('@/views/facePay/Orders'),
  //       meta: {
  //         title: '当面付订单',
  //         icon: 'el-icon-s-order',
  //       }
  //     }
  //   ]
  // },
    //USDT结算
    {
      path: '/usdtSettlement',
      component: Layout,
      meta: {
        title: 'USDT单笔分账',
        icon: 'iconfont iconziyuan',
      },
      children: [
        {
          path: 'index',
          name: 'settlement',
          component: () => import('@/views/usdtSettlement/index'),
          meta: { title: 'USDT分账配置', icon: 'el-icon-money', roles: [1] }
        },
        {
          path: 'records',
          name: 'records',
          component: () => import('@/views/usdtSettlement/records'),
          meta: { title: 'USDT分账记录', icon: 'el-icon-coin', roles: [1] }
        },
        {
          path: 'Introduce',
          name: 'Introduce',
          component: () => import('@/views/usdtSettlement/Introduce'),
          meta: { title: 'USDT分账使用说明', icon: 'el-icon-coin', roles: [1] }
        }
      ]
    },
  //结算
  {
    path: '/settlement',
    component: Layout,
    meta: {
      title: '结算管理',
      icon: 'iconfont iconjiesuan',
    },
    children: [
      {
        path: 'index',
        name: 'settlement',
        component: () => import('@/views/settlement/index'),
        meta: { title: '结算管理', icon: 'el-icon-money', roles: [1, 2] }
      },
      {
        path: 'records',
        name: 'records',
        component: () => import('@/views/settlement/records'),
        meta: { title: '结算记录', icon: 'el-icon-coin', roles: [1, 2, 3] }
      }
    ]
  },

  // 商户设置
  // {
  //   path: '/setting',
  //   component: Layout,
  //   meta: {
  //     title: '商户配置',
  //     icon: 'el-icon-user-solid',
  //     roles: [1]
  //   },
  //   children: [
  //     {
  //       path: 'merchant',
  //       name: 'merchant',
  //       component: () => import('@/views/setting/merchant'),
  //       meta: { title: '商户配置', icon: 'el-icon-setting', roles: [1] }
  //     }
  //   ]
  // },
  //人员管理
  {
    path: '/members',
    component: Layout,
    meta: {
      title: '客户管理',
      icon: 'iconfont iconkehuguanlicopy',
      roles: [1, 3, 4]
    },
    children: [
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/members/agent'),
        meta: { title: '代理管理', icon: 'iconfont iconagency-management', roles: [1] }
      },
      {
        path: 'merchants',
        name: 'merchants',
        component: () => import('@/views/members/merchants'),
        meta: { title: '商户管理', icon: 'iconfont iconshanghuguanli', roles: [1, 3] }
      },
      {
        path: 'code',
        name: 'code',
        component: () => import('@/views/members/code'),
        meta: { title: '码商管理', icon: 'iconfont iconerweima', roles: [1, 3, 4] }
      }
    ]
  },
  // 文档
  // {
  //   path: '/doc',
  //   component: Layout,
  //   redirect: '/doc/index',
  //   name: 'doc',
  //   meta: {
  //     title: '帮助文档',
  //     icon: 'iconfont iconbangzhuwendang-sel',
  //     roles: [1, 2, 3, 4]
  //   },
  //   children: [
  //     {
  //       path: 'fundsDoc',
  //       name: 'fundsDoc',
  //       component: () => import('@/views/doc/funds'),
  //       meta: { title: '开通经费帮助', icon: 'el-icon-document', roles: [1, 3, 4] }
  //     },
  //     // {
  //     //   path: 'proxyDoc',
  //     //   name: 'proxyDoc',
  //     //   component: () => import('@/views/doc/proxy'),
  //     //   meta: { title: '后台使用帮助', icon: 'el-icon-document', roles: [1, 3, 4] }
  //     // },
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: () => import('@/views/doc/index'),
  //       meta: { title: '商户API文档', icon: 'iconfont iconapi', roles: [1, 2, 3, 4] }
  //     },
  //     {
  //       path: 'aliPid',
  //       name: 'aliPid',
  //       component: () => import('@/views/doc/aliPid'),
  //       meta: { title: '获取支付宝PID', icon: 'el-icon-document', roles: [1, 2, 3, 4] }
  //     },
  //     {
  //       path: 'udid',
  //       name: 'udid',
  //       component: () => import('@/views/doc/udid'),
  //       meta: { title: '获取手机UDID', icon: 'el-icon-document', roles: [1, 2, 3, 4] }
  //     },
  //     {
  //       path: 'cardId',
  //       name: 'cardId',
  //       component: () => import('@/views/doc/cardId'),
  //       meta: { title: '获取银行卡ID', icon: 'el-icon-document', roles: [1, 3, 4] }
  //     },
  //     // {
  //     //   path: 'smdd',
  //     //   name: 'smdd',
  //     //   component: () => import('@/views/doc/smdd'),
  //     //   meta: { title: '开通扫码点单', icon: 'el-icon-document', roles: [1, 3, 4] }
  //     // },
  //     {
  //       path: 'f2f',
  //       name: 'f2f',
  //       component: () => import('@/views/doc/f2f'),
  //       meta: { title: '开通当面付', icon: 'el-icon-document', roles: [1, 3, 4] }
  //     },
  //     {
  //       path: 'f2fkey',
  //       name: 'f2fkey',
  //       component: () => import('@/views/doc/f2fkey'),
  //       meta: { title: '获取当面付参数', icon: 'el-icon-document', roles: [1, 3, 4] }
  //     },
  //   ]
  // },
  //登录
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'record',
        component: () => import('@/views/record/index'),
        meta: { title: '登录记录', icon: 'iconfont icondenglucopy' }
      }
    ]
  },
  //字典配置
  {
    path: '/dicConfig',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dicConfig',
        component: () => import('@/views/dicConfig/index'),
        meta: { title: '字典配置', icon: 'iconfont iconzidian', roles: [1] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
