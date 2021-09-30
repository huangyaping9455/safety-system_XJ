import request from '@/router/axios';
export const getAlarmWeichuli = (deptId) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmweichuli',
    method: 'GET',
    params: {
      deptId
    }
  });
};
export const theExtendedAlarmDay = (deptId) => {
  return request({
    url: '/api/blade-baojing/baojing/theExtendedAlarmDay',
    method: 'GET',
    params: {
      deptId
    }
  });
};
export const overdueAlarmDay = (deptId) => {
  return request({
    url: '/api/blade-baojing/baojing/overdueAlarmDay',
    method: 'GET',
    params: {
      deptId
    }
  });
};
export const theshensubohuiAlarmDay = (deptId) => {
  return request({
    url: '/api/blade-baojing/baojing/theshensubohuiAlarmDay',
    method: 'GET',
    params: {
      deptId
    }
  });
};