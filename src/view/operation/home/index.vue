<template>
  <i-split v-model="split" :min="0.3" :max="0.3">
    <year-case
      slot="left"
      :split="split"
      :dayData="topData"
      :zaiyun="zaiyun"
      :onLine="onLine"
      :wancheng="wancheng"
      @dateChange="dateChange"
    ></year-case>
    <month-case
      slot="right"
      :date="date"
      :dayData="topData"
      :chartMonth="chartMonth"
      :yueChart="yueChart"
    ></month-case>
  </i-split>
</template>
 
<script>
import monthCase from './month-case';
import yearCase from './year-case';
import { getHome } from '@/api/operation/home';
import dayjs from 'dayjs';
export default {
  name: 'operation',
  components: {
    monthCase,
    yearCase
  },
  data() {
    return {
      split: 0.5,
      topData: {}, // 头部数据
      unused: [], // 闲置
      zaiyun: [], // 在运
      nianChart: [], // 年图表
      yueChart: [], // 月图表
      chartMonth: '',
      onLine: [],
      wancheng: [],
      date: Number(
        dayjs()
          .subtract(1, 'month')
          .format('MM')
      )
    };
  },
  mounted() {
    this.getHome();
  },
  methods: {
    dateChange(date) {
      this.date = Number(date);
      this.getHome();
    },
    getHome() {
      getHome({ yue: this.date }).then(res => {
        this.topData = res.data.data.home;
        this.onLine = res.data.data.zaixian.map(item => {
          return item.zaixianlv;
        });
        this.wancheng = res.data.data.wancheng.map(item => {
          return item.wanchenglv;
        });
      });
    }
  }
};
</script>
 
<style lang="scss" >
</style>