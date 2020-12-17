<template>
  <div class="bill-other bill-warehouse wh100">
    <div v-if="list.length==0">暂无其它单据</div>
    <div v-for="(data,i) in list" v-else :key="i" class="active">
      <div class="invoices">
        <div class="both-invoices">
          <span v-for="n in 3" :key="n" class="w-dot"></span>
        </div>
        <div class="center-invoices">
          <div class="content">
            <div v-for="(item,index) in column" :key="index" class="w100">
              <span>{{item.label}}</span>
              <p>{{getValue(item,data)}}</p>
            </div>
          </div>
        </div>
        <div class="both-invoices">
          <span v-for="n in 3" :key="n" class="w-dot"></span>
        </div>
      </div>
      <div v-if="!view" class="center-info">
        <span>附件：</span>
        <div class="img-size">
          <img v-for="(n,i) in data.fujian" :key="i" :src="n.url" />
        </div>
      </div>
      <div v-if="!view" class="rt-info">
        <img src="~A/operation/edit.png" @click="editBill(data)" />
        <img src="~A/operation/delete.png" @click="removeBill(i)" />
      </div>
    </div>
    <div v-if="view" class="fujian-box">
      <p>附件：</p>
      <div v-if="config.dataList.length>0">
        <img v-for="(n,i) in config.dataList[0].fujian" :key="i" :src="n.url" />
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
  name: 'bill-other',
  props: {
    config: Object,
    view: Object
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.view ? [this.view] : this.config.dataList;
    },
    column() {
      return this.config.column.filter(
        v => v.formOpt && v.formOpt.type != 'upload'
      );
    }
  },
  methods: {
    editBill(item) {
      this.config.state = 'edit';
      this.config.data = item;
      this.$emit('open');
    },
    removeBill(i) {
      this.config.dataList.splice(i, 1);
      this.config.load = this.config.dataList.length > 0;
    },
    getValue(item, data) {
      let v = data[item.key];
      let is = v && item.formOpt && item.formOpt.type.indexOf('date') != -1;
      return is ? dayjs(v).format('YYYY-MM-DD hh:mm:ss') : v;
    }
  }
};
</script>
<style lang="scss">
@import 'S/mixin.scss';
.bill-other {
  .active {
    height: 200px;
    margin-bottom: 15px;
    @include box-center($justify: space-between, $align: false);

    .invoices {
      height: 100%;
      padding: 0 5px;
      margin-right: 10px;
      background: #cefee6;
      flex-grow: 1;
      width: auto;
    }

    .center-info {
      display: flex;
      width: 200px;
      margin-right: 10px;
      span {
        white-space: nowrap;
      }
      p {
        margin-left: 30px;
        font-size: 18px;
        line-height: 40px;
        color: #0e48a7;
      }
    }
    .rt-info {
      width: 30px;
      height: 100%;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      display: flex;
      align-items: center;
      img {
        margin: 10px 0;
        cursor: pointer;
      }
    }
    .img-size {
      display: flex;
      align-items: center;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>