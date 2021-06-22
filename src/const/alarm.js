import {
  getChosuList,
  getPilaoList,
  getBuzaiweiList,
  getBudingweiList
} from '@/api/daily/alarm';
import dayjs from 'dayjs';

// 超速报警等级
export const statusOption = [{
    label: '普通',
    value: 0
  },
  {
    label: '严重一级',
    value: 1
  },
  {
    label: '严重二级',
    value: 2
  },
  {
    label: '严重三级',
    value: 3
  }
];

// gps 设备报警类型
export const GPSlist = [{
    text: '超速报警',
    key: 'chaosu',
    type: 'GPS',
    baojingshu: 0,
    view: 'overspeedList',
    standard: `超速驾驶是指不按道路规定限速值行驶，存在车辆超速行为。
    根据《中华人民共和国道路交通安全法》及《道路运输车辆动态监督管理办法》规定。
    超速报警以一到三级区分：
    三级报警：超速处罚超过规定时速10%以内，不罚款，但驾驶人员需自主提高安全意识加强安全知识学习。
    二级报警：超过规定时速10%以上未达20%的，处以50元罚款，同时对其出现的违规驾驶行为进行安全教育培训。
    一级报警：超过规定时速20%以上未达50%的，处以200元罚款，批评教育一次，并进行安全知识培训考试，如屡教不改直接记入档案纳入违规名单。
  （1）报警核定状态为82,100（82:企业道路限速异议报警;100正常报警）
	（2）最大速度>道路限速
	（3）最大速度>=50;最大速度<=140
	（4）道路限速>=40
	（5）持续时间>=60秒`
  },
  {
    text: '疲劳驾驶报警',
    key: 'pilao',
    type: 'GPS',
    baojingshu: 0,
    view: 'fatigueList',
    standard: `根据《中华人民共和国道路交通安全法》及《道路运输车辆动态监督管理办法》规定。
    驾驶员24小时累计驾驶时间原则上不超过8小时，日间连续驾驶不超过4小时，夜间连续驾驶不超过2小时，
    每次停车休息时间不少于20分钟，客运车辆夜间行驶速度不得超过日间限速80%的要求。
    根据道路交通安全法第九十条规定，驾驶员驾驶车辆超过4小时没有休息20分钟以上的，处以罚款200元处罚。
    （1）报警核定状态为100
	（2）持续时间>=0秒 `
  },
  {
    text: '夜间行驶报警',
    key: 'yejian',
    type: 'GPS',
    baojingshu: 0,
    view: 'nightList',
    standard: '夜间2点至5点不能行驶。（1）报警核定状态为100    （2）持续时间>=0秒'
  },
  {
    text: '异常车辆报警',
    key: 'yichang',
    type: 'GPS',
    baojingshu: 0,
    view: 'exceptionList',
    standard: `异常报警是指车辆存在无数据不定位情况。
    （1）持续时间>=1800秒
	（2）移动距离>20000米
	（3）(移动距离/1000)/(持续时间/60)<=1.7(每分钟的移动距离<=1.7公里) `
  },
  {
    text: '24小时不在线报警',
    key: 'buzaixian',
    type: 'GPS',
    baojingshu: 0,
    view: 'buzaixianList',
    standard: `24小时不在线报警是指企业车辆最后一次数据回传时间与当天0点的时间差大于24小时。`
  },
  {
    text: '高速禁行报警',
    key: 'gaosujinxing',
    type: 'GPS',
    baojingshu: 0,
    view: 'gaosuList',
    standard: ``
  },
];

// DMS报警类型
export const driverList = [{
    text: '接打电话报警',
    key: 'dadianhua',
    type: 'driver',
    baojingshu: 0,
    view: 'phone-list',
    standard: '在车辆行驶过程中，DSM摄像头检测到驾驶员接打电话的行为时，产生接打电话警告报警。'
  },
  {
    text: '分神驾驶报警',
    key: 'fenshen',
    type: 'driver',
    baojingshu: 0,
    view: 'distracted-list',
    standard: '在车辆行驶过程中，DSM摄像头检测到驾驶员左顾右盼、长时间不目视前方、低头玩手机或者分神吃零食等情况时，产生分神驾驶警告报警。'
  },
  {
    text: '抽烟报警',
    key: 'chouyan',
    type: 'driver',
    baojingshu: 0,
    view: 'smoking-list',
    standard: '在车辆行驶过程中，DSM摄像头通过接触或非接触的方式检测到驾驶员抽烟的行为时，产生抽烟警告报警。'
  },
  {
    text: '生理疲劳报警',
    key: 'pilaoshipin',
    type: 'driver',
    baojingshu: 0,
    view: 'tired-list',
    standard: '在车辆行驶过程中，DSM摄像头通过面部监测的方式检测到驾驶员持续闭眼、打哈欠、眯眼或者眨眼频繁时，产生疲劳驾驶警告报警。'
  },
  {
    text: '驾驶员异常报警',
    key: 'jiashiyuanyichang',
    type: 'driver',
    baojingshu: 0,
    view: 'yichang-list',
    standard: '在车辆行驶过程中，DSM摄像头通过视频的方式检测不到驾驶员面部特征或者摄像头被遮挡时，产生驾驶员异常报警。'
  },
];
// ADAS报警类型
export const ADASList = [{
    text: '车距过近报警',
    key: 'chujuguojin',
    type: 'driver',
    baojingshu: 0,
    view: 'phone-list',
    standard: `在车辆行驶过程中，ADAS摄像头通过监测与前车安全距离时间过低时，产生车距过近报警警告报警。
               当车辆速度高于报警速度阈值时， 与前车距离时间低于安全距离时间阈值（ 默认设置的是1 .2 S）， 产生车距过近报警， 同时进行语音报警提示并向平台发送车距过近报警信息， 报警信息包含报警级别、 行驶前方道路的照片和视频。 如当车速为60KM / H时， 安全距离小于60× 1.2 = 72 米产生报警； 当车速为70KM / H时， 安全距离小于70× 1.2 = 84 米产生报警。 `
  },
  {
    text: '车道偏离报警',
    key: 'chedaopianli',
    type: 'driver',
    baojingshu: 0,
    view: 'pianli-list',
    standard: '在车辆行驶过程中，车载终端探测车辆相对车辆边界的横向位置，当车辆处于报警临界线附近且没有操作相应的转向灯时，对驾驶员进行报警提示'
  },
  {
    text: '前向碰撞报警',
    key: 'qianxiangpengzhuang',
    type: 'driver',
    baojingshu: 0,
    view: 'qianxiang-list',
    standard: `在车辆行驶过程中，ADAS摄像头通过监测与前车碰撞时间过低时，产生前向碰撞报警警告报警。
               当车辆速度高于报警速度阈值时， 若碰撞时间（ TTC） 低于安全时间阈值（ 默认设置的是0 .8 S）， 产生前向碰撞报警， 同时进行语音报警提示并向平台发送前向碰撞报警信息， 报警信息包含报警级别、 行驶前方道路的照片和视频。 如当车速为60KM / H时， 安全距离小于60× 0.8 = 48 米产生报警； 当车速为70KM / H时， 安全距离小于70× 0.8 = 56 米产生报警。 `
  },
  {
    text: '行人碰撞预警',
    key: 'xingrenpengzhuang',
    type: 'driver',
    baojingshu: 0,
    view: 'xingren-list',
    standard: ''
  },
];

// 报警统计类型类型
export const statisList = [{
    text: '超速报警统计',
    key: 'chaosu',
    action: getChosuList,
    type: 'GPS',
    baojingshu: 0,
    view: 'overspeed-statlist' //数据中心
  },
  {
    text: '疲劳驾驶报警统计',
    key: 'pilao',
    action: getPilaoList,
    type: 'GPS',
    baojingshu: 0,
    view: 'tired-statlist'
  },
  {
    text: '24小时不在线',
    key: 'buzaixian',
    type: '24hour',
    action: getBuzaiweiList,
    baojingshu: 0,
    view: 'offline-statlist'
  },
  {
    text: '24小时不定位',
    key: 'budingwei',
    type: '24hour',
    action: getBudingweiList,
    baojingshu: 0,
    view: 'static-statlist'
  }
];

// 报警列表配置
export const alarmTableConfig = {
  $container: '.table-box',
  onList: 'getAlarmList',
  search: {
    // chaosubi: [0, 150]
    chaosubi: [0, 0]
  },
  searchColumns: [{
      label: '推送时间',
      key: 'date',
      type: 'daterange',
      options: {
        disabledDate: (date) => date.valueOf() > Date.now()
      },
      startDate: dayjs()
        .subtract(1, 'month')
        .toDate()
    },
    {
      label: '车牌号码',
      key: 'cheliangpaizhao',
      placeholder: '请输入车牌号码',
      type: 'text'
    },
    // {
    //   label: '企业名称',
    //   key: 'jigouName',
    //   type: 'slot'
    // },
    {
      label: '是否申诉',
      key: 'shifoushenshu',
      type: 'select',
      clearable: true,
      placeholder: '全部',
      defaultValue: '未申诉',
      options: [{
          label: '全部',
          value: '全部'
        },
        {
          label: '未申诉',
          value: '未申诉'
        },
        {
          label: '申诉审核中',
          value: '申诉审核中'
        },
        {
          label: '申诉通过',
          value: '申诉通过'
        },
        {
          label: '申诉驳回',
          value: '申诉驳回'
        }
      ]
    },
    {
      label: '是否处理',
      key: 'shifouchuli',
      type: 'select',
      clearable: true,
      placeholder: '全部',
      defaultValue: '未处理',
      options: [{
          label: '全部',
          value: '全部'
        },
        {
          label: '已处理',
          value: '已处理'
        },
        {
          label: '未处理',
          value: '未处理'
        }
      ]
    },
    // {
    //   label: '道路名称',
    //   key: 'roadName',
    //   placeholder: '请输入道路名称',
    //   type: 'text'
    // },
    {
      label: '超速比范围',
      key: 'chaosubi',
      type: 'slider',
      display: 'chaosu',
      range: true,
      min: 0,
      max: 200
    }
  ],
  columns: [{
      type: 'selection',
      align: 'center',
      width: 60,
      fixed: 'left'
    },
    {
      title: '是否处理',
      slot: 'chulizhuangtai',
      key: 'chulizhuangtai',
      align: 'center',
      fixed: 'left',
      width: 100
    },
    // {
    //   title: '是否申诉',
    //   key: 'shensuzhuangtai',
    //   align: 'center',
    //   display: '11超速报警',
    //   width: 100
    // },
    {
      title: '是否申诉',
      slot: 'shensuzhuangtai',
      key: 'shensuzhuangtai',
      align: 'center',
      fixed: 'left',
      // display: '超速报警',
      width: 100
    },
    {
      title: '车牌',
      key: 'plate',
      align: 'center',
      fixed: 'left',
      width: 100
    },
    {
      title: '报警类型',
      slot: 'alarmtype',
      key: 'alarmType',
      align: 'center',
      tooltip: true,
      // fixed: 'left',
      width: 150
    },
    {
      title: '车牌颜色',
      key: 'color',
      align: 'center',
      // fixed: 'left',
      width: 100
    },
    {
      title: '报警时间',
      key: 'gpsTime',
      align: 'center',
      tooltip: true,
      width: 150,
      display: 'driver'
    },
    {
      title: '开始行驶时间',
      key: 'calctime',
      align: 'center',
      sortable: 'custom',
      tooltip: true,
      width: 180,
      display: 'pilao',
      dis: 'pilao'
    },
    {
      title: '开始时间',
      key: 'beginTime',
      align: 'center',
      sortable: 'custom',
      tooltip: true,
      width: 180,
      display: 'GPS'
    },
    {
      title: '结束时间',
      key: 'endTime',
      align: 'center',
      sortable: 'custom',
      tooltip: true,
      width: 180,
      display: 'GPS'
    },
    {
      title: '系统核定时间',
      key: 'verifyTime',
      align: 'center',
      tooltip: true,
      width: 180,
    },
    {
      title: '报警速度(公里/小时)',
      key: 'velocity',
      align: 'center',
      sortable: 'custom',
      width: 160
    },
    {
      title: '限速值(公里/小时)',
      key: 'limited',
      align: 'center',
      width: 150,
      sortable: 'custom',
      display: 'GPS'
    },
    {
      title: '超速百分比',
      key: 'chaoSuBiShow',
      align: 'center',
      width: 140,
      sortable: 'custom',
      display: 'chaosu'
    },
    {
      title: '报警等级',
      key: 'status',
      align: 'center',
      // fixed: 'left',
      width: 100,
      display: 'chaosu'
    },
    {
      title: '报警位置',
      key: 'roadName',
      // align: 'center',
      tooltip: true,
      minWidth: 400
    },
    {
      title: '持续时间',
      key: 'keeptimeShow',
      align: 'center',
      width: 100,
      sortable: 'custom',
      display: 'GPS'
    },
    {
      title: '最高速度(公里/小时)',
      key: 'maxSpeed',
      align: 'center',
      width: 160,
      sortable: 'custom',
      display: 'chaosu'
    },

    {
      title: '车辆类型',
      key: 'operatType',
      align: 'center',
      width: 100
    },
    {
      title: '是否夜间',
      key: 'atNocturnalShow',
      align: 'center',
      width: 100,
      display: '超速报警'
    },
    {
      title: '移动距离(公里)',
      key: 'distance',
      align: 'center',
      width: 100,
      display: 'yichang'
    },

    {
      title: '经度',
      key: 'longitude',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '纬度',
      key: 'latitude',
      align: 'center',
      tooltip: true,
      width: 100
    },
    {
      title: '处理人/申诉人',
      key: 'chuliren',
      align: 'center',
      width: 110,
      // export: false
    },
    {
      title: '处理时间/申述时间',
      key: 'chulishijian',
      align: 'center',
      tooltip: true,
      width: 180,
      // export: false
    },
    {
      title: '处理形式/申诉形式',
      key: 'chulixingshi',
      align: 'center',
      tooltip: true,
      width: 150,
      // export: false
    },
    {
      title: '处理描述/申诉描述',
      key: 'chulimiaoshu',
      tooltip: true,
      align: 'center',
      width: 150
    },
    {
      title: '二次处理人',
      key: 'twicechuliren',
      tooltip: true,
      align: 'center',
      width: 110
    },
    {
      title: '二次处理时间',
      key: 'twicechulishijian',
      tooltip: true,
      align: 'center',
      width: 180
    },
    {
      title: '二次处理形式',
      key: 'twicechulixingshi',
      tooltip: true,
      align: 'center',
      width: 150
    },
    {
      title: '二次处理描述',
      key: 'twicechulimiaoshu',
      tooltip: true,
      align: 'center',
      width: 150
    },
    {
      title: '轨迹',
      slot: 'operation',
      fixed: 'right',
      align: 'center',
      width: 80
    },
    {
      title: '详情',
      slot: 'operations',
      fixed: 'right',
      align: 'center',
      width: 80
    }
  ],
  data: []
};

// 报警统计列表配置
export const statisTableConfig = {
  $container: '.table-box',
  onList: 'getStatiList',
  search: {},
  searchColumns: [{
    label: '统计时间',
    key: 'date',
    type: 'daterange',
    options: {
      disabledDate: (date) => date.valueOf() > Date.now()
    },
    defaultValue: [
      dayjs()
      .subtract(8, 'day')
      .format('YYYY-MM-DD'),
      dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
    ]
  }],
  columns: [{
      title: '车牌',
      key: 'plateNumber',
      align: 'center',
      width: 100
    },
    {
      title: '车牌颜色',
      key: 'color',
      align: 'center',
      width: 100
    },
    {
      title: '车辆类型',
      key: 'operatType',
      align: 'center',
      width: 100
    },
    {
      title: '报警类型',
      key: 'alarmType',
      align: 'center',
      width: 200
    },
    {
      title: '最后数据时间',
      key: 'lastTime',
      align: 'center',
      width: 200,
      display: '24hour'
    },
    {
      title: '最后回传时间',
      key: 'systime',
      align: 'center',
      width: 180,
      display: 'budingwei'
    },
    {
      title: '最后定位时间',
      key: 'lastlocateTime',
      align: 'center',
      width: 150,
      display: 'budingwei'
    },
    {
      title: '离线时长',
      key: 'offlineTime',
      align: 'center',

      display: 'buzaixian'
    },
    {
      title: '不定位时长',
      key: 'offlineTime',
      align: 'center',
      display: 'budingwei'
    },
    {
      title: '统计日期',
      key: 'createDate',
      align: 'center',
      width: 120
      // display: '24hour'
    },
    {
      title: '累计持续时间',
      key: 'keeptimeShow',
      align: 'center',
      display: 'GPS',
      width: 180
    },
    {
      title: '超速驾驶次数',
      key: 'chaosucisu',
      align: 'center',
      width: 120,
      display: 'chaosu'
    },
    {
      title: '疲劳驾驶次数',
      key: 'pilaocisu',
      align: 'center',
      width: 150,
      display: 'pilao'
    },
    {
      title: '最高报警速度',
      key: 'maxspeed',
      align: 'center',
      width: 150,
      display: 'chaosu'
    },
    {
      title: '限速值',
      key: 'xiansuzhi',
      align: 'center',
      width: 100,
      display: 'chaosu'
    },
    {
      title: '超速百分比',
      key: 'chaosubi',
      align: 'center',
      width: 120,
      display: 'chaosu'
    },
    {
      title: '单次开始时间',
      key: 'beginTime',
      align: 'center',
      width: 180,
      display: 'pilao'
    },
    {
      title: '单次结束时间',
      key: 'endTime',
      align: 'center',
      width: 180,
      display: 'pilao'
    },
    {
      title: '单次持续时间',
      key: 'keeptimeone',
      align: 'center',
      width: 180,
      display: 'pilao'
    },
    {
      title: '单次报警位置',
      key: 'weizhi',
      align: 'center',
      tooltip: true,
      display: 'GPS',
      minWidth: 300
    },
    {
      title: '备注',
      key: 'operation',
      align: 'center',
      display: 'GPS',
      minWidth: 150
    }
  ],
  data: []
};

// 报警详情配置
export const aralmDetail = (data = {}) => {
  return [{
      title: '违规内容',
      value: data.alarmType
    }, {
      title: '报警等级',
      value: data.status
    },
    {
      title: '行驶速度',
      value: data.velocity + '(公里/小时)'
    },
    // {
    //   title: '超速等级',
    //   value: data.status,
    //   display: 'chaosu'
    // },
    {
      title: '超速百分比',
      value: data.chaoSuBiShow,
      display: 'chaosu'
    },
    {
      title: '限速值',
      value: data.limited + '(公里/小时)',
      display: 'chaosu'
    },
    {
      title: '开始行驶时间',
      value: data.calctime,
      display: 'pilao'
    },
    {
      title: '违规时间',
      value: data.beginTime + '  -  ' + data.endTime + '(' + (data.keeptimeShow == undefined ? "3分钟" : data.keeptimeShow) + ')'
    },
    {
      title: '移动距离',
      value: data.distance + "公里"
    },
    {
      title: '驾驶员IC卡登签信息',
      value: data.icardsign
    },
    {
      title: '违规地点',
      value: data.roadName
    },
  ];
};

// 车辆资料配置
export const vehicleDetail = (data = {}) => {
  return [{
      title: '车牌颜色',
      value: data.chepaiyanse,
      width: 50
    },
    {
      title: '营运类型',
      value: data.shiyongxingzhi,
      width: 50
    },
    {
      title: '驾驶员',
      value: data.jiashiyuanxingming,
      width: 50
    },
    {
      title: '驾驶员电话',
      value: data.jiashiyuandianhua,
      width: 50
    },
    {
      title: '押运员',
      value: data.yayunyuanxingming,
      width: 50
    },
    {
      title: '押运员电话',
      value: data.yayunyuandianhua,
      width: 50
    },
    {
      title: '车主',
      value: data.chezhu,
      width: 50
    },
    {
      title: '车主电话',
      value: data.chezhudianhua,
      width: 50
    },
    {
      title: '车辆类型',
      value: data.operatType,
      width: 50
    },
    {
      title: '核定载客',
      value: data.hedingzaike,
      width: 50
    },
    {
      title: '车辆状态',
      value: data.cheliangzhuangtai,
      width: 50
    },
    {
      title: '终端型号',
      value: data.zongduanxinghao,
      width: 50
    },
    {
      title: '车架号',
      value: data.chejiahao,
      width: 50
    },
    {
      title: '厂牌',
      value: data.changpai,
      width: 50
    },
    {
      title: '运营商',
      value: data.yunyingshangmingcheng,
      width: 50
    },
  ];
};

// 驾驶员资料配置
export const driverDetail = (data = {}) => {
  return [{
      title: '出生年月',
      value: data.chushengshijian,
      width: 50
    },
    {
      title: '身份证号码',
      value: data.shenfenzhenghao,
      width: 50
    },
    {
      title: '身份证有效期',
      value: data.shenfenzhengyouxiaoqi,
      width: 50
    },
    {
      title: '机动车驾驶员',
      value: data.jidongjiashiyuan,
      width: 50
    },
    {
      title: '文化程度',
      value: data.wenhuachengdu,
      width: 50
    },
    {
      title: '聘用日期',
      value: data.pingyongriqi,
      width: 50
    },
    {
      title: '离职时间',
      value: data.lizhishijian,
      width: 100
    },
    {
      title: '家庭住址',
      value: data.jiatingzhuzhi,
      width: 100
    }
  ];
};