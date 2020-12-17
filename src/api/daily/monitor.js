import request from '@/router/axios';

export const getAlarmTongji = (company) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmTongji/alarmCountDay',
    method: 'post',
    params: {
      company
    }
  });
};

export const getAlarmGps = (company, AlarmType) => {
  return request({
    url: '/api/blade-baojing/baojing/alarmDay',
    method: 'get',
    params: {
      company,
      AlarmType
    }
  });
};

export const getAlarmZhudong = (company, AlarmType) => {
  return request({
    url: '/api/blade-baojing/baojing/zhudongDay',
    method: 'get',
    params: {
      company,
      AlarmType
    }
  });
};
export const getVehicleStat = (dept) => {
  return request({
    url: '/api/blade-platform/platform/gpsVehicle/getQYVehicleCount',
    method: 'get',
    params: {
      dept
    }
  });
};
export const getVehicleList = (
  company,
  vehicleStatus,
  cpn,
  current,
  size,
  offsetNo,
  order,
  orderColumn,
  page,
  pagesize,
  pageTotal,
  records) => {
  return request({
    url: '/api/blade-gps/gps/gpsdata/getVehicleNewPage',
    method: 'get',
    params: {
      company,
      vehicleStatus,
      cpn,
      current,
      size,
      offsetNo,
      order,
      orderColumn,
      pageTotal,
      page,
      pagesize,
      records
    }
  });
};
export const getQYVehicleList = (
  dept,
  cpn,
  page,
  pagesize,
  zaixian) => {
  return request({
    url: '/api/blade-platform/platform/gpsVehicle/getQYVehicleList',
    method: 'get',
    params: {
      dept,
      cpn,
      page,
      pagesize,
      zaixian
    }
  });
};
export const getVehicleDetail = (cheliangpaizhao, chepaiyanse, deptId) => {
  return request({
    url: '/api/blade-platform/platform/vehicle/vehicledetai',
    method: 'post',
    params: {
      cheliangpaizhao,
      chepaiyanse,
      deptId
    }
  });
};
export const getGpsVehicleDetail = (plateNumber, company) => {
  return request({
    url: '/api/blade-platform/platform/vehicle/GPSVehicledetail',
    method: 'post',
    params: {
      plateNumber,
      company
    }
  });
};

export const getAlarmTimeData = (data) => {
  return request({
    url: '/api/blade-baojing/baojing/AlarmTimeData',
    // url: '/api/blade-gps/gps/gpsdata/getVehicleNewPage',
    method: 'post',
    data
  });
};

export const getVehlicPTdetail = (data) => {
  return request({
    url: '/api/blade-gps/gps/gpsdata/getVehlicPTNewdetail',
    // url: '/api/blade-gps/gps/gpsdata/getVehicleNewPage',
    method: 'get',
    data
  });
};

export const getAvgTrend = (params) => {
  return request({
    url: '/api/blade-gps/gps/gpsdata/getAvgTrend',
    method: 'get',
    params
  });
};
export const getVehicleTree = (company, cph) => {
  console.log(company, '=====')
  return request({
    url: '/api/blade-gps/gps/gpsdata/getVehicleTree',
    method: 'get',
    params: {
      company,
      cph
    }
  });
};