<template>
  <div class="daily-alarm">
    <div class="alarm-top">
      <div class="alarm-topmenu">
        <span
          :class="[{ checkActive: tabIndexAlarm == 0 }]"
          @click="alarmClick(0)"
        >
          <img src="~A/daily/beidouweixin.png" alt />
          北斗设备报警
        </span>
        <span
          :class="[{ checkActive: tabIndexAlarm == 1 }]"
          @click="alarmClick(1)"
        >
          <img src="~A/daily/zhudonganquan.png" alt />
          DMS设备报警
        </span>
        <span
          :class="[{ checkActive: tabIndexAlarm == 2 }]"
          @click="alarmClick(2)"
        >
          <img src="~A/operation/dingwei.png" alt />
          ADAS设备报警
        </span>
      </div>
      <div class="alarm-mian">
        <alarm-table
          ref="alarmtable"
          :active="active"
          @getData="getData"
          @getQuery="getQuery"
        ></alarm-table>
      </div>
    </div>
    <div class="alarm-msg">
      <div class="alarm-msg-body">
        <span class="alarm-span"
          >报警车辆：<span>{{ statis.vehCount }}</span></span
        >
        <span class="alarm-span"
          >报警次数：<span>{{ statis.alarmCount }}</span></span
        >
        <span class="alarm-span"
          >处理率：<span>{{ statis.handledRate }}</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import alarmTable from "./table";
export default {
  name: "alarm",
  components: {
    alarmTable,
  },
  data() {
    return {
      active: {},
      query: {},
      // 统计数据
      statis: {
        vehCount: 0,
        alarmCount: 0,
        handledRate: 0,
        date: [],
      },
      load: false,
      tabn: "",
      tabIndexAlarm: 0,
    };
  },
  mounted() {},
  methods: {
    // 列表上方 报警车辆、报警次数等
    getData({ statis }) {
      this.statis = statis;
    },
    // 传入query(参数) 渲染不同用页面
    getQuery(query) {
      if (this.load == false) {
        if (this.$route.query.alarmType == undefined) {
          this.load = true;
          this.query = query;
        } else {
          this.load = true;
          query.alarmType = this.$route.query.alarmType;
          this.query = query;
        }
      }
    },
    // 点击顶部选项卡 设置默认点击第一项报警
    alarmClick(index) {
      this.tabIndexAlarm = index;
      if (index == 0) {
        // this.$children[0].$children[9].emitClick(
        //   this.$children[0].$children[9].GPSlist[0]
        // );
        this.$refs.alarmtable.alarmlist.emitClick(
          this.$refs.alarmtable.alarmlist.GPSlist[0]
        );
        this.$refs.alarmtable.alarmlist.beidouShow = true;
        this.$refs.alarmtable.alarmlist.driveShow = false;
        this.$refs.alarmtable.alarmlist.admsShow = false;
      } else if (index == 1) {
        this.$refs.alarmtable.alarmlist.emitClick(
          this.$refs.alarmtable.alarmlist.driverList[0]
        );
        this.$refs.alarmtable.alarmlist.beidouShow = false;
        this.$refs.alarmtable.alarmlist.driveShow = true;
        this.$refs.alarmtable.alarmlist.admsShow = false;
      } else if (index == 2) {
        this.$refs.alarmtable.alarmlist.emitClick(
          this.$refs.alarmtable.alarmlist.ADASList[0]
        );
        this.$refs.alarmtable.alarmlist.beidouShow = false;
        this.$refs.alarmtable.alarmlist.driveShow = false;
        this.$refs.alarmtable.alarmlist.admsShow = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "S/view/alarm.scss";
.buttons-panel {
  position: absolute;
  top: 14px;
  right: 1rem;
  .alarm-tab {
    display: flex;
    position: absolute;
    left: 14px;
    color: #999999;
    font-size: 12px;
    & > div {
      cursor: pointer;
      margin-right: 10px;
      span {
        margin: 0;
      }
      img {
        width: 20px;
        vertical-align: bottom;
        margin: 0 4px;
      }
    }
    .check {
      color: #2e81ec;
    }
  }
}
.el-tabs--border-card > .el-tabs__header {
  background-color: #e2f0fb;
}
</style>
