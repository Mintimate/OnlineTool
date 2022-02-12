<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-12 mt-2 mb-1">
        <div id="tittle" class="text-center">
							<span style="font-size: x-large;">
								<strong>
                  <i id="nightMode" class="iconfont icon--github"></i>
                  Github文件加速
                </strong>
							</span>
        </div>
        <div class="card">
          <h5 class="card-header">请输入文件链接</h5>
          <div class="card-body row">
            <div class="input-group input-group-lg col-md-12 mb-1">
              <input type="text" ref="userServer"
                     v-model="githubURL"
                     placeholder="请输入GitHub上的文件链接" required
                     class="form-control">
              <div class="invalid-feedback">
                Github文件链接
              </div>
              <button :disabled="submitDisabled"
                      id="copyClick"
                      :data-clipboard-text="copyGitUrl"
                      @click="handleSubmit"
                      type="button"
                      class="btn btn-secondary">
                下载/克隆
              </button>
            </div>
            <small class="mt-1 text-muted">
              支持git clone仓库嗷～
            </small>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <p class="card-header">使用说明</p>
              <div class="card-body">
                <div>
                  <p>加速模式:</p>
                  <ul>
                    <li>Git仓库克隆：如果链接判断为Git仓库的克隆地址（HTTPS），那么点击<code>下载/克隆</code>按钮为克隆模式，即-> 复制
                      <code>git clone $URL</code>到剪贴板，其中<code>$URL</code>为加速后的Git仓库克隆地址。</li>
                    <li>文件下载模式：如果链接判断为GitHub上文件、发布文件，那么点击/<code>下载/克隆</code>按钮，会在新标签页进行加速下载。具体支持的文件见下文。</li>
                  </ul>
                  <p>文件下载模式：</p>
                  <p>支持的文件地址（<code>release、archive</code>以及文件，右键复制出来的链接都是符合标准的）：</p>
                  <ul>
                    <li>分支源码：https://github.com/Mintimate/h5ai_M/<code>archive/master.zip</code></li>
                    <li>release源码：https://github.com/Mintimate/h5ai_M/<code>archive/v0.1.0.tar.gz</code></li>
                    <li>release文件：https://github.com/Mintimate/h5ai_M/<code>releases/download/v0.1.0/example.zip</code>
                    </li>
                    <li>分支文件：https://github.com/Mintimate/h5ai_M/<code>blob/master/filename</code></li>
                  </ul>
                  <p>所有文件会使用<a href="https://workers.cloudflare.com/" target="_blank">Cloudfare加速</a>跳转。
                    文件会跳转至<a
                    target="_blank" href="https://www.jsdelivr.com/">JSDelivr</a>，Git会进行重定向，重定向到<a href="https://cnpmjs.org" target="_blank">Cnpmjs.org</a> </p>
                </div>
                <div>
                  注意：公共免费资源，请合理、适度使用(*≧ω≦)。
                </div>
              </div>
            </div>
            <p class="text-center mt-5">
              <span style="font-size: xx-small">
              基于GPL开源项目：
              <a href="https://github.com/hunshcn/gh-proxy" target="_blank">
                https://github.com/hunshcn/gh-proxy
              </a>
              </span>
            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  name: "GitHub",
  data() {
    return {
      githubURL: '',
      workMode: "",
      copyGitUrl: '',
      submitDisabled: true
    }
  },
  methods: {
    handleSubmit() {
      if (this.workMode == "Git") {
        this.copy()
      } else if (this.workMode == "Download") {
        if (this.isGithubFileURL(this.githubURL)) {
          this.$message("定位成功，即将开始下载～")
          this.$nextTick(
            window.open("/ghs/" + this.githubURL)
          )
        }
      } else {
        this.$message("嗷～链接不是GitHub文件嗷……")
      }
    },
    isGithubFileURL(url) {
      const pattern = "^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive|blob|raw|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$"
      const re = new RegExp(pattern)
      return re.test(url)
    },
    copy() {
      let clipboard = new Clipboard('#copyClick') // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on('success', e => {
        console.log(e)
        this.$message('复制全新的Git命令成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log(e)
        this.$message('浏览器权限不支持复制功能')
        // 释放内存
        clipboard.destroy()
      })
    }
  },
  watch: {
    githubURL(newValue) {
      if (new RegExp("^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive|blob|raw|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$").test(newValue)) {
        this.submitDisabled = false
        this.workMode="Download"
      } else if (
        new RegExp("^https://github.com/\\w+/(?:\\w|(?:\\.|\\-))+(?:.git)?$").test(newValue)
      ) {
        this.copyGitUrl="git clone "+window.location.origin+"/ghs/" +newValue
        this.submitDisabled = false
        this.workMode="Git"
      } else {
        this.submitDisabled = true
      }
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
</style>
