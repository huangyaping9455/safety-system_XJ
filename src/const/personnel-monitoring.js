export const proportionChart = {
  $container: '.alarmChart',
  $name: 'proportion',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left'
  //   // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  // },
  series: [
    {
      name: '报警占比',
      type: 'pie',
      radius: ['50%', '70%'],
      label: {
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '20',
            fontWeight: 'bold'
          }
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: [
        {
          value: 335,
          name: '超速报警',
          itemStyle: {
            color: '#11f7fe'
          }
        },
        {
          value: 310,
          name: '夜间行驶',
          itemStyle: {
            color: '#0995fb'
          }
        },
        {
          value: 234,
          name: '疲劳驾驶',
          itemStyle: {
            color: '#fcc72d'
          }
        }
      ]
    }
  ]
};
export const trendChart = {
  $container: '.trendChart',
  $name: 'trend',
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      itemStyle: {
        color: '#0c4c67',
        opacity: 0.2
      },

      areaStyle: {}
    },
    {
      data: [520, 432, 701, 634, 990, 1230, 1120],
      type: 'line',
      itemStyle: {
        color: '#40bdb3'
      },
      areaStyle: {}
    }
  ]
};
