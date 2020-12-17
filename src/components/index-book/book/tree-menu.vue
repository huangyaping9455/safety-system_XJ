<template>
  <div v-show="state.show" ref="menu" class="tree-menu" :style="menuPosition">
    <div v-for="item in menu" :key="item.label" @click="treeMenuClick(item)">{{item.label}}</div>
  </div>
</template>
 
<script>
export default {
  name: 'tree-menu',
  props: {
    state: Object,
    menu: Array
  },
  data() {
    return {};
  },
  computed: {
    menuPosition() {
      let e = this.state.event;
      let menDom = this.$refs.menu;
      let offset = 0;
      if (menDom && this.state.show) {
        let y = e.pageY + menDom.clientHeight + 20;
        let maxY = window.innerHeight;
        if (y > maxY) {
          offset = maxY - y;
        }
      }
      return {
        position: 'fixed',
        left: e.clientX + 'px',
        top: e.clientY + offset + 'px'
      };
    }
  },
  methods: {
    treeMenuClick(item) {
      this.$emit('on-click', item);
    }
  }
};
</script>
 
<style lang="scss" >
</style>