import request from '@/router/axios';

export const getTree = (params) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/tree',
    method: 'GET',
    params
  });
};

export const addSubtemplateDir = (id, fileName) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/addDir',
    method: 'POST',
    params: {
      id,
      fileName
    }
  });
};

export const remove = (id) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/del',
    method: 'POST',
    params: {
      id
    }
  });
};

export const uploadDocByImg = (data) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/addImages',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  });
};

export const download = (id) => {
  return request({
    url: 'api/blade-doc/doc/SafetyProductionFile/downloadFile',
    method: 'get',
    params: {
      id
    }
  });
};

export const imgPreview = (id) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/imgPreview',
    method: 'POST',
    params: {
      id
    }
  });
};

export const moveFile = (originId, targetId) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/swapFileSort',
    type: 'get',
    params: {
      originId,
      targetId
    }
  });
};

export const modifyFileNumber = (id, documentNumber) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/updateDocumentNumber',
    method: 'get',
    params: {
      id,
      documentNumber
    }
  });
};

export const directoryTree = (deptId, parentId) => {
  return request({
    url: '/api/blade-doc/doc/SafetyProductionFile/boxTree',
    type: 'get',
    params: {
      deptId,
      parentId
    }
  });
};
