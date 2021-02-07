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
export const getTrajectoryIntegrityTJ = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getTrajectoryIntegrityTJ',
    method: 'post',
    data
  });
};
// 里程日报统计
export const getMileageTJ = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getMileageTJ',
    method: 'post',
    data
  });
};
// 车辆漂移明细
export const getGuiJiYiChangTJ = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getGuiJiYiChangTJ',
    method: 'post',
    data
  });
};
// 停车汇总
export const getTingCheHuiZongTJ = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getTingCheHuiZongTJ',
    method: 'post',
    data
  });
};
// 停车明细
export const getTingCheMingXiTJ = (data) => {
  return request({
    url: '/api/blade-platform/platform/qiYeTongJi/getTingCheMingXiTJ',
    method: 'post',
    data
  });
};