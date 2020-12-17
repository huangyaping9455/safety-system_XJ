import request from '@/router/axios';
export const getAlarmWeichuli = (company) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmweichuli',
    method: 'GET',
    params: {
      company
    }
  });
};
