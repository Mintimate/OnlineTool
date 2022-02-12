<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-12 mt-2 mb-1">
        <div id="tittle" class="text-center">
							<span style="font-size: x-large;">
								<strong>
                  OneIndex桥接
                </strong>
							</span>
        </div>
        <div class="card">
          <h5 class="card-header">操作提示</h5>
          <div class="card-body text-center">
            <code v-if="newLinkDisabled">{{ info }}</code>
            <div v-else class="d-grid gap-2 col-6 mx-auto">
              <a class="btn btn-success" :href=newLink target="_self">点击这里，继续安装</a>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <p class="card-header">使用说明</p>
              <div class="card-body">
                <div>
                  <p>警告⚠️:</p>
                  <ul>
                    <li><strong>请勿浏览器地址栏直接访问本页面=>没有任何实际作用，出了看到"构建失败"的提示。</strong></li>
                  </ul>
                  <p>桥接模式:</p>
                  <ul>
                    <li>通过伪静态，让OneDrive服务器 ，以为是App重定向验证任务</li>
                  </ul>
                  <p>教程&资源</p>
                  <ul>
                    <li>OneIndexM仓库地址：https://github.com/Mintimate/OneindexM</li>
                    <li>搭建教程：https://www.mintimate.cn/2020/09/22/oneindex/</li>
                  </ul>
                </div>
                <div>
                  注意：公共免费资源，请合理、适度使用(*≧ω≦)。
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router"
import {ref} from "vue";

export default {
  name: "oneIndex",
  setup() {
    let info = ref("……等待程序响应……")
    let newLink
    let newLinkDisabled = ref(true)
    const query = useRoute().query
    const url = query.state
    const code = query.code
    function makeLink() {
      if (url == undefined || code == undefined) {
        console.log("构建失败")
        this.info = "构建失败，请重新调试"
      } else {
        this.newLinkDisabled = false
        this.newLink = decodeURIComponent(url) + "?code=" + code
      }
    };
    return {
      newLink,
      newLinkDisabled,
      info,
      makeLink,
    }
  },
  mounted() {
    this.makeLink()
  }
}
</script>

<style scoped>
code {
  border: 1px solid #cbcbcb;
  background: #f2f2f2;
  font-size: 2.5rem;
  padding: 6px;
}
</style>
