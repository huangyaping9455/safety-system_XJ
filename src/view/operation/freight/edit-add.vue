<template>
  <div class="wh100 freight-add">
    <h2 class="title">{{ stateObj.title }}</h2>
    <div class="main">
      <scroll>
        <i-spin v-show="stateLoading" fix></i-spin>
        <!-- 运单Tab -->
        <div class="head-tabs">
          <div
            v-for="(item, index) in tabsList"
            :key="index"
            :class="{ active: item.field == active.field, load: item.load }"
            @click="toggle(item)"
          >
            <img :src="item.img" alt />
            <span>{{ item.title }}</span>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="btn-box">
          <i-button
            v-if="active.field == 'other'"
            icon="md-add"
            type="primary"
            shape="circle"
            @click="addOtherBill"
          >新增</i-button>
          <i-button v-else icon="md-create" type="primary" shape="circle" @click="openForm">编辑</i-button>
        </div>
        <!-- 运单展示 -->
        <div class="bills-box">
          <scroll>
            <!-- 出库单 -->
            <bill-warehouse-out v-show="active.field == 'chukudan'" :config="stockOutConfig"></bill-warehouse-out>
            <!-- 入库单 -->
            <bill-warehouse-in v-show="active.field == 'rukudan'" :config="stockInConfig"></bill-warehouse-in>
            <!-- 其他单据 -->
            <bill-other
              v-show="active.field == 'other'"
              :config="stockOtherConfig"
              @open="openForm"
            ></bill-other>
          </scroll>
        </div>
      </scroll>
    </div>
    <div>
      <!-- 新增费用 -->
      <!-- <bill-expenses
        v-show="tableName.label != '运单'"
        :config="stockInConfig"
      ></bill-expenses>-->
    </div>
    <div class="foot">
      <i-button icon="md-checkmark" type="primary" shape="circle" @click="submit">确定</i-button>
      <i-button
        v-if="state == 'edit'"
        icon="md-arrow-back"
        type="primary"
        shape="circle"
        @click="backView"
      >返回</i-button>
    </div>
    <!-- 运单表单 -->
    <table-form
      ref="form"
      v-model="isOpen"
      :title="active.title + '-单据'"
      :clone="false"
      :data="active.data"
      :columns="active.column"
      @close="closeForm"
      @submit="finishForm"
    ></table-form>
  </div>
</template>
 
<script>
import billWarehouseOut from './bill-warehouse-out';
import billWarehouseIn from './bill-warehouse-in';
import billOther from './bill-other';
// import billExpenses from './bill-expenses';
import tableForm from 'C/table-part/form';
import { addWaybill, editWaybill } from '@/api/operation/freight';
import {
  stockInConfig,
  stockOutConfig,
  stockOtherConfig
} from '@/const/operation';
export default {
  name: 'add-edit-waybill',
  components: {
    tableForm,
    billWarehouseOut,
    billOther,
    billWarehouseIn
    // billExpenses
  },
  props: {
    state: {
      type: String,
      default: 'add'
    },
    row: {
      type: Object
    },
    tableName: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      stateLoading: false,
      isOpen: false,
      active: {},
      vehicleList: [],
      stockInConfig: stockInConfig(),
      stockOutConfig: stockOutConfig(),
      stockOtherConfig: stockOtherConfig()
    };
  },
  computed: {
    tabsList() {
      return [this.stockOutConfig, this.stockInConfig, this.stockOtherConfig];
    },
    stateObj() {
      let a = { title: '新增运单', init: this.resetBill, api: addWaybill };
      let b = { title: '编辑运单', init: this.fillBill, api: editWaybill };
      return this.state == 'edit' ? b : a;
    }
  },
  watch: {
    state: {
      immediate: true,
      handler() {
        // 如果是新增，重置表单，如果是编辑则实设置完成状态
        let isEdit = this.state == 'edit';
        this.stateObj.init();
        this.stockInConfig.load = isEdit;
        this.stockOutConfig.load = isEdit;
        this.stockOtherConfig.load = this.stockOtherConfig.dataList.length > 0;
        this.stateLoading = true;
        this.$nextTick(() => {
          this.stateLoading = false;
        });
      }
    },
    tableName(q, e) {
      console.log(q, e);
    }
  },
  created() {
    this.toggle(this.tabsList[0]);
  },

  methods: {
    toggle(item) {
      this.active = item;
    },
    openForm() {
      this.isOpen = true;
    },
    closeForm() {
      let { field, state, dataList } = this.active;
      if (field == 'other' && state == 'add') dataList.pop();
    },
    finishForm() {
      this.isOpen = false;
      this.active.load = true;
    },
    backView() {
      this.$emit('state', 'view');
    },
    // 新增其它表单
    addOtherBill() {
      let newbill = {};
      this.stockOtherConfig.state = 'add';
      this.stockOtherConfig.dataList.push(newbill);
      this.stockOtherConfig.data = newbill;
      this.openForm();
    },
    // 回填
    fillBill() {
      this.stockInConfig.data = this.row;
      this.stockOutConfig.data = this.row;
      this.stockOtherConfig.dataList = this.row.waybillFujian || [];
    },
    // 重置表单
    resetBill() {
      this.stockInConfig.data = {};
      this.stockOutConfig.data = {};
      this.stockOtherConfig.dataList = [];
    },
    sendHandle(data, uploadKeys) {
      let newData = Object.assign({}, data);
      uploadKeys.forEach(key => {
        let ids = '';
        let item = newData[key];
        if (!item) return;
        if (item.length && item.length > 0) {
          newData[key].forEach(file => {
            ids += `${file.url.split('/').pop()},`;
          });
        }
        newData[key] = ids;
      });
      return newData;
    },
    // 确定
    submit() {
      if (!this.stockInConfig.load || !this.stockOutConfig.load) {
        this.$message.warning('请填写完整出库单和入库单');
        return;
      }
      this.stateLoading = true;
      let waybillFujian = this.stockOtherConfig.dataList.map(v =>
        this.$refs.form.sendHandle(v, ['fujian'])
      );
      let data = this.$refs.form.sendHandle(
        {
          ...this.stockInConfig.data,
          ...this.stockOutConfig.data,
          waybillFujian
        },
        ['ofujian', 'ifujian']
      );
      this.stateObj.api(data).then(res => {
        if (res.data.success) {
          this.resetBill();
          this.toggle(this.tabsList[0]);
          this.$message.success(res.data.msg);
        }
        this.stateLoading = false;
        this.$emit('refresh');
      });
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';
.freight-page {
  .head-tabs {
    width: 100%;
    height: 140px;
    padding: 20px 0px 0px;
    @include box-center($justify: flex-start, $align: flex-start);
    & > div {
      @include box-center($justify: space-evenly, $align: center);
      flex-direction: column;
      cursor: pointer;
      position: relative;
      img {
        height: 66px;
      }
      span {
        line-height: 30px;
      }
    }
    .active {
      img {
        height: 86px;
      }
      span {
        border-bottom: 2px solid #166bff;
      }
    }
    .load {
      &::before {
        content: '';
        position: absolute;
        bottom: 20px;
        right: 0px;
        width: 30px;
        height: 30px;
        background: url('~A/operation/right.png');
        background-size: contain;
      }
    }
  }
  .btn-box {
    padding: 0px 20px;
    button {
      margin-right: 10px;
      font-size: 16px;
      padding: 2px 20px;
    }
  }
  .bills-box {
    height: calc(100% - 170px);
  }
}
</style>