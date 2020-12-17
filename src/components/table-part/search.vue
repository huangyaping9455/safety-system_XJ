<template>
  <i-drawer :value="value" :title="title" :width="400" class="custom-drawer" @on-close="close">
    <div class="drawer-body">
      <base-form v-model="search" :column="columns"></base-form>
    </div>
    <div class="drawer-footer">
      <i-button @click="close">取消</i-button>
      <i-button type="primary" @click="$emit('search')">查询</i-button>
    </div>
  </i-drawer>
</template>
 
<script>
import baseForm from 'C/base-form';
export default {
  name: 'table-search',
  components: {
    baseForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '查询条件'
    },
    columns: {
      type: Array
    },
    search: {
      type: Object,
      default: () => new Object()
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    close() {
      this.$emit('input', false);
    }
  }
};
</script>
 
<style lang="scss" >
</style>