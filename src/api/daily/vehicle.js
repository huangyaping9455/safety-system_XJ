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
// 单位名称 下拉框数据
export const getByIdDeptList = (deptId) => {
    return request({
        url: '/api/blade-system/dept/getByIdDeptList',
        method: 'get',
        params: {
            deptId,
        }
    });
}; // 获取字典
export const getDicData = (code) => {
    return request({
        url: '/api/blade-system/dict/getByCode',
        method: 'get',
        params: {
            code
        }
    });
};
// 车辆编辑
export const update = (data) => {
    return request({
        url: '/api/blade-platform/platform/vehicle/update',
        method: 'post',
        data
    });
};
//驾驶员编辑
export const updatedriver = (data) => {
    return request({
        url: '/api/blade-platform/platform/jiashiyuan/update',
        method: 'post',
        data
    });
};
// 驾驶员姓名 下拉框数据
export const getByIdJiaShiYuanList = (deptId) => {
    return request({
        url: '/api/blade-platform/platform/jiashiyuan/getByIdJiaShiYuanList',
        method: 'get',
        params: {
            deptId,
        }
    });
};