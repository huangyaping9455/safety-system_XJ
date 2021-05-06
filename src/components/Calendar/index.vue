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

    <div class="content flex-row xy-between">
      <div class="content-left flex-column xy-between flex">
        <el-select v-model="curYear" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          v-show="calendarType === 'week'"
          v-model="curWeek"
          placeholder="请选择"
        >
          <el-option
            v-for="item in weekOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <div class="footer">
          <div class="show-time flex-row xy-between al-center">
            <i
              class="el-icon-arrow-left pointer font-bold"
              style="line-height: 3vh;"
              @click="back"
            ></i>
            <span
              v-show="calendarType !== 'year'"
              class="font-size24 footer-text"
              >{{ curMonth }}月</span
            >
            <span v-show="calendarType === 'year'" class="footer-text"
              >合计：9900</span
            >
            <i
              class="el-icon-arrow-right pointer font-bold"
              style="line-height: 3vh;"
              @click="next"
            ></i>
          </div>

          <p
            v-show="calendarType === 'year'"
            class="small font-size12 color-999"
          >
            已完成：9000
          </p>
          <p
            v-show="calendarType === 'year'"
            class="small font-size12 color-999"
          >
            未完成：900
          </p>
        </div>
      </div>

      <div class="content-right">
        <div v-show="calendarType === 'day'" class="calendar-day">
          <div class="flex-row flex-wrap">
            <span
              v-for="item in title"
              :key="item"
              class="calendar-title day-item font-bold"
              >{{ item }}</span
            >
          </div>
          <div class="flex-row flex-wrap">
            <div
              v-for="item in countNum"
              :key="item.id"
              class="day-item day-item2X"
            >
              <el-popover
                v-show="item.val > spaceNum"
                lacement="bottom"
                trigger="click"
                content="11"
              >
                <span
                  slot="reference"
                  class="pointer day"
                  :class="[
                    {
                      'active-item': item.val - spaceNum === activeDay,
                    },
                  ]"
                  @click="dayHandle(item.val - spaceNum)"
                  >{{ item.val - spaceNum }}</span
                >
              </el-popover>
            </div>
          </div>
        </div>
        <div v-show="calendarType === 'week'" class="temp-img">
          <img src="../../../test.png" alt="" />
        </div>
        <div
          v-show="calendarType === 'month'"
          class="calendar-month flex-wrap flex xy-between"
        >
          <span
            class="month-item bg-fff pointer"
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
            :key="item"
            :class="[
              {
                'active-item': item === curMonth,
              },
            ]"
            @click="otherClick(item, 'month')"
            >{{ item }}</span
          >
        </div>
        <div
          v-show="calendarType === 'quarter'"
          class="calendar-month flex-wrap flex xy-between"
        >
          <span
            class="month-item bg-fff pointer font-size12"
            v-for="(item, index) in quarterList"
            :key="item.name"
            :class="[
              {
                'active-item': index === quarterIndex,
              },
            ]"
            @click="otherClick(item, 'quarter', index)"
            >{{ item.name }}</span
          >
        </div>
        <div v-show="calendarType === 'year'" class="temp-img">
          <img src="../../../test.png" alt="" />
        </div>

        <div
          v-show="calendarType !== 'day'"
          class="back-today bg-fff flex xy-around al-center pointer"
          @click="backToDay"
        >
          <i class="el-icon-arrow-left pointer font-bold"></i>
          <span>今天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const CurYear = new Date().getFullYear();
const CurMonth = new Date().getMonth() + 1;
const CurDay = new Date().getDate();

export default {
  name: "calendar",
  props: {
    calendarAllType: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      navIndex: 0,
      activeDay: CurDay,
      calendarType: "day",
      curWeek: "",
      options: [
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2021",
          label: "2021",
        },
      ],
      nav: [
        { id: 1, name: "日", type: "day" },
        { id: 2, name: "周", type: "week" },
        { id: 3, name: "月", type: "month" },
        { id: 4, name: "季", type: "quarter" },
        { id: 5, name: "年", type: "year" },
      ],
      quarterIndex: 0,
      quarterList: [
        { name: "第一季度", type: 1 },
        { name: "第二季度", type: 2 },
        { name: "第三季度", type: 3 },
        { name: "第四季度", type: 4 },
      ],
      title: ["一", "二", "三", "四", "五", "六", "日"],
      monthDay: [],
      curMonth: CurMonth,
      curYear: CurYear,
    };
  },

  computed: {
    isLeapYear() {
      const year = this.curYear;
      if (year % 4 === 0 && year % 100 !== 0) {
        return true;
      } else {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    dayNum() {
      const day_31 = [1, 3, 5, 7, 8, 10, 12];
      const day_30 = [4, 6, 9, 11];
      const twoMonthDay = this.isLeapYear ? 29 : 28;
      const curMonth = this.curMonth;
      let num = twoMonthDay;
      if (day_31.includes(curMonth)) {
        num = 31;
      } else if (day_30.includes(curMonth)) {
        num = 30;
      }
      return num;
    },
    spaceNum() {
      let date = new Date(this.curYear + "-" + this.curMonth);
      date.setDate(1);
      let getDay = date.getDay();
      return getDay > 0 ? getDay - 1 : getDay + 6;
    },
    countNum() {
      const count = this.dayNum + this.spaceNum;
      let arr = [];
      for (let i = 1; i <= count; i++) {
        arr.push({
          id: i + 1,
          val: i,
        });
      }
      return arr;
    },
    weekOptions() {
      let arr = [];
      for (let i = 1; i <= 53; i++) {
        arr.push({
          label: `第${i}周`,
          value: i + "",
        });
      }
      return arr;
    },
  },
  watch: {
    curMonth(newData) {
      if (+newData !== CurMonth) {
        console.log("-----");
        this.activeDay = null;
      } else if (this.curYear === CurYear) {
        this.activeDay = new Date().getDate();
      }
    },
    curYear(newData) {
      if (+newData !== CurYear) {
        this.activeDay = null;
      } else if (this.curMonth === CurMonth) {
        this.activeDay = new Date().getDate();
      }
    },
  },
  mounted() {
    if (this.calendarAllType.length) {
      this.nav = this.nav.filter((item) =>
        this.calendarAllType.includes(item.name)
      );
    }
  },
  methods: {
    backToDay() {
      this.curYear = new Date().getFullYear();
      this.curMonth = new Date().getMonth() + 1;
      this.activeDay = new Date().getDate();
      this.calendarType = "day";
      this.navIndex = 0;
    },
    dayHandle(val) {
      this.activeDay = val;
    },
    navHandle(item, index) {
      this.calendarType = item.type;
      this.navIndex = index;
    },
    otherClick(item, type, index) {
      if (type !== "month") {
        this.quarterIndex = index;
        console.log("----季度", item);
      } else {
        this.curMonth = item;
      }
    },
    next() {
      if (this.calendarType === "day" || this.calendarType === "month") {
        this.curMonth++;
        if (this.curMonth > 12) {
          this.curYear++;
          this.curMonth = 1;
        }
      }
    },
    back() {
      if (this.calendarType === "day" || this.calendarType === "month") {
        this.curMonth--;
        if (this.curMonth < 1) {
          this.curYear--;
          this.curMonth = 12;
        }
      }
    },
    getMonthDay() {},
  },
};
</script>
<style>
.calendar .el-select-dropdown .el-popper .popper__arrow::after {
  border-top-color: #fff !important;
  border-bottom-color: #fff !important;
}
.el-popover {
  padding: 5px 10px;
  color: #f56c6c;
  min-width: 10px !important;
}
.calendar .el-input__inner {
  width: 120px;
  padding: 0 0 0 20px;
  height: 25px;
  font-size: 12px;
  border-radius: 30px;
}
.calendar .el-select__caret {
  line-height: 25px;
}
.calendar .el-select-dropdown__item {
  padding: 0 !important;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 12px !important;
}
</style>

<style lang="scss">
@import "../../assets/css/common.css";
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
  .content {
    background: #f2f8ff;
    margin: 0 15px;
    padding: 15px;
    border-radius: 10px;
    box-sizing: border-box;
    .content-left {
      width: 22%;
      .footer {
        height: 6vh;
        padding-bottom: 15px;
        .footer-text {
          height: 3vh;
          line-height: 3vh;
        }
        .show-time {
          display: flex;
          // margin-bottom: 2px;
          color: $root-color;
          border-bottom: 1px solid $root-color;
        }
      }
    }
    .content-right {
      width: 56vw;
      height: 20vh;
      margin-left: 2vh;
      box-sizing: border-box;
      position: relative;
      .temp-img {
        width: 15vw;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
      .active-item {
        color: #fff !important;
        background: $root-color;
      }
      .calendar-day {
        .calendar-title {
          width: 56vw;
        }

        .day-item {
          display: inline-block;
          width: 4vw;
          height: 3vh;
          text-align: center;
          line-height: 3vh;
          margin-right: 13px;
          margin-bottom: 5px;
          .day {
            display: inline-block;
            width: 1.5vw;
            height: 1.5vw;
            line-height: 1.5vw;
            border-radius: 50%;
            color: $root-color;
            &:focus {
              outline: none;
            }
          }
        }
        .day-item2X {
          width: 4vw;
        }
      }
      .calendar-month {
        padding: 0 20px;
        .month-item {
          width: 5vw;
          text-align: center;
          border-radius: 20px;
          padding: 3px;
          color: $root-color;
          margin: 0 10px 20px 0;
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
      }

      .back-today {
        position: absolute;
        right: 0;
        width: 80px;
        text-align: center;
        padding: 3px 10px;
        border-radius: 20px;
        bottom: 10px;
        color: $root-color;
      }
    }
  }
}
</style>
