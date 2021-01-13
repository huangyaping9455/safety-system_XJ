export default {
  props: {
    data: {
      type: Object,
      default: () => new Object()
    },
    deep: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  computed: {
    name() {
      return this.data.name;
    },
    children() {
      return this.data.children;
    }
  },
  methods: {
    isChildren(item) {
      if (item.name === "首页") {
        let i = document.getElementsByClassName("ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon")[0];
        if (i !== undefined) {
          i.style = "display:none"
        }
      }
      if (item.name === "安全标准化") {
        let j = document.getElementsByClassName("ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon")[13];
        if (j !== undefined) {
          j.style = "display:none"
        }
      }
      if (item.name === "安全管理标准文档") {
        let l = document.getElementsByClassName("ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon")[14];
        if (l !== undefined) {
          l.style = "display:none"
        }
      }
      return item;
    },
    unfold(item) {
      if (item._unfold === undefined) {
        this.$set(item, '_unfold', true);
      } else {
        item._unfold = !item._unfold;
      }
      this.emitClick(item);
    },
    emitClick(item) {
      if (item.path !== "/daily/") {
        this.$emit('on-click', item);
      } else {
        return false;
      }
    }
  }
};