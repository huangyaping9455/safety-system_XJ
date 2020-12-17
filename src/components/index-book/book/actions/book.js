export default {
  props: {
    menu: {
      type: Boolean,
      default: true
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    clickView: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      LOAD: false,
      treeData: [],
      nodeData: {},
      parentNodes: [],
      loading: false,
      deptId: this.$store.getters.deptId,
      postId: this.$store.getters.postId,
      menuState: {
        show: false,
        event: {}
      },
      form: {
        show: false
      }
    };
  },
  mounted() {
    window.addEventListener('click', this.closeMenu);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeMenu);
  },
  computed: {
    isFolder() {
      return this.nodeData.type == '文件夹';
    }
  },
  methods: {
    initBook(nodeData) {
      this.treeData = [];
      this.loading = true;
      this.getNode(nodeData).then((res) => {
        this.treeData = res.data.data;
        this.loading = false;
        this.LOAD = true;
      });
    },

    loadNode(data = this.nodeData) {
      if (data._load) return;
      data._loading = true;
      this.getNode(data).then((res) => {
        data.children = res.data.data;
        data._loading = false;
        data._load = true;
        data._unfold = true;
      });
    },

    contextmenu({ event, data }) {
      this.nodeData = data;
      if (this.menu) {
        this.menuState.show = true;
        this.$nextTick(() => {
          this.menuState.event = event;
        });
      }
    },

    getParentNodes({ nodes }) {
      this.parentNodes = nodes;
    },

    getParentNode() {
      const parent = this.parentNodes[0]
        ? this.parentNodes[0].children
        : this.treeData;
      const index = parent.findIndex((d) => d.id == this.nodeData.id);
      return {
        parent,
        index
      };
    },

    treeMenuClick(item) {
      if (item.form) {
        this.form = {
          show: true,
          ...item
        };
      } else {
        if (!item.action) return;
        item.action(item);
      }
    },

    closeMenu() {
      this.menuState.show = false;
    },

    treeItemClick(data) {
      this.nodeData = data;
      this.$emit('on-click', data);
      if (this.clickView) {
        let item = this.treeMenu.find((item) => item.label == '查看文件');
        this.viewFile(item);
      }
    },

    viewFile(item) {
      if (this.nodeData.type == '文件') {
        this.$emit('on-view', {
          node: this.nodeData,
          request: item.request,
          docSource: item.docSource
        });
      }
    },
    replaceNode() {},

    removeFile(item) {
      this.$modal.confirm({
        title: '刪除文件',
        content: '确定要刪除此文件吗？',
        onOk: () => {
          this.nodeData._loading = true;
          item.request(this.nodeData.id).then((res) => {
            const data = res.data;
            if (data.code == 200 && data.success) {
              if (!this.isFolder) {
                this.parentNodes.forEach((item) => item.fileNum--);
              }
              const { parent, index } = this.getParentNode();
              parent.splice(index, 1);
              this.$message.success(data.msg);
            } else {
              this.$message.error(data.msg);
            }
            this.nodeData._loading = false;
          });
        }
      });
    },

    downloadFile() {
      window.open(
        this.$store.state.user.userInfo.urlPrefix + this.nodeData.path,
        '_blank'
      );
    },

    moveFile(item) {
      const { parent, index } = this.getParentNode();
      const cur = parent[index];
      const prev = parent[index - 1];
      const next = parent[index + 1];
      switch (item.param) {
        case 'up':
          if (prev) {
            item.request(cur.id, prev.id).then((res) => {
              if (res.data.success) {
                parent.splice(index, 1, prev);
                parent.splice(index - 1, 1, cur);
                this.$message.success(res.data.msg);
              }
            });
          } else {
            this.$message.error('已经是第一个了！');
          }
          break;
        default:
          if (next) {
            item.request(cur.id, next.id).then((res) => {
              if (res.data.success) {
                parent.splice(index, 1, next);
                parent.splice(index + 1, 1, cur);
                this.$message.success(res.data.msg);
              }
            });
          } else {
            this.$message.error('已经是最后一个了！');
          }
          break;
      }
    },

    cancelSafetyBind(item) {
      this.nodeData._loading = true;
      item.request({ id: this.nodeData.id }).then((res) => {
        const data = res.data;
        if (data.code == 200 && data.success) {
          const { parent, index } = this.getParentNode();
          parent.splice(index, 1);
          this.$message.success(data.msg);
        } else {
          this.$message.error(data.msg);
        }
        this.nodeData._loading = false;
      });
    }
  }
};
