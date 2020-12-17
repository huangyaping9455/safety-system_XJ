<template>
  <div class="white-bg base-table-container wh100">
    <!-- 搜索参数 -->
    <table-search
      v-model="isSearch"
      :search="table.search"
      :columns="table.searchColumns"
      @search="getList"
    ></table-search>

    <!-- 表单 -->
    <table-form
      v-model="isForm"
      :title="stateObj.title"
      :data="table.row"
      :columns="table.columns"
      :submit="submit"
    ></table-form>

    <div class="buttons-panel">
      <i-button
        v-for="item in buttons"
        :key="item.label"
        size="small"
        type="primary"
        shape="circle"
        :icon="item.icon"
        @click="item.fn"
      >{{item.label}}</i-button>
    </div>
    <div class="table-box">
      <i-table
        border
        :height="table.height"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
      >
        <template slot="operation" slot-scope="{row}">
          <img src="~A/icon/pen.png" class="pointer" @click="eidt(row)" />
          <img src="~A/icon/del.png" class="pointer" @click="del(row)" />
        </template>
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
 
<script>
import table from '@/mixin/table';
import { contractTableConfig } from '@/const/operation';
import { getList, update, insert, del } from '@/api/operation/contract';
export default {
  name: 'contract-table',
  mixins: [table],
  data() {
    return {
      isForm: false,
      isSearch: false,
      state: 'add',
      table: this.tableInit(contractTableConfig),
      buttons: [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '新增', icon: 'md-add', fn: this.add },
        { label: '刷新', icon: 'md-sync', fn: this.getList }
      ]
    };
  },
  computed: {
    stateObj() {
      let a = { title: '合同管理 - 新增', action: insert };
      let b = { title: '合同管理 - 编辑', action: update };
      return this.state == 'add' ? a : b;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    add() {
      this.state = 'add';
      this.table.row = {};
      this.isForm = true;
    },
    eidt(row) {
      this.state = 'edit';
      this.table.row = row;
      this.isForm = true;
    },
    del(row) {
      this.$modal.confirm({
        title: '刪除合同',
        content: '确定将该数据删除?',
        onOk: () => {
          del(row.id).then(res => {
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
    showSearch() {
      this.isSearch = true;
    },
    async submit(data) {
      let res = await this.stateObj.action(data);
      if (res.data.success) this.getList();
      return res;
    },
    getList() {
      let table = this.table;
      table.loading = true;
      let params = table.onParams();
      getList(params).then(res => {
        table.onFill(res.data.data);
      });
    }
  }
};
</script>
 
<style lang="scss" >
.freight-table {
  .ivu-table-cell {
    img {
      cursor: pointer;
    }
  }
}
</style>