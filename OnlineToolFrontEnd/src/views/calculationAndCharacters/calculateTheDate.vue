<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-12 mt-2 mb-1 ">
        <div id="tittle" class="text-center">
							<span style="font-size: x-large;">
								<strong>日期在线计算</strong>
							</span>
        </div>
        <div class="col-md-12 mt-2 mb-1">
          <div class="card">
            <h5 class="card-header">参数</h5>
            <div class="card-body row">
              <label class="col-xs-4 col-md-2 col-form-label">起始日期</label>
              <div class="col-xs-8 col-md-10 input-group-lg">
                <div class="block">
                  <el-date-picker
                      v-model="stratTime"
                      type="date"
                      placeholder="选择日期"
                      :shortcuts="shortcuts"
                      value-format="YYYY-MM-DD"
                      :default-value="defaultValueTime"
                  >
                  </el-date-picker>
                </div>
                <small class="text-muted">
                  起始日期，可以手动键盘输入，也可以用日历选择器选定嗷，默认为当天日期。
                </small>
              </div>

              <label class="col-xs-4 col-md-2 col-form-label" for="password-include">截止日期</label>

              <div class="col-xs-8 col-md-10 " id="password-include">
                <div class="block">
                  <el-date-picker
                      v-model="deadline"
                      type="date"
                      placeholder="选择日期"
                      :shortcuts="shortcuts"
                      value-format="YYYY-MM-DD"
                  >
                  </el-date-picker>
                </div>
                <small id="passwordHelpBlock" class="form-text text-muted">
                  截止日期，可以手动键盘输入，也可以用日历选择器选定嗷。
                </small>
              </div>
            </div>
          </div>
          <div class="card">
            <h5 class="card-header">
              操作
            </h5>
            <div class="card-body text-center row">
              <div class="col-md-6 d-grid gap-2">
                <div class="input-group ">
                  <span class="input-group-text">起始时间</span>
                  <input type="number" ref="addDays" class="form-control" aria-describedby="basic-addon2">
                  <span class="input-group-text">天后</span><br>
                  <button @click="addTheDays" class="btn btn-warning">确定</button>
                </div>
                <small class="form-text text-muted">
                  计算起始日期往前(后)N天的日期
                </small>
              </div>
              <div class="col-md-6 d-grid gap-2" >
                <el-button @click="calculateTheDate" type="primary" >直接计算</el-button>
                <small class="form-text text-muted">
                  直接计算起始日期和截止日期之间相差多少天
                </small>
              </div>
            </div>
          </div>

          <div class="card">
            <h5 class="card-header">
              输出结果
            </h5>
            <div class="card-body text-center">
              <div class="col-12">
                <h5 id="result"><span v-html="reuslt"></span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {DateDifference,addDate} from "../../until/processDate"
export default {
  name: "calculateTheDate",
  data(){
    return{
      stratTime:'',
      deadline:'',
      reuslt:'等待用户操作',
      defaultValueTime:new Date(),
      shortcuts: [{
        text: '今天',
        value: new Date(),
      }, {
        text: '昨天',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        })(),
      }, {
        text: '一周前',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        })(),
      },{
        text: '一周后',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
          return date
        })(),
      }],
    }
  },
  //页面加载时候，在mounted中进行赋值
  mounted() {
    // 初始化查询，默认为当天
    this.stratTime = new Date().Format("yyyy-MM-dd")
  },
  methods:{
    calculateTheDate(){
      let days=DateDifference(this.stratTime,this.deadline);
      if (isNaN(days)){
        this.reuslt="玩坏啦!!!<span class='alert-danger'>请检查参数嗷～</span>"
      }
      else {
        this.reuslt = "距离截止日期还有：<span class='alert-danger'>" + days + "天</span>嗷～"
      }
    },
    addTheDays(){
      let days=this.$refs.addDays.value;
      let newDay=addDate(this.stratTime,days);
      this.reuslt="起始日期后的<span class='alert-danger'>"+days+"天</span>"+"是<span class='alert-danger'>"+newDay+"</span>";

    }
  }
}
</script>

<style>
@media (max-width: 575px){
  .el-date-picker.has-sidebar{
    width: auto;
  }
  .el-date-picker .el-picker-panel__content{
    width: auto;
  }
}
</style>
