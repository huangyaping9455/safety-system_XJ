import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

export default {
  computed: {},
  data() {
    return {
      CHART: null
    };
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartResizeContainer);
  },
  methods: {
    // 初始化图表
    chartInit(charts) {
      let arr = Array.isArray(charts) ? charts : [charts];
      this.CHART = {};
      arr.forEach((chart) => {
        chart.$ref = echarts.init(document.querySelector(chart.$container));
        chart.$ref.setOption(chart);
        this.CHART[chart.$name] = chart;
      });
      window.addEventListener('resize', this.chartResizeContainer);
    },
    // 自适应图表
    chartResizeContainer() {
      for (const $name in this.CHART) {
        if (this.CHART[$name].$ref) {
          this.CHART[$name].$ref.resize();
        }
      }
    }
  }
};
