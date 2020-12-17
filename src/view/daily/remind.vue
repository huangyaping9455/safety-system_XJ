<template>
  <div class="information-remind">
    <div class="Information-remind-top">
      <div
        v-for="item in reminds"
        :key="item.label"
        :class="['block', { chenked: current.label == item.label }]"
      >
        <div :class="['block-centent', item.class]" @click="tabClick(item)">
          <div class="title">
            <img src="~A/daily/icon-yujing.png" alt />
            <div>
              <b>{{ item.label }}</b>
              <p>（30天内到期,预警数为0的不能点击跳转）</p>
            </div>
          </div>
          <b class="number">{{ item.num }}</b>
        </div>
      </div>
    </div>
    <div class="Information-remind-bottom">
      <i-table
        :class="current.class"
        :loading="table.loading"
        :height="table.height"
        :columns="table.columns"
        :data="table.data"
        @on-sort-change="table.onSort"
      >
        <template slot="counts" slot-scope="{ row }">
          <div
            :class="row.counts == 0 ? 'disable' : 'add-underline'"
            @click="toList(row)"
          >{{ row.counts }}</div>
        </template>
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
<script>
import { remindTable } from "@/const/information-remind";
import table from "@/mixin/table";
import { getList } from "@/api/daily/remind";
import dayjs from "dayjs";

export default {
  name: "information-remind",
  mixins: [table],
  data() {
    remindTable.onList = this.getList;
    return {
      table: this.tableInit(remindTable),
      current: {},
      earlyNum: 0,
      exceedNum: 0,
    };
  },
  computed: {
    reminds() {
      return [
        { label: "预警", class: "yujing-bg", num: this.earlyNum },
        { label: "超期", class: "chaoqi-bg", num: this.exceedNum },
      ];
    },
  },
  mounted() {
    this.tabClick(this.reminds[0]);
  },
  methods: {
    getList() {
      let table = this.table;
      table.loading = true;
      let params = {
        tongjiriqi: dayjs().format("YYYY-MM-DD"),
        tixingleixing: this.current.label,
        ...table.onParams(),
      };
      getList(params).then((res) => {
        let data = res.data.data;
        this.earlyNum = data.yujing;
        this.exceedNum = data.daoqi;
        table.onFill(data.pages);
      });
    },

    toList(row) {
      if (row.counts == 0) return;
      this.$store.commit("SET_PAGE_PARAMS", {
        path: row.url,
        action: "searchChange",
        params: {
          ids: 1,
          tongjiriqi: row.tongjiriqi,
          tixingleixing: row.tixingleixing,
          tixingxiangqingid: row.tixingxiangqingid,
          deptId: this.deptId,
        },
      });
      this.$router.push({
        path: "/daily/iframe/" + row.url.split("/").pop(),
      });
    },
    tabClick(item) {
      this.current = item;
      this.getList();
    },
  },
};
</script>
<style lang="scss">
@import "S/mixin.scss";

$head-h: 140px;

.information-remind {
  height: 100%;
  width: 100%;
  color: #ffffff;
  .Information-remind-top {
    height: $head-h;
    @include box-center($justify: space-between, $align: center);

    .block {
      cursor: pointer;
      width: 50%;
      height: 100%;
      padding: 10px 20px;
      color: #ffffff;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      .block-centent {
        height: 100%;
        padding: 0 20px;

        background-size: 100% 100%;
        @include box-center($justify: space-between, $align: center);
        .title {
          @include box-center($justify: space-between, $align: center);
          img {
            margin-right: 20px;
          }
          b {
            font-size: 28px;
          }
          p {
            font-size: 18px;
          }
        }
        .number {
          font-size: 58px;
        }
      }
      .yujing-bg {
        background: url("~A/daily/yujing-bg.png") no-repeat top center;
      }
      .chaoqi-bg {
        background: url("~A/daily/chaoqi-bg.png") no-repeat top center;
      }
    }
    .chenked {
      background: #ffffff;
    }
  }
  .Information-remind-bottom {
    width: 100%;
    padding-top: 10px;

    height: calc(100% - #{$head-h});

    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #ffffff;
    overflow: hidden;
    .yujing-bg {
      .ivu-table th {
        background-color: #fca90a;
        color: #fff;
      }
    }

    .chaoqi-bg {
      .ivu-table th {
        background-color: #fd2b2b;
        color: #fff;
      }
    }

    .add-underline {
      font-weight: 600;
      color: #006fde;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>

