import request from '@/router/axios';

// 企业平台-本月车辆情况
export const monthVehcile = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/getMonthVehcile',
    method: 'GET',
    params: {
      deptId
    }
  });
// 企业平台-近七天报警统计
export const sevenAlarmStatistics = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/getSevenAlarmStatistics',
    method: 'GET',
    params: {
      deptId
    }
  });
// 企业平台-报警统计（年）
export const yearAlarm = (params) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/getYearAlarm',
    method: 'GET',
    params
  });
// 企业平台-处理趋势图
export const yearAlarmTendency = (params) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/getYearAlarmTendency',
    method: 'GET',
    params
  });
// 企业-获取实时车辆状态统计
export const QYVehicleCount = (dept) =>
  request({
    url: '/api/blade-platform/platform/gpsVehicle/getQYVehicleCount',
    method: 'GET',
    params: {
      dept
    }
  });
// 首页 安全达标提醒
export const selectMarkRemind = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/selectMarkRemind',
    method: 'GET',
    params: {
      deptId
    }
  });
// 安全达标 详情
export const selectControlRates = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/selectControlRates',
    method: 'GET',
    params: {
      deptId
    }
  });
// 安全达标 详情
export const selectScheduleReminders = (deptId, dateTime) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/selectScheduleReminders',
    method: 'GET',
    params: {
      deptId,
      dateTime
    }
  });
// 安全达标 达标率
export const selectPeriodControlRates = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/selectPeriodControlRates',
    method: 'GET',
    params: {
      deptId
    }
  });
// 安全达标 安全提示
export const selectSafetyTips = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/selectSafetyTips',
    method: 'GET',
    params: {
      deptId
    }
  });
// 安全达标 按表目录得分对比表
export const selectQiYeAnBiaoMuLu = (deptId) =>
  request({
    url: '/api/blade-platform/platform/qiYeShouYe/selectQiYeAnBiaoMuLu',
    method: 'GET',
    params: {
      deptId
    }
  });