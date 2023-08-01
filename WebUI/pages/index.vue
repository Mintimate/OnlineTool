<template>
    <div style="margin-top: 1.5rem">
        <div class="container-lg text-center mx-auto">
            <div class="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 mx-3">
                <h1 class="text-4xl font-medium tracking-widest m-1.5">
                    在线工具箱
                </h1>
                <p class="text-sm mt-0">识别本机IP地址</p>
                <h3 class="text-center my-4">
                    <code class="ip">{{ userIP }}</code>
                </h3>
                <div style="text-align: center">
                    <div v-if="userIP_Info.display">
                        <span
                            class="text-xs text-pink-500 bg-blue-400/25 rounded-lg p-1 mx-0.5"
                        >
                            {{ userIP_Info.area }}
                        </span>
                        <span
                            class="text-xs text-orange-500 bg-blue-400/25 rounded-lg p-1 mx-0.5"
                        >
                            {{ userIP_Info.remark }}
                        </span>
                    </div>
                </div>
                <div
                    style="margin-top: 1.5rem"
                    class="full_width"
                    direction="vertical"
                >
                    <UButton
                        @click="getIP_Info(userIP)"
                        :disabled="userIP_Info.display"
                        block
                        icon="i-heroicons-code-bracket"
                    >
                        <template #default>查看IP详细信息</template>
                    </UButton>
                </div>
                <div class="text-left my-5">
                    <div class="my-3">
                        <p class="text-lg">如何在终端上直接查看本机IP？</p>
                        <p class="text-sm">
                            如果你是macOS用户或者Linux用户；在已经安装了curl情况下，可以直接在终端内输入：
                            <u>curl https://tool.mintimate.cn/getIP</u>
                            <UIcon
                                @click="copyCommandTool"
                                class="cursor-pointer"
                                name="i-ic-baseline-file-copy"
                            />
                        </p>
                    </div>
                    <div class="my-3">
                        <p class="text-lg">
                            如何在Windows的Powershell上查看本机IP？
                        </p>
                        <p class="text-sm">
                            Windows无法原生Powershell发送Get/Post请求，所以无法使用本接口。
                        </p>
                    </div>
                    <div class="my-3">
                        <p class="text-lg">是否存在调取次数限制？</p>
                        <p class="text-sm">
                            本站的任何接口，均存在调取限制：当天单IP调取次数过于频繁，将封禁IP，避免资源被滥用。
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center w-100 mx-auto my-7">
            <img :src="NotFoundIMG" class="mx-auto" />
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { get } from '~/untils/request.js';

const toast = useToast();

useHead({
    title: '在线工具箱-By Mintimate',
    meta: [
        {
            name: 'description',
            content:
                'Mintimate的在线工具箱，致力于打造便民服务。为开发者、Minecraft游戏爱好者，创建方便的在线工具',
        },
        {
            name: 'keywords',
            content:
                '在线工具箱,便民工具,站点工具,开发者,开发者实用工具,IP查询,图片处理,Base64转码,字数统计,字符统计,MC服务器检测,Minecraft服务器检测',
        },
    ],
});
let userIP = ref('...加载中...');
let userIP_Info = reactive({
    display: false,
    area: '',
    remark: '',
});
onMounted(() => {
    handleImgSrc();
    get('/IP/getBase').then((resp) => {
        userIP.value = resp.data;
    });
});
let NotFoundIMG = ref('');
let curlGetIPDemo = ref('');
const handleImgSrc = async () => {
    let m = await import('@/assets/IP_Utils/index.png');
    let c = await import('@/assets/IP_Utils/curlGetIPDemo.png');
    NotFoundIMG.value = m.default;
    curlGetIPDemo.value = c.default;
};

function getIP_Info(ip) {
    get('/IP/getInfo/' + ip.toString()).then((resp) => {
        userIP_Info.display = true;
        userIP_Info.area = resp.data.mainInfo;
        userIP_Info.remark = resp.data.appendInfo;
    });
}

/** 点击复制IP检测命令 */
const copyCommandTool = () => {
    const text = 'curl https://tool.mintimate.cn/getIP';
    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.add({
                id: 'Module Error',
                title: '复制成功',
                description: '快去粘贴吧',
                icon: 'i-heroicons-face-smile-20-solid',
                timeout: 5000,
            });
        })
        .catch(() => {
            toast.add({
                id: 'Module Error',
                title: '复制失败',
                description: '请手动复制',
                icon: 'i-heroicons-face-frown-20-solid',
                timeout: 5000,
            });
        });
};
</script>

<style scoped>
/** 背景 */
.box {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: var(--color-bg-5);
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 30px;
}

/** 代码 */
code {
    font-size: 0.875em;
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
