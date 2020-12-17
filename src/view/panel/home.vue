<template>
  <div class="index">
    <div class="corporate-boards-top">
      <img class="home-btn" src="~A/panel/home.png" alt @click="homeClick()" />
    </div>
    <div class="content">
      <div class="info-left">
        <div class="map">
          <!-- 弹窗 -->
          <div class="popu">
            <div class="popu-top">
              <p>
                <b>西部之光运输有限责任公司库尔勒分公司</b>
                <span>乌鲁木齐市米东区</span>
              </p>
              <div class="popu-img">
                <img src="~A/panel/1.png" alt />
              </div>
            </div>
            <div class="popu-bottom">
              <div class="detail">
                <p class="faren">
                  公司法人
                  <span class="text-azury">{{
                    $store.getters.userInfo.userName
                  }}</span>
                </p>
                <p>
                  车辆
                  <span class="text-azury">900辆</span>
                </p>
                <p>
                  驾驶员
                  <span class="text-azury">300人</span>
                </p>
                <p>
                  管理人员
                  <span class="text-azury">200人</span>
                </p>
                <p>
                  押运人员
                  <span class="text-azury">600人</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="shuju-box">
            <span>
              企业数：
              <b class="text-orange">800</b>
            </span>
            <span>
              车辆数：
              <b class="text-green">800</b>
            </span>
            <span>
              驾驶员数：
              <b class="text-azury">800</b>
            </span>
            <span>
              隐患排查次数：
              <b class="text-red">800</b>
            </span>
            <span>
              应急演练次数：
              <b class="text-blue">800</b>
            </span>
            <span>
              安全检查次数：
              <b class="text-yellow">800</b>
            </span>
            <span>
              事故次数：
              <b class="text-red">800</b>
            </span>
            <span>
              教育培训次数：
              <b class="text-azury">800</b>
            </span>
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="info-right-top">
          <div class="block" @click="toView()">
            <div class="dissolve">
              报警趋势
              <span>(次/月)</span>
            </div>
            <div class="block-centent">
              <div class="alarm-trend chart"></div>
            </div>
          </div>
          <div class="block">
            <div class="dissolve">
              教育培训
              <span>(人)</span>
            </div>
            <div class="block-centent">
              <div class="educational chart"></div>
            </div>
          </div>
          <div class="block">
            <div class="dissolve">
              安全检查
              <span>(次/月)</span>
            </div>
            <div class="block-centent">
              <div class="safetycheck chart"></div>
            </div>
          </div>
          <div class="block">
            <div class="dissolve">
              隐患排查
              <span>(次/月)</span>
            </div>
            <div class="block-centent">
              <div class="danger chart"></div>
            </div>
          </div>
          <div class="block">
            <div class="dissolve">
              事故统计
              <span>(次)</span>
            </div>
            <div class="block-centent">
              <div class="accident chart"></div>
            </div>
          </div>
          <div class="block">
            <div class="dissolve">
              应急演练
              <span>(项/月)</span>
            </div>
            <div class="block-centent">
              <div class="emergency chart"></div>
            </div>
          </div>
        </div>
        <div class="info-right-bottom">
          <div class="dissolve">企业安全标准化评分排名</div>
          <div class="block-centent">
            <scroll>
              <div v-for="(item, index) of 10" :key="index" class="alarm-data">
                <span :class="['text-azury', { 'text-green': index < 3 }]">
                  <b>{{ index + 1 }}</b>
                </span>
                <span>新A123456</span>
                <span class="text-azury">{{ 100 - index * index }}分</span>
                <div class="axes-box">
                  <div
                    class="axes"
                    :style="'width:' + (100 - index * index) + '%'"
                  ></div>
                </div>
                <img src="~A/panel/up-green.png" />
              </div>
            </scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  alarmChart,
  educationalChart,
  safetyChart,
  dangerChart,
  accidentChart,
  emergencyChart,
} from "@/const/panel-index";
import chart from "@/mixin/chart";
export default {
  name: "index",
  mixins: [chart],
  data() {
    return {};
  },

  computed: {},
  mounted() {
    this.chartInit([
      alarmChart,
      educationalChart,
      safetyChart,
      dangerChart,
      accidentChart,
      emergencyChart,
    ]);
  },
  methods: {
    homeClick() {
      this.$router.push({
        // path: '/guide'
        path: "/daily/report",
      });
    },
    toView() {
      this.$router.push({
        path: "/inside-index",
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.index {
  $color-blue: #0a95fe;
  $color-azury: #07ffff;
  $head-h: 74px;
  $dissolve-h: 32px;
  $popu-top-h: 100px;
  width: 100%;
  height: 100%;
  background: url("~A/panel/panel-bg.png") no-repeat top center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  min-width: 1200px;
  min-height: 900px;
  .text-orange {
    color: #fd6016;
  }
  .text-green {
    color: #0afe6c !important;
  }
  .text-azury {
    color: $color-azury;
  }
  .text-red {
    color: #fd282a;
  }
  .text-yellow {
    color: #fec62a;
  }
  .text-blue {
    color: $color-blue;
  }
  .corporate-boards-top {
    background: url("~A/panel/panel-top.png") no-repeat center;
    min-width: 1200px;
    min-height: $head-h;
    .home-btn {
      margin-top: 40px;
      margin-left: 25px;
      cursor: pointer;
    }
  }
  .content {
    width: calc(100% - 20px);
    height: calc(100% - #{$head-h});
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    .info-left {
      width: calc(100% - 780px);
      height: 100%;
      background: url("~A/panel/zuos-jiao.png") top left no-repeat,
        url("~A/panel/youx-jiao.png") bottom right no-repeat;
      .map {
        width: 100%;
        height: calc(100% - 200px);
        border: 1px solid red;
      }
      .left-bottom {
        height: 200px;
        @include box-center($justify: center, $align: center);

        .shuju-box {
          width: 90%;
          @include box-center($justify: flex-start, $align: false);
          flex-wrap: wrap;
          span {
            width: 25%;
            font-size: 20px;
            margin: 5px 0;
            color: #ffffff;
          }
        }
        @media (max-width: 1500px) {
          .shuju-box {
            width: 98%;
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
    .info-right {
      width: 770px;
      height: 100%;
      margin-left: 10px;
      .info-right-top {
        height: calc(100% - 210px);
        display: flex;
        align-content: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        .block {
          width: calc(50% - 5px);
          height: 33.4%;
        }
      }
      .info-right-bottom {
        height: 210px;
      }
      .dissolve {
        height: $dissolve-h;
        line-height: $dissolve-h;
        padding-left: 12px;
        font-size: 18px;
        color: #ffffff;
        span {
          font-size: 14px;
          color: #23dfe1;
        }
      }
      .block-centent {
        height: calc(100% - #{$dissolve-h});
        width: 100%;
        .chart {
          height: 100%;
          width: 100%;
        }
        .alarm-data {
          display: flex;
          width: 100%;
          justify-content: space-around;
          height: 26px;
          align-items: center;
          color: #fff;
          .ranking {
            color: #07ffff;
            width: 20px;
            text-align: center;
            font-size: 16px;
          }
          .axes-box {
            width: 40%;
            height: 4px;
            .axes {
              // width: 100%;
              height: 100%;
              background: linear-gradient(to right, #0a95fe, #0afe6c);
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
  .popu {
    width: 380px;
    height: 250px;
    padding: 10px 5px;
    border-radius: 6px;
    border: 1px solid #02396d;
    background: rgba(2, 22, 42, 0.8);
    .popu-top {
      height: $popu-top-h;
      padding: 0 10px;
      background: rgba(5, 46, 85, 0.3);
      border-top: 2px solid #15d0ff;
      position: relative;
      @include box-center($justify: space-between, $align: center);
      &::after {
        content: "";
        @include center-translate($direction: horizontal);
        top: 3px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #15d0ff;
      }
      p {
        color: #ffffff;
        font-size: 18px;
        span {
          display: block;
          font-size: 14px;
        }
      }
      .popu-img {
        width: 140px;
        height: 80%;
        margin-left: 10px;
        border-radius: 6px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
    }
    .popu-bottom {
      height: calc(100% - #{$popu-top-h});
      color: #ffffff;
      font-size: 14px;
      @include box-center($justify: false, $align: center);
      .detail {
        @include box-center($justify: space-around, $align: false);
        flex-wrap: wrap;
        p {
          width: 40%;
          margin: 5px;
          @include box-center($justify: space-between, $align: false);
        }
        .faren {
          width: 90%;
          @include box-center($justify: flex-start, $align: false);
          span {
            margin-left: 50px;
          }
        }
      }
    }
  }
}
</style>
