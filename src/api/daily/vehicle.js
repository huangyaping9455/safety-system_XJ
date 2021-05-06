import request from '@/router/axios';

export const vehicleList = (data) => {
    return request({
        url: '/api/blade-platform/platform/vehicle/list',
        method: 'post',
        data
    });
};
export const driverList = (data) => {
    return request({
        url: '/api/blade-platform/platform/jiashiyuan/list',
        method: 'post',
        data
    });
};
// 在线车辆明细
export const getTpvehdataTJ = (data) => {
    return request({
        url: '/api/blade-platform/platform/qiYeTongJi/getTpvehdataTJ',
        method: 'post',
        data
    });
};