import request from '@/router/axios';

export const getDaysCheart = (data) => {
  return request({
    url: '/api/blade-platform/platform/baojingtongji/days',
    method: 'post',
    data
  });
};
export const getYerCheart = (data) => {
  return request({
    url: '/api/blade-platform/platform/baojingtongji/yues',
    method: 'post',
    data
  });
};

export const bindTree = (params) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/bindTree',
    method: 'GET',
    params
  });
};
