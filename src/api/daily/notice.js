import request from '@/router/axios';

export const noticeList = (data) => {
  return request({
    url: '/api/blade-platform/platform/zQHT/getTJAll',
    method: 'post',
    data
  });
};
export const getOne = (data) => {
  return request({
    url: '/api/blade-platform/platform/xinxijiaohuzhuti/getOne',
    method: 'post',
    data
  });
};