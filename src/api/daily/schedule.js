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
export const getRichengList = (deptId, dateTime, size, current, type) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getRiChengByDateList',
    method: 'post',
    data: {
      deptId,
      dateTime,
      size,
      current,
      type
    }
  });
};

export const getChaoqiRicheng = (deptId, dateTime, size, current, type) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getRiChengChaoQiByDateList',
    method: 'post',
    data: {
      deptId,
      dateTime,
      size,
      current,
      type
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
export const getAnpaiRicheng = (deptId, size, current) => {
  return request({
    url: '/api/blade-platform/platform/richenganpai/getAnpaiByUserList',
    method: 'post',
    data: {
      deptId,
      size,
      current
    }
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