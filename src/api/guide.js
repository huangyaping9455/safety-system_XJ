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