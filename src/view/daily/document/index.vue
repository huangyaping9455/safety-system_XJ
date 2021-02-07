<template>
  <div class="document-page">
    <div class="container">
      <mulu :split="0.5"></mulu>
    </div>
  </div>
</template>
 
<script>
import mulu from "./mulu";
export default {
  name: "document",
  components: {
    mulu,
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
 
<style lang="scss" >
.document-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  width: 100%;
  height: calc(100vh - 100px);
  background: #e4f2ff;
  .container{
    width: 86vw;
     height: calc(100vh - 140px);
    display: flex;
    justify-content: space-between;
    padding: 20px 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 2px 10px #91d3ff;
  }
}
</style>