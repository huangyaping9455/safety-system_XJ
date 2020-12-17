export const warningChart = () => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: '预警类型',
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
            name: '公共卫生',
            itemStyle: {
              color: '#0cfeff'
            }
          },
          {
            value: 123,
            name: '事故灾难',
            itemStyle: {
              color: '#fbc52a'
            }
          },
          {
            value: 23,
            name: '自然事故',
            itemStyle: {
              color: '#fb9925'
            }
          },
          {
            value: 25,
            name: '社会安全',
            itemStyle: {
              color: '#0c93fa'
            }
          }
        ]
      }
    ]
  };
};

export const equipChart = () => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: '装备类型',
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
            name: '生命救治',
            itemStyle: {
              color: '#01ff6a'
            }
          },
          {
            value: 123,
            name: '药品',
            itemStyle: {
              color: '#04fefe'
            }
          },
          {
            value: 320,
            name: '防护用品',
            itemStyle: {
              color: '#fcc726'
            }
          },
          {
            value: 125,
            name: '临时炊具',
            itemStyle: {
              color: '#f79b2d'
            }
          },
          {
            value: 205,
            name: '灭火',
            itemStyle: {
              color: '#fb2829'
            }
          }
        ]
      }
    ]
  };
};

export const alarmChart = () => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '预警：{c}'
    },
    xAxis: {
      type: 'category',
      data: ['行车事故', '现场事故', '自然灾害', '其他事故'],
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
        itemStyle: {
          normal: {
            // 每根柱子颜色设置
            color: function(params) {
              let colorList = ['#f8272a', '#febf33', '#04efef', '#068bee'];
              return colorList[params.dataIndex];
            }
          }
        },
        // 柱状图上显示数据
        label: {
          show: 'true',
          position: 'top',
          color: '#FFF',
          fontWeight: 'bolder',
          fontSize: '20'
        },
        data: [34, 45, 25, 58],
        type: 'bar'
      }
    ]
  };
};

export const swiperOption = {
  watchSlidesProgress: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 5,
  autoplay: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination'
  },
  on: {
    progress: function() {
      for (let i = 0; i < this.slides.length; i++) {
        let slide = this.slides.eq(i);
        let slideProgress = this.slides[i].progress;
        let modify = 1;
        if (Math.abs(slideProgress) > 1) {
          modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
        }
        let translate = slideProgress * modify * 260 + 'px';
        let scale = 1 - Math.abs(slideProgress) / 5;
        let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
        slide.css('zIndex', zIndex);
        slide.css('opacity', 1);
        if (Math.abs(slideProgress) > 3) {
          slide.css('opacity', 0);
        }
      }
    },
    setTransition: function(transition) {
      for (let i = 0; i < this.slides.length; i++) {
        let slide = this.slides.eq(i);
        slide.transition(transition);
      }
    }
  }
};
