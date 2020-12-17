<template>
  <div v-if="config" class="bill-warehouse">
    <div class="invoices invoices-out">
      <div class="both-invoices">
        <span v-for="n in 7" :key="n" class="w-dot"></span>
      </div>
      <div class="center-invoices">
        <b>新疆能源集团油气公司</b>
        <span>出库过磅单</span>
        <div class="content">
          <div v-for="(item,i) in column" :key="i" :class="item.className">
            <span>{{item.label}}</span>
            <p>{{getValue(item)}}</p>
          </div>
        </div>
      </div>
      <div class="both-invoices">
        <span v-for="n in 7" :key="n" class="w-dot"></span>
      </div>
    </div>
    <div class="fujian-box">
      <p>附件：</p>
      <div>
        <img v-for="(n,i) in config.data.ofujian" :key="i" :src="n.url" />
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
  name: 'bill-warehouse-out',
  props: {
    config: Object
  },
  data() {
    return {};
  },
  computed: {
    column() {
      return this.config.column.filter(
        v => v.formOpt && v.formOpt.type != 'upload'
      );
    }
  },
  methods: {
    getValue(item) {
      let v = this.config.data[item.key];
      let is = v && item.formOpt && item.formOpt.type.indexOf('date') != -1;
      return is ? dayjs(v).format('YYYY-MM-DD hh:mm:ss') : v;
    }
  }
};
</script>
