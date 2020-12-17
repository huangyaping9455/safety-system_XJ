import dayjs from 'dayjs';
import { getvehicleList } from '@/api/operation/freight';
// ----------------------------   运营首页模块 ----------------------------

// 年统计图表
export const yearChart = (zaixian, wanceng) => {
  return {
    title: {
      left: 'center',
      text: '车辆在线率与里程达标率',
      textStyle: {
        fontSize: 15,
        lineHeight: 36
      }
    },
    color: ['#28ff41', '#1067ff'],
    legend: {
      orient: 'vertical',
      x: 'right', //可设定图例在左、右、居中
      padding: [10, 10, 0, 0],
      data: ['在线率', '里程达标率']
    },
    tooltip: {
      trigger: 'axis',
      // formatter: '{a0}:{c0}%'
      formatter: '{a0}:{c0}' + '%' + '<br/>' + '{a1}:{c1}' + '%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '在线率',
        data: zaixian,
        type: 'line'
      },
      {
        name: '里程达标率',
        data: wanceng,
        type: 'line'
      }
    ]
  };
};

// 车辆运营情况图表
export const carPopChart = (text, data) => {
  return {
    title: {
      left: 'center',
      text,
      textStyle: {
        fontSize: 15,
        lineHeight: 36
      }
    },
    color: ['#1067ff'],
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}:{c0}%'
    },
    grid: {
      left: '3%',
      right: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '里程完成率',
        data,
        type: 'line'
      }
    ]
  };
};

// 在运行车辆报警列表配置
export const zaiyunTableConfig = {
  $container: '.table-box',
  onList: 'getList',
  searchColumns: [
    {
      label: '车辆牌照',
      key: 'cheliangpaizhao',
      placeholder: '请输入车辆牌照',
      type: 'text'
    },
    {
      label: '是否合格',
      key: 'zhuangtai',
      type: 'select',
      clearable: true,
      placeholder: '全部',
      defaultValue: '',
      options: [
        { label: '全部', value: '' },
        { label: '合格', value: '合格' },
        { label: '不合格', value: '不合格' }
      ]
    }
  ],
  columns: [
    { title: '车牌', key: 'cheliangpaizhao', align: 'center', width: 180 },
    {
      title: '实际里程(公里)',
      key: 'shiji',
      align: 'center',
      width: 180
    },
    {
      title: '达标里程(公里)',
      key: 'dabiao',
      align: 'center',
      width: 180
    },
    {
      title: '里程状态',
      key: 'zhuangtai',
      slot: 'type',
      align: 'center',
      minWidth: 150
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 80
    }
  ],
  data: []
};

// ----------------------------   货运管理模块 ----------------------------

// 远程搜索 - 车牌号 - 常用字段
const getPlate = (attr = {}) => {
  return {
    label: '车牌号',
    key: 'cheliangpaizhao',
    type: 'select',
    placeholder: '请选择车牌号',
    loading: false,
    filterable: true,
    remote: true,
    remoteMethod: async function(v) {
      this.loading = true;
      let res = await getvehicleList({ cheliangpaizhao: v });
      this.loading = false;
      this.options = res.data.data.map((v) => {
        return {
          label: v.cheliangpaizhao,
          value: v.cheliangpaizhao,
          id: v.id
        };
      });
    },
    options: [],
    rules: {
      required: true,
      message: '车牌号不可为空',
      trigger: 'blur'
    },
    on: {
      'on-change': function(data, value) {
        let item = this.options.find((v) => value == v.value);
        if (item) {
          data.vehicleId = item.id;
        }
      }
    },
    ...attr
  };
};

// 表单 - 附件 - 常用字段
const getUpload = (attr = {}) => {
  return {
    width: 1,
    formOpt: {
      label: '附件',
      key: 'fujian',
      type: 'upload',
      options: {
        table: 'manage_operations',
        prop: 'fujian',
        accept: 'image/*',
        format: ['jpg', 'png'],
        maxNumber: 1,
        tip: '文件格式限制：.jpg,.png'
      },
      ...attr
    }
  };
};

// 列表查询 常用
const baseSearch = [
  {
    label: '统计时间',
    key: 'date',
    type: 'daterange'
  },
  {
    label: '车辆牌照',
    key: 'cheliangpaizhao',
    placeholder: '请输入车辆牌照',
    type: 'text'
  }
];

// 货运表格配置
export const freightTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: [
    ...baseSearch,
    {
      label: '磅单序号',
      key: 'intoNum',
      placeholder: '请输入入库磅单序号',
      type: 'text'
    }
  ],
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 100
    },
    { title: '状态', key: 'examine', align: 'center', width: 100 },
    { title: '磅单序号', key: 'outNum', align: 'center', width: 150 },
    { title: '出库量（kg）', key: 'onetWeight', align: 'center', width: 150 },
    {
      title: '入库量（kg）',
      key: 'inetWeight',
      align: 'center',
      width: 150
    },
    {
      title: '燃油费',
      key: 'ranyoufei',
      align: 'center',
      sum: true,
      width: 150
    },
    {
      title: '过路费',
      key: 'guolufei',
      align: 'center',
      sum: true,
      width: 150
    },
    {
      title: '其它费用',
      key: 'qitafei',
      align: 'center',
      width: 180,
      sortable: 'custom',
      sum: true,
      display: 'GPS'
    },
    {
      title: '入库日期',
      key: 'intoTime',
      align: 'center',
      tooltip: true,
      minWidth: 200
    },
    {
      title: '出库日期',
      key: 'outTime',
      align: 'center',
      tooltip: true,
      minWidth: 200
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    }
  ],
  data: []
};

// 费用统计
export const costStatTable = {
  $container: '.cost-stat-table',
  onList: 'getListTotal',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 130,
      ignore: true
    },
    {
      title: '收入合计',
      key: 'shouru',
      align: 'center',
      width: 150,
      sum: true,
      ignore: true
    },
    {
      title: '支出合计',
      align: 'center',
      key: 'zhichu',
      width: 150,
      sum: true,
      ignore: true
    },
    {
      title: '运单相关费用',
      align: 'center',
      ignore: true,
      children: [
        {
          title: '燃油费',
          key: 'ranyou',
          align: 'center',
          type: '1',
          sortable: 'custom',
          sum: true,
          width: 130
        },
        {
          title: '交通费',
          key: 'jiaotong',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '2',
          width: 130
        },
        {
          title: '其他费用',
          key: 'qita',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '7',
          width: 130
        }
      ]
    },
    {
      title: '非运单相关费用',
      align: 'center',
      ignore: true,
      children: [
        {
          title: '维修费',
          key: 'weixiu',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '3',
          width: 130
        },
        {
          title: '保险费',
          key: 'baoxian',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '4',
          width: 130
        },
        {
          title: '车辆年审',
          key: 'vehiclenianshen',
          sortable: 'custom',
          align: 'center',
          sum: true,
          type: '5',
          width: 140
        },
        {
          title: '驾驶员年审',
          key: 'drivenianshen',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '6',
          width: 140
        },
        {
          title: '燃油费',
          key: 'franyou',
          align: 'center',
          type: '1',
          sortable: 'custom',
          sum: true,
          width: 130
        },
        {
          title: '交通费',
          key: 'fjiaotong',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '2',
          width: 130
        },
        {
          title: '其他费用',
          key: 'fqita',
          align: 'center',
          sortable: 'custom',
          sum: true,
          type: '7',
          width: 130
        }
      ]
    }
  ],
  data: []
};
// 燃油费
export const fueloilTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 100,
      formOpt: getPlate()
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center',
      width: 100
    },
    {
      title: '加油金额',
      key: 'jine',
      align: 'center',
      width: 130,
      sum: true,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '加油时间',
      key: 'refuelingTime',
      align: 'center',
      type: 'date',
      width: 200,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '加油型号',
      key: 'fuelType',
      type: 'text',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '油卡编号',
      key: 'oilcardNumber',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '加油量(升)',
      key: 'fuelVolume',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '单价',
      key: 'unitPrice',
      align: 'center',
      width: 100,
      sum: true,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '仪表里程',
      key: 'meterMileage',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '百公里耗油',
      key: 'oilConsumption',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '是否有单据',
      key: 'isBill',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'select',
        options: [{ label: '是', value: '是' }, { label: '否', value: '否' }]
      }
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    },
    getUpload()
  ],
  data: []
};
// 交通费
export const carfareTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 300,
      formOpt: getPlate()
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center'
    },
    {
      title: '金额',
      key: 'jine',
      align: 'center',
      width: 100,
      sum: true,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '类型',
      key: 'leixing ',
      align: 'center',
      width: 120,
      formOpt: {
        type: 'select',
        options: [
          {
            label: '过路费 ',
            value: '过路费 '
          },
          {
            label: '燃油费',
            value: '燃油费'
          }
        ]
      }
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    }
  ],
  data: []
};
// 维修费
export const maintainTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 100,
      formOpt: getPlate()
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center',
      width: 100
    },
    {
      title: '维护单位',
      key: 'weihudanwei',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '维修金额',
      key: 'jine',
      align: 'center',
      width: 100,
      sum: true,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '维护类别',
      key: 'weihuleibie',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'select',
        options: [
          {
            label: '维修',
            value: '维修'
          },
          {
            label: '交通事故维修',
            value: '交通事故维修'
          },
          {
            label: '一级维护',
            value: '一级维护'
          },
          {
            label: '二级维护',
            value: '二级维护'
          },
          {
            label: '发动机保养',
            value: '发动机保养'
          },
          {
            label: '变速箱保养',
            value: '变速箱保养'
          },
          {
            label: '后桥保养',
            value: '后桥保养'
          },
          {
            label: '一级保养',
            value: '一级保养'
          },
          {
            label: '四轮保养',
            value: '四轮保养'
          },
          {
            label: '换新胎',
            value: '换新胎'
          },
          {
            label: '发动机故障',
            value: '发动机故障,'
          },
          {
            label: '变速箱故障',
            value: '变速箱故障'
          },
          {
            label: '仪表故障',
            value: '仪表故障'
          },
          {
            label: '前后桥故障',
            value: '前后桥故障'
          },
          {
            label: '轮胎故障',
            value: '轮胎故障'
          },
          {
            label: '电器故障',
            value: '电器故障'
          },
          {
            label: '制动系统',
            value: '制动系统'
          },
          {
            label: '方向系统',
            value: '方向系统'
          },
          {
            label: '车身故障',
            value: '车身故障'
          },
          {
            label: '地盘故障',
            value: '地盘故障'
          }
        ]
      }
    },
    {
      title: '进厂日期',
      key: 'jinchangriqi',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '进厂里程',
      key: 'jinchanglicheng',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '出厂日期',
      key: 'chuchangriqi',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '下次维护时间',
      key: 'xiaciweihushijian',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '维护合同编号',
      key: 'weihuhetongbianhao',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '维护内容',
      key: 'weihuneirong',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    },
    getUpload()
  ],
  data: []
};
// 保险费
export const insuranceTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 100,
      formOpt: getPlate()
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center',
      width: 100
    },
    {
      title: '保险金额',
      key: 'jine',
      align: 'center',
      sum: true,
      width: 200,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '被保险人',
      key: 'beibaoxianren',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '登记人',
      key: 'dengjiren',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '登记时间',
      key: 'dengjishijian',
      align: 'center',
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '备注',
      key: 'beizhu ',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'textarea'
      }
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    },
    getUpload()
  ],
  data: []
};
// 车前年审
export const carAnnualTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 200,
      formOpt: getPlate()
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center',
      width: 100
    },
    {
      title: '检验日期',
      key: 'jianyanriqi',
      align: 'center',
      width: 120,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '检验金额',
      key: 'jine',
      align: 'center',
      sum: true,
      width: 200,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '是否合格',
      key: 'shifouhege',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'select',
        options: [{ label: '是', value: '是' }, { label: '否', value: '否' }]
      }
    },
    {
      title: '备注',
      key: 'beizhu',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    },
    getUpload()
  ],
  data: []
};
//驾驶员年审
export const driverAnnualTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 100,
      formOpt: getPlate()
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center',
      width: 100
    },
    {
      title: '姓名',
      key: 'xingming',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '金额',
      key: 'jine',
      align: 'center',
      sum: true,
      width: 100,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '证件名称',
      key: 'zhengjianmingcheng',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '审验类型',
      key: 'shenyanleixing',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text',
        select: [
          {
            label: '运输证',
            value: '运输证'
          },
          {
            label: '行驶证',
            value: '行驶证'
          },
          {
            label: '形式许可证',
            value: '形式许可证'
          }
        ]
      }
    },
    {
      title: '审验机构',
      key: 'shenyanjigou',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '审验日期',
      key: 'shenyanriqi',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '有效日期',
      key: 'youxiaoriqi',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'date'
      }
    },

    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    },
    getUpload()
  ],
  data: []
};
// 其他费用
export const otherTableConfig = {
  $container: '.tabs-table-box',
  onList: 'getList',
  search: {},
  searchColumns: baseSearch,
  columns: [
    {
      title: '车辆',
      key: 'cheliangpaizhao',
      align: 'center',
      formOpt: getPlate()
    },
    {
      title: '收入合计(元)',
      key: 'jine',
      align: 'center',
      sum: true,
      formOpt: {
        type: 'number'
      }
    },
    {
      title: '状态',
      key: 'examine',
      align: 'center'
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120
    },
    getUpload()
  ],
  data: []
};
// 货运表格配置
export const freightTabsConfig = [
  {
    label: '运单',
    type: '0',
    table: freightTableConfig
  },
  {
    label: '燃油费',
    type: '1',
    table: fueloilTableConfig
  },
  {
    label: '交通费',
    type: '2',
    table: carfareTableConfig
  },
  {
    label: '维修费',
    type: '3',
    table: maintainTableConfig
  },
  {
    label: '保险费',
    type: '4',
    table: insuranceTableConfig
  },
  {
    label: '车辆年审',
    type: '5',
    table: carAnnualTableConfig
  },
  {
    label: '驾驶员年审',
    type: '6',
    table: driverAnnualTableConfig
  },
  {
    label: '其他费用',
    type: '7',
    table: otherTableConfig
  }
];

// 出库单配置
export const stockOutConfig = () => {
  return {
    field: 'chukudan',
    title: '出库单',
    load: false,
    img: require('A/operation/bills-1.png'),
    data: {},
    column: [
      {
        label: '日期',
        key: 'outTime',
        className: 'w30',
        formOpt: {
          type: 'datetime',
          rules: {
            required: true,
            message: '日期不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '磅单序号',
        key: 'outNum',
        className: 'w70',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '磅单序号不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '车牌号',
        key: 'cheliangpaizhao',
        className: 'w30',
        formOpt: getPlate()
      },
      {
        label: '发货单位',
        key: 'forwardeUnit',
        className: 'w70',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '发货单位不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '货名',
        key: 'goods',
        className: 'w30',
        formOpt: {
          type: 'text'
        }
      },
      {
        label: '收货单位',
        key: 'receiveUnit',
        className: 'w70',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '收货单位不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '规格',
        key: 'guige',
        className: 'w30',
        formOpt: {
          type: 'text'
        }
      },
      {
        label: '运输单位',
        key: 'transportUnit',
        className: 'w70',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '运输单位不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '毛重（kg）',
        key: 'ogrossWeight',
        className: 'w30',
        formOpt: {
          type: 'number'
        }
      },
      {
        label: '毛重时间',
        key: 'ogrossWeightTime',
        className: 'w70',
        formOpt: {
          type: 'datetime'
        }
      },
      {
        label: '皮重（kg）',
        key: 'otare',
        className: 'w30',
        formOpt: {
          type: 'number'
        }
      },

      {
        label: '皮重时间',
        key: 'otareTime',
        className: 'w70',
        formOpt: {
          type: 'datetime'
        }
      },
      {
        label: '净重（kg）',
        key: 'onetWeight',
        className: 'w30',
        formOpt: {
          type: 'number'
        }
      },
      {
        label: '货运单价',
        key: 'danjia',
        className: 'w30',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '货运单价不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '司磅员',
        key: 'osibangyuan',
        className: 'w40',
        formOpt: {
          type: 'text'
        }
      },
      {
        label: '附件',
        formOpt: {
          key: 'ofujian',
          type: 'upload',
          options: {
            table: 'manage_waybill',
            prop: 'ofujian',
            accept: 'image/*',
            format: ['jpg', 'png'],
            maxNumber: 1,
            tip: '文件格式限制：.jpg,.png'
          },
          rules: [
            {
              required: true,
              type: 'array',
              min: 1,
              message: '请添加附件',
              trigger: 'change'
            }
          ]
        }
      }
    ]
  };
};

// 入库单配置
export const stockInConfig = () => {
  return {
    field: 'rukudan',
    title: '入库单',
    load: false,
    img: require('A/operation/bills-2.png'),
    data: {},
    column: [
      {
        label: '日期',
        key: 'intoTime',
        className: 'w33',
        formOpt: {
          type: 'datetime',
          rules: {
            required: true,
            message: '日期不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '磅单序号',
        key: 'intoNum',
        className: 'w66',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '磅单序号不可为空',
            trigger: 'blur'
          }
        }
      },

      {
        label: '货物名称',
        key: 'goods',
        className: 'w33',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '货物名称不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '收货单位',
        key: 'receiveUnit',
        className: 'w66',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '收货单位不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '毛重',
        key: 'igrossWeight',
        className: 'w33',
        formOpt: {
          type: 'number'
        }
      },
      {
        label: '毛重司磅员',
        key: 'igrossWeightMan',
        className: 'w33',
        formOpt: {
          type: 'text'
        }
      },
      {
        label: '毛重时间',
        key: 'igrossWeightTime',
        className: 'w33',
        formOpt: {
          type: 'datetime'
        }
      },
      {
        label: '皮重',
        key: 'itare',
        className: 'w33',
        formOpt: {
          type: 'number'
        }
      },
      {
        label: '皮重司磅员',
        key: 'itareMan',
        className: 'w33',
        formOpt: {
          type: 'text'
        }
      },
      {
        label: '皮重时间',
        key: 'itareTime',
        className: 'w33',
        formOpt: {
          type: 'datetime'
        }
      },
      {
        label: '净重',
        key: 'inetWeight',
        className: 'w33',
        formOpt: {
          type: 'number',
          rules: {
            required: true,
            type: 'number',
            message: '净重不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '结算数量',
        key: 'jiesuanshu',
        className: 'w33',
        formOpt: {
          type: 'number'
        }
      },
      {
        label: '司机',
        key: 'driver',
        className: 'w33',
        formOpt: {
          type: 'text',
          rules: {
            required: true,
            message: '司机姓名不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '附件',
        formOpt: {
          key: 'ifujian',
          type: 'upload',
          options: {
            table: 'manage_waybill',
            prop: 'ifujian',
            accept: 'image/*',
            maxNumber: 1,
            format: ['jpg', 'png'],
            tip: '文件格式限制：.jpg,.png'
          },
          rules: [
            {
              required: true,
              type: 'array',
              min: 1,
              message: '请添加附件',
              trigger: 'change'
            }
          ]
        }
      }
    ]
  };
};

// 其它单子配置
export const stockOtherConfig = () => {
  return {
    field: 'other',
    title: '其他单据',
    img: require('A/operation/bills-3.png'),
    state: 'add',
    load: false,
    dataList: [],
    data: {},
    column: [
      {
        label: '单据类型',
        key: 'leixing',
        formOpt: {
          type: 'select',
          options: [
            {
              label: '燃油费',
              value: '燃油费'
            },
            {
              label: '过路费',
              value: '过路费'
            },
            {
              label: '其它',
              value: '其他'
            }
          ],
          rules: {
            required: true,
            message: '单据类型不可为空',
            trigger: 'blur'
          }
        }
      },
      {
        label: '金额',
        key: 'jine',
        formOpt: {
          type: 'number'
        }
      },
      {
        label: '时间',
        key: 'shijian',
        formOpt: {
          type: 'datetime'
        }
      },
      {
        label: '附件',
        formOpt: {
          key: 'fujian',
          type: 'upload',
          options: {
            table: 'manage_waybill_fujian',
            prop: 'fujian',
            accept: 'image/*',
            format: ['jpg', 'png'],
            maxNumber: 1,
            tip: '文件格式限制：.jpg,.png'
          },
          rules: [
            {
              required: true,
              type: 'array',
              min: 1,
              message: '请添加附件',
              trigger: 'change'
            }
          ]
        }
      }
    ]
  };
};

// ----------------------------   报表管理模块 ----------------------------

// 运单结算列表配置
export const waybillTableConfig = {
  $container: '.table-box',
  onList: 'getList',
  search: {},
  searchColumns: [
    {
      label: '车辆牌照',
      key: 'cheliangpaizhao',
      placeholder: '请输入车辆牌照',
      type: 'text'
    },
    {
      label: '装货时间',
      key: 'outTime',
      type: 'daterange',
      placeholder: '请输入装货时间',
      defaultValue: [
        dayjs()
          .startOf('month')
          .format('YYYY-MM-DD'),
        dayjs()
          .endOf('month')
          .format('YYYY-MM-DD')
      ]
    }
  ],
  columns: [
    {
      title: '装货时间',
      key: 'zhuanghuoshijian',
      align: 'center',
      width: 200
    },
    { title: '卸货时间', key: 'xiehuoshijian', align: 'center', width: 200 },
    {
      title: '车牌号',
      key: 'chepaihao',
      align: 'center',
      width: 150
    },
    {
      title: '装货地',
      key: 'zhuanghuodi',
      tooltip: true,
      align: 'center',
      minWidth: 180
    },
    {
      title: '卸货地',
      key: 'xiehuodi',
      align: 'center',
      minWidth: 180
    },
    {
      title: '货物名称',
      key: 'huowumingcheng',
      align: 'center',
      width: 150
    },
    {
      title: '入库序号',
      key: 'rukuxuhao',
      align: 'center',
      width: 100
    },
    {
      title: '出库序号',
      key: 'chukuxuhao',
      align: 'center',
      width: 100
    },
    {
      title: '装货量(kg)',
      key: 'zhuanghuoliang',
      align: 'center',
      width: 150
    },
    {
      title: '卸货量(kg)',
      key: 'xiehuoliang',
      align: 'center',
      tooltip: true,
      width: 150
    },
    {
      title: '磅差',
      key: 'bangcha',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '结算量',
      key: 'jiesuanliang',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '运价(吨）',
      key: 'danjia',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '金额',
      key: 'jine',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '扣损吨位',
      key: 'zhesundunwei',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '扣损金额',
      key: 'zhesunjine',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '扣损单价',
      key: 'zhesundanjia',
      align: 'center',
      tooltip: true,
      width: 100
    }
  ],
  data: []
};

// 支出统计列表
export const expendTableConfig = {
  $container: '.table-box',
  onList: 'getList',
  search: {},
  searchColumns: [
    {
      label: '车辆牌照',
      key: 'cheliangpaizhao',
      placeholder: '请输入车辆牌照',
      type: 'text'
    },
    {
      label: '出库时间',
      key: 'outTime',
      type: 'daterange',
      placeholder: '请输入出库时间',
      defaultValue: [
        dayjs()
          .startOf('month')
          .format('YYYY-MM-DD'),
        dayjs()
          .endOf('month')
          .format('YYYY-MM-DD')
      ]
    }
  ],
  columns: [
    {
      title: '车牌号',
      key: 'chepaihao',
      align: 'center',
      minWidth: 150
    },
    {
      title: '出库日期',
      key: 'outTime',
      align: 'center',
      width: 200,
      level: 2
    },
    {
      title: '入库日期',
      key: 'intTime',
      align: 'center',
      tooltip: true,
      width: 200,
      level: 2
    },
    {
      title: '出库量(kg)',
      key: 'onetWeight',
      align: 'center',
      width: 120
    },
    {
      title: '入库量(kg)',
      key: 'inetWeight',
      align: 'center'
    },
    {
      title: '燃油费(元)',
      key: 'ranyoufei',
      align: 'center'
    },
    {
      title: '过路费(元)',
      key: 'guolufei',
      align: 'center'
    },
    {
      title: '其他费用(元)',
      key: 'qitafei',
      align: 'center'
    },
    {
      title: '支出',
      key: 'zhichu',
      align: 'center'
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120,
      level: 1
    }
  ],
  data: []
};

// 对内核算列表
export const internalTableConfig = {
  $container: '.table-box',
  onList: 'getList',
  search: {},
  searchColumns: [
    {
      label: '车辆牌照',
      key: 'cheliangpaizhao',
      placeholder: '请输入车辆牌照',
      type: 'text'
    },
    {
      label: '出库时间',
      key: 'outTime',
      type: 'daterange',
      placeholder: '请输入出库时间',
      defaultValue: [
        dayjs()
          .startOf('month')
          .format('YYYY-MM-DD'),
        dayjs()
          .endOf('month')
          .format('YYYY-MM-DD')
      ]
    },
    {
      label: '税率',
      key: 'shuilv',
      placeholder: '请输入税率',
      type: 'number',
      min: 0
    }
  ],
  columns: [
    {
      title: '车辆牌照',
      key: 'chepaihao',
      align: 'center',
      width: 200
    },
    {
      title: '出库日期',
      key: 'outTime',
      align: 'center',
      width: 200,
      level: 2
    },
    {
      title: '入库日期',
      key: 'intTime',
      align: 'center',
      tooltip: true,
      width: 200,
      level: 2
    },
    {
      title: '重量',
      key: 'zhuanghuoliang',
      align: 'center',
      width: 150
    },
    {
      title: '金额',
      key: 'jine',
      align: 'center',
      width: 150
    },
    {
      title: '燃油费',
      key: 'ranyoufei',
      align: 'center',
      minWidth: 150
    },
    {
      title: '过路费',
      key: 'guolufei',
      align: 'center',
      minWidth: 150
    },
    {
      title: '其他费用',
      key: 'qitafei',
      align: 'center',
      width: 150
    },
    {
      title: '利润',
      key: 'lirun',
      align: 'center',
      width: 100
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120,
      level: 1
    }
  ],
  data: []
};

// 合同管理列表
export const contractTableConfig = {
  $container: '.table-box',
  onList: 'getList',
  form: {},
  search: {},
  searchColumns: [
    {
      label: '合同编号',
      key: 'hetongbianhao',
      placeholder: '请输入合同编号',
      type: 'text'
    }
  ],
  columns: [
    {
      title: '合同编号',
      key: 'hetongbianhao',
      align: 'center',
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '甲方',
      key: 'jiafang',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '甲方代表人',
      key: 'jiafangdaibiao',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '乙方',
      key: 'yifang',
      align: 'center',
      tooltip: true,
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '乙方代表人',
      key: 'yifangdaibiao',
      align: 'center',
      width: 200,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '乙方联系电话',
      key: 'yifangdianhua',
      align: 'center',
      width: 150,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '签订时间',
      key: 'qiandingshijian',
      align: 'center',
      width: 150,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '合同到期时间',
      key: 'hetongdaoqishijian',
      align: 'center',
      minWidth: 180,
      formOpt: {
        type: 'date'
      }
    },
    {
      title: '货物量',
      key: 'huowuliang',
      align: 'center',
      minWidth: 180,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '合同金额',
      key: 'hetongjine',
      align: 'center',
      width: 150,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '收货企业',
      key: 'shouhuoqiye',
      align: 'center',
      width: 100,
      formOpt: {
        type: 'text'
      }
    },
    {
      title: '操作',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 120,
      level: 1
    }
  ],
  data: []
};
