<template>
  <i-split v-model="split" class="freight-page" :min="0.4" :max="0.4">
    <freight-table ref="table" slot="left" @state="changeState"></freight-table>
    <freight-view v-show="state == 'view'" slot="right" :row="row" @state="changeState"></freight-view>
    <freight-form
      v-show="state == 'add' || state == 'edit'"
      slot="right"
      :row="row"
      :state="state"
      @state="changeState"
      @refresh="refresh"
    ></freight-form>
  </i-split>
</template>
 
<script>
import freightTable from './table';
import freightView from './view';
import freightForm from './edit-add';
export default {
  name: 'freight',
  components: {
    freightTable,
    freightView,
    freightForm
  },
  data() {
    return {
      split: 0.5,
      state: '',
      vehicleList: [],
      row: {}
    };
  },
  created() {
    this.changeState('add');
  },
  methods: {
    refresh() {
      this.state = 'add';
      this.$refs.table.getList();
    },
    changeState(state, row) {
      this.state = state;
      if (row) this.row = row;
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';

.freight-page {
  // 一些公用样式
  .right-pane {
    .title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #dcdee2;
    }
    .main {
      height: calc(100% - 100px);
      overflow: hidden;
    }
    .foot {
      height: 50px;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      button {
        letter-spacing: 3px;
        font-size: 16px;
        padding: 2px 50px;
        margin-right: 10px;
      }
    }
  }
  .bill-warehouse {
    padding: 10px;
  }
  // 货运单
  .invoices-out {
    background: #e3f6fb;
  }
  .invoices-in {
    background: #e3f1fe;
  }
  .invoices {
    width: 100%;
    height: 400px;
    padding: 0 10px;
    background: #e3f1fe;
    display: flex;

    .both-invoices {
      width: 20px;
      height: 100%;
      @include box-center($justify: space-around, $align: center);
      flex-direction: column;
      .w-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
      }
    }

    .center-invoices {
      flex-grow: 1;
      margin: 0 10px;
      text-align: center;
      @include box-center($justify: center, $align: center);
      flex-direction: column;
      & > b {
        font-size: 18px;
        margin-bottom: 20px;
      }
      & > span {
        color: #999;
        margin-bottom: 10px;
      }
      .content {
        width: 100%;
        @include box-center($justify: flex-start, $align: false);
        flex-wrap: wrap;
        border-bottom: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
        & > div {
          height: 40px;
          line-height: 40px;
          border-top: 1px solid #dddddd;
          border-right: 1px solid #dddddd;
          @include box-center($justify: flex-start, $align: false);
          span {
            height: 100%;
            width: 85px;
            min-width: 85px;
            color: #999;
            background: #f5f9fe;
          }
          p {
            flex-grow: 1;
            padding-left: 5px;
            text-align: left;
            background: #fff;
          }
        }
      }
    }
  }
  .fujian-box {
    p {
      margin-left: 30px;
      font-size: 18px;
      line-height: 40px;
      color: #0e48a7;
    }
    img {
      max-width: 100%;
    }
  }
}
</style>