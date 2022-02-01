<template>
  <div class="container">
    <div class="row pt-3">
      <div id="tittle" class="col-12 mt-2 mb-3 text-center">
        <h3>
          <strong>Minecraft服务器状态检测</strong>
        </h3>
      </div>
    </div>
    <div class="card">
      <h2 class="card-header">请输入需要检测的服务器IP</h2>
      <div class="card-body row">
        <div class="input-group input-group-lg col-md-12 mb-1">
          <input type="text" ref="userServer"
                 v-model="MinecraftServerInfo.serverIP"
                 placeholder="hypixel.net / mc.hypixel.net / 192.168.3.1 / 192.168.3.1:25565" required
                 class="form-control">
          <div class="invalid-feedback">
            请输入服务器IP或域名
          </div>
          <button @click="getInfo" :class="{disabled: !canClick}" type="button" class="btn btn-primary">
            {{ getStatusButton }}
          </button>
        </div>
        <small class="mt-1 text-muted">
          不可检测局域网内游戏服务器嗷～
        </small>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 text-center">
        <el-switch
            style="display: block"
            v-model="WorkMode"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="检测Java服务器"
            inactive-text="检测Bedrock服务器"
        >
        </el-switch>
      </div>
    </div>
    <div class="card mt-5">
        <MCWaitingUser :isLoading="isLoading" :MinecraftServerInfo="MinecraftServerInfo"/>
    </div>
  </div>
</template>

<script>
import MCWaitingUser from "../components/MCWaitingUser";
import {post} from "../until/request";

export default {
  name: "mcstatus",
  components: {
    MCWaitingUser: MCWaitingUser
  },
  data() {
    return {
      isLoading: false,
      MinecraftServerInfo: {
        MinecraftTitle: "等待用户输入",
        MinecraftDescription: "等待用户输入",
        MinecraftPlayer: "等待用户输入",
        serverIP: "",
        Tips: "等待用户输入",
        isLoading: true,
      },
      WorkMode: true,
      getStatusButton: '一键检测',
      totalTime: 10,
      canClick: true,  //添加canClick
      domainChoice: "One"
    }
  },
  methods: {
    getInfo() {
      this.MinecraftServerInfo.isLoading=false
      this.isLoading = true
      if (!this.canClick) return   //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后可重新检测'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.getStatusButton = this.totalTime + 's后可重新检测'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.getStatusButton = '再次检测'
          this.totalTime = 10
          this.canClick = true   //这里重新开启
        }
      }, 1000)
      let serverIP = new FormData();
      if (this.WorkMode) {
        serverIP.append("method", 0);
      } else {
        serverIP.append("method", 1);
      }
      serverIP.append("serverIP", this.MinecraftServerInfo.serverIP);
      post("/dataApiPython/MC_Status", serverIP)
          .then(res => {
                console.log(res);
                this.MinecraftServerInfo.MinecraftDescription = res.data.description
                this.MinecraftServerInfo.MinecraftTitle = res.data.version;
                this.MinecraftServerInfo.MinecraftPlayer = res.data.players;
                if (res.status == 202) {
                  this.MinecraftServerInfo.Tips = "操作失败，远程服务器可能不在线！！！"
                } else {
                  this.MinecraftServerInfo.Tips = "操作成功，以上是远程服务器的信息嗷╮(￣▽￣\"\")╭"
                }
              }
          )
          .finally(res => {
            console.log(res)
            this.isLoading = false
          })
          .catch((res) => {  //失败的回调
            console.log(res)
            this.$message("响应超时，游戏远程服务器异常！！！")
          })
    }
  }
}
</script>

<style scoped>

#tips {
  background: var(--tips-color);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
