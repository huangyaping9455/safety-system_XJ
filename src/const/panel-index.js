const getNumArr = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr[i] = i + 1;
  }
  return arr;
};


export const alarmChart = {
  $container: '.alarm-trend',
  $name: 'alarm-trend',
  grid: { y: '20%', y2: '10%', x: '5%',containLabel: true},
  xAxis: {
    type: 'category',
    data: getNumArr(12),
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
      smooth: true,
      lineStyle: {
        color: '#1067ff'
      },
      itemStyle: {
        opacity: 0
      },
     
    }
  ]
};

export const educationalChart = {
  $container: '.educational',
  $name: 'educational',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  grid: { y: '10%', y2: '10%', x: '5%',containLabel: true},
  series: [
    {
      name: '教育培训',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
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
          name: '线下培训',
          itemStyle: {
            color: '#0a95fe'
          }
        },
        {
          value: 310,
          name: '线上培训',
          itemStyle: {
            color: '#07ffff'
          }
        },
        
      ]
    }
  ]
};

export const safetyChart = {
  $container: '.safetycheck',
  $name: 'safetycheck',
  grid: { y: '20%', y2: '10%', x: '5%',containLabel: true},
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  xAxis : [
    {
        type : 'category',
        data : getNumArr(12),
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
    }
],
yAxis : [
    {
        type : 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
    }
],
  series: [
    {
      name: '安全检查',
      startAngle: -90,
      type: 'bar',
      barWidth: '60%',
      center: ['50%', '50%'],
      data: [
        10, 52, 200, 334, 390, 330, 220
      ],
    
    }
  ]
};

export const dangerChart = {
  $container: '.danger',
  $name: 'danger',
  tooltip: {
    trigger: 'axis'
},
legend: {
  top:'10',
  data:['隐患发现','隐患处理'],
  textStyle:{
    color: '#fff'
  }
},
grid: { y: '20%', y2: '10%', x: '5%',containLabel: true},
toolbox: {
    feature: {
        saveAsImage: {}
    }
},
  xAxis: {
    type: 'category',
    data: getNumArr(12),
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
      name:'隐患发现',
      type:'line',
      itemStyle: {
        color: '#f15c17'
      },
      data:[120, 132, 101, 134, 90, 230, 210]
  },
  {
      name:'隐患处理',
      type:'line',
      itemStyle: {
        color: '#07ffff'
      },
      data:[220, 182, 191, 234, 290, 330, 310]
  },
 
  ]
};

export const accidentChart = {
  $container: '.accident',
  $name: 'accident',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '事故统计',
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
          name: '一般事故',
          itemStyle: {
            color: '#11f7fe'
          }
        },
        {
          value: 234,
          name: '较大事故',
          itemStyle: {
            color: '#fcc72d'
          }
        },
        {
          value: 310,
          name: '重大事故',
          itemStyle: {
            color: '#fd6016'
          }
        },
        {
          value: 310,
          name: '特大事故',
          itemStyle: {
            color: '#fd282a'
          }
        },
       
      ]
    }
  ]
};

export const emergencyChart = {
  $container: '.emergency',
  $name: 'emergency',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  grid: { y: '20%', y2: '10%', x: '5%',containLabel: true},
  legend: {
    top:'10',
    data: ['Forest', 'Steppe'],
    textStyle:{
      color: '#fff'
    }
},
xAxis: [
    {
        type: 'category',
        axisTick: {show: false},
        data: getNumArr(12),
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
    }
],
yAxis: [
    {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
    }
],
  series: [
    {
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      data: [320, 332, 301, 334, 390]
  },
  {
      name: 'Steppe',
      type: 'bar',
      itemStyle: {
        color: '#07ffff'
      },
      data: [220, 182, 191, 234, 290]
  },
  ]
};