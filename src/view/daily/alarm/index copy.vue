<template>
  <div class="daily-alarm">
    <el-tabs type="border-card" style="height:auto;" @tab-click="handleClick">
      <el-tab-pane>
        <span slot="label" style="font-weight: 600;"
          ><img
            src="~A/daily/beidouweixin.png"
            alt
            style="width:22px;height:22px;margin-right:5px;"
          />北斗设备报警</span
        >
        <div class="alarm-mian">
          <div class="alarm-content">
            <alarm-table
              ref="alarmtable"
              :active="active"
              @getData="getData"
              @getQuery="getQuery"
            ></alarm-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" style="font-weight: 600;"
          ><img
            src="~A/daily/zhudonganquan.png"
            alt
            style="width:22px;height:22px;margin-right:5px;"
          />主动安全设备报警</span
        >
        <div class="alarm-mian">
          <div class="alarm-content">
            <alarm-table
              ref="alarmtable"
              :active="active"
              @getData="getData"
              @getQuery="getQuery"
            ></alarm-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="position: absolute;top: 84px;right:5rem;z-index: 10;">
      <div style="display:flex;line-height:45px;">
        <span style="color:#37a9f7;font-weight: 600;margin:0 1rem;"
          >报警车辆：<span style="color:red;">{{ statis.vehCount }}</span></span
        >
        <span style="color:#37a9f7;font-weight: 600;margin:0 1rem;"
          >报警次数：<span style="color:red;">{{
            statis.alarmCount
          }}</span></span
        >
        <span style="color:#37a9f7;font-weight: 600;margin:0 1rem;"
          >处理率：<span style="color:red;">{{
            statis.handledRate
          }}</span></span
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
    };
  },
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
    // // 按钮点击 切换表格
    // toggleAlarm(item) {
    //   this.active = item;
    // },
    // 切换报警
    handleClick(tab, event) {
      this.tabn = tab.index;
      if (tab.index == 1) {
        this.$children[0].$children[2].$children[0].toggleAlarm(
          this.$children[0].$children[2].$children[0].$children[9].driverList[0]
        );
        this.$children[0].$children[2].$children[0].$children[9].active = this.$children[0].$children[2].$children[0].$children[9].driverList[0];
        this.$children[0].$children[2].$children[0].$children[9].isActive(
          this.$children[0].$children[2].$children[0].$children[9].driverList[0]
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import "S/view/alarm.scss";
.buttons-panel {
  position: absolute;
  top: 10px;
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
// .el-tabs__item {
//   height: auto;
//   padding: 0.5rem 5rem;
// }
// #tab-1 {
//   height: auto;
//   padding: 0.5rem 5rem;
// }
</style>
