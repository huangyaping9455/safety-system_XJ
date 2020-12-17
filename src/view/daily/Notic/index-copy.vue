<template>
  <div class="shop">
    <el-tabs
      v-model="activeName"
      :tab-position="tabposition"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item, index) in tab"
        :key="index"
        :label="item.label"
        :name="item.value"
      >
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabposition: "left",
      activeName: 1,
      tab: [
        {
          label: "渝中区",
          value: 1,
        },
        {
          label: "渝bei区",
          value: 2,
        },
      ],
      activities: [
        {
          content: "支持使用图标",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "支持自定义颜色",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "默认样式的节点",
          timestamp: "2018-04-03 20:46",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 1rem;
  background: white;
}
.shop {
  background: gainsboro;
  .el-tab-pane {
    display: flex;
    .left {
      img {
        width: 15px;
        height: 15px;
      }
    }
    .right {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid gainsboro;
      // div {
      //   padding: 0;
      // }
      div:first-of-type {
        padding: 0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        .right-one {
          padding: 0;
          font-size: 17px;
          font-weight: 600;
        }
        .right-two {
          padding: 0.5rem 0;
        }
      }
    }
  }
}
</style>
