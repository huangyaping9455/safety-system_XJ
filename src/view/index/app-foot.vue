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
    <div v-show="showPopup" class="alarmPopup">
      <div class="title">
        <!-- <img
            src="@/assets/icon/alarm.gif"
            style="cursor: pointer;width:18px;height:18px;margin-right:4px;"
          /> -->
        <icon
          class="icon"
          type="ios-close"
          size="40"
          @click="showPopup = false"
        />
        <img src="../../assets/guide/tixing.png" alt="" />
      </div>
      <div class="main">
        <div class="main-title">报警提醒</div>
        <!-- <span>您有：</span> -->
        <div
          v-for="(item, index) in alarmList"
          :key="index"
          @click="toAlarmDispose(item)"
        >
          <span>{{ item.alarmType }}未处理</span>
          <b>{{ item.number }}</b
          >条,
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getAlarmWeichuli } from "@/api/alarm";
export default {
  name: "app-foot",
  data() {
    return {
      selected: "",
      alarmList: [],
      showPopup: false,
      isPlay: true,
      // timerTime: 300000,
      timerTime: 300000,
      timer: null,
      timeList: [
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
  mounted() {
    this.selected = this.postId;
    this.timer = setInterval(this.getAlarmWeichuli, this.timerTime);
    this.getAlarmWeichuli();
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
    getAlarmWeichuli() {
      clearInterval(this.timer);
      this.showPopup = false;
      if (this.timerTime == "不再提醒") {
        clearInterval(this.timer);
      } else {
        let company = this.$store.getters.deptName;
        getAlarmWeichuli(company).then((res) => {
          this.$nextTick(() => {
            this.timer = setInterval(this.getAlarmWeichuli, this.timerTime);
          });
          this.alarmList = res.data.data;
          if (this.alarmList != "") {
            this.showPopup = true;
            if (this.isPlay && this.$refs.audio) {
              this.$refs.audio.play();
            }
          }
        });
      }
    },
    pause() {
      this.isPlay = !this.isPlay;
      this.$refs.audio.pause();
    },
    toAlarmDispose(item) {
      this.showPopup = false;
      this.$router.replace({
        path: "/daily/alarm",
        query: { alarmType: item.alarmType },
      });
    },
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

.app-foot {
  height: $app-foot-h;
  background: #eee;
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 20px;
  justify-content: space-between;

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
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 13.5%;
    // height: 200px;
    height: auto;
    background: #fff;
    border-radius: 25px;
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
    .main {
      padding: 10px;
      width: 100%;
      padding-top: 3rem;
      // height: calc(100% - 40px);
      // padding-bottom: 20px;
      position: relative;
      .main-title {
        position: absolute;
        top: 0;
        left: 30%;
        color: black;
        font-size: 16px;
        font-weight: 600;
        cursor: default;
      }
      div {
        padding-left: 20px;
        line-height: 30px;
        cursor: pointer;
        b {
          font-size: 18px;
          font-weight: 600;
          color: red;
          text-decoration: underline;
          padding: 0 3px;
        }
      }
    }
  }
}
</style>
