import request from '@/router/axios';

export const getList = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/table',
    method: 'post',
    data
  });
};

export const updatetable = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/updatetable',
    method: 'post',
    data
  });
};

export const addTable = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/addtable',
    method: 'post',
    data
  });
};

export const historyList = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/list',
    method: 'post',
    data
  });
};

export const historyDetail = (id) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/detail',
    method: 'post',
    params: {
      id
    }
  });
};

export const setWanjie = (id) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/wanjie',
    method: 'post',
    params: {
      id
    }
  });
};

export const listWendang = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/listwendang',
    method: 'post',
    data
  });
};

export const productionTree = (params) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/tree',
    method: 'GET',
    params
  });
};

export const standardTree = (params) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/tree',
    method: 'get',
    params
  });
};

export const addWendang = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/addwendang',
    method: 'post',
    data
  });
};

export const delWendang = (id) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/delwendang',
    method: 'post',
    params: {
      id
    }
  });
};

export const imgPreview = (suoshuwendangleixing, wenjianid) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/imgPreview',
    method: 'post',
    params: {
      suoshuwendangleixing,
      wenjianid
    }
  });
};

export const historyDel = (id) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/del',
    method: 'post',
    params: {
      id
    }
  });
};

export const periodList = (data) => {
  return request({
    url: '/api/blade-platform/platform/zipinjianchaneirongmuban/listzhouqi',
    method: 'get',
    data
  });
};
