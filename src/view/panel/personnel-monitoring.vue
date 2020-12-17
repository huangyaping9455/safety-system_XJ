<template>
  <div class="personnel-monitoring">
    <div class="top-left">
      <div class="info-chunk">
        <div class="info-title dissolve">报警排名</div>
        <div class="chunk-body">
          <div v-for="(item, index) of 10" :key="index" class="alarm-data">
            <span :class="['ranking', { 'color-red': index < 3 }]">{{
              index + 1
            }}</span>
            <span>新A123456</span>
            <span class="color-bule">{{ 100 - index * index }}次</span>
            <div class="axes-box">
              <div
                class="axes"
                :style="'width:' + (100 - index * index) + '%'"
              ></div>
            </div>
            <img src="~A/panel/up.png" />
          </div>
        </div>
      </div>
      <div class="info-chunk">
        <div class="info-title dissolve">报警流水</div>
        <div class="chunk-body">
          <div class="wasteBook-list">
            <div v-for="(item, index) of 10" :key="index" class="wasteBook">
              <span>新A123456</span>
              <div class="color-yellow">超速报警</div>
              <div>2019-05-25 15:25:52</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-center">
      <div class="map-box"></div>
      <div class="center-bottom">
        <div>
          <span>在线车辆:</span>
          <b class="color-green">800</b>
        </div>
        <div>
          <span>维修车辆:</span>
          <b class="color-yellow">800</b>
        </div>
        <div>
          <span>报警车辆:</span>
          <b class="color-red">800</b>
        </div>
        <div>
          <span>离线车辆:</span>
          <b class="color-royalblue">800</b>
        </div>
      </div>
    </div>
    <div class="top-right">
      <div class="info-chunk">
        <div class="info-title dissolve">报警占比</div>
        <div class="chunk-body">
          <p class="chunk-count">
            <span> 车辆总数 <b class="color-bule">6000</b>辆</span>
          </p>
          <div class="chunk-info alarmChart "></div>
        </div>
      </div>
      <div class="info-chunk">
        <div class="info-title dissolve">报警趋势</div>
        <div class="chunk-body">
          <div class="chunk-info trendChart "></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  proportionChart,
  trendChart
} from '@/const/personnel-monitoring';
import chart from '@/mixin/chart';
export default {
  name: 'personnel-monitoring',
  mixins: [chart],
  data() {
    return {

    };
  },
  computed: {},
  mounted() {
    this.chartInit([proportionChart, trendChart]);
  },
  methods: {
  },
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.personnel-monitoring {
  width: 100%;
  height: 100%;
  display: flex;
  .color-yellow {
    color: #fec62a;
    margin-left: 6px;
  }
  .color-bule {
    color: #07ffff;
    margin-left: 6px;
  }
  .color-royalblue {
    color: #0a95fe;
    margin-left: 6px;
  }
  .color-green {
    color: #0afe6c;
  }
  .color-red {
    color: red !important;
  }
  .top-left {
    width: 20%;
    height: 100%;
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
          background: linear-gradient(to right, #fec32a, #fd2a2a);
          border-radius: 3px;
        }
      }
    }
    .wasteBook {
      background: url('~A/panel/list-bg.png') no-repeat center;
      background-position: left;
      display: flex;
      justify-content: space-around;
      color: #fff;
      height: 26px;
      align-items: center;
      cursor: pointer;
    }
    .wasteBook:hover {
      background: #15d0ff30 url('~A/panel/list-bg-h.png') no-repeat center;
      background-position: left;
      color: #07ffff;
    }
  }
  .top-center {
    width: 60%;
    height: 100%;
    background: url('~A/panel/zuos-jiao.png') top left no-repeat,
      url('~A/panel/youx-jiao.png') bottom right no-repeat;
    .map-box {
      width: 100%;
      height: calc(100% - 60px);
    }
    .center-bottom {
      display: flex;
      justify-content: space-around;
      font-size: 16px;
      color: #fff;
      height: 60px;
      align-items: center;
      b {
        font-size: 20px;
        color: #07ffff;
      }
    }
  }
  .top-right {
    width: 20%;
    height: 100%;
    .chunk-body {
      height: calc(100% - 30px);
      .chunk-count {
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
      .chunk-info {
        width: 100%;
        height: calc(100% - 0px);
        color: #fff;
        font-size: 16px;
      }
      .alarmChart {
        height: calc(100% - 60px);
      }
    }
  }
  .info-chunk {
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    .info-title {
      color: #fff;
      height: 30px;
      line-height: 30px;
      padding-left: 6px;
    }
  }
}
</style>
