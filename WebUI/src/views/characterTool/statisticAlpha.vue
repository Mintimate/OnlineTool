<template>
  <div style="margin-top: 1rem" class="container">
    <a-row>
      <a-col id="tittle">
        <h1>统计字数字符</h1>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-textarea v-model="inputContent" style="height: 10rem"
                    placeholder="输入(或粘贴)内容,并选择下列模式进行转化" allow-clear/>
      </a-col>
    </a-row>
    <a-row>
      <a-col style="text-align: right">
        <a-space>
          <a-button v-if="alpha.notWork"  disabled>Waiting</a-button>
          <a-button type="primary" status="success" v-else >Working</a-button>
          <a-button status="warning" @click="inputContent=''">全部清空!
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row justify="center">
      <a-col :xs="24" :lg="12">
        <a-row>
          <a-col :span="24">
            <h3>共计</h3>
          </a-col>
          <a-col :span="12">
            <a-statistic extra="字数" :value="alpha.zishu" animation/>
          </a-col>
          <a-col :span="12">
            <a-statistic extra="字符" :value="alpha.zifu"  animation>
              {{ alpha.zifu }}
            </a-statistic>
          </a-col>
        </a-row>
      </a-col>
      <a-col :xs="24" :lg="12">
        <a-row>
          <a-col :span="24">
            <h3>包含</h3>
          </a-col>
          <a-col :span="12">
            <a-statistic extra="汉字" :value="alpha.hanzi" animation/>
          </a-col>
          <a-col :span="12">
            <a-statistic extra="标点(全角)" :value="alpha.biaodian" animation/>
          </a-col>
          <a-col :span="12">
            <a-statistic extra="字母" :value="alpha.zimu" animation/>
          </a-col>
          <a-col :span="12">
            <a-statistic extra="数字" :value="alpha.shuzi" animation/>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {CountChineseCharacters} from "@/until/statisticAlpha.js"
import {ref, reactive, watch} from "vue";
import {useHead} from "@unhead/vue";

export default {
  name: "statisticAlpha",
  setup() {
    useHead({
      title: '统计字数字符-在线工具箱'
    })
    let alpha = reactive({
      notWork: true,
      hanzi: 0,
      zishu: 0,
      biaodian: 0,
      zimu: 0,
      shuzi: 0,
      zifu: 0
    });
    let inputContent = ref("");

    function statisticAlpha() {
      const WordInfo = CountChineseCharacters(inputContent.value);
      alpha.zishu = WordInfo.zishu;
      alpha.zifu = WordInfo.zifu;
      alpha.hanzi = WordInfo.hanzi;
      alpha.biaodian = WordInfo.biaodian;
      alpha.zimu = WordInfo.zimu;
      alpha.shuzi = WordInfo.zishu
      alpha.zishu == 0 ? alpha.notWork = true : alpha.notWork = false
    };
    function cleanInput(){
      inputContent="";
    }
    watch(inputContent,()=>{
      statisticAlpha()
    })
    return {
      alpha, inputContent
    }
  }
}
</script>

<style scoped>

</style>
