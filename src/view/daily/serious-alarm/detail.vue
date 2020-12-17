<template>
  <div v-show="value" class="popup-window alarms-detail">
    <div class="popup-content">
      <!-- 弹窗 title -->
      <div class="popup-title">
        <span :class="titleClass">{{ row.plateNumber }}</span>
        <span class="weichuli">{{ isDispose ? "已" : "未" }}处理</span>
        <img class="close" src="~A/daily/popu-close.png" alt @click="close" />
      </div>
      <!-- 弹窗 main -->
      <div class="content map-content">
        <div class="map-video">
          <div class="content-top">
            <i-spin v-show="loading" fix></i-spin>
            <!-- 地圖 -->
            <baidu-map
              class="map"
              :center="center"
              :zoom="zoom"
              :scroll-wheel-zoom="true"
              ak="wFU9l6ME1RIVUxxOtYNaj5Y5bZHmqAhY"
              @ready="mapReady"
            >
              <bm-marker :position="endMarker">
                <bm-label
                  :content="'终点 ' + row.endTime"
                  :labelStyle="labelOpt.style"
                  :offset="labelOpt.offset"
                />
              </bm-marker>
              <bm-marker :position="starMarker">
                <bm-label
                  :content="'起点 ' + row.beginTime"
                  :labelStyle="labelOpt.style"
                  :offset="labelOpt.offset"
                />
              </bm-marker>
              <bm-polyline
                :path="path"
                stroke-color="red"
                :stroke-opacity="1"
                :stroke-weight="3"
              ></bm-polyline>
              <bml-lushu
                :path="path"
                :icon="icon"
                :play="play"
                :rotation="true"
              ></bml-lushu>
            </baidu-map>
          </div>
          <div class="topLeft-box">
            <div class="tab-title">
              <span
                v-for="(item, index) in infoTable"
                :key="index"
                :class="{ checked: index == tabIndex }"
                @click="tabIndex = index"
                >{{ item.label }}</span
              >
            </div>
            <div class="tab-main">
              <!-- 视频 -->
              <div v-show="currentTab.slot == 'video'" class="video">
                <div class="img-box">
                  <video :src="video" autoplay controls></video>
                </div>
                <div
                  v-for="(src, index) in picture"
                  :key="index"
                  class="img-box"
                >
                  <img :src="src" />
                </div>
              </div>
              <!-- 车辆资料 -->
              <div v-show="currentTab.slot == 'vehicle'" class="vehicle">
                <div class="info-top">
                  <div class="left w50">
                    <span class="title">{{ row.plateNumber }}</span>
                    <div class="lien-box">
                      <span
                        class="time"
                        :style="'left:calc(' + 30 + '% - 14px)'"
                        >3年</span
                      >
                      <div class="lien">
                        <div class="data" :style="'width:' + 30 + '%'"></div>
                      </div>
                    </div>
                    <div class="text">
                      <b>运输介质 ：</b>
                      <span>{{ vehicleInfo.yunshujiezhi }}</span>
                    </div>
                    <div class="text">
                      <b>车辆等级 ：</b>
                      <span>{{ vehicleInfo.cheliangdengji }}</span>
                    </div>
                  </div>
                  <div class="right w50">
                    <img src="~A/daily/che.png" alt />
                  </div>
                </div>
                <div class="info-bottom">
                  <div
                    v-for="(item, index) in vehicle"
                    :key="index"
                    :style="'width:' + item.width + '%'"
                  >
                    {{ item.title }}：
                    <span>{{ item.value }}</span>
                  </div>
                </div>
              </div>
              <!-- 驾驶员资料 -->
              <div v-show="currentTab.slot == 'driver'" class="vehicle">
                <div class="info-top">
                  <div class="left w70">
                    <span class="title">{{
                      driverInfo.jiashiyuanxingming
                    }}</span>
                    <div class="text">
                      <b>手机号 ：</b>
                      <span>{{ driverInfo.shoujihaoma }}</span>
                    </div>
                    <div class="text">
                      <b>从业人员类型 ：</b>
                      <span>{{ driverInfo.congyerenyuanleixing }}</span>
                    </div>
                    <div class="text">
                      <b>部门 ：</b>
                      <span>{{ driverInfo.bumen }}</span>
                    </div>
                    <div class="text">
                      <b>驾驶员单位 ：</b>
                      <span>中国石化新疆乌鲁木齐石油分公司</span>
                    </div>
                  </div>
                  <div class="right w30">
                    <img src="~A/daily/ren.png" alt />
                  </div>
                </div>
                <div class="info-bottom">
                  <div
                    v-for="(item, index) in driver"
                    :key="index"
                    :style="'width:' + item.width + '%'"
                  >
                    {{ item.title }}：
                    <span>{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <!-- 情况分析 判断标准 -->
          <div class="bottom-left">
            <div class="info-title">
              <span>情况分析</span>
              <span>{{ active.text }} - 标准判断</span>
            </div>
            <div class="info-box">
              <div class="content-info w60">
                <scroll>
                  <div
                    v-for="(item, index) in infolist"
                    :key="index"
                    class="info-cell"
                  >
                    {{ item.title }}：
                    <span>{{ item.value }}</span>
                  </div>
                </scroll>
              </div>
              <div class="info w40">
                <scroll>
                  <div>{{ active.standard }}</div>
                </scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import {
  getAlarmPoint,
  getAlarmImg,
  getAlarmVehicle,
  getAlarmDetail,
} from "@/api/daily/alarm";
import { driverDetail, vehicleDetail, aralmDetail } from "@/const/alarm";
import dayjs from "dayjs";
import map from "@/mixin/map";
export default {
  name: "alarm-detail",
  mixins: [map],
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Object,
    },
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dispose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      play: false,
      // 当前选择tab index，视频，图片， 对应的tab详情数据，凭证图片
      tabIndex: 0,
      video: "",
      picture: [],
      driverInfo: {},
      vehicleInfo: {},
      imgList: [],
      isShow: "",
      // 地图轨迹，起始标志，缩放，中心，路书图标
      path: [],
      starMarker: {},
      endMarker: {},
      labelOpt: {
        style: { color: "red", fontSize: "14px", padding: "0 5px" },
        offset: { width: 20, height: -25 },
      },
      zoom: 12,
      center: { lng: 116.404, lat: 39.915 },
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } },
      },
    };
  },
  computed: {
    isDispose() {
      return this.row.chulizhuangtai == "已处理" && this.dispose;
    },
    isAppeal() {
      return this.row.shensuzhuangtai == "已申诉";
    },
    titleClass() {
      return [
        "title-number",
        {
          "bg-yellow": this.row.color == "黄色",
          "bg-bule": this.row.color == "蓝色",
          "bg-green": this.row.color == "绿色",
          "bg-white": this.row.color == "白色",
          "bg-black": this.row.color == "黑色",
        },
      ];
    },
    // 信息 TAB
    infoTable() {
      let arr = [
        {
          label: "视频",
          isRender: this.row.isPicture || this.row.isVideo,
          slot: "video",
        },
        {
          label: "车辆资料",
          isRender: true,
          slot: "vehicle",
        },
        {
          label: "驾驶员资料",
          isRender: false,
          slot: "driver",
        },
      ];
      return arr.filter((item) => item.isRender);
    },
    currentTab() {
      return this.infoTable[this.tabIndex];
    },
    // 基础资料
    infolist() {
      return aralmDetail(this.row).filter((item) => {
        let show = item.display;
        return show == undefined ? true : this.active.key == show;
      });
    },
    // 车辆信息
    vehicle() {
      return vehicleDetail(this.vehicleInfo);
    },
    // 驾驶员信息
    driver() {
      return driverDetail(this.driverInfo);
    },
  },
  watch: {
    value() {
      if (!this.value) return;
      this.tabIndex = 0;
      this.imgList = [];
      this.center = {
        lng: this.row.longitude,
        lat: this.row.latitude,
      };
      if (this.active.type == "driver") {
        let time = dayjs(this.row.gpsTime);
        this.row.beginTime = time
          .subtract(10, "minute")
          .format("YYYY-MM-DD hh:mm:ss");
        this.row.endTime = time.add(10, "minute").format("YYYY-MM-DD hh:mm:ss");
      }
      this.getData();
    },
  },
  methods: {
    // 开启路书
    startLushu() {
      if (this.path.length > 0) {
        this.play = !this.play;
      } else {
        this.$message.warning("暂无轨迹点位");
      }
    },
    editClick() {
      this.$message.warning("不能处理该报警信息");
      // if (this.row._disabled) {
      //   this.$message.warning('不能处理该报警信息');
      // } else {
      //   this.$emit('dispose', [this.row]);
      // }
      // this.$emit('dispose', [this.row]);
    },
    // 获取报警点位信息
    getData() {
      this.getAlarmPoint();
      this.getAlarmImg();
      this.getAlarmVehicle();
    },
    // 获取报警点位信息
    getAlarmPoint() {
      const { map } = this.MAP;
      this.path = [];
      this.loading = true;
      this.play = false;
      setTimeout(() => {
        let params = {
          beginTime: this.row.beginTime,
          endTime: this.row.endTime,
          vehid: this.row.vehID || this.row.vehId,
          mark: this.active.type == "GPS" ? 0 : 1,
        };
        getAlarmPoint(params).then((res) => {
          const data = res.data.data;
          if (data.length > 0) {
            this.path = this.mapPoints(data);
            const view = map.getViewport(this.path);
            if (this.path.length > 0) {
              this.endMarker = {
                lng: data[data.length - 1].longitude,
                lat: data[data.length - 1].latitude,
              };
              this.starMarker = {
                lng: data[0].longitude,
                lat: data[0].latitude,
              };
            }
            map.centerAndZoom(
              view.center,
              view.zoom - 1 > this.zoom ? this.zoom : view.zoom - 1
            );
          }
          this.loading = false;
        });
      }, 300);
    },
    // 获取报警视频图片
    getAlarmImg() {
      if (!this.row.isPicture || !this.row.isVideo) return;
      getAlarmImg({
        alarmNumber: this.row.alarmNumber,
        alarmType: this.row.alarmType,
      }).then((res) => {
        let data = res.data.data;
        this.picture = data.Picture;
        this.video = data.Video;
        this.loading = false;
      });
    },
    // 获取驾驶员资料，车辆资料
    getAlarmVehicle() {
      getAlarmVehicle({
        cheliangpaizhao: this.row.plateNumber,
        chepaiyanse: this.row.color,
      }).then((res) => {
        this.driverInfo = res.data.data.jiashiyuan;
        this.vehicleInfo = res.data.data.cheliang;
      });
    },
    // 获取报警详情
    getAlarmDetail() {
      if (this.imgList.length > 0) return;
      getAlarmDetail({
        baojingid: this.row.alarmID,
        type: this.active.type == "GPS" ? 1 : 0,
      }).then((res) => {
        let imgs = res.data.data.fujian;
        if (imgs.length > 0) {
          this.imgList = JSON.parse(imgs);
        }
      });
    },
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

// 弹窗
.alarms-detail {
  .popup-content {
    min-width: 1200px;
    min-height: 600px;
    width: 80%;
    height: 80%;
  }
  .popup-title {
    height: 50px;
    line-height: 50px;
    position: relative;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    background: url("~A/daily/popu-head.png") no-repeat top center;
    background-size: 100% 100%;

    .close {
      height: 30px;
      position: absolute;
      top: -25px;
      right: 0;
      cursor: pointer;
    }
    .state {
      @extend .close;
      right: 50px;
    }
    .weichuli {
      background: #fac632;
      border-radius: 4px;
      color: red;
      display: inline-block;
      height: 33px;
      letter-spacing: 1px;
      line-height: 33px;
      padding: 0px 10px;
      font-weight: 600;
    }
    .title-number {
      width: 100px;
      display: inline-block;
      text-align: center;
      font-weight: 600;
      margin-right: 40px;
    }

    .bg-yellow {
      background: url("~A/daily/yellow.png") no-repeat;
      background-size: 100px;
      background-position: center;
      color: #333;
    }
    .bg-bule {
      background: url("~A/daily/bule.png") no-repeat;
      background-size: 100px;
      background-position: center;
      color: #fff;
    }
    .bg-green {
      background: url("~A/daily/green.png") no-repeat;
      background-size: 100px;
      background-position: center;
      color: #333;
    }
    .bg-black {
      background: url("~A/daily/black.png") no-repeat;
      background-size: 100px;
      background-position: center;
      color: #fff;
    }

    .bg-white {
      background: url("~A/daily/white.png") no-repeat;
      background-size: 100px;
      background-position: center;
      color: #333;
    }
  }

  .footer {
    width: 100%;
    height: 30px;
    background: #f4f7fe url("~A/daily/pic.png") no-repeat left center;
    background-size: contain;
  }

  .content {
    height: calc(100% - 80px);
    color: #333333;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
  }

  // 地圖
  .map-video {
    width: 100%;
    height: calc(100% - 130px);
    padding: 10px;
    background: #eee;
    display: flex;
    justify-content: space-between;
    position: relative;
    .content-top {
      width: calc(50% - 5px);
      height: 100%;
      .map {
        width: 100%;
        height: 100%;
      }
    }
    .topLeft-box {
      width: calc(50% - 5px);
      height: 100%;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      .tab-title {
        line-height: 40px;
        height: 50px;
        font-size: 18px;
        letter-spacing: 2px;
        font-weight: 600;
        display: flex;
        justify-content: space-evenly;
        color: #999;
        cursor: pointer;
        .active {
          color: #333;
          background: url("~A/daily/title-bg.png") no-repeat top;
          background-size: contain;
        }
        span {
          display: inline-block;
          width: 100px;
          text-align: center;
        }
      }
      .tab-main {
        width: calc(100% - 16px);
        height: calc(100% - 58px);
        // background: red;
        margin: 0 auto;

        .video {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          .img-box {
            margin: 10px;
            width: calc(50% - 20px);
            height: calc(50% - 20px);
            background: #ccc;
            @include box-center;
          }
          video,
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }

        .vehicle {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .info-top {
            width: 100%;
            height: calc(50% - 5px);
            padding: 0px 10px;
            @include box-center($justify: space-between, $align: center);
            .left {
              height: 100%;
              .title {
                font-size: 26px;
              }
              .lien-box {
                position: relative;
                height: 60px;
                width: 100%;
                .time {
                  position: absolute;
                  top: 10px;
                }
                .lien {
                  top: 30px;
                  position: absolute;
                  width: 100%;
                  height: 14px;
                  background: #f5f5f5;
                  border-radius: 10px;
                  .data {
                    background: #3c86f4;
                    height: 100%;
                    border-radius: 10px;
                  }
                }
              }
              .text {
                font-size: 15px;
                margin: 5px 0;
                font-weight: 600;
                b {
                  color: #999;
                }
              }
            }
            .right {
              height: 100%;
              @include box-center;
              img {
                left: 10px;
                display: block;
                max-width: 80%;
                margin-left: 10px;
                max-height: 100%;
                z-index: 1;
                box-shadow: 1px 1px 1px #666;
              }
              .img-box {
                width: 90%;
                height: 100%;
                position: relative;
                .bg {
                  position: absolute;
                  width: 40%;
                  height: 30%;
                  background: #98b7f0;
                  bottom: 0;
                  z-index: 0;
                }
              }
            }
            .driverLeft {
              width: 70%;
              height: 100%;
              .title {
                font-size: 26px;
              }
              .text {
                margin: 10px 0;
                b {
                  color: #999;
                }
              }
            }
            .driverRight {
              width: 30%;
              height: 100%;
              .img-box {
                width: 90%;
                height: 100%;
                position: relative;
                .bg {
                  position: absolute;
                  width: 40%;
                  height: 30%;
                  background: #98b7f0;
                  bottom: 0;
                  z-index: 0;
                }
                img {
                  position: absolute;
                  bottom: 10px;
                  left: 10px;
                  display: block;
                  width: calc(100% - 10px);
                  height: calc(100% - 10px);
                  max-width: 100%;
                  max-height: 100%;
                  z-index: 1;
                }
              }
            }
          }
          .info-bottom {
            width: 100%;
            height: calc(50% - 5px);
            background: #f5f5f5;
            padding: 0 10px;
            @include box-center($justify: flex-start, $align: center);

            flex-wrap: wrap;
            div {
              color: #999999;
              @include ellipsis($substract: 75%);
              span {
                color: #333333;
              }
            }
          }
        }
      }
    }
  }

  .content-bottom {
    height: 130px;
    padding: 0px 10px;
    font-size: 14px;
    @include box-center($justify: space-between, $align: center);

    .bottom-left {
      height: 100%;
      width: 100%;
      background: #fff;
      .info-title {
        width: 100%;
        height: 30px;
        background: #3c86f4;
        color: #fff;
        line-height: 30px;
        display: flex;
        justify-content: space-around;
      }
      .info-box {
        height: calc(100% - 30px);
        @include box-center($justify: space-between, $align: center);
        .info {
          height: 100%;
          padding: 10px;
          border-left: 1px solid #ccc;
          span {
            color: #999;
            text-align: center;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
    .bottom-right {
      width: calc(30% - 10px);
      height: 100%;
      background: #fff;
      .btn {
        cursor: pointer;
        @include box-center($justify: center, $align: center);
        height: 100%;
        text-align: center;
        background: #fac632;
        font-size: 25px;
        font-weight: 600;
        letter-spacing: 3px;
        img {
          width: 30px;
          margin-right: 20px;
        }
      }
    }
    .content-info {
      height: 100%;

      .__view {
        @include box-center($justify: flex-start, $align: center);
        flex-grow: 1;
        flex-wrap: wrap;
      }

      .info-cell {
        padding: 5px 10px;
        color: #999999;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        align-items: center;
        white-space: nowrap;
        span {
          display: inline-block;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pingzheng {
          cursor: pointer;
          width: 30px;
        }
        .fujian {
          height: 80px;
        }
      }
    }
    .dispose-btn {
      color: #ffffff;
      font-size: 14px;
      text-align: center;

      div {
        margin: 5px 0;
        padding: 10px 15px;
        background: $primary-color;
        border-bottom-left-radius: 8px;
        border-top-left-radius: 8px;
        cursor: pointer;
      }
      img {
        width: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
