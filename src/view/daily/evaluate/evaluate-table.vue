<template>
  <div class="info-left">
    <i-spin v-show="stateLoading" fix></i-spin>
    <div class="left-top">
      <div class="left-box">
        <div
          v-for="(item, index) in periodList"
          :key="index"
          :class="[
            'data-box',
            { 'data-boxActive': item.zijianzhouqi == zijianzhouqi }
          ]"
          @click="search(item)"
        >
          <img
            v-if="item.zijianzhouqi != zijianzhouqi"
            :src="periodImg(item.zijianzhouqi)"
          />
          <img v-else :src="periodActive(item.zijianzhouqi)" />
          <div class="number">
            {{ showPeriod(item.number) }}{{ item.zijianzhouqi }}
          </div>
        </div>
      </div>
      <div class="history" @click="showHistory = true">
        <img src="~A/evaluate/lishi.png" />历史
      </div>
    </div>
    <div class="stat-info">
      <div v-show="isWanjie != 1" class="button" @click="save">
        <img src="~A/evaluate/baocun.png" />保存
      </div>
      <div v-show="isWanjie != 1" class="button" @click="finish">
        <img src="~A/evaluate/wanjie.png" />
        {{ isWanjie == 1 ? '已完结' : '完结' }}
      </div>
      <div class="stat-detail">
        <div>
          <span
            >资料需完善总项 <b style="color:#333">{{ statisticsData.sum }}</b
            >项,</span
          >
          <span
            >已完善 <b>{{ statisticsData.wanshan }}</b
            >项,</span
          >
          <span
            >未完善 <b style="color:red">{{ statisticsData.weiwanshan }}</b
            >项,</span
          >
          <span
            >现场检查 <b>{{ statisticsData.xianchangjiancha }}</b
            >项,</span
          >
          <span
            >完善率 <b>{{ statisticsData.wanshanlv }}</b></span
          >
        </div>

        <span v-show="isWanjie == 1"> 完结时间： {{ wanjieshijian }} </span>
      </div>
    </div>
    <div v-if="table.data.length != 0" class="table-title">
      <b>{{ documentTitle }}</b>
    </div>
    <div v-if="table.data.length != 0" class="left-centent">
      <i-table
        v-if="reFresh"
        ref="evaluateTable"
        border
        stripe
        highlight-row
        :loading="table.loading"
        :height="table.height"
        :columns="table.columns"
        :data="table.data"
        @on-sort-change="table.onSort"
      >
        <template slot="test" slot-scope="{ row }">
          <div v-if="isWanjie != 1">
            <img
              v-if="row.isHege == 1"
              src="~A/evaluate/switch-green.png"
              class="pointer"
              @click="row.isHege = 0"
            />

            <img
              v-else
              src="~A/evaluate/switch-red.png"
              class="pointer"
              @click="row.isHege = 1"
            />
          </div>
          <div v-else>
            <img v-if="row.isHege == 1" src="~A/evaluate/switch-green.png" />
            <img v-else src="~A/evaluate/switch-red.png" />
          </div>
        </template>

        <template slot="remark" slot-scope="{ row }">
          <i-input
            v-if="isWanjie != 1"
            v-model="row.beizhu"
            style="width: 100px"
          ></i-input>
          <span v-else>
            {{ row.beizhu }}
          </span>
        </template>
        <template slot="file" slot-scope="{ row }">
          <img
            src="~A/evaluate/file.png"
            class="pointer"
            @click="rowClick(row)"
          />
          <span>({{ row.count == '' ? 0 : row.count }})</span>
        </template>
      </i-table>
    </div>
    <div v-show="table.data.length == 0" class="zanwu">
      无数据
    </div>
    <evaluate-history
      v-model="showHistory"
      @getHistoryData="getHistoryData"
    ></evaluate-history>
  </div>
</template>
<script>
import table from '@/mixin/table';
import { evaluateTable } from '@/const/evaluate';
import { getList, updatetable, setWanjie, periodList } from '@/api/evaluate';
import evaluateHistory from './history';
export default {
  inject: ['reload'],
  name: 'evaluate-table',
  components: {
    evaluateHistory,
  },
  mixins: [table],
  data() {
    evaluateTable.onList = this.getList;
    return {
      table: this.tableInit(evaluateTable),
      activeTab: {},
      periodList: [],
      period: '季度',
      showHistory: false,
      documentTitle: '文档标题',
      isWanjie: 1,
      saveState: 'update',
      finishId: '',
      statisticsData: {},
      finishState: '完结',
      wanjieshijian: '',
      reFresh: true,
      stateLoading: false,
      tableId: '',
      zijianzhouqi: ''
    };
  },
  computed: {

  },


  mounted() {
    this.getList('list');
    this.getPeriodList();
  },
  methods: {
    showPeriod(data) {
      let period = '';
      if (data == 0) {
        period = '上';
      } else if (data == 1) {
        period = '下';
      } else {
        period = data;
      }
      return period;
    },
    periodImg(img) {
      return require('@/assets/evaluate/' + img + '.png');
    },
    periodActive(img) {
      return require('@/assets/evaluate/' + img + '-h.png');
    },
    // 合并单元格
    mergeCell(table, startRow, endRow, col) {
      let tb = document.querySelector(table);
      if (!tb || !tb.rows || tb.rows.length <= 0) {
        return;
      }
      if (
        col >= tb.rows[0].cells.length ||
        (startRow >= endRow && endRow != 0)
      ) {
        return;
      }
      if (endRow == 0) {
        endRow = tb.rows.length - 1;
      }
      for (let i = startRow; i < endRow; i++) {
        if (
          this.table.data[startRow][this.table.columns[col].key] ==
          this.table.data[i + 1][this.table.columns[col].key]
        ) {
          tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[col]);
          tb.rows[startRow].cells[col].rowSpan =
            tb.rows[startRow].cells[col].rowSpan + 1;
        } else {
          this.mergeCell(table, i + 1, endRow, col);
          break;
        }
      }
    },
    // 获取列表数据
    getList(type) {
      let params = {
        yunyingleixing: this.type,
        deptid: this.$store.getters.deptId,
        zijianzhouqi: type != 'list' ? type : '',
      };
      this.reFresh = false;
      getList(params).then(res => {
        let data = res.data.data;
        this.table.data = data.list;
        this.finishId = res.data.data.id;
        this.tableId = data.id;
        this.statisticsData = data.zipinjiachaXiangQing;
        this.wanjieshijian = res.data.data.wanjieshijian;
        this.loading = false;
        this.zijianzhouqi = data.zijianzhouqi;
        this.documentTitle = data.biaoti;
        this.isWanjie = data.isWanjie;
        this.reFresh = true;
        this.$nextTick(() => {
          if (this.table.data.length != 0) {
            this.mergeCell('.left-centent .ivu-table-body table', 0, 0, 0);
          }
          this.table.onResize();
        });

      });

    },
    // 获取周期列表
    getPeriodList() {
      let params = {
      };
      periodList(params).then(res => {
        this.periodList = res.data.data;
      });
    },
    // 保存和更新
    save() {
      this.stateLoading = true;
      let updateList = this.$refs.evaluateTable.rebuildData.map(item => {
        item.id = item.jieguoid;
        return item;
      });
      let updateParams = {
        list: updateList,
        tableId: this.tableId == '' ? '' : this.tableId
      };
      updatetable(updateParams).then(res => {
        let data = res.data.data;
        if (res.data.success) {
          this.table.data = data.list;
          this.statisticsData = data.zipinjiachaXiangQing;
          this.$message.success('保存成功！');
          this.stateLoading = false;
        }
      });
    },
    // 搜索
    search(item) {
      this.zijianzhouqi = item.zijianzhouqi;
      this.getList(item.zijianzhouqi);
    },
    // 点击查看
    rowClick(row) {
      this.$emit('on-click', row);
    },
    // 查看自检历史详情
    getHistoryData(data) {
      this.tableId = data.id;
      this.isWanjie = data.isWanjie;
      this.table.data = data.list;
      this.statisticsData = data.zipinjiachaXiangQing;
      this.wanjieshijian = data.wanjieshijian;
      this.zijianzhouqi = data.zijianzhouqi;
      this.documentTitle = data.biaoti;
      this.finishId = data.id;
      this.reFresh = false;
      this.getPeriodList();
      this.$nextTick(() => {
        this.reFresh = true;
        this.table.onResize();
        this.$nextTick(() => this.mergeCell('.ivu-table-body table', 0, 0, 0));
      });
    },
    // 完结
    finish() {
      let id = this.finishId;
      setWanjie(id).then(res => {
        let data = res.data.data;
        if (res.data.success) {
          this.table.data = data.list;
          this.statisticsData = data.zipinjiachaXiangQing;
          this.wanjieshijian = data.wanjieshijian;
          this.isWanjie = data.isWanjie;
          this.$message.success('已完结！');
        }
      });
    }
  }
};
</script>
<style lang="scss">
.info-left {
  padding: 10px;
  .left-centent {
    .pointer {
      cursor: pointer;
      vertical-align: bottom;
      margin-right: 6px;
    }
  }
  .zanwu {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: center;
  }
  .left-top {
    justify-content: space-between !important;
    padding: 14px 10px 0 14px !important;
    background: #4fa7fe;
    color: #fff;
    align-items: center;
    border-radius: 4px;
    .left-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .data-box {
        display: flex;
        position: relative;
        width: 140px;
        img {
          position: static;
          z-index: 1;
        }
        .number {
          background: #4ec3fd;
          height: 36px;
          border-radius: 30px;
          line-height: 36px;
          position: absolute;
          left: 12px;
          z-index: 0;
          width: calc(100% - 30px);
          text-align: center;
        }
      }
      .data-boxActive {
        .text {
          color: #333;
          background: #ffd116;
        }
        .number {
          background: #4edffc;
          color: #333;
        }
      }
    }

    .history {
      color: #333;
      background: #cae3fc;
      cursor: pointer;
      padding: 2px 24px;
      border-radius: 50px;
    }
  }
  .stat-info {
    display: flex;
    align-items: center;
    padding: 10px 0;
    & > div {
      margin-right: 10px;
    }
    .button {
      border-radius: 20px;
      background: #2d8cf0;
      color: #fff;
      height: 30px;
      width: 110px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
    .stat-detail {
      display: flex;
      justify-content: space-between;
      width: 100%;
      span {
        margin-right: 6px;
        color: #999;
      }
      b {
        color: #146aff;
      }
    }
  }
  .table-title {
    width: 100%;
    padding: 8px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    border: 1px solid #cccc;
    box-sizing: border-box;
  }
}
</style>

