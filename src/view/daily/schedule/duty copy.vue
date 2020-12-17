<template>
  <div class="pair-responsibilities">
    <div class="tab-box">
      <span
        v-for="(item, index) in tablist"
        :key="index"
        :class="{ checked: item.title == zhize }"
        @click="changezhize(item)"
      >{{ item.title }}</span>
    </div>
    <div class="title-box">
      <b>{{ zhize }}</b>
      <p>
        当前岗位：
        <span>{{ data.mingcheng }}</span>
      </p>
    </div>
    <div v-show="zhize == '岗位职责'" class="centent-box">
      <scroll>
        <div class="content" v-html="data.gangweizhize"></div>
      </scroll>
    </div>
    <!-- 安全职责 -->
    <div v-show="zhize == '安全职责'" class="centent-box">
      <scroll>
        <div class="content" v-html="data.anquanzhize"></div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { getPostInfo } from '@/api/daily/schedule';
export default {
  name: 'pair-responsibilities',
  data() {
    return {
      zhize: '岗位职责',
      data: {},
      tablist: [
        {
          title: '岗位职责',
          key: 'gangweizhize'
        },
        {
          title: '安全职责',
          key: 'anquanzhize'
        }
      ]
    };
  },
  mounted() {
    this.getPostInfoData();
  },
  methods: {
    getPostInfoData() {
      getPostInfo(this.$store.getters.postId).then(res => {
        this.data = res.data.data;
      });
    },
    changezhize(item) {
      this.zhize = item.title;
    }
  }
};
</script>
<style lang="scss">
@import 'S/mixin.scss';
.pair-responsibilities {
  height: 100%;
}
</style>


