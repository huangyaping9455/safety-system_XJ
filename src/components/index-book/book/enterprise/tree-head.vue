<template>
  <div
    :class="['head',{'head-active':data.id==active.id}]"
    :deep="deep"
    :expandAll="expandAll"
    @click="headClick"
    @contextmenu="contextmenu($event)"
  >
    <div class="title" :style="spaceStyle">
      <span class="title-text">
        <span v-if="isFolder" class="order-index">{{order}}</span>
        <span class="text">{{name}}</span>
        <span v-if="!isFolder" class="num">(编号:{{data.documentNumber}})</span>
      </span>
      <i-spin v-if="isLoading"></i-spin>
    </div>
    <span v-if="isFolder&&deep==1" class="line"></span>
    <span v-if="isFolder" class="total">文件:{{data.fileNum}}</span>
  </div>
</template>
 
<script>
import action from '../actions/tree-head';
export default {
  name: 'tree-head',
  mixins: [action]
};
</script>
 
<style lang="scss" >
.title {
  .num {
    color: #aaa;
    font-size: 16px;
  }
}
</style>