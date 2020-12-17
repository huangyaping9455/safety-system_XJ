<template>
  <div v-show="value" class="popup-window alarm-detail">
    <div class="popup-content">
      <!-- 弹窗 title -->
      <div class="popup-title">
        <div class="search">
          <span>自检日期：</span>
          <i-date
            v-model="dataValue"
            format="yyyy-MM-dd"
            type="daterange"
            placement="bottom-end"
            placeholder="选择日期"
            style="width: 200px"
          ></i-date>
          <span>自检周期：</span>
          <i-select v-model="period" style="width:100px">
            <i-option
              v-for="(item, index) in periodList"
              :key="index"
              :value="item.value"
            >{{ item.label }}</i-option>
          </i-select>
          <div class="button" @click="getList()">搜索</div>
          <div class="button" @click="addBox = true">新增</div>
        </div>
        <img class="close" src="~A/daily/popu-close.png" alt @click="close" />
      </div>
      <!-- 弹窗 main -->
      <div class="content">
        <div v-show="addBox" class="addBox">
          <div>
            <span>自检周期：</span>
            <i-select v-model="period" style="width:100px">
              <i-option
                v-for="(item, index) in periodList"
                :key="index"
                :value="item.value"
              >{{ item.label }}</i-option>
            </i-select>
          </div>
          <div>
            <span>运营类型：</span>
            <i-select v-model="type" style="width:100px">
              <i-option value="危货">危货</i-option>
              <i-option value="普货" disabled>普货</i-option>
              <i-option value="客运" disabled>客运</i-option>
            </i-select>
          </div>
          <div>
            <span>报告时间：</span>
            <i-date
              v-model="reportTime"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width: 200px"
            ></i-date>
          </div>
          <div>
            <i-input v-model="beizhu" size="large" placeholder="请输入备注" />
          </div>
          <div class="quxiao" @click="addBox = false">取消</div>
          <div class="button" @click="addList">确定</div>
        </div>
        <i-table
          ref="evaluateTable"
          border
          highlight-row
          :loading="table.loading"
          :height="table.height"
          :columns="table.columns"
          :data="table.data"
          @on-sort-change="table.onSort"
        >
          <template slot="edi" slot-scope="{ row }">
            <img
              v-show="row.isWanjieshow == '否'"
              src="~A/icon/pen.png"
              class="botton"
              @click="toDetail(row)"
            />
          </template>
          <template slot="del" slot-scope="{ row }">
            <img
              v-show="row.isWanjieshow == '否'"
              src="~A/icon/del.png"
              class="botton"
              @click="del(row)"
            />
          </template>
          <table-page slot="footer" class="page" v-model="table" @change="table.onList"></table-page>
        </i-table>
      </div>
      <div class="footer"></div>
      <!-- 删除确认提示框 -->
      <i-modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <icon type="ios-information-circle"></icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>是否删除数据？</p>
        </div>
        <div slot="footer">
          <i-button type="error" size="large" long :loading="modalLoading" @click="delList">删除</i-button>
        </div>
      </i-modal>
    </div>
  </div>
</template>
 
<script>
import table from '@/mixin/table';
import dayjs from 'dayjs';
import { evaluateHistoryTable } from '@/const/evaluate';
import {
  historyList,
  historyDetail,
  addTable,
  historyDel
} from '@/api/evaluate';
export default {
  name: 'evaluate-history',
  mixins: [table],
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    evaluateHistoryTable.onList = this.getList;
    return {
      table: this.tableInit(evaluateHistoryTable),
      loading: false,
      dataValue: '',
      reportTime: dayjs(new Date()).format('YYYY-MM-DD'),
      isFlag: false,
      periodList: [
        { label: '周', value: '周' },
        { label: '月', value: '月' },
        { label: '季度', value: '季度' },
        { label: '半年', value: '半年' },
        { label: '年', value: '年' }
      ],
      period: '季度',
      type: '危货',
      addBox: false,
      beizhu: '',
      modal2: false,
      modalLoading: false,
      historyId: ''
    };
  },
  computed: {},
  watch: {
    value() {
      if (!this.value) return;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 去详情页
    toDetail(data) {
      let id = data.id;
      historyDetail(id).then(res => {
        let data = res.data.data;
        this.$router.push({
          path: '/daily/evaluate'
        });
        this.close();
        if (this.isFlag == true) {
          this.$emit('getHistoryData', data);
        } else {
          this.$emit('getHistoryData', data);
        }
        this.isFlag = true;
      });
    },
    // 删除历史记录
    del(row) {
      this.historyId = row.id;
      if (row.isWanjie == 1) {
        this.$message.success('已完结，不能删除！');
      } else {
        this.modal2 = true;
      }
    },
    // 删除确认对话框，确认删除
    delList() {
      historyDel(this.historyId).then(res => {
        if (res.data.success) {
          this.$message.success('删除成功！');
          this.modal2 = false;
          this.$parent.getPeriodList();
          this.getList();
        }
      });
    },
    // 新增
    addList() {
      let addParams = {
        zijianzhouqi: this.period,
        beizhu: this.beizhu,
        deptid: this.$store.getters.deptId,
        yunyingleixing: this.type,
        baogaoshijian: dayjs(this.reportTime).format('YYYY-MM-DD'),
        deptname: this.$store.getters.deptName
      };
      addTable(addParams).then(res => {
        if (res.data.success) {
          this.$message.success('新增成功！');
          this.getList();
        }
      });
    },
    // 获取历史列表
    getList() {
      let table = this.table;
      table.loading = true;
      let params = {
        ...table.onParams(),
        deptid: this.$store.getters.deptId,
        beginTime:
          this.dataValue[0] == ''
            ? ''
            : dayjs(this.dataValue[0]).format('YYYY-MM-DD'),
        endTime:
          this.dataValue[1] == ''
            ? ''
            : dayjs(this.dataValue[1]).format('YYYY-MM-DD'),
        zijianzhouqi: this.period
      };
      historyList(params).then(res => {
        let data = res.data.data;
        table.onFill(data);
      });
    },
    close() {
      this.$emit('input', false);
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';
.ivu-date-picker-rel {
  margin-right: 10px;
}
.ivu-table-wrapper {
  height: 100%;
}
// 弹窗
.alarm-detail {
  .popup-content {
    min-width: 1200px;
    min-height: 600px;
    width: 80%;
    height: 80%;
  }
  .popup-title {
    height: 50px;
    line-height: 50px;
    position: relative;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    border-radius: 4px 4px 0 0;
    background: #fff;
    .search {
      background: #4fa7fe;
      height: 80%;
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      padding: 0 10px;
      .button {
        background: #ffd116;
        color: #333;
        width: 70px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        margin: 0 6px;
        cursor: pointer;
      }
    }
    .close {
      height: 30px;
      position: absolute;
      top: -35px;
      right: -30px;
      cursor: pointer;
    }
  }

  .footer {
    width: 100%;
    height: 30px;
    background: #f4f7fe url('~A/daily/pic.png') no-repeat left center;
    background-size: contain;
  }

  .content {
    height: calc(100% - 80px);
    color: #333333;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    .addBox {
      height: 60px;
      display: flex;
      align-items: center;
      & > div {
        margin: 0 8px;
      }
      .button {
        background: #166bff;
        padding: 4px 8px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
      .quxiao {
        cursor: pointer;
      }
    }
  }
  .page {
    padding: 4px 10px 0 10px;
  }
}
</style>