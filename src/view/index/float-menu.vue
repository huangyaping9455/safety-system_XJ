<template>
  <i-dropdown
    ref="dropdown"
    :placement="placement"
    :transfer="transfer"
    transfer-class-name="daily-float-menu"
    :class="[transfer ? 'root-menu' : 'collased-menu-dropdown']"
  >
    <i-tooltip
      v-if="transfer && !isChildren(data)"
      :content="name"
      :placement="placement"
      transfer
    >
      <i-dropdown-item>
        <img class="custom-icon" :src="getIcon(data)" />
      </i-dropdown-item>
    </i-tooltip>

    <i-dropdown-item
      v-else
      @mouseenter.native="handleMouseEnter($event, children)"
    >
      <img v-if="transfer" class="custom-icon" :src="getIcon(data)" />
      <template v-else @click="emitClick(data)">
        <img :src="getIcon(data)" />
        <span>{{ data.name }}</span>
        <icon type="ios-arrow-forward" :size="15" />
      </template>
    </i-dropdown-item>

    <i-dropdown-menu v-if="isChildren(data)" ref="dropdown" slot="list">
      <!-- eslint-disable-next-line vue/no-template-key -->
      <template v-for="item in children">
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <float-menu
          v-if="isChildren(item)"
          :data="item"
          :transfer="false"
          @on-click="emitClick"
        ></float-menu>
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <i-dropdown-item v-else @click.native="emitClick(item)">
          <img :src="getIcon(item)" class="custom-icon" />
          <span>{{ item.name }}</span>
        </i-dropdown-item>
      </template>
    </i-dropdown-menu>
  </i-dropdown>
</template>

<script>
import tree from "@/mixin/tree";
export default {
  name: "float-menu",
  mixins: [tree],
  props: {
    transfer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      placement: "right",
    };
  },
  mounted() {
    let classes = ["ivu-select-dropdown", "ivu-dropdown-transfer"];
    let dropdown = this.findNodeUpperByClasses(
      this.$refs.dropdown.$el,
      classes
    );
    if (dropdown) dropdown.style.overflow = "visible";
  },
  methods: {
    handleMouseEnter(event, children) {
      if (!children || children.length == 0) return;
      const { pageY } = event;
      const height = children.length * 38;
      const isOverflow = pageY + height < window.innerHeight;
      this.placement = isOverflow ? "right-start" : "right-end";
    },
    findNodeUpperByClasses(ele, classes) {
      let parentNode = ele.parentNode;
      if (parentNode) {
        let classList = parentNode.classList;
        if (
          classList &&
          classes.every((className) => classList.contains(className))
        ) {
          return parentNode;
        }
        return this.findNodeUpperByClasses(parentNode, classes);
      }
    },
    getIcon(item) {
      return item.source ? item.source.split("{ICON}")[0] : "none";
    },
  },
};
</script>

<style lang="scss">
// 悬浮部分
.daily-float-menu {
  max-height: none;
  padding: 0px;
  .ivu-dropdown {
    display: block;
  }
  .ivu-dropdown-menu {
    background-color: #87b8fd;
  }
  .ivu-dropdown-item {
    padding: 0px 15px;
    height: 40px;
    display: flex;
    align-items: center;
    span {
      flex-grow: 1;
      white-space: nowrap;
    }
    img {
      width: 26px;
    }
  }
  .ivu-dropdown-item:hover {
    background: #fed016;
  }
  .ivu-dropdown-item {
    color: #fff;
    display: flex;
    align-items: center;
  }
}

// 一级菜单
.root-menu {
  .custom-icon {
    width: 30px;
    height: 30px;
  }
  .ivu-tooltip {
    width: 100%;
  }
  .ivu-dropdown-item {
    padding: 7px 0px;
    display: flex;
    justify-content: center;
  }
}
</style>
