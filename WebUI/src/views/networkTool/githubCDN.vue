<template>
  <div style="margin-top: 1rem" class="container">
    <a-row>
      <a-col id="tittle">
        <h1> Github文件加速</h1>
      </a-col>
    </a-row>
    <a-card style="text-align: left" title="请输入文件链接">
      <a-input required placeholder="请输入Github上文件/仓库地址"
               v-model="inputText"
               @input="inputUrl()"
               allow-clear search-button>
        <template #append>
          <a-button type="primary" status="warning" long style="height: 100%;width: 10rem"
                    :disabled="submitDisabled"
                    id="copyClick"
                    :data-clipboard-text="copyGitUrl"
                    @click="handleSubmit()">
            下载/克隆
          </a-button>
        </template>
      </a-input>
    </a-card>

    <a-row>
      <a-col>
        <a-typography style="text-align: left">
          <a-typography-title :heading="3">使用说明</a-typography-title>
          <a-typography-title :heading="5">加速模式</a-typography-title>
          <a-typography-paragraph>
            <ul>
              <li>Git仓库克隆：如果链接判断为Git仓库的克隆地址（HTTPS），那么点击<code>下载/克隆</code>按钮为克隆模式，即->
                复制
                <code>git clone $URL</code>到剪贴板，其中<code>$URL</code>为加速后的Git仓库克隆地址。
              </li>
              <li>文件下载模式：如果链接判断为GitHub上文件、发布文件，那么点击/<code>下载/克隆</code>按钮，会在新标签页进行加速下载。具体支持的文件见下文。
              </li>
            </ul>
          </a-typography-paragraph>

          <a-typography-title :heading="5">文件下载模式</a-typography-title>
          <a-typography-paragraph type="secondary">
            支持的文件地址（<code>release、archive</code>以及文件，右键复制出来的链接都是符合标准的）：
          </a-typography-paragraph>
          <a-typography-paragraph type="secondary">
            <ul>
              <li>分支源码：https://github.com/Mintimate/h5ai_M/<code>archive/master.zip</code></li>
              <li>release源码：https://github.com/Mintimate/h5ai_M/<code>archive/v0.1.0.tar.gz</code></li>
              <li>release文件：https://github.com/Mintimate/h5ai_M/<code>releases/download/v0.1.0/example.zip</code>
              </li>
              <li>分支文件：https://github.com/Mintimate/h5ai_M/<code>blob/master/filename</code></li>
            </ul>
          </a-typography-paragraph>
          <a-typography-paragraph type="secondary">
            所有文件会使用
            <a-link href="https://workers.cloudflare.com/" target="_blank">Cloudfare加速</a-link>
            跳转。
            文件会跳转至
            <a-link target="_blank" href="https://www.jsdelivr.com/">JSDelivr</a-link>
            ，Git会进行重定向，重定向到
            <a-link href="https://doc.fastgit.org/zh-cn/" target="_blank">Fastgit.org</a-link>
          </a-typography-paragraph>
          <a-typography-paragraph type="secondary">
            注意：公共免费资源，请合理、适度使用(*≧ω≦)。
          </a-typography-paragraph>
        </a-typography>
      </a-col>
    </a-row>
    <div class="row mt-5">
      <div class="col-12">
        <p class="text-center mt-5">
              <span style="font-size: small">
              基于MIT协议开源项目：
              <a-link href="https://github.com/Mintimate/gh-proxy" target="_blank">
                https://github.com/Mintimate/gh-proxy
              </a-link>
              </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import {nextTick, ref, watch} from "vue";
import {Notification} from "@arco-design/web-vue";

export default {
  name: "githubCDN",
  setup() {
    let workMode = ref("");
    let copyGitUrl = ref("");
    let submitDisabled = ref(true);
    let inputText = ref("");
    /** 输入时间 */
    const inputUrl = () => {
      if (new RegExp("^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive|blob|raw|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$")
        .test(inputText.value)) {
        submitDisabled.value = false
        workMode.value = "Download"
      } else if (
        new RegExp("^https://github.com/\\w+/(?:\\w|(?:\\.|\\-))+(?:.git)?$").test(inputText.value)
      ) {
        copyGitUrl.value = "git clone https://gh.flyinbug.top/gh/" + inputText.value
        submitDisabled.value = false
        workMode.value = "Git"
      } else {
        submitDisabled.value = true
      }
    };
    /** 进行加工 */
    const handleSubmit = async () => {
      if (workMode.value == "Git") {
        let clipboard = new Clipboard('#copyClick') // 这里可以理解为选择器，选择上面的复制按钮
        clipboard.on('success', e => {
          console.log(e)
          Notification.info({title: '复制全新的Git命令成功'})
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log(e)
          Notification.info({title: '浏览器权限不支持复制功能'})
          // 释放内存
          clipboard.destroy()
        })
      } else if (workMode.value == "Download") {
        if (isGithubFileURL(inputText.value)) {
          Notification.info({title: '定位成功，即将开始下载～'})
          await nextTick(
            // window.open("/ghs/" + this.githubURL)
            window.open("https://gh.flyinbug.top/gh/" + inputText.value)
          )
        }
      } else {
        this.$message("嗷～链接不是GitHub文件嗷……")
      }
    };
    /** 判断是否为Github */
    const isGithubFileURL = (url) => {
      const pattern = "^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive|blob|raw|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$"
      const re = new RegExp(pattern)
      return re.test(url)
    };
    return {
      inputText, submitDisabled, copyGitUrl,
      isGithubFileURL, inputUrl, handleSubmit
    }
  }
}
</script>

<style scoped>
.iconfont {
  font-family: "iconfont" !important;
  font-size: x-large;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}

/** 输入框大小 */
:deep(.arco-input-wrapper .arco-input) {
  line-height: 3;
}

:deep(.arco-input-append) {
  padding: 0;
}
</style>
