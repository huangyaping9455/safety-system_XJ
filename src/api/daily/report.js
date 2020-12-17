import request from '@/router/axios';

export const getList = (options) => {
  return request({
    url: '/api/blade-platform/platform/baobiaowenjian/getFileList',
    method: 'post',
    data: options
  });
};

export const picturePreview = (id) => {
  return request({
    url: '/api/blade-platform/platform/baobiaowenjian/preview',
    method: 'post',
    params: {
      fileType: 2,
      id
    }
  });
};

export const getStatchaosu = (options) => {
  return request({
    url: '/api/blade-baojing/baojing/chaosu',
    method: 'post',
    data: options
  });
};

export const getStatPilao = (options) => {
  return request({
    url: '/api/blade-baojing/baojing/pilao',
    method: 'post',
    data: options
  });
};

export const getStatZhudonganquan = (options) => {
  return request({
    url: '/api/blade-baojing/baojing/zhudonganquan',
    method: 'post',
    data: options
  });
};

export const getStatLicheng = (options) => {
  return request({
    url: '/api/blade-baojing/baojing/licheng',
    method: 'post',
    data: options
  });
};

// 报告文件预览
export const getPreview = (params) => {
  return request({
    url: '/api/blade-platform/platform/baobiaowenjian/preview',
    method: 'post',
    "Content-Type": "application/x-www-form-urlencoded",
    params
  });
};