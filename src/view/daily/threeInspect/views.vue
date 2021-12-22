<template>
  <el-dialog
    title="详情"
    class="learns"
    center
    top="5vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="hidVisible"
    width="70%"
  >
    <div class="learn_head">
      <span>{{ CheckIdMsg.vehNo }}</span>
    </div>
    <el-tabs type="border-card" v-model="editableTabsValue">
      <el-tab-pane
        :label="item.ruleName"
        v-for="(item, index) in tableList"
        :key="index"
      >
        <el-table
          :data="item.childrens"
          style="width: 100%;"
          row-key="ruleId"
          border
          height="350"
          default-expand-all
          :tree-props="{ children: 'childrens', hasChildren: 'hasChildrens' }"
        >
          <el-table-column prop="ruleName" label="规则名称" align="center">
          </el-table-column>
          <el-table-column prop="zhuangtai" label="是否正常" align="center">
          </el-table-column>
          <el-table-column prop="checkJcjg" label="检查结果" align="center">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-descriptions
      class="margin-top"
      title="出车前安全检查照片"
      :column="4"
      v-show="editableTabsValue == '0'"
    >
      <el-descriptions-item label="里程照片">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkCcqlcShow"
          fit="cover"
          :preview-src-list="srcList1"
        >
          <div slot="error" class="el-image__error">
            暂无照片
          </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="车头照片">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkCcqctShow"
          fit="cover"
          :preview-src-list="srcList2"
          ><div slot="error" class="el-image__error">
            暂无照片
          </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="整改照片">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkCcqzgzpShow"
          fit="cover"
          :preview-src-list="srcList3"
        >
          <div slot="error" class="el-image__error">
            暂无照片
          </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="签名">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkJsyqz"
          fit="cover"
          :preview-src-list="[CheckIdMsg.checkJsyqz]"
          ><div slot="error" class="el-image__error">
            暂无签名
          </div>
        </el-image>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="出车后安全检查照片"
      :column="4"
      v-show="editableTabsValue == '2'"
    >
      <el-descriptions-item label="里程照片">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkSchlcShow"
          fit="cover"
          :preview-src-list="srcList4"
          ><div slot="error" class="el-image__error">
            暂无照片
          </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="车头照片">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkSchctShow"
          fit="cover"
          :preview-src-list="srcList5"
          ><div slot="error" class="el-image__error">
            暂无照片
          </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="整改照片">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkSchzgzpShow"
          fit="cover"
          :preview-src-list="srcList6"
          ><div slot="error" class="el-image__error">
            暂无照片
          </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="签名">
        <el-image
          style="width: 100px; height: 100px"
          :src="CheckIdMsg.checkJsyqz"
          fit="cover"
          :preview-src-list="[CheckIdMsg.checkJsyqz]"
          ><div slot="error" class="el-image__error">
            暂无签名
          </div>
        </el-image>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="出车前检查结果"
      :column="2"
      v-show="editableTabsValue == '0'"
    >
      <el-descriptions-item label="判定结论">
        {{ CheckIdMsg.checkCcqpd }}
      </el-descriptions-item>
      <el-descriptions-item label="是否整改">
        {{ CheckIdMsg.ccqIsZhangGai }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="收车后检查结果"
      :column="2"
      v-show="editableTabsValue == '2'"
    >
      <el-descriptions-item label="判定结论">
        {{ CheckIdMsg.checkSchpd }}
      </el-descriptions-item>
      <el-descriptions-item label="是否整改">
        {{ CheckIdMsg.schIsZhengGai }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="检查情况" :column="3">
      <el-descriptions-item label="检查人员">
        {{ CheckIdMsg.checkJcry }}
      </el-descriptions-item>
      <el-descriptions-item label="检查结果">
        {{ CheckIdMsg.checkJcjg }}
      </el-descriptions-item>
      <el-descriptions-item label="检查日期">
        {{ CheckIdMsg.checkJcrq }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="复检情况"
      :column="3"
      v-if="
        typee == '编辑' ||
          (CheckIdMsg.status != '2' &&
            CheckIdMsg.status != '1' &&
            CheckIdMsg.status != '3')
      "
    >
      <el-descriptions-item label="复检人员" v-if="typee !== '编辑'">
        {{ CheckIdMsg.checkFjry }}
      </el-descriptions-item>
      <el-descriptions-item label="复检结果">
        <el-input
          v-model="CheckIdMsg.checkFjjg"
          placeholder="请输入复检结果"
          style="margin-top: -10px;"
        ></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="复检日期">
        <!-- <el-input v-model="CheckIdMsg.checkFjrq"></el-input> -->
        <i-date
          format="yyyy-MM-dd"
          type="date"
          size="large"
          placement="bottom-end"
          v-model="CheckIdMsg.checkFjrq"
          placeholder="请输入复检日期"
          style="margin-top: -10px;"
        ></i-date>
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer">
      <el-button type="primary" @click="hidVisible = false">
        取 消
      </el-button>
      <el-button v-if="typee == '编辑'" type="primary" @click="TrueFujian">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";
import {
  listByCheckId,
  listByCheckIdMsg,
  thirdtroubleUpdate,
} from "@/api/daily/trouble";
export default {
  props: {
    typee: {
      type: String,
    },
  },
  data() {
    return {
      hidVisible: false,
      editableTabsValue: "0",
      tableList: [],
      CheckIdMsg: {},
      srcList1: [],
      srcList2: [],
      srcList3: [],
      srcList4: [],
      srcList5: [],
      srcList6: [],
    };
  },
  methods: {
    // 获取检查项
    getlistByCheck(checkId, status) {
      let data = {
        checkId: checkId == "" ? 0 : checkId,
        checkStep: status == "" ? 0 : status,
      };
      listByCheckId(data).then((res) => {
        if (res.data.code == 200) {
          this.tableList = res.data.data.map((el) => {
            el.childrens.map((val) => {
              if (val.checkSfhg == 1) {
                val.zhuangtai = "正常";
              } else {
                val.zhuangtai = "不正常";
              }
              val.childrens.map((k) => {
                if (k.checkSfhg == 1) {
                  k.zhuangtai = "正常";
                } else {
                  k.zhuangtai = "不正常";
                }
              });
            });
            return el;
          });
        }
      });
    },
    listByCheckIdMsg(id) {
      listByCheckIdMsg(id).then((res) => {
        if (res.data.code == 200) {
          this.CheckIdMsg = res.data.data;
          if (this.CheckIdMsg.checkCcqlc) {
            this.CheckIdMsg.checkCcqlcShow =
              "/prod-api" + this.CheckIdMsg.checkCcqlc;
            this.srcList1 = [this.CheckIdMsg.checkCcqlcShow];
          }
          if (this.CheckIdMsg.checkCcqct) {
            this.CheckIdMsg.checkCcqctShow =
              "/prod-api" + this.CheckIdMsg.checkCcqct;
            this.srcList2 = [this.CheckIdMsg.checkCcqctShow];
          }
          if (this.CheckIdMsg.checkCcqzgzp) {
            this.CheckIdMsg.checkCcqzgzpShow =
              "/prod-api" + this.CheckIdMsg.checkCcqzgzp;
            this.srcList3 = [this.CheckIdMsg.checkCcqzgzpShow];
          }
          if (this.CheckIdMsg.checkSchlc) {
            this.CheckIdMsg.checkSchlcShow =
              "/prod-api" + this.CheckIdMsg.checkSchlc;
            this.srcList4 = [this.CheckIdMsg.checkSchlcShow];
          }
          if (this.CheckIdMsg.checkSchct) {
            this.CheckIdMsg.checkSchctShow =
              "/prod-api" + this.CheckIdMsg.checkSchct;
            this.srcList5 = [this.CheckIdMsg.checkSchctShow];
          }
          if (this.CheckIdMsg.checkSchzgzp) {
            this.CheckIdMsg.checkSchzgzpShow =
              "/prod-api" + this.CheckIdMsg.checkSchzgzp;
            this.srcList6 = [this.CheckIdMsg.checkSchzgzpShow];
          }

          if (this.CheckIdMsg.checkCcqsfzg == "1") {
            this.CheckIdMsg.ccqIsZhangGai = "是";
          } else if (this.CheckIdMsg.checkCcqsfzg == "2") {
            this.CheckIdMsg.ccqIsZhangGai = "否";
          }
          if (this.CheckIdMsg.checkSchsfzg == "1") {
            this.CheckIdMsg.schIsZhengGai = "是";
          } else if (this.CheckIdMsg.checkSchsfzg == "2") {
            this.CheckIdMsg.schIsZhengGai = "否";
          }
        }
      });
    },
    // 复检 确定
    TrueFujian() {
      this.CheckIdMsg.checkFjrq = dayjs(this.CheckIdMsg.checkFjrq).format(
        "YYYY-MM-DD"
      );
      this.CheckIdMsg.checkFjry = this.$store.getters.userInfo.userName;
      thirdtroubleUpdate(this.CheckIdMsg).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.hidVisible = false;
        } else {
          this.$message.success(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.learns {
  .el-dialog {
    .el-dialog__title {
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 10px 20px;
      max-height: 720px;
      overflow: auto;
    }
    .learn_head {
      display: flex;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 3px;
    }
    .el-tabs {
      margin-bottom: 10px;
      .el-table {
        margin-top: 10px;
        th {
          background-color: #ecf8ff;
          color: #01a0ff;
        }
      }
    }
  }
}
</style>
