<template>
  <div
    class="com-bookcase-item flex al-center pointer"
    @click="$emit('open', { doc: shelf, shelf })"
    @contextmenu.prevent="$emit('contextmenu', { event: $event, data: shelf })"
  >
    <div class="line"></div>
    <div class="content" :class="'order-' + orderNum">
      <span class="font-size12 title-item">{{ shelf.name }}</span>
      <div class="flex flex-column">
        <span
          v-for="item in shelf.children"
          :key="item.name"
          class="font-size12"
          >{{ item.name }}</span
        >
      </div>
      <div class="order">
        <span :class="'order-' + orderNum">{{ shelf.documentNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shelf",
  props: {
    shelf: Object,
    active: Object,
    split: {
      type: Number,
      default: 0,
    },
    orderNum: Number,
  },
  data() {
    return {
      e: {},
      // 柜子架 横向滚动配置
      scrollOpsBySlide: {
        scrollPanel: {
          scrollingY: false,
        },
        bar: {
          disable: true,
        },
        vuescroll: {
          detectResize: false,
          mode: "slide",
          scroller: {
            bouncing: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
            minZoom: 1,
            maxZoom: 1,
          },
        },
      },
    };
  },
  watch: {
    split() {
      // this.$refs.scroll.refresh();
    },
  },
  mounted() {
    // setTimeout(() => {
    // console.log(this.shelf)
    // }, 200);
  },
  methods: {
    mouseup(e, params) {
      if (e.x == this.e.x && e.y == this.e.y && e.button == 0)
        this.$emit("open", params);
    },
  },
};
</script>

<style lang="scss">
@import url("../../../assets/css/common.css");
.com-bookcase-item {
  margin-bottom: 15px;
  width: 16vw;
  height: 35vh;
  background: #fff;
  .order-0 {
    background: #a21f24;
  }
  .order-1 {
    background: #c48416;
  }
  .order-2 {
    background: #364661;
  }
  .order-3 {
    background: #777;
  }
  .order-4 {
    background: #a21f24;
  }
  .order-5 {
    background: #c48416;
  }
  .content {
    padding: 15px 15px;
    width: 75%;
    height: 92%;
    text-align: center;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 5px 5px #333;
    position: relative;
    transition: all 0.5s;
    &:hover {
      transition: all 0.5s;
      transform: translateY(-5px);
    }
    div {
      margin-top: 5px;
    }
    .title-item {
      display: inline-block;
      margin: 0 auto;
      padding-bottom: 5px;
      width: 120px;
      text-align: center;
      border-bottom: 1px solid #fff;
    }
    .order {
      position: absolute;
      top: -15px;
      right: -15px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      text-align: center;
      font-weight: 400;
      background: rgba(0, 0, 0, 0.2);
      span {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .line {
    height: 100%;
    width: 1px;
    background: #e3e3e3;
    box-shadow: 3px 0px 5px #333;
  }
}
</style>
