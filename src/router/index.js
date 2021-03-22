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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/management',
    component: Layout,
    redirect: '/management/table',
    name: 'Management',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '会员管理', icon: 'table' }
      },
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@/views/home/homeCarousel.vue'),
        meta: { title: '轮播图管理', icon: 'table' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  // {
  //   path: '/homeManage',
  //   component: Layout,
  //   redirect: '/homeManage/carousel',
  //   name: 'HomeManage',
  //   meta: { title: '首页管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'carousel',
  //       name: 'Carousel',
  //       component: () => import('@/views/home/homeCarousel.vue'),
  //       meta: { title: '轮播图管理', icon: 'table' }
  //     }
  //     // {
  //     //   path: 'tree',
  //     //   name: 'Tree',
  //     //   component: () => import('@/views/tree/index'),
  //     //   meta: { title: 'Tree', icon: 'tree' }
  //     // }
  //   ]
  // },
  {
    path: '/question_manage',
    component: Layout,
    redirect: '/question_manage/question',
    name: 'Question_manage',
    meta: { title: '题目管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/question/index'),
        meta: { title: '题目管理', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/public_notice',
    component: Layout,
    redirect: '/public_notice/notice',
    name: 'Public_notice',
    meta: { title: '公告管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '公告管理', icon: 'el-icon-s-help' }
      },
      {
        path: 'advlink',
        name: 'AdvLink',
        component: () => import('@/views/notice/AdvLink.vue'),
        meta: { title: '广告链接管理', icon: 'el-icon-s-help' }
      },
      {
        path: 'advimg',
        name: 'AdvImg',
        component: () => import('@/views/home/component/noticeC.vue'),
        meta: { title: '广告图管理', icon: 'el-icon-s-help' }
      },

    ]
  },

  {
    path: '/setting_route',
    component: Layout,
    redirect: '/setting_route/setting',
    name: 'Setting_route',
    meta: { title: '设置管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'password',
        name: 'Password',
        component: () => import('@/components/Password'),
        meta: { title: '密码修改', icon: 'form' }
      },
      {
        path: 'referal',
        name: 'Referal',
        component: () => import('@/components/Setting'),
        meta: { title: '推荐奖金设定', icon: 'form' }
      },
      {
        path: 'answerE',
        name: 'AnswerE',
        component: () => import('@/components/AnswerEdit'),
        meta: { title: '签到奖金设定', icon: 'form' }
      },
    ]
  },
  {
    path: '/records_route',
    component: Layout,
    redirect: '/records_route/amount',
    name: 'Records_route',
    meta: { title: '明细管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'amount',
        name: 'Amount',
        component: () => import('@/views/records/amount'),
        meta: { title: '资金明细', icon: 'form' }
      },
      {
        path: 'money',
        name: 'Money',
        component: () => import('@/views/records/money'),
        meta: { title: '资产明细', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/password',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Password',
  //       component: () => import('@/components/Password'),
  //       meta: { title: '密码修改', icon: 'form' }
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
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
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
  //       name: 'Menu2',
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
