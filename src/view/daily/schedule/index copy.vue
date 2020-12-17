<template>
  <i-split v-model="split" :min="0.3" :max="0.3" class="schedule-page">
    <div slot="left" class="info-left">
      <div class="left-top">
        <div class="head-title">
          <p class="headimg">
            <img src alt />
          </p>
          <span class="title">{{$store.getters.userInfo.userName}}</span>
        </div>
        <div class="head-right">
          <i-tooltip placement="top" content="安全责任，重在落实">
            <b>——— 安全责任，重在落实</b>
          </i-tooltip>
          <div class="mulu-title">
            <span
              v-for="(item,index) in submunu"
              :key="index"
              :class="{ checked: checked==index}"
              @click="show(index,item)"
            >{{item.text}}</span>
          </div>
        </div>
      </div>
      <div class="left-center">
        <!-- 日历 -->
        <calendar ref="calendar" v-model="selectDay"></calendar>
      </div>
      <div class="left-bottom">
        <todo-list ref="todo" :selectDay="selectDay" @to-detail="toTodoDetail"></todo-list>
      </div>
    </div>
    <div slot="right" class="info-right">
      <safety v-show="checked=='2'"></safety>
      <duty v-show="checked=='3'"></duty>
      <todo-detail
        v-show="checked=='todo'"
        v-model="todoItem"
        @close="closeTodoDetail"
        @update="update"
      ></todo-detail>
    </div>
  </i-split>
</template>
<script>
import safety from './safety';
import duty from './duty';
import calendar from './calendar';
import todoList from './todo-list';
import todoDetail from './todo-detail';
export default {
  name: 'schedule',
  components: {
    safety,
    duty,
    calendar,
    todoList,
    todoDetail
  },
  data() {
    return {
      split: 0.5,
      selectDay: {},
      todoItem: {},
      checked: 3,
      zhize: '岗位职责',
      submunu: [
        {
          text: '安全目标',
          to: '/daily/target'
        },
        {
          text: '法律法规',
          to: '/daily/law'
        },
        {
          text: '安全生产责任书'
        },
        {
          text: '一岗双责'
        }
      ]
    };
  },
  mounted() {},
  methods: {
    toTodoDetail(item) {
      this.todoItem = item;
      this.show('todo');
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
    }
  }
};
</script>
<style lang="scss">
@import './index.scss';
</style>

