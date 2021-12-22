<template>
  <el-dialog title="违规明细" :visible.sync="searchVisible" width="70%" center>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="jiashiyuanxingming" label="驾驶员姓名" width="100">
      </el-table-column>
      <el-table-column prop="congyezigezheng" label="从业资格证号" width="120">
      </el-table-column>
      <el-table-column
        prop="shenfenzhenghao"
        label="身份证号"
        width="120"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="plate" label="驾驶车辆号牌" width="120">
      </el-table-column>
      <el-table-column prop="color" label="车牌颜色"> </el-table-column>
      <el-table-column prop="alarmType" label="违法类型"> </el-table-column>
      <el-table-column
        prop="weifashijian"
        label="违法时间"
        width="120"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="roadname"
        label="违法地点"
        width="150"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="chulizhuangtai" label="是否处理"> </el-table-column>
      <el-table-column prop="chulixingshi" label="处理形式"> </el-table-column>
      <el-table-column prop="chulimiaoshu" label="处理描述"> </el-table-column>
      <el-table-column prop="fujian" label="处理凭证"> </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getDriverAlarmXQTJ } from "@/api/daily/vehicle";
export default {
  props:{
    betime:{
      type:Array,
    }
  },
  data() {
    return {
      searchVisible: false,
      tableData: [],
      size:100,
      current:1
    };
  },
  mounted() {},
  methods: {
    getDriverAlarmXQTJ(id){
      let data={
        size:this.size,
        current:this.current,
        driverId:id,
        beginTime:this.betime[0]?this.betime[0]:"",
        endTime:this.betime[1]?this.betime[1]:"",
      }
      getDriverAlarmXQTJ(data).then(res=>{
        if(res.data.code===200){
          this.tableData=res.data.data.records.map(el=>{
            el.weifashijian=el.beginTime+"-"+el.endTime;
            return el;
          });
        }else{
         this.tableData=[];
         this.$message.error("暂无数据"); 
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  padding: 1vmin;
  .dialog-input {
    display: flex;
    margin-bottom: 1rem;
  }
}
</style>
