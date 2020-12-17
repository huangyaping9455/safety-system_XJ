import request from '@/router/axios';

export const alarmMonthQingKuang = (company) =>
  request({
    url: '/api/blade-baojing/baojing/dataCenter/alarmMonthQingKuang',
    method: 'GET',
    params: {
      company
    }
  });

export const alarmZhudongCount = (company) =>
  request({
    url: '/api/blade-baojing/baojing/dataCenter/alarmZhudongCount',
    method: 'GET',
    params: {
      company
    }
  });

export const alarmChuliCount = (company) =>
  request({
    url: '/api/blade-baojing/baojing/dataCenter/alarmChuliCount',
    method: 'GET',
    params: {
      company
    }
  });

export const alarmMonthQushi = (company) =>
  request({
    url: '/api/blade-baojing/baojing/dataCenter/alarmMonthQushi',
    method: 'GET',
    params: {
      company
    }
  });

export const montalarmclassify = (company, type) =>
  request({
    url: '/api/blade-baojing/baojing/dataCenter/montalarmclassify',
    method: 'GET',
    params: {
      company,
      type
    }
  });

export const driverAlarmListMG = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/driverAlarmListMG',
    method: 'post',
    data
  });
};

export const gpslistMG = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/listMG',
    method: 'post',
    data
  });
};
