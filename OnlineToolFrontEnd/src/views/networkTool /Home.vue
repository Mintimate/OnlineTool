<template>
  <main>
    <div class="container text-center pt-3">
      <div class="pt-5 card">
        <h1 class="center">我的IP地址是多少呢？</h1>
        <h3 class="center pt-5">
          <code id="ip" class="ip">{{ UserIP }}</code>
        </h3>
        <div class="col-12 pb-3">
          <div style="font-size: small;" v-if="!IP_Detail.isDisabled">
            <span>地区：{{IP_Detail.area}}</span><br/>
            <span>备注：{{IP_Detail.remarks}}</span>
          </div>
        </div>
        <div class="col-12 pt-3">
          <div class="d-grid gap-2">
            <button
              :disabled="isDisabledBtn"
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
            <code>curl https://flyinbug.cn/getIP</code>
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
import {get, post} from "../../until/request";

export default {
  data() {
    return {
      DemoIMG: require("../../assets/IPUtils/Demo.png"),
      NotFoundIMG: require("../../assets/IPUtils/404.png"),
      IP_Detail: {
        isDisabled: true,
        area: undefined,
        remarks: undefined
      },
      isDisabledBtn: false,
      UserIP: "loading……"
    }
  },
  mounted() {
    get('/dataApiJava/getIP')
      .then(res => {
        const data = res.data
        this.UserIP = data
      })
      .catch(() => {
        this.UserIP = "连接失败，请重试！"
        this.isDisabledBtn = true
      })
  },
  methods: {
    getDetails() {
      let userIPData = new FormData();
      userIPData.append("ip", this.UserIP);
      this.isDisabledBtn = true;
      // 不支持IPv6
      if(/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(this.UserIP)){
        post("/dataApiPython/IP_Details", userIPData)
          .then(res => {
              this.IP_Detail.isDisabled = false
              this.IP_Detail.area = res.data.city
              this.IP_Detail.remarks = res.data.isp
            }
          )
          .catch((res) => {  //失败的回调
            this.$message("查询失败：IP回调异常！！！")
          })
      }
      else {
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
