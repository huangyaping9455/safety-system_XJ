/* eslint-disable vue/no-template-key */
<template>
  <div class="tree-item">
    <tree-head
      :data="data"
      :deep="deep"
      :order="order"
      :active="active"
      :expandAll="expandAll"
      @on-click="emitClick"
      @parentNodes="parentNodes"
    ></tree-head>
    <!-- children -->
    <div v-show="data._unfold" class="tree-body">
      <!--  eslint-disable-next-line vue/no-template-key -->
      <template v-for="(item, index) in children">
        <tree-item
          v-if="isChildren(item)"
          :key="item.id"
          :data="item"
          :deep="deep + 1"
          :order="deepOrder(index)"
          :active="active"
          :expandAll="expandAll"
          @on-click="emitClick"
          @contextmenu="contextmenu"
          @loadNode="loadNode"
          @parentNodes="parentNodes"
        ></tree-item>

        <!--  eslint-disable-next-line vue/valid-v-for -->
        <tree-head
          v-else
          :data="item"
          :key="'tree-head-'+item.id"
          :deep="deep + 1"
          :order="deepOrder(index)"
          :active="active"
          @on-click="emitClick"
          @parentNodes="parentNodes"
        ></tree-head>
      </template>
    </div>
  </div>
</template>
 
<script>
import tree from '@/mixin/tree';
export default {
  name: 'tree-item',
  components: {},
  mixins: [tree],
  props: {
    active: {
      type: Object,
      default: () => {
        return {};
      }
    },
    order: [Number, String],
    // 是否自动打开所有目录
    expandAll: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    deepOrder(index) {
      return `${this.order}.${index + 1}`;
    },
    loadNode(data) {
      this.$emit('loadNode', data);
    },
    contextmenu(data) {
      this.$emit('contextmenu', data);
    },
    parentNodes({ nodes, deep }) {
      if (deep != this.deep) {
        nodes.push(this.data);
      }
      this.$emit('parentNodes', { nodes, deep: this.deep });
    }
  }
};
</script>
 
<style lang="scss" >
</style>