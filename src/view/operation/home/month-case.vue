<template>
  <div class="month-case wh100">
    <div class="t-info">
      <p class="title">{{ monthTime }}月运营情况</p>
      <div class="number-info">
        <div v-for="(item, n) in monthNumber" :key="n" class="block">
          <span class="number"
            >{{ dayData[item.field] || 0 }}{{ item.value }}</span
          >
          <p class="navy-blue">{{ item.title }}</p>
        </div>
      </div>
    </div>
    <div class="content-info">
      <div class="title-box">
        <span
          v-for="(item, index) in tabData"
          :key="index"
          :class="['tab-block', { 'tab-active': item.title == active.title }]"
          @click="tabClick(item)"
          >{{ item.title }}</span
        >
      </div>
      <div class="content">
        <div class="base-table-container vehicle-tables wh100">
          <!-- 导出 -->
          <export-excel
            v-model="isExprot"
            :columns="table.columns"
            :name="active.title"
            :export="getList"
          ></export-excel>
          <table-search
            v-model="isSearch"
            :search="table.search"
            :columns="table.searchColumns"
            @search="getList"
          ></table-search>
          <!-- 按钮操作面板 -->
          <div class="buttons-panel">
            <i-button
              v-for="item in buttons"
              :key="item.label"
              size="small"
              type="primary"
              shape="circle"
              :icon="item.icon"
              @click="item.fn"
              >{{ item.label }}</i-button
            >
          </div>
          <div class="table-box">
            <i-table
              border
              :height="table.height"
              :loading="table.loading"
              :data="table.data"
              :columns="table.columns"
              @on-sort-change="table.onSort"
            >
              <template slot="type" slot-scope="{ row }">
                <img
                  v-if="row.zhuangtai == '合格'"
                  src="~A/operation/hege.png"
                  class="type"
                />
                <img v-else src="~A/operation/buhege.png" class="type" />
              </template>
              <template slot="operation" slot-scope="{ row }">
                <img
                  class="pointer"
                  src="~A/icon/view.png"
                  @click="view(row)"
                />
              </template>
              <table-page
                slot="footer"
                v-model="table"
                @change="table.onList"
              ></table-page>
            </i-table>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-window" v-show="showPop" @click.self="showPop = false">
      <div
        class="popup-container"
        :style="{ width: showPop ? '800px' : '0px' }"
      >
        <div class="head">
          <plate
            class="plate"
            color="黄色"
            :text="popInfo.cheliangpaizhao"
          ></plate>
          <span class="title">运营情况</span>
          <icon class="close" type="md-close" @click="showPop = false"></icon>
        </div>
        <div class="scroll-box">
          <scroll>
            <div class="chart-box flex">
              <div class="box">
                <e-chart
                  class="chart"
                  :options="popChart"
                  @click="onClick"
                  autoresize
                ></e-chart>
              </div>
              <div class="info">
                <div class="num">{{ popInfo.wanchenglv }}%</div>
                <div>{{ monthTime.split('-')[0] }} 年运营合格率</div>
              </div>
            </div>
            <div class="info-box">
              <p v-if="change" class="title">
                {{ monthTime.split('-')[0] + '-' + monthData }}里程情况
              </p>
              <p v-else class="title">{{ monthTime }} 里程情况</p>

              <div class="row">
                <div class="icon-box">
                  <img src="~A/operation/daolu.png" alt />
                  <span>行驶里程</span>
                </div>
                <div class="num">{{ popInfo.shiji }}公里</div>
              </div>
              <div class="row">
                <div class="icon-box">
                  <img src="~A/operation/dingwei.png" alt />
                  <span>达标里程</span>
                </div>
                <div class="num">{{ popInfo.dabiao }}公里</div>
              </div>
            </div>
            <div
              class="evaluate"
              :style="
                popInfo.zhuangtai == '合格'
                  ? 'background:#2ce033'
                  : 'background:#F44336'
              "
            >
              <span>里程评价</span>
              <span class="title">{{ popInfo.zhuangtai }}</span>
            </div>
          </scroll>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import dayjs from 'dayjs';
import table from '@/mixin/table';
import { zaiyunTableConfig, carPopChart } from '@/const/operation';
import { getListJianKong, getCarYunYing, selectByYunYingMonth } from '@/api/operation/home';
import plate from 'C/plate';

export default {
  name: 'month-case',
  components: {
    plate
  },
  mixins: [table],
  props: {
    date: Number,
    dayData: {
      type: Object
    },
    yueChart: {
      type: Array
    },
    chartMonth: {
      type: String
    }
  },
  data() {
    zaiyunTableConfig.onList = this.getList;
    return {
      showPop: false,
      popInfo: {},
      active: {}, //当前表格
      monthNumber: [
        {
          field: 'yuechuku',
          title: '本月出货量（吨）',
          value: ''
        },
        {
          field: 'yueruku',
          title: '本月入库量（吨）',
          value: ''
        },
        {
          field: 'yuezaixian',
          title: '本月在线率',
          value: '%'
        },
        {
          field: 'yuewancheng',
          title: '本月里程达标率',
          value: '%'
        }
      ],
      tabData: [
        {
          field: 'richuku',
          title: '监控车辆数'
        }
      ],
      table: this.tableInit(zaiyunTableConfig),
      isExprot: false, //导出
      isSearch: false,
      buttons: [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '导出', icon: 'md-cloud-download', fn: this.showExprot }//
      ],
      monthData: '',
      rowData: {},
      change: false
    };
  },
  computed: {
    monthTime() {
      return dayjs().format('YYYY') + '-' + this.date;
    },
    popChart() {
      let title =
        this.popInfo.cheliangpaizhao +
        '-' +
        this.monthTime.split('-')[0] +
        '年度运营情况';
      return carPopChart(title, this.popInfo.chartData || []);
    }
  },
  watch: {
    monthTime() {
      this.getList();
    }
  },
  mounted() {
    this.active = this.tabData[0];
    this.getList();
  },
  methods: {
    tabClick(item) {
      this.active = item;
    },
    // 获取列表数据
    async getList(params = {}) {
      const table = this.table;
      table.loading = true;
      let query = {
        ...table.onParams(),
        ...params,
        month: this.date,
        year: dayjs().format('YYYY')
      };
      let res = await getListJianKong(query);
      let data = res.data.data;
      table.onFill(data);
      return data;
    },
    // 显示下载
    showExprot() {
      this.isExprot = true;
    },
    showSearch() {
      this.isSearch = true;
    },
    view(row) {
      this.rowData = row;
      getCarYunYing({ cheliangpaizhao: row.cheliangpaizhao, month: this.monthData, chepaiyanse: row.chepaiyanse }).then(res => {
        let chartData = res.data.data.list.map(v => v.wanchenglv * 100);
        let wanchenglv = res.data.data.wanchenglv;
        this.popInfo = {
          ...row,
          chartData,
          wanchenglv
        };
        this.showPop = true;
      });
    },
    onClick(e) {
      this.change = true;
      this.monthData = e.name.substring(0, e.name.length - 1);
      selectByYunYingMonth({ cheliangpaizhao: this.rowData.cheliangpaizhao, yue: this.monthData, chepaiyanse: this.rowData.chepaiyanse }).then(res => {
        let data = res.data.data;
        this.popInfo = {
          ...this.popInfo,
          ...data
        };
      });
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';
.month-case {
  padding: 10px;
  position: absolute;

  .navy-blue {
    color: #0e48a7;
  }
  .blue {
    color: #1067ff;
  }
  .t-info {
    width: 100%;
    height: 180px;
    margin: 0 auto;
    .title {
      margin: 10px 0;
      font-size: 18px;
      text-align: center;
      color: #333;
      font-weight: 600;
    }
    .number-info {
      width: 100%;
      height: 120px;
      @include box-center($justify: space-between, $align: false);
      .block {
        height: 100%;
        width: calc(25% - 10px);
        background: #d6ebff;
        border-radius: 4px;
        @include box-center($justify: space-evenly, $align: center);
        flex-direction: column;
        .number {
          font-family: 'Flip Flop';
          font-size: 32px;
          color: #515a6e;
        }
        p {
          text-align: center;
          font-size: 18px;
        }
      }
    }
  }
  .content-info {
    height: calc(100% - 180px);
    .title-box {
      height: 40px;
      padding-left: 15px;
      border-bottom: 1px solid #dddddd;
      .tab-block {
        display: inline-block;
        height: 100%;
        padding: 0 10px;
        margin-right: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 600;
      }
      .tab-active {
        color: #1067ff;
        border-bottom: 2px solid #1067ff;
      }
    }
    .content {
      height: calc(100% - 40px);
    }
  }
  .popup-container {
    height: 88vh;
    top: 7vh;
    position: absolute;
    right: 0px;
    background: white;
    color: black;
    padding: 12px 20px;
    transition: all 0.4s;
    .head {
      width: 800px;
      display: flex;
      align-items: center;
      font-weight: 700;
      height: 40px;
      .title {
        margin-left: 10px;
        font-size: 20px;
      }
      .close {
        position: absolute;
        right: 30px;
        font-size: 25px;
        cursor: pointer;
      }
    }
    .scroll-box {
      width: 760px;
      height: calc(100% - 40px);
    }
    .chart-box {
      height: 280px;
      justify-content: space-between;
      align-items: center;

      .box {
        width: calc(100% - 150px);
        height: 100%;
      }
      .info {
        height: calc(100% - 80px);
        width: 140px;
        margin-left: 10px;
        background: #4ea7ff;
        display: flex;
        border-radius: 6px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: black;

        .num {
          color: white;
          font-weight: 700;
          font-size: 50px;
          margin-bottom: 20px;
        }
      }
    }

    .info-box {
      background: #f3f9ff;
      padding: 20px 30px;
      margin-bottom: 20px;
      .title {
        text-align: center;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 1px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;
        .icon-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            margin-bottom: 10px;
          }
        }
        .num {
          font-size: 30px;
          font-weight: 600;
        }
      }
    }
    .evaluate {
      display: flex;
      justify-content: space-between;
      background: #1e70ff;
      color: white;
      padding: 6px 20px;
      align-items: center;
      font-size: 16px;
      letter-spacing: 2px;
      border-radius: 5px;

      .title {
        font-size: 28px;
        margin-right: 30px;
      }
    }
  }
}
</style>