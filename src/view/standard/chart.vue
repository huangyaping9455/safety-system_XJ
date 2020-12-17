<template>
  <div class="statistics-chart">
    <e-chart class="month chart h33" :options="monthChart" autoresize></e-chart>
    <div class="pie h33">
      <e-chart class="quarter chart" :options="quarterChart" autoresize></e-chart>
      <e-chart class="half-year chart" :options="halfYearChart" autoresize></e-chart>
    </div>
    <e-chart class="year chart h33" :options="yearChart" autoresize></e-chart>
  </div>
</template>
 
<script>
import dayjs from 'dayjs';
import { getDaysCheart, getYerCheart } from '@/api/standard';
import {
  monthChart,
  quarterChart,
  halfYearChart,
  yearChart
} from '@/const/standard';

export default {
  name: 'chart',
  data() {
    return {
      monthData: [],
      yearData: [],
      quarterData: [],
      halfYearData: []
    };
  },
  computed: {
    deptName() {
      return this.$store.getters.userInfo.deptName;
    },
    // 月统计图
    monthChart() {
      return monthChart(this.monthData, this.monthData.length);
    },
    // 季度统计图
    quarterChart() {
      return quarterChart(this.quarterData);
    },
    // 年统计图
    yearChart() {
      return yearChart(this.yearData);
    },
    // 半年统计图
    halfYearChart() {
      return halfYearChart(this.halfYearData);
    }
  },
  mounted() {
    this.getDaysCheartData();
    this.getYersCheartData();
  },
  methods: {
    getDaysCheartData() {
      getDaysCheart({
        company: this.deptName,
        tongjiriqi: dayjs().format('YYYY-MM-DD')
      }).then(res => {
        this.monthData = res.data.data.map(item => item.counts);
      });
    },
    getYersCheartData() {
      getYerCheart({
        company: this.deptName
      }).then(res => {
        let data = res.data.data;
        this.yearData = data.list.map(item => item.counts);
        this.quarterData = [data.jidu1, data.jidu2, data.jidu3, data.jidu4];
        this.halfYearData = [data.shangbannian, data.xiabannian];
      });
    }
  }
};
</script>
 
<style lang="scss" >
.statistics-chart {
  width: 100%;
  height: 100%;
  background: url('~A/standard/map-bg.png') no-repeat center 30%;
  background-size: 80% auto;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .chart {
    width: 100%;
  }
  .pie {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .chart {
      width: 50%;
      height: 100%;
    }
  }
}
</style>