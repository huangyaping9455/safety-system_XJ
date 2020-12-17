<template>
  <div class="daily-serious-alarm">
    <!-- 报警 type lsit -->
    <alarm-list :search="query" @on-click="toggleAlarm"></alarm-list>

    <!-- 报警 table -->
    <div class="alarm-mian">
      <div class="alarm-type">
        <span>{{ active.text }}</span>
      </div>
      <div class="alarm-info">
        <div>
          <span>报警车辆：{{ statis.vehicleCount || 0 }}</span>
          <span>报警总次数：{{ statis.alarmCount || 0 }}</span>
        </div>

        <!-- <span>处理率：{{ statis.handledRate || '100%' }}</span> -->
      </div>
      <div class="alarm-content">
        <div class="content-left">
          <left-ranking :active="active" @getData="getData" @vehicleData="vehicleData"></left-ranking>
        </div>
        <div class="alarm-table-box">
          <alarm-table ref="alarmtable" :active="active"  :vehicle="vehicle" @getQuery="getQuery"></alarm-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alarmList from './list';
import alarmTable from './table';
import leftRanking from './ranking';
export default {
  name: 'alarm',
  components: {
    alarmList,
    alarmTable,
    leftRanking
  },
  data() {
    return {
      active: {},
      vehicle:{},
      query: {},
      // 统计数据
      statis: {
        vehicleCount: 0,
        alarmCount: 0,
        handledRate: 0,
        // date: []
      },
      load: false
    };
  },

  mounted() {},
  methods: {
    getData(statis) {
      this.statis = statis;
    },
    getQuery(query) {
      if (this.load == false) {
        this.load = true;
        this.query = query;
      }
    },
    vehicleData(item){
      this.vehicle=Object.assign({}, item);
    },
    toggleAlarm(item) {
      this.active = Object.assign({}, item);
    }
  }
};
</script>

<style lang="scss">
@import 'S/view/serious-alarm.scss';
</style>
