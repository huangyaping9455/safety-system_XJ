<template>
  <div class="app-foot">
    <!-- <span class="copyright">新ICP备19001267号</span> -->
    <span class="copyright"></span>
    <div class="user">
      <i-select
        v-model="timerTime"
        size="small"
        class="posts"
        label-in-value
        @on-change="getAlarmWeichuli"
      >
        <i-option
          v-for="(item, index) in timeList"
          :key="index"
          :value="item.time"
          >{{ item.text }}</i-option
        >
      </i-select>
      <img
        :src="isPlay ? require('./static/on.png') : require('./static/off.png')"
        style="margin: 0 6px;"
        @click="pause()"
      />
      <audio ref="audio">
        <source src="./static/media/jingbao.mp3" type="audio/ogg" />
      </audio>

      <!-- <img
        src="@/assets/icon/alarm.gif"
        style="cursor: pointer;"
        @click="showPopup = true"
      /> -->
      <span v-show="alarmList == ''">当前没有未处理的报警</span>
      <icon type="md-mail" size="20" />
      <!-- <icon type="md-person" size="20" />
      <i-select
        v-model="selected"
        size="small"
        class="posts"
        label-in-value
        @on-change="switchPost"
      >
        <i-option
          v-for="item in userPost"
          :key="item.postId"
          :value="item.postId"
          >{{ item.postName }}</i-option
        >
      </i-select>
      <icon type="ios-key" size="20" @click="touser" />
      <icon type="md-log-out" size="20" @click="logout" />-->
    </div>
    <div v-show="showPopup" class="shade" @click="showPopup = false"></div>
    <div v-show="showPopup" class="alarmPopup" ref="showpop">
      <div class="title">
        <!-- <img
            src="@/assets/icon/alarm.gif"
            style="cursor: pointer;width:18px;height:18px;margin-right:4px;"
          /> -->
        <icon
          class="icon"
          type="ios-close"
          size="60"
          @click="showPopup = false"
        />
        <img src="../../assets/guide/tixing.png" alt="" />
      </div>
      <div class="main-title">报警提醒</div>
      <div class="main">
        <!-- <span>您有：</span> -->
        <!-- <div
          v-for="(item, index) in alarmList"
          :key="index"
          @click="toAlarmDispose(item)"
        >
          <span>{{ item.alarmType }}未处理</span>
          <b>{{ item.number }}</b
          >条,
        </div> -->
        <div class="main_b" v-if="alarmList !== ''">
          <div class="main_detail" v-if="alarmList !== ''">
            <span>实时报警未处理：</span>
            <div
              v-for="(item, index) in alarmList"
              :key="index"
              class="main_text"
              @click="toAlarmDispose(item, '未处理')"
            >
              <span>{{ item.alarmType }}未处理</span>
              <b>{{ item.number }}</b
              >条,
            </div>
          </div>
          <!-- <div class="main_detail" v-if="extendedList !== ''">
            <span>即将超期报警未处理：</span>
            <div
              v-for="(item, index) in extendedList"
              :key="index"
              class="main_text"
              @click="toAlarmDispose(item, '未处理')"
            >
              <span>{{ item.alarmType }}未处理</span>
              <b>{{ item.number }}</b
              >条,
            </div>
          </div>
          <div class="main_detail" v-if="overdueList !== ''">
            <span>超期报警未处理：</span>
            <div
              v-for="(item, index) in overdueList"
              :key="index"
              class="main_text"
              @click="toAlarmDispose(item, '超期未处理')"
            >
              <span>{{ item.alarmType }}未处理</span>
              <b>{{ item.number }}</b
              >条,
            </div>
          </div> -->
        </div>
        <div class="main_t" v-if="shensuList !== ''">
          <div class="main_detail" v-if="shensuList !== ''">
            <span>申诉驳回报警未处理：</span>
            <div
              v-for="(item, index) in shensuList"
              :key="index"
              class="main_text"
              @click="toAlarmDispose(item, '申诉驳回')"
            >
              <span>{{ item.alarmType }}未处理</span>
              <b>{{ item.number }}</b
              >条,
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  getAlarmWeichuli,
  theExtendedAlarmDay,
  overdueAlarmDay,
  theshensubohuiAlarmDay,
} from "@/api/alarm";
export default {
  name: "app-foot",
  data() {
    return {
      selected: "",
      alarmList: [],
      extendedList: [],
      overdueList: [],
      shensuList: [],
      showPopup: false,
      isPlay: true,
      // timerTime: 300000,
      timerTime: 300000,
      timer: null,
      timeList: [
        { time: 180000, text: "3分钟" },
        { time: 300000, text: "5分钟" },
        { time: 600000, text: "10分钟" },
        { time: 1200000, text: "20分钟" },
        { time: 1800000, text: "30分钟" },
        { time: "不再提醒", text: "不再提醒" },
      ],
    };
  },

  computed: {
    ...mapGetters(["userPost", "postId"]),
    getYear() {
      return new Date().getFullYear();
    },
  },
  created() {
    this.selected = this.postId;
    this.timer = setInterval(this.getAlarmWeichuli, this.timerTime);
    this.getAlarmWeichuli();
  },
  mounted() {
    // this.selected = this.postId;
    // this.timer = setInterval(this.getAlarmWeichuli, this.timerTime);
    // this.getAlarmWeichuli();
    // this.$nextTick(function() {
    // if (this.shensuList[0].number) {
    //   this.$refs.showpop.style.width = "260px";
    // } else {
    //   this.$refs.showpop.style.width = "480px";
    // }
    // });
  },
  methods: {
    ...mapActions(["GetUserInfo", "LogOut"]),
    touser() {
      this.$router.push({
        path: "/user",
      });
    },
    logout() {
      this.$modal.confirm({
        title: "注销登录",
        content: "确定要注销登录吗？",
        onOk: () => {
          this.LogOut();
          this.$router.push({
            // path: `/${this.$store.state.user.style.company || 'company'}/login`
            path: "/login",
          });
        },
      });
    },
    switchPost({ value, label }) {
      this.GetUserInfo(value).then(() => {
        this.$message.success(`${label}切换成功`);
        setTimeout(() => {
          location.reload();
        }, 500);
      });
    },
    async getAlarmWeichuli() {
      clearInterval(this.timer);
      this.showPopup = false;
      if (this.timerTime == "不再提醒") {
        clearInterval(this.timer);
      } else {
        let company = this.$store.getters.deptName;
        let dept = this.$store.getters.deptId;
        await getAlarmWeichuli(dept).then((res) => {
          this.alarmList = res.data.data;
        });
        // await theExtendedAlarmDay(dept).then((res) => {
        //   this.extendedList = res.data.data;
        // });
        // await overdueAlarmDay(dept).then((res) => {
        //   this.overdueList = res.data.data;
        // });
        await theshensubohuiAlarmDay(dept).then((res) => {
          this.shensuList = res.data.data;
        });
        this.$nextTick(() => {
          this.timer = setInterval(this.getAlarmWeichuli, this.timerTime);
        });

        if (!this.shensuList || !this.alarmList) {
          this.$refs.showpop.style.width = "260px";
        } else {
          this.$refs.showpop.style.width = "480px";
        }
        if (
          this.alarmList != "" ||
          // this.extendedList != "" ||
          // this.overdueList != "" ||
          this.shensuList != ""
        ) {
          this.showPopup = true;
          if (this.isPlay && this.$refs.audio.play) {
            this.$refs.audio.play();
          }
        }

        // getAlarmWeichuli(company).then((res) => {
        //   this.$nextTick(() => {
        //     this.timer = setInterval(this.getAlarmWeichuli, this.timerTime);
        //   });
        //   this.alarmList = res.data.data;
        //   if (this.alarmList != "") {
        //     this.showPopup = true;
        //     if (this.isPlay && this.$refs.audio) {
        //       this.$refs.audio.play();
        //     }
        //   }
        // });
      }
    },
    pause() {
      this.isPlay = !this.isPlay;
      this.$refs.audio.pause();
    },
    toAlarmDispose(item, titles) {
      this.showPopup = false;
      this.$router.replace({
        path: "/daily/alarm",
        query: {
          alarmType: item.alarmType,
          alarmTime: item.times,
          alarmTitle: titles,
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

.app-foot {
  height: $app-foot-h;
  width: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 20px;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 9;
  right: 0;
  .user {
    display: flex;
    align-items: center;
    height: 100%;
    i {
      color: #026fde;
      margin: 0px 8px;
      cursor: pointer;
    }
    .posts {
      width: 180px;
    }
    .yinyue {
      width: 200px;
      height: 100%;
      border: 1px solid red;
    }
    img {
      width: 18px;
    }
  }
  .shade {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.53);
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .alarmPopup {
    position: fixed;
    top: 45vmin;
    left: 50%;
    transform: translate(-50%, -50%);
    // width: 13.5%;
    width: 480px;
    // height: 200px;
    height: auto;
    background: #fff;
    // border-radius: 25px;
    border-radius: 45px;
    z-index: 99999;
    .title {
      position: relative;
      .icon {
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        cursor: pointer;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .main-title {
      // position: absolute;
      // top: 0;
      // left: 30%;
      color: black;
      font-size: 16px;
      font-weight: 600;
      cursor: default;
      display: flex;
      justify-content: center;
    }
    .main {
      padding: 10px;
      width: 100%;
      // padding-top: 2rem;
      // height: calc(100% - 40px);
      // padding-bottom: 20px;
      max-height: 400px;
      overflow: auto;
      position: relative;
      display: flex;
      justify-content: space-between;
      .main_b,
      .main_t {
        span:first-of-type {
          font-size: 16px;
        }
        .main_detail {
          .main_text {
            padding-left: 20px;
            line-height: 30px;
            cursor: pointer;
            span {
              font-size: 14px;
            }
            b {
              font-size: 18px;
              font-weight: 600;
              color: #2d8cf0;
            }
          }
        }
      }
      // div {
      //   padding-left: 20px;
      //   line-height: 30px;
      //   cursor: pointer;
      //   font-size: 1.4vh;
      //   b {
      //     font-size: 18px;
      //     font-weight: 600;
      //     color: red;
      //     text-decoration: underline;
      //     padding: 0 3px;
      //   }
      // }
    }
  }
}
</style>
