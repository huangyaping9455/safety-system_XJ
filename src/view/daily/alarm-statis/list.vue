<template>
  <div class="alarm-list">
    <div class="list-item h100">
      <div class="baojing-title">
        <img src="~A/daily/GPS.png" alt />
        <p>报 警 统 计</p>
      </div>
      <div class="facility-alarm">
        <scroll>
          <div v-for="item in statisList" :key="item.text" class="block" @click="emitClick(item)">
            <span :class="['tab-btn', { checked: isActive(item) }]">{{ item.text}}</span>
            <img v-if="item.baojingshu != 0" src="~A/daily/baojing.png" alt />
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>
 
<script>
import { statisList } from '@/const/alarm';

export default {
  name: 'alarm-list',
  props: {},
  data() {
    return {
      active: {},
      statisList
    };
  },
  beforeMount() {
    this.emitClick(statisList[0]);
  },
  mounted() {},
  methods: {
    isActive(item) {
      return item.text == this.active.text && item.type == this.active.type;
    },
    emitClick(item) {
      this.active = item;
      this.$emit('on-click', item);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>