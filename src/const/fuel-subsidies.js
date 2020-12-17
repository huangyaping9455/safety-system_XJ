import dayjs from 'dayjs';
export const fuelTableConfig = {
  $container: '.table-box',
  onList: 'getFuelList',
  search: {},
  searchColumns: [
    {
      label: '所属单位',
      key: 'jigouName',
      type: 'slot'
    },
    {
      label: '车牌牌照',
      key: 'chepaihao',
      placeholder: '请输入车牌号码',
      type: 'text'
    },
    {
      label: '报警时间',
      key: 'date',
      type: 'daterange',
      options: {
        disabledDate: (date) => date.valueOf() > Date.now()
      },
      defaultValue: [
        dayjs()
          .subtract(0, 'day')
          .format('YYYY-MM-DD'),
        dayjs()
          .subtract(0, 'day')
          .format('YYYY-MM-DD')
      ]
    }
  ],
  columns: [
    {
      title: '所属单位',
      key: 'company',
      align: 'center'
    },
    {
      title: '车牌号',
      key: 'chepaihao',
      align: 'center',
      width: 100
    },
    { title: '路线方案名', key: 'scheme', align: 'center' },
    {
      title: '开始时间',
      key: 'starttime',
      align: 'center',
      width: 150
    },
    { title: '起始区域名', key: 'sereaName', align: 'center' },
    {
      title: '结束时间',
      key: 'endtime',
      align: 'center',
      width: 150
    },
    {
      title: '结束区域名',
      key: 'eareaName',
      align: 'center',
      width: 180
    },
    {
      title: '时长',
      key: 'keepTime',
      align: 'center',
      width: 180
    }
  ],
  data: []
};
export const fuelDetailTableConfig = {
  $container: '.table-box',
  onList: 'getFuelDetailList',
  search: {},
  searchColumns: [
    {
      label: '所属单位',
      key: 'jigouName',
      type: 'slot'
    },
    {
      label: '车牌牌照',
      key: 'chepaihao',
      placeholder: '请输入车牌号码',
      type: 'text'
    },
    {
      label: '报警时间',
      key: 'date',
      type: 'daterange',
      options: {
        disabledDate: (date) => date.valueOf() > Date.now()
      },
      defaultValue: [
        dayjs()
          .subtract(0, 'day')
          .format('YYYY-MM-DD'),
        dayjs()
          .subtract(0, 'day')
          .format('YYYY-MM-DD')
      ]
    }
  ],
  columns: [
    {
      type: 'index',
      title: '序号',
      width: 60,
      align: 'center'
    },
    {
      title: '责任经营者名称',
      key: 'company',
      align: 'center'
    },
    {
      title: '车牌号',
      key: 'plate',
      align: 'center',
      width: 100
    },
    { title: '颜色', key: 'color', align: 'center' },
    {
      title: '座位数',
      key: ' SeatNumber',
      align: 'center',
      width: 150
    },
    { title: '网络级别', key: 'Agroup', align: 'center' },
    {
      title: '路线起讫点',
      key: 'schname',
      align: 'center',
      width: 150
    },
    {
      title: '总数',
      key: 'zongshu',
      align: 'center',
      width: 180
    }
  ],
  data: []
};
