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
      let j = document.getElementsByClassName("ivu-menu-submenu-title");
      // if (item.name === "首页") {
      //   for (let v = 0; v < j.length; v++) {
      //     if (j[v].childNodes[0].innerText === "首页") {
      //       j[v].childNodes[2].style = "display:none"
      //     }
      //   }
      // }
      // if (item.name === "安全标准化") {
      //   for (let v = 0; v < j.length; v++) {
      //     if (j[v].childNodes[0].innerText === "安全标准化") {
      //       j[v].childNodes[2].style = "display:none"
      //     }
      //   }
      // }
      // if (item.name === "安全标准化") {
      //   for (let v = 0; v < j.length; v++) {
      //     if (j[v].childNodes[0].innerText === "安全标准化") {
      //       j[v].childNodes[2].style = "display:none"
      //     }
      //   }
      // }
      // if (item.name === "安全管理标准文档") {
      //   for (let v = 0; v < j.length; v++) {
      //     if (j[v].childNodes[0].innerText === "安全管理标准文档") {
      //       j[v].childNodes[2].style = "display:none"
      //     }
      //   }
      // }
      // if (item.name === "物流通") {
      //   console.log(item);
      //   for (let v = 0; v < j.length; v++) {
      //     if (j[v].childNodes[0].innerText === "物流通") {
      //       j[v].childNodes[2].style = "display:none"
      //     }
      //   }
      // }
      for (let v = 0; v < j.length; v++) {
        if (j[v].childNodes[0].innerText === "首页" || j[v].childNodes[0].innerText === "安全标准化" || j[v].childNodes[0].innerText === "安全管理标准文档" || j[v].childNodes[0].innerText === "物流通") {
          j[v].childNodes[2].style = "display:none"
        }
        // if (j[v].childNodes[0].innerText === "物流通") {
        //   j[v].childNodes[2].style = "display:none"
        // }
        // if (j[v].childNodes[0].innerText === "安全管理标准文档") {
        //   j[v].childNodes[2].style = "display:none"
        // }
        // if (j[v].childNodes[0].innerText === "安全标准化") {
        //   j[v].childNodes[2].style = "display:none"
        // }
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