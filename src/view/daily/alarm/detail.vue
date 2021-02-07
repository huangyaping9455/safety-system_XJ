<template>
  <div v-show="value" class="popup-window alarm-detail">
    <div class="popup-content">
      <!-- 弹窗 title -->
      <div class="popup-title">
        <span>{{ row.plate || row.plateNumber }}</span>
        <span class="weichuli">{{
          isDispose
            ? "已处理"
            : "未处理" &&
              (isAppeal
                ? row.shensuzhuangtai === "未申诉" && row.remark == 0
                  ? "已处理"
                  : row.shensuzhuangtai
                : row.shensuzhuangtai === "申诉驳回"
                ? "申诉驳回"
                : isDispose
                ? "已处理"
                : "未处理")
        }}</span>
        <img class="close" src="~A/daily/quxiao.png" alt @click="close" />
      </div>
      <!-- 弹窗 main -->
      <div class="content map-content">
        <div class="map-video">
          <div class="content-top" id="allmap">
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
                  :content="
                    '终点: ' + row.endTime + '<br>' + '地址: ' + zhongdian
                  "
                  :labelStyle="labelOpt.style"
                  :offset="labelOpt.offset"
                />
              </bm-marker>
              <bm-marker :position="beginMarker">
                <bm-label
                  :content="
                    '起点: ' + row.beginTime + '<br>' + '地址: ' + qidian
                  "
                  :labelStyle="labelOpt.style"
                  :offset="labelOpt.offset"
                />
              </bm-marker>
              <bm-marker :position="starMarker">
                <bm-label
                  :content="
                    '开始行驶时间: ' +
                      row.calctime +
                      '<br>' +
                      '地址: ' +
                      kaishidi
                  "
                  :labelStyle="labelOpt.styleks"
                  :offset="labelOpt.offset"
                />
              </bm-marker>
              <bm-marker :position="endXSMarker">
                <bm-label
                  :content="
                    '结束行驶时间: ' + endXSTime + '<br>' + '地址: ' + jieshudi
                  "
                  :labelStyle="labelOpt.styleks"
                  :offset="labelOpt.offset"
                />
              </bm-marker>
              <bm-polyline
                :path="path"
                stroke-color="red"
                :stroke-opacity="1"
                :stroke-weight="4"
              ></bm-polyline>
              <bm-polyline
                :path="path2"
                :stroke-opacity="1"
                :stroke-weight="4"
              ></bm-polyline>
              <bm-polyline
                :path="path3"
                :stroke-opacity="1"
                :stroke-weight="4"
              ></bm-polyline>
              <!-- <bml-lushu
                :path="path2"
                :icon="icon"
                :play="play"
                :rotation="true"
              ></bml-lushu> -->
              <!-- <bml-lushu
                :path="path"
                :icon="icon"
                :play="play"
                :rotation="true"
              ></bml-lushu> -->
            </baidu-map>
            <div class="video-box" v-if="row.isPicture || row.isVideo">
              <span>监控视频</span>
              <div class="video">
                <div class="img-box">
                  <video :src="video" autoplay controls></video>
                </div>
                <div
                  class="img-box"
                  v-for="(src, index) in picture"
                  :key="index"
                  style="padding-left:0.5rem"
                >
                  <img :src="src" />
                </div>
              </div>
            </div>
          </div>
          <div class="topLeft-box">
            <div class="tab-main">
              <!-- 车辆资料 -->
              <div v-show="currentTab.slot == 'vehicle'" class="vehicle">
                <div class="info-top">
                  <div class="left">
                    <div class="imgs">
                      <img src="~A/daily/zanwuzhaopian.png" alt />
                    </div>
                    <span class="title">{{
                      row.plate || row.plateNumber
                    }}</span>
                    <div
                      v-for="(item, index) in vehicle"
                      :key="index"
                      class="text"
                    >
                      {{ item.title }}：
                      <span>{{ item.value }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 驾驶员资料 -->
              <div v-show="currentTab.slot == 'driver'" class="vehicle">
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
            <!-- </div> -->
            <!-- </div> -->
            <div class="content-bottom">
              <!-- 情况分析 判断标准 -->
              <div class="bottom-left">
                <div class="info-title">
                  <span>
                    <button
                      @click="QKclick"
                      ref="fenxi"
                      style="background-color:#37a9f7;color:#fff;"
                    >
                      情况分析
                    </button>
                    <button @click="TSclick" ref="xiaoxi">提醒消息</button>
                    <button
                      @click="CLclick"
                      v-if="
                        (row.shensuzhuangtai !== '未申诉' &&
                          row.dealType !== '未处理') ||
                          (row.chulizhuangtai !== '未处理' &&
                            row.dealType !== '未处理')
                      "
                      ref="chuli"
                    >
                      处理信息
                    </button>
                  </span>
                  <span>{{ active.text }} - 标准判断</span>
                </div>
                <div class="info-box">
                  <div v-if="QKFX" class="content-info">
                    <!-- <scroll style="width:99%;"> -->
                    <div
                      v-for="(item, index) in infolist"
                      :key="index"
                      class="info-cell"
                    >
                      {{ item.title }}：
                      <span>{{ item.value }}</span>
                    </div>
                    <!-- </div> -->
                    <!-- </scroll> -->
                  </div>
                  <div v-if="TXXX" class="content-info" style="padding:10px;">
                    <!-- <scroll> -->
                    <el-table :data="tableData" border class="mainTable">
                      <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="50"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="time"
                        align="center"
                        width="180"
                        label="时间"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="lastSpeed"
                        align="center"
                        width="100"
                        label="速度(km/h)"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="messageType"
                        align="center"
                        label="类型"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="message"
                        align="center"
                        :show-overflow-tooltip="(showOverflowTooltip = true)"
                        label="内容"
                      >
                      </el-table-column>
                    </el-table>
                    <!-- </scroll> -->
                  </div>
                  <div v-if="CLXX" class="content-info">
                    <div
                      v-if="
                        isAppeal
                          ? 'isAppeal'
                          : row.shensuzhuangtai == '申诉驳回'
                          ? true
                          : false
                      "
                      class="bottom-right"
                    >
                      <div class="content-info w100">
                        <div class="info-cell w50">
                          申诉形式：
                          <span>{{ imgList.chulixingshi }}</span>
                        </div>
                        <div class="info-cell w100">
                          申诉内容：
                          <i-tooltip
                            placement="top"
                            :content="imgList.chulimiaoshu"
                          >
                            <span>{{ imgList.chulimiaoshu }}</span>
                          </i-tooltip>
                        </div>
                        <div class="info-cell w50">
                          申诉人：
                          <span>{{ imgList.chuliren }}</span>
                        </div>
                        <div class="info-cell w50">
                          申诉时间：
                          <span>{{ imgList.chulishijian }}</span>
                        </div>
                        <div class="info-cell w50">
                          申诉凭证：
                          <span v-if="imgList.fujian !== ''">
                            <i-poptip placement="top">
                              <img src="~A/daily/ping.png" class="pingzheng" />
                              <div slot="content">
                                <img
                                  v-for="(item, index) in arryImg"
                                  :key="index"
                                  class="fujian"
                                  :src="arryImg[index]"
                                  alt
                                />
                              </div>
                            </i-poptip>
                          </span>
                        </div>
                        <div class="info-cell w50">
                          申诉审核人：
                          <span>{{ imgList.shensushenheren }}</span>
                        </div>
                        <div class="info-cell w50">
                          申诉审核时间：
                          <span>{{ imgList.shensushenheshijian }}</span>
                        </div>
                        <div class="info-cell w50">
                          申诉意见：
                          <span>{{ imgList.shensushenheyijian }}</span>
                        </div>
                        <div
                          class="info-cell w50"
                          v-if="imgList.twicechulixingshi !== ''"
                        >
                          二次处理方式：
                          <span>{{ imgList.twicechulixingshi }}</span>
                        </div>
                        <div
                          class="info-cell w100"
                          v-if="imgList.twicechulimiaoshu !== ''"
                        >
                          二次处理内容：
                          <i-tooltip
                            placement="top"
                            :content="imgList.twicechulimiaoshu"
                          >
                            <span>{{ imgList.twicechulimiaoshu }}</span>
                          </i-tooltip>
                        </div>
                        <div
                          class="info-cell w50"
                          v-if="imgList.twicechuliren !== ''"
                        >
                          二次处理人：
                          <span>{{ imgList.twicechuliren }}</span>
                        </div>
                        <div
                          class="info-cell w50"
                          v-if="imgList.twicechulishijian !== ''"
                        >
                          二次处理时间：
                          <span>{{ imgList.twicechulishijian }}</span>
                        </div>
                        <div
                          class="info-cell w50"
                          v-if="imgList.twicefujian !== ''"
                        >
                          二次处理凭证：
                          <span v-if="imgList.twicefujian !== ''">
                            <i-poptip placement="top">
                              <img src="~A/daily/ping.png" class="pingzheng" />
                              <div slot="content">
                                <img
                                  v-for="(item, index) in arryImgtwice"
                                  :key="index"
                                  class="fujian"
                                  :src="arryImgtwice[index]"
                                  alt
                                />
                              </div>
                            </i-poptip>
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- 处理情况 -->
                    <div v-if="isDispose" class="bottom-right">
                      <div
                        class="content-info w100"
                        style="max-height: 328px;overflow-y: auto;"
                      >
                        <div class="info-cell w50">
                          处理方式：
                          <span>{{ imgList.chulixingshi }}</span>
                        </div>
                        <div class="info-cell w100">
                          处理内容：
                          <i-tooltip
                            placement="top"
                            :content="imgList.chulimiaoshu"
                          >
                            <span>{{ imgList.chulimiaoshu }}</span>
                          </i-tooltip>
                        </div>
                        <div class="info-cell w50">
                          处理人：
                          <span>{{ imgList.chuliren }}</span>
                        </div>
                        <div class="info-cell w50">
                          处理时间：
                          <span>{{ imgList.chulishijian }}</span>
                        </div>
                        <div class="info-cell w50">
                          处理凭证：
                          <span v-if="imgList.fujian !== ''">
                            <i-poptip placement="top">
                              <img src="~A/daily/ping.png" class="pingzheng" />
                              <div slot="content">
                                <img
                                  v-for="(item, index) in arryImg"
                                  :key="index"
                                  class="fujian"
                                  :src="arryImg[index]"
                                  alt
                                />
                              </div>
                            </i-poptip>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="info">
                    <scroll>
                      <div>{{ active.standard }}</div>
                    </scroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span
          @click="appealClick"
          v-if="
            !isDispose &&
              !isAppeal &&
              !(row.dealType && row.dealType !== '未处理') &&
              row.shensuzhuangtai !== '申诉驳回'
          "
          ><img src="~A/daily/alarmchuli.png" alt="" />申诉</span
        >
        <span
          @click="editClick"
          v-if="
            (!isDispose &&
              !isAppeal &&
              !(row.dealType && row.dealType !== '未处理')) ||
              (row.dealType && row.dealType == '申诉驳回')
          "
          ><img src="~A/daily/alarmchuli.png" alt="" />处理</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAlarmPoint,
  getAlarmImg,
  getAlarmVehicle,
  getAlarmDetail,
  getAlarmGuIdList,
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
    appeal: {
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
      path2: [],
      path3: [],
      starMarker: {},
      endMarker: {},
      beginMarker: {},
      endXSMarker: {},
      endXSTime: "",
      qidian: null,
      zhongdian: null,
      kaishidi: null,
      jieshudi: null,
      QKFX: true,
      TXXX: false,
      CLXX: false,
      tableData: [],
      arryImg: "",
      arryImgtwice: "",
      labelOpt: {
        style: { color: "red", fontSize: "14px", padding: "0 5px" },
        styleks: { color: "blue", fontSize: "14px", padding: "0 5px" },
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
      return (
        ((this.row.chulizhuangtai === "已处理" && this.row.remark == 1) ||
          (this.row.chulizhuangtai == 1 && this.row.remark == 1)) &&
        this.dispose
      );
    },
    isAppeal() {
      if (this.row.shensuzhuangtai === "申诉驳回") {
        return false;
      } else if (
        this.row.shensuzhuangtai === "已申诉" ||
        this.row.shensuzhuangtai === "审核中" ||
        this.row.shensuzhuangtai === "申诉通过" ||
        (this.row.shensuzhuangtai === "未申诉" && this.row.remark === 0)
      ) {
        return true;
      }
      // return (
      //   this.row.shensuzhuangtai == "已申诉" ||
      //   this.row.shensuzhuangtai == "审核中" ||
      //   this.row.shensuzhuangtai == "申诉通过"
      //   // ||this.row.shensuzhuangtai == "申诉驳回"
      // );
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
        return show == undefined ||
          (show == "pilao" &&
            this.active.type === "GPS" &&
            this.active.text === "疲劳驾驶报警")
          ? true
          : this.active.key == show;
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
      if (this.active.type == "driver" || this.active.type == "driv") {
        let time = dayjs(this.row.gpsTime);
        this.row.beginTime = time
          .subtract(2, "minute")
          .format("YYYY-MM-DD HH:mm:ss");
        this.row.endTime = time.add(1, "minute").format("YYYY-MM-DD HH:mm:ss");
      }
      this.getData();
    },
  },
  mounted() {
    let mapheight = document.getElementsByClassName("map")[0];
    if (this.row.isPicture || this.row.isVideo) {
      mapheight.style.height = "60%";
    } else {
      mapheight.style.height = "100%";
    }
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
      if (
        this.row._disabled == true ||
        (this.row.dealType &&
          this.row.dealType !== "申诉驳回" &&
          this.row.dealType !== "未处理")
        //  ||(this.row.dealType && this.row.dealType !== "未处理")
      ) {
        this.$message.warning("不能处理该报警信息");
      } else {
        this.$emit("dispose", [this.row]);
      }
    },
    appealClick() {
      if (
        this.row._disabled == true ||
        (this.row.dealType && this.row.dealType !== "未处理")
      ) {
        this.$message.warning("不能申诉该报警信息");
      } else {
        this.$emit("appeal", [this.row]);
      }
    },
    // 获取报警点位信息
    getData() {
      this.getAlarmPoint();
      this.getAlarmImg();
      this.getAlarmVehicle();
      this.getAlarmGuId();
      this.getAlarmDetail();
    },
    // 获取报警点位信息
    getAlarmPoint() {
      const { map } = this.MAP;
      this.path = [];
      this.loading = true;
      this.play = false;
      setTimeout(() => {
        // 起点——>终点
        let params = {
          beginTime: this.row.beginTime,
          endTime: this.row.endTime,
          vehid: this.row.vehID || this.row.vehId,
          mark: this.active.type == "GPS" ? 0 : 1,
        };
        if (this.active.text == "疲劳驾驶报警") {
          this.getKSD();
          this.getJSD();
        }
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
              this.beginMarker = {
                lng: data[0].longitude,
                lat: data[0].latitude,
              };
              // js解析经纬度为地理位置
              let pointqidian = new BMap.Point(
                this.beginMarker.lng,
                this.beginMarker.lat
              );
              let pointzhongdian = new BMap.Point(
                this.endMarker.lng,
                this.endMarker.lat
              );
              let gc = new BMap.Geocoder();
              let qidian;
              let zhongdian;
              let _this = this;
              gc.getLocation(pointqidian, function(rs) {
                qidian = rs.address;
                _this.qidian = qidian;
              });
              gc.getLocation(pointzhongdian, function(rs) {
                zhongdian = rs.address;
                _this.zhongdian = zhongdian;
              });
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
    // 开始行驶时间
    getKSD() {
      const { map } = this.MAP;
      // 开始行驶时间——>起点
      let paramss = {
        beginTime: this.row.calctime,
        endTime: this.row.beginTime,
        vehid: this.row.vehID || this.row.vehId,
        mark: this.active.type == "GPS" ? 0 : 1,
      };
      // 开始行驶时间
      getAlarmPoint(paramss).then((res) => {
        const data = res.data.data;
        if (data.length > 0) {
          this.path2 = this.mapPoints(data);
          const view = map.getViewport(this.path2);
          if (this.path2.length > 0) {
            this.starMarker = {
              lng: data[0].longitude,
              lat: data[0].latitude,
            };
            // js解析经纬度为地理位置
            let pointkaishidi = new BMap.Point(
              this.starMarker.lng,
              this.starMarker.lat
            );
            let gc = new BMap.Geocoder();
            let kaishidi;
            let _this = this;
            gc.getLocation(pointkaishidi, function(rs) {
              kaishidi = rs.address;
              _this.kaishidi = kaishidi;
            });
          }
        }
        this.loading = false;
      });
    },
    // 结束地点
    getJSD() {
      const { map } = this.MAP;
      // 终点——>结束时间
      this.endXSTime = dayjs(this.row.endTime)
        .add(10, "minute")
        .format("YYYY-MM-DD HH:mm:ss");
      let paramsEnd = {
        beginTime: this.row.endTime,
        endTime: this.endXSTime,
        vehid: this.row.vehID || this.row.vehId,
        mark: this.active.type == "GPS" ? 0 : 1,
      };
      // 结束行驶时间
      getAlarmPoint(paramsEnd).then((res) => {
        const data = res.data.data;
        if (data.length > 0) {
          this.path3 = this.mapPoints(data);
          const view = map.getViewport(this.path3);
          if (this.path3.length > 0) {
            this.endXSMarker = {
              lng: data[data.length - 1].longitude,
              lat: data[data.length - 1].latitude,
            };
            // js解析经纬度为地理位置
            let pointjieshudi = new BMap.Point(
              this.endXSMarker.lng,
              this.endXSMarker.lat
            );
            let gc = new BMap.Geocoder();
            let jieshudi;
            let _this = this;
            gc.getLocation(pointjieshudi, function(rs) {
              jieshudi = rs.address;
              _this.jieshudi = jieshudi;
            });
          }
        }
        this.loading = false;
      });
    },
    // 获取报警视频图片
    getAlarmImg() {
      if (this.row.isPicture || this.row.isVideo) {
        getAlarmImg({
          alarmNumber: this.row.alarmNumber,
          alarmType: this.row.alarmType,
        }).then((res) => {
          let data = res.data.data;
          this.picture = data.Picture;
          this.video = data.Video;
          this.loading = false;
        });
      } else {
        return;
      }
    },
    // 获取驾驶员资料，车辆资料
    getAlarmVehicle() {
      getAlarmVehicle({
        cheliangpaizhao: this.row.plate || this.row.plateNumber,
        chepaiyanse: this.row.color, //vehicleInfo ; this.row.color
      }).then((res) => {
        this.driverInfo = res.data.data.jiashiyuan;
        if (
          res.data.data.cheliang.jiashiyuandianhua == -1 ||
          res.data.data.cheliang.yayunyuandianhua == -1 ||
          res.data.data.cheliang.chezhudianhua == -1 ||
          res.data.data.cheliang.changpai == "null" ||
          res.data.data.cheliang.chejiahao == "null" ||
          res.data.data.cheliang.chepaiyanse == "null" ||
          res.data.data.cheliang.shiyongxingzhi == "null" ||
          res.data.data.cheliang.jiashiyuanxingming == "null" ||
          res.data.data.cheliang.jiashiyuandianhua == "null" ||
          res.data.data.cheliang.yayunyuanxingming == "null" ||
          res.data.data.cheliang.chezhu == "null" ||
          res.data.data.cheliang.chezhudianhua == "null" ||
          res.data.data.cheliang.operatType == "null" ||
          res.data.data.cheliang.hedingzaike == "null" ||
          res.data.data.cheliang.cheliangzhuangtai == "null" ||
          res.data.data.cheliang.zongduanxinghao == "null" ||
          res.data.data.cheliang.chejiahao == "null" ||
          res.data.data.cheliang.changpai == "null" ||
          res.data.data.cheliang.yunyingshangmingcheng == "null"
        ) {
          res.data.data.cheliang.jiashiyuandianhua = "";
          res.data.data.cheliang.yayunyuandianhua = "";
          res.data.data.cheliang.chezhudianhua = "";
          res.data.data.cheliang.changpai = "";
          res.data.data.cheliang.chejiahao = "";
          res.data.data.cheliang.chepaiyanse == "";
          res.data.data.cheliang.shiyongxingzhi == "";
          res.data.data.cheliang.jiashiyuanxingming == "";
          res.data.data.cheliang.yayunyuanxingming == "";
          res.data.data.cheliang.chezhu == "";
          res.data.data.cheliang.operatType == "";
          res.data.data.cheliang.hedingzaike == "";
          res.data.data.cheliang.cheliangzhuangtai == "";
          res.data.data.cheliang.zongduanxinghao == "";
          res.data.data.cheliang.yunyingshangmingcheng == "";
        }
        this.vehicleInfo = res.data.data.cheliang;
      });
    },
    // 获取报警详情
    getAlarmDetail() {
      if (this.imgList.length > 0) return;
      getAlarmDetail({
        baojingid: this.row.alarmReportID,
        type: this.active.type == "GPS" ? 1 : 0,
      }).then((res) => {
        this.imgList = res.data.data;
        if (res.data.data.fujian) {
          let arry = res.data.data.fujian.replace(/\,$/g, "").split(",");
          this.arryImg = arry;
          let arryy = res.data.data.twicefujian.replace(/\,$/g, "").split(",");
          this.arryImgtwice = arryy;
        }
      });
    },
    // 提醒消息
    getAlarmGuId() {
      if (this.row.alarmGuid == "") return (this.tableData = []);
      getAlarmGuIdList({
        alarmGuId: this.row.alarmGuid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        } else {
          this.tableData = [];
        }
      });
    },
    // 情况分析 点击
    QKclick() {
      if (this.$refs.chuli) {
        this.$refs.chuli.style.backgroundColor = "";
        this.$refs.chuli.style.color = "black";
      }
      this.$refs.fenxi.style.backgroundColor = "#37a9f7";
      this.$refs.xiaoxi.style.backgroundColor = "";
      this.$refs.fenxi.style.color = "#fff";
      this.$refs.xiaoxi.style.color = "black";
      this.QKFX = true;
      this.TXXX = false;
      this.CLXX = false;
    },
    // 提示信息 点击
    TSclick() {
      if (this.$refs.chuli) {
        this.$refs.chuli.style.backgroundColor = "";
        this.$refs.chuli.style.color = "black";
      }
      this.$refs.fenxi.style.backgroundColor = "";
      this.$refs.xiaoxi.style.backgroundColor = "#37a9f7";
      this.$refs.fenxi.style.color = "black";
      this.$refs.xiaoxi.style.color = "#fff";
      this.QKFX = false;
      this.TXXX = true;
      this.CLXX = false;
    },
    // 提示信息 点击
    CLclick() {
      this.$refs.fenxi.style.backgroundColor = "";
      this.$refs.xiaoxi.style.backgroundColor = "";
      this.$refs.chuli.style.backgroundColor = "#37a9f7";
      this.$refs.fenxi.style.color = "black";
      this.$refs.xiaoxi.style.color = "black";
      this.$refs.chuli.style.color = "#fff";
      this.QKFX = false;
      this.TXXX = false;
      this.CLXX = true;
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
.alarm-detail {
  .popup-content {
    min-width: 1200px;
    min-height: 600px;
    width: 80%;
    height: 80%;
    margin-bottom: 2rem;
  }
  .popup-title {
    height: 60px;
    line-height: 60px;
    position: relative;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    background: url("~A/daily/popu-head.png") no-repeat top center;
    background-size: 100% 100%;
    span:first-child {
      color: #3383ef;
      font-weight: 700;
      font-size: 24px;
      line-height: 70px;
      margin-right: 0.5rem;
    }

    .close {
      height: 25px;
      position: absolute;
      top: 27px;
      right: 10px;
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
      padding: 3px 10px;
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
    height: 60px;
    line-height: 50px;
    position: relative;
    font-size: 16px;
    color: #37a9f7;
    text-align: center;
    background: url("~A/daily/popu-foot.png") no-repeat bottom center;
    background-size: 100% 100%;
    span {
      padding: 0.5rem 2rem;
      margin: 0 2rem;
      text-align: center;
      font-size: 17px;
      border: 1px solid #37a9f7;
      cursor: pointer;
      background-color: #37a9f7;
      color: white;
      img {
        width: 17px;
        height: 17px;
        margin-right: 1.5rem;
      }
    }
  }

  .content {
    height: calc(100% - 80px);
    color: #333333;
    background: #f5f5f5;
    display: flex;
    // flex-direction: column;
  }

  // 地圖
  .map-video {
    width: 100%;
    height: calc(100%);
    padding: 10px;
    // background: #eee;
    background: white;
    display: flex;
    justify-content: space-between;
    position: relative;
    .content-top {
      width: calc(50% - 5px);
      height: 100%;
      .map {
        width: 100%;
        height: 60%;
      }
      .video-box {
        width: 100%;
        height: 40%;
        margin-top: 1rem;
        padding: 1rem 0;
        border-radius: 10px;
        background-color: #f5f5f5;
        span {
          padding: 0 1rem;
        }
        .video {
          display: flex;
          height: 100%;
          padding: 1rem;
          .img-box {
            padding-bottom: 2rem;
            width: calc(100% / 4);
            height: 100%;
          }
          video,
          img {
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .topLeft-box {
      width: calc(50% - 5px);
      height: 100%;
      border-radius: 4px;
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
        height: 41%;
        background: #f5f5f5;
        border-radius: 10px;
        margin: 0 auto;

        .vehicle {
          width: 100%;
          height: 100%;

          .info-top {
            width: 100%;
            height: calc(100% - 5px);
            padding: 1rem;
            @include box-center($justify: space-between, $align: center);
            .left {
              width: 100%;
              display: grid;
              grid-auto-flow: row dense;
              grid-template-columns: 33% 2fr 2fr;
              // grid-template-rows: repeat(7, 8%);
              .imgs {
                width: auto;
                height: auto;
                margin-right: 1rem;
                margin-bottom: 1rem;
                background-color: white;
                grid-row-start: span 6;
                img {
                  width: 80%;
                  height: 150px;
                  margin: auto 10%;
                }
              }
              .title {
                font-size: 25px;
                color: #3383ef;
                font-weight: 700;
                grid-column-start: span 2;
                // width: 100%;
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
                font-weight: 600;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 200px;
                span {
                  display: inline-block;
                  color: #7e6d6d;
                  // overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                // font-size: 14px;
                // margin: 10px 0;
                // font-weight: 500;
                // b,
                // strong {
                //   // color: #999;
                // }
              }
            }
            .right {
              height: 100%;
              width: 30% !important;
              display: flex;
              padding-right: 1rem;
              img {
                left: 10px;
                display: block;
                max-width: 100%;
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
            height: calc(100% - 5px);
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
    height: 49.5%;
    padding: 0px 10px;
    font-size: 14px;
    margin-top: 1rem;
    @include box-center($justify: space-between, $align: center);

    .bottom-left {
      height: 100%;
      width: 100%;
      // background: #fff;
      .info-title {
        width: 98%;
        // height: 30px;
        color: #fff;
        line-height: 30px;
        display: flex;
        justify-content: space-around;
        span:first-of-type {
          width: 60%;
          display: flex;
          background: #f5f5f5;
          justify-content: center;
          border-radius: 10px 10px 0 0;
          padding: 1rem;
          margin-left: -7px;
          button {
            width: 50%;
            margin: 0 0.2rem;
            padding: 0.1rem;
            font-size: 15px;
            display: flex;
            justify-content: center;
            line-height: 22px;
            border-radius: 8px;
          }
          button:hover {
            background-color: #a7d1f6;
            cursor: pointer;
          }
        }
        span:last-of-type {
          width: 38%;
          margin-right: -7px;
          display: flex;
          // background: #3c86f4;
          justify-content: center;
          border-radius: 10px 10px 0 0;
          background: #f5f5f5;
          color: #37a9f7;
          font-size: 16px;
          font-weight: 600;
          align-items: center;
        }
      }
      .info-box {
        height: calc(100% - 8px);
        width: 98%;
        display: flex;
        justify-content: space-between;
        .info {
          height: 100%;
          // max-height: 315px;
          width: 38%;
          padding: 0 10px;
          background: #f5f5f5;
          color: #37a9f7;
          // border: 1px solid gainsboro;
          border-radius: 0 0 10px 10px;
          span {
            // color: #999;
            text-align: center;
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
    .content-info {
      height: 100%;
      // max-height: 315px;
      width: 60%;
      background: #f5f5f5;
      border-radius: 0 0 10px 10px;
      overflow: auto;

      .info-cell {
        padding: 0.66rem 1.5rem;
        font-weight: 600;
        display: flex;
        text-overflow: ellipsis;
        align-items: center;
        white-space: nowrap;
        span {
          display: inline-block;
          color: #7e6d6d;
          // overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pingzheng {
          cursor: pointer;
          width: 30px;
        }
        .fujian {
          height: 180px;
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
.el-table {
  th,
  td {
    padding: 9px 0;
  }
}
</style>
