<template>
  <div>
    <metainfo>
    </metainfo>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="https://www.mintimate.cn" target="_blank">Mintimate</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                网络工具
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/">IP查询</a>
                </li>
                <li><a class="dropdown-item" href="/curl">短链接生成</a></li>
                <li>
                  <a class="dropdown-item" href="/gh">Github加速</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/processIMG">图片在线处理</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                字符/计算工具
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/randomNumber">范围随机数排列</a></li>
                <li><a class="dropdown-item" href="/statisticsChars">在线统计字数/符</a></li>
                <li><a class="dropdown-item" href="/textBase64">Base64编码互转</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item"
                       href="/calculateTheDate">日期计算</a></li>
                <li><a class="dropdown-item"
                       href="/generatePWD">强密码生成</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item"
                       href="https://mintimate.cn/about/#%E5%85%B3%E4%BA%8E%E6%88%91%E4%BB%AC">等待更新</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/mcstatus">MC服务器检测</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/mdv">Markdown渲染</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" target="_blank" href="https://mintimate.cn">个人博客</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" target="_blank" href="https://www.afdian.net/@mintimate/plan">
                <i class="iconfont icon-zhenzhunaicha"></i>
                赞助
              </a>
            </li>
            <li class="nav-item">
                    <span class="nav-link">
                        <i id="nightMode" class="iconfont icon-zhishifufeiqiapianicon-"></i>
                        纯粹的在线工具
                    </span>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <i @click="switchNightMode" id="xm"></i>
    <router-view></router-view>

  </div>
</template>

<script>
import {watchEffect} from 'vue'
import {useStore} from "vuex";
import {useMeta} from 'vue-meta'
import autoDark from "@/assets/autoDarkMode/js/autoDark"

export default {
  setup() {
    const store = useStore();
    const meta = useMeta({
      title: "在线工具箱-By Mintimate",
      meta: [
        {
          name: "keywords",
          content: "在线工具箱,便民根据,站点根据,开发者,开发者实用工具,IP查询,图片处理,Base64转码,字数统计,字符统计,MC服务器检测,Minecraft服务器检测"
        },
        {
          name: "description",
          content: "Mintimate的在线工具箱，致力于打造便民服务。为开发者、Minecraft游戏爱好者，创建方便的在线工具"
        }
      ]
    })
    watchEffect(() =>{
      meta.meta.title = store.state.metaModule.metaInfo.title
      meta.meta.meta[0].content = store.state.metaModule.metaInfo.keywords
      meta.meta.meta[1].content = store.state.metaModule.metaInfo.description
    })
    return autoDark
  },
  mounted() {
    autoDark.checkNightMode()
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
