<template>
  <div
    :class="['head', { 'head-active': data.id == active.id }]"
    :deep="deep"
    :expandAll="expandAll"
    @click="headClickHandle"
    @contextmenu="contextmenu($event)"
    class="com-tree-item"
  >
    <div class="title" :style="spaceStyle">
      <div
        class="title-text"
        :class="[{ 'title-text-bg': isFolder && deep == 1 }]"
      >
        <el-tooltip
          v-if="data.remark"
          popper-class="el-toolti-item"
          effect="dark"
          :content="data.remark"
          placement="bottom"
        >
          <i
            v-if="isFolder && deep == 1"
            class="el-icon-arrow-right"
            :class="treeArrowIcon ? 'el-icon-rotate' : ''"
          ></i>
          <span v-if="isFolder" class="text" :class="[{ test: !isFolder }]"
            >{{ name }}
            <span v-if="isFolder && deep !== 1" class="total font-size14"
              >(文件:{{ data.fileNum }})</span
            >
          </span>
        </el-tooltip>

        <i
          v-if="isFolder && deep == 1 && !data.remark"
          class="el-icon-arrow-right"
          :class="treeArrowIcon ? 'el-icon-rotate' : ''"
        ></i>
        <span
          v-if="isFolder && !data.remark"
          class="text font-size16"
          :class="[{ test: !isFolder }]"
          >{{ name }}
          <span
            v-if="isFolder && deep !== 1 && !data.remark"
            class="total font-size16"
            >(文件:{{ data.fileNum }})</span
          >
        </span>

        <span
          v-if="!isFolder"
          class="text font-size14"
          :class="[
            {
              test: !isFolder,
            },
          ]"
          >{{ name }}
          <span class="num font-size14"
            >(编号:{{ data.documentNumber }})</span
          ></span
        >
      </div>
      <i-spin v-if="isLoading"></i-spin>
    </div>
    <span v-if="isFolder && deep == 1" class="line"></span>
    <span v-if="isFolder && deep == 1" class="total "
      >文件：{{ data.fileNum }}</span
    >
  </div>
</template>

<script>
import action from "../actions/tree-head";

export default {
  name: "tree-head",
  mixins: [action],
  data() {
    return {
      treeArrowIcon: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    headClickHandle() {
      this.treeArrowIcon = !this.treeArrowIcon;
      this.headClick();
    },
  },
};
</script>
<style>
.el-toolti-item {
  color: #666 !important;
  background: #fff !important;
  max-width: 500px !important;
  box-shadow: 0 2px 5px rgba(55, 169, 247, 0.8);
}
.el-tooltip__popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #fff !important;
}
</style>
<style lang="scss" scoped>
.com-tree-item {
  .title {
    .num {
      color: #aaa;
      font-size: 16px;
    }
    .sign {
      color: #fff;
      margin-left: 10px;
      font-size: 14px;
      .red {
        background: #ff5803;
      }
      .organe {
        background: #fb9819;
      }
      .blue {
        background: #288bf9;
      }
      .dark-blue {
        background: #3a4ffe;
      }
    }
    .font-size12 {
      font-size: 14px !important;
    }
    .title-text {
      .test {
        position: inherit !important;
      }
    }
    .title-text-bg {
      padding: 5px 20px 5px 0;
      background: url("../../../../assets/new_icon/tree_bg.png") no-repeat;
      background-size: 100% 100%;
      font-size: 16px !important;
      color: #fff;
      text-indent: 5px !important;
      .el-icon-arrow-right {
        transition: all 0.2s;
      }
      .el-icon-rotate {
        transform: rotate(90deg);
        transition: all 0.2s;
      }
    }
  }
}
</style>
