<template>
  <el-dialog
    title="详情"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="hidVisible"
    width="70%"
  >
    <div class="learn_head">
      <span>隐患名称 : </span>
      <el-input
        size="small"
        clearable
        v-model="troubleMc"
        placeholder="请输入隐患名称"
      ></el-input>
      <span style="margin-left:0.8rem;">隐患来源 : </span>
      <el-input
        size="small"
        clearable
        v-model="troubleLy"
        placeholder="请输入隐患名称"
      ></el-input>
      <span style="margin-left:0.8rem;">隐患描述 : </span>
      <el-input
        size="small"
        clearable
        v-model="troubleYhms"
        placeholder="请输入隐患描述"
      ></el-input>
      <el-button size="small" type="primary" @click="getDateMsg(1)"
        >搜索</el-button
      >
    </div>
    <el-table :data="tableDataMsg" border height="500" v-loading="msgloading">
      <el-table-column
        prop="dengji"
        label="隐患等级"
        width="90"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="troubleBh"
        label="隐患编号"
        show-overflow-tooltip
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="troubleMc"
        label="隐患名称"
        show-overflow-tooltip
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="troubleLy"
        label="隐患来源"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="troubleYhms"
        label="隐患描述"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发现日期"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="troubleFxr"
        label="发现人"
        show-overflow-tooltip
        align="center"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="troubleXqzgsj"
        label="限期整改时间"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="jindu"
        label="整改进度"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="troubleZgwcrq"
        label="整改完成日期"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChangeMsg"
      @current-change="handleCurrentChangeMsg"
      :current-page="currentMsg"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="sizeMsg"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalMsg"
    ></el-pagination>
    <div slot="footer">
      <el-button type="primary" @click="hidVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTroubleSList } from "@/api/daily/trouble";
export default {
  data() {
    return {
      hidVisible: false,
      msgloading: false,
      totalMsg: 0, //消息总数
      currentMsg: 1, //当前页数
      sizeMsg: 20,
      troubleMc: "",
      troubleLy: "",
      troubleYhms: "",
      tableDataMsg: [],
      rows: {},
      troubleDJ: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    //地区报警处理率
    getTroubleSetList() {
      getTroubleSList({
        comId: this.rows.comId,
        pageNum: this.currentMsg,
        pageSize: this.sizeMsg,
        troubleDj: this.troubleDJ,
        troubleMc: this.troubleMc,
        troubleLy: this.troubleLy,
        troubleYhms: this.troubleYhms,
      }).then((res) => {
        this.msgloading = false;
        if (res.data.code == 200) {
          this.tableDataMsg = res.data.rows.map((el) => {
            if (el.troubleDj == 1) {
              el.dengji = "一级";
            } else if (el.troubleDj == 2) {
              el.dengji = "二级";
            } else if (el.troubleDj == 3) {
              el.dengji = "三级";
            } else {
              el.dengji = "四级";
            }
            if (el.troubleZgjd == 1) {
              el.jindu = "待整改";
            } else if (el.troubleZgjd == 2) {
              el.jindu = "整改中";
            } else if (el.troubleZgjd == 3) {
              el.jindu = "整改完成";
            } else {
              el.jindu = "整改延期";
            }
            return el;
          });
          this.totalMsg = res.data.total;
        } else {
          this.$message.error(err);
        }
      });
    },
    // 分页事件
    handleSizeChangeMsg(tal) {
      this.sizeMsg = tal;
      this.getTroubleSetList();
    },
    handleCurrentChangeMsg(tal) {
      this.currentMsg = tal;
      this.getTroubleSetList();
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
    }
    .learn_head {
      display: flex;
      span {
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-right: 5px;
      }
      .el-input,
      .el-select,
      .el-date-picker {
        width: 15.2vmin !important;
      }
      .el-button {
        margin-left: 10px;
      }
    }
    .el-pagination {
      height: 3rem;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 1rem;
    }
  }
}
</style>
