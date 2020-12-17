import request from '@/router/axios';

export const getPaiMingList = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getBJPMTJ',
    method: 'post',
    data
  });
};

export const getAllSumList = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getBJTJJS',
    method: 'post',
    data
  });
};
// 车辆日运行统计
export const getRYXTJList = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getBJRYXTJ',
    method: 'post',
    data
  });
};