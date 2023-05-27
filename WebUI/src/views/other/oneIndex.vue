<template>
  <div style="margin-top: 1rem" class="container">
    <a-row>
      <a-col id="tittle">
        <h1>OneIndex桥接</h1>
        <h5>一个简单的回退页面</h5>
      </a-col>
    </a-row>
    <a-row>
      <a-col style="text-align: left;margin-top: 2rem">
        <a-card title="操作提示">
          <div class="card-body" style="text-align: center">
            <code v-if="newLinkDisabled">{{ info }}</code>
            <div v-else class="d-grid gap-2 col-6 mx-auto">
              <a-link :href="newLink" status="success" target="_self">点击这里，继续安装</a-link>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col style="text-align: left;margin-top: 2rem">
        <a-card title="使用说明">
          <div>
            <p>警告⚠️:</p>
            <ul>
              <li><strong>请勿浏览器地址栏直接访问本页面=>没有任何实际作用，只会看到"构建失败"的提示。</strong></li>
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
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {useRoute} from "vue-router"
import {ref} from "vue";

export default {
  name: "oneIndex",
  setup() {
    let info = ref("……等待程序响应……");
    let newLink =ref();
    let newLinkDisabled = ref(true);
    const query = useRoute().query;
    const url = query.state;
    const code = query.code
    /** 生成按钮 */
    const makeLink=()=> {
      if (url == undefined || code == undefined) {
        info.value = "构建失败，请重新调试"
      } else {
        newLinkDisabled.value = false
        newLink.value = decodeURIComponent(url) + "?code=" + code
      }
    };
    makeLink();
    return {
      newLink,
      newLinkDisabled,
      info,
      makeLink
    }
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
