import dailyRoutes from './daily';
import panelRoutes from './panel';
import operationRoutes from './operation';
import dataCenter from './data-center';
const routes = [{
    // 会匹配所有路径
    path: '*',
    // redirect: '/login'
    redirect: function () {
      console.log(window);
      return '/wel';
    }
  },
  {
    path: '/',
    // redirect: '/login'
    redirect: function () {
      if (window.location.search == "") {
        return '/login';
      } else {
        return '/wel';
      }
    }
  },
  {
    path: '/wel',
    name: '欢迎页',
    component: () => import('@/view/guide/wel.vue')
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/view/guide/login.vue')
  },
  {
    path: '/loginByGG',
    name: '登录页货运',
    component: () => import('@/view/guide/loginByGG.vue')
  },
  {
    path: '/loginByPT',
    name: '登录页客运',
    component: () => import('@/view/guide/loginByPT.vue')
  },
  // {
  //   path: '/guide',
  //   name: '引导页',
  //   component: () => import('@/view/guide')
  // },
  {
    path: '/index',
    name: '平台主页',
    component: () => import('@/view/index'),
    children: [
      ...dailyRoutes,
      ...operationRoutes,
      ...dataCenter,
      {
        path: '/standard',
        name: '标准化管理',
        component: () => import('@/view/standard')
      },
      {
        path: '/document',
        name: '安全生产文档',
        component: () => import('@/view/document')
      },

      {
        path: '/user',
        name: '用户',
        component: () => import('@/view/user')
      }
    ]
  },
  {
    path: '/panel',
    name: '企业展板内页框架',
    component: () => import('@/view/panel/index.vue'),
    children: [{
        path: '/panel',
        redirect: '/panel/home'
      },
      ...panelRoutes
    ]
  },
  {
    path: '/panel/home',
    name: '企业展板',
    component: () => import('@/view/panel/home.vue')
  }
];
export default routes;