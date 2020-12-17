<template>
  <div class="year-case wh100">
    <div class="top-info">
      <div class="tu-info">
        <div class="center">
          <span class="title">{{ yearTime }}年度运营情况</span>
          <img src="~A/operation/che.png" alt />
        </div>
        <div class="year-number">
          <div
            class="number-block"
            v-for="(item, index) in yearData"
            :key="index"
          >
            <span :class="item.cl"
              >{{ dayData[item.field] || 0 }}{{ item.value }}</span
            >
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
      <div class="chart-box">
        <e-chart
          class="chart"
          :options="yearChart"
          @click="onClick"
          autoresize
        ></e-chart>
      </div>
    </div>
    <div class="b-info">
      <div class="head-info">
        <span class="title">运营监控（本月）</span>
        <div class="alarm-tab">
          <i-input v-model="search" placeholder="请输入车牌号" clearable>
            <img
              class="sousuo"
              slot="prefix"
              src="~A/operation/sousuo.png"
              alt
            />
          </i-input>
        </div>
        <img src="~A/operation/shezhi.png" @click="showPop = true" />
      </div>
      <div class="b-content">
        <scroll>
          <div v-for="(item, index) in monthListDataS" :key="index" class="row">
            <plate
              class="row-head"
              :color="item.chepaiyanse"
              :text="item.cheliangpaizhao"
            ></plate>
            <div class="row-right">
              <span class="licheng">里程</span>
              <div class="progress-info">
                <i-progress
                  :percent="item.wanchenglv"
                  :stroke-width="16"
                  stroke-color="#6eb7fe"
                  hide-info
                />
              </div>
              <div>
                <span class="blue">{{ item.shiji }}公里</span>
                /{{ item.dabiao }}
                公里
              </div>
              <span class="finish">
                里程完成
                <i class="blue">{{ item.wanchenglv }}%</i>
              </span>
              <div class="yearPass">
                <b class="navy-blue">{{ item.hegelv }}%</b>
                <br />
                <span>年里程达标率</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
    <div class="popup-window" v-show="showPop" @click.self="showPop = false">
      <div
        class="popup-container"
        :style="{ width: showPop ? '300px' : '0px' }"
      >
        <div class="month-mileage">
          <div class="head">
            <!-- <plate class="plate" color="黄色" :text="popInfo.cheliangpaizhao"></plate> -->
            <span class="title">达标里程设置</span>
            <icon class="close" type="md-close" @click="showPop = false"></icon>
          </div>
          <div class="scroll-box">
            <scroll>
              <div class="month-info">
                <div
                  :class="['month-box', { active: index == activIndex }]"
                  v-for="(item, index) in monthList"
                  :key="index"
                  @click="setDabiao(index, item)"
                >
                  <div class="month-text">{{ item.label }}</div>
                  <div class="mileage">
                    <i-select
                      v-model="model1"
                      v-if="index == activIndex"
                      style="width:100px;height:28px"
                      @on-change="trySet"
                    >
                      <i-option
                        v-for="item in mileageList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</i-option
                      >
                    </i-select>
                    <span v-else>{{ mileageListData[item.key] }}公里</span>
                  </div>
                </div>
              </div>
              <div class="sure-bootn" @click="updateDefault()">确认修改</div>
            </scroll>
          </div>
        </div>
        <!-- <div class="car-mileage">
          <div class="head">
            <span class="title">单车里程设置</span>
          </div>
          <div class="scroll-box">
            <scroll>
              <div class="car-box">
                <div
                  :class="['car-info', { activ: index == carIndex }]"
                  v-for="(item, index) in 6"
                  :key="index"
                >
                  <div class="heard">
                    <plate class="plate" color="黄色" text="渝12356"></plate>
                    <div class="right">
                      <span>(公里)</span>
                      <span>图</span>
                    </div>
                  </div>
                  <div class="month">
                    <div v-for="(item, index) in 6" :key="index">
                      <span>600</span>
                      <b>{{ item }}月</b>
                    </div>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
          <div class="sure-bootn">确认修改</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import plate from 'C/plate';
import { yearChart } from '@/const/operation';
import { getListBenYueJianKong, getListdefault, updateDefault } from '@/api/operation/home';
export default {
  name: 'year-case',
  components: {
    plate
  },
  props: {
    dayData: {
      type: Object
    },
    unused: {
      type: Array
    },
    zaiyun: {
      type: Array
    },
    onLine: {
      type: Array
    },
    wancheng: {
      type: Array
    }
  },
  data() {
    return {
      yearTime: dayjs().format('YYYY'),
      yearData: [
        {
          field: 'nianchuku',
          title: '出库量（吨）',
          value: '',
          cl: 'orange'
        },
        {
          field: 'nianruku',
          title: '入库量（吨）',
          value: '',
          cl: 'navy-blue'
        },
        {
          field: 'nianzaixian',
          title: '在线率',
          value: '%',
          cl: 'navy-blue'
        },
        {
          field: 'nianwancheng',
          title: '里程达标率',
          value: '%',
          cl: 'orange'
        }
      ],
      indexData: {},
      monthListData: [],
      search: '',
      showPop: false,
      activIndex: -1,
      carIndex: 0,
      mileageList: [
        { label: '1000公里', value: '1000' },
        { label: '2000公里', value: '2000' },
        { label: '3000公里', value: '3000' },
        { label: '4000公里', value: '4000' },
        { label: '5000公里', value: '5000' },
      ],
      monthList: [
        { key: 'yi', label: '1月' },
        { key: 'er', label: '2月' },
        { key: 'san', label: '3月' },
        { key: 'si', label: '4月' },
        { key: 'wu', label: '5月' },
        { key: 'liu', label: '6月' },
        { key: 'qi', label: '7月' },
        { key: 'ba', label: '8月' },
        { key: 'jiu', label: '9月' },
        { key: 'shi', label: '10月' },
        { key: 'shiyi', label: '11月' },
        { key: 'shier', label: '12月' }
      ],
      model1: '',
      mileageListData: {},
      mileageItem: {}
    };
  },
  computed: {
    // 动态显示列
    tableColumns() {
      return this.table.columns;
    },
    // 月运营情况
    yearChart() {
      // this.monthData, this.monthData.length
      return yearChart(this.onLine, this.wancheng);
    },
    monthListDataS() {
      var _search = this.search;
      if (_search) {
        return this.monthListData.filter(item => {
          return item.cheliangpaizhao.indexOf(_search) != -1;
        });
      } else {
        return this.monthListData;
      }
    },

  },
  watch: {

  },
  mounted() {
    this.getListBenYueJianKong();
    this.getListdefault();
  },
  methods: {
    onClick(event) {
      this.$emit('dateChange', event.name.substring(0, event.name.length - 1));
    },
    getListBenYueJianKong() {
      getListBenYueJianKong({}).then(res => {
        this.monthListData = res.data.data;
      });
    },
    // 达标里程设置数据
    getListdefault() {
      getListdefault({}).then(res => {
        this.mileageListData = res.data.data[0];
      });
    },
    setDabiao(index, item) {
      this.model1 = '';
      this.activIndex = index;
      this.mileageItem = item;
    },
    trySet(v) {
      this.mileageListData[this.mileageItem.key] = v;
    },
    updateDefault() {
      updateDefault(this.mileageListData).then(res => {
        if (res.data.success) {
          this.$message.success('设置成功');
          this.showPop = false;
        } else {
          this.$message.error('设置失败');
        }

      });
    }
  }
};
</script>
<style lang="scss">
@import 'S/mixin.scss';
$row-h: 56px;
.ivu-select-selection {
  border: none;
  border-radius: 0 0 4px 4px;
}
.ivu-select-single .ivu-select-selection {
  height: 29px;
}
.plate-yellow {
  position: static;
  z-index: 1;
}
.year-case {
  padding: 10px 0;
  position: absolute;
  .green {
    color: #4aff5f;
  }
  .navy-blue {
    color: #0e48a7;
  }
  .orange {
    color: #feeb16;
  }
  .blue {
    color: #1067ff;
  }
  .top-info {
    height: calc(230px + 20vh);
    width: calc(100% - 20px);
    padding: 10px 0;
    margin: 0 auto;
    overflow: hidden;
    background: #4fa7fe;
    border-radius: 4px;
    .year-number {
      width: 100%;
      @include box-center($justify: space-around, $align: center);
      flex-grow: 1;
      position: relative;
      z-index: 2;
      .number-block {
        @include box-center($justify: center, $align: center);
        flex-direction: column;
        span {
          font-family: 'Flip Flop';
          font-size: 32px;
          margin-bottom: 1vh;
        }
        p {
          font-size: 15px;
          position: relative;
          &::after {
            content: '';
            width: 120px;
            height: 18px;
            @include center-translate($direction: horizontal);
            bottom: -15px;
            background: #60a0fd;
            border-radius: 50%;
          }
        }
      }
    }
    .chart-box {
      height: 20vh;
      width: calc(100% - 20px);
      margin: auto;
      margin-top: 10px;
      background: #fff;
      border-radius: 4px;
      position: relative;
      z-index: 2;
    }
  }
  .tu-info {
    width: 100%;
    height: 200px;
    color: #fff;
    position: relative;
    font-size: 16px;
    @include box-center($justify: false, $align: false);
    flex-direction: column;
    &::after {
      content: '';
      width: 140%;
      height: 180px;
      @include center-translate($direction: horizontal);
      bottom: -40px;
      background: linear-gradient(#77bcfe, transparent);
      border-radius: 50%;
    }
    & > .center {
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      position: relative;
      z-index: 2;
      img {
        width: 200px;
      }
    }
    .title {
      font-size: 18px;
      margin-bottom: 10px;
      color: #333;
      font-weight: 600;
    }
  }
  .b-info {
    width: 100%;
    height: calc(100% - 230px - 20vh);
    // min-height: 200px;
    padding: 10px 10px 0 10px;
    border-bottom: 1px solid #dddddd;
    .head-info {
      height: 40px;
      @include box-center($justify: space-between, $align: center);
      .title {
        font-size: 17px;
        font-weight: 600;
        // color: #333;
      }
      .alarm-tab {
        flex-grow: 1;
        margin-right: 20px;
        position: relative;
        .ivu-input {
          background-color: #f3f9ff;
          border: 1px solid #f3f9ff;
        }
        .sousuo {
          width: 20px;
          margin-top: 5px;
        }
      }
    }
    .b-content {
      height: calc(100% - 40px);
      .row {
        height: $row-h;
        margin-bottom: 10px;
        color: #333;
        @include box-center($justify: space-between, $align: center);
        .row-head {
          height: 100%;
          width: 120px;
          line-height: $row-h;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
        }

        .row-right {
          height: 100%;
          flex-grow: 1;
          padding: 0 10px;
          background: #f3f9ff;
          border-radius: 2px;
          @include box-center($justify: flex-start, $align: center);
          .licheng {
            margin-right: 10px;
          }
          .progress-info {
            flex-grow: 1;
            margin-right: 10px;
          }
          .ivu-progress-inner {
            background-color: #cbe5ff;
          }
          .finish {
            margin: 0px 30px 0px 20px;
            i {
              font-style: normal;
            }
          }
          .yearPass {
            text-align: center;
            b {
              font-family: 'Flip Flop';
              font-size: 16px;
              font-weight: 400;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .popup-container {
    height: 88vh;
    top: 7vh;
    position: absolute;
    right: 0px;
    background: white;
    color: black;
    transition: all 0.4s;
    .head {
      width: 800px;
      display: flex;
      align-items: center;
      font-weight: 700;
      height: 40px;
      .title {
        margin-left: 10px;
        font-size: 20px;
      }
      .close {
        position: absolute;
        right: 30px;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .month-mileage {
      height: 100%;
      padding: 12px 20px;
      .scroll-box {
        width: 100%;
        height: calc(100% - 40px);
        background: #eaf5ff;
        border-radius: 4px;
        .month-info {
          width: 100%;
          height: 744px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-content: space-evenly;
          .month-box {
            color: #1e71ff;
            width: 33%;
            height: 94px;
            margin: 0 12px;
            border-radius: 4px;
            font-size: 18px;
            cursor: pointer;
            .month-text {
              width: 100%;
              height: 70%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(to left, #8bc5fe, #eaf5ff) left bottom
                  no-repeat,
                linear-gradient(to left, #eaf5ff, #8bc5fe) right bottom
                  no-repeat;
              background-size: 51% 2px;
            }
            .mileage {
              height: 30%;
              font-size: 12px;
              display: flex;
              justify-content: center;
              color: #333;
              align-items: center;
            }
          }
          .active {
            background: #3a90fe;
            color: #fff;
          }
        }
      }
    }
    .car-mileage {
      height: 60%;
      padding: 12px 20px;
      padding-top: 50px;
      background: #d3d7e9;
      .scroll-box {
        width: 760px;
        height: calc(100% - 88px);
        .car-box {
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .car-info {
            width: calc(50% - 10px);
            height: 110px;
            background: #fff;
            margin: 5px 0;
            border-radius: 4px;
            .heard {
              display: flex;
              justify-content: space-between;
              position: relative;
              .right {
                display: flex;
                align-items: center;
                width: 74%;
                background: #d6ebff;
                position: absolute;
                right: 10px;
                height: 76%;
                top: 50%;
                transform: translateY(-50%);
                z-index: 0;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
              }
            }
            .month {
              display: flex;
              justify-content: space-evenly;
              height: calc(100% - 40px);
              padding: 8px 0;
              & > div {
                display: flex;
                flex-direction: column;
                background: #eaf5ff;
                width: 50px;
                align-items: center;
                border-radius: 2px;
                height: 100%;
                justify-content: center;
                span {
                  color: #f41738;
                }
                b {
                  color: #1e71ff;
                }
              }
            }
          }
        }
      }
    }
    .sure-bootn {
      height: 48px;
      background: #d6ebff;
      border-radius: 0 0 4px 4px;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>