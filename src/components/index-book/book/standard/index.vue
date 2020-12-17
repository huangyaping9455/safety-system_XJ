<template>
  <div class="index-book">
    <div class="book-head">
      <i-tooltip content="安全生产标准化考评目录" placement="bottom">
        <div class="title">安全生产标准化考评目录</div>
      </i-tooltip>
      <div class="panel">
        <i-input clearable search size="small" class="search" placeholder="请输入关键字"></i-input>
        <icon type="md-cloud-download" class="download"></icon>
      </div>
    </div>
    <div class="book-container">
      <div v-if="treeData.length > 0">
        <tree-form :state="form" :active="nodeData" :parentNodes="parentNodes" @load="loadNode"></tree-form>
        <tree-menu :state="menuState" :menu="treeMenu" @on-click="treeMenuClick"></tree-menu>
      </div>
      <scroll>
        <div class="tree">
          <i-spin v-if="loading" fix size="large"></i-spin>
          <p v-show="!loading && treeData.length == 0">暂无数据</p>
          <tree-item
            v-for="(item, index) in treeData"
            :key="index"
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
import action from '../actions/book';
import treeMenu from '../tree-menu';
import treeForm from '../tree-form';
import treeItem from '../tree-item';
import treeHead from './tree-head';
import {
  getTree,
  addSubtemplateDir,
  setFileNature,
  setFilebelong,
  modifyFileNumber,
  remove,
  download,
  moveFile,
  rename,
  imgPreview,
  setsafetyBind,
  cancelSafetyBind
} from '@/api/book/standard';

treeItem.components.treeHead = treeHead;

export default {
  name: 'standard-book',
  components: {
    treeItem,
    treeMenu,
    treeForm
  },
  mixins: [action],
  props: {
    target: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    treeMenu() {
      const menu = [
        {
          label: '查看文件',
          request: this.getDoc,
          show: !this.isFolder,
          action: this.viewFile
        },
        {
          label: '下载文件',
          show: !this.isFolder && this.nodeData.docSource != 1,
          request: download,
          action: this.downloadFile
        },
        {
          label: '替換文件',
          form: 'upload',
          show: !this.isFolder && this.nodeData.docSource != 1,
          request: '/api/blade-doc/doc/biaozhunhuamuban/replaceSubtemplateFile',
          param: 'replace'
        },
        {
          label: '新增文件',
          form: 'upload',
          show: this.isFolder && this.nodeData.docSource != 1,
          request: '/api/blade-doc/doc/biaozhunhuamuban/addSubtemplateFile',
          param: 'add'
        },
        {
          label: '刪除文件',
          show:
            (!this.isFolder && this.nodeData.docSource != 1) ||
            this.nodeData.fileNum == 0,
          request: remove,
          action: this.removeFile
        },
        {
          label: '新增文件夾',
          show: this.isFolder && this.nodeData.docSource != 1,
          form: 'addFolder',
          request: addSubtemplateDir
        },
        {
          label: '文件重命名',
          show: !this.isFolder && this.nodeData.docSource != 1,
          form: 'rename',
          request: rename
        },
        {
          label: '设置性质',
          show: this.nodeData.docSource != 1,
          form: 'setFileNature',
          request: setFileNature
        },

        {
          label: '设置所属人',
          show: this.nodeData.docSource != 1,
          form: 'setFilebelong',
          request: setFilebelong
        },
        {
          label: '修改文件编号',
          show: !this.isFolder && this.nodeData.docSource != 1,
          form: 'modifyFileNumber',
          request: modifyFileNumber
        },
        {
          label: '上移文件',
          show: this.nodeData.docSource != 1,
          request: moveFile,
          action: this.moveFile,
          param: 'up'
        },
        {
          label: '下移文件',
          show: this.nodeData.docSource != 1,
          request: moveFile,
          action: this.moveFile,
          param: 'down'
        },
        {
          label: '文档绑定',
          show: this.isFolder && this.nodeData.docSource != 1,
          form: 'setsafetyBind',
          request: setsafetyBind
        },
        {
          label: '文档解绑',
          show: !this.isFolder && this.nodeData.docSource == 1,
          request: cancelSafetyBind,
          action: this.cancelSafetyBind
        }
      ];
      return menu.filter(item => item.show);
    }
  },
  mounted() {
    this.initBook();
  },
  beforeCreate() {
    // treeItem.components.treeHead = treeHead;
  },
  methods: {
    getNode(data) {
      return getTree({
        deptId: this.deptId,
        parentId: data ? data.id : '',
        fileProperty: this.target
      });
    },
    getDoc() {
      return imgPreview(this.nodeData.id, this.nodeData.docSource);
    }
  }
};
</script>
 
<style lang="scss" >
@import '../index.scss';
</style>