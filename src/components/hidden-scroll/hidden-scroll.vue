<template>
  <div class="scroll-container">
    <div class="hidden-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "hidden-scroll",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

.scroll-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .hidden-scroll {
    width: $hide-content-w;
    // overflow: auto;
    height: 100%;
  }
}
</style>
