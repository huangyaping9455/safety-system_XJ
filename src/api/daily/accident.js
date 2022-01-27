import request from '@/router/axios';

export const getAccidentList = (data) => {
    return request({
        url: '/api/blade-platform/platform/shigubaogao/list',
        method: 'post',
        data
    });
};
// 新增
export const accidentInsert = (data) => {
    return request({
        url: '/api/blade-platform/platform/shigubaogao/insert',
        method: 'post',
        data
    });
};
// 修改
export const accidentUpdate = (data) => {
    return request({
        url: '/api/blade-platform/platform/shigubaogao/update',
        method: 'post',
        data
    });
};
// 修改
export const accidentDelete = (id) => {
    return request({
        url: '/api/blade-platform/platform/shigubaogao/del',
        method: 'post',
        params: {
            id
        }
    });
};
// 根据企业id获取事故详情
export const accidentDetail = (id) => {
    return request({
        url: '/api/blade-platform/platform/shigubaogao/detail',
        method: 'GET',
        params: {
            id
        }
    });
};
// 省 市 县
export const getSheng = (deptId, type) => {
    return request({
        url: '/api/blade-system/dept/getDeptById',
        method: 'get',
        params: {
            deptId,
            type,
            remark: 0
        }
    });
};