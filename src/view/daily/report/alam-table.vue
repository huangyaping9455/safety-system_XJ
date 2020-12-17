<template>
  <div class="sub-tables wh100">
    <div class="tabs">
      <span>预警类型：</span>
      <i-select v-model="tabKey">
        <i-option-group label="北斗设备报警">
          <i-option v-for="item in GPSlist" :key="item.key" :value="item.key">
            {{ item.text }}
            <span class="num">{{ row[item.key] }}条</span>
          </i-option>
        </i-option-group>
        <i-option-group label="主动安全防御报警">
          <i-option
            v-for="item in driverList"
            :key="item.key"
            :value="item.key"
          >
            {{ item.text }}
            <span class="num">{{ row[item.key] }}条</span>
          </i-option>
        </i-option-group>
      </i-select>
    </div>
    <div class="tables-list">
      <alarm-table
        ref="alarmtable"
        :active="active"
        :date="searchDate"
      ></alarm-table>
    </div>
  </div>
</template>

<script>
import { GPSlist, driverList } from "@/const/alarm";
import alarmTable from "@/view/daily/alarm/table";
export default {
  name: "alarm-tables",
  components: {
    alarmTable,
  },
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => new Object(),
    },
  },
  data() {
    return {
      GPSlist,
      driverList,
      searchDate: [],
      tabKey: GPSlist[0].key,
      // 当前日报的预警是否加载过
      load: false,
    };
  },
  computed: {
    // 当前预警表
    active() {
      return GPSlist.concat(driverList).find((item) => item.key == this.tabKey);
    },
  },
  watch: {
    // 如果显示，调用表格自适应，
    // 如果未加载，获取列表数据
    show() {
      if (!this.show) return;
      this.tabKey = GPSlist[0].key;
      this.$refs.alarmtable.table.onResize();
      if (!this.load) {
        this.$refs.alarmtable.getAlarmList();
        this.load = true;
      }
    },
    // 操作项发生变化
    row() {
      this.searchDate = [this.row.countdate, this.row.countdate];
      this.load = false;
    },
  },
};
</script>

<style lang="scss"></style>
