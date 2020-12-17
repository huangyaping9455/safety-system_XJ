import { mapGetters } from "vuex";
import tablePage from "C/table-part/page";
import tableSearch from "C/table-part/search";
import exportExcel from "C/table-part/export";
import tableForm from "C/table-part/form";
import dayjs from "dayjs";

// 基础参数
const baseParams = () => {
  return {
    $container: "",
    ref: "table",
    data: [],
    columns: [],
    search: {},
    searchColumns: [],
    row: {},
    loading: false,
    order: "",
    orderColumn: "",
    offset: 0,
    height: 0,
    page: 1,
    size: 20,
    total: 0,
    pageOpt: [20, 50, 100, 200],
    // 获取数据方法，type：[Function,String]
    onList() {},
    // 获取参数
    onParams() {
      return {
        ...this.search,
        current: this.page,
        size: this.size,
        order: this.order,
        orderColumn: this.orderColumn
      };
    },
    // 回填数据
    onFill(data) {
      this.data = data.records.map(row => {
        this.columns.forEach(v => {
          if (typeof v.format == "function" && v.key) {
            row[v.key] = v.format(row[v.key], row);
          }
          if (v.format == "date" && v.key) {
            row[v.key] = dayjs(row[v.key]).format("YYYY-MM-DD hh:mm:ss");
          }
        });
        return row;
      });
      this.total = data.total;
      this.loading = false;
      setTimeout(() => this.onResize(), 10);
    },
    // 自适应
    onResize() {
      let container = document.querySelector(this.$container);
      if (container && container.clientHeight) {
        this.height = container.clientHeight - this.offset || 0;
        let summary = document.querySelector(
          `${this.$container} .ivu-table-summary`
        );
        if (summary && summary.clientHeight) {
          this.height -= summary.clientHeight;
        }
      }
    }
  };
};

// 需要 bind this 环境的功能函数
const bindActions = () => {
  return {
    // 排序发生变化
    onSort(sort) {
      this.order = sort.order == "desc" ? 1 : 0;
      this.orderColumn = sort.key;
      this.onList();
    }
  };
};

export default {
  components: {
    tablePage,
    tableSearch,
    tableForm,
    exportExcel
  },
  data() {
    return {
      TABLES: []
    };
  },
  computed: {
    ...mapGetters(["postId", "deptId"])
  },
  mounted() {
    this.$nextTick(this.tableResize);
    window.addEventListener("resize", this.tableResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.tableResize);
  },
  methods: {
    /**
     * 初始化 table，注册事件
     * @param {Object} baseParams 初始化的 tableKyes 或者 table 对象
     */
    tableInit(otherParams) {
      let params = baseParams();
      let actions = bindActions();
      const table = Object.assign(params, otherParams);
      for (const key in actions) {
        table[key] = actions[key].bind(table);
      }
      this.$nextTick(() => {
        if (typeof table.onList == "string" && this[table.onList]) {
          table.onList = this[table.onList];
        }
        this.TABLES.push(table);
      });

      return table;
    },
    // 循环所有 table 自适应
    tableResize() {
      this.TABLES.forEach(table => table.onResize());
    }
  }
};
