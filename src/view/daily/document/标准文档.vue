<template>
  <div class="document-page">
    <div class="container">
      <mulu ></mulu>
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
  padding: 20px 15px;
  width: 100%;
  height: 100%;
  background: #e4f2ff;
  .container{
    display: flex;
    justify-content: space-between;
    padding: 20px 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 2px 10px #91d3ff;
    height: 80vh;
    .preview-doc {
      width: 35vw;
    }
  }
}
</style>