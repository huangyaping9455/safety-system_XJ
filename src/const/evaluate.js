export const evaluateTable = {
  $container: '.left-centent',
  offset: 0,
  columns: [
    {
      title: '自评项目',
      align: 'center',
      width: 200,
      key: 'jianchaxiangmu'
    },
    {
      title: '自评内容',
      key: 'jianchaleirong',
      align: 'center',
      minWidth: 150
    },
    {
      title: '检查方式',
      key: 'jianchafangshi',
      width: 200
    },
    { title: '是否检验', slot: 'test', align: 'center', width: 120 },
    { title: '备注', slot: 'remark', align: 'center', width: 200 },
    { title: '文档', slot: 'file', align: 'center', width: 120 }
  ],
  data: []
};
export const evaluateDetailTable = {
  $container: '.right-centent',
  offset: 0,
  columns: [
    { title: '查看', slot: 'examine', align: 'center', width: 120 },
    { title: '删除', slot: 'del', align: 'center', width: 120 },
    { title: '企业名称', key: 'deptName', align: 'center', width: 120 },
    {
      title: '检查项内容',
      align: 'center',
      width: 200,
      key: 'jianchaxiangmingcheng'
    },
    {
      title: '文档名称',
      key: 'wenjianmingcheng',
      align: 'center',
      minWidth: 150
    },
    {
      title: '操作时间',
      key: 'caozuoshijian',
      width: 100
    },
    { title: '操作人', key: 'caozuoren', align: 'center', width: 120 }
  ],
  data: [{ deptName1: '1111' }]
};
export const evaluateHistoryTable = {
  $container: '.content',
  offset: 0,
  columns: [
    // { title: '查看', slot: 'examine', align: 'center', width: 120 },
    { title: '编辑', slot: 'edi', align: 'center', width: 120 },
    { title: '删除', slot: 'del', align: 'center', width: 120 },
    { title: '企业名称', key: 'deptName', align: 'center', width: 120 },
    {
      title: '报告时间',
      align: 'center',
      width: 200,
      key: 'baogaoshijian'
    },
    {
      title: '标题',
      align: 'center',
      width: 200,
      key: 'biaoti'
    },
    {
      title: '自检周期',
      key: 'zijianzhouqi',
      align: 'center',
      minWidth: 150
    },
    {
      title: '自检类型',
      key: 'yunyingleixing',
      align: 'center',
      minWidth: 150
    },
    {
      title: '合格率',
      key: 'hegelv',
      width: 100
    },
    { title: '是否完结', key: 'isWanjieshow', align: 'center', width: 120 },
    { title: '备注', key: 'beizhu', align: 'center', width: 120 }
  ],
  data: []
};
