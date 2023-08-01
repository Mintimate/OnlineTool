<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">统计字数字符</h1>
        </div>
        <div class="grid">
            <div>
                <UTextarea
                    v-model="inputContent"
                    style="height: 10rem"
                    resize
                    placeholder="输入(或粘贴)内容,并选择下列模式进行转化"
                    allow-clear
                />
            </div>
        </div>
        <div class="grid">
            <div class="text-right">
                <UButton :disabled="alpha.notWork" class="mx-0.5 my-3">
                    {{ alpha.notWork ? 'Waiting' : 'Working' }}
                </UButton>
                <UButton status="warning" @click="inputContent = ''">
                    全部清空!
                </UButton>
            </div>
        </div>
        <div class="text-center grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
            <div class="grid grid-cols-2 text-lg gap-6">
                <div class="col-span-2">
                    <span class="text-2xl">共计</span>
                </div>
                <div class="col-span-1">字数: {{ alpha.zishu }}</div>
                <div class="col-span-1">字符: {{ alpha.zifu }}</div>
            </div>
            <div class="grid grid-cols-2 text-lg gap-6">
                <div class="col-span-2">
                    <span class="text-2xl">包含</span>
                </div>
                <div class="col-span-1">汉字: {{ alpha.hanzi }}</div>
                <div class="col-span-1">标点(全角): {{ alpha.biaodian }}</div>
                <div class="col-span-1">字母: {{ alpha.zimu }}</div>
                <div class="col-span-1">数字: {{ alpha.shuzi }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CountChineseCharacters } from '~/untils/statisticAlpha.js';
import { ref, reactive, watch } from 'vue';

useHead({
    title: '统计字数字符-在线工具箱',
    meta: [
        {
            name: 'description',
            content: '在线统计字数，统计段落内的中文字数、字符字数和数字等。',
        },
        {
            name: 'keywords',
            content: '在线工具箱,统计字数,统计中文字数,统计数字,统计字母个数',
        },
    ],
});

let alpha = reactive({
    notWork: true,
    hanzi: 0,
    zishu: 0,
    biaodian: 0,
    zimu: 0,
    shuzi: 0,
    zifu: 0,
});
let inputContent = ref('');

function statisticAlpha() {
    const WordInfo = CountChineseCharacters(inputContent.value);
    alpha.zishu = WordInfo.zishu;
    alpha.zifu = WordInfo.zifu;
    alpha.hanzi = WordInfo.hanzi;
    alpha.biaodian = WordInfo.biaodian;
    alpha.zimu = WordInfo.zimu;
    alpha.shuzi = WordInfo.shuzi;
    alpha.zishu == 0 ? (alpha.notWork = true) : (alpha.notWork = false);
}

function cleanInput() {
    inputContent = '';
}

watch(inputContent, () => {
    statisticAlpha();
});
</script>

<style scoped></style>
