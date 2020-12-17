import request from '@/router/axios';

export const getList = (data) => {
  return request({
    url: '/api/blade-manage/manage/contract/list',
    method: 'post',
    data
  });
};

export const insert = (data) => {
  return request({
    url: '/api/blade-manage/manage/contract/insert',
    method: 'post',
    data
  });
};

export const update = (data) => {
  return request({
    url: '/api/blade-manage/manage/contract/update',
    method: 'post',
    data
  });
};

export const del = (ids) => {
  return request({
    url: '/api/blade-manage/manage/contract/del',
    method: 'post',
    params: { ids }
  });
};
