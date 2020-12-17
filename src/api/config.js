import request from '@/router/axios';


export const getConfig = (token) => {
  return request({
    url: 'api/blade-platform/platform/muban/selectByToken',
    method: 'post',
    params: {
      token
    }
  });
};

export const getDicData = (code) => {
  return request({
    url: 'api/blade-system/dict/getByCode',
    method: 'get',
    params: {
      code
    }
  });
};

export const getField = (url, deptId) => {
  return request({
    url: `/api${url}`,
    method: 'get',
    params: {
      deptId
    }
  });
};

export const getList = (url, data) => {
  return request({
    url: `/api${url}`,
    method: 'post',
    data
  });
};

export const getDetail = (url, id, other = {}) => {
  return request({
    url: `/api${url}`,
    method: 'get',
    params: {
      id,
      ...other
    }
  });
};

export const insert = (url, data) => {
  return request({
    url: `/api${url}`,
    method: 'post',
    data
  });
};

export const update = (url, data) => {
  return request({
    url: `/api${url}`,
    method: 'post',
    data
  });
};

export const remove = (url, id) => {
  return request({
    url: `/api${url}`,
    method: 'post',
    params: {
      id
    }
  });
};

export const removeFiles = (ids) =>
  request({
    url: '/api/blade-platform/platform/upload/goDels',
    method: 'POST',
    params: {
      ids
    }
  });
