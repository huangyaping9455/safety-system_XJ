export const guidePieChart = (num, title, ismini) => {
  return {
    title: {
      text: title,
      left: 'center',
      top: '55%',
      // textAlign: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: ismini ? 12 : 14,
        color: '#666666',
        textAlign: 'center',
      },
    },
    series: {
      name: '装备制造',
      type: 'pie',
      startAngle: 130,
      radius: ismini ? [60, 75] : [80, 98],
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#34a1ff' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#45ccd4' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 10,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
        }
      },
      hoverAnimation: false,
      center: ['50%', '50%'],
      data: [{
        value: num,
        label: {
          normal: {
            formatter: function (params) {
              return params.value + '%';
            },
            position: 'center',
            show: true,
            textStyle: {
              fontSize: ismini ? 28 : 36,
              fontWeight: 'bold',
              color: '#333333'
            }
          }
        },
      }, {
        value: 100 - num,
        name: 'invisible',
        itemStyle: {
          normal: {
            color: '#efeff6'
          },
          emphasis: {
            color: '#efeff6'
          }
        }
      }]
    }
  };
};
export const lineoption = (data, yName, ismini) => {
  return {
    color: ['#34a1ff'],
    tooltip: {
      trigger: 'axis',
      formatter: function (val) {
        if (yName == "weichulizongshu") {
          let html = `
          <p>${val[0].name}</p>
          <p>未处理报警总数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.weichulizongshu}</span></p>
          <p>北斗设备报警数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.bdbaojingcishu}</span></p>
          <p>主动安全设备报警数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.sbbaojingcishu}</span></p>
        `;
          return html;
        } else if (yName == "bdbaojingcishu") {
          let html = `
          <p>${val[0].name}</p>
          <p>报警数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.bdbaojingcishu}</span></p>
          <p>未处理数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.bdweichulishu}</span></p>
        `;
          return html;
        } else {
          let html = `
          <p>${val[0].name}</p>
          <p>报警数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.sbbaojingcishu}</span></p>
          <p>未处理数<span style="color:#34a1ff;margin-left:5px;">${val[0].value.sbweichulishu}</span></p>
        `;
          return html;
        }
      }
    },
    grid: {
      top: '10%',
      left: '1%',
      right: '1%',
      bottom: '3%',
      containLabel: true
    },
    dataset: {
      source: data
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: ismini ? 10 : 14
      },
      axisLine: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: ismini ? 10 : 14
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#f1f1f1'
        }
      }
    }],
    series: {
      encode: {
        x: 'date',
        y: yName
      },
      type: 'line',
      name: '',
      smooth: true,
      showSymbol: false,
      areaStyle: { //区域填充样式
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(52,161,255,1)'
            }, {
              offset: 1,
              color: 'rgba(52,161,255,0)'
            }],
            global: false
          },
          shadowBlur: 0
        }
      }
    }
  };
};
export const lineoption1 = (data = [], ismini) => {
  let zcbaojingclcishu = 0,
    csbaojingclcishu = 0;
  data.forEach(el => {
    zcbaojingclcishu += el.zcbaojingclcishu;
    csbaojingclcishu += el.csbaojingclcishu;
  });
  return {
    color: ['#34a1ff', '#ffa469'],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 40,
      top: 15,
      itemGap: 30,
      textStyle: {
        fontSize: ismini ? 10 : 14
      },
      data: ['正常处理报警数', '超时处理报警数'],
      formatter: function (name) {
        let num = name == '正常处理报警数' ? zcbaojingclcishu : csbaojingclcishu;
        return name + `     ${num}`;
      }
    },
    dataset: {
      source: data
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: ismini ? 10 : 14
      },
      axisLine: {
        show: false
      }
    },
    yAxis: [{
      type: 'value',
      name: '辆',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        fontSize: ismini ? 10 : 14
      },
      splitLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      }
    }],
    series: [{
        encode: {
          x: 'date',
          y: 'zcbaojingclcishu'
        },
        type: 'line',
        name: '正常处理报警数',
        smooth: true,
        showSymbol: false,
        areaStyle: { //区域填充样式
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(52,161,255,1)'
              }, {
                offset: 1,
                color: 'rgba(52,161,255,0)'
              }],
              global: false
            },
            shadowBlur: 0
          }
        }
      },
      {
        encode: {
          x: 'date',
          y: 'csbaojingclcishu'
        },
        type: 'line',
        name: '超时处理报警数',
        smooth: true,
        showSymbol: false,
        areaStyle: { //区域填充样式
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(255,164,105,1)'
              }, {
                offset: 1,
                color: 'rgba(255,164,105,0)'
              }],
              global: false
            },
            shadowBlur: 0
          }
        }
      }
    ]
  };
};
let placeHolderStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    color: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0
  }
};
export const guidePieChart1 = (bdbaojingcishu, sbbaojingcishu, bdbaojingclcishu, bdweichulishu, sbbaojingclcishu, sbweichulishu) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [{
        name: '报警总数',
        type: 'pie',
        radius: [80, 100],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        center: ['45%', '50%'],
        data: [{
            name: '北斗设备',
            value: bdbaojingcishu,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#28f39c' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#0db7e0' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          {
            value: sbbaojingcishu,
            name: '主动安全设备',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#f65727' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#f9cc3f' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
        ]
      },
      {
        name: '总处理报警',
        type: 'pie',
        radius: [50, 70],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        center: ['45%', '50%'],
        data: [{
            name: 'GPS设备处理率',
            value: bdbaojingclcishu,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#893ff8' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#218af0' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          {
            name: 'GPS设备未处理率',
            value: bdweichulishu,
            itemStyle: {
              color: '#e0e0e0'
            },
          },
          {
            value: sbbaojingclcishu,
            name: '主动安全处理率',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#f83fe4' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#f02139' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          {
            name: '主动安全未处理率',
            value: sbweichulishu,
            itemStyle: {
              color: '#e0e0e0'
            },
          },
        ]
      },
      {
        name: '未处理报警数',
        type: 'pie',
        radius: [20, 40],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        center: ['45%', '50%'],
        data: [{
            name: 'GPS设备未处理数',
            value: bdweichulishu,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#3eef60' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#89f791' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          {
            value: sbweichulishu,
            name: '主动安全未处理数',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#ffc948' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#ffa569' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
        ]
      }
    ]
  };
};