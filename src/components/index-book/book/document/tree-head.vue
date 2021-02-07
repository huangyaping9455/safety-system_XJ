<template>
  <div
    :class="['head', { 'head-active': data.id == active.id }]"
    :deep="deep"
    :expandAll="expandAll"
    @click="headClick"
    @contextmenu="contextmenu($event)"
    class="com-tree-item2X"
  >
    <div class="title " :style="spaceStyle">
      <div class="title-text text-ellipsis" :title="name">
        <img
          v-if="isFolder"
          class="package"
          src="../../../../assets/new_icon/package.png"
          alt=""
        />
        <span class="text circle-no"
          >{{ name
          }}<span v-if="isFolder" class="num"
            >(文件:{{ data.fileNum }})</span
          ></span
        >
        <!-- <span v-if="!isFolder" class="num">(编号:{{data.documentNumber}})</span> -->
      </div>
      <i-spin v-if="isLoading"></i-spin>
    </div>
    <!-- <span v-if="isFolder&&deep==1" class="line"></span>
    <span v-if="isFolder" class="total">文件:</span> -->
  </div>
</template>

<script>
import action from "../actions/tree-head";
export default {
  name: "tree-head",
  mixins: [action],
};
</script>

<style lang="scss" scoped>
@import url("../../../../assets/css/common.css");
.com-tree-item2X {
  .title-text {
    display: inline-block;
    width: 15vw !important;
  }
  .title {
    max-width: initial !important;
    .num {
      color: #333;
      font-size: 14px;
    }
    .text {
      font-size: 14px;
    }
  }
  .package {
    width: 15px;
    margin-right: 5px;
  }
  .circle-no {
    position: initial !important;
    &::after {
      position: initial !important;
    }
  }
}
</style>
