import request from '@/router/axios';

export const getFuelSubsidies = (data) => {
  return request({
    url: '/api/blade-platform/platform/ranyoubutie/list',
    method: 'post',
    data
  });
};
export const getFuelSubsidiesDetail = (data) => {
  return request({
    url: '/api/blade-platform/platform/ranyoubutiexiangqing/page',
    method: 'post',
    data
  });
};
