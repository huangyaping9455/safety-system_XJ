import request from '@/router/axios';

export const getTree = (params) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/tree',
    method: 'get',
    params
  });
};

export const addSubtemplateDir = (id, fileName) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/addSubtemplateDir',
    method: 'POST',
    params: {
      id,
      fileName
    }
  });
};

export const rename = (id, name) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/reName',
    method: 'get',
    params: {
      id,
      name
    }
  });
};

export const imgPreview = (id, docSource) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/imgPreview',
    method: 'POST',
    params: {
      id,
      docSource
    }
  });
};

export const remove = (id) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/delSubtemplate',
    method: 'POST',
    params: {
      id
    }
  });
};

export const download = (id) => {
  return request({
    url: 'api/blade-doc/doc/biaozhunhuamuban/downloadSubtemplateFile',
    method: 'get',
    params: {
      id
    }
  });
};

export const modifyFileNumber = (id, documentNumber) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/updateDocumentNumber',
    method: 'get',
    params: {
      id,
      documentNumber
    }
  });
};

export const moveFile = (originId, targetId) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/swapFileSort',
    type: 'get',
    params: {
      originId,
      targetId
    }
  });
};

export const setFileNature = (id, fileProperty) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/updateFileProperty',
    method: 'get',
    params: {
      id,
      fileProperty
    }
  });
};

export const setFilebelong = (id, fileSuoshurenId) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/updateFileSuoshuren',
    method: 'get',
    params: {
      id,
      fileSuoshurenId
    }
  });
};
export const cancelSafetyBind = (params) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/cancelSafetyBind',
    method: 'GET',
    params
  });
};

export const setsafetyBind = (params) => {
  return request({
    url: '/api/blade-doc/doc/biaozhunhuamuban/safetyBind',
    method: 'GET',
    params
  });
};
