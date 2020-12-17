<template>
  <div class="app-index">
    <!-- <app-head></app-head> -->
    <app-main></app-main>
    <app-foot></app-foot>
  </div>
</template>

<script>
import appHead from "./app-head";
import appFoot from "./app-foot";
import appMain from "./app-main";
export default {
  name: "index",
  components: {
    appHead,
    appMain,
    appFoot,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "S/varibale.scss";

.app-index {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  /* background: #d3d7e9; */
}
</style>
