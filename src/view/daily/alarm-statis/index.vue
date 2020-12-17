<template>
  <div class="daily-alarm">
    <!-- 报警 type lsit -->
    <alarm-list @on-click="toggleAlarm"></alarm-list>

    <!-- 报警 table -->
    <div class="alarm-mian">
      <div class="alarm-type">
        <span>{{ active.text }}</span>
      </div>
      <div class="alarm-info">
        <div>
          <span
            >报警车辆：{{
              statisData.alarmVehicle == -1 ? 0 : statisData.alarmVehicle
            }}</span
          >
          <span
            >报警次数：{{
              statisData.alarmCount == -1 ? 0 : statisData.alarmCount
            }}</span
          >
        </div>
      </div>
      <div class="alarm-content">
        <alarm-table :active="active" @listData="getListData"></alarm-table>
      </div>
    </div>
  </div>
</template>

<script>
import alarmList from './list';
import alarmTable from './table';
export default {
  name: 'alarm-statis',
  components: {
    alarmList,
    alarmTable
  },
  data() {
    return {
      active: {},
      statisData: {}
    };
  },
  methods: {
    toggleAlarm(item) {
      this.active = item;
    },
    getListData(data) {
      this.statisData = data;
    }
  }
};
</script>

<style lang="scss">
@import 'S/view/alarm.scss';
</style>
