<template>
  <div class="inside-box rescue-page">
    <div class="top-left">
      <div class="info-chunk">
        <div class="info-title dissolve">预案类型</div>
        <span class="chart-title">
          应急预案总次数 &nbsp;&nbsp;
          <b>64</b>次
        </span>
        <div class="chunk-body chunk">
          <e-chart :options="warningChart" autoresize></e-chart>
        </div>
      </div>
      <div class="info-chunk">
        <div class="info-title dissolve">演练记录</div>
        <div class="chunk-body">
          <scroll>
            <div
              v-for="(item, index) in drillList"
              :key="index"
              class="wasteBook"
            >
              <div>
                <span>{{ item.text }}</span>
                <span style="color:#0ff6f6;">{{ item.num }}人</span>
                <div :class="typeClass(item)">{{ item.type }}</div>
              </div>

              <div>
                <span>{{ item.addr }}</span>
                <span>{{ item.date }}</span>
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </div>
    <div class="top-center">
      <div class="container">
        <swiper :options="swiperOption">
          <swiper-slide v-for="src in drillImgs" :key="src" class="swiper">
            <div class="img-box">
              <img :src="src" class="swiper img" />
            </div>
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev">33</div>
          <div slot="button-next" class="swiper-button-next">22</div>
        </swiper>
        <div class="manoeuvre-box">
          <span class="manoeuvre-title">道路交通事故应急演练</span>
          <div class="manoeuvre-main">
            <div class="text-box">
              <span>
                演练计划：
                <b>维稳反恐应急演练</b>
              </span>
              <span>
                演练队伍：
                <b>救援队1</b>
              </span>
              <span>
                演练地点：
                <b>伊州区</b>
              </span>
              <span>
                演练时间：
                <b>2019-04-18</b>
              </span>
              <span>
                组织部门：
                <b>办公室</b>
              </span>
              <span>
                参与部门：
                <b>安全部</b>
              </span>
              <span>
                参与人数：
                <b>60人</b>
              </span>
              <span>
                实到人数：
                <b>60人</b>
              </span>
            </div>
            <div class="img-box">
              <div v-for="src in drillImgs" :key="src" class="img">
                <img :src="src" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="num-bottom">
        <div>
          <span>应急预案:</span>
          <b>64</b>
        </div>
        <div>
          <span>应急演练:</span>
          <b style="color:#0995ff;">2</b>
        </div>
        <div>
          <span>应急队伍:</span>
          <b style="color:#12ee6e;">1</b>
        </div>
        <span>
          <span>应急装备:</span>
          <b style="color:#fec629;">30</b>
        </span>
      </span>
    </div>
    <div class="top-right">
      <div class="info-chunk">
        <div class="info-title dissolve">装备类型</div>
        <span class="chart-title">
          装备总数 &nbsp;&nbsp;
          <b>30</b>件
        </span>
        <div class="chunk-body chunk">
          <e-chart :options="equipChart" autoresize></e-chart>
        </div>
      </div>
      <div class="info-chunk">
        <div class="info-title dissolve">报警趋势</div>
        <div class="chunk-body">
          <e-chart :options="alarmChart" autoresize></e-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {
  warningChart,
  equipChart,
  alarmChart,
  swiperOption
} from '@/const/rescue';
export default {
  name: 'rescue',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      drillList: [
        {
          text: '维稳反恐应急演练',
          num: 30,
          addr: '伊州区园区',
          type: '社会安全',
          date: '2018-04-18'
        },
        {
          text: '火灾应急演练',
          num: 30,
          addr: '伊州区园区',
          type: '事故灾难',
          date: '2018-04-18'
        },
        {
          text: '地震应急演练',
          num: 30,
          addr: '伊州区园区',
          type: '自然灾害',
          date: '2018-04-18'
        },
        {
          text: '维稳反恐应急演练',
          num: 30,
          addr: '伊州区园区',
          type: '社会安全',
          date: '2018-04-18'
        },
        {
          text: '燃气泄漏应急演练',
          num: 30,
          addr: '园区外道路',
          type: '事故灾难',
          date: '2018-04-18'
        }
      ],
      drillImgs: [
        require('A/panel/IMG_0853.png'),
        require('A/panel/IMG_0854.png'),
        require('A/panel/IMG_0855.png'),
        require('A/panel/IMG_0856.png')
      ],
      // 轮播图设置
      swiperOption
    };
  },
  computed: {
    warningChart() {
      return warningChart([]);
    },
    equipChart() {
      return equipChart([]);
    },
    alarmChart() {
      return alarmChart([]);
    }
  },
  mounted() { },
  methods: {
    typeClass(item) {
      return [
        'type',
        {
          'bg-sg': item.type == '事故灾难',
          'bg-zr': item.type == '自然灾害',
          'bg-sh': item.type == '社会安全',
          'bg-gg': item.type == '公共卫生'
        }
      ];
    }
  }
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.rescue-page {
  .chart-title {
    height: 40px;
    display: inline-block;
    width: 100%;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    b {
      color: #08ffff;
    }
  }
  .chunk {
    height: calc(100% - 70px) !important;
  }
  .manoeuvre-box {
    width: calc(100% - 20px);
    height: 200px;
    background: rgba(35, 223, 225, 0.08);
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 0 12px;
    .manoeuvre-title {
      display: inline-block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #08ffff;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    .manoeuvre-main {
      width: 100%;
      height: calc(100% - 40px);
      display: flex;
      .text-box {
        width: 45%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        span {
          display: inline-block;
          width: 50%;
          height: 30px;
          line-height: 30px;
          color: #fff;
          b {
            color: #08ffff;
          }
        }
      }
      .img-box {
        width: 55%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img {
          height: 100px;
          border-radius: 6px;
          img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 4px;
          }
        }
      }
    }
  }
  .wasteBook {
    background: url('~A/panel/yanlian-bg.png') no-repeat center;
    background-position: left;
    color: #e3effe;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 6px 24px;
    div {
      display: flex;
      justify-content: space-between;
      .type {
        border-radius: 25px;
        padding: 0 10px;
        color: #333;
      }
      .bg-sg {
        background: #fecc1f;
      }
      .bg-zr {
        background: #ff951e;
      }
      .bg-sh {
        background: #0995ff;
      }
      .bg-gg {
        background: #0ff6f6;
      }
    }
  }
  .swiper-container {
    padding-top: 30px;
    .img-box {
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 4px;
        position: relative;
        margin: 0 auto;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .swiper-slide {
    width: 500px;
    height: 300px;
    background: #fff;
    box-shadow: 0px 0px 80px #2d2929;
    border-radius: 4px;
    border: 1px solid #0ff6f6;
    background: rgba(19, 65, 66, 0.3);
  }
}
</style>
