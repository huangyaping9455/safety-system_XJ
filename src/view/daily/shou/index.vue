<style lang="scss" scoped>
.guide {
  // background-color: #f2f9ff;
  .guide-main {
    padding: 30px;
    height: calc(100% - 60px);
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #666666;
  }
  .guide-m-top {
    height: 42%;
    display: flex;
    justify-content: space-between;
    .topItem {
      // background-color: #fff;
      flex: 0 0 23%;
      padding: 20px;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: rgba(64, 158, 255, 0.2) 0 2px 12px 0;
    }
    .chart {
      height: 200px;
    }
    .text {
      display: flex;
      align-items: center;
      width: 100%;
      div {
        flex: 1;
        text-align: center;
      }
      .centerLime {
        width: 2px;
        height: 45px;
        background-color: #dfdede;
      }
      p:first-of-type {
        color: #34a1ff;
        font-size: 30px;
        font-weight: bold;
      }
    }
    .topItem-line {
      padding: 0 10px 0 30px;
      .line-title {
        color: #999999;
        font-weight: bold;
      }
      .line-num {
        color: #34a1ff;
        font-weight: bold;
        &.big {
          font-size: 18px;
        }
      }
      &.last {
        margin-bottom: 40px;
      }
    }
  }
  .guide-m-bottom {
    margin-top: 30px;
    height: 55%;
    display: flex;
    justify-content: space-between;
    .m-bottom-l {
      // background-color: #fff;
      flex: 0 0 74.4%;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: rgba(64, 158, 255, 0.2) 0 2px 12px 0;
    }
    .bottom-l-body {
      display: flex;
      height: calc(100% - 30px);
      justify-content: space-between;
      align-items: center;
      .bottom-l-l {
        margin-top: 33px;
        flex: 0 0 47%;
        display: flex;
        justify-content: space-between;
        .chart {
          height: 350px;
          flex: 0 0 50%;
        }
      }
      .statistics {
        flex: 0 0 50%;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            flex: 1;
            text-align: center;
          }
          span:last-of-type {
            flex: 0 0 20%;
          }
        }
        .statistics-title {
          background-image: linear-gradient(90deg, #34a1ff 0%, #44c9d7 100%);
          color: #ffffff;
          padding: 8px 15px;
          span:first-of-type {
            flex: 0 0 60%;
            text-align: left;
          }
        }
        .statistics-text {
          padding: 8px 15px 8px 5px;
          span:nth-of-type(1) {
            height: 12px;
            margin-right: 10px;
          }
          span:nth-of-type(2) {
            flex: 0 0 50%;
            text-align: left;
          }
          span:nth-of-type(3) {
            flex: 0 0 20%;
          }
        }
        .green {
          background-image: linear-gradient(128deg, #28f39c 0%, #0db7e0 100%);
        }
        .red {
          background-image: linear-gradient(128deg, #f65727 0%, #f9cc3f 100%);
        }
        .blue {
          background-image: linear-gradient(128deg, #893ff8 0%, #218af0 100%);
        }
        .pink {
          background-image: linear-gradient(128deg, #f83fe4 0%, #f02139 100%);
        }
        .orange {
          background-image: linear-gradient(128deg, #ffc948 0%, #ffa569 100%);
        }
        .freshGreen {
          background-image: linear-gradient(128deg, #3eef60 0%, #89f791 100%);
        }
      }
      .bottom-l-r {
        flex: 0 0 51%;
        .chart {
          height: 350px;
        }
      }
      .changeoption {
        margin-left: 40px;
      }
    }
    .m-bottom-r {
      // background-color: #fff;
      flex: 0 0 23%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: rgba(64, 158, 255, 0.2) 0 2px 12px 0;
      .btns {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        .btn-item {
          min-width: 100px;
        }
      }
      .chart {
        height: 230px;
        margin: 10px 0;
      }
      .test {
        display: flex;
        // flex-wrap: wrap;
        font-size: 14px;
        justify-content: space-between;
        flex-direction: column;
        overflow: auto;
        p {
          // flex: 0 0 50%;
          padding: 0 0.5rem;
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }
        span:last-of-type {
          color: #34a1ff;
          flex: 0 0 30%;
        }
      }
    }
  }
}
@media screen and (min-width: 1276px) and (max-width: 1528px) {
  .guide {
    .guide-main {
      padding: 10px;
    }
    .title {
      font-size: 14px;
    }
    .guide-m-top {
      .topItem {
        flex: 0 0 24%;
        padding: 10px;
      }
      .chart {
        height: calc(100% - 70px);
      }
      .text {
        font-size: 12px;
        .centerLime {
          height: 35px;
        }
        p:first-of-type {
          font-size: 18px;
        }
      }
      .topItem-line {
        .line-num {
          &.big {
            font-size: 16px;
          }
        }
        &.last {
          margin-bottom: 30px;
        }
      }
    }
    .guide-m-bottom {
      margin-top: 15px;
      .m-bottom-l {
        flex: 0 0 74.6%;
        padding: 10px;
      }
      .bottom-l-body {
        .bottom-l-l {
          margin-top: 20px;
          .chart {
            height: 255px;
          }
        }
        .statistics {
          p {
            span:first-of-type {
              flex: 0 0 12px;
            }
          }
          .statistics-title {
            padding: 4px 15px;
          }
          .statistics-text {
            padding: 4px 15px 4px 5px;
            span:nth-of-type(1) {
              margin-right: 5px;
            }
            span:nth-of-type(2) {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .bottom-l-r {
          .chart {
            height: 250px;
          }
        }
      }
      .m-bottom-r {
        flex: 0 0 24%;
        height: 100%;
        padding: 10px;
        .btns {
          margin-top: 5px;
          .btn-item {
            height: 24px;
            font-size: 12px;
            min-width: 50px;
          }
        }
        .chart {
          height: calc(100% - 145px);
          margin: 5px 0;
        }
        .test {
          font-size: 12px;
          p {
            margin: 5px 0;
          }
          span:last-of-type {
            flex: 0 0 25%;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="guide wh100">
    <!-- <app-head></app-head> -->
    <div class="guide-main">
      <div class="guide-m-top">
        <div class="topItem">
          <p class="title">今日车辆情况</p>
          <e-chart class="chart" :options="echarts" autoresize></e-chart>
          <div class="text">
            <div>
              <p>{{ vehicleCount.RegisterCount || 0 }}</p>
              <p>车辆总数</p>
            </div>
            <span class="centerLime"></span>
            <div>
              <p>{{ vehicleCount.zaixian || 0 }}</p>
              <p>在线车辆</p>
            </div>
          </div>
        </div>
        <div class="topItem">
          <p class="title">本月车辆情况</p>
          <div class="topItem-line">
            <p class="line-title">运行车辆</p>
            <i-progress
              :percent="vehicleCondition.sxvehnumb"
              :stroke-color="['#34a1ff', '#44c9d7']"
              :stroke-width="16"
            >
              <span class="line-num">{{ vehicleCondition.sxvehnum }}</span>
            </i-progress>
          </div>
          <div class="topItem-line">
            <p class="line-title">停置车辆</p>
            <i-progress
              :percent="vehicleCondition.tyvehnumb"
              :stroke-color="['#34a1ff', '#44c9d7']"
              :stroke-width="16"
            >
              <span class="line-num">{{ vehicleCondition.tyvehnum }}</span>
            </i-progress>
          </div>
          <div class="topItem-line last">
            <p class="line-title">离线车辆</p>
            <i-progress
              :percent="vehicleCondition.lxvehnumb"
              stroke-color="#cfcfcf"
              :stroke-width="16"
            >
              <span class="line-num">{{ vehicleCondition.lxvehnum }}</span>
            </i-progress>
          </div>
        </div>
        <div class="topItem">
          <p class="title">驾驶员安全教育（待开放）</p>
          <e-chart class="chart" :options="echarts1" autoresize></e-chart>
          <div class="topItem-line">
            <p class="line-title">未完成驾驶员安全教育</p>
            <i-progress
              :percent="0"
              :stroke-color="['#34a1ff', '#44c9d7']"
              :stroke-width="16"
            >
              <span class="line-num big">0</span>
            </i-progress>
          </div>
        </div>
        <div class="topItem">
          <p class="title">证件到期（待开放）</p>
          <e-chart class="chart" :options="echarts2" autoresize></e-chart>
          <div class="topItem-line">
            <p class="line-title">电子信息证件到期</p>
            <i-progress
              :percent="0"
              :stroke-color="['#34a1ff', '#44c9d7']"
              :stroke-width="16"
            >
              <span class="line-num big">0</span>
            </i-progress>
          </div>
        </div>
      </div>
      <div class="guide-m-bottom">
        <div class="m-bottom-l">
          <p class="title">2021报警统计</p>
          <div class="bottom-l-body">
            <div class="bottom-l-l">
              <e-chart
                class="chart"
                v-loading="load"
                :options="echarts5"
                autoresize
              ></e-chart>
              <div class="statistics">
                <p class="statistics-title">
                  <span>报警总数</span>
                  <span>{{ yearStatistics.baojingcishu }}</span>
                </p>
                <p class="statistics-text">
                  <span class="green"></span>
                  <span>北斗设备</span>
                  <span>{{ yearStatistics.bdbaojingcishu }}</span>
                  <span>{{ yearStatistics.bdzhanbi }}</span>
                </p>
                <p class="statistics-text">
                  <span class="red"></span>
                  <span>主动安全设备</span>
                  <span>{{ yearStatistics.sbbaojingcishu }}</span>
                  <span>{{ yearStatistics.sbzhanbi }}</span>
                </p>
                <p class="statistics-title">
                  <span>总处理报警</span>
                  <span>{{ yearStatistics.baojingclcishu }}</span>
                  <span>{{ yearStatistics.zongchulilv }}</span>
                </p>
                <p class="statistics-text">
                  <span class="blue"></span>
                  <span>北斗设备处理率</span>
                  <span>{{ yearStatistics.bdchulilv }}</span>
                  <span>--</span>
                </p>
                <p class="statistics-text">
                  <span class="pink"></span>
                  <span>主动安全处理率</span>
                  <span>{{ yearStatistics.sbchulilv }}</span>
                  <span>--</span>
                </p>
                <p class="statistics-title">
                  <span>未处理报警数</span>
                  <span>{{
                    yearStatistics.sbweichulishu +
                      yearStatistics.bdweichulishu || 0
                  }}</span>
                </p>
                <p class="statistics-text">
                  <span class="freshGreen"></span>
                  <span>北斗设备未处理数</span>
                  <span>{{ yearStatistics.bdweichulishu }}</span>
                  <span>--</span>
                </p>
                <p class="statistics-text">
                  <span class="orange"></span>
                  <span>主动安全未处理数</span>
                  <span>{{ yearStatistics.sbweichulishu }}</span>
                  <span>--</span>
                </p>
              </div>
            </div>
            <div class="bottom-l-r">
              <div class="changeoption">
                <i-date
                  type="year"
                  @on-change="changeyear"
                  :value="year"
                  placeholder="选择年份"
                  style="width: 144px;"
                ></i-date>
              </div>
              <e-chart class="chart" :options="echarts4" autoresize></e-chart>
            </div>
          </div>
        </div>
        <div class="m-bottom-r">
          <p class="title">近7天报警统计</p>
          <div class="btns">
            <i-button
              class="btn-item"
              @click="showSevenAlarmStatistics('chulizongshu')"
              type="primary"
              shape="circle"
              :ghost="activeName == 'chulizongshu' ? false : true"
              >全部</i-button
            >
            <i-button
              class="btn-item"
              @click="showSevenAlarmStatistics('bdbaojingcishu')"
              type="primary"
              shape="circle"
              :ghost="activeName == 'bdbaojingcishu' ? false : true"
              >北斗设备</i-button
            >
            <i-button
              class="btn-item"
              @click="showSevenAlarmStatistics('sbbaojingcishu')"
              type="primary"
              shape="circle"
              :ghost="activeName == 'sbbaojingcishu' ? false : true"
              >主动安全设备</i-button
            >
          </div>
          <e-chart class="chart" :options="echarts3" autoresize></e-chart>
          <div class="test">
            <p>
              <span>近7天报警总数</span>
              <span>{{ sevenData.sevenzongbaojingshu }}</span>
            </p>
            <p>
              <span>北斗设备未处理</span>
              <span>{{ sevenData.sevengpsweichulishu }}</span>
            </p>
            <p>
              <span>主动安全设备未处理</span>
              <span>{{ sevenData.sevenshebeiweichulishu }}</span>
            </p>
            <p>
              <span>未处理报警数</span>
              <span>{{ sevenData.sevenzongweichulishu }}</span>
            </p>
            <p>
              <span>处理率</span>
              <span>{{ sevenData.sevenchulilv }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  monthVehcile,
  sevenAlarmStatistics,
  yearAlarm,
  yearAlarmTendency,
  QYVehicleCount,
} from "@/api/guide";
import {
  guidePieChart,
  lineoption,
  lineoption1,
  guidePieChart1,
} from "@/const/guide";
export default {
  name: "shou",
  components: {
    // appHead,
  },
  data() {
    return {
      index: 0,
      echarts: {},
      echarts1: {},
      echarts2: {},
      echarts3: {},
      echarts4: {},
      echarts5: {},
      load: false,
      vehicleCondition: {}, //车辆情况data
      yearStatistics: {}, //报警统计（年）
      sevenData: {}, //近7天报警统计
      activeName: "chulizongshu",
      year: new Date(),
      vehicleCount: {}, //车辆状态统计
    };
  },
  computed: {
    pages() {
      let isPanel = this.$store.getters.permission.enterprise_panel;
      const pages = [
        {
          path: "bannner",
          img: this.$store.getters.userInfo.homePhoto,
          name: "企业理念",
        },
        {
          path: "bannner",
          img: this.$store.getters.userInfo.profilePhoto,
          name: "企业简介",
        },
        {
          path: "bannner",
          img: require("A/guide/platform-bg.png"),
          name: "运维平台",
        },
        {
          path: "entrance",
          img: isPanel
            ? require("A/guide/entrance-bg-sub.png")
            : require("A/guide/entrance-bg-sub.png"),
          name: "快速开始",
        },
        // {
        //   path: 'entrance',
        //   img: isPanel
        //     ? require('A/guide/entrance-bg.png')
        //     : require('A/guide/entrance-bg-sub.png'),
        //   name: '快速开始'
        // }
      ];
      return pages.filter((item) => item.img);
    },
    banners() {
      return this.pages.filter((item) => item.path == "bannner");
    },
    active() {
      return this.pages[this.index];
    },
    background() {
      return {
        background: `url('${this.active.img}') no-repeat top center`,
        transition: "all .8s",
      };
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.index = from.path == "/login" ? 0 : vm.pages.length - 1;
    });
  },
  created() {
    let clientWidth = document.body.clientWidth;
    this.ismini = clientWidth > 1528 ? false : true;
    this.init();
  },
  mounted() {
    let _this = this;
    setInterval(function() {
      _this.getSevenAlarmState();
    }, 20000);
  },
  methods: {
    init() {
      // 本月车辆情况
      this.getMonthVehcile();
      // 近七天报警统计
      this.getSevenAlarmStatistics();
      // 报警统计（年）
      this.getYearAlarm();
      // 处理趋势图
      this.getYearAlarmTendency();
      // 实时车辆状态统计
      this.getQYVehicleCount();
      this.echarts1 = guidePieChart(0, "完成率", this.ismini);
      this.echarts2 = guidePieChart(0, "完成率", this.ismini);
      this.echarts4 = lineoption1();
    },
    // 实时车辆状态统计
    getQYVehicleCount() {
      QYVehicleCount(this.$store.getters.deptId).then(({ data }) => {
        this.vehicleCount = data.data.length > 0 ? data.data[0] : [];
        let zaixian = data.data.length > 0 ? data.data[0].zaixian : 0;
        let RegisterCount =
          data.data.length > 0 ? data.data[0].RegisterCount : 0;
        this.echarts = guidePieChart(
          RegisterCount ? Math.floor((zaixian / RegisterCount) * 100) : 0,
          "在线率",
          this.ismini
        );
      });
    },
    // 本月车辆情况
    getMonthVehcile() {
      monthVehcile(this.$store.getters.deptId).then(({ data }) => {
        this.vehicleCondition = {
          sxvehnum: data.data.sxvehnum || 0,
          sxvehnumb:
            Math.round((data.data.sxvehnum / data.data.zcvehnum) * 100) || 0,
          tyvehnum: data.data.tyvehnum || 0,
          tyvehnumb:
            Math.round((data.data.tyvehnumb / data.data.zcvehnum) * 100) || 0,
          lxvehnum: data.data.lxvehnum || 0,
          lxvehnumb:
            Math.round((data.data.lxvehnum / data.data.zcvehnum) * 100) || 0,
        };
      });
    },
    // 近七天报警统计
    getSevenAlarmStatistics() {
      sevenAlarmStatistics(this.$store.getters.deptId).then(({ data }) => {
        this.sevenData = {
          sevenzongbaojingshu: data.data.sevenzongbaojingshu,
          sevenshebeiweichulishu: data.data.sevenshebeiweichulishu,
          sevenzongweichulishu: data.data.sevenzongweichulishu,
          sevenchulilv:
            this.$store.getters.deptId != 1 ? data.data.sevenchulilv : "0.00%",
          sevengpsweichulishu: data.data.sevengpsweichulishu,
          sevenList: data.data.sevenList,
        };
        this.showSevenAlarmStatistics("chulizongshu");
      });
    },
    // 渲染近七天报警统计
    showSevenAlarmStatistics(yName) {
      this.activeName = yName;
      this.echarts3 = lineoption(this.sevenData.sevenList, yName, this.ismini);
    },
    // 近7天报警统计 设置滚动效果
    getSevenAlarmState() {
      let _this = this;
      setTimeout(function() {
        _this.showSevenAlarmStatistics("chulizongshu");
      }, 5000);
      setTimeout(function() {
        _this.showSevenAlarmStatistics("bdbaojingcishu");
      }, 10000);
      setTimeout(function() {
        _this.showSevenAlarmStatistics("sbbaojingcishu");
      }, 15000);
    },
    // 选择年份
    changeyear(date) {
      this.getYearAlarm(date);
      this.getYearAlarmTendency(date);
    },
    // 报警统计（年）
    getYearAlarm(date) {
      this.load = true;
      date = date ? date : this.year.getFullYear();
      yearAlarm({ deptId: this.$store.getters.deptId, year: date }).then(
        ({ data }) => {
          let {
            bdbaojingcishu,
            sbbaojingcishu,
            bdbaojingclcishu,
            bdweichulishu,
            sbbaojingclcishu,
            sbweichulishu,
          } = data.data;
          this.yearStatistics = data.data;
          this.echarts5 = guidePieChart1(
            bdbaojingcishu,
            sbbaojingcishu,
            bdbaojingclcishu,
            bdweichulishu,
            sbbaojingclcishu,
            sbweichulishu
          );
          this.load = false;
        }
      );
    },
    // 处理趋势图
    getYearAlarmTendency(date) {
      date = date ? date : this.year.getFullYear();
      yearAlarmTendency({
        deptId: this.$store.getters.deptId,
        year: date,
      }).then(({ data }) => {
        this.echarts4 = lineoption1(data.data, this.ismini);
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";

.guide {
  height: 100%;
  width: 100%;

  .img-shadow {
    z-index: 9;
    @include imgshaowd;
    .page-img {
      position: relative;
      margin: 0;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .content {
    background: inherit;
    overflow: hidden;
    @include covered();
    @include box-center;
    @include groundglass(10px);
  }

  .prev {
    left: 0px;
    @include rhombusArrow(rgba(#fff, 0.9), right, 45px, 30px);
    &:hover {
      box-shadow: 3px 2px 10px rgba(black, 0.6);
      @include rhombusArrow(rgba(#fff, 1), right, 45px, 30px);
    }
  }

  .next {
    right: 0px;
    @include rhombusArrow(rgba(#fff, 0.9), left, 45px, 30px);
    &:hover {
      box-shadow: 3px 2px 10px rgba(black, 0.6);
      @include rhombusArrow(rgba(#fff, 1), left, 45px, 30px);
    }
  }

  .arrows {
    position: absolute;
    bottom: 20px;
    cursor: pointer;
    z-index: 9999;
    @include box-center;

    span {
      font-size: 20px;
      font-weight: 700;
    }
    img {
      height: 25px;
      margin: 0px 10px;
    }
  }
}
.topItem-line {
  .ivu-progress-inner {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
