<template>
  <div class="index-book com-ndex-book">
    <div class="book-head book-head-2X">
      <div class="title">企业基本信息</div>
      <i-input
        clearable
        search
        size="small"
        class="search"
        placeholder="请输入关键字"
        style="margin:0;"
      ></i-input>
    </div>
    <div class="book-container book-container2x">
      <tree-form
        :state="form"
        :active="nodeData"
        :parentNodes="parentNodes"
        @load="loadNode"
        @replace="replaceNode"
        :key="treeFormIndex"
      ></tree-form>
      <tree-form
        :state="form"
        :active="nodeData"
        :parentNodes="parentNodes"
        @load="loadNode"
      ></tree-form>
      <tree-menu
        :state="menuState"
        :menu="treeMenu"
        @on-click="treeMenuClick"
      ></tree-menu>
      <scroll>
        <div class="tree">
          <i-spin v-if="loading" fix size="large"></i-spin>
          <p v-show="!loading && treeData.length == 0" class="empty">
            <img src="../../../../assets/empty/empty.png" alt="" srcset="" />
          </p>
          <tree-item
            class="tree-item2x"
            v-for="(item, index) in treeData"
            :key="item.id"
            :data="item"
            :active="nodeData"
            :expandAll="expandAll"
            :order="index + 1"
            @on-click="treeItemClick"
            @contextmenu="contextmenu"
            @loadNode="loadNode"
            @parentNodes="getParentNodes"
          ></tree-item>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import action from "../actions/book";
import treeForm from "../tree-form";
import treeMenu from "../tree-menu";
import treeItem from "../tree-item";
import treeHead from "./tree-head";

import {
  getTree,
  addSubtemplateDir,
  modifyFileNumber,
  remove,
  download,
  imgPreview,
  moveFile,
  uploadDocByImg,
} from "@/api/book/document";

export default {
  name: "document-book",
  components: {
    treeItem,
    treeMenu,
    treeForm,
  },
  mixins: [action],
  props: {
    rootNode: {
      type: Object,
    },
  },
  data() {
    return {
      treeFormIndex: 0,
    };
  },
  computed: {
    isFolder() {
      return this.nodeData.type == "文件夹";
    },
    treeMenu() {
      const menu = [
        {
          label: "查看文件",
          show: !this.isFolder,
          request: this.getDoc,
          action: this.viewFile,
          icon: "icon-9",
        },
        // {
        //   label: '下载文件',
        //   show: !this.isFolder,
        //   request: download,
        //   action: this.downloadFile
        // },
        // {
        //   label: '替換文件',
        //   form: 'upload',
        //   show: !this.isFolder,
        //   request: '/api/blade-doc/doc/SafetyProductionFile/replaceFile',
        //   requestByImg: uploadDocByImg,
        //   param: 'replace'
        // },
        {
          label: "新增文件",
          form: "upload",
          show: this.isFolder,
          request: "/api/blade-doc/doc/SafetyProductionFile/addFile",
          requestByImg: uploadDocByImg,
          action: "uploadDocByImg",
          param: "add",
          icon: "icon-1",
        },
        {
          label: "刪除文件",
          show: !this.isFolder || this.nodeData.fileNum == 0,
          request: remove,
          action: this.removeFile,
          icon: "icon-10",
        },
        {
          label: "新增文件夾",
          show: this.isFolder,
          form: "addFolder",
          request: addSubtemplateDir,
          icon: "icon-2",
        },
        // {
        //   label: '修改文件编号',
        //   show: true,
        //   form: 'modifyFileNumber',
        //   request: modifyFileNumber
        // },
        {
          label: "上移文件",
          show: true,
          request: moveFile,
          action: this.moveFile,
          param: "up",
          icon: "icon-5",
        },
        {
          label: "下移文件",
          show: true,
          request: moveFile,
          action: this.moveFile,
          param: "down",
          icon: "icon-4",
        },
      ];
      return menu.filter((item) => item.show);
    },
  },
  watch: {
    rootNode(newV) {
      ++this.treeFormIndex;
      if (!newV) return;
      if (newV.id) {
        this.initBook(this.rootNode);
      }
    },
  },
  beforeCreate() {
    treeItem.components.treeHead = treeHead;
  },
  mounted() {},
  methods: {
    getNode(data) {
      let id = data ? data.id : "";
      return getTree({ deptId: this.deptId, parentId: id });
    },
    getDoc() {
      return imgPreview(this.nodeData.id);
    },
    emitBack() {
      this.$emit("back");
    },
  },
};
</script>

<style lang="scss">
@import "../index.scss";
.com-ndex-book {
  .empty {
    margin-top: 20px;
    text-align: center;
  }
  .book-container2x {
    padding: 0 !important;
  }
  .book-head-2X {
    display: block !important;
    border: none;
    .search {
      margin: 10px 0;
      width: 180px;
      color: #62c3ff;
      .ivu-input-search-icon {
        color: #62c3ff !important;
      }
    }
    .ivu-input-small {
      font-size: 12px;
      background: #d5efff;
      color: #62c3ff;
      border-radius: 50px !important;
      border: none;
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #62c3ff;
    }

    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #62c3ff;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #62c3ff;
    }
  }
}
</style>
