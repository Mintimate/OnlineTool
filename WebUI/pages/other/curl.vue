<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">短链接生成</h1>
        </div>
        <UCard class="text-left mb-5">
            <template #header>请在下面输入需要缩短的长链接</template>

            <div class="grid grid-cols-12 mt-1 gap-6">
                <div class="col-span-12">
                    <UFormGroup help="由后台生成的短链接，重定向到该源。">
                        <UInput
                            v-model="fullUrl"
                            size="xl"
                            placeholder="请输入源地址"
                            icon="i-simple-icons-github"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                        ></UInput>
                    </UFormGroup>
                </div>
                <div class="col-span-6">
                    <UFormGroup
                        label="内测码"
                        help="系统暂时只给受邀用户权限。"
                    >
                        <UInput v-model="endDate" icon="i-heroicons-envelope" />
                    </UFormGroup>
                </div>
                <div class="col-span-6">
                    <UFormGroup
                        label="备注"
                        help="仅用于开发者维护使用（可选）。"
                    >
                        <UInput v-model="endDate" icon="i-heroicons-envelope" />
                    </UFormGroup>
                </div>
                <div class="col-span-12">
                  <UFormGroup
                      label="设置所属域名"
                  >
                    <URadio v-model="targetUrl" label="curl.mintimate.cn" value="curl.mintimate.cn"/>
                    <URadio v-model="targetUrl" label="curl.mintimate.ml" value="curl.mintimate.ml"/>
                  </UFormGroup>
                </div>
            </div>
        </UCard>
        <div class="grid">
            <UButton
                :label="displayTextForButton"
                :disabled="disabledButton"
                @click="generateUrl()"
                block
            />
        </div>

        <div class="grid grid-cols-1 mt-6">
            <span class="code">{{ shortUrl }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { judgeUrl } from '~/untils/UrlUtil.js';

let shortUrl = ref('等待用户操作');
let verifyCode = ref('');
let remark = ref('');
let fullUrl = ref('');
let targetUrl = ref('');
let displayTextForButton = ref('生成短链接');
let disabledTimer = ref(0);
const disabledButton = computed(() => disabledTimer.value > 0);

watch(disabledTimer, (value) => {
    if (value <= 0) {
        displayTextForButton.value = '生成短链接';
    }
});
const getAlphaCode = () => {
    Message.warning('因为资源滥用，已经停止分发内测码。');
};
const generateUrl = () => {
    disabledTimer.value = 5;
    displayTextForButton.value = '请再等待...';
    const intervalId = setInterval(() => {
        displayTextForButton.value = '请再等待...' + disabledTimer.value + 's';
        disabledTimer.value--;
        if (disabledTimer.value < 0) {
            clearInterval(intervalId);
        }
    }, 1000);
    if (!judgeUrl(fullUrl.value)) {
        Message.warning('源地址校验失败，请检查');
    }
};
</script>

<style scoped>
.code {
    margin: 0 2px;
    color: var(--color-text-2);
    background-color: var(--color-neutral-2);
    border: 1px solid var(--color-neutral-3);
    border-radius: 2px;
    font-size: 2rem;
    padding: 6px;
}
</style>
