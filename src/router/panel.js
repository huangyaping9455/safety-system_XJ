const panelRoutes = [
  {
    path: '/panel/enterprise-condition',
    name: '企业基本情况',
    component: () => import('@/view/panel/enterprise-condition.vue')
  },
  {
    path: '/panel/personnel-monitoring',
    name: '车辆人员实时监控',
    component: () => import('@/view/panel/personnel-monitoring.vue')
  },
  {
    path: '/panel/rescue',
    name: '应急救援',
    component: () => import('@/view/panel/rescue.vue')
  }
];

export default panelRoutes;
