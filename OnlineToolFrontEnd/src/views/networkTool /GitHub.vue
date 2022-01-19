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
              <button @click="handleSubmit" type="button" class="btn btn-secondary">
                开始下载
              </button>
            </div>
            <small class="mt-1 text-muted">
              暂不支持git clone仓库嗷～
            </small>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <p class="card-header">使用说明</p>
              <div class="card-body">
                <div>
                  <p>GitHub文件链接带不带协议头都可以，支持<code>release、archive</code>以及文件，右键复制出来的链接都是符合标准的：</p>
                  <ul>
                    <li>分支源码：https://github.com/Mintimate/h5ai_M/<code>archive/master.zip</code></li>
                    <li>release源码：https://github.com/Mintimate/h5ai_M/<code>archive/v0.1.0.tar.gz</code></li>
                    <li>release文件：https://github.com/Mintimate/h5ai_M/<code>releases/download/v0.1.0/example.zip</code>
                    </li>
                    <li>分支文件：https://github.com/Mintimate/h5ai_M/<code>blob/master/filename</code></li>
                  </ul>
                  <p>release、archive使用<a href="https://workers.cloudflare.com/" target="_blank">Cloudfare加速</a>，文件会跳转至<a
                      target="_blank" href="https://www.jsdelivr.com/">JSDelivr</a>。</p>
                </div>
                <div>
                  注意：不支持<code>项目文件夹</code>、<code>Git Clone</code>（建议直接使用archive下载master代替）。
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
import axios from "axios";

export default {
  name: "GitHub",
  data() {
    return {
      githubURL: '',
    }
  },
  methods: {
    handleSubmit() {
      if (this.isGithubFileURL(this.githubURL)) {
        this.$message("定位成功，即将开始下载～")
        this.$nextTick(
            window.open("https://gh.mintimate.workers.dev/gh/" + this.githubURL)
        )
      } else {
        this.$message("嗷～链接不是GitHub文件嗷……")
      }
    },
    isGithubFileURL(url) {
      const pattern = "^((https|http):\/\/)?(github\.com\/.+?\/.+?\/(?:releases|archive|blob|raw|suites)|((?:raw|gist)\.(?:githubusercontent|github)\.com))\/.+$"
      const re = new RegExp(pattern)
      return re.test(url)
    }
  }
}
</script>

<style scoped>
.iconfont{
  font-family: "iconfont" !important;
  font-size: x-large;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}
</style>