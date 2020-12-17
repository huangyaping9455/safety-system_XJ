<template>
  <div class="wh100 freight-view">
    <h2 class="title">查看运单</h2>
    <div class="main">
      <!-- 首页 -->
      <div v-show="show=='home'" class="home wh100">
        <i-spin v-show="loading" fix></i-spin>
        <div class="info-container">
          <div class="mark">
            <span class="plate">{{data.cheliangpaizhao}}</span>
            <span class="number">{{data.outNum}}</span>
          </div>
          <div class="address">
            <span>{{data.forwardeUnit}}</span>
            <div class="line"></div>
            <span>{{data.receiveUnit}}</span>
          </div>
          <div class="info">
            <div>
              <span>货名：</span>
              {{data.goods}}
            </div>
            <div>
              <span>规格：</span>
              {{data.guige}}
            </div>
            <div>
              <span>运输单位：</span>
              {{data.transportUnit}}
            </div>
            <div>
              <span>净重：</span>
              {{data.inetWeight}}
            </div>
          </div>
        </div>
        <div class="list">
          <div class="head row">
            <div class="w30">单据名称</div>
            <div class="w20">结算重量（吨）</div>
            <div class="w20">金额</div>
            <div class="w30">时间</div>
          </div>
          <div class="body">
            <scroll>
              <div v-for="(item,i) in list" :key="i" class="row">
                <div class="w30 name">
                  <div @click="toBill(item)">
                    <span>{{item.leixing}}</span>
                    <img :src="item.img" alt />
                  </div>
                </div>
                <div class="w20">{{item.weight}}</div>
                <div class="w20">{{item.jine}}</div>
                <div class="w30">{{item.shijian}}</div>
              </div>
            </scroll>
          </div>
          <div class="count">
            <div class="row">
              <div class="w30">合计</div>
              <div class="w20">{{data.inetWeight}}</div>
              <div class="w20">{{moneyCont}}</div>
              <div class="w30"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 单个查看 -->
      <div v-show="show!='home'" class="wh100">
        <scroll>
          <!-- 出库单 -->
          <bill-warehouse-out v-show="show=='billout'" :config="stockOutConfig"></bill-warehouse-out>
          <!-- 入库单 -->
          <bill-warehouse-in v-show="show=='billin'" :config="stockInConfig"></bill-warehouse-in>
          <!-- 其他单据 -->
          <bill-other v-show="show=='billother'" :config="stockOtherConfig" :view="bill"></bill-other>
        </scroll>
      </div>
    </div>
    <div class="foot">
      <i-button
        v-if="show=='home'"
        :disabled="loading"
        icon="md-checkmark"
        type="primary"
        shape="circle"
        @click="toEdit"
      >编辑</i-button>
      <i-button v-else icon="md-arrow-back" type="primary" shape="circle" @click="backHome">返回</i-button>
    </div>
  </div>
</template>
 
<script>
import { detailWaybill } from '@/api/operation/freight';
import billWarehouseOut from './bill-warehouse-out';
import billWarehouseIn from './bill-warehouse-in';
import billOther from './bill-other';
import {
  stockInConfig,
  stockOutConfig,
  stockOtherConfig
} from '@/const/operation';
export default {
  name: 'freight-view',
  components: {
    billWarehouseIn,
    billWarehouseOut,
    billOther
  },
  props: {
    row: Object
  },
  data() {
    return {
      stockInConfig: stockInConfig(),
      stockOutConfig: stockOutConfig(),
      stockOtherConfig: stockOtherConfig(),
      loading: false,
      data: {},
      list: [],
      bill: {},
      show: 'home',
      moneyCont: 0
    };
  },
  watch: {
    'row.id': 'delWaybill'
  },
  methods: {
    toBill(item) {
      this.show = item.show;
      this.bill = item;
    },
    toEdit() {
      this.$emit('state', 'edit', this.data);
    },
    backHome() {
      this.show = 'home';
    },
    // 接收数据前的处理
    receiveHandle(data, keys) {
      keys.forEach(key => {
        let item = data[key];
        if (item == undefined) return;
        try {
          data[key] = item.length == 0 ? [] : JSON.parse(item);
        } catch (error) {
          data[key] = [];
          console.error(key + '报错：' + error);
        }
      });
      return data;
    },
    delWaybill() {
      this.loading = true;
      this.backHome();
      detailWaybill(this.row.id).then(res => {
        let data = this.receiveHandle(res.data.data.detail, [
          'ifujian',
          'ofujian'
        ]);
        let waybillFujian = data.waybillFujian.map(v =>
          this.receiveHandle(v, ['fujian'])
        );
        let base = [
          {
            leixing: '出库单',
            weight: data.onetWeight,
            riqi: data.outTime,
            show: 'billout',
            img: require('A/operation/bluegrey.png')
          },
          {
            leixing: '入货单',
            weight: data.inetWeight,
            riqi: data.intoTime,
            show: 'billin',
            img: require('A/operation/cyan.png')
          }
        ];
        waybillFujian.forEach(v => {
          this.moneyCont += Number(v.jine);
          v.show = 'billother';
          v.img = require('A/operation/green.png');
        });

        this.list = base.concat(data.waybillFujian);
        this.data = data;
        this.stockInConfig.data = data;
        this.stockOutConfig.data = data;
        this.stockOtherConfig.dataList = waybillFujian;
        this.loading = false;
      });
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';
.freight-view {
  .home {
    overflow: hidden;
  }
  .info-container {
    background: #f3f9ff;
    margin: 10px;
    height: 230px;
    padding: 10px;
    .mark {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      height: 35px;
      line-height: 35px;
    }
    .plate {
      width: 100px;
      text-align: center;
      color: white;
      background: url('~A/operation/blue.png');
    }
    .number {
      font-size: 20px;
    }
    .address {
      display: flex;
      font-size: 24px;
      font-weight: 600;
      justify-content: space-around;
      align-items: center;
      height: 65px;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0px 10px;
      }
      .line {
        flex-grow: 1;
        min-width: 100px;
        height: 4px;
        background: #2c45c7;
        max-width: 40%;
        position: relative;
        &::after {
          content: '';
          width: 31px;
          height: 24px;
          right: -6px;
          top: -10px;
          position: absolute;
          background: url('~A/operation/arrows.png') no-repeat;
        }
      }
    }
    .info {
      border: 1px solid #dcdee2;
      border-top: 1px solid #2c45c7;
      font-size: 18px;
      padding: 20px 20px;
      display: flex;
      flex-wrap: wrap;
      & > div {
        width: 50%;
        margin: 3px 0px;
      }
      span {
        width: 100px;
        color: #999;
        display: inline-block;
        text-align: right;
      }
    }
  }
  .main {
    position: relative;
  }
  .list {
    height: calc(100% - 250px);
    .row {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;

      & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .head {
      border-bottom: 1px solid #dcdee2;
      height: 45px;
      font-size: 18px;
    }
    .count {
      border-top: 1px solid #dcdee2;
      height: 45px;
      font-size: 18px;
      line-height: 45px;
      font-weight: 600;
    }
    .body {
      height: calc(100% - 90px);
      font-size: 16px;
      .row > div {
        padding: 5px 0px;
      }
      .name {
        text-align: left;
        & > div {
          position: relative;
          display: inline-block;
        }
        img {
          cursor: pointer;
          max-width: 100%;
          position: relative;
        }
        span {
          @include center-translate();
          z-index: 1;
          margin-top: 5px;
          margin-left: 15px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>