import request from '@/router/axios';

export const getFreightList = (data) => {
  return request({
    url: '/api/blade-manage/manage/waybill/list',
    method: 'post',
    data
  });
};

export const addWaybill = (data) => {
  return request({
    url: '/api/blade-manage/manage/waybill/insert',
    method: 'post',
    data
  });
};

export const editWaybill = (data) => {
  return request({
    url: '/api/blade-manage/manage/waybill/update',
    method: 'post',
    data
  });
};

export const delWaybill = (id) => {
  return request({
    url: '/api/blade-manage/manage/waybill/del',
    method: 'post',
    params: { id }
  });
};

export const detailWaybill = (id) => {
  return request({
    url: '/api/blade-manage/manage/waybill/detail',
    method: 'post',
    params: { id }
  });
};

export const getvehicleList = (params) => {
  return request({
    url: '/api/blade-platform/platform/vehicle/selectByCL',
    method: 'get',
    params
  });
};

export const getListTotal = (data) => {
  return request({
    url: '/api/blade-manage/manage/operations/listTotal',
    method: 'post',
    data
  });
};

export const getList = (data) => {
  return request({
    url: '/api/blade-manage/manage/operations/list',
    method: 'post',
    data
  });
};

export const insert = (data) => {
  return request({
    url: '/api/blade-manage/manage/operations/insert',
    method: 'post',
    data
  });
};

export const update = (data) => {
  return request({
    url: '/api/blade-manage/manage/operations/update',
    method: 'post',
    data
  });
};

export const remove = (id) => {
  return request({
    url: '/api/blade-manage/manage/operations/del',
    method: 'post',
    params: { id }
  });
};

export const detail = (id) => {
  return request({
    url: '/api/blade-manage/manage/operations/detail',
    method: 'post',
    params: { id }
  });
};
