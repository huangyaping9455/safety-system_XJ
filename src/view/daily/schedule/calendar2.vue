<style lang="scss" scoped>
$root-color: #409eff;
$root-red: #f56c6c;
.calendar {
  .calendar-nav {
    margin-bottom: 15px;
    .nav-item {
      width: 25%;
      text-align: center;
      .active-nav {
        position: relative;
        color: $root-color;
        &::after {
          position: absolute;
          left: -50%;
          bottom: -8px;
          display: inline-block;
          content: " ";
          width: 200%;
          height: 2px;
          border-radius: 40px;
          background: $root-color;
        }
      }
    }
  }
  .date.new {
    height: 30vh;
    // background-color: #e0ebf8;
    background-image: linear-gradient(to top right, #4bd9e9, #049bf1);
    border-radius: 20px;
    padding: 3vh;
    box-sizing: border-box;
    display: flex;
  }
  .date-l {
    flex: 0 0 18%;
    .yearSelect {
      // border-radius: 15px;
      // overflow: hidden;
    }
    .nowDate {
      font-size: 4vh;
      margin-top: 4vh;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
    .monthchange {
      color: #fff;
      font-size: 3vh;
      margin-top: 2vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fff;
      .icon {
        cursor: pointer;
      }
    }
    .calendarDate {
      font-size: 1.8vh;
      color: #fff;
      display: flex;
      justify-content: space-between;
    }
  }
  .date-r {
    flex: 1;
    margin-left: 46px;
    .date-head {
      display: flex;
      font-size: 2vh;
      color: #fff;
      text-align: center;
      span {
        flex: 1;
      }
    }
    .date-body {
      display: flex;
      flex-wrap: wrap;
      font-size: 2vh;
      color: #fff;
      text-align: center;
      .day {
        cursor: pointer;
        flex: 0 0 14.28%;
        margin: 5px 0;
        .curDayBg {
          color: #409eff;
          background: #fff;
          border: none;
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
      }
      .oddRowBg {
        background: none;
      }
    }
  }
  @media screen and (min-width: 1276px) and (max-width: 1528px) {
    .date.new {
      height: 220px;
      border-radius: 15px;
      padding: 20px;
    }
    .date-l {
      flex: 0 0 18%;
      .nowDate {
        font-size: 40px;
        margin-top: 2vh;
      }
      .monthchange {
        font-size: 16px;
      }
      .calendarDate {
        font-size: 12px;
      }
    }
    .date-r {
      flex: 1;
      margin-left: 46px;
      .date-head {
        font-size: 14px;
      }
      .date-body {
        font-size: 14px;
        .day {
          .curDayBg {
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="calendar">
    <div class="calendar-nav">
      <dl class="flex-row">
        <dd class="nav-item" v-for="(item, index) in nav" :key="item.id">
          <span
            class="pointer color-999"
            :class="[
              {
                'active-nav': index === navIndex,
              },
            ]"
            @click="navHandle(item, index)"
            >{{ item.name }}</span
          >
        </dd>
      </dl>
    </div>
    <div class="date new">
      <div class="date-l">
        <i-select
          class="yearSelect"
          size="small"
          v-model="year"
          @on-change="getYear"
        >
          <i-option v-for="value in yearList" :value="value" :key="value">{{
            value
          }}</i-option>
        </i-select>
        <p class="nowDate">{{ this.day }}</p>
        <div class="monthchange">
          <icon
            type="ios-arrow-back"
            color="#fff"
            size="18"
            class="icon btn-back"
            @click="getPreMonth"
          />
          <span>{{ month }}月</span>
          <icon
            type="ios-arrow-forward"
            color="#fff"
            size="20"
            class="icon btn-forward"
            @click="getNexMonth"
          />
        </div>
        <p class="calendarDate">
          <span>星期{{ week }}</span>
          <span>{{ theCalendar.IMonthCn }}{{ theCalendar.IDayCn }}</span>
        </p>
      </div>
      <div class="date-r">
        <div class="date-head">
          <span v-for="item in weekNumber" :key="item">{{ item }}</span>
        </div>
        <div class="date-body">
          <div
            v-for="(item, index) in calendarCell"
            :key="index"
            :class="item.class"
          >
            <el-badge
              :hidden="selectDay !== item"
              :value="alarmNum"
              class="item"
            >
              <span
                v-if="item.num"
                :class="getNumClass(item)"
                @click="changeDay(item)"
                >{{ item.num }}</span
              >
            </el-badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSchedule } from "@/api/daily/schedule";
import { calendar } from "@/util/calendar";
import dayjs from "dayjs";
export default {
  name: "calendar",
  props: {
    alarmNum: {
      type: Number,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      deptId: this.$store.getters.deptId,
      weekNumber: ["一", "二", "三", "四", "五", "六", "日"],
      month: dayjs().month() + 1,
      year: dayjs().year(),
      day: dayjs().date(),
      theCalendar: "",
      week: "",
      startIndex: 0,
      selectDay: {},
      yearList: [],
      showYearList: false,
      calendarCell: [],
      navIndex: 0,
      nav: [
        { id: 1, name: "日", type: "day" },
        { id: 2, name: "周", type: "week" },
        { id: 3, name: "月", type: "month" },
        { id: 4, name: "季", type: "quarter" },
        { id: 5, name: "年", type: "year" },
      ],
    };
  },
  computed: {
    curMonth() {
      return dayjs()
        .year(this.year)
        .month(this.month - 1);
    },
    classWeeksNumber() {
      return this.weekNumber.filter((item, index) => index % 2 == 0);
    },
  },
  watch: {
    month() {
      this.renderCalendar();
      this.getDatesData();
      this.theCalendar = calendar.solar2lunar(this.year, this.month, this.day);
    },
    year() {
      this.renderCalendar();
      this.getDatesData();
      this.theCalendar = calendar.solar2lunar(this.year, this.month, this.day);
    },
    day() {
      this.getWeek();
      this.theCalendar = calendar.solar2lunar(this.year, this.month, this.day);
    },
    selectDay() {
      this.$emit("input", this.selectDay);
    },
  },
  created() {
    this.renderCalendar();
    this.getWeek();
    this.getDatesData();
    this.initYearList();
    this.initSelectDay();
    this.theCalendar = calendar.solar2lunar(this.year, this.month, this.day);
  },
  methods: {
    // 初始化年列表
    initYearList() {
      for (let i = 0; i < 5; i++) {
        this.yearList.push(this.year - i);
      }
    },
    // 初始化当前日期
    initSelectDay() {
      let item = this.calendarCell.find((item) => item.num == this.day);
      this.changeDay(item);
    },
    // 日期变化
    changeDay(item) {
      this.month = Number(item.date.split("-")[1]);
      this.selectDay = item;
      this.day = item.num;
    },
    // 获取当前星期几
    getWeek() {
      let week = this.curMonth.date(this.day).get("day");
      this.week = this.weekNumber[week];
    },
    // 获取单元格class
    getCellClass(item) {
      let is = this.classWeeksNumber.includes(item.week);
      if (is) item.class.push("oddRowBg");
      return item.class;
    },
    // 获取某一天的状态
    getNumClass(item) {
      let classes = [];
      if (item.date == this.selectDay.date) {
        classes.push("curDayBg");
      }
      let state = "";
      if (item.zongrenwushu > 0) {
        state = "redCircle";
      }
      // if (item.zhongyaorenwushu > 0) {
      //   state = 'blueBg';
      // }
      // if (item.jinjirenwushu > 0) {
      //   state = 'yellowBg';
      // }
      // if (item.jinjirenwushu > 0 && item.zhongyaorenwushu > 0) {
      //   state = 'redBg';
      // }
      classes.push(state);
      return classes;
    },
    // 获取上一个月的日历
    getPreMonth() {
      if (this.month - 1 < 1) {
        this.month = 12;
        this.year--;
      } else {
        this.month--;
      }
    },
    // 获取下一个月的日历
    getNexMonth() {
      if (this.month + 1 > 12) {
        this.month = 1;
        this.year++;
      } else {
        this.month++;
      }
    },
    // 获取指定年
    getYear(year) {
      this.year = year;
      this.showYearList = false;
    },
    // 控制年份列表显示
    isYearList() {
      this.showYearList = !this.showYearList;
    },
    // 获取日历数据
    getDatesData() {
      const date = this.curMonth.date(1).format("YYYY-MM-DD");
      getSchedule(date, this.deptId).then((res) => {
        res.data.data.forEach((item) => {
          let i = this.startIndex + item.num - 1;
          Object.assign(this.calendarCell[i], item);
        });
        // this.calendarCell.forEach(item => {
        //   let data = res.data.data[item.num - 1];
        //   // 赋值给对应的 date cell 对象
        //   Object.keys(data).forEach(attr => {
        //     if (!item[attr]) this.$set(item, attr, data[attr]);
        //   });
        // });
      });
    },
    // 渲染日历
    renderCalendar() {
      let dateArr = [];
      // 总天数，开始日期，
      let totalDays = this.curMonth.daysInMonth();
      let startIndex = this.curMonth.date(1).get("day") - 1;
      startIndex = startIndex < 0 ? 6 : startIndex;
      let totalNum = totalDays + startIndex;

      // 多少行
      let rowNum = Math.floor(totalNum / 7) + (totalNum % 7 === 0 ? 0 : 1);
      let weekIndex = 0;
      for (let i = 0; i < rowNum * 7; i++) {
        if (i % 7 == 0) weekIndex = 0;
        let j = i - startIndex + 1;
        let date = dayjs(new Date(this.year, this.month - 1, j)).format(
          "YYYY-MM-DD"
        );
        let num = Number(date.split("-").pop());
        let week = this.weekNumber[weekIndex];
        dateArr[i] = { num, week, date, class: ["day"] };
        if (i < startIndex || j > totalDays) {
          dateArr[i].class.push("day-ignore");
        }
        if (this.classWeeksNumber.includes(week)) {
          dateArr[i].class.push("oddRowBg");
        }
        weekIndex++;
      }
      this.startIndex = startIndex;
      this.calendarCell = dateArr;
    },
    // 日 周 年 月
    navHandle(item, index) {
      // this.calendarType = item.type;
      // this.navIndex = index;
    },
  },
};
</script>
<style lang="scss">
.date {
  height: 100%;
  .__view {
    height: 100% !important;
  }
  .head {
    height: 40px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #dedede;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ivu-icon {
      cursor: pointer;
    }
    .year {
      position: relative;
      margin-left: 15px;
      .icon-xl {
        transform: rotate(180deg);
      }
      .year-list {
        position: absolute;
        left: -15px;
        top: 20px;
        width: 56px;
        height: 0px;
        overflow: hidden;
        background-color: #e1f8fd;
        z-index: 1000;
        transition: height 0.3s;
        p {
          border-bottom: 1px solid #fff;
          cursor: pointer;
          text-align: center;
        }
      }
      .year-list-hide {
        height: 90px;
      }
      .year-num {
        margin-right: 5px;
      }
      icon {
        margin-top: -5px;
      }
    }
    .month {
      .btn-back {
        margin-right: 46px;
      }
      .btn-forward {
        margin-left: 46px;
      }
    }
    .week {
      margin-right: 15px;
    }
  }
  .body {
    height: calc(100% - 50px);
    font-size: 16px;
    padding: 0 10px;
    .date-head {
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      text-align: center;
      color: #3986fc;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background-color: #d5ebff;
      border-radius: 30px;
      span {
        display: block;
        width: 14.28%;
      }
    }
    .date-days {
      overflow-y: auto;
      height: calc(100% - 30px);
      .row {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
      }
      .day {
        width: 14.28%;
        min-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
        font-size: 16px;
        span {
          text-align: center;
          cursor: pointer;
        }
      }
      .day-ignore {
        color: #9e9e9e;
      }
    }
  }
  .redBg {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    background-color: #ff0113;
    color: #fff;
  }
  // .yellowBg {
  //   display: inline-block;
  //   width: 25px;
  //   height: 25px;
  //   line-height: 25px;
  //   border-radius: 50%;
  //   background-color: #fcaa03;
  //   color: #fff;
  // }
  // .blueBg {
  //   text-align: center;
  //   display: inline-block;
  //   width: 25px;
  //   height: 25px;
  //   line-height: 25px;
  //   border-radius: 50%;
  //   background-color: #235cf5;
  //   -webkit-box-shadow: 0px 0px 4px 3px #a5bdf8;
  //   box-shadow: 0px 0px 2px 3px #a5bdf8;
  //   color: #fff;
  // }
  .redCircle {
    position: relative;
  }
  .redCircle:after {
    content: " ";
    position: absolute;
    top: -1px;
    right: -7px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff0113;
  }
  .redFont {
    color: #ff0113;
  }
  .oddRowBg {
    background-color: #f3f9ff;
  }
  .curDayBg {
    text-align: center;
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    background-color: #2fd2f5;
    -webkit-box-shadow: 0px 0px 4px 3px #2fd2f5;
    box-shadow: 0px 0px 2px 3px #2fd2f5;
    color: #fff;
  }
}
</style>
