// import { getChosuList, getPilaoList } from '@/api/daily/alarm';
// import dayjs from 'dayjs';
// 报警列表配置
export const alarmTableConfig = {
  $container: '.table-box',
  search: {
    chaosubi: [0, 100]
  },
  columns: [{
      type: 'selection',
      align: 'center',
      width: 60,
      fixed: 'left'
    },
    {
      title: '车牌号',
      key: 'cph',
      slot: 'plate',
      align: 'center',
      fixed: 'left',
      width: 100
    },
    {
      title: '颜色',
      key: 'vehicleColor',
      align: 'center',
      width: 80
    },
    {
      title: '使用性质',
      key: 'shiyongxingzhi',
      align: 'center',
      width: 160
    },
    {
      title: '报警状态',
      key: 'alarm',
      align: 'center',
      width: 100
    },
    {
      title: '报警类型',
      key: 'alarmNote',
      align: 'center',
      width: 100
    },
    // {
    //   title: '企业名称',
    //   key: 'DeptName',
    //   align: 'center',
    //   width: 200
    // },
    {
      title: '车辆状态',
      key: "VehState",
      align: 'center',
      width: 100
    }, {
      title: '定位状态',
      key: 'LocalFlag',
      align: 'center',
      width: 100
    },
    {
      title: '在线状态',
      key: 'zaixian',
      align: 'center',
      width: 100
    },
    // {
    //   title: 'GPS时间',
    //   key: 'Gpstime',
    //   align: 'center',
    //   width: 150
    // },
    {
      title: '定位时间',
      key: 'gpstime',
      align: 'center',
      width: 150
    },
    {
      title: '方向',
      key: 'Angle',
      align: 'center',
      width: 100
    },
    {
      title: '速度（km/h）',
      key: 'Velocity',
      align: 'center',
      width: 110
    },
    // {
    //   title: '海拔（km）',
    //   key: 'High',
    //   align: 'center',
    //   width: 100
    // },

    {
      title: '经度',
      key: `longitude`,
      align: 'center',
      width: 100
    },
    {
      title: '纬度',
      key: `latitude`,
      align: 'center',
      width: 100
    },
    {
      title: '地理位置',
      key: `locationName`,
      align: 'center',
      tooltip: true,
      minWidth: 220
    },

    {
      title: '视频',
      slot: 'monitor',
      align: 'center',
      fixed: 'right',
      width: 80
    },

    {
      title: '回放',
      slot: 'playback',
      align: 'center',
      fixed: 'right',
      width: 80
    }
  ],
  data: []
};
// 主动安全设备报警类型
export const vehicleAlarmList = [{
    icon: require('A/daily/caosu.png'),
    text: '超速报警',
    fild: 'gpsChaosuCount',
    key: 'chaosu',
    type: 'GPS',
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
    icon: require('A/daily/pilao.png'),
    text: '疲劳驾驶报警 ',
    fild: 'gpsPilaoCount',
    type: 'GPS',
    standard: `根据《中华人民共和国道路交通安全法》及《道路运输车辆动态监督管理办法》规定。
    驾驶员24小时累计驾驶时间原则上不超过8小时，日间连续驾驶不超过4小时，夜间连续驾驶不超过2小时，
    每次停车休息时间不少于20分钟，客运车辆夜间行驶速度不得超过日间限速80%的要求。
    根据道路交通安全法第九十条规定，驾驶员驾驶车辆超过4小时没有休息20分钟以上的，处以罚款200元处罚。
    （1）报警核定状态为100
	（2）持续时间>=0秒 `
  },
  {
    icon: require('A/daily/yejian.png'),
    text: '夜间行驶报警',
    fild: 'gpsYejianCount',
    type: 'GPS',
    standard: '夜间2点至5点不能行驶。（1）报警核定状态为100    （2）持续时间>=0秒'
  },
  {
    icon: require('A/daily/yichang.png'),
    text: '异常报警',
    fild: 'gpsYichangCount',
    type: 'GPS',
    standard: `异常报警是指车辆存在无数据不定位情况。
    （1）持续时间>=1800秒
	（2）移动距离>20000米
	（3）(移动距离/1000)/(持续时间/60)<=1.7(每分钟的移动距离<=1.7公里) `
  },
  {
    text: '24小时不在线报警',
    fild: 'buzaixianbaojing',
    type: 'GPS',
    standard: `24小时不在线报警是指企业车辆最后一次数据回传时间与当天0点的时间差大于24小时。`
  },
  {
    text: '高速禁行报警',
    fild: 'gaosujinxing',
    type: 'GPS',
    standard: ``
  },
];
// DMS报警
export const defenseList = [{
    icon: require('A/daily/dadianhua.png'),
    text: '接打电话报警',
    fild: 'zhudongJiedadianhuaCount',
    type: 'driv',
    standard: '在车辆行驶过程中，DSM摄像头检测到驾驶员接打电话的行为时，产生接打电话警告报警。'
  },
  {
    icon: require('A/daily/chouyan.png'),
    text: '抽烟报警',
    fild: 'zhudongChouyanjiashiCount',
    type: 'driv',
    standard: '在车辆行驶过程中，DSM摄像头通过接触或非接触的方式检测到驾驶员抽烟的行为时，产生抽烟警告报警。'
  },
  // {
  //   icon: require('A/daily/weiianquandai.png'),
  //   text: '未系安全带',
  //   fild: 'zhudongWeijianquandaiCount',
  //   type: 'driv'
  // },
  {
    icon: require('A/daily/fensheng.png'),
    text: '分神驾驶报警',
    fild: 'zhudongFenshenjiashiCount',
    type: 'driv',
    standard: '在车辆行驶过程中，DSM摄像头检测到驾驶员左顾右盼、长时间不目视前方、低头玩手机或者分神吃零食等情况时，产生分神驾驶警告报警。'
  },
  {
    icon: require('A/daily/pilao.png'),
    text: '生理疲劳报警',
    fild: 'zhudongJiashiyuanpilaoCount',
    type: 'driv',
    standard: '在车辆行驶过程中，DSM摄像头通过面部监测的方式检测到驾驶员持续闭眼、打哈欠、眯眼或者眨眼频繁时，产生疲劳驾驶警告报警。'
  },
  {
    icon: require('A/daily/pilao.png'),
    text: '驾驶员异常报警',
    fild: 'jiashiyuanyichangbaojing',
    type: 'driv',
    standard: '在车辆行驶过程中，DSM摄像头通过视频的方式检测不到驾驶员面部特征或者摄像头被遮挡时，产生驾驶员异常报警。'
  },
];
// ADASList
export const ADASList = [{
    icon: require('A/daily/chejuguojing.png'),
    text: '车距过近报警',
    fild: 'zhudongChejuguojinCount',
    type: 'driv',
    standard: `在车辆行驶过程中，ADAS摄像头通过监测与前车安全距离时间过低时，产生车距过近报警警告报警。
               当车辆速度高于报警速度阈值时， 与前车距离时间低于安全距离时间阈值（ 默认设置的是1 .2 S）， 产生车距过近报警， 同时进行语音报警提示并向平台发送车距过近报警信息， 报警信息包含报警级别、 行驶前方道路的照片和视频。 如当车速为60KM / H时， 安全距离小于60× 1.2 = 72 米产生报警； 当车速为70KM / H时， 安全距离小于70× 1.2 = 84 米产生报警。 `
  },
  {
    icon: require('A/daily/chedaopianli.png'),
    text: '车道偏离报警',
    fild: 'zhudongChedaopianliCount',
    type: 'driv',
    standard: '在车辆行驶过程中，车载终端探测车辆相对车辆边界的横向位置，当车辆处于报警临界线附近且没有操作相应的转向灯时，对驾驶员进行报警提示'
  },
  {
    icon: require('A/daily/pengzhuang.png'),
    text: '前向碰撞报警',
    fild: 'zhudongFangpenzhuangCount',
    type: 'driv',
    standard: `在车辆行驶过程中，ADAS摄像头通过监测与前车碰撞时间过低时，产生前向碰撞报警警告报警。
               当车辆速度高于报警速度阈值时， 若碰撞时间（ TTC） 低于安全时间阈值（ 默认设置的是0 .8 S）， 产生前向碰撞报警， 同时进行语音报警提示并向平台发送前向碰撞报警信息， 报警信息包含报警级别、 行驶前方道路的照片和视频。 如当车速为60KM / H时， 安全距离小于60× 0.8 = 48 米产生报警； 当车速为70KM / H时， 安全距离小于70× 0.8 = 56 米产生报警。 `
  },
  {
    icon: require('A/daily/pengzhuang.png'),
    text: '行人碰撞预警',
    fild: 'xingrenpengzhuangyujing',
    type: 'driv',
    standard: ''
  }
]

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
    progress: function () {
      for (let i = 0; i < this.slides.length; i++) {
        let slide = this.slides.eq(i);
        let slideProgress = this.slides[i].progress;
        let modify = 1;
        if (Math.abs(slideProgress) > 1) {
          modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
        }
        let translate = slideProgress * modify * 160 + 'px';
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
    setTransition: function (transition) {
      for (let i = 0; i < this.slides.length; i++) {
        let slide = this.slides.eq(i);
        slide.transition(transition);
      }
    }
  }
};
export const tabList = [{
    text: '企业总车辆',
    color: '#2c45c7',
    fild: 'RegisterCount',
    type: '',
    icon: ''
  },
  {
    text: '运行车辆',
    color: '#0feb14',
    fild: 'OnLineCount',
    type: '在线',
    icon: require('A/daily/运行.png')
  },
  {
    text: '停置车辆',
    color: '#35d5ff',
    fild: 'DecommissioningCount',
    type: '停用',
    icon: require('A/daily/闲置.png')
  },
  {
    text: '离线车辆',
    color: '#939393',
    fild: 'offLineCount',
    type: '离线',
    icon: require('A/daily/离线.png')
  },
  {
    text: '报警情况',
    color: '#ff0000',
    fild: '',
    type: '报警',
    icon: require('A/daily/离线.png')
  },
  // {
  //   text: '维修车辆',
  //   color: '#eb330f',
  //   fild: 'weixiuVehicleCount',
  //   type: '维修',
  //   icon: require('A/daily/维修.png')
  // }
];
export const baisInfo = [{
    text: '车辆型号',
    value: '沃尔沃xc40',
    field: 'changpai'
  },
  {
    text: '车架号',
    value: 'ZZTESD323432',
    field: 'chejiahao'
  },
  {
    text: '车身颜色',
    value: '红',
    field: 'cheshenyanse'
  },
  {
    text: '车辆入户时间',
    value: '2012-08-12'
  },
  {
    text: '运营年限',
    value: '15'
  },
  {
    text: '发动机型号',
    value: 'WD615.95E',
    field: 'fadongjixinghao'
  },
  {
    text: '发动机号',
    value: '12465263876',
    field: 'fadongjihao'
  },
  {
    text: '发动机排放功率',
    value: '247',
    field: 'fadongjipailianggonglv'
  },
  {
    text: '燃料类别',
    value: '柴油',
    field: 'ranliaoleibie'
  },
  {
    text: '排放标准',
    value: '国四',
    field: 'paifangbiaozhun'
  }
];
export const alarmInfo = [{
    text: '驾驶员',
    value: '张良',
    field: 'jiashiyuanxingming'
  },
  {
    text: '联系电话',
    value: '18546584951',
    field: 'jiashiyuandianhua'
  },
  {
    text: '车辆状态',
    value: '在线',
    set: 'info',
    field: 'status'
  },
  {
    text: '里程(km)',
    value: '30',
    set: 'info',
    field: 'licheng'
  },
  {
    text: '今日里程(km)',
    value: '30',
    set: 'info',
    field: 'daylicheng'
  },
  {
    text: '行停时长',
    value: '30"-停',
    set: 'info',
    field: 'xingtingshichang'
  },
  {
    text: '油量(L)',
    value: '200',
    set: 'info',
    field: 'youliang'
  },
  {
    text: '载重(T)',
    value: '5',
    set: 'info',
    field: 'zaizhong'
  },
  {
    text: '当前报警：',
    value: '-',
    set: 'info',
    field: 'alarm'
  },
  {
    text: '定位时间',
    value: '2019-10-14 15:23:25',
    set: 'video',
    field: 'gpstime'
  },
  {
    text: '当前地理位置',
    value: '5',
    set: 'video',
    field: 'locationName'
  },
];
// 轨迹记录配置表
// 车辆信息
export const vehicleInfo = [{
    text: '车牌号',
    value: '张良',
    field: 'cph'
  },

  {
    text: '驾驶员姓名',
    value: '18546584951',
    field: 'dianhua'
  },
  {
    text: '车牌颜色',
    value: '黄色',
    field: 'platecolor'
  },
  {
    text: '状态',
    value: '30',
    field: 'status'
  },
  {
    text: '所属公司',
    value: '张良',
    field: 'company'
  },
];
// 定位信息
export const locationInfo = [{
    text: '卫星时间',
    value: '2019-10-31 16:25:36',
    field: 'jiashiyuan'
  },
  {
    text: '接收时间',
    value: '2019-10-31 16:25:36',
    field: 'jiashiyuan'
  },
  {
    text: '行驶速度',
    value: '80km/h',
    field: 'dianhua'
  },
  {
    text: '车辆状态',
    value: '报警',
    field: 'vehiclestatus'
  },
  {
    text: '地理位置',
    value: '30',
    field: 'licheng'
  }
];
// 报警信息
export const trackAlarmInfo = [{
    text: '报警类型',
    value: '超速报警',
    field: 'alarmType',
    color: 'red'
  },
  {
    text: '开始时间',
    value: '2019-10-31 16:25:36',
    field: 'beginTime'
  }, {
    text: '最高速度',
    value: '30',
    field: 'maxSpeed',
    color: 'red',
    unit: 'km/h'
  }, {
    text: '是否夜间',
    value: '30',
    field: 'atNocturnal'
  }, {
    text: '报警等级',
    value: '30',
    field: 'status'
  },
  {
    text: '结束时间',
    value: '2019-10-31 16:25:36',
    field: 'endTime'
  }, {
    text: '报警速度',
    value: '30',
    field: 'velocity',
    color: 'red',
    unit: 'km/h'
  },
  {
    text: '持续时间',
    value: '报警',
    field: 'keeptimeShow',
    unit: ''
  },
  {
    text: '限定速度',
    value: '30',
    field: 'limited',
    unit: 'km/h'
  }
];
export const alarmChart = (speed, scale) => {
  return {
    grid: {
      top: '10px',
      left: '35px',
      right: '15px',
      bottom: '35px'
    },
    // 鼠标移入 显示数据
    tooltip: {
      trigger: 'axis',
      formatter: '<p>速度:{c}(km/h)</p><p>时间:{b}</p>'
    },
    dataZoom: [{
      type: 'inside'
    }, {
      type: 'slider'
    }],
    xAxis: {
      // type: 'time',
      data: scale,
      splitNumber: 15,
      barWidth: 1000,
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      nameTextStyle: {
        color: '#fff'
      },
      silent: false,
      // axisLabel: {
      //   interval: 0, //横轴信息全部显示
      //   rotate: 60 //60度角倾斜显示
      //   // formatter: function(val) {
      //   //   return val.split('').join('\n');
      //   // } //横轴信息文字竖直显示
      // }
      axisLabel: {
        interval: 70,
        formatter: function (value) {
          var ret = ""; //拼接加\n返回的类目项
          var maxLength = 10; //每项显示文字个数
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
      axisLine: {
        lineStyle: {
          color: '#333',
        }
      }
    },
    series: [{
      data: speed,
      smooth: true,
      type: 'line',
      // symbol: 'circle',//折线点设置为实心点
      symbolSize: 0, //折线点的大小
      smooth: 0.4, //弧度
      areaStyle: {
        color: '#79c4f6'
      },
      lineStyle: {
        color: '#36adfd',
        width: 2
      },
      // color: '#fff',
      itemStyle: {
        opacity: 0.7,
        normal: {
          show: true,
        }
      },
      large: true
    }]
  };
};
// 多车定位配置
// 基础信息
export const basicInfo = [{
    text: '车辆状态',
    value: '18546584951',
    field: 'alarm'
  },
  {
    text: '定位时间',
    value: '今日里程',
    field: 'gpstime'
  },
  {
    text: '速度',
    value: '30',
    field: 'Velocity'
  },
  {
    text: '车辆型号',
    value: '30',
    field: 'shiyongxingzhi'
  },
  {
    text: '车身颜色',
    value: '30',
    field: 'vehicleColor'
  },
  {
    text: '燃料类别',
    value: '30',
    field: 'ranliaoleibie'
  },
  {
    text: '当前位置',
    value: '30',
    field: 'locationName'
  }
];
// 报警信息
export const baojingInfo = [{
    text: '开始时间',
    value: '2019-11-11 11:23:45',
    field: 'jiashiyuan'
  },
  {
    text: '结束',
    value: '2019-11-11 11:23:45',
    field: 'jiashiyuan'
  },
  {
    text: '持续时间',
    value: '10s',
    field: 'dianhua'
  },
  {
    text: '报警等级',
    value: '普通',
    field: 'vehiclestatus'
  },
  {
    text: '最高速度(km/h)',
    value: '30',
    field: 'licheng'
  },
  {
    text: '报警速度',
    value: '30',
    field: 'licheng'
  },
  {
    text: '限定速度',
    value: '30',
    field: 'licheng'
  }
];
export const velocityChart = (data) => {
  return {
    backgroundColor: '#fff',
    tooltip: {
      formatter: '{a} <br/>{c} {b}'
    },
    grid: {
      top: '10px',
      left: '0px',
      right: '0px'
    },
    series: [{
      name: '速度',
      type: 'gauge',
      min: 0,
      max: 220,
      splitNumber: 11,
      radius: '100%',
      center: ['50%', '50%'],

      axisLine: {
        // 坐标轴线
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: [
            [0.09, 'lime'],
            [0.82, '#1e90ff'],
            [1, '#ff4500']
          ],
          width: 3,
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      axisLabel: {
        // 坐标轴小标记
        textStyle: {
          // 属性lineStyle控制线条样式
          color: '#333',
          fontSize: 12,
          shadowColor: '#fff' //默认透明
        }
      },
      axisTick: {
        // 坐标轴小标记
        length: 8, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle控制线条样式
          color: 'auto',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      splitLine: {
        // 分隔线
        length: 10, // 属性length控制线长
        lineStyle: {
          // 属性lineStyle（详见lineStyle）控制线条样式
          width: 1,
          color: '#fff',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      pointer: {
        // 分隔线
        shadowColor: '#fff', //默认透明
        shadowBlur: 5,
        width: 2,
        length: '85%'
      },
      title: {
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 12,
          fontStyle: 'italic',
          color: '#333',
          shadowColor: '#fff', //默认透明
          shadowBlur: 10
        }
      },
      detail: {
        offsetCenter: [0, '50%'], // x, y，单位px
        textStyle: {
          color: 'red',
          fontSize: 16
        }
      },
      data: [data]
    }]
  };
};