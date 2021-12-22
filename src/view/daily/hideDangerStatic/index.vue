<template>
  <div class="hidedanger">
    <div class="hide-top">
      <div class="car-item">
        <img src="~@/assets/daily/cao.png" alt="" />
        <span>1级隐患未完成整改</span>
        <span>{{ listCount.num1 }}</span>
      </div>
      <div class="car-item">
        <img src="~@/assets/daily/cao.png" alt="" />
        <span>2级隐患未完成整改</span>
        <span>{{ listCount.num2 }}</span>
      </div>
      <div class="car-item">
        <img src="~@/assets/daily/cao.png" alt="" />
        <span>3级隐患未完成整改</span>
        <span>{{ listCount.num3 }}</span>
      </div>
      <div class="car-item">
        <img src="~@/assets/daily/cao.png" alt="" />
        <span>4级隐患未完成整改</span>
        <span>{{ listCount.num4 }}</span>
      </div>
      <div class="car-item">
        <img src="~@/assets/daily/cao.png" alt="" />
        <span>风险因子</span>
        <span>{{ listCount.num5 }}</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      v-loading="msgloading"
      :height="tableListH"
    >
      <el-table-column
        prop="deptName"
        label="公司名称"
        width="210"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column label="一级隐患数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span v-if="row.num1 > 0" class="spancolor" @click="hidView(row, 1)">
            {{ row.num1 }}
          </span>
          <span v-else>{{ row.num1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级隐患数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span v-if="row.num2 > 0" class="spancolor" @click="hidView(row, 2)">
            {{ row.num2 }}
          </span>
          <span v-else>{{ row.num2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="三级隐患数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span v-if="row.num3 > 0" class="spancolor" @click="hidView(row, 3)">
            {{ row.num3 }}
          </span>
          <span v-else>{{ row.num3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="四级隐患数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span v-if="row.num4 > 0" class="spancolor" @click="hidView(row, 4)">
            {{ row.num4 }}
          </span>
          <span v-else>{{ row.num4 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总隐患数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span
            v-if="row.totlenums > 0"
            class="spancolor"
            @click="hidView(row, '')"
          >
            {{ row.totlenums }}
          </span>
          <span v-else>{{ row.totlenums }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="dorate"
        label="整改率"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="num5"
        label="风险因子"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <hideview ref="hidev"></hideview>
  </div>
</template>

<script>
import {
  getTroubleStatisticsList,
  getTroublelistCount,
} from "@/api/daily/trouble";
import hideview from "./view";
export default {
  components: {
    hideview,
  },
  data() {
    return {
      msgloading: false,
      total: 0, //消息总数
      current: 1, //当前页数
      size: 20,
      tableListH: "calc(100vh - 23.5828rem)",
      tableData: [],
      listCount: [],
    };
  },
  created() {
    this.getTroublelistCount();
    this.getTroubleStatisticsList();
  },
  watch: {},
  methods: {
    //地区报警处理率
    getTroubleStatisticsList() {
      this.msgloading = true;
      let data = {
        current: this.current,
        size: this.size,
        comId: this.$store.getters.deptId,
      };
      getTroubleStatisticsList(data).then((res) => {
        this.msgloading = false;
        if (res.data.code == 200) {
          this.tableData = res.data.rows;
          //分页处理
          this.total = res.data.total;
        } else {
          this.$message.error(err);
        }
      });
    },
    //获取整改数
    getTroublelistCount() {
      getTroublelistCount({
        comId: this.$store.getters.deptId,
      }).then((res) => {
        if (res.data.code == 200) {
          this.listCount = res.data.data;
        } else {
          this.$message.error(err);
        }
      });
    },
    // 隐患明细
    hidView(row, index) {
      this.$refs.hidev.troubleMc = "";
      this.$refs.hidev.troubleLy = "";
      this.$refs.hidev.troubleYhms = "";
      this.$refs.hidev.rows = row;
      this.$refs.hidev.troubleDJ = index;
      this.$refs.hidev.getTroubleSetList();
      this.$refs.hidev.hidVisible = true;
    },
    handleSizeChange(tal) {
      this.size = tal;
      this.getTroubleStatisticsList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getTroubleStatisticsList();
    },
  },
};
</script>
<style lang="scss" scoped>
.hidedanger {
  padding: 0 1rem;
  background: #f2f9ff;
  height: 100%;
  .hide-top {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .car-item {
      width: 19.3%;
      height: 10.7143rem;
      border-radius: 0.7143rem;
      box-sizing: border-box;
      padding: 2.4286rem;
      color: #ffffff;
      font-size: 1.1429rem;
      background-size: 100% 100%;
      overflow: hidden;
      position: relative;
      span:last-of-type {
        display: block;
        font-size: 2.8571rem;
        font-weight: bold;
      }
      &:nth-of-type(1) {
        background: linear-gradient(
          270deg,
          rgb(197, 39, 39) 0%,
          rgb(254, 126, 111) 100%
        );
      }
      &:nth-of-type(2) {
        background: linear-gradient(
          270deg,
          rgb(225, 98, 7) 0%,
          rgb(255, 156, 40) 100%
        );
      }
      &:nth-of-type(3) {
        background: linear-gradient(
          270deg,
          rgb(249, 165, 37) 0%,
          rgb(255, 207, 51) 100%
        );
      }
      &:nth-of-type(4) {
        background: linear-gradient(
          270deg,
          rgb(39, 78, 214) 0%,
          rgb(85, 162, 255) 100%
        );
      }
      &:nth-of-type(5) {
        background: linear-gradient(
          270deg,
          rgb(255, 85, 85) 0%,
          rgb(247, 167, 198) 100%
        );
      }
      img {
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  /deep/ .el-table {
    margin-top: 10px;
    th {
      background-color: #ecf8ff;
      color: #01a0ff;
    }
    .spancolor {
      color: #01a0ff;
      cursor: pointer;
      text-decoration: underline;
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
</style>
<style lang="scss">
// .hidedanger .el-table th {
//   background-color: #ecf8ff;
//   color: #01a0ff;
// }
</style>
