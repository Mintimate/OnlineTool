<template>
  <div class="container">
    <div class="row pt-3">
      <div id="tittle" class="col-12 mt-2 mb-1 text-center">
            <span style="font-size: x-large;">
              <strong>在线Base64解码/编码</strong>
            </span>
      </div>
      <div class="col-12 text-center">
          <textarea class="form-control"
                    v-model="inputContent"
                    placeholder="输入(或粘贴)内容,并选择下列模式进行转化"
                    rows="8"
                    autofocus></textarea>
      </div>
      <div class="row pt-3 pb-3">
        <div class="col-12 text-center">
          <el-switch
              style="display: block"
              v-model="WorkMode"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Text->Base64"
              inactive-text="Base64->Text"
              @change="changeWorkMode"
          >
          </el-switch>
          <el-button @click="Test"></el-button>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-12 text-center">
          <textarea class="form-control" placeholder="此处显示输出结果" rows="8"
                    id="outputContent" disabled>{{outputText}}</textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {dealWithText} from "../../until/Base64Core.js"

export default {
  name: "textBase64",
  data() {
    return {
      WorkMode: true,
      inputContent:"",
      outputText:null,
    }
  },
  computed:{
    outputText(){
      return dealWithText(this.inputContent,this.WorkMode)
    }
  },
  methods:{
    Test(){
      console.log(this.$store.state.sum);
    }
  }
}
</script>

<style scoped>

</style>
