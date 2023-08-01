<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">在线随机数生成器</h1>
        </div>
        <div class="grid lg:grid-cols-2 sm:grid-cols-1 text-left gap-5">
            <div>
                <UFormGroup label="生成个数" description="生成随机数的个数">
                    <UInput
                        v-model="totalNum"
                        placeholder="仅支持数字"
                        type="number"
                        icon="i-ic-outline-format-list-numbered"
                    />
                </UFormGroup>
            </div>
            <div>
                <UFormGroup label="最小值" description="生成随机数的最小值">
                    <UInput
                        v-model="minNum"
                        placeholder="仅支持数字"
                        type="number"
                        icon="i-ic-twotone-auto-awesome"
                    />
                </UFormGroup>
            </div>
            <div>
                <UFormGroup label="最大值" description="生成随机数的最大值">
                    <UInput
                        v-model="maxNum"
                        placeholder="仅支持数字"
                        type="number"
                        icon="i-ic-round-auto-awesome"
                    />
                </UFormGroup>
            </div>
            <div>
                <UFormGroup label="生成个数" description="生成随机数的个数">
                    <USelect
                        v-model="genMode"
                        placeholder="请选择模式"
                        :options="[
                            { name: '唯一(不重复)', value: 'only' },
                            { name: '随意(可重复)', value: 'random' },
                        ]"
                        option-attribute="name"
                        icon="i-ic-baseline-auto-mode"
                    />
                </UFormGroup>
            </div>
        </div>
        <div class="my-6">
            <UButton block @click="ListNotRepeat">生成</UButton>
        </div>
        <div class="my-5 flex justify-center items-end">
            <div>
                <span class="code">{{ randomOutPut }}</span><UIcon @click="copyOutPutRandom()" class="cursor-pointer" name="i-ic-baseline-file-copy"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getListNotRepeat, getListEnableRepeat } from '~/untils/randomNumList';
import { ref } from 'vue';

const toast = useToast();

useHead({
    title: '范围随机数生成-在线工具箱',
    meta: [
        {
            name: 'description',
            content: '在线生成范围内的随机数，随机生成范围内多个随机数。',
        },
        {
            name: 'keywords',
            content: '在线工具箱,范围随机数生成,随机数生成,随机数,随机数生成',
        },
    ],
});

let randomOutPut = ref('等待用户操作╮(￣▽￣"")╭');
let minNum = ref(0);
let maxNum = ref(0);
let totalNum = ref(0);
let genMode = ref('only');

function ListNotRepeat() {
    if (totalNum.value < 0) {
        Notification.warning({
            title: '参数错误',
            content: '生成的总个数不得为零',
        });
        return;
    }
    if (genMode.value == 'only') {
        if (maxNum.value - minNum.value < totalNum.value) {
            randomOutPut.value = '错了嗷～范围内没这么多数字啦!!!';
        } else if (maxNum.value < minNum.value) {
            randomOutPut.value = '错了嗷～最大值不应该小于最小值!!!';
        } else {
            let Number = getListNotRepeat(
                minNum.value,
                maxNum.value,
                totalNum.value,
            );
            randomOutPut.value = Number;
        }
    } else {
        let Number = getListEnableRepeat(
            minNum.value,
            maxNum.value,
            totalNum.value,
        );
        randomOutPut.value = Number;
    }
}


/** 点击复制输出结果 */
const copyOutPutRandom = () => {
  const text = randomOutPut.value;
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
.code {
    margin: 0 2px;
    padding: 2px 8px;
    color: var(--color-text-2);
    background-color: var(--color-neutral-2);
    border: 1px solid var(--color-neutral-3);
    border-radius: 2px;
    border: 1px solid #cbcbcb;
    font-size: 2rem;
    padding: 6px;
}
</style>
