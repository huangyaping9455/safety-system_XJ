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