import request from '@/router/axios';

export const vehicleList = (data) => {
    return request({
        // url: '/api/blade-platform/platform/vehicle/list',
        url: '/api/blade-platform/platform/vehicle/vehicleEnterprise/list',
        method: 'post',
        data
    });
};
//新增-车辆资料管理
export const insert = (data) => {
    return request({
        url: '/api/blade-platform/platform/vehicle/vehicleEnterprise/insert',
        method: 'post',
        data
    });
};
// 车辆编辑
export const update = (data) => {
    return request({
        url: '/api/blade-platform/platform/vehicle/vehicleEnterprise/update',
        method: 'post',
        data
    });
};
// 车辆编辑
export const delet = (id) => {
    return request({
        url: '/api/blade-platform/platform/vehicle/vehicleEnterprise/del',
        method: 'post',
        params: {
            id
        }
    });
};
export const driverList = (data) => {
    return request({
        // url: '/api/blade-platform/platform/jiashiyuan/list',
        url: '/api/blade-platform/platform/jiaShiYuanEnterprise/getPageList',
        method: 'post',
        data
    });
};
// 从业人员 新增
export const driverInsert = (data) => {
    return request({
        url: '/api/blade-platform/platform/jiaShiYuanEnterprise/insert',
        method: 'post',
        data
    });
};

//从业人员编辑
export const updatedriver = (data) => {
    return request({
        // url: '/api/blade-anbiao/anbiao/jiashiyuan/update',
        url: '/api/blade-platform/platform/jiaShiYuanEnterprise/update',
        method: 'post',
        data
    });
};
//从业人员编辑
export const driverDelete = (data) => {
    return request({
        url: '/api/blade-platform/platform/jiaShiYuanEnterprise/del',
        method: 'post',
        params: data
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
// // 车辆编辑
// export const update = (data) => {
//     return request({
//         url: '/api/blade-platform/platform/vehicle/update',
//         method: 'post',
//         data
//     });
// };
//驾驶员编辑
// export const updatedriver = (data) => {
//     return request({
//         url: '/api/blade-platform/platform/jiashiyuan/update',
//         method: 'post',
//         data
//     });
// };
// 驾驶员姓名 下拉框数据
export const getDriverByDeptIdList = (deptId) => {
    return request({
        url: '/api/blade-platform/platform/jiaShiYuanEnterprise/getDriverByDeptIdList',
        method: 'get',
        params: {
            deptId,
        }
    });
};