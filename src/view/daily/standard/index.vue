<template>
  <div class="standard-page">
    <!-- 标准化目录树 -->
    <div class="container">
      <div class="content">
        <standard-book @on-view="onView" class="container-tree"></standard-book>
        <tag-tabs
          class="container-right"
          v-model="tabSlot"
          :tabs="tabs"
          @on-click="onClick"
        >
          <!-- 数据 table -->
          <info-table
            class="com-tab"
            slot="table"
            :data-tab="dataTab"
            :type="type"
            :row-name="rowName"
            v-loading="loadingTab"
            :data="dataTab"
          >
          </info-table>
          <!-- 预览 -->
          <preview-doc
            class="preview-doc"
            slot="doc"
            :active="previewNode"
            :action="previewAction"
            @close-view="closeView"
          ></preview-doc>
        </tag-tabs>
      </div>
      <div class="sort">
        此次得分
        <h2>{{ totalpoints }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { standardBook, previewDoc } from "C/index-book";
import tagTabs from "C/tag-tabs";
import infoTable from "./table";
import { mapGetters } from "vuex";
import Bus from "@/config/bus";
import { getTreeTable } from "@/api/book/standard";
import MockTreeTab2X from "./../../../../public/mock/treeTab2X.json";

export default {
  name: "standard",
  components: {
    standardBook,
    previewDoc,
    tagTabs,
    infoTable,
  },
  data() {
    return {
      totalpoints: 0,
      dataTab: MockTreeTab2X.data,
      type: 3,
      rowName: "",
      // 是否预览，预览节点，预览的接口
      preview: false,
      previewNode: {},
      previewAction: () => {},
      // 当前 tab slot
      tabSlot: "table",
      loadingTab: true,
    };
  },
  computed: {
    ...mapGetters(["deptId"]),
    // tab 选项卡
    tabs() {
      let tabs = [
        { label: "标准化自评", slot: "table", show: !this.preview },
        { label: "正文", slot: "doc", show: this.preview, class: "preview-bg" },
      ];
      return tabs;
    },
  },
  created() {},
  mounted() {
    Bus.$on("clickTree", this.clickTreeHadnle);
  },
  beforeDestroy() {
    Bus.$off("clickTree", this.clickTreeHadnle);
  },
  destroyed() {
    Bus.$off("clickTree", this.clickTreeHadnle);
  },
  methods: {
    async treeFunc(data) {
      let temp = [];
      let tree = [];
      data.forEach((item, index) => {
        if (!temp.includes(item.parentName)) {
          let bojItem = {
            parentName: item.parentName,
            twoTree: item.erparentName,
            yunyingleixing: item.yunyingleixing,
            children: [],
          };
          temp.push(item.parentName);
          tree.push(bojItem);
        }
      });
      return tree;
    },

    async itemObject(object, originData) {
      originData.forEach((item) => {
        if (item.parentName === object.parentName) {
          object.children.push(item);
        }
      });
    },
    async getTreeTab(data) {
      const tempData = await this.treeFunc(data);
      tempData.forEach((item) => {
        this.itemObject(item, data);
      });
      return tempData;
    },
    clickTreeHadnle({ data }) {
      this.loadingTab = true;
      // console.log("---clickTreeHadnle", data);
      const { deptId, yunyingleixing, type } = data;
      this.rowName = data.name;

      const TreeType = Array.isArray(data);
      const params = {
        // Id: TreeType ? "" : data.id,
        // fileProperty: TreeType ? 3 : data.yunyingleixing,
        Id: TreeType
          ? ""
          : data._unfold == false && data.parentId == 0
          ? ""
          : data.id,
        fileProperty: TreeType
          ? 3
          : data._unfold == false && data.parentId == 0
          ? 3
          : data.yunyingleixing,
        deptId: TreeType ? this.$store.getters.userInfo.deptId : data.deptId,
      };
      // this.dataTab = data.children;
      if (yunyingleixing < 0 || type === "文件") {
        this.loadingTab = false;
        return;
      }
      getTreeTable(params).then(async (res) => {
        // console.log("----------res", res.data.data);
        const treeTabData = await this.getTreeTab(res.data.data);
        this.totalpoints = res.data.data[0].totalpoints;
        this.type = +res.data.data[0].yunyingleixing;
        this.dataTab = treeTabData;
        this.loadingTab = false;
      });
      this.tabSlot = "table";
      this.preview = false;
      this.tabs.forEach((item) => {
        item.show = false;
        if (item.slot === "table") {
          item.show = true;
        }
      });
      // console.log("---clickTree", data);
    },
    onClick(item) {
      // console.log("--onClick--", item);
    },
    // 预览文件---查看doc格式文件
    onView({ node, request }) {
      this.preview = true;
      this.previewNode = node;
      this.previewAction = request;
      this.tabSlot = "doc";
    },
    // 关闭预览
    closeView() {
      this.preview = false;
      this.tabSlot = "table";
      this.tabs.forEach((item) => {
        item.show = false;
        if (item.slot === "table") {
          item.show = true;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

.standard-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
  width: 100%;
  box-sizing: border-box;
  height: calc(100vh - 100px);
  background: #e4f2ff;
  .container {
    padding: 30px 20px 10px;
    width: 90vw;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 10px;
    height: calc(100vh - 140px);
    background: #fff;
    box-shadow: 0px 2px 10px #91d3ff;
    .content {
      display: flex;
      justify-content: space-between;
      .com-tab {
        width: 54vw;
        height: 76vh;
        overflow: auto;
      }
    }
    .sort {
      display: flex;
      margin: 1vh 2vh 1vh 2vh;
      align-items: center;
      justify-content: flex-end;
      font-size: 12px;
      color: #333;
      text-align: right;
      h2 {
        margin-left: 10px;
        font-size: 26px;
        color: #37a9f7;
      }
    }
  }
  .ivu-split-trigger-vertical {
    display: none !important;
  }
  .merge {
    width: calc(50% - 5px);
    background: white;
  }

  .catalogue {
    background: #f4f7fe;
  }
  .catalogue-detail {
    background: white;
  }
  .container-tree {
    height: 76vh;
    box-sizing: border-box;
  }
  .container-right {
    box-sizing: border-box;
    .preview-doc {
      height: 76vh;
      width: 54vw;
    }
  }
}
</style>
