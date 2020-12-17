import request from '@/router/axios';

export const getHome = (params) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/managehome',
    method: 'post',
    params
  });
};

export const getListBenYueJianKong = (data) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/listBenYueJianKong',
    method: 'post',
    data
  });
};

export const getListJianKong = (data) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/listJianKong',
    method: 'post',
    data
  });
};

export const getCarYunYing = (params) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/selectByYunYing',
    method: 'post',
    params
  });
};

export const getListdefault = (params) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/listdefault',
    method: 'post',
    params
  });
};

export const updateDefault = (data) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/updateDefault',
    method: 'post',
    data
  });
};

export const selectByYunYingMonth = (data) => {
  return request({
    url: '/api/blade-manage/manage/manageHome/selectByYunYingMonth',
    method: 'post',
    data
  });
};
