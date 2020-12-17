import { mapGetters } from 'vuex';

import {
  getConfig,
  getList,
  getDetail,
  getField,
  insert,
  update,
  remove
} from '@/api/config';

export default {
  data() {
    return {
      // 是否初始化完毕
      ISLOAD: false,
      // 模块配置项
      CONFIG: {},
      // 模块字段项
      FIELD: []
    };
  },
  computed: {
    // 岗位id 企业id
    ...mapGetters(['postId', 'deptId']),
    fieldColumn() {
      return Object.keys(this.FIELD)
        .map((key) => this.FIELD[key])
        .filter((item) => !item.hide)
        .sort((a, b) => a.sort - b.sort);
    }
  },
  methods: {
    // 初始化
    INIT(token) {
      return this.getConfig(token).then(this.getField);
    },
    // 获取配置
    getConfig(token) {
      token = token || this.$route.path;
      return getConfig(token).then((res) => {
        this.CONFIG = res.data.data;
      });
    },
    // 获取字段
    getField() {
      return getField(this.CONFIG.viewField, this.deptId).then((res) => {
        this.FIELD = this.buildFieldMap(res.data.data);
      });
    },
    // 获取数据
    getList({
      page = this.page,
      search = this.tableSearch,
      sort = this.tableSort,
      other = {}
    } = {}) {
      let params = {
        deptId: this.deptId,
        current: page.currentPage,
        size: page.pageSize,
        ...search,
        ...sort,
        ...other
      };
      this.tableLoading = true;
      return getList(this.CONFIG.viewModel, params).then((res) => {
        let data = res.data.data;
        this.tableLoading = false;
        if (JSON.stringify(data) == '{}') return;
        this.page.total = data.total;
        this.tableData = data.records.map((item) => this.receiveHandle(item));
      });
    },
    // 获取详情
    getDetail(id) {
      return getDetail(this.CONFIG.detailModel, id).then((res) => {
        this.formData = this.receiveHandle(res.data.data);
      });
    },
    // 搜索触发器
    searchChange(search) {
      this.search = search;
      this.getList({ search });
    },
    // 刷新触发器
    refreshChange() {
      this.getList();
    },
    // 排序触发器
    sortChange(sort) {
      this.tableSort.orderColumn = sort.prop;
      this.tableSort.order = sort.order === 'descending' ? 0 : 1;
      this.getList();
    },

    /**
     * 列表新增 or 表单新增
     * @param {Object} row 表单数据默认是 this.formData
     * @param {Function} callback 回调函数
     * @param {Boolean} list 是否更新列表
     * @returns {undefined}
     */
    rowSave(row = this.formData, callback, list = true) {
      row.deptId = this.deptId;
      insert(this.CONFIG.insertModel, this.sendHandle(row)).then((res) => {
        this.$message({
          type: 'success',
          message: res.data.msg
        });
        list && this.getList();
        callback && callback(res);
      });
    },

    /**
     * 列表更新 or 表单更新
     * @param {Object} row 表单数据默认是 this.formData
     * @param {Number} index 列表中当前更新行索引
     * @param {Function} callback 回调函数
     * @param {Boolean} list 是否更新列表
     * @returns {undefined}
     */
    rowUpdate(row = this.formData, index, callback, list = true) {
      update(this.CONFIG.updateModel, this.sendHandle(row)).then((res) => {
        this.$message({
          type: 'success',
          message: res.data.msg
        });
        list && this.getList();
        callback && callback(res);
      });
      this.removeFiles();
    },

    /**
     * 列表删除 or 表单删除
     * @param {Object} row 表单数据默认是 this.formData
     * @param {Function} callback 回调函数
     * @param {Boolean} list 是否更新列表
     * @returns {undefined}
     */
    rowDel(row = this.formData, callback, list = true) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => remove(this.CONFIG.removeModel, row.id))
        .then((res) => {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
          list && this.getList();
          callback && callback(res);
        });
    },

    /**
     * 构建字段 Map 对象
     * @param {Array} fieldList 字段数组
     * @returns {Object} 字段对象
     */
    buildFieldMap(fieldList) {
      let map = {};
      fieldList.forEach((item) => {
        // 设置自定义规则
        item = this.customSetField ? this.customSetField(item) : item;
        item.title = item.label;
        item.prop = item.er;
        // 设置字段索引对象
        map[item.prop] = item;
      });
      // 构建结束
      this.ISLOAD = true;
      return map;
    }
  }
};
