import request from '@/router/axios';

export const getlistLirun = (data) => {
  return request({
    url: '/api/blade-manage/manage/settlement/listLirun',
    method: 'post',
    data
  });
};

export const getlistZhiChu = (data) => {
  return request({
    url: '/api/blade-manage/manage/settlement/listZhiChu',
    method: 'post',
    data
  });
};

export const getlistReport = (data) => {
  return request({
    url: '/api/blade-manage/manage/settlement/list',
    method: 'post',
    data
  });
};
