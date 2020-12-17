<template>
  <div
    :class="['head', { 'head-active': data.id == active.id }]"
    :deep="deep"
    :expandAll="expandAll"
    @click="headClick"
    @contextmenu="contextmenu($event)"
  >
    <div class="title" :style="spaceStyle">
      <span class="title-text">
        <span v-if="isFolder" class="order-index">{{ order }}</span>
        <span class="text">{{ name }}</span>
        <span v-if="!isFolder" class="num">(编号:{{ data.documentNumber }})</span>
        <span v-if="!isFolder&&data.docSource==1" class="sign">
          <b class="organe">A</b>
          <b class="blue">B</b>
          <b class="dark-blue">C</b>
          <b class="red">D</b>
        </span>
      </span>
      <i-spin v-if="isLoading"></i-spin>
    </div>
    <span v-if="isFolder && deep == 1" class="line"></span>
    <span v-if="isFolder" class="total">文件:{{ data.fileNum }}</span>
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
  .sign {
    color: #fff;
    margin-left: 10px;
    font-size: 14px;
    b {
      padding: 0px 2px;
    }
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
}
</style>