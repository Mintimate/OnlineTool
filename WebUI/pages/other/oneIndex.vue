<template>
  <div class="container text-center px-3 mx-auto">
    <div class="my-5">
      <h1 class="text-3xl">OneIndex桥接</h1>
      <p class="text-sm">一个简单的回退页面</p>
    </div>
    <div class="grid grid-cols-12">
      <div class="text-left mt-3 col-span-12">
        <UCard>
        <template v-slot:header>操作提示</template>
          <div class="card-body" style="text-align: center">
            <code v-if="newLinkDisabled">{{ info }}</code>
            <div v-else class="d-grid gap-2 col-6 mx-auto">
              <a :href="newLink" class="text-orange" target="_self">点击这里，继续安装</a>
            </div>
          </div>
        </UCard>
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="text-left mt-3 col-span-12">
        <UCard>
          <template v-slot:header>使用说明</template>
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
        </UCard>
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
  background: var(--color-bg-3);
  font-size: 2.5rem;
  padding: 6px;
}
</style>
