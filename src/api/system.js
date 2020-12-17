import request from '@/router/axios';

export const checkPost = (postId) => {
  return request({
    url: '/api/blade-system/dept/switchingJobs',
    method: 'GET',
    params: {
      postId
    }
  });
};

export const getDeptSubTree = (deptId) => {
  return request({
    url: '/api/blade-system/dept/getDeptSubTree',
    method: 'GET',
    params: {
      deptId
    }
  });
};
// 根据企业ID获取通知详情
export const QYZFHT = (deptId) => {
  return request({
    url: '/api/blade-platform/platform/xinxijiaohuzhuti/getQYZFHT',
    method: 'GET',
    params: {
      deptId
    }
  });
};
// 新增-回复政府信息
export const insert = (data) => {
  return request({
    url: '/api/blade-platform/platform/xinXiJiaoHuHuiFu/insert',
    method: 'post',
    data
  });
};
