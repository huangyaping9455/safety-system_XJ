<template>
  <div class="alarm-list">
    <div
      class="list-item h50-5"
      v-if="$parent.$parent.$parent.$parent.tabn == 0"
    >
      <!-- <div class="baojing-title">
        <img src="~A/daily/GPS.png" alt />
        <p>北斗设备报警</p>
      </div> -->
      <div class="facility-alarm">
        <!-- <scroll> -->
        <div
          v-for="item in GPSlist"
          :key="item.text"
          class="block"
          @click="emitClick(item)"
        >
          <span :class="['tab-btn', { checked: isActive(item) }]">
            {{ item.text }}
          </span>
          <img v-if="item.baojingshu !== 0" src="~A/daily/baojing.png" alt />
        </div>
        <!-- </scroll> -->
      </div>
    </div>
    <div
      class="list-item h50-5"
      v-if="$parent.$parent.$parent.$parent.tabn == 1"
    >
      <!-- <div class="baojing-title">
        <img src="~A/daily/active.png" alt />
        <p>主动安全设备报警</p>
      </div> -->
      <div class="facility-alarm">
        <!-- <scroll> -->
        <div
          v-for="(item, index) in driverList"
          :key="index"
          class="block"
          @click="emitClick(item)"
        >
          <span :class="['tab-btn', { checked: isActive(item) }]">
            {{ item.text }}
          </span>
          <img v-if="item.baojingshu !== 0" src="~A/daily/baojing.png" alt />
        </div>
        <!-- </scroll> -->
      </div>
    </div>
  </div>
</template>

<script>
import { GPSlist, driverList } from "@/const/alarm";
import { getAlarmTongji } from "@/api/daily/alarm";
import dayjs from "dayjs";

export default {
  name: "alarm-list",
  props: {
    search: {
      type: Object,
      default: () => new Object(),
    },
  },
  data() {
    return {
      active: {},
      GPSlist,
      driverList,
      beginTime: dayjs()
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
      endTime: dayjs().format("YYYY-MM-DD"),
    };
  },
  watch: {
    // search: 'getData'
    search() {
      this.getData();
    },
  },
  // 进入报警处理页面时，默认渲染得表格
  beforeMount() {
    if (this.$route.query.alarmType == undefined) {
      this.emitClick(GPSlist[0]);
    } else {
      for (let i in this.GPSlist) {
        if (this.GPSlist[i].text == this.$route.query.alarmType) {
          this.emitClick(GPSlist[i]);
        }
      }
      let path = this.$route.path;
      this.$router.push(path);
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    isActive(item) {
      return item.text == this.active.text && item.type == this.active.type;
    },
    getData() {
      let params = {
        deptName: this.$store.getters.deptName,
        beginTime: this.beginTime,
        endTime: this.endTime,
      };
      getAlarmTongji(params).then((res) => {
        this.GPSlist.forEach((item) => {
          item.baojingshu = res.data.data.gps[item.key];
        });
        this.driverList.forEach((item) => {
          item.baojingshu = res.data.data.driver[item.key];
        });
      });
    },
    // 点击 按钮 切换表格
    emitClick(item) {
      this.active = item;
      this.$emit("on-click", item);
    },
  },
};
</script>

<style lang="scss">
.table-box {
  margin-top: 0;
}
</style>
