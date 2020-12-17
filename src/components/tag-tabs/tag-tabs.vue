<template>
  <div :class="['tag-tabs',active.class]">
    <div class="tab-head">
      <div
        v-for="item in tabs"
        v-show="show(item)"
        :key="item.label"
        :class="['tab-block', { checked: item.slot == value }]"
        @click="tabClick(item)"
      >
        <div class="line"></div>
        <b>{{ item.label }}</b>
      </div>
    </div>
    <div
      v-for="item in tabs"
      v-show="item.slot == value && show(item) "
      :key="item.label"
      class="tab-main"
    >
      <slot :name="item.slot"></slot>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'tag-tabs',
  props: {
    tabs: {
      type: Array
    },
    value: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    active() {
      return this.tabs.find(item => item.slot == this.value);
    }
  },
  methods: {
    show(item) {
      return item.show === undefined ? true : item.show;
    },
    tabClick(item) {
      this.$emit('on-click', item);
      this.$emit('input', item.slot);
    }
  }
};
</script>
 
<style lang="scss" >
@import '@/style/mixin.scss';

$height: 40px;
.tag-tabs {
  width: 100%;
  background: white;
  height: 100%;
  @include box-center($justify: flex-start, $align: false);
  flex-direction: column;
  .tab-head {
    height: $height;
    min-height: $height;
    @include box-center($justify: flex-end, $align: false);
    .tab-block {
      width: 98px;
      cursor: pointer;
      height: 38px;
      margin: 0 30px;
      font-size: 16px;
      text-align: center;
      line-height: 38px;
      color: #333;
      background: #d5eaff;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -24px;
        border-top: 38px solid #d5eaff;
        border-left: 24px solid transparent;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: -24px;
        border-top: 38px solid #d5eaff;
        border-right: 24px solid transparent;
      }
      .line {
        height: 4px;
        width: 65px;
        margin: 0 auto;
        border-radius: 2px;
        background: #225cf4;
        @include center-translate($direction: horizontal);
        top: -2px;
      }
    }
    .checked {
      color: #ffffff;
      background: #1067ff;
      &::before {
        border-top: 38px solid #1067ff;
      }
      &::after {
        border-top: 38px solid #1067ff;
      }
      .line {
        background: #fed016;
      }
    }
  }
  .tab-main {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
</style>