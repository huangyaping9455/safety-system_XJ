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
// 进出区域统计
export const getQYInOutAreaTJ = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getQYInOutAreaTJ',
    method: 'post',
    data
  });
};
// 车辆轨迹完整率
export const getTrajectoryIntegrityTJ = (params) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getTrajectoryIntegrityTJ',
    method: 'post',
    params: params,
  });
};
// 里程日报统计
export const getMileageTJ = (params) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getMileageTJ',
    method: 'post',
    params: params
  });
};
// 车辆漂移明细
export const getGuiJiYiChangTJ = (params) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getGuiJiYiChangTJ',
    method: 'post',
    params: params
  });
};
// 停车汇总
export const getTingCheHuiZongTJ = (params) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getTingCheHuiZongTJ',
    method: 'post',
    params: params
  });
};
// 停车明细
export const getTingCheMingXiTJ = (params) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getTingCheMingXiTJ',
    method: 'post',
    params: params
  });
};