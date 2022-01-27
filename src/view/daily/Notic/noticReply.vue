<template>
  <i-modal class="securityCheck" v-model="topModal" title="回复" width="31">
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
      <i-formitem label="整改时间：">
        <span>{{ modalData.zhenggaishijian }}</span>
      </i-formitem>
      <i-formitem label="回复有效期：">
        <span>{{ modalData.huifuyouxiaoqi }}</span>
      </i-formitem>
      <i-formitem label="主题正文：">
        <span>{{ modalData.zhutizhengwen }}</span>
      </i-formitem>
      <i-formitem label="回 复 者：">
        <span>{{ $store.getters.userInfo.userName }}</span>
      </i-formitem>
      <i-formitem label="回复正文：" prop="textarea">
        <i-input
          v-model="formItem.textarea"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="Enter something..."
        ></i-input>
      </i-formitem>
    </i-form>
    <div slot="footer">
      <i-button type="primary" :loading="loading" @click="setInsert"
        >确认回复</i-button
      >
    </div>
  </i-modal>
</template>

<script>
import { getOne } from "@/api/daily/notice";
import { insert } from "@/api/system";
import dayjs from "dayjs";
export default {
  data() {
    return {
      topModal: false,
      formItem: {
        textarea: "",
      },
      ruleSecurityCheck: {
        textarea: [
          { required: true, message: "回复正文不能为空", trigger: "blur" },
        ],
      },
      modalData: {},
      loading: false,
    };
  },
  methods: {
    //   获取详情
    getOneTongZhi(ids) {
      getOne({ id: ids }).then((res) => {
        this.modalData = res.data.data;
      });
    },
    // 提交
    setInsert() {
      this.$refs.formCustom.validate((valid) => {
        if (valid) {
          this.loading = true;
          insert({
            suoshudanweiid: this.$store.getters.deptId,
            zhutiid: this.modalData.id,
            huifuzheid: this.$store.getters.userInfo.userId,
            zhengwen: this.formItem.textarea,
            type: this.modalData.type,
            huifushijian: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          }).then(() => {
            this.loading = false;
            this.topModal = false;
            this.$parent.noticeList();
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
