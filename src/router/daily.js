const dailyRoutes = [{
    path: '/daily',
    redirect: '/daily/shou'
  },

  {
    path: '/daily/shou',
    name: 'shou',
    component: () => import('@/view/daily/shou/index.vue')
  },
  {
    path: '/daily/iframe/:path',
    name: 'iframePage',
    component: () => import('@/components/iframe/index.vue')
  },
  // 日常（安职、危险源、责任书、编辑）在asann中
  // {
  //   path: '/daily/schedule',
  //   name: 'schedule',
  //   component: () => import('@/view/daily/schedule/index.vue')
  // },
  {
    path: '/daily/report',
    name: 'report',
    component: () => import('@/view/daily/report/index.vue'),
  },
  {
    path: '/daily/preview',
    name: 'preview',
    component: () => import('@/view/daily/report/preview.vue'),
  },
  {
    path: '/daily/remind',
    name: 'remind',
    component: () => import('@/view/daily/remind.vue')
  },
  {
    path: '/daily/law',
    name: 'law',
    component: () => import('@/view/daily/law.vue')
  },
  {
    path: '/daily/rules',
    name: 'rules',
    component: () => import('@/view/daily/rules.vue')
  },
  {
    path: '/daily/operating',
    name: 'operating',
    component: () => import('@/view/daily/operating.vue')
  },
  {
    path: '/daily/rescue',
    name: 'rescue',
    component: () => import('@/view/daily/rescue.vue')
  },

  {
    path: '/daily/file',
    name: 'file',
    component: () => import('@/view/daily/file.vue')
  },
  {
    path: '/daily/alarm-statis',
    name: 'alarm-statis',
    component: () => import('@/view/daily/alarm-statis')
  },
  {
    path: '/daily/alarm',
    name: 'alarm',
    component: () => import('@/view/daily/alarm')
  },
  {
    path: '/daily/monitor',
    name: 'monitor',
    component: () => import('@/view/daily/monitor')
  },
  {
    path: '/daily/meeting',
    name: 'meeting',
    component: () => import('@/view/daily/meeting.vue')
  },
  {
    path: '/daily/education',
    name: 'education',
    component: () => import('@/view/daily/education.vue')
  },
  {
    path: '/daily/accident',
    name: 'accident',
    component: () => import('@/view/daily/accident.vue')
  },
  {
    path: '/daily/target',
    name: 'target',
    component: () => import('@/view/daily/target.vue')
  },
  {
    path: '/daily/fuel-subsidies',
    name: 'fuelSubsidies',
    component: () => import('@/view/daily/fuel-subsidies')
  },
  {
    path: '/daily/fuel-detail',
    name: 'fuelDetail',
    component: () => import('@/view/daily/fuel-detail')
  },
  {
    path: '/daily/serious-alarm',
    name: 'seriousAlarm',
    component: () => import('@/view/daily/serious-alarm')
  },
  {
    path: '/daily/evaluate',
    name: 'evaluate',
    component: () => import('@/view/daily/evaluate')
  },
  {
    path: '/daily/DayStatistics',
    name: 'DayStatistics',
    component: () => import('@/view/daily/DayStatistics/index.vue')
  },
  {
    path: '/daily/StatisticsSum',
    name: 'StatisticsSum',
    component: () => import('@/view/daily/StatisticsSum/index.vue')
  }, {
    path: '/daily/StatisticsRank',
    name: 'StatisticsRank',
    component: () => import('@/view/daily/StatisticsRank/index.vue')
  },
  {
    path: '/daily/Notic',
    name: 'Notic',
    component: () => import('@/view/daily/Notic/index.vue')
  },
  {
    path: '/daily/CheckPost',
    name: 'CheckPost',
    component: () => import('@/view/daily/CheckPost/index.vue')
  },
  {
    path: '/daily/Distribution',
    name: 'Distribution',
    component: () => import('@/view/daily/Distribution/index.vue')
  }, {
    path: '/daily/Rectification',
    name: 'Rectification',
    component: () => import('@/view/daily/Rectification/index.vue')
  }, {
    path: '/daily/vehicle',
    name: 'vehicle',
    component: () => import('@/view/daily/vehicle/vehicle.vue')
  }, {
    path: '/daily/driver',
    name: 'driver',
    component: () => import('@/view/daily/vehicle/driver.vue')
  }
];

export default dailyRoutes;