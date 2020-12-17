<template>
  <div class="security-evaluate" :class="classes">
    <!-- 左侧 报告表 -->
    <evaluate-table @on-click="open"></evaluate-table>
    <!-- 右侧 -->
    <div class="info-right">
      <div class="right-top">
        <div class="button-left">
          <div @click="isForm = true">
            <icon size="18" type="md-add" />
            <span>新增</span>
          </div>
        </div>
        <div class="close" @click="closeView">
          <icon size="18" type="md-close" />
          <span>关闭</span>
        </div>
      </div>
      <div class="file-info">
        <span>文档名：</span>
        <i-input
          v-model="documentTitle"
          placeholder="请输入文档名"
          style="width: 200px"
        ></i-input>
        <div class="search" @click="search">
          <icon size="18" type="ios-search" />
          <span>查询</span>
        </div>
      </div>
      <div class="right-centent">
        <i-table
          ref="evaluateDetailTable"
          border
          highlight-row
          :loading="table.loading"
          :height="table.height"
          :columns="table.columns"
          :data="table.data"
          @on-sort-change="table.onSort"
        >
          <template slot="examine" slot-scope="{ row }">
            <img
              src="~A/icon/view.png"
              class="pointer"
              @click="ShowImgPreview(row)"
            />
          </template>
          <template slot="del" slot-scope="{ row }">
            <img src="~A/icon/del.png" class="pointer" @click="del(row)" />
          </template>
        </i-table>
        <table-page
          slot="footer"
          v-model="table"
          @change="table.onList"
        ></table-page>
      </div>
      <i-drawer
        :value="isForm"
        :width="700"
        title="新增"
        class="custom-drawer"
        draggable
        @on-close="isForm = false"
      >
        <i-spin v-show="loading" fix></i-spin>
        <div class="drawer-body document-info">
          <div>
            <span>标准化文档</span>
            <div class="document-box">
              <i-tree
                ref="standard"
                :data="standardList"
                :load-data="loadStandardTree"
                show-checkbox
                @on-check-change="getNodes"
              ></i-tree>
            </div>
          </div>
          <div>
            <span>安全管理标准文档</span>
            <div class="document-box">
              <i-tree
                ref="production"
                :data="productionList"
                :load-data="loadProductionTree"
                show-checkbox
                @on-check-change="getNodes"
              ></i-tree>
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <i-button @click="isForm = false">取消</i-button>
          <i-button @click="save">保存</i-button>
        </div>
      </i-drawer>
      <i-drawer
        :value="imgPreview"
        :width="700"
        title="文件预览"
        class="custom-drawer"
        draggable
        @on-close="imgPreview = false"
      >
        <i-spin v-show="loading" fix></i-spin>
        <div class="imgPreviewBox">
          <img v-for="(item, index) in imgList" :key="index" :src="item" />
        </div>
      </i-drawer>
    </div>
  </div>
</template>
<script>
import { evaluateDetailTable } from "@/const/evaluate";
import {
  listWendang,
  standardTree,
  productionTree,
  addWendang,
  delWendang,
  imgPreview,
} from "@/api/evaluate";
import table from "@/mixin/table";
import evaluateTable from "./evaluate-table";
// import { runMain } from 'module';

export default {
  inject: ["reload"],
  name: "evaluate",
  components: {
    evaluateTable,
  },
  mixins: [table],
  data() {
    evaluateDetailTable.onList = this.documentList;
    return {
      table: this.tableInit(evaluateDetailTable),
      isForm: false,
      imgPreview: false,
      // 当前处理报告
      activeRow: {},
      // 当前报告类型
      evaluateTab: {},
      // 是否预览
      isOpen: false,
      standardList: [],
      productionList: [],
      loading: false,
      checkedSList: [],
      checkedPList: [],
      checkedList: [],
      imgList: [],
      documentTitle: "",
      listWendang: [],
    };
  },
  computed: {
    classes() {
      return ["table-page", { "table-page-preview": this.isOpen }];
    },
  },
  mounted() {
    this.getDocumentTree();
  },
  methods: {
    search() {
      let newList = [];
      this.listWendang.records.forEach((item) => {
        if (item.wenjianmingcheng.indexOf(this.documentTitle) != -1) {
          newList.push(item);
        }
      });
      this.table.data = newList;
    },

    save() {
      let addPList = [];
      let addSList = [];
      this.checkedSList.forEach((item) => {
        if (item.type != "文件夹") {
          item.suoshuwendangleixing = "标准化文档";
          item.zipinjianchaJieguoId = this.activeRow.jieguoid;
          item.wenjianid = item.id;
          item.wenjianmingcheng = item.name;
          item.jianchaxiangmingcheng = this.activeRow.jianchaleirong;
          addSList.push(item);
        }
      });
      this.checkedPList.forEach((item) => {
        if (item.type != "文件夹") {
          item.suoshuwendangleixing = "安全管理标准文档";
          item.zipinjianchaJieguoId = this.activeRow.jieguoid;
          item.wenjianid = item.id;
          item.wenjianmingcheng = item.name;
          item.jianchaxiangmingcheng = this.activeRow.jianchaleirong;
          addPList.push(item);
        }
      });
      this.checkedList = addPList.concat(addSList);
      let params = {
        list: this.checkedList,
      };
      addWendang(params).then((res) => {
        if (res.data.success) {
          this.isForm = false;
          this.$message.success("保存成功");
          this.documentList();
        }
      });
    },
    // 打开预览组件
    open(row) {
      this.activeRow = row;
      this.isOpen = true;
      this.documentList();
    },
    // 获取文档列表
    documentList() {
      let table = this.table;
      table.loading = true;
      let params = {
        ...table.onParams(),
        jieguoid: this.activeRow.jieguoid,
      };
      listWendang(params).then((res) => {
        this.listWendang = res.data.data;
        table.onFill(this.listWendang);
      });
    },
    // 获取标准文档
    getDocumentTree() {
      let params = {
        deptId: this.$store.getters.deptId,
        parentId: 0,
      };
      standardTree(params).then((res) => {
        this.standardList = res.data.data.map((item) => {
          item.title = item.name;
          item.type == "文件夹" ? (item.loading = false) : "";
          return item;
        });
      });
      // 获取生产文档
      productionTree(params).then((res) => {
        this.productionList = res.data.data.map((item) => {
          item.title = item.name;
          item.type == "文件夹" ? (item.loading = false) : "";
          return item;
        });
      });
    },
    // 点击获取下级数据（标准文档）
    loadStandardTree(item, callback) {
      setTimeout(() => {
        let params = {
          deptId: this.$store.getters.deptId,
          parentId: item.id,
        };
        standardTree(params).then((res) => {
          const data = res.data.data.map((item) => {
            item.title = item.name;
            item.type == "文件夹" ? (item.loading = false) : "";
            return item;
          });
          if (data.length == 0) {
            data.loading = false;
          }
          callback(data);
        });
      }, 1000);
    },
    // 点击获取下级数据（生产文档）
    loadProductionTree(item, callback) {
      setTimeout(() => {
        let params = {
          deptId: this.$store.getters.deptId,
          parentId: item.id,
        };
        productionTree(params).then((res) => {
          const data = res.data.data.map((item) => {
            item.title = item.name;
            item.type == "文件夹" ? (item.loading = false) : "";
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    // 获取tree组件的选中子节点
    getNodes: function() {
      this.checkedSList = this.$refs.standard.getCheckedNodes();
      this.checkedPList = this.$refs.production.getCheckedNodes();
    },
    // 关闭预览组件
    closeView() {
      this.isOpen = false;
    },
    del(row) {
      let id = row.id;
      delWendang(id).then((res) => {
        if (res.data.success) {
          this.$message.success("删除成功！");
          this.documentList();
        }
      });
    },
    // 显示文档内容
    ShowImgPreview(row) {
      this.imgPreview = true;
      let suoshuwendangleixing = row.suoshuwendangleixing;
      let wenjianid = row.wenjianid;
      imgPreview(suoshuwendangleixing, wenjianid).then((res) => {
        this.imgList = res.data.data;
      });
    },
  },
};
</script>
<style lang="scss">
@import "S/mixin.scss";
.ivu-date-picker-cells-cell {
  color: #333;
}
.imgPreviewBox {
  width: 100%;
  img {
    max-width: 100%;
  }
}
.custom-drawer .ivu-drawer-body {
  overflow: auto;
}

.ivu-table-cell {
  white-space: normal !important;
}
.security-evaluate {
  height: 100%;
  width: 100%;
  @include box-center($justify: space-between, $align: false);

  // 左边
  .info-left {
    border-radius: 6px;
    background-color: #f4f7fe;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .left-top {
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      @media screen and (min-width: 1601px) {
        .block {
          // width: calc(25% - 12.5px);
        }
        // .imgpos {
        //   height: 50px;
        // }
      }

      @media screen and (max-width: 1600px) {
        .block {
          // width: calc(50% - 12.5px);
          height: 50px;
        }
        .left-centent {
          height: calc(100% - 50px);
        }
      }
    }
    @media screen and (max-width: 1600px) {
      .left-centent {
        height: calc(100% - 170px);
      }
    }
    .left-centent {
      flex-grow: 1;
      height: calc(100% - 140px);

      .ivu-icon {
        font-size: 15px;
        margin-right: 4px;
      }
      .ivu-icon-md-alert {
        color: #ea554a;
      }
      .ivu-icon-md-checkmark-circle {
        color: #0cb90c;
      }
    }
  }

  .sub-tables {
    .tabs {
      height: 40px;
      padding: 0px 10px;
      display: flex;
      align-items: center;
      span {
        white-space: nowrap;
      }
      .num {
        margin-left: 5px;
      }
    }
    .tables-list {
      height: calc(100% - 40px);
    }
  }
  // 表格样式
  .ivu-table th {
    background-color: #166bff;
    color: #fff;
  }
}

.table-page {
  .info-left {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background: #f4f7fe;
    transition: all 0.3s;
  }
  .info-right {
    width: 0;
    height: 100%;
    border-radius: 6px;
    background: #f4f7fe;
    transition: all 0.3s;
    overflow: hidden;
  }
}

.table-page-preview {
  .info-left,
  .info-right {
    width: calc(50% - 5px);
    transition: all 0.3s;
  }
  .info-right {
    margin-left: 10px;
  }
}
.right-top {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 10px;
  .button-left {
    display: flex;

    & > div {
      background: #2d8cf0;
      padding: 4px 40px;
      border-radius: 20px;
      color: #fff;
      margin-right: 12px;
      cursor: pointer;
    }
  }
  .close {
    background: #fc4a39;
    padding: 4px 40px;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
  }
}
.file-info {
  padding: 10px;
  display: flex;
  padding: 10px;
  align-items: center;
  .search {
    background: #2d8cf0;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    margin-right: 12px;
    cursor: pointer;
    margin-left: 4px;
  }
}
.right-centent {
  flex-grow: 1;
  height: calc(100% - 140px);
  padding: 0 10px;
}
// 新增弹窗
.document-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  & > div {
    width: calc(50% - 10px);
    height: 100%;
    & > span {
      display: inline-block;
      width: 100%;
      height: 30px;
      text-align: center;
    }
    .document-box {
      width: 100%;
      height: calc(100% - 40px);
      border: 1px solid #ccc;
      overflow: auto;
    }
    .title {
      display: inline-block;
      padding: 10px 0;
    }
    .check-box {
      display: flex;
      flex-direction: column;
      .ivu-checkbox-wrapper {
        margin: 4px 0;
        .ivu-checkbox {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
