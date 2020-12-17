<template>
  <div class="alarm-list">
    <div class="time-box">
      <b>报警时间段</b>
      <div>
         <i-date v-model="alarmtime" confirm type="daterange" placement="bottom-end" placeholder="请选择时间" style="width: 100%"></i-date>
      </div>
    </div>
    <div class="list-item">
      <div class="baojing-title">
        <img src="~A/daily/s-alarm-1.png" alt />
        <p>北斗设备严重报警</p>
      </div>
      <div class="facility-alarm">
        <scroll>
          <div v-for="item in GPSlist" :key="item.text" class="block" @click="emitClick(item)">
            <p :class="['tab-btn', { checked: isActive(item) }]">
              <span class="tab-title">{{item.text}}</span>
              <span class="number">{{item.baojingshu}}</span>
            </p>

            <!-- <img v-if="item.baojingshu != 0" src="~A/daily/baojing.png" alt /> -->
          </div>
        </scroll>
      </div>
    </div>
    <div class="list-item">
      <div class="baojing-title">
        <img src="~A/daily/s-alarm-2.png" alt />
        <p>主动安全设备严重报警</p>
      </div>
      <div class="facility-alarm">
        <scroll>
          <div v-for="item in driverList" :key="item.text" class="block" @click="emitClick(item)">
            <p :class="['tab-btn', { checked: isActive(item) }]">
              <span class="tab-title">{{item.text}}</span>
              <span class="number">{{item.baojingshu}}</span>
            </p>
            <!-- <img v-if="item.baojingshu != 0" src="~A/daily/baojing.png" alt /> -->
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>
 
<script>
import dayjs from 'dayjs';
import { GPSlist, driverList } from '@/const/serious-alarm';
import { severityCount } from '@/api/daily/serious-alarm';

export default {
  name: 'alarm-list',
  // props: {
  //   search: {
  //     type: Object,
  //     default: () => new Object()
  //   }
  // },
  data() {
    return {
      active: {},
      alarmtime:[dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
        dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD')],
      GPSlist,
      driverList
    };
  },
  watch: {
    // search: 'getData'
    alarmtime() {
      this.getData();
      this.emitClick(this.GPSlist[0]);
    }
  },
  mounted() {
    // this.getData();
  },
  methods: {
    isActive(item) {
      return item.text == this.active.text && item.type == this.active.type;
    },
    getData() {
      let params = {
        company: this.$store.getters.deptName,
        beginTime:dayjs(this.alarmtime[0]).format('YYYY-MM-DD'),
        endTime:dayjs(this.alarmtime[1]).format('YYYY-MM-DD'),
       
      };
      severityCount(params).then(res => {
        this.GPSlist.forEach(item => {
          item.baojingshu = res.data.data.alarm[item.key];
        });
        this.driverList.forEach(item => {
          item.baojingshu = res.data.data.driver[item.key];
        });
      });
    },
    emitClick(item) {
      this.active = item;
      // this.active.beginTime=dayjs(this.alarmtime[0]).format('YYYY-MM-DD');
      // this.active.endTime=dayjs(this.alarmtime[1]).format('YYYY-MM-DD');
      this.$set( this.active, 'beginTime',dayjs(this.alarmtime[0]).format('YYYY-MM-DD') );
      this.$set( this.active, 'endTime', dayjs(this.alarmtime[1]).format('YYYY-MM-DD'));
     this.$emit('on-click', this.active);
    }
  }
};
</script>

<style lang="scss" >
</style>