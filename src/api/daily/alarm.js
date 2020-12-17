import request from '@/router/axios';

export const getGPSAlarmList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/getBDSBAlarmList',
    method: 'post',
    data
  });
};

export const getBudingweiAlarmList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/budingweilist',
    method: 'post',
    data
  });
};

export const getNotLineAlarmList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/buzaixianlist',
    method: 'post',
    data
  });
};
export const getAlarmDetail = (params) => {
  return request({
    url: '/api/blade-baojing/baojing/selectBJDetail',
    method: 'post',
    params
  });
};

export const getDriverAlarmList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/getZDAQSBAlarmList',
    method: 'post',
    data
  });
};

export const disposeAlarm = (params) => {
  return request({
    url: '/api/blade-baojing/baojing/insertChuli',
    method: 'post',
    params
  });
};

export const appealAlarm = (params) => {
  return request({
    url: '/api/blade-baojing/baojing/insertShenshu',
    method: 'post',
    params
  });
};

export const getAlarmTongji = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/realTimeBaojingTongji',
    method: 'post',
    data
  });
};

export const getAlarmImg = (params) => {
  return request({
    url: '/api/blade-gps/gps/gpsdata/getImageData',
    method: 'GET',
    params
  });
};

export const getAlarmPoint = (params) => {
  return request({
    url: '/api/blade-gps/gps/gpsdata/getPointDataNew',
    method: 'GET',
    params
  });
};

export const getAlarmVehicle = (params) => {
  return request({
    url: '/api/blade-platform/platform/vehicle/selectByCPYS',
    method: 'GET',
    params
  });
};

export const getChosuList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmTongji/ChosuList',
    method: 'POST',
    data
  });
};

export const getPilaoList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmTongji/PilaoList',
    method: 'POST',
    data
  });
};

export const getBudingweiList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmTongji/BudingweiList',
    method: 'POST',
    data
  });
};

export const getBuzaiweiList = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmTongji/BuzaixianList',
    method: 'POST',
    data
  });
};

export const getAlarmGuIdList = (params) => {
  return request({
    url: '/api/blade-platform/platform/zhengFuBaoJingTongJi/getAlarmGuIdList',
    method: 'GET',
    params
  });
};