const getNumArr = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }
  return arr;
};

const textStyle = {
  color: '#0e48a7'
};

export const monthChart = (data, days = 31) => {
  return {
    title: {
      text: '月统计图(预警数)',
      textStyle
    },
    xAxis: {
      type: 'category',
      data: getNumArr(days)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#1067ff'
        },
        itemStyle: {
          opacity: 0
        }
      }
    ]
  };
};

export const quarterChart = (data) => {
  return {
    title: {
      text: '季度统计图(预警数)',
      textStyle
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: '季度统计',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          {
            value: data[0] || 0,
            name: '第一季度',
            itemStyle: {
              color: '#ffd148'
            }
          },
          {
            value: data[1] || 0,
            name: '第二季度',
            itemStyle: {
              color: '#0246af'
            }
          },
          {
            value: data[2] || 0,
            name: '第三季度',
            itemStyle: {
              color: '#ee7619'
            }
          },
          {
            value: data[3] || 0,
            name: '第四季度',
            itemStyle: {
              color: '#0adbfd'
            }
          }
        ]
      }
    ]
  };
};

export const halfYearChart = (data) => {
  return {
    title: {
      text: '半年统计图(预警数)',
      textStyle
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: '半年统计',
        startAngle: -90,
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {
            value: data[0] || 0,
            name: '上半年',
            itemStyle: {
              color: '#f0b95d'
            }
          },
          {
            value: data[1] || 0,
            name: '下半年',
            itemStyle: {
              color: '#00a2ff'
            }
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
};

export const yearChart = (data) => {
  return {
    title: {
      text: '全年统计图(预警数)',
      textStyle
    },
    tooltip: {
      trigger: 'item',
      formatter: '预警数：{c}'
    },
    xAxis: {
      type: 'category',
      data: getNumArr(12)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'bar',
        itemStyle: {
          color: '#f3a328'
        }
      }
    ]
  };
};
