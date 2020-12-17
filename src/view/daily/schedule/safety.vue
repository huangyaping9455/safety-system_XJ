<template>
  <div class="safety-responsibility">
    <div class="title-box">
      <b>安全生产责任书</b>
      <p>
        承诺人：
        <span>{{$store.getters.userInfo.userName}}</span>
      </p>
    </div>
    <div class="centent-box zherenshi">
      <div v-if="list.length==0">暂无数据</div>
      <scroll v-else>
        <img v-for="src in list" :key="src" :src="src" />
      </scroll>
    </div>
  </div>
</template>
<script>
import { imgPreviewBySuoshuren } from '@/api/daily/schedule';

export default {
  name: 'safety-responsibility',
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      imgPreviewBySuoshuren('安全责任书').then(res => {
        this.list = res.data.data.list || [];
      });
    }
  }
};
</script>
<style lang="scss">
.safety-responsibility {
  height: 100%;
}
</style>

