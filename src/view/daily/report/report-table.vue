<template>
  <div class="info-left">
    <div class="left-top">
      <div
        v-for="(item, index) in reportTypes"
        :key="item.label"
        :class="['block', { checked: activeTab.label == item.label }]"
        @click="tabClick(item, index)"
      >
        <img class="imgpos" :src="item.logo" alt />
        <div class="centent-box">
          <p class="head">
            <i-date
              :open="item.open"
              :valude="item.date"
              :type="item.type"
              transfer
              confirm
              :show-week-numbers="item.week"
              :clearable="false"
              :editable="false"
              @on-change="(date) => handleChange(item, date)"
              @on-clear="handleClear(item)"
              @on-ok="handleOk(item, index)"
            >
              <div class="date" @click.stop="handleClick(item)">
                <span>{{ item.date == "" ? "选择日期" : item.date }}</span>
                <icon type="ios-calendar-outline"></icon>
              </div>
            </i-date>
          </p>
          <span class="btn-title">{{ item.dates }}</span>
        </div>
      </div>
    </div>
    <div class="left-centent">
      <div
        style="padding:1rem;background:#fff;border-radius:1%;box-shadow:0px 0px 10px #bcdefc;"
      >
        <i-table
          border
          highlight-row
          ref="table"
          :loading="table.loading"
          :height="caleHeight"
          :columns="table.columns"
          :data="table.data"
          @on-sort-change="table.onSort"
        >
          <!-- <template slot="edit" slot-scope="{ row }">
          <img src="~A/icon/edit.png" class="pointer" @click="rowClick(row)" />
        </template> -->
          <template slot="processRate" slot-scope="{ row }">
            <icon :type="getIcon(row)" />
            <span>{{ row.processRate }}</span>
          </template>
          <!-- <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template> -->
          <template slot-scope="{ row }" slot="action">
            <el-link
              type="primary"
              @click="preview(row)"
              size="small"
              style="margin-right: 5px"
              >报文预览</el-link
            >
            <!-- <el-link
              type="primary"
              @click="fubiao(row)"
              size="small"
              style="margin-right: 5px"
              >附表分析</el-link
            > -->
            <!-- <i-button type="primary" size="small">报警记录</i-button> -->
          </template>
          <table-page
            slot="footer"
            v-model="table"
            @change="table.onList"
          ></table-page>
        </i-table>
      </div>
    </div>
  </div>
</template>
<script>
import { reportTypes, reportTable } from "@/const/security-report";
import { getList } from "@/api/daily/report";
import table from "@/mixin/table";
export default {
  name: "report-table",
  mixins: [table],
  data() {
    reportTable.onList = this.getList;
    return {
      table: this.tableInit(reportTable),
      reportTypes,
      activeTab: {},
      caleHeight: 815,
    };
  },
  computed: {},
  mounted() {
    document
      .querySelector(".SYSTEM")
      .addEventListener("click", this.closeDatePicker);
    this.reportTypes.forEach((item) => item.setDate());
    if (this.$route.query.tab) {
      this.reportTypes.map((el) => {
        if (el.label === this.$route.query.tab) {
          this.tabClick(el);
        }
      });
    } else {
      this.tabClick(this.reportTypes[0]);
    }
    // 表格高度自适应
    this.$nextTick(function() {
      this.caleHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 70;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.caleHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      };
    });
  },
  beforeDestroy() {
    document
      .querySelector(".SYSTEM")
      .removeEventListener("click", this.closeDatePicker);
  },
  methods: {
    // 获取列表数据
    getList() {
      let table = this.table;
      table.loading = true;
      let params = {
        property: this.activeTab.property,
        countDate: this.activeTab.countDate,
        ...table.onParams(),
      };
      getList(params).then((res) => {
        if (res.data.msg == "操作成功") {
          let data = res.data.data;
          table.onFill(data);
          table.loading = false;
        } else {
          this.$message.warning(res.data.msg);
          this.table.data = [];
          table.loading = false;
        }
      });
    },
    getIcon(row) {
      let is = row.processRate == "100%";
      return is ? "md-checkmark-circle" : "md-alert";
    },
    // 点击查看
    rowClick(row) {
      // row.path = row.path.split('D:\BS\static')[1];
      row.path = row.path.split("static")[1];
      this.$emit("on-click", row);
    },
    preview(item) {
      this.$router.push({
        path: "./preview",
        query: { id: item.id, tab: this.activeTab.label },
      });
    },
    // 附表分析
    fubiao(item) {
      // console.log(item);
    },
    // Tab 切换
    tabClick(item) {
      this.activeTab = item;
      if (
        item.label == "日报" ||
        item.label == "周报" ||
        item.label == "月报" ||
        item.label == "年报"
      ) {
        // this.$parent.isOpen = false;
        this.getList();
      } else {
        this.$message.warning("正在努力建设中......");
        this.table.data = [];
      }
    },
    // 打开日期组件
    handleClick(item) {
      item.open = !item.open;
    },
    // 关闭日期组件
    closeDatePicker() {
      this.reportTypes.forEach((item) => (item.open = false));
    },
    // 临时储存 date
    handleChange(item, date) {
      item.temporaryDate = date;
    },
    // 清除 date
    handleClear(item) {
      item.date = "";
      this.closeDatePicker();
    },
    // 选择 date
    handleOk(item) {
      if (item.temporaryDate) {
        item.setDate(item.temporaryDate);
        this.tabClick(item);
        this.closeDatePicker();
      } else {
        this.$message.warning("请选择日期");
      }
    },
  },
};
</script>
<style lang="scss"></style>
