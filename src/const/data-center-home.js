const getNumArr = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }
  return arr;
};

// const textStyle = {
//   color: '#0e48a7'
// };

// 月车辆运营情况
export const monthChart = (data, days = 31) => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    color: ['#1ed336', '#33d3f5', '#ffa614'],
    legend: {
      data: ['运行车辆', '停置车辆', '离线车辆']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
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
        name: '运行车辆',
        type: 'line',
        data: data.onlineCount
      },
      {
        name: '停置车辆',
        type: 'line',
        data: data.stopCount
      },
      {
        name: '离线车辆',
        type: 'line',
        data: data.offlineCount
      },
    ]
  };
};

// 报警比例
export const alarmRate = (data) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['车辆报警', '主动防御报警'],
      axisLabel: {
        interval: 0,
        formatter: function(value) {
          var ret = ''; //拼接加\n返回的类目项
          var maxLength = 4; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = ''; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n';
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    series: [
      {
        name: data.lastmonth.beginTime+'~'+data.lastmonth.endTime+'日报警数',
        barWidth: '30%',
        data: [data.lastmonth.alarmCount, data.lastmonth.zhudongCunt],
        type: 'bar',

        // 柱状图形显示的颜色
        itemStyle: {
          normal: {
            //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function(params) {
              var index = params.dataIndex;
              var colorList = [
                // 渐变颜色的色值和透明度
                //透明度从0
                ['rgba(33, 122, 247,0)', 'rgba(33, 122, 247,0)'],
                //到透明度1 ,如果需要不同的颜色直接修改不同颜色即可
                ['rgba(33, 122, 247,0.6)', 'rgba(33, 122, 247,0.6)'],
                ['rgba(33, 122, 247,1)', 'rgba(33, 122, 247,1)']
              ];
              return {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1, //颜色的开始位置
                    color: colorList[0][index] // 0% 处的颜色
                  },
                  {
                    offset: 0.6, //颜色的结束位置
                    color: colorList[1][index] // 100% 处的颜色
                  },
                  {
                    offset: 0, //颜色的结束位置
                    color: colorList[2][index] // 100% 处的颜色
                  }
                ]
              };
            }
          }
        }
      },
      {
        name: data.month.beginTime+'~'+data.month.endTime+'日报警数',
        barWidth: '30%',
        data: [data.month.alarmCount, data.month.zhudongCunt],
        type: 'bar',

        // 柱状图形显示的颜色
        itemStyle: {
          normal: {
            //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function(params) {
              var index = params.dataIndex;
              var colorList = [
                // 渐变颜色的色值和透明度
                //透明度从0
                ['rgba(252,46,58,0)', 'rgba(254,170,12,0)'],
                //到透明度1 ,如果需要不同的颜色直接修改不同颜色即可
                ['rgba(252,46,58,0.6)', 'rgba(254,170,12,0.6)'],
                ['rgba(252,46,58,1)', 'rgba(254,170,12,1)']
              ];
              return {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1, //颜色的开始位置
                    color: colorList[0][index] // 0% 处的颜色
                  },
                  {
                    offset: 0.6, //颜色的结束位置
                    color: colorList[1][index] // 100% 处的颜色
                  },
                  {
                    offset: 0, //颜色的结束位置
                    color: colorList[2][index] // 100% 处的颜色
                  }
                ]
              };
            }
          }
        }
      }
    ]
  };
};
// 报警处理
export const alarmProcessing = (data) => {
  return {
    grid: {
      left: '5%',
      top: '5%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: '报警处理',
        startAngle: -90,
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data: [
          {
            value: data.weichulicishu,
            name: '未处理',
            itemStyle: {
              color: '#fcaa09'
            }
          },
          {
            value: data.yichulicishu,
            name: '已处理',
            itemStyle: {
              color: '#1ad732'
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

// 月车辆报警趋势
export const alarmingTrend = (data, days = 31) => {
  return {
    tooltip: {
      trigger: 'axis'
    },
    color: ['#2cd5f6', '#fa2d2a'],
    legend: {
      data: ['上线车辆', '报警车辆']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
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
        name: '上线车辆',
        type: 'line',
        data: data.onlineCount
      },
      {
        name: '报警车辆',
        type: 'line',
        data: data.vehiclealarmCount
      }
    ]
  };
};

// 月报警累计
export const alarmCumulative = (data) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Object.keys(data),
      // data: ['超速驾驶', '疲劳驾驶', '夜间报警', '异常报警', '接打电话', '抽烟驾驶', '未系安全带', '分神驾驶', '驾驶员疲劳', '车距过近', '车道偏离', '防碰撞'],
      axisLabel: {
        interval: 0,
        formatter: function(value) {
          var ret = ''; //拼接加\n返回的类目项
          var maxLength = 2; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) {
            //如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = ''; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n';
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    series: [
      {
        name: '月报警累计',
        barWidth: '60%',
        data: Object.values(data),
        type: 'bar',

        // 柱状图形显示的颜色
        itemStyle: {
          normal: {
            //每个柱子的颜色即为colorList数组里的每一项,如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function(params) {
              // console.log(params);
              // var index = params.dataIndex;
              var colorList = [
                // 渐变颜色的色值和透明度
                //透明度从0
                ['rgba(252,46,58,0)', 'rgba(254,170,12,0)'],
                //到透明度1 ,如果需要不同的颜色直接修改不同颜色即可
                ['rgba(252,46,58,0.6)', 'rgba(254,170,12,0.6)'],
                ['rgba(252,46,58,1)', 'rgba(254,170,12,1)']
              ];
              if (params.dataIndex <= 3) {
                return {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1, //颜色的开始位置
                      color: colorList[0][0] // 0% 处的颜色
                    },
                    {
                      offset: 0.6, //颜色的结束位置
                      color: colorList[1][0] // 100% 处的颜色
                    },
                    {
                      offset: 0, //颜色的结束位置
                      color: colorList[2][0] // 100% 处的颜色
                    }
                  ]
                };
              } else {
                return {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1, //颜色的开始位置
                      color: colorList[0][1] // 0% 处的颜色
                    },
                    {
                      offset: 0.6, //颜色的结束位置
                      color: colorList[1][1] // 100% 处的颜色
                    },
                    {
                      offset: 0, //颜色的结束位置
                      color: colorList[2][1] // 100% 处的颜色
                    }
                  ]
                };
              }
            }
          }
        }
      }
    ]
  };
};
