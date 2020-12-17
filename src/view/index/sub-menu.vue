<template>
  <div>
    <i-submenu v-if="isChildren(data)" :name="name" :deep="deep">
      <div slot="title" class="menu-item" @click="emitClick(data)">
        <img :src="getIcon(data)" class="custom-icon" />
        <span class="name">{{ name }}</span>
      </div>
      <template v-for="item in children">
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <sub-menu
          v-if="isChildren(item)"
          :key="item.name"
          :data="item"
          :class="getClass(item)"
          :deep="deep + 1"
          :active="active"
          @on-click="emitClick(item)"
        ></sub-menu>
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <i-menuitem
          v-else
          :class="getClass(item)"
          :key="item.name"
          :name="item.name"
          :deep="deep + 1"
          @click.native="emitClick(item)"
        >
          <img :src="getIcon(item)" class="custom-icon" />
          <span class="name">{{ item.name }}</span>
        </i-menuitem>
      </template>
    </i-submenu>

    <!-- <i-menuitem
      v-else
      :class="getClass(item)"
      :name="name"
      :deep="deep"
      @click.native="emitClick(data)"
    >
      <img :src="getIcon(data)" />
      <span>{{ name }}</span>
    </i-menuitem> -->
  </div>
</template>

<script>
import tree from "@/mixin/tree";

export default {
  name: "sub-menu",
  mixins: [tree],
  props: {
    active: String,
  },
  data() {
    return {};
  },
  emitClick(item) {
    this.active = item;
    this.getList();
  },
  computed: {
    routerPath() {
      return this.$route.path;
    },
  },
  methods: {
    getIcon(item) {
      return item.source ? item.source.split("{ICON}")[0] : "none";
    },
    getClass(item) {
      let is = this.routerPath === item.path;
      return is ? "ivu-menu-item-active" : "";
    },
  },
};
</script>

<style lang="scss"></style>
