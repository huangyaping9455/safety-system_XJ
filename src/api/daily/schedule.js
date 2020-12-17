import request from '@/router/axios';

export const getPostInfo = (postId) => {
  return request({
    url: '/api/blade-platform/platform/departmentpost/selectByPostId',
    method: 'GET',
    params: {
      postId
    }
  });
};

export const imgPreviewBySuoshuren = (fileProperty) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/imgPreviewBySuoshuren',
    method: 'POST',
    params: {
      fileProperty
    }
  });
};

export const getSchedule = (date, deptId) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/richengIndex',
    method: 'GET',
    params: {
      date,
      deptId
    }
  });
};

export const getRichengList = (deptId, date) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getRichengList',
    method: 'GET',
    params: {
      deptId,
      date
    }
  });
};

export const getChaoqiRicheng = (deptId) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getChaoqiRicheng',
    method: 'GET',
    params: {
      deptId
    }
  });
};

export const getRichengDetail = (id) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getRichengDetail',
    method: 'GET',
    params: {
      id
    }
  });
};

export const getAnpaiRicheng = () => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getAnpaiRicheng',
    method: 'GET',
    params: {}
  });
};

export const updateRicheng = (data) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/updateRicheng',
    method: 'post',
    data
  });
};

export const addRicheng = (data) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/addRicheng',
    method: 'post',
    data
  });
};
