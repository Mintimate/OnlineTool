<template>
  <div style="margin-top: 1.5rem">
    <a-row class="container">
      <a-col class="box">
        <h1 class="banner_text">在线工具箱</h1>
        <p style="margin-top: 0px" class="banner_text">识别本机IP地址</p>
        <h3 style="text-align: center">
          <code class="ip">119.233.239.182</code>
        </h3>
        <div style="text-align: center">
          <a-space>
            <a-tag color="orange">福建省厦门市</a-tag>
            <a-tag color="arcoblue">有线宽带(联通出口)</a-tag>
          </a-space>
        </div>
        <a-space style="margin-top: 1.5rem" class="full_width" direction="vertical">
          <a-button status="success" type="primary" size="large" long>
            <template #icon>
              <icon-code-square/>
            </template>
            <template #default>查看IP详细信息</template>
          </a-button>
        </a-space>
        <a-typography style="text-align: left;margin: 0.5rem">
          <a-typography-title :heading="5">
            如何在终端上直接查看本机IP？
          </a-typography-title>
          <a-typography-paragraph copy-text="curl https://tool.mintimate.cn/getIP" copyable>
            如果你是macOS用户或者Linux用户；在已经安装了curl情况下，可以直接在终端内输入：
            <u>curl https://tool.mintimate.cn/getIP</u>
          </a-typography-paragraph>
          <a-typography-title :heading="5">
            如何在Windows的Powershell上查看本机IP？
          </a-typography-title>
          <a-typography-paragraph>
            Windows无法原生Powershell发送Get/Post请求，所以无法使用本接口。
          </a-typography-paragraph>
          <a-typography-title :heading="5">
            是否存在调取次数限制？
          </a-typography-title>
          <a-typography-paragraph>
            本站的任何接口，均存在调取限制：当天单IP调取次数过于频繁，将封禁IP，避免资源被滥用。
          </a-typography-paragraph>
        </a-typography>
      </a-col>
    </a-row>
    <div style="text-align: center">
      <a-space>
        <img :src="NotFoundIMG" style="width: 100%"/>
      </a-space>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "ip.vue",
  setup() {
    onMounted(() => {
      handleImgSrc();
    })
    let NotFoundIMG = ref("");
    let curlGetIPDemo = ref("");
    const handleImgSrc = async () => {
      let m = await import("@/assets/IP_Utils/404.png");
      let c = await import("@/assets/IP_Utils/curlGetIPDemo.png")
      NotFoundIMG.value = m.default;
      curlGetIPDemo.value = c.default;
    };
    return {NotFoundIMG, curlGetIPDemo}
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .container, .container-sm {
    max-width: 540px;
  }
}


@media (min-width: 768px) {
  .container, .container-md, .container-sm {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container, .container-lg, .container-md, .container-sm {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container, .container-lg, .container-md, .container-sm, .container-xl {
    max-width: 1140px;
  }
}


.container {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

/** 背景 */
.box {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, .125);
  border-radius: 30px;
}

/** 头部标题 */
.banner_text {
  font-weight: 500;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

/** 代码 */
code {
  font-size: .875em;
  color: #d63384;
  word-wrap: break-word;
}

/** IP */
.ip {
  border: 1px solid #cbcbcb;
  letter-spacing: 0.3rem;
  background: #f2f2f2;
  font-size: 36px;
  padding: 6px;
}

/** 长按钮容器 */
.full_width {
  width: 100%;
}
</style>
