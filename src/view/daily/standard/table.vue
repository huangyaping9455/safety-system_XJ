<template>
  <div class="com-tab">
    <dl class="flex-row">
      <dd class="width-100">考评内容</dd>
      <dd class="width-300 width-auto">考评要点</dd>
      <dd class="width-100 width-80 ">法律法规</dd>
      <dd class="width-100 width-80">{{ textObj.textStart }}</dd>
      <dd class="width-100 width-80">{{ textObj.text }}</dd>
      <dd class="width-100 width-80">当前分值</dd>
    </dl>
    <ul>
      <li class="flex-row li-item border-bottom" v-for="item in dataTab" :key="item.id">
        <div class="width-100 padding-10 flex">
          <p class="text-center font-size12 item-name">{{ item.parentName || '' }}</p>
        </div>
        <div class="flex-row width-flex">
          <div class="padding-10 width-100 border-right flex">
            <p class="text-center font-size12">{{ item.twoTree }}</p>
          </div>
          <div class="col-item flex flex-column width-flex">
            <div class="flex-row col-content " v-for="children in item.children" :key="children.id">
              <div class="width-200 flex jf-start">
                <div class="text text-ellipsis2 font-size12">{{children.name}}</div>
              </div>
              <div class="width-100 width-80 flex"
                ><img class="book-img" src="../../../assets/new_icon/book.png" alt=""></div>
              <!-- <span class="width-100 width-80 flex">{{ children.levelNumber }}</span> -->
              <span class="width-100 width-80 flex">{{children.score}}</span>
              <div class="start-item width-100 width-80 flex">
                <img v-show="+children.starlevel" v-for="(start, index) in Array(+children.starlevel)" :key="index" class="start" src="../../../assets/standard/start.png" alt="" srcset="">
              </div>
              <span class="width-100 width-80 flex border-left">{{children.nowscores}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    dataTab: {
      type: Array,
      default: ()=> {
        return []
      },
      require: true
    },
    rowName: {
      type: String,
      default:'',
      require: true
    },
    type: {
      type: Number,
      default:'',
      require: true
    },
  },
  computed: {
    textObj() {
      let temp = '';
      if(this.type === 1) {
        temp = '危货'
      }else if(this.type === 2) {
        temp = "普货"
      }else {
        temp = '旅客'
      }
      return {
        text: temp,
        textStart: `${temp}分值`
      }
    },
   
  }
}

</script>
<style lang="scss" scoped>
@import "../../../assets/css/common.css";
.com-tab {
  border: 2px solid #70b7ff;
  .border-left {
    border-left: 1px solid #e3e3e3 !important;
  }
  .jf-start{
    justify-content: flex-start  !important;
  }
  .text-ellipsis2{
    text-align: left;
  }
  .start{
    width: 20px;
  }
  .width-flex{
    width: 100%;
    box-sizing: border-box;
  }
  .width-auto {
    flex: 1 auto;
    width: initial !important;
  }
  .padding-20 {
    padding: 20px;
  }
  .border-right {
    border-right: 1px solid #e3e3e3;
  }
  .border-bottom {
    border-bottom: 1px solid #e3e3e3;
  }
  .book-img{
    width: 25px;
  }
  dd {
    font-size: 14px;
    border-right: 1px solid #e3e3e3;
    background-color: #37a9f7;
    color: #fff;
    text-align: center;
    padding: 5px 10px;
    &:last-of-type {
      border: 0;
    }
  }
  .width-80 {
    // width: 77px !important;
    // padding: 5px 10px;
  }
  .width-100 {
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    width: 78px;
    border-right: 1px solid #e3e3e3;
    &:last-of-type {
      border: none;
    }
  }
  .width-200 {
    width: 10px;
    padding: 0 10px;
    flex: 1 auto;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e3e3e3;
  }
  .width-300 {
    width: 400px;
    box-sizing: border-box;
    align-items: center;
    text-align: center !important;
    justify-content: center;
    border-right: 1px solid #e3e3e3;
  }
  .li-item {
    .padding-10 {
      padding: 10px;
    }
    .item-name {
      width: 80px;
    }
  }
  .col-item {
    .col-content {
      display: flex;
      height: 100%;
      border-bottom: 1px solid #e3e3e3;
      .text{
        padding: 5px;
      }
      &:last-of-type {
        border: none;
      }
    }
  }
}
</style>
