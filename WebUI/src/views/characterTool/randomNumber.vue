<template>
  <div style="margin-top: 1rem" class="container">
    <a-row>
      <a-col id="tittle" class="col-12 mt-2 mb-1 text-center">
        <h1>在线随机数生成器</h1>
      </a-col>
    </a-row>
    <a-row :gutter="50" style="text-align: left;margin-top: 2rem">
      <a-col :span="12">
        <a-form-item field="生成个数" label="生成个数">
          <a-input-number :style="{width:'100%'}" v-model="totalNum"
                          size="large" placeholder="仅支持数字" mode="button"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="最小值" label="最小值">
          <a-input-number :style="{width:'100%'}" v-model="minNum"
                          size="large" placeholder="仅支持数字" mode="button"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="最大值" label="最大值">
          <a-input-number :style="{width:'100%'}" v-model="maxNum"
                          size="large" placeholder="仅支持数字" mode="button"/>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="选择是否为唯一随机数" label="选择是否为唯一随机数">
          <a-select size="large" placeholder="请选择模式" v-model="genMode">
            <a-option value="only">唯一(不重复)</a-option>
            <a-option value="random">随意(可重复)</a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row style="margin: 1.5rem 0">
      <a-col>
        <a-button long status="success" type="primary"  shape="round" @click="ListNotRepeat">生成</a-button>
      </a-col>
    </a-row>
    <a-row style="margin-top: 2rem">
      <a-col>
        <a-typography-text copyable
                           style="word-break:break-all"
                           :ellipsis="{rows: 8, expandable: true,}">
         <span class="code">{{ randomOutPut }}</span>
        </a-typography-text>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {getListNotRepeat, getListEnableRepeat} from "@/until/randomNumList"
import {ref} from "vue";
import {Notification} from "@arco-design/web-vue";

export default {
  name: "randomNumber",
  setup(){
    let randomOutPut=ref("等待用户操作╮(￣▽￣\"\")╭");
    let minNum = ref(0);
    let maxNum = ref(0);
    let totalNum = ref(0);
    let genMode = ref("only")
    function ListNotRepeat() {
      if (totalNum.value < 0){
        Notification.warning({
          title: '参数错误',
          content: '生成的总个数不得为零',
        })
        return
      }
      if (genMode.value == "only") {
        if (maxNum.value - minNum.value < totalNum.value) {
          randomOutPut.value = "错了嗷～范围内没这么多数字啦!!!"
        } else if (maxNum.value < minNum.value) {
          randomOutPut.value = "错了嗷～最大值不应该小于最小值!!!"
        } else {
          let Number = getListNotRepeat(minNum.value, maxNum.value, totalNum.value)
          randomOutPut.value = Number
        }
      } else {
        let Number = getListEnableRepeat(minNum.value, maxNum.value, totalNum.value)
        randomOutPut.value = Number
      }
    };
    return {
      randomOutPut,minNum,maxNum,totalNum,genMode,ListNotRepeat
    }

  }
}
</script>

<style scoped>
.code {
  margin: 0 2px;
  padding: 2px 8px;
  color: var(--color-text-2);
  background-color: var(--color-neutral-2);
  border: 1px solid var(--color-neutral-3);
  border-radius: 2px;
  border: 1px solid #cbcbcb;
  font-size: 2rem;
  padding: 6px;
}
</style>
