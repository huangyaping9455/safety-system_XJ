const routes = [
  {
    path: '/operation',
    redirect: '/operation/home'
  },
  {
    path: '/operation/home',
    name: '首页',
    component: () => import('@/view/operation/home')
  },
  {
    path: '/operation/contract',
    name: '合同管理',
    component: () => import('@/view/operation/contract')
  },
  {
    path: '/operation/freight',
    name: '货运管理',
    component: () => import('@/view/operation/freight')
  },
  {
    path: '/operation/Internal-check',
    name: '对内核算',
    component: () => import('@/view/operation/Internal-check')
  },
  {
    path: '/operation/expend-stat',
    name: '支出统计',
    component: () => import('@/view/operation/expend-stat')
  },
  {
    path: '/operation/waybill-settlement',
    name: '运单结算',
    component: () => import('@/view/operation/waybill-settlement')
  }
];

export default routes;
