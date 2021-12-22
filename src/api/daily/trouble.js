import request from '@/router/axios';
//隐患排查--列表
export const getTroubleList = (params) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/trouble/buiness/list',
        method: 'get',
        params
    });
};
//隐患排查--列表
export const troubleInsert = (data) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/trouble',
        method: 'post',
        data
    });
};
//隐患排查--详情
export const troubledetail = (id) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/trouble/buiness/getInfo/${id}`,
        method: 'get',
    });
};
//隐患排查--修改
export const zhenggai = (data) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/trouble/buiness/zhenggai`,
        method: 'put',
        data
    });
};
//隐患排查--修改
export const fucha = (data) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/trouble/buiness/fucha`,
        method: 'put',
        data
    });
};
//隐患排查设置--列表
export const getTroubleSetList = (params) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/troublerule/list',
        method: 'get',
        params
    });
};
//隐患排查设置--详情
export const troubleruledetail = (id) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/troublerule/${id}`,
        method: 'get',
    });
};
//隐患排查设置--新增
export const troubleruleInsert = (data) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/troublerule`,
        method: 'post',
        data
    });
};
//隐患排查设置--修改
export const troublerule = (data) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/troublerule`,
        method: 'put',
        data
    });
};
//出车三检--列表
export const carcheckList = (params) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/carcheck/list',
        method: 'get',
        params
    });
};
//首页隐患排查数据
export const troublenumList = (id) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/trouble/buiness/countNum/${id}`,
        method: 'get',
    });
};
// 获取隐患排查 明细 列表
export const getTroubleSList = (params) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/trouble/buiness/list',
        method: 'get',
        params
    })
}
// 获取隐患排查列表
export const getTroubleStatisticsList = (params) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/trouble/buiness/statisticsList',
        method: 'get',
        params
    })
}
// 获取隐患排查 数
export const getTroublelistCount = (params) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/trouble/buiness/listCount',
        method: 'get',
        params
    })
}
export const listByCheckIdMsg = (id) => {
    return request({
        url: `/prod-api/tapi/thirdtrouble/carcheck/${id}`,
        method: 'get',
    });
};
// 出车三检 检查项
export const listByCheckId = (data) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/carcheckrule/treelistByCheckId',
        method: "POST",
        data
    })
}
// 出车三检 修改
export const thirdtroubleUpdate = (data) => {
    return request({
        url: '/prod-api/tapi/thirdtrouble/carcheck/checkUpdate',
        method: "PUT",
        data
    })
}