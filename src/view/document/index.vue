<template>
  <i-split v-model="split" :min="0.3" :max="0.3">
    <mulu slot="left" :split="split" @on-view="onView"></mulu>
    <tag-tabs slot="right" v-model="tab" :tabs="tabs">
      <preview-doc
        slot="doc"
        :active="previewNode"
        :action="previewAction"
        :info="previewNode!=doc"
        :closeBtn="previewNode!=doc"
        :printBtn="previewNode!=doc"
        @close-view="closeView"
      ></preview-doc>
    </tag-tabs>
  </i-split>
</template>
 
<script>
import { previewDoc } from 'C/index-book';
import tagTabs from 'C/tag-tabs';
import mulu from './mulu';
export default {
  name: 'document',
  components: {
    tagTabs,
    previewDoc,
    mulu
  },
  data() {
    return {
      split: 0.5,
      tab: 'doc',
      isPreview: true,
      tabs: [{ label: '正文', slot: 'doc', class: 'preview-bg' }],
      doc: {
        name: '文件和档案管理制度',
        _fileList: [
          require('A/document/1.png'),
          require('A/document/2.png'),
          require('A/document/3.png'),
          require('A/document/4.png')
        ]
      },
      previewNode: {},
      previewAction: null
    };
  },
  mounted() {
    this.previewNode = this.doc;
  },
  methods: {
    onView({ node, request }) {
      this.isPreview = true;
      this.previewNode = node;
      this.previewAction = request;
    },
    closeView() {
      this.previewNode = this.doc;
    }
  }
};
</script>
 
<style lang="scss" >
.document {
  display: flex;
}
</style>