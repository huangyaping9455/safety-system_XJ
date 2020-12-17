import request from '@/router/axios';

export const severityCount = (params) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmdangerous/severityCount',
    method: 'GET',
    params
  });
};

export const alarmTypeplateCout = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmdangerous/alarmTypeplateCout',
    method: 'post',
    data
  });
};

export const alarmlistSerious = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmdangerous/alarmlist',
    method: 'post',
    data
  });
};

export const driverlistSerious = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmdangerous/driverlist',
    method: 'post',
    data
  });
};
