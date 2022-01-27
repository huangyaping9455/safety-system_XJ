<template>
  <div class="security-report" :class="classes">
    <!-- 左侧 报告表 -->
    <report-table @on-click="open"></report-table>
    <!-- 右侧 -->
    <!-- <div class="info-right">
      <tag-tabs v-model="tabSlot" :tabs="previewTabs"> -->
    <!-- 预览组件 -->
    <!-- <preview-doc slot="doc" :active="activeRow" :action="preview" @close-view="closeView"></preview-doc> -->
    <!-- 附件表 -->
    <!-- <sub-table slot="subtable" :show="tabSlot == 'subtable'" :row="activeRow"></sub-table> -->
    <!-- 预警表 -->
    <!-- <alam-table slot="alamtable" :show="tabSlot == 'alamtable'" :row="activeRow"></alam-table>
      </tag-tabs>
    </div> -->
  </div>
</template>
<script>
import { previewDoc } from "C/index-book";
import tagTabs from "C/tag-tabs";
import { picturePreview } from "@/api/daily/report";
import subTable from "./sub-table";
import alamTable from "./alam-table";
import reportTable from "./report-table";
export default {
  name: "security-report",
  components: {
    previewDoc,
    reportTable,
    subTable,
    alamTable,
    tagTabs,
  },
  data() {
    return {
      // 当前处理报告
      activeRow: {},
      // 当前报告类型
      reportTab: {},
      // 是否预览
      isOpen: false,
      tabSlot: "doc",
      previewTab: {},
    };
  },
  computed: {
    classes() {
      return ["table-page", { "table-page-preview": this.isOpen }];
    },
    // 预览组件其它 TABS 项
    previewTabs() {
      let tabs = [
        { label: "正文", slot: "doc", class: "preview-bg" },
        { label: "附表", slot: "subtable", show: this.activeRow.property == 1 },
        {
          label: "预警表",
          slot: "alamtable",
          show: this.activeRow.property == 1,
        },
      ];
      return tabs;
    },
  },
  mounted() {},
  methods: {
    // 预览的接口方法
    preview() {
      return picturePreview(this.activeRow.id);
    },
    // 打开预览组件
    open(row) {
      this.activeRow = row;
      this.tabSlot = "doc";
      this.isOpen = true;
    },
    // 关闭预览组件
    closeView() {
      this.isOpen = false;
    },
  },
};
</script>
<style lang="scss">
@import "S/mixin.scss";

.security-report {
  height: calc(100% - 98px);
  width: 100%;
  @include box-center($justify: space-between, $align: false);

  // 左边
  .info-left {
    border-radius: 6px;
    // background-color: #f4f7fe;
    background-color: #f1f8ff;
    overflow: hidden;
    display: flex;
    // flex-direction: column;

    .left-top {
      // margin-top: 1rem;
      // width: calc(25%);
      width: 440px;
      height: calc(100%);
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      padding: 1.5rem;

      @media screen and (min-width: 1601px) {
        .block {
          // width: calc(25% - 12.5px);
        }
        .imgpos {
          height: 50px;
        }
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

      .block {
        padding: 10px;
        margin-bottom: 1.5rem;
        width: 100%;
        height: 23%;
        border-radius: 8px;
        background: linear-gradient(to right, #277de0, #41dff4);
        position: relative;
        color: #ffffff;
        cursor: pointer;

        .imgpos {
          max-height: 100%;
          height: 75%;
          top: -2%;
          position: absolute;
          right: 0;
          z-index: 0;
        }
        .centent-box {
          position: relative;
          z-index: 1px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .head {
          white-space: nowrap;
          display: flex;
          align-items: center;
          cursor: pointer;
          .date {
            display: flex;
            align-items: center;
          }
          i {
            margin-left: 5px;
            font-size: 16px;
          }
        }

        .btn {
          display: inline-block;
          padding: 0px 15px;
          font-size: 15px;
          margin-top: 5px;
          text-align: center;
          border-radius: 20px;
          border: 1px solid #ffffff;
          background: rgba(#51bffe, 0.6);
        }
        .btn-title {
          font-size: 30px;
          margin: 1rem auto;
        }
      }
      .block:nth-child(2) {
        background: linear-gradient(to right, #168e5f, #94d48a);
      }
      .block:nth-child(3) {
        background: linear-gradient(to right, #ff646a, #bd87fd);
      }
      .block:nth-child(4) {
        background: linear-gradient(to right, #fd712a, #fcdf39);
        margin-bottom: 0;
      }
      .checked {
        // background: linear-gradient(to right, #ed711a, #f0a024);
        box-shadow: 3px 3px 10px rgb(126, 127, 128);
        .centent-box {
          .btn {
            border: 1px solid rgba($primary-color, 0.9);
            background: rgba($primary-color, 0.9);
          }
        }
      }
      .block:hover {
        @extend .checked;
      }
    }
    @media screen and (max-width: 1600px) {
      .left-top {
        // height: 170px;
      }
      .left-centent {
        padding: 1rem 0;
        height: calc(100%);
      }
    }
    .left-centent {
      // padding: 1.5rem 0;
      margin: 1.5rem 0;
      padding-right: 1.5rem;
      width: calc(100% - 440px);
      flex-grow: 1;
      height: calc(100% - 92px);

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
    background-color: #ecf8ff;
    color: #01a0ff;
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
  // .info-right {
  //   width: 0;
  //   height: 100%;
  //   border-radius: 6px;
  //   background: #f4f7fe;
  //   transition: all 0.3s;
  //   overflow: hidden;
  // }
}

.table-page-preview {
  .info-right {
    // width: calc(52% - 5px);
    transition: all 0.3s;
  }
  .info-left {
    width: calc(48% - 5px);
    transition: all 0.3s;
  }
  .info-right {
    margin-left: 10px;
  }
}
</style>
