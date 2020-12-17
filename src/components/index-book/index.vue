 <template>
  <div :class="classes">
    <div class="catalogue preview-bg">
      <!-- 企业文件 -->
      <enterprise-book
        v-if="target === '企业文件'"
        :menu="menu"
        :expandAll="expandAll"
        @on-view="onView"
      ></enterprise-book>
      <!-- 标准化 -->
      <standard-book v-else :target="target" :menu="menu" :expandAll="expandAll" @on-view="onView"></standard-book>
    </div>
    <!-- 预览部分 -->
    <div class="catalogue-detail">
      <tag-tabs v-model="tabSlot" :tabs="tabs">
        <preview-doc
          slot="doc"
          :active="previewNode"
          :action="previewAction"
          @close-view="closeView"
        ></preview-doc>
      </tag-tabs>
    </div>
  </div>
</template>
 
<script>
import previewDoc from './preview/index';
import tagTabs from 'C/tag-tabs';
export default {
  name: 'book-page',
  components: {
    standardBook: () => import('./book/standard/index.vue'),
    enterpriseBook: () => import('./book/enterprise/index.vue'),
    previewDoc,
    tagTabs
  },
  props: {
    menu: {
      type: Boolean,
      default: true
    },
    target: [Number, String],
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabSlot: 'doc',
      tabs: [{ label: '正文', slot: 'doc', class: 'preview-bg' }],
      preview: false,
      previewNode: {},
      previewAction: () => {}
    };
  },
  computed: {
    classes() {
      return ['book-page', { 'book-page-preview': this.preview }];
    }
  },

  methods: {
    onView({ node, request }) {
      this.preview = true;
      this.previewNode = node;
      this.previewAction = request;
    },
    closeView() {
      this.preview = false;
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';

.book-page {
  width: 100%;
  height: 100%;
  @include box-center($justify: space-between, $align: false);
  .catalogue {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    transition: all 0.3s;
  }
  .catalogue-detail {
    width: 0px;
    height: 100%;
    border-radius: 6px;
    transition: all 0.3s;
    overflow: hidden;
  }
}
.book-page-preview {
  .catalogue,
  .catalogue-detail {
    width: calc(50% - 5px);
    transition: all 0.3s;
  }
  .catalogue-detail {
    margin-left: 10px;
  }
}
</style>