<template>
  <i-split v-model="split" :min="0.3" :max="0.3" class="standard">
    <!-- 标准化目录树 -->
    <standard-book slot="left" @on-view="onView"></standard-book>
    <tag-tabs slot="right" v-model="tabSlot" :tabs="tabs">
      <!-- 统计图表 -->
      <chart slot="chart"></chart>
      <!-- 数据 table -->
      <info-table slot="table"></info-table>
      <!-- 预览 -->
      <preview-doc slot="doc" :active="previewNode" :action="previewAction" @close-view="closeView"></preview-doc>
    </tag-tabs>
  </i-split>
</template>
 
<script>
import { standardBook, previewDoc } from 'C/index-book';
import tagTabs from 'C/tag-tabs';
import chart from './chart';
import infoTable from './table';
import { mapGetters } from 'vuex';

export default {
  name: 'standard',
  components: {
    standardBook,
    previewDoc,
    tagTabs,
    chart,
    infoTable
  },
  data() {
    return {
      split: 0.5,
      // 是否预览，预览节点，预览的接口
      preview: false,
      previewNode: {},
      previewAction: () => {},
      // 当前 tab slot
      tabSlot: 'chart'
    };
  },
  computed: {
    ...mapGetters(['deptId']),
    // tab 选项卡
    tabs() {
      let tabs = [
        { label: '标准化自评', slot: 'table', show: !this.preview },
        { label: '数据统计', slot: 'chart', show: !this.preview },
        { label: '正文', slot: 'doc', show: this.preview, class: 'preview-bg' }
      ];
      return tabs;
    }
  },
  mounted() {},
  methods: {
    // 预览文件
    onView({ node, request }) {
      this.preview = true;
      this.previewNode = node;
      this.previewAction = request;
      this.tabSlot = 'doc';
    },
    // 关闭预览
    closeView() {
      this.preview = false;
      this.tabSlot = 'chart';
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';

.standard {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .merge {
    width: calc(50% - 5px);
    background: white;
  }

  .catalogue {
    background: #f4f7fe;
  }
  .catalogue-detail {
    background: white;
  }
}
</style>