<style lang="scss" scoped>
.userOption {
  display: flex;
  align-items: center;
  .userName {
    color: #4d4d4d;
    font-size: 16px;
    margin-left: 20px;
  }
  .userImg {
    margin-left: 20px;
    height: 45px;
    width: auto;
    border-radius: 50%;
    border: 1px solid gainsboro;
    cursor: pointer;
  }
  .posts {
    width: 180px;
    margin-left: 150px;
    background-color: #e9f3fc;
  }
  .dropdownItem {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
}
.securityCheck {
  .securityCheck-head {
    color: #333333;
    text-align: center;
    font-weight: bold;
    position: relative;
  }
  .time {
    position: absolute;
    right: 0px;
    font-size: 20px;
    color: #35a5fb;
  }
}
@media screen and (min-width: 1276px) and (max-width: 1528px) {
  .userOption {
    .posts {
      margin-left: 40px;
    }
  }
}
</style>

<template>
  <div class="app-head">
    <!-- <div class="logo">
      <img v-if="pageImg" :src="pageImg" alt />
      <img v-else src="@/assets/index/logo1.png" alt />
      下面的没有用
      <span v-else>{{$store.getters.deptName}}</span>
    </div> -->
    <!-- 菜单 -->
    <div class="menu">
      <!-- <div
        v-for="(item, index) in menu"
        :key="index"
        :class="['menu-item', { active: active.id === item.id }]"
        @click="menuClick(item, index)"
      >
        <span>{{ item.name }}</span>
        <div class="border"></div>
      </div> -->
      <div v-if="currentMenu.name != '首页'" class="menu-item">
        <span>{{ menuTopHead }}</span>
        <div class="border"></div>
      </div>
      <div class="menu-item active">
        <span>{{ currentMenu.name }}</span>
        <div class="border"></div>
      </div>
    </div>
    <div class="userOption">
      <i-select
        v-model="selected"
        class="posts"
        label-in-value
        @on-change="switchPost"
      >
        <i-option
          v-for="(item, index) in userPost"
          :key="index"
          :value="item.postId"
          >{{ item.postName }}</i-option
        >
      </i-select>
      <span class="userName">{{ $store.getters.userInfo.userName }}</span>

      <i-dropdown placement="bottom-end" trigger="click">
        <img class="userImg" src="@/assets/index/user.png" />
        <i-dropdown-menu slot="list">
          <i-dropdown-item>
            <div class="dropdownItem" @click="touser">
              <icon type="ios-key" size="20" />
              <span>修改密码</span>
            </div>
          </i-dropdown-item>
          <i-dropdown-item>
            <div class="dropdownItem" @click="logout">
              <icon type="md-log-out" size="20" />
              <span>退出系统</span>
            </div>
          </i-dropdown-item>
        </i-dropdown-menu>
      </i-dropdown>
    </div>
    <i-modal
      class="securityCheck"
      v-model="topModal"
      :mask-closable="false"
      :closable="false"
      width="31"
    >
      <p slot="header" class="securityCheck-head">
        <span>安全查岗</span>
        <span class="time">{{ countDown }}S</span>
      </p>
      <div>
        <i-form
          ref="formCustom"
          :model="formItem"
          :rules="ruleSecurityCheck"
          :label-width="100"
        >
          <i-formitem label="发起单位：">
            <span>{{ modalData.fasongdanwei }}</span>
          </i-formitem>
          <i-formitem label="发起时间：">
            <span>{{ modalData.faqishijian }}</span>
          </i-formitem>
          <i-formitem label="回复有效期：">
            <span>{{ modalData.huifuyouxiaoqi }}</span>
          </i-formitem>
          <i-formitem label="主题正文：">
            <span>{{ modalData.zhutizhengwen }}</span>
          </i-formitem>
          <i-formitem label="回复正文：" prop="textarea">
            <i-input
              v-model="formItem.textarea"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="Enter something..."
            ></i-input>
          </i-formitem>
          <i-formitem label="回 复 者：">
            <span>{{ $store.getters.userInfo.userName }}</span>
          </i-formitem>
        </i-form>
      </div>
      <div slot="footer">
        <i-button type="primary" :loading="loading" @click="setInsert"
          >确认回复</i-button
        >
      </div>
    </i-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { QYZFHT, insert } from "@/api/system";
export default {
  name: "app-head",
  data() {
    return {
      loading: false,
      selected: "",
      topModal: false,
      formItem: {
        textarea: "",
      },
      timer: null,
      countDown: 0,
      modalData: {},
      ruleSecurityCheck: {
        textarea: [
          { required: true, message: "回复正文不能为空", trigger: "blur" },
        ],
      },
      menuitem: "",
      menuTopHead: "",
    };
  },
  computed: {
    ...mapGetters(["userPost", "postId", "menu", "currentMenu"]),
    pageImg() {
      return this.$store.getters.userInfo.logoPhoto;
    },
    active() {
      return this.menu;
    },
  },
  watch: {
    active: {
      immediate: true,
      handler: function(newV) {
        this.$store.commit("SET_TOPHEAD_MENU", newV);
      },
    },
  },
  updated() {
    for (let i in this.menu) {
      for (let j in this.menu[i].children) {
        if (this.menu[i].children[j].name == this.currentMenu.name) {
          this.menuTopHead = this.menu[i].name;
        }
      }
    }
  },
  mounted() {
    this.selected = this.postId;
    this.$store.dispatch("GetMenu");
    const timer1 = setInterval(() => {
      this.getQYZFHT();
    }, 30000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer1);
    });
    this.getQYZFHT();
    if (window.location.hash == "#/daily/shou") {
      this.currentMenu.name = "首页";
    }
  },
  methods: {
    // 根据企业ID获取通知详情
    getQYZFHT() {
      QYZFHT(this.$store.getters.deptId).then(({ data }) => {
        if (Object.keys(data.data) <= 0) return false;
        this.topModal = true;
        this.modalData = data.data;
        let countDown = data.data.huifuyouxiaoqi.slice(0, -2);
        let timeInterval = new Date() - new Date(data.data.faqishijian);
        timeInterval = Math.floor(timeInterval / 1000);
        countDown = Number(countDown) * 60 - timeInterval;
        this.timer = setInterval(() => {
          this.countDown = countDown;
          countDown--;
          if (countDown < 0) {
            clearInterval(this.timer);
            this.timer = null;
            this.topModal = false;
          }
        }, 1000);
      });
    },
    setInsert() {
      this.$refs.formCustom.validate((valid) => {
        if (valid) {
          this.loading = true;
          insert({
            suoshudanweiid: this.$store.getters.deptId,
            zhutiid: this.modalData.id,
            huifuzheid: this.$store.getters.userInfo.userId,
            zhengwen: this.formItem.textarea,
          }).then(() => {
            this.loading = false;
            this.topModal = false;
          });
        }
      });
    },
    menuClick(item) {
      this.$router.push({
        path: item.path,
      });
    },
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
    ...mapActions(["GetUserInfo", "LogOut"]),
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

.app-head {
  height: $app-head-h;
  padding: 0px 20px;
  // background: #2877fe;
  border-bottom: 1px solid rgb(243, 237, 237);
  display: flex;
  justify-content: space-between;
  /* background: url('~A/index/header-bg.png') no-repeat; */
  // background-image: linear-gradient(90deg, #34a1ff 0%, #44c9d7 100%);
  // .logo {
  //   display: flex;
  //   align-items: center;
  //   font-size: 22px;
  //   color: black;
  //   letter-spacing: 2px;
  //   img {
  //     height: 70%;
  //   }
  // }

  .active {
    color: #35a5fb;

    .border {
      position: absolute;
      left: 0%;
      bottom: 0px;
      width: 100%;
      height: 5px;
      background: #35a5fb;
      border-radius: 3px;
    }
  }

  .menu {
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    // color: white;
    background: none;

    .menu-item {
      height: inherit;
      line-height: $app-head-h;
      margin: 0px 1%;
      padding: 0px 10px;
      font-size: 18px;
      // cursor: pointer;
      position: relative;
      letter-spacing: 1px;
      white-space: nowrap;
      // &:hover {
      //   @extend .active;
      //   color: #35a5fb;
      // }
    }
  }
}
.securityCheck {
  .ivu-modal-content {
    border-radius: 15px;
  }
  .ivu-form-item {
    margin-bottom: 0px;
  }
  .ivu-form-item-error-tip {
    right: 0;
    left: auto;
  }
}
</style>
