<template>
  <div class="wh100 freight-table">
    <!-- 统计table -->
    <div class="base-table-container w100 h45">
      <table-search
        v-model="isTopSearch"
        :search="table.search"
        :columns="table.searchColumns"
        @search="getListTotal"
      ></table-search>
      <div class="buttons-panel dateTile">
        <span>统计时间：{{ dateTile }}</span>
        <div>
          <i-button
            v-for="item in topButtons"
            :key="item.label"
            size="small"
            type="primary"
            shape="circle"
            :icon="item.icon"
            @click="item.fn"
            >{{ item.label }}</i-button
          >
        </div>
      </div>
      <div class="table-box cost-stat-table">
        <i-table
          border
          :height="table.height"
          :loading="table.loading"
          :data="table.data"
          :columns="table.columns"
          sum-text="总计/元"
          :show-summary="table.data.length > 0"
          @on-sort-change="table.onSort"
        >
          <table-page
            slot="footer"
            v-model="table"
            @change="table.onList"
          ></table-page>
        </i-table>
      </div>
    </div>
    <div class="fenge h5">
      <img src="~A/operation/bioageline.png" />
    </div>
    <!-- tabs table -->
    <div class="tabs-container w100 h50">
      <table-search
        v-model="isSearch"
        :search="tabTable.search"
        :columns="tabTable.searchColumns"
        @search="getList"
      ></table-search>
      <div class="tabs-nav">
        <div
          :class="['tab', { active: active == item.label }]"
          v-for="(item, index) in tabs"
          :key="index"
          @click="toggTab(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="base-table-container">
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
        <div class="table-box tabs-table-box">
          <i-table
            border
            no-data-text="无数据明细"
            :loading="tabTable.loading"
            :height="tabTable.height"
            :data="tabTable.data"
            :columns="tabTable.columns"
            :show-summary="tabTable.data.length > 0"
            :summary-method="
              () => handleSummary(tabTable.columns, tabTable.data)
            "
          >
            <template slot="operation" slot-scope="{ row }">
              <img
                src="~A/icon/view.png"
                @click="view(row)"
                v-if="tab.type == '0'"
              />
              <img src="~A/icon/pen.png" @click="edit(row)" v-else />
              <img src="~A/icon/del.png" @click="remove(row)" />
            </template>
            <table-page
              slot="footer"
              v-model="tabTable"
              @change="tabTable.onList"
            ></table-page>
          </i-table>
        </div>
      </div>
    </div>
    <!-- 其他单表单  -->
    <table-form
      ref="form"
      v-model="drawer.show"
      :title="tab.label + (drawer.state == 'add' ? '新增' : '编辑')"
      :data="drawer.data"
      :columns="tabTable.columns"
      @close="drawer.show = false"
      @submit="drawerSubmit"
    ></table-form>
  </div>
</template>
 
<script>
import dayjs from 'dayjs';
import table from '@/mixin/table';
import { costStatTable, freightTabsConfig } from '@/const/operation';
import {
  getFreightList,
  delWaybill,
  getListTotal,
  getList,
  insert,
  update,
  remove,
  detail
} from '@/api/operation/freight';

export default {
  name: 'freight-table',
  components: {},
  mixins: [table],
  data() {
    costStatTable.onList = this.getListTotal;
    freightTabsConfig.forEach(v => (v.table = this.tableInit(v.table)));
    return {
      isSearch: false,
      isTopSearch: false,
      drawer: {
        show: false,
        loading: false,
        state: 'add',
        columns: [],
        data: {}
      },
      dateTile: '',
      tabs: freightTabsConfig,
      table: this.tableInit(costStatTable),
      active: '运单',
      topButtons: [
        { label: '条件查询', icon: 'md-search', fn: this.showTopSearch },
        { label: '刷新', icon: 'md-sync', fn: this.getListTotal }
      ],
      buttons: [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '新增', icon: 'md-add', fn: this.add },
        { label: '刷新', icon: 'md-sync', fn: this.getList }
      ],
      defaultDate: {}
    };
  },
  computed: {
    tab() {
      return this.tabs.find(v => v.label == this.active) || {};
    },
    tabTable() {
      return this.tab.table || {};
    }
  },
  created() {
    this.active = this.tabs[0].label;
    this.defaultDate = [
      dayjs().format('YYYY-MM') + '-01',
      dayjs().format('YYYY-MM-DD')
    ];
    this.table.search.date = this.defaultDate;
    this.tabTable.search.date = this.defaultDate;
    this.initTableColumns();
  },
  mounted() {
    this.getList();
    this.getListTotal();
  },
  methods: {
    // 获取上边费用统计列表数据
    getListTotal() {
      const table = this.table;
      table.loading = true;
      const search = table.search;
      let beginTime = dayjs(search.date[0]).format('YYYY-MM-DD');
      let endTime = dayjs(search.date[1]).format('YYYY-MM-DD');
      this.dateTile = beginTime + ' - ' + endTime;
      let query = {
        ...table.onParams(),
        beginTime,
        endTime
      };
      getListTotal(query).then(res => {
        table.onFill(res.data.data);
      });
    },
    // 自定义table列
    initTableColumns() {
      // this.table.columns.forEach(item => {
      //   if (item.ignore) return;
      //   item.children.forEach(item => {
      //     item.render = (h, params) => {
      //       return (
      //         <span class="pointer" onClick={() => this.cliclTableCell(params)}>
      //           {params.row[item.key]}
      //         </span>
      //       );
      //     };
      //     // 自定义表头
      //     item.renderHeader = (h, params) => {
      //       return (
      //         <span
      //           class="pointer"
      //           onClick={() => this.clickTableTitle(params.column)}
      //         >
      //           {params.column.title}
      //         </span>
      //       );
      //     };
      //   })

      // });
      let columns = this.table.columns.map(item => {
        if (item.title == '车辆' || item.title == '收入合计' || item.title == '支出合计') {
          return item;
        } else {
          item.children.forEach(item => {
            item.render = (h, params) => {
              return <span class="pointer" onClick={() => this.cliclTableCell(params)}>{params.row[item.key]}</span>;
            };
            // 自定义表头
            item.renderHeader = (h, params) => {
              return <span class="pointer" onClick={() => this.clickTableTitle(params.column)}>{params.column.title}</span>;
            };
          });

        }
      });
      return columns;
    },
    // 单元格点击事件
    cliclTableCell(params) {
      this.active = params.column.title;
      this.$nextTick(() => {
        this.tabTable.search.cheliangpaizhao = params.row.cheliangpaizhao;
        this.tabTable.search.date = this.table.search.date;
        this.getList();
      });
    },
    // 表头点击事件
    clickTableTitle(params) {
      this.active = params.title;
      this.$nextTick(() => {
        this.tabTable.search.cheliangpaizhao = '';
        this.getList();
      });
    },
    // 上面搜索
    showTopSearch() {
      this.isTopSearch = true;
    },
    // 合计计算
    handleSummary(cols, data) {
      const sums = {};
      cols.forEach((col, index) => {
        const key = col.key;
        sums[key] = { key, value: '' };
        if (index === 0) return (sums[key] = { key, value: '总计/元' });
        if (!col.sum) return;
        const values = data.map(v => Number(v[key]));
        const v = values.reduce((a, b) => a + b, 0);
        sums[key] = { key, value: v };
      });
      return sums;
    },
    // 下面搜索
    showSearch() {
      this.isSearch = true;
    },
    // 切换表格
    toggTab(item) {
      this.active = item.label;
      this.drawer.data = {};
      this.tabTable.search.date = this.defaultDate;
      this.getList();
    },
    add() {
      if (this.tab.type == '0') {
        this.$emit('state', 'add');
      } else {
        this.drawer.data = {};
        this.drawer.show = true;
        this.drawer.state = 'add';
      }
    },
    view(row) {
      this.$emit('state', 'view', row);
    },
    edit(row) {
      detail(row.id).then(res => {
        this.drawer.state = 'edit';
        this.drawer.data = res.data.data;
        this.drawer.show = true;
      });
    },
    // 获取下面各种费用详情
    getList() {
      let table = this.tabTable;
      let search = table.search;
      let query = {
        ...table.onParams(),
        beginTime: dayjs(search.date[0]).format('YYYY-MM-DD'),
        endTime: dayjs(search.date[1]).format('YYYY-MM-DD'),
        type: this.tab.type
      };
      table.loading = true;
      let api = this.tab.type == '0' ? getFreightList : getList;
      api(query).then(res => table.onFill(res.data.data));
    },
    remove(row) {
      this.$modal.confirm({
        title: '刪除',
        content: '确定将该数据删除?',
        onOk: () => {
          let api = this.tab.type == '0' ? delWaybill : remove;
          api(row.id).then(res => {
            const data = res.data;
            if (data.code == 200 && data.success) {
              this.getList();
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    drawerSubmit(data) {
      data.type = this.tab.type;
      data.biaozhi = 0;
      let api = this.drawer.state == 'add' ? insert : update;
      api(data).then(res => {
        if (res && res.data.success) {
          this.$message.success(res.data.msg);
          this.drawer.show = false;
          this.getList();
        }
      });
    }
  }
};
</script>
 
<style lang="scss" >
.ivu-table-border td,
.ivu-table-border th {
  border-right: 1px solid #c5c8ce;
}
.ivu-table td,
.ivu-table th {
  border-bottom: 1px solid #c5c8ce;
}
.ivu-table-wrapper {
  overflow: inherit;
}
.ivu-table-sort {
  width: 36px;
  height: 14px;
}
.ivu-table-sort i {
  font-size: 30px;
}
.freight-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .dateTile {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    & > span {
      color: #2d8cf0;
      font-weight: 700;
    }
  }

  .ivu-table-cell {
    img {
      cursor: pointer;
    }
  }
  .fenge {
    width: 100%;
    // height: 5%;
    img {
      max-width: 100%;
    }
  }
  .tabs-container {
    .tabs-nav {
      display: flex;
      justify-content: space-around;
      height: 45px;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      .tab {
        cursor: pointer;
        height: 100%;
        line-height: 45px;
      }
      .active {
        border-bottom: 2px solid #2d8cf0;
      }
    }
    .base-table-container {
      height: calc(100% - 45px);
    }
  }
}
</style>