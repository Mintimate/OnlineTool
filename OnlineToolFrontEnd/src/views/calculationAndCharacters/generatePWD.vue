<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-12 mt-2 mb-1 ">
        <div id="tittle" class="text-center">
							<span style="font-size: x-large;">
								<strong>在线强密码生成</strong>
							</span>
        </div>
        <div class="col-md-12 mt-2 mb-1">
          <div class="card" id="copyArea">
            <h5 class="card-header">密码复杂度：</h5>
            <div class="card-body row">
              <label class="col-xs-4 col-md-2 col-form-label">密码长度</label>
              <div class="col-xs-8 col-md-10 input-group-lg">
                <select name="length" ref="PWDLength" class="form-control col-md-4">
                  <option value="8">8位密码</option>
                  <option value="16" selected>16位密码</option>
                  <option value="32">32位密码</option>
                  <option value="64">64位密码</option>
                </select>
                <small class="text-muted">指定生成的密码的长度；通常，密码越长，密码强度越高，破解难度越大</small>
              </div>

              <label class="col-xs-4 col-md-2 col-form-label" for="password-include">密码包含</label>

              <div class="col-xs-8 col-md-10 " id="password-include">
                <div>
                  <div class="form-check-inline">
                    <input class="form-check-input" type="checkbox"
                           id="password-number" v-model="passwordNumber" checked/>
                    <label class="form-check-label" for="password-number">数字 0-9
                    </label>
                  </div>
                  <div class="  form-check-inline">
                    <input class="form-check-input" type="checkbox"
                           id="password-lowercase" v-model="passwordLowercase" checked/>
                    <label class="form-check-label" for="password-lowercase">小写字母 a-z
                    </label>
                  </div>

                  <div class=" form-check-inline">
                    <input class="form-check-input " type="checkbox"
                           id="password-uppercase" v-model="passwordUppercase" value="capital" checked>
                    <label class="form-check-label" for="password-uppercase">大写字母 A-Z
                    </label>
                  </div>
                  <div class=" form-check-inline">
                    <input class="form-check-input" type="checkbox"
                           id="password-special" v-model="passwordSpecial" checked/>
                    <label class="form-check-label" for="password-special"><span>特殊字符</span></label>
                  </div>
                </div>
                <small id="passwordHelpBlock" class="form-text text-muted">
                  指定密码的组成规则，要求至少选择一项（推荐勾选2项以上）
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 mt-3 text-center">
    <el-button type="primary" @click="getNewPWD">
      生成强密码
    </el-button>
    <br/>
  </div>
  <h6 class="text-center"><span style="font-size: small">此工具在您的设备上生成密码(客户端)<br/>
这些密码不会传送到我们的服务器</span></h6>
  <div class="container  pt-5">
    <div class="row">
      <div class="col-12 mt-2 mb-1 ">
        <div class="col-md-12 ">
          <div class="card ">
            <h5 class="card-header">生成的强密码：

            </h5>
            <div class="card-body text-center">
              <code class="PWD" id="PWD" >{{newPWD}}</code>
            </div>
            <div class="card-footer text-center">
              <span>密码建议：</span><span>{{tips}}</span>
            </div>
            <el-button
                type="primary"
                id="copy-button"
                    :data-clipboard-text="newPWD"
                    @click="copy">一键复制</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPWD} from "../../until/PWD/generate"
import {checkPWD} from "../../until/PWD/checkPWD"

import Clipboard from 'clipboard'

export default {
  name: "generatePWD",
  data(){
    return{
      newPWD:"loading……",
      tips:"",
      passwordNumber:true,
      passwordLowercase:true,
      passwordUppercase:true,
      passwordSpecial:true,
    }
  },
  mounted(){
    this.newPWD=getPWD(16,true,true,true,true).PWD;
    this.tips=checkPWD(this.newPWD)
  },
  methods:{
    getNewPWD(){
      let PWDLength=this.$refs.PWDLength.value
      let enableNumber=this.passwordNumber
      let enableLowerCase=this.passwordLowercase
      let enableUppercase=this.passwordUppercase
      let enableSpecial=this.passwordSpecial
      if (enableNumber==false&&enableSpecial==false&&enableUppercase==false&&enableLowerCase==false){
        this.newPWD="Error：至少勾选一项嗷～";
      }
      else {
        console.log(this.passwordNumber,this.passwordLowercase.value,this.passwordUppercase.value,this.passwordSpecial.value)
        let PWD=getPWD(PWDLength,this.passwordNumber,this.passwordLowercase,this.passwordUppercase,this.passwordSpecial);
        this.newPWD=PWD.PWD;
        this.tips=checkPWD(this.newPWD)
      }
    },
    copy () {
      var clipboard = new Clipboard('#copy-button') // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on('success', e => {
        this.$message('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message('手机权限不支持复制功能')
        // 释放内存
        clipboard.destroy()
      })
    }
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
