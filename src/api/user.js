import request from '@/router/axios';

export const getGuidePage = (deptId) =>
  request({
    url: '/api/blade-system/api/loginByDeptId',
    method: 'GET',
    params: {
      deptId
    }
  });

export const logout = () =>
  request({
    url: '/api/blade-auth/auth/signOut',
    method: 'get'
  });
//type为1 不需用 验证码
export const loginByUsername = (
    name,
    password,
    clientVerifyCode,
    type
  ) =>
  request({
    url: '/api/blade-auth/auth/signIn',
    method: 'post',
    params: {
      name,
      password,
      clientVerifyCode,
      type
    }
  });

export const getButtons = (postId) =>
  request({
    url: '/api/blade-system/menu/buttons',
    method: 'get',
    params: {
      postId
    }
  });

export const getUserInfo = (postId) =>
  request({
    url: '/api/blade-system/dept/getUserInfo',
    method: 'get',
    params: {
      postId
    }
  });

export const refeshToken = () =>
  request({
    url: '/api/blade-system/user/refesh',
    method: 'post'
  });

export const getMenuAB = (postId) =>
  request({
    url: '/api/blade-system/menu/getMenu',
    method: 'get',
    params: {
      postId
    }
  });
export const verificationCode = (postId) =>
  request({
    url: '/api/blade-auth/auth/getVerificationCode',
    method: 'get',
    params: {
      postId
    }
  });

export const getUsersByDept = (deptId) =>
  request({
    url: '/api/blade-user/user/selectByDeptId',
    method: 'get',
    params: {
      deptId
    }
  });

export const getDicData = (code) =>
  request({
    url: '/api/blade-system/dict/getByCode',
    method: 'get',
    params: {
      code
    }
  });

export const getPermission = (postId) =>
  request({
    url: '/api/blade-system/dept/permission',
    method: 'get',
    params: {
      postId
    }
  });

export const changepassword = (userId, oldpassWord, passWord) =>
  request({
    url: '/api/blade-user/user/update-password',
    method: 'post',
    params: {
      userId,
      oldpassWord,
      passWord
    }
  });