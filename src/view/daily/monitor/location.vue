<template>
  <div v-show="value" class="vehicle-location">
    <div class="popup-title">
      <span class="plate">
        <b class="title">单车监控</b>(定位时间：
        <b class="time">
          {{
          locationTime
          }}
        </b>)
      </span>
      <img src="~A/daily/guanbi.png" @click="close" />
    </div>
    <div v-if="value" class="popup-mian">
      <div
        v-for="(item, i) in locationData"
        :key="i"
        :class="[
          'info-chunk',
          { chunk2: locationData.length == 2 },
          { fullscreen: i == fullSreen || locationData.length == 1 }
        ]"
      >
        <div class="info">
          <div class="map-box">
            <baidu-map
              class="map"
              :center="{ lng: item.longitude, lat: item.latitude }"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
              :ak="mapak"
              @ready="mapReady"
            >
              <bm-marker :position="{ lng: item.longitude, lat: item.latitude }" :icon="item.icon"></bm-marker>
            </baidu-map>
          </div>
          <div :class="['basic-info', { 'left-info': i == 1 || i == 3 }]">
            <div :class="plateClass(item)">{{ item.cph }}</div>

            <div class="info-main">
              <scroll>
                <div class="basic">
                  <div v-for="(item, index) in basicInfo" :key="index">
                    <span class="t">{{ item.text }}：</span>
                    <span>{{ locationData[i][item.field] }}</span>
                  </div>
                </div>
                <div class="chart">
                  <e-chart
                    class="chart"
                    :options="velocityChart(locationData[i].velocity)"
                    autoresize
                  ></e-chart>
                </div>
              </scroll>
            </div>
          </div>
          <img
            :class="['amp', { 'right-amp': i == 1 || i == 3 }]"
            src="~A/daily/amp.png"
            @click="isFull(i)"
          />
          <!-- 报警信息弹窗 -->
          <!-- <div :class="['alarm-info', { 'left-alarm': i == 1 || i == 3 }]">
            <div class="info-tab">
              <div
                v-for="(item, index) in popupTab"
                :key="i + '-' + index"
                :class="popupIndex == index && i == ss ? item.calass : ''"
                @click="activePopupTab(i, index)"
              >
                <span>{{ item.text }}</span>
                <div class="red-bot">12</div>
              </div>
            </div>
            <div v-show="i == ss" class="info-body">
              <div v-show="currentTab.slot == 'alarm'" :class="'alarm' + i">
                <scroll>
                  <div
                    class="list"
                    v-for="(item, index) in 4"
                    :key="i + '-' + index"
                  >
                    <div
                      class="list-title"
                      @click="spreadInfo(i + '-' + index)"
                    >
                      <img src="~A/daily/jingbao.png" />
                      <span>2019-11-11 12:25:36</span>
                      <span>超速</span>
                    </div>
                    <div v-show="openIs == i + '-' + index" class="list-info">
                      <div v-for="(item, index) in baojingInfo" :key="index">
                        <span class="t">{{ item.text }}:</span>
                        <span>{{ item.value }}</span>
                      </div>
                    </div>
                  </div>
                </scroll>
              </div>
              <div v-show="currentTab.slot == 'stop'" :class="'stop' + i">
                <scroll>
                  <div
                    class="list"
                    v-for="(item, index) in 4"
                    :key="i + '-' + index"
                  >
                    <div
                      class="list-title"
                      @click="spreadInfo(i + '-' + index)"
                    >
                      <img src="~A/daily/ting.png" />
                      <span>2019-11-11 12:25:36</span>
                    </div>
                    <div v-show="openIs == i + '-' + index" class="list-info">
                      <div>
                        <span class="t">开始时间:</span>
                        <span>2019-11-11 12:25:36</span>
                      </div>
                      <div>
                        <span class="t">结束时间:</span>
                        <span>2019-11-11 12:25:36</span>
                      </div>
                      <div>
                        <span class="t">持续时间:</span>
                        <span>12分钟12秒</span>
                      </div>
                    </div>
                  </div>
                </scroll>
              </div>
              <div v-show="currentTab.slot == 'offLine'" :class="'offLine' + i">
                <scroll>
                  <div
                    class="list"
                    v-for="(item, index) in 4"
                    :key="i + '-' + index"
                  >
                    <div
                      class="list-title"
                      @click="spreadInfo(i + '-' + index)"
                    >
                      <img src="~A/daily/buzaixian.png" />
                      <span>2019-11-11 12:25:36</span>
                    </div>
                    <div v-show="openIs == i + '-' + index" class="list-info">
                      <div>
                        <span class="t">开始时间:</span>
                        <span>2019-11-11 12:25:36</span>
                      </div>
                      <div>
                        <span class="t">结束时间:</span>
                        <span>2019-11-11 12:25:36</span>
                      </div>
                      <div>
                        <span class="t">持续时间:</span>
                        <span>12分钟12秒</span>
                      </div>
                    </div>
                  </div>
                </scroll>
              </div>
            </div>
          </div>-->
        </div>
      </div>
      <div class="info-chunk" v-if="locationData.length == 3">
        <baidu-map
          class="map"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          :ak="mapak"
          @ready="mapReady"
        ></baidu-map>
      </div>
    </div>
  </div>
</template>
 
<script>
import map from "@/mixin/map";
// import "./lushu";
import { basicInfo, baojingInfo, velocityChart } from "@/const/monitor";
import {
  //  getVehlicPTdetail,
  getVehicleList,
} from "@/api/daily/monitor";
import dayjs from "dayjs";
export default {
  name: "location",
  mixins: [map],
  props: {
    listData: {
      type: Array,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timer: null,
      beginTime: "",
      endTime: "",
      locationTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      // 地图轨迹，起始标志，缩放，中心，路书图标
      path: [],
      starMarker: {},
      endMarker: {},
      vehicleStat: {},
      place: "",
      zoom: 18,
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } },
      },
      center: { lng: 87.591802, lat: 43.82712 },
      alarmChartData: [],
      showTrajectoryList: [],
      bmllushu: {
        play: false,
      },
      address: null,
      basicInfo,
      baojingInfo,
      openIs: -1,
      ss: 0,
      locationData: [],
      fullSreen: -1,
      popupIndex: 0,
      popupTab: [
        { text: "报警", slot: "alarm", calass: "baojing" },
        { text: "停车", slot: "stop", calass: "tingche" },
        {
          text: "离线",
          slot: "offLine",
          calass: "lixian",
        },
      ],
    };
  },
  computed: {
    currentTab() {
      return this.popupTab[this.popupIndex];
    },
  },
  watch: {
    // listData() {
    //   setInterval(this.getAlarmTimeData, 10000);
    // },
  },
  mounted() {
    this.timer = setInterval(this.getAlarmTimeData, 5000);
    // this.lushumap();
  },
  methods: {
    velocityChart(data) {
      return velocityChart(data);
    },
    plateClass(row) {
      return [
        "info-title",
        {
          "bg-yellow": row.platecolor == "黄色",
          "bg-bule": row.platecolor == "蓝色",
          "bg-green": row.platecolor == "绿色",
          "bg-white": row.platecolor == "白色",
          "bg-black": row.platecolor == "黑色",
        },
      ];
    },
    isFull(i) {
      this.fullSreen = this.fullSreen == i ? -1 : i;
    },
    getAlarmTimeData() {
      let company = this.$store.getters.deptName;
      let vehicleStatus = this.$parent.activeListTab.type; // ||  this.active.type;
      let cph = this.listData[0].cph;
      let offsetNo = this.$parent.table.offset,
        order = 0,
        orderColumn = "",
        pageTotal = 1,
        page = this.$parent.current,
        pagesize = this.$parent.size,
        total = this.$parent.total,
        records = [];
      getVehicleList(
        company,
        vehicleStatus,
        cph,
        page,
        offsetNo,
        order,
        orderColumn,
        pageTotal,
        page,
        pagesize,
        total,
        records
      ).then((res) => {
        this.$parent.load = false;
        this.locationData = res.data.data.list;
        this.address = [
          res.data.data.list[0].Longitude,
          res.data.data.list[0].Latitude,
        ];
        this.locationData[0].icon = this.$parent.getMapCarImg(
          res.data.data.list[0].status,
          res.data.data.list[0].alarm,
          res.data.data.list[0].zaixian
        );
      });
    },
    // lushumap() {
    //   let lushu;
    //   let drv = new BMap.DrivingRoute(this.center, {
    //     onSearchComplete: function (res) {
    //       console.log(res);
    //       if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
    //         let plan = res.getPlan(0);
    //         let arrPois = [];
    //         for (let j = 0; j < plan.getNumRoutes(); j++) {
    //           let route = plan.getRoute(j);
    //           arrPois = arrPois.concat(route.getPath());
    //         }
    //         map.addOverlay(new BMap.Polyline(arrPois, { strokeColor: "#111" }));
    //         map.setViewport(arrPois);
    //         lushu = new BMapLib.LuShu(map, arrPois, {
    //           defaultContent: "",
    //           autoView: true, //是否开启自动视野调整
    //           icon: this.locationData[0].icon,
    //           speed: 400,
    //           enableRotation: true,
    //         });
    //       }
    //     },
    //   });
    //   let start = this.center;
    //   let end = this.address;
    //   drv.search(start, end);
    //   lushu.start();
    // },
    close() {
      this.$emit("input", false);
      clearInterval(this.timer);
    },
    spreadInfo(index) {
      this.openIs = index == this.openIs ? -1 : index;
    },
    // 切换弹窗
    activePopupTab(i, index) {
      this.ss = i;
      this.popupIndex = index;
    },
  },
};
</script>
 
<style lang="scss" >
.vehicle-location {
  width: 100%;
  height: 100%;
  box-shadow: 1px 0px 16px #7190ca;
  border-radius: 4px;
  .popup-title {
    width: 100%;
    height: 50px;
    background: rgba(216, 236, 254, 0.9);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    border-radius: 4px 4px 0 0;
    .plate {
      color: #333;
      font-size: 12px;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-right: 6px;
      }
      .time {
        font-size: 12px;
        color: #4086f4;
        font-weight: 500;
      }
    }
    img {
      position: relative;
      top: -12px;
      right: 2px;
      cursor: pointer;
    }
  }
  .popup-mian {
    width: 100%;
    height: calc(100% - 50px);
    border-radius: 0 0 4px 4px;
    background: rgba(216, 236, 254, 0.9);
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-content: space-between;
    position: relative;
    .info-chunk {
      width: calc(50% - 4px);
      height: calc(50% - 4px);
      .info {
        width: 100%;
        height: 100%;
        position: relative;
        .map-box {
          width: 100%;
          height: 100%;
          .map {
            width: 100%;
            height: 100%;
          }
        }
        .basic-info {
          height: 360px;
          width: 234px;
          position: absolute;
          top: 10px;
          left: 10px;
          background: #fff;
          .info-title {
            height: 50px;
            width: 100%;
            text-align: center;
            line-height: 50px;
            background: #4086f4;
            color: #fff;
            font-size: 14px;
          }
          .bg-yellow {
            background: #4086f4 url("~A/daily/yellow.png") no-repeat;
            background-size: 68px;
            background-position: center;
            color: #333;
          }
          .bg-bule {
            background: #4086f4 url("~A/daily/bule.png") no-repeat;
            background-size: 68px;
            background-position: center;
            color: #fff;
          }
          .bg-green {
            background: #4086f4 url("~A/daily/green.png") no-repeat;
            background-size: 68px;
            background-position: center;
            color: #333;
          }
          .bg-black {
            background: #4086f4 url("~A/daily/black.png") no-repeat;
            background-size: 68px;
            background-position: center;
            color: #fff;
          }

          .bg-white {
            background: #4086f4 url("~A/daily/white.png") no-repeat;
            background-size: 68px;
            background-position: center;
            color: #333;
          }
          .info-main {
            padding: 10px;
            height: calc(100% - 50px);
            .basic {
              width: 100%;
              height: calc(100% - 180px);
              div {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                line-height: 18px;
                .t {
                  color: #999;
                  display: inline-block;
                  width: 80px;
                }
              }
            }
            .chart {
              width: 100%;
              height: 180px;
            }
          }
        }
        .alarm-info {
          width: 262px;
          height: calc(100% - 20px);
          position: absolute;
          z-index: 2;
          left: 284px;
          top: 10px;
          padding: 10px;
          background: #fff;
          .info-tab {
            height: 44px;
            display: flex;
            justify-content: space-between;
            & > div {
              color: #999;
              height: 34px;
              line-height: 34px;
              width: 74px;
              padding: 0 6px;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              .red-bot {
                width: 16px;
                height: 16px;
                border-radius: 8px;
                background: #ccc;
                line-height: 16px;
                font-size: 12px;
                text-align: center;
                color: #fff;
              }
            }
            .tingche {
              background: #35d5ff;
              color: #fff;
              .red-bot {
                color: #35d5ff;
                background: #fff;
              }
            }
            .baojing {
              background: #fd282a;
              color: #fff;
              .red-bot {
                color: #fd282a;
                background: #fff;
              }
            }
            .lixian {
              background: #999;
              color: #fff;
              .red-bot {
                color: #999;
                background: #fff;
              }
            }
          }
          .info-body {
            height: calc(100% - 44px);
            width: 100%;
            .list {
              padding: 2px 0;
              .list-title {
                height: 34px;
                background: #d9edff;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-radius: 4px;
                cursor: pointer;
              }
              .list-info {
                background: #ecf6ff;
                padding: 10px;
                margin-bottom: 10px;
                border-radius: 0 0 6px 6px;
                & > div {
                  line-height: 28px;
                  display: flex;
                  justify-content: space-between;
                  font-size: 12px;
                  .t {
                    color: #999;
                  }
                }
              }
            }
          }
          .alarm {
            height: 100%;
            width: 100%;
          }
        }
        .left-info {
          left: calc(100% - 244px);
          z-index: 9;
        }
        .left-alarm {
          left: calc(100% - 546px);
          z-index: 9;
        }
        .amp {
          position: absolute;
          right: 10px;
          bottom: 8px;
          width: 20px;
          cursor: pointer;
        }
        .right-amp {
          position: absolute;
          right: calc(100% - 30px);
          bottom: 8px;
          width: 20px;
        }
      }
      .map {
        width: 100%;
        height: 100%;
      }
    }
    .fullscreen {
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      position: absolute;
      top: 0;
      z-index: 99;
    }
    .chunk2 {
      height: 100%;
    }
  }
}
</style>