<template>
  <div v-show="value" class="track-record">
    <div class="popup-title">
      <span class="plate"
        ><span :class="plateClass(row)">{{ row.cph }}</span
        >轨迹记录</span
      >
      <!-- <img src="~A/daily/guanbi.png" @click="close" /> -->
    </div>
    <div class="popup-mian">
      <div class="right-map">
        <div class="map-box">
          <baidu-map
            class="map"
            :center="center"
            :zoom="zoom"
            :scroll-wheel-zoom="true"
            :ak="mapak"
            @ready="mapReady"
          >
            <bm-map-type
              :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
              anchor="BMAP_ANCHOR_TOP_LEFT"
            ></bm-map-type>
            <bm-info-window
              :position="{ lng: alarmBot.longitude, lat: alarmBot.latitude }"
              :show="infoWindow"
              :height="160"
            >
              <div class="top-info">
                <div>
                  <p>{{ alarmBot.beginTime }}</p>
                  <span>{{ alarmBot.roadName }}</span>
                </div>
                <span class="velocity">
                  <b>{{ alarmBot.velocity }}</b> km/h
                </span>
              </div>
              <div class="bottom-info">
                <span style="color: red;">{{ alarmBot.alarmType }}</span>
                <span>
                  限定速度:
                  <b style="font-size: 20px;font-family: 'Flip Flop';">
                    {{ alarmBot.limited }}
                  </b>
                  km/h
                </span>
              </div>
            </bm-info-window>
            <bm-marker
              v-for="item in alarmList"
              :key="item.key"
              :position="{ lng: item.longitude, lat: item.latitude }"
              :icon="iconAlarm"
              @click="clickIcon(item)"
            ></bm-marker>
            <bm-polyline
              v-if="
                showTrajectoryList != null && showTrajectoryList.length != 0
              "
              :path="showTrajectoryList"
              stroke-color="#1067ff"
              :stroke-weight="10"
              :stroke-opacity="0.8"
            ></bm-polyline>
            <bml-lushu
              v-if="
                showTrajectoryList != null && showTrajectoryList.length != 0
              "
              :path="showTrajectoryList"
              :icon="row.icon"
              :play="bmllushu.play"
              :enableRotation="true"
              :speed="2000"
              :autoView="true"
            >
              <div>rueituiertyuiryurtyioui</div>
            </bml-lushu>
          </baidu-map>
          <div class="play-box">
            <img
              v-show="!bmllushu.play"
              src="~A/daily/paly.png"
              @click="bmllushu.play = true"
            />
            <img
              v-show="bmllushu.play"
              src="~A/daily/pause.png"
              @click="bmllushu.play = false"
            />
          </div>
        </div>
      </div>
      <div class="left-list">
        <div class="left-list-top">
          <div class="play-box">
            <div style="margin-right:1rem;">
              <i-date
                v-model="beginTime"
                type="datetime"
                style="width: 160px;"
                placeholder="选择开始时间"
              ></i-date>
            </div>
            <div style="margin-right:1rem;">
              <i-date
                v-model="endTime"
                :options="options"
                type="datetime"
                style="width: 160px"
                placeholder="选择结束时间"
              ></i-date>
            </div>
            <div class="button" @click="trackPlay()">确定</div>
          </div>
          <div class="buttom-box">
            <!-- <scroll> -->
            <div class="info-box vehicle">
              <div class="info-title">车辆信息</div>
              <div class="info">
                <div v-for="(item, index) in vehicleInfo" :key="index">
                  <span>{{ item.text }}:</span>
                  <span>{{ row[item.field] }}</span>
                </div>
              </div>
            </div>
            <div class="info-box location">
              <div class="info-title">定位信息</div>
              <div class="info">
                <!-- <div style="margin-right:0;">起点——</div> -->
                <div>
                  <span>地理位置(起点)：</span>
                  <span>{{ beginPlace }}</span>
                </div>
                <div>
                  <span>定位时间(起点)：</span>
                  <span>{{ beginGpsTime }}</span>
                </div>
                <!-- <div style="margin-right:0;">终点——</div> -->
                <div>
                  <span>地理位置(终点)：</span>
                  <span>{{ endPlace }}</span>
                </div>
                <div>
                  <span>定位时间(终点)：</span>
                  <span>{{ endGpsTine }}</span>
                </div>
              </div>
            </div>
            <div class="info-box alarm">
              <div class="info-title">报警信息</div>
              <div class="info">
                <div v-for="(item, index) in trackAlarmInfo" :key="index">
                  <span>{{ item.text }}:</span>
                  <span :style="'color:' + item.color">
                    {{ alarmBot[item.field]
                    }}{{ alarmBot[item.field] && item.unit }}
                  </span>
                </div>
              </div>
            </div>
            <!-- </scroll> -->
          </div>
        </div>
        <div class="table-box">
          <e-chart class="chart" :options="alarmChart" autoresize></e-chart>
        </div>
      </div>
    </div>
    <div class="popup-foot">
      <span @click="close"
        ><img src="../../../assets/daily/取消.png" alt="" /> 关闭</span
      >
    </div>
  </div>
</template>

<script>
import map from "@/mixin/map";
import axios from "axios";
import dayjs from "dayjs";
import {
  trackAlarmInfo,
  locationInfo,
  vehicleInfo,
  alarmChart,
} from "@/const/monitor";
import { statusOption } from "@/const/alarm";
import { getAlarmPoint } from "@/api/daily/alarm";
import { getAvgTrend } from "@/api/daily/monitor";
import { getAlarmTimeData } from "@/api/daily/monitor";
export default {
  name: "track-record",
  mixins: [map],
  props: {
    row: {
      type: Object,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      trackAlarmInfo,
      locationInfo,
      vehicleInfo,
      beginTime: "",
      endTime: "",
      // 地图轨迹，起始标志，缩放，中心，路书图标
      path: [],
      starMarker: {},
      endMarker: {},
      vehicleStat: {},
      place: "",
      zoom: 13,
      center: { lng: 87.591802, lat: 43.82712 },
      alarmChartData: [],
      scale: [],
      showTrajectoryList: [],
      iconAlarm: {
        url: require("A/icon/icon-alarm.png"),
        size: { width: 36, height: 36 },
        opts: { anchor: { width: 27, height: 13, color: "red" } },
      },
      bmllushu: {
        play: false,
      },
      alarmList: [],
      alarmBot: {},
      infoWindow: false,
      beginGpsTime: {},
      endGpsTine: {},
      beginPlace: "",
      endPlace: "",
      options: {
        disabledDate: (time) => {
          // 可通过箭头函数的方式访问到this
          return (
            time.getTime() < this.beginTime ||
            time.getTime() > dayjs(this.beginTime).add(1, "day")
          );
        },
      },
      icons: null,
    };
  },
  computed: {
    alarmChart() {
      return alarmChart(this.alarmChartData, this.scale);
    },
  },
  watch: {
    row(data) {
      this.alarmBot = [];
      let time = dayjs(data.gpstime);
      this.row.beginTime = time
        .subtract(4, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
      this.row.endTime = time.format("YYYY-MM-DD HH:mm:ss");
      this.beginTime = this.row.beginTime;
      this.endTime = this.row.endTime;
      if (
        this.beginTime === "Invalid Date" ||
        this.endTime === "Invalid Date"
      ) {
        this.$message.error("请重新选择日期···");
      } else {
        this.palyRecord();
        this.getAvgTrend();
        this.bmllushu.play = false;
      }
    },
    endTime() {
      let days = dayjs(this.endTime).diff(dayjs(this.beginTime), "hour");
      if (days < 4) {
        this.$modal.error({
          title: "错误",
          content: "请最少选择 4 小时",
        });
      }
    },
  },
  mounted() {},
  methods: {
    plateClass(row) {
      return [
        "plate-number",
        {
          "bg-yellow": row.platecolor == "黄色",
          "bg-bule": row.platecolor == "蓝色",
          "bg-green": row.platecolor == "绿色",
          "bg-white": row.platecolor == "白色",
          "bg-black": row.platecolor == "黑色",
        },
      ];
    },
    reset() {
      this.bmllushu.play = false;
    },
    pause() {
      this.bmllushu.play = false;
    },
    close() {
      this.$emit("input", false);
    },
    trackPlay() {
      this.row.beginTime = dayjs(this.beginTime).format("YYYY-MM-DD HH:mm:ss");
      this.row.endTime = dayjs(this.endTime).format("YYYY-MM-DD HH:mm:ss");
      this.palyRecord();
      this.getAvgTrend();
      this.bmllushu.play = false;
    },
    clickIcon(data) {
      console.log(data);
      this.alarmBot = data;
      this.infoWindow = true;
    },
    getAlarmTimeData() {
      let params = {
        beginTime: this.row.beginTime,
        endTime: this.row.endTime,
        company: this.row.company,
        plateNumber: this.row.cph,
        color: this.row.platecolor,
      };
      getAlarmTimeData(params).then((res) => {
        let data = res.data.data;
        let statusMap = {};
        statusOption.forEach((item) => (statusMap[item.value] = item.label));
        this.alarmList = data.driver.concat(data.gps);
        this.alarmList.forEach((item) => {
          item.atNocturnal = item.atNocturnal == 0 ? "否" : "是";
          item.status = statusMap[item.status];
        });
        // 轨迹回放 报警信息
        this.clickIcon(this.alarmList[0]);
      });
    },
    getAvgTrend() {
      this.alarmChartData = [];
      this.scale = [];
      let params = {
        beginTime: this.row.beginTime,
        endTime: this.row.endTime,
        mark: 0,
        vehid: this.row.vehicleID,
        scaleNum: 12,
      };
      // getAvgTrend(params)
      //   .then((res) => {
      // res.data.data.forEach((item) => {
      //   this.alarmChartData.push(item.avgSpeed);
      //   this.scale.push(item.firstTime);
      // });
      // })
      // .catch((rej) => {
      // this.$message.error("该车无轨迹···");
      // });
    },
    palyRecord() {
      let allPoints = [];
      const { BMap } = this.MAP;
      this.showTrajectoryList = [];
      let params = {
        beginTime: this.row.beginTime,
        endTime: this.row.endTime,
        vehid: this.row.vehicleID,
        mark: 0,
      };
      getAlarmPoint(params).then((res) => {
        let data = res.data.data;
        this.beginGpsTime = data[0].gpsTime;
        this.endGpsTine = data[data.length - 1].gpsTime;
        for (let i in data) {
          if (i == 0) {
            this.zoom = 10;
            this.center.lng = data[i].longitude;
            this.center.lat = data[i].latitude;
          }
          this.showTrajectoryList.push({
            lng: data[i].longitude,
            lat: data[i].latitude,
          });
        }
        allPoints = data.map((item) => {
          return new BMap.Point(item.longitude, item.latitude);
        });
        this.setMarker(allPoints[0], require("@/assets/icon/origin.png"));
        this.setMarker(
          allPoints[allPoints.length - 1],
          require("@/assets/icon/terminus.png")
        );
        this.getAlarmTimeData();
        this.getBLocation(allPoints[0]);
        this.getELocation(allPoints[allPoints.length - 1]);
        res.data.data.forEach((item) => {
          if (item.Velocity > 0) {
            this.alarmChartData.push(item.Velocity);
            this.scale.push(item.GpsTime);
          }
        });
      });
    },
    // 设置起始坐标
    setMarker(points, img) {
      const { BMap } = this.MAP;
      let Marker = new BMap.Marker(points, {
        icon: new BMap.Icon(img, new BMap.Size(30, 60)),
      });
      this.MAP.map.addOverlay(Marker);
      // console.log(Marker);
    },
    // 根据经纬度解析地理位置
    getBLocation(data) {
      let location = data.lat + "," + data.lng;
      let ak = this.mapak;
      let output = "json";
      let coordtype = "wgs84ll";
      axios
        .get("/baidu/reverse_geocoding/v3", {
          params: { ak, output, coordtype, location },
        })
        .then((res) => {
          // this.beginPlace = res.data.result.formatted_address;
          this.beginPlace = this.row.locationName;
        });
    },
    getELocation(data) {
      let location = data.lat + "," + data.lng;
      let ak = this.mapak;
      let output = "json";
      let coordtype = "wgs84ll";
      axios
        .get("/baidu/reverse_geocoding/v3", {
          params: { ak, output, coordtype, location },
        })
        .then((res) => {
          // this.endPlace = res.data.result.formatted_address;
          this.beginPlace = this.row.locationName;
        });
    },
  },
};
</script>

<style lang="scss">
// 地图弹窗
.top-info {
  display: flex;
  font-size: 12px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
  & > div {
    p {
      font-size: 16px;
    }
    span {
      color: #999;
    }
  }

  .velocity {
    display: inline-block;
    width: 80px;
    background: red;
    color: #fff;
    line-height: 30px;
    height: 30px;
    text-align: center;
    b {
      font-family: "Flip Flop";
      font-size: 22px;
    }
  }
}
.bottom-info {
  height: 80px;
  background: #fee9ae;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #333;
}
.track-record {
  width: 100%;
  height: 100%;
  // box-shadow: 1px 0px 16px #7190ca;
  border-radius: 4px;
  .popup-title {
    width: 100%;
    height: 70px;
    line-height: 90px;
    background: url("../../../assets/daily/popu-head.png") no-repeat top;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    .plate {
      color: #333;
      font-size: 17px;
      font-weight: 600;
      .plate-number {
        width: 103px;
        height: 100%;
        display: inline-block;
        text-align: center;
        font-weight: 600;
        //  margin-right: 40px;
        line-height: 73px;
      }

      .bg-yellow {
        background: url("~A/daily/yellow.png") no-repeat;
        background-size: 95px;
        background-position: center;
        color: #333;
      }

      .bg-bule {
        background: url("~A/daily/bule.png") no-repeat;
        background-size: 95px;
        background-position: center;
        color: #fff;
      }

      .bg-green {
        background: url("~A/daily/green.png") no-repeat;
        background-size: 95px;
        background-position: center;
        color: #333;
      }

      .bg-black {
        background: url("~A/daily/black.png") no-repeat;
        background-size: 95px;
        background-position: center;
        color: #fff;
      }

      .bg-white {
        background: url("~A/daily/white.png") no-repeat;
        background-size: 95px;
        background-position: center;
        color: #333;
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
    background: #fff;
    display: flex;
    padding: 1.5rem;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    .left-list {
      height: 100%;
      width: 65%;
      margin-left: 1.5rem;
      .left-list-top {
        background: #f2f9ff;
        padding: 1.5rem;
        height: 68%;
        overflow: auto;
        .buttom-box {
          width: 100%;
          height: calc(100% - 144px);
        }
        .info-box {
          width: 100%;
          padding: 0.5rem 0;
          display: flex;
          color: #333;
          font-size: 12px;
          .info-title {
            text-align: left;
            font-weight: 600;
            font-size: 16px;
          }
          .info {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            & > div {
              display: flex;
              margin-right: 2rem;
              font-size: 15px;
              span:first-child {
                color: gray;
                font-size: 14px;
              }
            }
          }
        }
        .location,
        .vehicle,
        .alarm {
          flex-direction: column;
        }
        .play-box {
          width: 100%;
          display: flex;
          .button {
            height: 34px;
            padding: 0 2rem;
            text-align: center;
            line-height: 34px;
            background: #37a9f7;
            color: #fff;
            border-radius: 17px;
            cursor: pointer;
          }
        }
      }
      .table-box {
        width: 100%;
        height: 28.2%;
        background: #f2f9ff;
        margin-top: 1.5rem;
        overflow: auto;
      }
    }
    .right-map {
      height: 100%;
      width: 45%;
      .map-box {
        width: 100%;
        height: 100%;
        position: relative;
        .map {
          width: 100%;
          height: 100%;
        }
        .play-box {
          position: absolute;
          bottom: 10px;
          left: 10px;
        }
      }
    }
  }
  .popup-foot {
    height: 60px;
    line-height: 60px;
    background: url("../../../assets/daily/popu-foot.png") no-repeat top;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    span {
      height: 40px;
      line-height: 40px;
      font-size: 17px;
      color: #37a9f7;
      border: 1px solid #37a9f7;
      padding: 0 1.7rem;
      margin-top: 0.8rem;
      cursor: pointer;
      img {
        height: 17px;
        width: 17px;
        margin-bottom: 5px;
        margin-right: 1rem;
      }
    }
  }
}
</style>
