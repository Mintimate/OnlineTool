<template>
  <main>
    <div class="container text-center pt-3">
      <div class="pt-5 card">
        <h1 class="center">我的IP地址是多少呢？</h1>
        <h3 class="center pt-5">
          <code id="ip" class="ip">{{ UserIP }}</code>
        </h3>
        <div class="col-12 pb-3">
          <div style="font-size: small;" v-if="!IP_DetailIsDisabled">
            <span>地区：{{ IP_Detail.mainInfo }}</span><br/>
            <span>备注：{{ IP_Detail.appendInfo }}</span>
          </div>
        </div>
        <div class="col-12 pt-3">
          <div class="d-grid gap-2">
            <button
              :disabled="!IP_DetailButtonDisabled"
              class="btn btn-warning"
              @click="getDetails"
              type="button">
              查看本机详情
            </button>
          </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-6 text-center">如果你是Linux/Mac用户，可以在终端输入</div>
          <div class="col-6 text-center">
            <code>curl https://tool.mintimate.cn/getIP</code>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-grid gap-2">
              <button class="btn btn-link " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
                      aria-expanded="false" aria-controls="collapseExample">
                查看用例
              </button>
            </div>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <img class="img-fluid" :src="DemoIMG">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="col-12 pt-3 text-center">
      <img :src="NotFoundIMG" class="w-50"/>
    </div>
  </main>
</template>
<script>
import {get, post} from "@/until/request";

export default {
  data() {
    return {
      DemoIMG: require("@/assets/IPUtils/Demo.png"),
      NotFoundIMG: require("@/assets/IPUtils/404.png"),
      IP_DetailIsDisabled: true,
      IP_DetailButtonDisabled: false,
      IP_Detail: {
        mainInfo: undefined,
        appendInfo: undefined
      },
      UserIP: "loading……"
    }
  },
  mounted() {
    get('/dataApiJava/IP/getIP')
      .then(res => {
        const data = res.data
        this.UserIP = data
        this.IP_DetailButtonDisabled = true
      })
      .catch(() => {
        this.UserIP = "连接失败，请重试！"
      })
  },
  methods: {
    getDetails() {
      // 不支持IPv6
      if (/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(this.UserIP)) {
        get("/dataApiJava/IP/getInfo/" + this.UserIP)
          .then(res => {
              this.IP_Detail = res.data
              this.IP_DetailIsDisabled = false
              this.IP_DetailButtonDisabled = false
            }
          )
          .catch((res) => {  //失败的回调
            console.log(res)
            this.$message("查询失败：IP回调异常！！！")
          })
      } else {
        this.$message("查询失败：IP格式不支持⁄(⁄ ⁄ ⁄ω⁄ ⁄ ⁄)⁄")
      }
    }
  }
}
</script>
<style>
.el-collapse-item {
  text-align: center;
}

.ip {
  border: 1px solid #cbcbcb;
  background: #f2f2f2;
  font-size: 36px;
  padding: 6px;
}
</style>
