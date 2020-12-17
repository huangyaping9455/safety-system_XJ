<template>
  <i-drawer
    v-model="state.show"
    :title="active.name"
    :width="400"
    :mask-closable="!loading"
    class="custom-drawer"
  >
    <i-spin v-show="loading" fix></i-spin>
    <div v-if="state.form == 'setsafetyBind'" class="drawer-body document-info">
      <div>
        <span>标准化文档{{active.form}}</span>
        <div>
          <i-tree ref="production" :data="productionList" :load-data="loadbindTree" show-checkbox></i-tree>
        </div>
      </div>
    </div>
    <div v-show="state.form !== 'setsafetyBind'" class="drawer-body">
      <base-form ref="form" v-model="form" :column="column"></base-form>
    </div>

    <!-- 提交操作 -->
    <div v-if="isSubmit" class="drawer-footer">
      <i-button @click="state.show = false">取消</i-button>
      <i-button type="primary" @click="submit">提交</i-button>
    </div>
  </i-drawer>
</template>
 
<script>
import { getUsersByDept, getDicData } from '@/api/user';
import baseForm from 'C/base-form';
import { formColumn } from '@/const/tree-form';
import { bindTree } from '@/api/standard';
export default {
  name: 'tree-form',
  components: {
    baseForm
  },
  props: {
    state: {
      type: Object
    },
    active: {
      type: Object
    },
    parentNodes: {
      type: Array
    }
  },
  data() {
    return {
      loading: false,
      form: {},
      userOpt: [],
      fileNatureOpt: [],
      productionList: []
    };
  },
  computed: {
    column() {
      return formColumn(this);
    },
    isSubmit() {
      return this.form.uploadType != '文档' || this.state.form != 'upload';
    }
  },
  watch: {
    'form.uploadType'(newV) {
      if (newV == '图片') {
        this.form.fileName = '';
        this.form.fileNumber = '';
      }
    },

    'state.show'() {
      if (this.state.form !== 'setsafetyBind') {
        this.form = {
          folderName: '',
          fileName: this.active.name.split('.')[0],
          fileNature: this.active.fileProperty,
          filebelong: this.active.fileSuoshurenId,
          fileNumber: this.active.documentNumber,
          uploadimg: [],
          uploadType: '文档'
        };
        this.$refs.form.resetFields();
        this.loading = false;
      } else if (this.state.form === 'setsafetyBind') {
        this.getbindTree();
      }
    }
  },
  mounted() {
    this.getUsersByDept();
    this.getFileNature();
    // this.getFileNumber();
  },
  methods: {
    ajaxTest(response, callback) {
      let res = response.data;
      if (res.code == 200 && res.success) {
        callback && callback(response);
        this.$message.success(res.msg);
        this.state.show = false;
      } else {
        this.$message.error(res.msg);
      }
      this.loading = false;
    },

    getUsersByDept() {
      if (this.userOpt.lenght > 0) return;
      getUsersByDept(this.$store.getters.deptId).then(res => {
        this.userOpt = res.data.data.map(item => {
          item.value = item.id;
          item.label = item.name;
          return item;
        });
      });
    },

    getFileNature() {
      if (this.fileNatureOpt.lenght > 0) return;
      getDicData('fileProperty').then(res => {
        this.fileNatureOpt = res.data.data;
      });
    },

    addNode(res) {
      if (this.active._load) {
        this.active.children.push(res.data.data);
      } else {
        this.$emit('load', this.active);
      }
    },

    submit() {
      const action = this.state.action || this.state.form;
      if (this.state.form === 'setsafetyBind') {
        if (!action) return;
      } else {
        const is = this.$refs.form.validate();
        if (!is || !action) return;
      }
      this.loading = true;
      this[action]();
    },

    uploadSuccess(data) {
      this.ajaxTest({ data }, () => {
        // add
        if (this.state.param == 'add') {
          this.parentNodes.forEach(item => item.fileNum++);
          this.addNode({ data });
        } else {
          // replace
          const children = this.parentNodes[0].children;
          const index = children.findIndex(d => d.id == this.active.id);
          children.splice(index, 1, data.data);
        }
      });
    },

    uploadDocByImg() {
      let formData = new FormData();
      formData.append('id', this.active.id);
      formData.append('documentName', this.form.fileName);
      formData.append('documentNumber', this.form.fileNumber);
      this.form.uploadimg.forEach(v => formData.append('files', v.file));
      this.state
        .requestByImg(formData)
        .then(res => this.uploadSuccess(res.data));
    },

    addFolder() {
      this.state.request(this.active.id, this.form.folderName).then(res => {
        this.ajaxTest(res, this.addNode);
      });
    },

    rename() {
      this.state.request(this.active.id, this.form.fileName).then(res => {
        this.ajaxTest(res, () => {
          this.active.name = `${this.form.fileName}.docx`;
        });
      });
    },

    setFileNature() {
      this.state.request(this.active.id, this.form.fileNature).then(res => {
        this.ajaxTest(res, () => {
          this.active.fileProperty = this.form.fileNature;
        });
      });
    },

    setFilebelong() {
      this.state.request(this.active.id, this.form.filebelong).then(res => {
        this.ajaxTest(res, () => {
          this.active.fileSuoshurenId = this.form.filebelong;
        });
      });
    },

    modifyFileNumber() {
      if (this.form.fileNumber !== '') {
        this.state.request(this.active.id, this.form.fileNumber).then(res => {
          this.ajaxTest(res, () => {
            this.active.documentNumber = this.form.fileNumber;
          });
        });
      } else {
        this.$message.warning('请输入文档编号！');
        this.loading = false;
      }
    },

    getbindTree() {
      bindTree({
        biaozhunhuamubanId: this.active.id
      }).then(res => {
        this.productionList = res.data.data.map(item => {
          item.title = item.name;
          item.type == '文件夹' ? (item.loading = false) : '';
          return item;
        });
        this.loading = false;
      });
    },

    loadbindTree(item, callback) {
      setTimeout(() => {
        let params = {
          biaozhunhuamubanId: this.active.id,
          parentId: item.id
        };
        bindTree(params).then(res => {
          const data = res.data.data.map(item => {
            item.title = item.name;
            item.type == '文件夹' ? (item.loading = false) : '';
            return item;
          });
          callback(data);
        });
      }, 1000);
    },

    setsafetyBind() {
      const ids = this.$refs.production.getCheckedNodes().map(item => {
        if (item.type !== '文件夹') return item.id;
      });
      this.state
        .request({
          id: this.active.id,
          safetyIds: ids.filter(d => d).toString()
        })
        .then(res => {
          this.ajaxTest(res, () => {
            this.active._load = false;
            this.addNode();
          });
        });
    }
  }
};
</script>
 
<style lang="scss" >
</style>