<style lang="scss" scoped>
.schedule-page.new {
  border: 1px solid #eee;
  box-shadow: rgba(64, 158, 255, 0.2) 0 2px 12px 0;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .info-left {
    width: 54%;
  }
  .left-top {
    height: auto;
    margin-bottom: 26px;
    .mulu-title {
      display: flex;
      justify-content: space-around;
      span {
        color: #4d4d4d;
        font-size: 18px;
        border: solid 1px #e5e5e5;
        padding: 5px 50px;
        border-radius: 20px;
        cursor: pointer;
        &.checked {
          background-image: linear-gradient(90deg, #34a1ff 0%, #44c9d7 100%);
          color: #ffffff;
        }
      }
    }
  }
  .left-center {
    height: auto;
  }
  .info-right {
    width: 42%;
  }
}
@media screen and (min-width: 1276px) and (max-width: 1528px) {
  .schedule-page.new {
    padding: 10px;
    .left-top {
      margin-bottom: 14px;
      .mulu-title {
        span {
          font-size: 13px;
          padding: 5px 20px;
        }
      }
    }
    .left-center {
      height: auto;
    }
    .info-right {
      width: 42%;
    }
  }
}
</style>

<template>
  <div class="schedule-page new">
    <div class="info-left">
      <div class="left-top">
        <div class="mulu-title">
          <span
            v-for="(item, index) in submunu"
            :key="index"
            :class="{ checked: checked == index }"
            @click="show(index, item)"
            >{{ item.text }}</span
          >
        </div>
      </div>
      <div class="left-center">
        <calendar ref="calendar" v-model="selectDay"></calendar>
      </div>
      <div class="left-bottom">
        <todo-list
          ref="todo"
          :selectDay="selectDay"
          @to-detail="toTodoDetail"
        ></todo-list>
      </div>
    </div>
    <div class="info-right">
      <safety v-show="checked == '2'"></safety>
      <duty v-show="checked == '3'"></duty>
      <todo-detail
        v-show="checked == 'todo'"
        v-model="todoItem"
        @close="closeTodoDetail"
        @update="update"
      ></todo-detail>
    </div>
  </div>
</template>
<script>
import safety from "./safety";
import duty from "./duty";
import calendar from "./calendar";
import todoList from "./todo-list";
import todoDetail from "./todo-detail";
export default {
  name: "schedule",
  components: {
    safety,
    duty,
    calendar,
    todoList,
    todoDetail,
  },
  data() {
    return {
      split: 0.5,
      selectDay: {},
      todoItem: {},
      checked: 3,
      zhize: "岗位职责",
      submunu: [
        {
          text: "安全目标",
          to: "/daily/target",
        },
        {
          text: "法律法规",
          to: "/daily/law",
        },
        {
          text: "安全生产责任书",
        },
        {
          text: "一岗双责",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    toTodoDetail(item) {
      this.todoItem = item;
      this.show("todo");
    },
    update() {
      this.$refs.calendar.getDatesData();
      this.$refs.todo.getAnpaiRicheng();
      this.$refs.todo.getRichengList();
    },
    closeTodoDetail() {
      this.show(3);
    },
    show(index, item) {
      this.checked = index;
      if (item && item.to) this.$router.push({ path: item.to });
    },
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
