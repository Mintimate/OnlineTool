<template>
  <div class="container">
    <div class="row pt-3">
      <div id="tittle" class="col-12 mt-2 mb-2 text-center">
        <h3>
          <strong>Curl短链接生成</strong>
        </h3>
      </div>
    </div>
    <div class="col-md-12">
      <div class="heroHome-2__left create-form">
        <div class="card rounded-10 bg-g-1 text-dark mb-0">
          <div class="card-body p-2 p-sm-3">
            <div class="row">
              <div class="form-group mb-3 col-12">
                <label class="form-label" for="fullURL">
                  请在下面输入需要缩短的长链接
                </label>
                <input id="fullURL" ref="fullURL" type="text" required="required"
                       class="form-control form-control-lg">
              </div>
              <div class="form-group mb-3 col-md-3">
                <label class="form-label" for="AlphaCode">
                  内测码
                </label>
                <input id="AlphaCode" ref="AlphaCode" type="text" required="required"
                       class="form-control form-control">
                  <small class="form-text text-muted">
                    <u><a href="javascript:void(0);" @click="getAlpahaCode">没有内测吗？如何获取内测码？</a></u>
                  </small>
              </div>
              <div class="form-group mb-3 col-md-12">
                <label for="domain">设置所属域名：</label>
                <div id="domain">
                  <div class="form-check form-check-inline">
                    <input @click="getRadioVal" checked name="domainRadios" class="form-check-input" type="radio" id="inlineCheckbox1" value="One">
                    <label class="form-check-label" for="inlineCheckbox1">curl.mintimate.ml</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input @click="getRadioVal" name="domainRadios" class="form-check-input" type="radio" id="inlineCheckbox2" value="Two">
                    <label class="form-check-label" for="inlineCheckbox2">curl.mintimate.cn</label>
                  </div>
                </div>

              </div>
              <div class="col-12">
                <div class="d-grid gap-2">
                  <button class="btn btn-warning" :class="{disabled: !canClick}" @click="getCurlURL" type="button">{{getShortURLBUTTON}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-12">
        <div class="card" id="copyArea">
          <h5 class="card-header">输出的结果</h5>
          <div class="card-body text-center">
            <code class="PWD" id="PWD">{{ newURL }}</code>
          </div>
            <el-button
                type="primary"
                id="copy-button"
                :data-clipboard-text="newURL"
                @click="copy">一键复制
            </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {jugeUrl,judgeCode} from "../../until/generateCurlURL"
import Clipboard from "clipboard";
import axios from "axios";

export default {
  name: "curl",
  data() {
    return {
      newURL: "Waiting……",
      getShortURLBUTTON: '生成短链接',
      totalTime: 10,
      canClick: true,  //添加canClick
      domainChoice:"One"
    }
  },
  methods: {
    getRadioVal(event){
      this.domainChoice = event.target.value;
      console.log(this.domainChoice);
    },
    getCurlURL() {
      if (this.$refs.fullURL.value == "") {
        this.$message.error("长链接不能为空嗷～")
        return;
      }
      if (!jugeUrl(this.$refs.fullURL.value)){
        this.$message.error("长链接不合法嗷～")
        return;
      }
      if (this.$refs.AlphaCode.value == "") {
        this.$message.error("邀请码不能为空嗷～")
        return;
      }
      if (!judgeCode(this.$refs.AlphaCode.value)){
        this.$message.error("邀请码不对嗷～")
        return;
      }
      let data = new FormData();
      let domainURL="";
      if(this.domainChoice=="One"){
        domainURL="https://curl.mintimate.ml"
      }
      else {
        domainURL="https://curl.mintimate.cn"
      }
      data.append("UserURL",this.$refs.fullURL.value);
      axios.post(domainURL+"/add",data)
          .then(({data}) => {
            if (!data.flag) {
              this.$message.error(data.message);
            } else {
              this.newURL = domainURL+"/" + data.data.shortCode;
            }
            if (!this.canClick) return   //改动的是这两行代码
            this.canClick = false
            this.content = this.totalTime + 's后可重新生成'
            let clock = window.setInterval(() => {
              this.totalTime--
              this.getShortURLBUTTON = this.totalTime + 's后可重新生成'
              if (this.totalTime < 0) {
                window.clearInterval(clock)
                this.getShortURLBUTTON = '生成短链接'
                this.totalTime = 10
                this.canClick = true   //这里重新开启
              }
            },1000)
          })
          .catch((res) => {  //失败的回调
            console.log(res)
            this.$message("服务器响应失败～")
          })
    },
    copy() {
      var clipboard = new Clipboard('#copy-button') // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on('success', () => {
        this.$message('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        // 不支持复制
        this.$message('手机权限不支持复制功能')
        // 释放内存
        clipboard.destroy()
      })
    },
    getAlpahaCode(){
      this.$message.warning("关注公众号：'MintimateBlog'，发送'curl'获取嗷～")
    }
  }
}
</script>

<style scoped>
code {
  border: 1px solid #cbcbcb;
  background: #f2f2f2;
  font-size: 1.8em;
  padding: 6px;
}
</style>
