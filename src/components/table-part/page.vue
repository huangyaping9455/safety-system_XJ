<template>
  <i-page
    :total="value.total"
    :current="value.page"
    :page-size="value.size"
    :page-size-opts="value.pageOpt"
    size="small"
    show-total
    show-elevator
    show-sizer
    @on-page-size-change="pageSizeChange"
    @on-change="pageChange"
  />
</template>
 
<script>
export default {
  name: 'table-page',
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    pageChange(page) {
      this.value.page = page;
      this.$emit('change');
    },
    pageSizeChange(size) {
      this.value.size = size;
      this.$emit('change');
    }
  }
};
</script>
 
<style lang="scss" >
</style>