import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {
  getStatchaosu,
  getStatPilao,
  getStatZhudonganquan,
  getStatLicheng
} from '@/api/daily/report';
dayjs.extend(weekOfYear);

export const reportTable = {
  $container: '.left-centent',
  offset: 0,
  columns: [
    // {
    //   title: '查看',
    //   align: 'center',
    //   width: 60,
    //   slot: 'edit'
    // },
    {
      title: '企业名称',
      key: 'deptName',
      align: 'center',
      minWidth: 150
    },
    {
      title: '处理率',
      slot: 'processRate',
      width: 100
    }, {
      title: '统计时间',
      key: 'countdate',
      align: 'center',
      width: 180
    },
    {
      title: '报送时间',
      key: 'createtimeshow',
      align: 'center',
      width: 120
    },
    {
      title: '报告制作人',
      key: 'caozuoren',
      align: 'center',
      width: 120
    },
    {
      title: '联系电话',
      key: 'phone',
      align: 'center',
      width: 140
    },
    {
      title: '操作',
      slot: 'action',
      width: 120,
      fixed: 'right',
      align: 'center'
    }
  ],
  data: []
};

export const reportTypes = [{
    label: '日报',
    date: '',
    dates: '',
    type: 'date',
    countDate: '',
    open: false,
    property: 1,
    logo: require('@/assets/daily/ri.png'),
    setDate(date = new Date()) {
      this.date = dayjs(date).format('YYYY-MM-DD') + '日';
      this.countDate = this.date;
      this.dates = dayjs(date).format('MM月DD') + '日';
    }
  },
  {
    label: '周报',
    date: '',
    dates: '',
    type: 'date',
    week: true,
    open: false,
    property: 2,
    logo: require('@/assets/daily/zhou.png'),
    setDate(date = new Date()) {
      let year = dayjs(date).format('YYYY');
      let week = dayjs(date).week();
      let today = dayjs(date).format('YYYY-MM-DD');
      if (today === "2020-12-28" || today === "2020-12-29" || today === "2020-12-30" || today === "2020-12-31") {
        this.date = `2020年53周`;
        this.countDate = `2020-53`;
        this.dates = 53 + '周';
      } else {
        this.date = `${year}年${week}周`;
        this.countDate = `${year}-${week}`;
        this.dates = week + '周';
      }
    }
  },
  {
    label: '月报',
    date: '',
    dates: '',
    type: 'month',
    open: false,
    property: 3,
    logo: require('@/assets/daily/yue.png'),
    setDate(date = new Date()) {
      let year = dayjs(date).format('YYYY');
      let month = dayjs(date).get('month') + 1;
      this.date = `${year}年${month}月`;
      this.countDate = `${year}-${month}`;
      this.dates = month + '月';
    }
  },
  {
    label: '年报',
    date: '',
    dates: '',
    type: 'year',
    open: false,
    property: 4,
    logo: require('@/assets/daily/nian.png'),
    setDate(date = new Date()) {
      let year = dayjs(date).format('YYYY');
      this.date = `${year}年`;
      this.countDate = year;
      this.dates = this.date;
    }
  }
];

const commonColumn = (other) => {
  return [{
      title: '名次',
      align: 'center',
      width: 70,
      slot: 'index'
    },
    {
      title: '车号',
      key: 'cheliangpaizhao',
      align: 'center',
      width: 120
    },
    ...other,
    {
      title: '处理方式',
      key: 'chulixinxing',
      align: 'center',
      minWidth: 150
    },
    {
      title: '处理率',
      key: 'chulilv',
      align: 'center',
      width: 80
    }
  ];
};

export const subTabs = [{
    label: '严重超速报警统计',
    action: getStatchaosu,
    column: commonColumn([{
      title: '超速报警',
      key: 'chaosu',
      align: 'center',
      width: 100
    }])
  },
  {
    label: '严重疲劳报警统计',
    action: getStatPilao,
    column: commonColumn([{
      title: '疲劳驾驶',
      key: 'pilao',
      align: 'center',
      width: 100
    }])
  },
  {
    label: '主动安全防御报警统计',
    action: getStatZhudonganquan,
    column: commonColumn([{
        title: '接打电话',
        key: 'dadianhua',
        align: 'center',
        width: 100
      },
      {
        title: '违规抽烟',
        key: 'chouyan',
        align: 'center',
        width: 100
      },
      {
        title: '分身驾驶',
        key: 'fenshen',
        align: 'center',
        width: 100
      },
      {
        title: '疲劳驾驶',
        key: 'pilaoshipin',
        align: 'center',
        width: 100
      }
    ])
  },
  {
    label: '行驶里程详尽',
    action: getStatLicheng,
    column: [{
        title: '车牌',
        key: 'plate',
        align: 'center',
        width: 100
      },
      {
        title: '时间段',
        key: 'date',
        align: 'center',
        width: 150
      },
      {
        title: '行驶时间',
        key: 'xingshishijian',
        align: 'center',
        width: 100
      },
      {
        title: '行驶里程',
        key: 'mileageCount',
        align: 'center',
        width: 80
      },
      {
        title: '平均速度',
        key: 'pingjunsudu',
        align: 'center',
        width: 80
      },
      {
        title: '开始位置',
        key: 'kaishiweizhi',
        tooltip: true,
        align: 'center',
        minWidth: 150
      },
      {
        title: '结束位置',
        key: 'jieshuweizhi',
        align: 'center',
        minWidth: 150
      }
    ]
  }
];

export const subTable = {
  $container: '.tables-list',
  offset: 0,
  data: []
};