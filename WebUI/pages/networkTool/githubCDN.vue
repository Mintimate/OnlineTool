<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">Github文件加速</h1>
        </div>
      <UCard class="text-left mb-5">
        <template #header>
          请输入文件链接
        </template>
        <UInput v-model="inputText"
                @input="inputUrl()"
                size="xl"
                placeholder="请输入Github上文件/仓库地址" icon="i-simple-icons-github" :ui="{ icon: { trailing: { pointer: '' } } }">
          <template #trailing>
            <UButton
                color="gray"
                label="下载/克隆"
                variant="link"
                :padded="false"
                @click="handleSubmit()"
            />
          </template>
        </UInput>

      </UCard>
        <div class="leading-loose">
            <div class="text-left">
                <p class="text-xl">使用说明</p>
                <p class="text-lg mt-3">加速模式</p>
                <p class="text-sm">
                    <ul class="list-disc list-outside ml-3">
                        <li>
                            Git仓库克隆：如果链接判断为Git仓库的克隆地址（HTTPS），那么点击
                            <code>下载/克隆</code>
                            按钮为克隆模式，即-> 复制
                            <code>git clone $URL</code>
                            到剪贴板，其中
                            <code>$URL</code>
                            为加速后的Git仓库克隆地址。
                        </li>
                        <li>
                            文件下载模式：如果链接判断为GitHub上文件、发布文件，那么点击/
                            <code>下载/克隆</code>
                            按钮，会在新标签页进行加速下载。具体支持的文件见下文。
                        </li>
                    </ul>
                </p>
                <p class="text-lg mt-3">文件下载模式</p>
                <p class="text-sm">
                    支持的文件地址（
                    <code>release、archive</code>
                    以及文件，右键复制出来的链接都是符合标准的）：
                </p>
                <p class="text-sm">
                    <ul class="list-disc list-outside ml-3">
                        <li>
                            分支源码：https://github.com/Mintimate/h5ai_M/
                            <code>archive/master.zip</code>
                        </li>
                        <li>
                            release源码：https://github.com/Mintimate/h5ai_M/
                            <code>archive/v0.1.0.tar.gz</code>
                        </li>
                        <li>
                            release文件：https://github.com/Mintimate/h5ai_M/
                            <code>releases/download/v0.1.0/example.zip</code>
                        </li>
                        <li>
                            分支文件：https://github.com/Mintimate/h5ai_M/
                            <code>blob/master/filename</code>
                        </li>
                    </ul>
                </p>
                <p class="text-sm">
                    所有文件会使用
                    <a
                        href="https://workers.cloudflare.com/"
                        target="_blank"
                    >
                        Cloudfare加速
                    </a>
                    跳转。 文件会跳转至
                    <a target="_blank" href="https://www.jsdelivr.com/">
                        JSDelivr
                    </a>
                    ，Git会进行重定向，重定向到
                    <a
                        href="https://doc.fastgit.org/zh-cn/"
                        target="_blank"
                    >
                        Fastgit.org
                    </a>
                </p>
                <p class="text-sm">
                    注意：公共免费资源，请合理、适度使用(*≧ω≦)。
                </p>
            </div>
        </div>
        <div class="grid grid-cols-12 mt-5">
            <div class="col-span-12">
                <p class="text-center mt-5">
                    <span style="font-size: small">
                        基于MIT协议开源项目：
                        <a
                            href="https://github.com/Mintimate/gh-proxy"
                            target="_blank"
                        >
                            https://github.com/Mintimate/gh-proxy
                        </a>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Clipboard from 'clipboard';
import { nextTick, ref, watch } from 'vue';
const toast = useToast()

useHead({
    title: 'Github加速-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '在线重定向Github链接，使用CloudFlare对Github链接进行加速访问。',
        },
        {
            name: 'keywords',
            content: '在线工具箱,Github下载加速,Github文件加速',
        },
    ],
});

let workMode = ref('');
let copyGitUrl = ref('');
let submitDisabled = ref(true);
let inputText = ref('');
/** 输入时间 */
const inputUrl = () => {
    if (
        new RegExp(
        '^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive/.*|blob/.*|raw/.*|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$'
    ).test(inputText.value)
    ) {
        submitDisabled.value = false;
        workMode.value = 'Download';
    } else if (
        new RegExp(
            '^https://github.com/\\w+/(?:\\w|(?:\\.|\\-))+(?:.git)?$',
        ).test(inputText.value)
    ) {
        copyGitUrl.value =
            'git clone https://gh.flyinbug.top/gh/' + inputText.value;
        submitDisabled.value = false;
        workMode.value = 'Git';
    } else {
      console.log("Not")
        submitDisabled.value = true;
    }
};
/** 进行加工 */
const handleSubmit = async () => {
    if (workMode.value == 'Git') {
        let clipboard = new Clipboard('#copyClick'); // 这里可以理解为选择器，选择上面的复制按钮
        clipboard.on('success', (e) => {
            console.log(e);
          toast.add({
            title: '复制全新的Git命令成功',
            timeout: 5000
          })
            // 释放内存
            clipboard.destroy();
        });
        clipboard.on('error', (e) => {
            // 不支持复制
            console.log(e);
          toast.add({
            title: '浏览器权限不支持复制功能',
            timeout: 5000
          })
            // 释放内存
            clipboard.destroy();
        });
    } else if (workMode.value == 'Download') {
        if (isGithubFileURL(inputText.value)) {
          toast.add({
            title: '定位成功，即将开始下载～',
            timeout: 5000
          })
            await nextTick(
                // window.open("/ghs/" + this.githubURL)
                window.open('https://gh.flyinbug.top/gh/' + inputText.value),
            );
        }
    } else {
      console.log("!!")
      toast.add({
        title: '嗷～链接不是GitHub文件嗷……',
        timeout: 5000
      })
    }
};
/** 判断是否为Github */
const isGithubFileURL = (url) => {
    const pattern =
        '^((https|http)://)?(github.com/.+?/.+?/(?:releases|archive|blob|raw|suites)|((?:raw|gist).(?:githubusercontent|github).com))/.+$';
    const re = new RegExp(pattern);
    return re.test(url);
};
</script>

<style scoped>
.iconfont {
    font-family: 'iconfont' !important;
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
