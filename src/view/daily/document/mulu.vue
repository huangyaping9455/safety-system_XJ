<template>
  <div class="document-doc wh100 flex-row">
    <scroll>
      <div class="wrapper-boolcase">
        <bookcase-shelf
          v-for="(item, index) in listdata"
          :key="index"
          :split="split"
          :shelf="item"
          :active="doc"
          :order-num="index"
          @contextmenu="contextmenu"
          @open="openDoc"
        ></bookcase-shelf>
        <div v-if="!listdata.length" class="empty flex xy-center jf-center">
          <img src="../../../assets/empty/empty.png" alt="" srcset="" />
        </div>
      </div>
    </scroll>
    <div class="right-content flex">
      <document-book
        class="document-book"
        ref="book"
        :rootNode="doc"
        @back="closeDoc"
        @on-view="emitView"
      ></document-book>
      <tag-tabs
        v-show="previewNode.id"
        class="preview-doc"
        v-model="tab"
        :tabs="tabs"
      >
        <preview-doc
          slot="doc"
          :active="previewNode"
          :action="previewAction"
          :info="previewNode != doc"
          :closeBtn="previewNode != doc"
          :printBtn="previewNode != doc"
          :noHead="true"
          @close-view="closeView"
        ></preview-doc>
      </tag-tabs>
      <div
        v-if="!previewNode.id"
        class="empty preview-doc flex xy-center jf-center"
      >
        <img src="../../../assets/empty/empty.png" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import { directoryTree } from "@/api/book/document";
import { documentBook } from "C/index-book";
import bookcaseShelf from "./shelf";
import { previewDoc } from "C/index-book";
import tagTabs from "C/tag-tabs";

export default {
  name: "mulu",
  components: {
    documentBook,
    bookcaseShelf,
    tagTabs,
    previewDoc,
  },
  props: {
    split: Number,
    default: 0,
  },
  data() {
    return {
      loading: false,
      listdata: [],
      shelf: {},
      doc: {},
      // 柜子架 滚动配置
      scrollOps: {
        vuescroll: {
          detectResize: false,
          sizeStrategy: 250,
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
        },
      },
      tab: "doc",
      // split: 0.5,
      isPreview: true,
      tabs: [{ label: "正文", slot: "doc", class: "preview-bg" }],
      doc: {
        _fileList: [],
      },
      previewNode: {},
      previewAction: null,
    };
  },
  mounted() {
    this.getTree();
    // console.log("----node---",this.doc)
    this.previewNode = this.doc;
  },
  methods: {
    onView({ node, request }) {
      // console.log("----onView---",node)
      this.isPreview = true;
      this.previewNode = node;
      this.previewAction = request;
    },
    closeView() {
      this.previewNode = this.doc;
    },
    // 获取目录接口方法
    getTree() {
      this.loading = true;
      directoryTree(this.deptId).then((res) => {
        this.loading = false;
        this.listdata = res.data.data;
        const shelf = res.data.data[0];
        this.openDoc({ doc: shelf, shelf });
      });
    },
    isShow(shelf) {
      let id = this.shelf.documentNumber;
      return id == undefined ? true : id == shelf.documentNumber;
    },
    emitView(params) {
      console.log(params);
      this.onView(params);
      // this.$emit('on-view', params);
    },
    openDoc({ doc, shelf }) {
      this.shelf = shelf;
      this.doc = doc;
    },
    closeDoc() {
      this.shelf = {};
      this.doc = {};
    },
    contextmenu(params) {
      // console.log("22222");

      this.$refs.book.contextmenu(params);
    },
  },
};
</script>

<style lang="scss">
@import url("../../../assets/css/common.css");
.document-doc {
  .empty {
    width: 100%;
  }
  .right-content {
    margin-top: 1%;
    height: 96% !important;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 5px 0px 5px #e3e3e3;
  }
  .wrapper-boolcase {
    padding-top: 15px;
    width: 32vw;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 7px 0px 10px -7px #5e5e5e;
  }
  .document-book {
    margin-top: 35px;
    width: 16vw;
    height: calc(100vh - 290px) !important;
    box-sizing: border-box;
    position: relative;
    &::after {
      position: absolute;
      content: " ";
      width: 1px;
      right: 0;
      top: 10%;
      height: 80%;
      background: #e3e3e3;
    }
  }
  .preview-doc {
    width: 36vw;
  }
}
</style>
