export const remindTable = {
  $container: '.Information-remind-bottom',
  offset: 10,
  columns: [
    { title: '预警', key: 'tixingxiangqing' },
    { title: '预警说明', key: 'shuoming' },
    {
      title: '预警数',
      width: 200,
      align: 'center',
      slot: 'counts'
    }
  ],
  data: []
};
