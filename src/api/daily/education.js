import request from '@/router/axios';
//学员学历分析--列表
export const getScholarEducationList = (data) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getScholarEducationList',
        method: 'post',
        data
    });
};
// 结业证明
export const getCertificateOfCompletiont = (data) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getCertificateOfCompletiont',
        method: 'post',
        data
    });
};
// 获取文件地址
export const getFileServer = () => {
    return request({
        url: '/api/blade-train/train/waitCompleted/getFileServer',
        method: 'GET',
    });
};
// 获取课程
export const getCourseSelectList = (params) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getCourseSelectList',
        method: 'GET',
        params
    });
};
// 小时分布图
export const getStudyRecordAnalysisHour = (data) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getStudyRecordAnalysisHour',
        method: 'post',
        data
    });
};
// 每日分布图
export const getStudyRecordAnalysisList = (data) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getStudyRecordAnalysisList',
        method: 'post',
        data
    });
};
// 企业统计分析
export const getUnitStatisticsDetailList = (data) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getUnitStatisticsDetailList',
        method: 'post',
        data
    });
};
// 企业统计详情
export const getUnitStatisticsList = (data) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getUnitStatisticsList',
        method: 'post',
        data
    });
};
// 行业类型
export const getTradeKindList = (name) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getTradeKindList',
        method: 'GET',
        params: {
            name
        }
    });
};
// 行业类型
export const getsummaryStatsCount = (unitName) => {
    return request({
        url: '/api/blade-train/train/scholarEducation/getsummaryStatsCount',
        method: 'GET',
        params: {
            unitName
        }
    });
};
//学习情况统计--列表
export const selectPersonLearnInfoAll = (data) => {
    return request({
        url: `/api/blade-platform/platform/qiYeShouYe/selectPersonLearnInfoAll`,
        method: 'post',
        data
    });
};
//线下学习情况统计--列表
export const selectPersonLearnRemarkAll = (data) => {
    return request({
        url: `/api/blade-platform/platform/qiYeShouYe/selectPersonLearnRemarkAll`,
        method: 'post',
        data
    });
};
//线下学习情况统计--列表
export const studyDownInsert = (data) => {
    return request({
        url: `/api/blade-platform/platform/qiYeShouYe/submit`,
        method: 'post',
        data
    });
};
//线下学习情况统计--详情
export const studyDownDetail = (Id, deptId) => {
    return request({
        url: `/api/blade-platform/platform/qiYeShouYe/detail`,
        method: 'GET',
        params: {
            Id,
            deptId
        }
    });
};
//学习情况统计--人员列表
export const getDriverByDeptIdList = (deptId) => {
    return request({
        url: `/api/blade-platform/platform/qiYeShouYe/getDriverByDeptIdList`,
        method: 'GET',
        params: {
            deptId
        }
    });
};