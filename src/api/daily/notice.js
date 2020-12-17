import request from '@/router/axios';

export const noticeList = (data) => {
  return request({
    url: '/api/blade-platform/platform/zQHT/getTJAll',
    method: 'post',
    data
  });
};