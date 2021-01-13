<template>
  <div class="alarm">
    <!-- 报警处理 -->
    <alarm-dispose
      v-model="isDispose"
      :selection="selection"
      :active="active"
      @dispose="dispose"
    ></alarm-dispose>
    <!-- 报警申诉 -->
    <alarm-appeal
      v-model="isAppeal"
      :selection="selection"
      :active="active"
      @appeal="appeal"
    ></alarm-appeal>
    <!-- 报警详情 -->
    <alarm-detail
      v-if="active.type"
      v-model="isDetail"
      :active="active"
      :row="row"
      @dispose="detailDispose"
      @appeal="detailAppeal"
    ></alarm-detail>
    <div class="alarm-head">
      <div class="alarm-head-button">
        <div class="alarm-head-button-msg">
          <div class="alarm-head-msg">
            <img src="~A/daily/beidouweixin.png" alt="" />
            <span>今日北斗设备报警</span>
          </div>
          <div class="alarm-head-button-bottom">
            <div
              :class="['alarm-head-button-for', { checked: isActive(item) }]"
              v-for="(item, index) in vehicleAlarmList"
              :key="index"
              @click="emitClick(item)"
            >
              <b class="bcolor">{{ alarmTongji[item.fild] }}</b>
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
        <div class="alarm-head-button-msg">
          <div class="alarm-head-msg">
            <img src="~A/daily/zhudonganquan.png" alt="" />
            <span>DMS报警</span>
          </div>
          <div class="alarm-head-button-bottom">
            <div
              :class="['alarm-head-button-for', { checked: isActive(item) }]"
              v-for="(item, index) in defenseList"
              :key="index"
              @click="emitClick(item)"
            >
              <b class="bcolor">{{ alarmTongji[item.fild] }}</b>
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
        <div class="alarm-head-button-msg">
          <div class="alarm-head-msg">
            <img src="~A/operation/dingwei.png" alt="" />
            <span>ADAS报警</span>
          </div>
          <div class="alarm-head-button-bottom">
            <div
              :class="['alarm-head-button-for', { checked: isActive(item) }]"
              v-for="(item, index) in ADASList"
              :key="index"
              @click="emitClick(item)"
            >
              <b class="bcolor">{{ alarmTongji[item.fild] }}</b>
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alarm-body">
      <el-table
        :data="tableData"
        ref="tableList"
        v-loading="loading"
        :height="caleHeight"
        @row-click="rowClick"
        style="width: 100%"
        :show-header="false"
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="报警类型" width="150">
          <template slot-scope="scope">
            <span style="color:#37a9f7;cursor: pointer;"
              >[{{ scope.row.alarmType }}]
            </span></template
          >
        </el-table-column>
        <el-table-column prop="plate" label="车牌" width="120">
        </el-table-column>
        <el-table-column prop="dealType" label="处理状态" width="120">
        </el-table-column>
        <el-table-column prop="roadName" label="地址" align="left">
        </el-table-column>
        <el-table-column prop="time" label="时间" align="right">
        </el-table-column>
        <!-- <el-table-column prop="endTime" label="结束时间" align="left">
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import { vehicleAlarmList, defenseList, ADASList } from "@/const/monitor";
import alarmDetail from "@/view/daily/alarm/detail";
import alarmDispose from "@/view/daily/alarm/dispose";
import alarmAppeal from "@/view/daily/alarm/appeal";
import {
  getAlarmTongji,
  getAlarmGps,
  getAlarmZhudong,
} from "@/api/daily/monitor";
export default {
  components: {
    alarmDetail,
    alarmDispose,
    alarmAppeal,
  },
  data() {
    return {
      vehicleAlarmList,
      defenseList,
      ADASList,
      caleHeight: 500,
      alarmTongji: {},
      tableData: [],
      loading: false,
      isDetail: false,
      isDispose: false,
      isAppeal: false,
      selection: [],
      row: {},
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
      timeCalc: 0,
    };
  },
  computed: {},
  mounted() {
    let _this = this;
    setInterval(function() {
      _this.getAlarmTongji();
    }, (this.timeCalc + 2) * 180000);
    this.getAlarmTongji();
    this.emitClick(this.active);
    // 表格高度自适应
    this.$nextTick(function() {
      this.caleHeight =
        window.innerHeight - this.$refs.tableList.$el.offsetTop - 230;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.caleHeight =
          window.innerHeight - self.$refs.tableList.$el.offsetTop - 230;
      };
    });
  },
  updated() {
    // let bcolor = document.getElementsByClassName("bcolor");
    // if (bcolor[0].innerHTML != "") {
    //   let _this = this;
    //   setInterval(function() {
    //     _this.arlarmColorChange();
    //   }, 1500);
    // }
  },
  methods: {
    // b标签 颜色特效
    // arlarmColorChange() {
    //   let bcolor = document.getElementsByClassName("bcolor");
    //   for (let i = 0; i < bcolor.length; i++) {
    //     if (bcolor[i].innerHTML && bcolor[i].innerHTML > 0) {
    //       bcolor[i].style.color = "#fff";
    //       setTimeout(function() {
    //         if (bcolor[i]) {
    //           bcolor[i].style.color = "red";
    //         }
    //       }, 800);
    //     }
    //   }
    // },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0 || rowIndex % 2 == 0) {
        return "warning-row";
      }
      return "";
    },
    isActive(item) {
      return item.text == this.active.text;
    },
    emitClick(item) {
      this.active = item;
      this.getList();
    },
    // 获取报警统计
    getAlarmTongji() {
      let company = this.$store.getters.deptName;
      getAlarmTongji(company).then((res) => {
        this.alarmTongji = res.data.data;
        for (let i in this.alarmTongji) {
          this.timeCalc = 0;
          if (this.alarmTongji[i] > 0) {
            for (let j in this.vehicleAlarmList) {
              this.timeCalc++;
              if (this.vehicleAlarmList[j].fild == i) {
                let _this = this;
                setTimeout(function() {
                  _this.emitClick(_this.vehicleAlarmList[j]);
                }, _this.timeCalc * 180000);
              }
            }
          }
        }
      });
    },
    getList() {
      this.loading = true;
      let company = this.$store.getters.deptName;
      let AlarmType = this.active.text;
      if (this.active.type == "GPS") {
        getAlarmGps(company, AlarmType).then((res) => {
          this.loading = false;
          this.tableData = res.data.data.map((el) => {
            el.time = el.beginTime + "-" + el.endTime;
            if (el.chulizhuangtai !== "") {
              el.dealType = "已处理";
            } else if (el.shensuzhuangtai !== "") {
              el.dealType = "已申诉";
            } else {
              el.dealType = "未处理";
            }
            if (el.shensushenhebiaoshi === 2) {
              el.dealType = "申诉驳回";
            }
            return el;
          });
        });
      } else {
        getAlarmZhudong(company, AlarmType).then((res) => {
          this.loading = false;
          this.tableData = res.data.data.map((el) => {
            el.time = el.gpsTime;
            // el.dealType=
            if (el.chulizhuangtai !== "") {
              el.dealType = "已处理";
            } else if (el.shensuzhuangtai !== "") {
              el.dealType = "已申诉";
            } else {
              el.dealType = "未处理";
            }
            return el;
          });
        });
      }
    },
    // 显示详情
    rowClick(row) {
      this.row = row;
      this.isDetail = true;
      //  地图显示高度
      let mapheight = document.getElementsByClassName("map")[1];
      if (this.row.isPicture || this.row.isVideo) {
        mapheight.style.height = "60%";
      } else {
        mapheight.style.height = "100%";
      }
    },
    // 详情处理
    detailDispose(rows) {
      this.selection = rows;
      this.showDispose();
    },
    dispose() {
      this.isDetail = false;
      this.isDetail = false;
      this.getList();
    },
    // 详情申诉
    detailAppeal(rows) {
      this.selection = rows;
      this.showAppeal();
    },
    appeal() {
      this.isAppeal = false;
      this.isDetail = false;
      this.getList();
    },
    // 显示处理
    showDispose() {
      this.testSelection(() => (this.isDispose = true));
    },
    // 显示申诉
    showAppeal() {
      this.testSelection(() => (this.isAppeal = true));
    },
    // 是否选中数据
    testSelection(call) {
      if (this.selection.length == 0) {
        this.$message.warning("请先选择数据");
      } else {
        call();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.alarm {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  .alarm-head {
    height: 17%;
    width: 100%;
    border-bottom: 1px solid gainsboro;
    .alarm-head-button {
      display: flex;
      height: 100%;
      justify-content: space-between;
      .alarm-head-button-msg {
        display: flex;
        flex-direction: column;
        .alarm-head-msg {
          display: flex;
          img {
            width: 22px;
            height: 22px;
            margin-right: 0.4rem;
          }
          span {
            font-weight: 600;
          }
        }
        .alarm-head-button-bottom {
          display: flex;
          margin-top: 1rem;
          .alarm-head-button-for {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 1px solid gainsboro;
            border-radius: 7px;
            padding: 0.5rem 0.5rem;
            margin-right: 0.5rem;
            cursor: pointer;
            b {
              color: #37a9f7;
              font-size: 20px;
            }
          }
          .checked {
            // background: #37a9f7;
            background-color: red;
            color: white;
            b {
              color: white;
            }
          }
        }
      }
    }
  }
  .alarm-body {
    height: 83%;
    width: 100%;
    .el-table {
      margin-top: 1rem;
    }
  }
}
</style>
<style>
.alarm-body .el-table .warning-row {
  background: #f2f9ff;
}

.alarm-body .el-table__empty-text {
  color: #333;
}
</style>
