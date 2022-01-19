<template>
  <div class="container pt-3">
    <div class="form-row">
      <div id="tittle" class="col-12 mt-2 mb-1" align="center">
        <span style="font-size: x-large;" class="text-center"><strong>在线随机数生成器</strong></span><br />
      </div>
      <div class="form-group col-md-12">
        <label >生成个数</label>
        <input type="number" ref="totalNum" class="form-control" placeholder="Number Only/仅支持数字">
      </div>
      <div class="form-group col-md-12">
        <label >最小值</label>
        <input type="number" ref="minNum" class="form-control" placeholder="Number Only/仅支持数字">
      </div>
      <div class="form-group col-md-12">
        <label >最大值</label>
        <input type="number" ref="maxNum" class="form-control" placeholder="Number Only/仅支持数字">
      </div>
      <div class="form-group col-md-12">
        <label >选择是否为唯一随机数</label>
        <select ref="mode" class="form-select" name="mode" aria-label="Default select example">
          <option selected value="only">唯一(不重复)</option>
          <option value="random">随意(可重复)</option>
        </select>
      </div>
      <div class="col-12 py-5 text-center">
        <div class="d-grid gap-2">
          <el-button @click="ListNotRepeat" type="danger">生成</el-button>
        </div>
      </div>
    </div>
    <h3 class="text-center py-5">
      <code>{{randomOutPut}}</code>
    </h3>
  </div>
</template>

<script>
import {getListNotRepeat,getListEnableRepeat} from "../../until/randomNumList"
export default {
  name: "randomNumber",
  data(){
    return{
      randomOutPut:"等待用户操作╮(￣▽￣\"\")╭",
    }
  },
  methods:{
    ListNotRepeat(){
      let minNum=this.$refs.minNum.value
      let maxNum=this.$refs.maxNum.value
      let totalNum=this.$refs.totalNum.value
      console.log(minNum+"/"+maxNum+"/"+totalNum)
      if (this.$refs.mode.value=="only"){
        if (maxNum-minNum<totalNum){
          this.randomOutPut="错了嗷～范围内没这么多数字啦!!!"
        }
        else if (maxNum<minNum){
          this.randomOutPut="错了嗷～最大值不应该小于最小值!!!"
        }
        else {
          let Number=getListNotRepeat(minNum,maxNum,totalNum)
          this.randomOutPut=Number
        }
      }
      else {
        let Number=getListEnableRepeat(minNum,maxNum,totalNum)
        this.randomOutPut=Number
      }

    },
  }
}
</script>

<style scoped>
code{
  border: 1px solid #cbcbcb;
  background: #f2f2f2;
  font-size: 36px;
  padding: 6px;
}
</style>
