import request from '@/router/axios';

export const getList = (data) => {
  return request({
    url: '/api/blade-platform/platform/jinritixing/list',
    method: 'post',
    data
  });
};
