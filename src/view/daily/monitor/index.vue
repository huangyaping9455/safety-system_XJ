<template>
  <div class="monitor">
    <!-- 报警处理 -->
    <!-- <alarm-dispose
      v-model="isDispose"
      :selection="selection"
      :active="active"
      @dispose="dispose"
    ></alarm-dispose> -->
    <!-- 报警详情 -->
    <!-- <alarm-detail
      v-if="active.type"
      v-model="isDetail"
      :active="active"
      :row="row"
      @dispose="detailDispose"
    ></alarm-detail> -->
    <!-- 监控中心左边列表 -->
    <!-- <div class="left-list">
      <div class="vertical">
        <div class="title">
          <span class="vertical-line"></span>
          <span>今日北斗设备报警</span>
        </div>
        <div class="mian">
          <scroll>
            <div class="info-box">
              <div
                v-for="(item, index) in vehicleAlarmList"
                :key="index"
                class="info"
                @click="emitClick(item)"
              >
                <img :src="item.icon" alt />
                <span class="text">{{ item.text }}</span>
                <b :class="{ checked: isActive(item) }">
                  {{ alarmTongji[item.fild] }}
                </b>
              </div>
            </div>
          </scroll>
        </div>
      </div>
      <div class="defense">
        <div class="title">
          <span class="vertical-line"></span>
          <span>今日主动防御报警</span>
        </div>
        <div class="mian">
          <scroll>
            <div class="info-box">
              <div
                v-for="(item, index) in defenseList"
                :key="index"
                class="info"
                @click="emitClick(item)"
              >
                <img :src="item.icon" alt />
                <span class="text">{{ item.text }}</span>
                <b :class="{ checked: isActive(item) }">
                  {{ alarmTongji[item.fild] }}
                </b>
              </div>
            </div>
          </scroll>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <span class="vertical-line"></span>
          <span>
            今日
            <span class="type">{{ active.text }}</span> 实况
          </span>
        </div>

        <div class="list-box">
          <i-spin v-show="stateLoading" fix></i-spin>
          <scroll>
            <div
              v-for="(item, index) in alarmList"
              :key="index"
              class="list-info"
              @click="showDetail(item)"
            >
              <div class="top">
                <span>
                  {{ item.plate == "" ? item.plateNumber : item.plate }}
                </span>
                <b>{{ item.alarmType }}</b>
              </div>
              <div class="time">
                {{ item.beginTime == "" ? item.gpsTime : item.beginTime }}
                {{ (item.endTime = "" ? item.gpsTime : item.endTime) }}
              </div>
            </div>
            <span
              v-show="alarmList.length >= 50"
              class="more"
              @click="goAlarmDispose"
              >更多>></span
            >
          </scroll>
          <span v-show="alarmList.length == 0" class="zhanwu">暂无数据</span>
        </div>
      </div>
    </div> -->

    <!-- 表头 -->
    <div class="chunk-table">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        :class="['tab-info', { checkActive: tabIndex == index }]"
        @click="activeTab(index, item)"
      >
        <!-- <img :src="item.icon" /> -->
        <span>{{ item.text }}</span>
        <b :style="'color:' + item.color">{{
          item.text == "报警情况" ? baojingshu : vehicleStat[item.fild]
        }}</b>
      </div>
    </div>
    <div class="mian-part">
      <div class="map-table">
        <!-- 弹窗信息 -->
        <div v-show="showPop" class="pop-hide"></div>
        <div
          v-show="showPop"
          :style="'width:' + currentTab.width + ';height:' + currentTab.height"
          class="detailPopup"
        >
          <div class="popup-title">
            <!-- <span class="plate">{{ rowData.cph }}</span> -->
            <span
              v-for="(item, index) in popupTab"
              :key="index"
              :class="['popup-tab', { check: popupIndex == index }]"
              @click="activePopupTab(index, item)"
            >
              <span :class="plateClass(rowData)">
                {{ vehicleDetail.cheliangpaizhao }}
              </span>
              {{ item.text }}
            </span>
            <!-- <img src="~A/daily/guanbi.png" @click="closePopup" /> -->
          </div>
          <div class="popup-mian">
            <div v-show="currentTab.slot == 'info'" class="popup-info">
              <!-- <scroll> -->
              <div class="top">
                <div class="top-title">
                  <span class="plate">{{ rowData.cph }}</span>
                  <span class="top-type">车辆状态</span>
                  <div class="sudu">
                    <span>{{ rowData.Velocity }}</span>
                    <span>km/h</span>
                  </div>
                </div>
                <div class="left-info">
                  <div class="basis">
                    <div class="detail">
                      <div v-for="(item, index) in videoState" :key="index">
                        <span>{{ item.text }}：</span>
                        <span>{{ gpsVehicleDetail[item.field] }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="orientation">
                    <div>
                      <span>定位时间 ：</span>
                      <b>{{ rowData.gpstime }}</b>
                    </div>
                    <div>
                      <span>当前地理位置 ：</span>
                      <span>{{ place }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center">
                <!-- <div class="left-info">
                </div> -->
                <div class="img-info">
                  <div class="lien-box">
                    <div class="lien">
                      <div class="data" :style="'width:' + 30 + '%'"></div>
                      <!-- <span>三年</span> -->
                    </div>
                  </div>
                  <div class="text">
                    <b>运输介质 ：</b>
                    <span>{{ vehicleDetail.yunshujiezhi }}</span>
                  </div>
                  <div class="text">
                    <b>车辆等级 ：</b>
                    <span>{{ vehicleDetail.cheliangdengji }}</span>
                  </div>
                  <span class="zhengzhao">车辆证照</span>
                  <el-carousel :interval="5000" arrow="always" height="">
                    <el-carousel-item>
                      <img src="~A/daily/tu2.png" alt="" />
                    </el-carousel-item>
                    <el-carousel-item>
                      <img src="~A/daily/tu3.png" alt="" />
                    </el-carousel-item>
                    <el-carousel-item>
                      <img src="~A/daily/tu4.png" alt="" />
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
              <div class="buttom">
                <div class="basis-info">
                  <span>车辆基本资料</span>
                  <div class="info">
                    <div
                      v-for="(item, index) in baisInfo"
                      :key="index"
                      class="w50"
                    >
                      <span>{{ item.text }} ：</span>
                      <b>{{ vehicleDetail[item.field] }}</b>
                    </div>
                  </div>
                </div>
                <div class="right-info">
                  <!-- <img src="~A/daily/let-arrow.png" /> -->
                  <img src="~A/daily/tu1.png" />
                  <!-- <img src="~A/daily/right-arrow.png" /> -->
                </div>
              </div>
            </div>

            <div v-show="currentTab.slot == 'video'" class="video">
              <div class="video-info">
                <!-- <span>车辆状态</span> -->
                <div class="info">
                  <div class="state-msg">
                    <span>时&emsp;&emsp;速：</span>
                    <span class="state su"> {{ rowData.Velocity }} km/h </span>
                  </div>
                  <div class="state-msg">
                    <span>报警状态：</span>
                    <span class="state zt">{{ rowData.alarm }}</span>
                  </div>
                  <div class="state-msg">
                    <span>车辆状态：</span>
                    <span class="state zt">{{ rowData.zaixian }}</span>
                  </div>
                  <div class="state-info">
                    <div v-for="(item, index) in vehicleState" :key="index">
                      <span
                        >{{
                          item.text == "驾驶员"
                            ? "驾&nbsp;&nbsp;驶&nbsp;&nbsp;员"
                            : item.text
                        }}：</span
                      >
                      <span>
                        {{
                          item.field == "location"
                            ? place
                            : gpsVehicleDetail[item.field]
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="video-box">
                <iframe
                  :src="url"
                  :srcdoc="srcdoc"
                  style="width: 100%; height: 100%;"
                ></iframe>
              </div>
            </div>
            <div v-show="currentTab.slot == 'img'" class="Img">
              <div class="img-box">
                <img :src="jijingimg" @error="nofindImg" />
              </div>
              <!-- <div class="img-info">
                <span>当前地理位置：{{ place }}</span>
              </div> -->
            </div>
          </div>
          <div class="popup-foot">
            <span @click="closePopup"
              ><img src="~A/daily/quxiao.png" alt="" /> 关闭</span
            >
          </div>
        </div>
        <!-- 地图 -->
        <div class="map-box">
          <baidu-map
            class="map"
            :center="center"
            :zoom="zoom"
            @zoomend="zoomEnd"
            :scroll-wheel-zoom="true"
            :ak="mapak"
            @ready="mapReady"
          >
            <bm-map-type
              :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
              anchor="BMAP_ANCHOR_TOP_LEFT"
            ></bm-map-type>
            <bm-marker
              v-if="activeCar && Tzoom >= 11"
              :position="{ lng: center.lng, lat: center.lat }"
              :zIndex="999"
              :dragging="false"
              animation="BMAP_ANIMATION_BOUNCE"
            ></bm-marker>
            <bml-marker-clusterer :averageCenter="true" :styles="cluesterStyle">
              <bm-marker
                v-for="item in emptrMark"
                :key="item.key"
                :position="{ lng: item.longitude, lat: item.latitude }"
                :zIndex="item.mapIndex"
                :icon="item.icon"
                @click="clickCar(item)"
              >
                <bm-label
                  :content="item.cph"
                  :labelStyle="item.labelStyle"
                  :offset="{ width: 0, height: 25 }"
                />
              </bm-marker>
            </bml-marker-clusterer>
            <template v-if="emptrMark.length == 0">
              <bm-marker
                v-for="item in showCarList"
                :key="item.key"
                :position="{ lng: item.longitude, lat: item.latitude }"
                :zIndex="item.mapIndex"
                :icon="item.icon"
                @click="clickCar(item)"
              >
                <bm-label
                  :content="item.cph"
                  :labelStyle="item.labelStyle"
                  :offset="{ width: 0, height: 25 }"
                />
              </bm-marker>
            </template>
          </baidu-map>
        </div>
        <!-- 表格 -->
        <div class="table-box">
          <div class="search-box">
            <div class="search">
              <i-input
                v-model="searchText"
                placeholder="请输入"
                style="width: 200px"
              ></i-input>
              <div class="button" @click="search()">
                <!-- <icon size="30" type="ios-search" /> -->
                查询
              </div>
            </div>
            <!-- <div class="button" @click="location()">重点监控</div> -->
          </div>
          <!-- style="height:100%;overflow: auto;" -->
          <i-table
            ref="tabletab"
            border
            stripe
            :max-height="tabHeight"
            :loading="loading"
            :data="table.data"
            :columns="tableColumns"
            :highlight-row="true"
            @on-sort-change="table.onSort"
            @on-row-click="rowClick"
            @on-select-cancel="sde"
            @on-selection-change="onSelect"
          >
            <template slot="plate" slot-scope="{ row }">
              <span :class="plateClass(row)">{{ row.cph }}</span>
            </template>
            <template slot="status" slot-scope="{ row }">
              <img :src="tabIcon(row.status)" class="table-icon" />
              <span :style="'color:' + tabColor(row)">{{ row.alarm }}</span>
            </template>
            <template slot="monitor" slot-scope="{ row }">
              <img
                src="~A/icon/huifang.png"
                alt
                style="width:20px;height:20px;"
                @click="showPopup(row)"
              />
            </template>
            <template slot="playback" slot-scope="{ row }">
              <img
                src="~A/icon/jiankong.png"
                alt
                style="width:20px;height:20px;"
                @click="trackPlayback(row)"
              />
            </template>
          </i-table>
          <el-pagination
            style="float:right;padding:0.7rem 0;"
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page="current"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="size"
            layout="total,prev,pager,next,sizes,jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <div v-if="isAlarm" class="alarm-box">
        <alarm-box></alarm-box>
      </div>
    </div>
    <div v-show="isRecord" class="record-hide"></div>
    <div v-show="isRecord" class="record-box">
      <track-record v-model="isRecord" :row="recordData"></track-record>
    </div>
    <div v-if="isLocation" class="record-box">
      <location
        v-loading="load"
        v-model="isLocation"
        :listData="Tselection"
      ></location>
    </div>
  </div>
</template>

<script>
// import "swiper/dist/css/swiper.css";
import trackRecord from "./track-record";
import location from "./location";
import alarmBox from "./alarm-box";
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {
  alarmTableConfig,
  swiperOption,
  vehicleAlarmList,
  defenseList,
  tabList,
  baisInfo,
  alarmInfo,
} from "@/const/monitor";
import {
  getAlarmTongji,
  getAlarmGps,
  getAlarmZhudong,
  getVehicleStat,
  getVehicleList,
  getVehicleDetail,
  // getGpsVehicleDetail,
  getVehlicPTdetail,
  // getQYVehicleList,
} from "@/api/daily/monitor";
// import { getAlarmPoint } from "@/api/daily/alarm";
import { statusOption } from "@/const/alarm";
import alarmDetail from "@/view/daily/alarm/detail";

import alarmDispose from "@/view/daily/alarm/dispose";
import table from "@/mixin/table";
import map from "@/mixin/map";
import axios from "axios";
// import { getList } from "@/api/daily/report";

export default {
  name: "monitor",
  components: {
    trackRecord,
    alarmDetail,
    alarmDispose,
    location,
    alarmBox,
  },
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  mixins: [table, map],
  data() {
    alarmTableConfig.onList = this.getList;
    return {
      tabHeight: 217,
      alarmStatus: "",
      size: 10,
      table: this.tableInit(alarmTableConfig),
      loading: false,
      load: false,
      stateLoading: false,
      vehicleAlarmList,
      defenseList,
      tabList,
      baisInfo,
      alarmInfo,
      searchText: "",
      CarMessage: "",
      tabIndex: 0,
      popupIndex: 0,
      showPop: false,
      url: "",
      srcdoc: "",
      alarmTongji: {},
      rowData: {},
      locationData: {},
      alarmList: [],
      showCarList: [],
      showTrajectoryList: [],
      vehicleDetail: {},
      gpsVehicleDetail: [{}],
      AllVehiclelist: [],
      active: {
        icon: require("A/daily/caosu.png"),
        text: "超速报警",
        fild: "gpsChaosuCount",
        type: "GPS",
        key: "chaosu",
        standard: `根据《中华人民共和国道路交通安全法》及《道路运输车辆动态监督管理办法》规定。
          驾驶员24小时累计驾驶时间原则上不超过8小时，日间连续驾驶不超过4小时，夜间连续驾驶不超过2小时，
          每次停车休息时间不少于20分钟，客运车辆夜间行驶速度不得超过日间限速80%的要求。
          根据道路交通安全法第九十条规定，驾驶员驾驶车辆超过4小时没有休息20分钟以上的，处以罚款200元处罚。
          （1）报警核定状态为100
        （2）持续时间>=0秒 `,
      },
      activeListTab: {
        text: "企业总车辆",
        color: "#2c45c7",
        fild: "vehicleCount",
        type: "",
      },
      popupTab: [
        // { text: "车辆信息", slot: "info", width: "70%", height: "70%" },
        // { text: "实时街景", slot: "img", width: "70%", height: "70%" },
        {
          text: "实时视频",
          slot: "video",
          width: "70%",
          height: "70%",
        },
      ],
      // 地图轨迹，起始标志，缩放，中心，路书图标
      path: [],
      starMarker: {},
      endMarker: {},
      vehicleStat: [{}],
      place: "",
      zoom: 7,
      // center: { lng: 116.96643, lat: 33.654438 },
      // 新疆
      center: { lng: 86.373, lat: 42.453 },
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } },
      },
      labelStyle: {
        top: "40px",
        color: "#333",
        fontSize: "12px",
        backgroundSize: "68px",
        backgroundImage: "url(" + require("@/assets/daily/bule.png") + ")",
      },
      cluesterStyle: [
        {
          url: require("@/assets/daily/juhe.gif"),
          size: { width: 52, height: 52 },
          textColor: "white",
          opt_textSize: 14,
        },
      ],
      mapak: "6mh5nu0r0YE2nwaC7QLglTC35R2ARauf",
      jijingimg: require("A/daily/jijing.png"),
      activeCar: false,
      drillImgs: [
        require("A/panel/IMG_0853.png"),
        require("A/panel/IMG_0854.png"),
        require("A/panel/IMG_0855.png"),
        require("A/panel/IMG_0856.png"),
      ],
      accState: "",
      bmllushu: {
        play: true,
        icon: {
          url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
          size: { width: 52, height: 26 },
          opts: { anchor: { width: 27, height: 13 } },
        },
        content: "",
      },
      swiperOption,
      isDetail: false,
      isDispose: false,
      isRecord: false,
      isAlarm: false,
      isLocation: false,
      selection: [],
      row: {},
      recordData: {},
      Tselection: [],
      current: 1,
      total: 0,
      baojingshu: "",
    };
  },

  computed: {
    // 动态显示列
    tableColumns() {
      return this.table.columns.filter((item) => {
        return item.display === undefined ? true : false;
      });
    },
    // 车辆状态
    vehicleState() {
      return this.alarmInfo.filter((item) => {
        return item.set === undefined || item.set == "video" ? true : false;
      });
    },
    // 视频
    videoState() {
      return this.alarmInfo.filter((item) => {
        return item.set === undefined || item.set == "info" ? true : false;
      });
    },
    currentTab() {
      return this.popupTab[this.popupIndex];
    },
    // 接口方法
    listAction() {
      const isGPS = this.active.type == "GPS";
      return isGPS ? getAlarmGps : getAlarmZhudong;
    },
    Tzoom() {
      return this.zoom;
    },
    emptrMark() {
      return this.Tzoom >= 9 ? [] : this.AllVehiclelist;
    },
  },
  watch: {
    listData() {
      this.getAlarmTimeData();
    },
  },
  mounted() {
    // 每隔 40s 执行
    let _this = this;
    setInterval(function() {
      _this.getAlarmTongji();
      _this.getList();
      _this.getAllVehiclelist();
      _this.getVehicleList();
      _this.getVehicleStat();
    }, 30000);

    this.getAlarmTongji();
    this.getList();
    this.getVehicleStat();
    this.getVehicleList();
    this.getAllVehiclelist();
    setInterval(function() {
      _this.bColorChange();
    }, 1300);
    // 表格高度自适应
    this.$nextTick(function() {
      this.tabHeight =
        window.innerHeight - this.$refs.tabletab.$el.offsetTop - 743;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tabHeight =
          window.innerHeight - self.$refs.tabletab.$el.offsetTop - 743;
      };
    });
  },

  methods: {
    // 报警情况 报警数闪烁效果
    bColorChange() {
      let b = document.getElementsByTagName("b")[4];
      if (b && b.innerHTML == 0) {
        b.style.opacity = "1";
      } else if (b && b.innerHTML != 0) {
        b.style.opacity = "1";
        setTimeout(function() {
          b.style.opacity = "0";
        }, 800);
      }
    },
    // 获取地图当前缩放级别
    zoomEnd(e) {
      this.zoom = e.target.getZoom();
    },

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
    location() {
      // if (this.Tselection.length <= 0 || this.Tselection.length > 4) {
      if (this.Tselection.length != 1) {
        this.$modal.error({
          title: "错误",
          content: "请选择 1 条数据",
        });
      } else {
        this.load = true;
        this.isLocation = true;
      }
    },
    // 显示详情
    showDetail(row) {
      this.row = row;
      this.isDetail = true;
    },
    // 详情处理
    detailDispose(rows) {
      this.selection = rows;
      this.showDispose();
    },
    dispose() {
      this.isDetail = false;
      this.getList();
    },
    // 多选
    onSelect(selection) {
      this.showCarList = selection;
      this.Tselection = selection;
    },
    // 是否选中数据
    testSelection(call) {
      if (this.selection.length == 0) {
        this.$message.warning("请先选择数据");
      } else {
        call();
      }
    },
    sde() {
      this.activeCar = false;
    },
    // 显示处理
    showDispose() {
      this.testSelection(() => (this.isDispose = true));
    },
    // 暂无街景图片显示
    nofindImg() {
      this.jijingimg = require("A/daily/jijing.png");
    },
    // 单击行定位当前车联到中心点设置mapIndex
    rowClick(data, index) {
      this.activeCar = false;
      this.zoom = 11;
      this.showCarList.forEach((item) => {
        // item.key = Math.ceil(Math.random() * 1000) * item.id;
        item.mapIndex = 0;
        if (JSON.stringify(item.id) == JSON.stringify(data.id)) {
          this.activeCar = true;
          this.center.lng = data.longitude;
          this.center.lat = data.latitude;
        }
      });
      this.showCarList[index].mapIndex = 99;
      this.showTrajectoryList = [];
    },
    // 切换表格
    activeTab(index, item) {
      if (index == 4) {
        this.tabIndex = index;
        this.isAlarm = true;
      } else {
        this.tabIndex = index;
        this.activeListTab = item;
        this.isAlarm = false;
        this.getVehicleList();
        this.getAllVehiclelist();
      }
    },
    // 切换弹窗
    activePopupTab(index, item) {
      this.popupIndex = index;
      if (item.text == "实时视频") {
        // this.url = `http://60.171.241.126:8011/sample/main.html?Sim=${
        //   this.rowData.cph
        //   }&ChannelNum=4`;
        // this.url = this.vehicleDetail.yunyingshang;
        // let urls = this.url.replace(/\s/g,"").replace(/\amp;/g, "");
        // this.url = urls;
        let urls = this.vehicleDetail.yunyingshang
          .replace(/\s*/g, "")
          .replace(/\amp;/g, "");
        this.url = urls;
        console.log(this.url);
        let http = this.url.substring(0, 4);
        if (
          this.url == "" ||
          this.url == "null" ||
          this.url == null ||
          http !== "http"
        ) {
          // if (this.rowData.platecolor == "蓝色") {
          this.srcdoc = `地址不存在`;
          // } else {
          //   this.srcdoc = `地址不存在`;
          // }
        } else {
          this.srcdoc = null;
        }
      }
    },
    // 点击更多跳转到报警处理界面
    goAlarmDispose() {
      this.$router.replace({
        path: "/daily/alarm",
      });
    },
    // 关闭弹窗
    closePopup() {
      this.showPop = false;
      this.url = "";
    },
    tabIcon(img) {
      return require("@/assets/daily/" + img + ".png");
    },
    tabColor(row) {
      let color = "";
      if (row.status == "运行") {
        color = "#0feb14";
      } else if (row.status == "闲置") {
        color = "#35d5ff";
      } else if (row.status == "离线") {
        color = "#939393";
      } else {
        color = "#eb330";
      }
      return color;
    },
    isActive(item) {
      return item.text == this.active.text;
    },
    // emitClick(item) {
    //   this.active = item;
    //   this.getList();
    //   // this.getVehicleList();
    // },
    // 显示弹窗信息
    showPopup(row) {
      this.center.lng = row.longitude;
      this.center.lat = row.latitude;
      this.activeCar = true;
      this.popupIndex = 0;
      this.showPop = true;
      this.rowData = row;
      let cheliangpaizhao = row.cph;
      let chepaiyanse = row.platecolor;
      // let deptId = this.$store.getters.deptId;
      let deptId = row.deptID;
      let location = row.latitude + "," + row.longitude;
      let ak = this.mapak;
      let output = "json";
      let coordtype = "wgs84ll";
      this.accState = row.alarm;
      getVehicleDetail(cheliangpaizhao, chepaiyanse, deptId).then((res) => {
        this.vehicleDetail = res.data.data;
        // 原切换弹窗显示视频信息——>显示弹出框时调用
        this.activePopupTab(0, this.popupTab[0]);
      });
      // this.getAlarmTimeData();
      // 获取街景图片
      this.jijingimg =
        "http://api.map.baidu.com/panorama/v2?ak=" +
        this.mapak +
        "&width=800&height=400&location=" +
        row.longitude +
        "," +
        row.latitude +
        "&fov=90&pitch=10&heading=20";
      // 根据经纬度解析地理位置
      axios
        .get("/baidu/reverse_geocoding/v3", {
          params: { ak, output, coordtype, location },
        })
        .then((res) => {
          // this.place = res.data.result.formatted_address;
          // this.place = res.data.message;
          this.place = this.gpsVehicleDetail.locationName;
        });
      this.getAlarmTimeData();
    },
    // 获取Gps车辆资料
    getAlarmTimeData() {
      // this.Tselection[0] = this.CarMessage;
      let company = this.$store.getters.deptName;
      let vehicleStatus = this.activeListTab.type;
      let cph =
        this.Tselection.length > 0
          ? this.Tselection[0].cph
          : this.CarMessage.cph;
      let offsetNo = this.table.offset,
        order = 0,
        orderColumn = "",
        pageTotal = 1,
        page = this.current,
        pagesize = this.size,
        total = this.total,
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
        this.gpsVehicleDetail = res.data.data.list[0];
      });
    },
    // 获取报警统计
    getAlarmTongji() {
      let company = this.$store.getters.deptName;
      getAlarmTongji(company).then((res) => {
        this.alarmTongji = res.data.data;
        this.baojingshu =
          this.alarmTongji.gpsChaosuCount +
          this.alarmTongji.gpsPilaoCount +
          this.alarmTongji.gpsYejianCount +
          this.alarmTongji.gpsYichangCount +
          this.alarmTongji.buzaixianbaojing +
          this.alarmTongji.gaosujinxing +
          this.alarmTongji.zhudongJiedadianhuaCount +
          this.alarmTongji.zhudongChouyanjiashiCount +
          this.alarmTongji.zhudongFenshenjiashiCount +
          this.alarmTongji.zhudongJiashiyuanpilaoCount +
          this.alarmTongji.jiashiyuanyichangbaojing +
          this.alarmTongji.xingrenpengzhuangyujing +
          this.alarmTongji.zhudongChedaopianliCount +
          this.alarmTongji.zhudongChejuguojinCount +
          this.alarmTongji.zhudongFangpenzhuangCount;
      });
    },
    // 获取报警统计
    getVehicleStat() {
      let dept = this.$store.getters.deptId;
      getVehicleStat(dept).then((res) => {
        //  表头  // 报警数
        this.vehicleStat = res.data.data[0];
        this.vehicleStat.lixian =
          res.data.data[0].RegisterCount - res.data.data[0].zaixian;
      });
    },
    // 获取车辆统计列表
    getVehicleList() {
      this.loading = true;
      let company = this.$store.getters.deptName;
      let vehicleStatus = this.activeListTab.type; // ||  this.active.type; this.activeListTab.type
      let cpn = this.searchText;
      let offsetNo = this.table.offset,
        // let offsetNo = 0,
        // order = 0,
        order = this.table.order,
        orderColumn = this.table.orderColumn,
        // orderColumn = "",
        pageTotal = 1,
        // page = this.table.page,
        page = this.current,
        pagesize = this.size,
        // pagesize = 10,
        total = this.total,
        records = [];
      getVehicleList(
        company,
        vehicleStatus,
        cpn,
        page,
        // this.current,
        // this.size,
        offsetNo,
        order,
        orderColumn,
        pageTotal,
        page,
        pagesize,
        total,
        records
      ).then((res) => {
        this.table.data = res.data.data.list;
        this.total = res.data.data.totalss;
        this.current = res.data.data.current;
        this.size = res.data.data.pagesize;
        // 表内数据打点到地图
        this.showCarList = res.data.data.list.map((item) => {
          //当前列表显示的数据
          item.labelStyle = this.getLabelOpt(item);
          item.icon = this.getMapCarImg(
            item.VehState,
            item.alarm,
            item.zaixian,
            item.angle
          );
          this.alarmStatus = item.alarm;
          item._checked = true;
          return item;
        });
        this.showTrajectoryList = [];
        this.loading = false;
      });
    },
    // 获取全部数据添加至地图
    getAllVehiclelist() {
      let company = this.$store.getters.deptName;
      let vehicleStatus = this.activeListTab.type;
      let cpn = "";
      let offsetNo = this.table.offset,
        order = this.table.order,
        orderColumn = this.table.orderColumn,
        pageTotal = 1,
        page = this.current,
        pagesize = 0,
        total = this.total,
        records = [];
      getVehicleList(
        company,
        vehicleStatus,
        cpn,
        page,
        // this.current,
        // this.size,
        offsetNo,
        order,
        orderColumn,
        pageTotal,
        page,
        pagesize,
        total,
        records
      ).then((res) => {
        this.AllVehiclelist = res.data.data.list.map((item) => {
          //当前列表显示的数据
          item.labelStyle = this.getLabelOpt(item);
          item.icon = this.getMapCarImg(
            item.VehState,
            item.alarm,
            item.zaixian,
            item.angle
          );
          this.alarmStatus = item.alarm;
          item._checked = true;
          return item;
        });
      });
    },
    search() {
      this.getVehicleList();
    },
    // 分页 当前页数改变 时执行
    currentChange(pageNum) {
      this.current = pageNum;
      this.getVehicleList();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getVehicleList();
    },
    // 获取列表数据
    async getList() {
      // let table = this.table;
      // table.loading = true;
      // let params = {
      //   ...table.onParams(),
      // };
      // getList(params).then((res) => {
      //   let data = res.data.data;
      //   table.onFill(data);
      // });
      this.stateLoading = true;
      let company = this.$store.getters.deptName;
      let AlarmType = this.active.text;
      let res = await this.listAction(company, AlarmType);
      this.alarmList = res.data.data;
      let statusMap = {};
      statusOption.forEach((item) => (statusMap[item.value] = item.label));
      this.alarmList.forEach((item) => {
        item.status = statusMap[item.status];
      });
      this.showTrajectoryList = [];
      this.stateLoading = false;
    },
    // 地图车辆点击事件
    clickCar(e) {
      this.CarMessage = e;
      this.showPopup(e);
      let location = e.latitude + "," + e.longitude;
      this.jijingimg =
        "http://api.map.baidu.com/panorama/v2?ak=" +
        this.mapak +
        "&width=800&height=400&location=" +
        location +
        "&fov=190&pitch=10&heading=20";
    },
    // 根据状态添加车辆图标
    getMapCarImg(status, alarmStatus, zaixian, angle) {
      let img = {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 50 },
        opts: { anchor: { width: 27, height: 13, color: "red" } },
      };
      if (alarmStatus === "报警") {
        if (angle == 0 || angle == 360) {
          img.url = require("@/assets/icon/car_w.png");
        } else if (angle > 0 && angle < 90) {
          img.url = require("@/assets/icon/car_w_es.png");
        } else if (angle == 90) {
          img.url = require("@/assets/icon/car_w_s.png");
        } else if (angle > 90 && angle < 180) {
          img.url = require("@/assets/icon/car_w_sw.png");
        } else if (angle == 180) {
          img.url = require("@/assets/icon/car_w_w.png");
        } else if (angle > 180 && angle < 270) {
          img.url = require("@/assets/icon/car_w_wn.png");
        } else if (angle == 270) {
          img.url = require("@/assets/icon/car_w_n.png");
        } else if (angle > 270 && angle < 360) {
          img.url = require("@/assets/icon/car_w_ne.png");
        }
      } else {
        if (status == "在用") {
          if (angle == 0 || angle == 360) {
            img.url = require("@/assets/icon/car_y.png");
          } else if (angle > 0 && angle < 90) {
            img.url = require("@/assets/icon/car_y_es.png");
          } else if (angle == 90) {
            img.url = require("@/assets/icon/car_y_s.png");
          } else if (angle > 90 && angle < 180) {
            img.url = require("@/assets/icon/car_y_sw.png");
          } else if (angle == 180) {
            img.url = require("@/assets/icon/car_y_w.png");
          } else if (angle > 180 && angle < 270) {
            img.url = require("@/assets/icon/car_y_wn.png");
          } else if (angle == 270) {
            img.url = require("@/assets/icon/car_y_n.png");
          } else if (angle > 270 && angle < 360) {
            img.url = require("@/assets/icon/car_y_ne.png");
          }
        }
        if (status == "闲置") {
          if (angle == 0 || angle == 360) {
            img.url = require("@/assets/icon/car_x.png");
          } else if (angle > 0 && angle < 90) {
            img.url = require("@/assets/icon/car_x_es.png");
          } else if (angle == 90) {
            img.url = require("@/assets/icon/car_x_s.png");
          } else if (angle > 90 && angle < 180) {
            img.url = require("@/assets/icon/car_x_sw.png");
          } else if (angle == 180) {
            img.url = require("@/assets/icon/car_x_w.png");
          } else if (angle > 180 && angle < 270) {
            img.url = require("@/assets/icon/car_x_wn.png");
          } else if (angle == 270) {
            img.url = require("@/assets/icon/car_x_n.png");
          } else if (angle > 270 && angle < 360) {
            img.url = require("@/assets/icon/car_x_ne.png");
          }
        }
      }
      if (zaixian == "未上线") {
        if (angle == 0 || angle == 360) {
          img.url = require("@/assets/icon/car_l.png");
        } else if (angle > 0 && angle < 90) {
          img.url = require("@/assets/icon/car_l_es.png");
        } else if (angle == 90) {
          img.url = require("@/assets/icon/car_l_s.png");
        } else if (angle > 90 && angle < 180) {
          img.url = require("@/assets/icon/car_l_sw.png");
        } else if (angle == 180) {
          img.url = require("@/assets/icon/car_l_w.png");
        } else if (angle > 180 && angle < 270) {
          img.url = require("@/assets/icon/car_l_wn.png");
        } else if (angle == 270) {
          img.url = require("@/assets/icon/car_l_n.png");
        } else if (angle > 270 && angle < 360) {
          img.url = require("@/assets/icon/car_l_ne.png");
        }
      }
      return img;
    },
    // labelStyle
    getLabelOpt(data) {
      let style = {
        top:
          data.angle == 0 || data.angle == 360 || data.angle == 180
            ? "23px"
            : "50px",
        color: "#333",
        fontSize: "12px",
        backgroundSize: "68px",
        backgroundImage: "url(" + require("@/assets/daily/bule.png") + ")",
      };
      if (data.platecolor == "黄色") {
        style.backgroundImage =
          "url(" + require("@/assets/daily/yellow.png") + ")";
      } else if (data.platecolor == "蓝色") {
        style.backgroundImage =
          "url(" + require("@/assets/daily/bule.png") + ")";
        style.color = "#fff";
      } else if (data.platecolor == "绿色") {
        style.backgroundImage =
          "url(" + require("@/assets/daily/green.png") + ")";
      } else if (data.platecolor == "黑色") {
        style.backgroundImage =
          "url(" + require("@/assets/daily/black.png") + ")";
        style.color = "#fff";
      } else {
        style.backgroundImage =
          "url(" + require("@/assets/daily/white.png") + ")";
      }
      return style;
    },
    // 轨迹回放
    trackPlayback(row) {
      this.isRecord = true;
      this.recordData = row;
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
// .table-box {
// margin-top: 3.6vh;
// }
@media screen and (max-width: 1919px) {
  .table-box {
    // margin-top: -4.9rem;
  }
}

.ivu-table-tip table td {
  width: auto !important;
}
</style>
