import request from '@/router/axios';

export const getTree = (params) => {
  return request({
    url: '/api/blade-doc/doc/qiyewenjian/tree',
    method: 'GET',
    params
  });
};

export const addSubtemplateDir = (id, fileName) => {
  return request({
    url: '/api/blade-doc/doc/qiyewenjian/addDir',
    method: 'POST',
    params: {
      id,
      fileName
    }
  });
};

export const imgPreview = (id) => {
  return request({
    url: '/api/blade-doc/doc/qiyewenjian/imgPreview',
    method: 'POST',
    params: {
      id
    }
  });
};

export const remove = (id) => {
  return request({
    url: '/api/blade-doc/doc/qiyewenjian/del',
    method: 'POST',
    params: {
      id
    }
  });
};

export const download = (id) => {
  return request({
    url: 'api/blade-doc/doc/qiyewenjian/downloadFile',
    method: 'get',
    params: {
      id
    }
  });
};

export const modifyFileNumber = (id, documentNumber) => {
  return request({
    url: '/api/blade-doc/doc/qiyewenjian/updateDocumentNumber',
    method: 'get',
    params: {
      id,
      documentNumber
    }
  });
};

export const moveFile = (originId, targetId) => {
  return request({
    url: '/api/blade-doc/doc/qiyewenjian/swapFileSort',
    type: 'get',
    params: {
      originId,
      targetId
    }
  });
};
