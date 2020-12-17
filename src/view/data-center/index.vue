<template>
  <div class="home wh100">
    <div class="title-box">
      <span class="title-name">数据分析</span>
    </div>
    <div class="content-right">
      <div class="module">
        <div class="block">
          <img src="~A/data-center/home-2.png" alt />
          <span class="title">数据查询</span>
        </div>
        <div class="block">
          <img src="~A/data-center/home-3.png" alt />
          <span class="title">数据分析</span>
        </div>
        <div class="block">
          <img src="~A/data-center/home-4.png" alt />
          <span class="title">考核指标</span>
        </div>
      </div>
      <div class="analyze">
        <div class="block">
          <div class="caption">
            <span class="bg-blue">本</span>月车辆运营情况
          </div>
          <div class="line-chart-box">
            <e-chart class="month chart" :options="monthChart" autoresize></e-chart>
          </div>
        </div>
        <div class="block">
          <div class="caption">
            <span class="bg-blue">报</span>警比例
          </div>
          <div class="chart-box-both">
            <div class="left-box">
              <p class="row_b">
                <span>车辆报警</span>
                <span class="number text-bule">{{alarmRateData.month.alarmCount}}</span>
              </p>
              <p class="row_b">
                <span>
                  主动防御
                  <br />报警
                </span>
                <span class="number text-bule">{{alarmRateData.month.zhudongCunt}}</span>
              </p>
            </div>
            <div class="right-box">
              <e-chart class="chart" :options="alarmRate" autoresize></e-chart>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="caption">
            <span class="bg-blue">报</span>警处理
          </div>
          <div class="chart-box-both">
            <div class="left-box alarm-proces">
              <div class="alarm-cl">
                报警总数
                <span class="text-bule">{{alarmProcessingData.baojingcishu}}</span>
              </div>
              <div class="l-block">
                <div>
                  <b class="wcl-b"></b>
                  <span>未处理</span>
                  <span class="number text-bule">{{alarmProcessingData.weichulicishu}}</span>
                </div>
                <div>
                  <b class="ycl-b"></b>
                  <span>已处理</span>
                  <span class="number text-bule">{{alarmProcessingData.yichulicishu}}</span>
                </div>
              </div>
            </div>
            <div class="right-box">
              <e-chart class="chart" :options="alarmProcessing" autoresize></e-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="trend">
        <div class="block">
          <div class="caption">
            <span class="bg-blue">本</span>月车辆报警趋势
          </div>
          <div class="chart-box">
            <e-chart class="month chart" :options="alarmingTrend" autoresize></e-chart>
          </div>
        </div>
        <div class="block">
          <div class="caption">
            <span class="bg-blue">本</span>月报警累计
          </div>
          <div class="chart-box">
            <div class="chart-title">
              <span class="car-alarm" @click="montalarmclassifyData(1)">车辆报警</span>
              <span class="defense-alarm" @click="montalarmclassifyData(0)">主动防御报警</span>
            </div>
            <e-chart class="chart" :options="alarmCumulative" autoresize></e-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  alarmMonthQingKuang,
  alarmZhudongCount,
  alarmChuliCount,
  alarmMonthQushi,
  montalarmclassify
} from '@/api/data-center';
import {
  monthChart,
  alarmRate,
  alarmProcessing,
  alarmingTrend,
  alarmCumulative
} from '@/const/data-center-home';
export default {
  nane: 'home',
  data() {
    return {
      monthData: {
        offlineCount: [],
        onlineCount: [],
        stopCount: []
      },
      alarmRateData: {
        lastmonth: {},
        month: {}
      }, //报警比例
      alarmProcessingData: {}, //报警处理
      alarmingTrendData: {
        onlineCount: [],
        vehiclealarmCount: []
      }, //报警趋势
      alarmCumulativeData: {} //报警累计
    };
  },
  computed: {
    // 月运营情况
    monthChart() {
      // this.monthData, this.monthData.length
      return monthChart(this.monthData, this.monthData.offlineCount.length);
    },
    // 报警比例
    alarmRate() {
      return alarmRate(this.alarmRateData);
    },
    // 报警处理
    alarmProcessing() {
      return alarmProcessing(this.alarmProcessingData);
    },
    // 月车辆报警趋势
    alarmingTrend() {
      return alarmingTrend(
        this.alarmingTrendData,
        this.alarmingTrendData.onlineCount.length
      );
    },
    // 月报警累计
    alarmCumulative() {
      return alarmCumulative(this.alarmCumulativeData);
    }
  },
  mounted() {
    this.alarmMonthQingKuangData();
    this.alarmZhudongCountData();
    this.alarmChuliCountData();
    this.alarmMonthQushiData();
    this.montalarmclassifyData('');
  },
  methods: {
    // 本月运营情况
    alarmMonthQingKuangData() {
      alarmMonthQingKuang(this.$store.getters.deptName).then(res => {
        this.monthData.onlineCount = res.data.data.map(
          item => item.onlineCount
        );
        this.monthData.stopCount = res.data.data.map(item => item.stopCount);
        this.monthData.offlineCount = res.data.data.map(
          item => item.offlineCount
        );
      });
    },
    // 报警比例
    alarmZhudongCountData() {
      alarmZhudongCount(this.$store.getters.deptName).then(res => {
        this.alarmRateData.lastmonth = res.data.data.lastmonth[0];

        Object.assign(
          this.alarmRateData.lastmonth,
          { beginTime: res.data.data.lastmonth[0].beginTime.slice(5) },
          { endTime: res.data.data.lastmonth[0].endTime.slice(8) }
        );
        this.alarmRateData.month = res.data.data.month[0];
        Object.assign(
          this.alarmRateData.month,
          { beginTime: res.data.data.month[0].beginTime.slice(5) },
          { endTime: res.data.data.month[0].endTime.slice(8) }
        );
        // this.alarmRateData = res.data.data[0];
      });
    },
    // 报警处理
    alarmChuliCountData() {
      alarmChuliCount(this.$store.getters.deptName).then(res => {
        this.alarmProcessingData = res.data.data[0];
      });
    },
    // 本月报警趋势
    alarmMonthQushiData() {
      alarmMonthQushi(this.$store.getters.deptName).then(res => {
        this.alarmingTrendData = res.data.data;
        this.alarmingTrendData.onlineCount = res.data.data.map(
          item => item.onlineCount
        );
        this.alarmingTrendData.vehiclealarmCount = res.data.data.map(
          item => item.vehiclealarmCount
        );
      });
    },
    // 本月报警累计
    montalarmclassifyData(type) {
      montalarmclassify(this.$store.getters.deptName, type).then(res => {
        if (type == '') {
          this.alarmCumulativeData = Object.assign(
            {},
            res.data.data[1],
            res.data.data[0]
          );
        } else {
          this.alarmCumulativeData = res.data.data[0];
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import 'S/mixin.scss';
.home {
  display: flex;
  background: #fff;
  min-width: 1200px;
  .text-bule {
    font-family: 'Flip Flop';
    color: #2881f7;
  }
  .chart {
    width: 100%;
    height: 100%;
  }

  .title-box {
    width: 50px;
    height: 100%;
    font-size: 20px;
    @include box-center($justify: center, $align: center);
    background: url('~A/data-center/home-1.png') no-repeat center center;
    .title-name {
      width: 30px;
      text-align: center;
      font-weight: 600;
    }
  }
  .content-right {
    width: calc(100% - 50px);
    height: 100%;
    padding: 20px 20px 20px 0px;
    .module {
      height: 20%;
      @include box-center($justify: space-between, $align: center);
      .block {
        height: 100%;
        width: calc(33.3% - 10px);
        background: #d5eaff;
        border: 1px solid #e2e7ed;
        @include box-center($justify: space-evenly, $align: center);
        flex-direction: column;
        cursor: pointer;
        &:hover {
          background: #afd6fd;
        }
        img {
          height: 64%;
        }
        .title {
          font-size: 2.6vh;
          font-weight: 600;
          color: #464749;
        }
      }
    }
    .analyze {
      height: 40%;
      padding-top: 2vh;
      @include box-center($justify: space-between, $align: center);
      .block {
        height: 100%;
        width: calc(33.3% - 10px);
        padding: 2vh 2%;
        background: #f4f8ff;
        border: 1px solid #e2e7ed;
        .left-box {
          @include box-center($justify: center, $align: center);
          flex-direction: column;
        }
        .row_b {
          margin: 10px;
          @include box-center($justify: false, $align: center);
          font-size: 15px;
          span {
            text-align: center;
          }
          .number {
            margin-left: 20px;
            font-size: 18px;
          }
        }
      }
      .line-chart-box {
        height: calc(100% - 40px);
        // background: #8ab5fa;
      }
      .chart-box-both {
        height: calc(100% - 40px);
        display: flex;
        .left-box {
          width: 150px;
          background: #d5eaff;
          position: relative;
          &::after {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: 0;
            left: 0;
            border-top: 12px solid #f4f8ff;
            border-right: 12px solid transparent;
          }
          &::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: 0;
            right: 0;
            border-bottom: 12px solid #f4f8ff;
            border-left: 12px solid transparent;
          }
        }
        .right-box {
          flex-grow: 1;
          // background: #8ab5fa;
        }

        .alarm-proces {
          width: 220px;
          background: none;
          .alarm-cl {
            height: 50%;
            width: 100%;
            @include box-center($justify: false, $align: center);
            span {
              flex-grow: 1;
              text-align: center;
              font-size: 28px;
            }
          }
          .l-block {
            width: 100%;
            height: 50%;
            background: #d5eaff;
            @include box-center($justify: center, $align: center);
            flex-direction: column;
            position: relative;
            &::after {
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              top: 0;
              left: 0;
              border-top: 12px solid #f4f8ff;
              border-right: 12px solid transparent;
            }
            &::before {
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              bottom: 0;
              right: 0;
              border-bottom: 12px solid #f4f8ff;
              border-left: 12px solid transparent;
            }
            & > div {
              margin: 5px 0;
              @include box-center($justify: space-between, $align: center);
            }
            .number {
              display: inline-block;
              width: 80px;
              font-size: 16px;
              text-align: center;
              margin-left: 10px;
            }
            .wcl-b {
              display: inline-block;
              height: 20px;
              width: 40px;
              background: #faac01;
              margin-right: 10px;
            }
            .ycl-b {
              @extend .wcl-b;
              background: #1ad830;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .caption {
      height: 40px;
      font-size: 18px;
      font-weight: 600;
      color: #464749;
      .bg-blue {
        padding: 3px;
        color: #fff;
        background: #8ab5fa;
      }
    }
    .trend {
      height: 40%;
      padding-top: 2vh;
      @include box-center($justify: space-between, $align: center);
      .block {
        height: 100%;
        width: calc(50% - 10px);
        background: #f4f8ff;
        padding: 2vh 2%;
        border: 1px solid #e2e7ed;
      }
      .chart-box {
        width: 100%;
        height: calc(100% - 40px);
        position: relative;
        // background: #d5eaff;
      }
      .chart-title {
        position: absolute;
        height: 30px;
        line-height: 30px;
        width: 100%;
        display: flex;
        padding: 0px 4% 0px 3%;
        justify-content: space-around;
        z-index: 9;
        cursor: pointer;
        span {
          background: #3181f2;
          color: #fff;
          text-align: center;
          position: relative;
          &::after {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            top: 0;
            left: 0;
            border-top: 12px solid #f4f8ff;
            border-right: 12px solid transparent;
          }
          &::before {
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: 0;
            right: 0;
            border-bottom: 12px solid #f4f8ff;
            border-left: 12px solid transparent;
          }
        }
        .car-alarm {
          width: 30%;
        }
        .defense-alarm {
          width: 60%;
        }
      }
    }
  }
}
</style>