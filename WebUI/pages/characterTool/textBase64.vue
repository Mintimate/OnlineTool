<template>
    <div class="container text-center px-3 mx-auto">
        <div class="my-5">
            <h1 class="text-3xl">Base64解码/编码</h1>
        </div>
        <div class="grid grid-cols-1">
            <UTextarea
                v-model="inputContent"
                style="height: 10rem"
                placeholder="输入(或粘贴)内容,并选择下列模式进行转化"
                allow-clear
            />
        </div>
        <div class="grid grid-cols-1">
            <div class="my-3 flex items-center justify-center">
                <UToggle
                    v-model="WorkMode"
                    on-icon="i-ic-baseline-sort-by-alpha"
                    off-icon="i-ic-baseline-spellcheck"
                />
                <span class="mx-3">
                    {{ WorkMode ? 'Text->Base64' : 'Base64->Text' }}
                </span>
            </div>
        </div>
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <p class="text-xl text-left mt-5">转码后信息如下：</p>
          <div class="grid grid-cols-1">
            <UTextarea
                v-model="outputText"
                class="cursor-text"
                disabled
                style="height: 18rem"
                placeholder="等待用户指令"
            />
          </div>
        </div>
        <div class="my-3 flex items-center justify-end">
          <UButton
              class="mx-2"
              :disabled="inputContent.length === 0"
              @click="inputContent = ''"
              size="xs"
              label="清空输入"
          />
          <UButton
              @click="copyTheOutPutText()"
              :disabled="outputText.length === 0"
              size="xs"
              label="复制内容"
          />
        </div>
      </div>
    </div>
</template>

<script setup>
import { Base64 } from 'js-base64';
import { ref, computed } from 'vue';

const toast = useToast();

useHead({
    title: 'Base64文字互转-在线工具箱',
    meta: [
        {
            name: 'description',
            content:
                '在线对文字的内容进行Base64转码，或者把Base64内容转回文字内容。',
        },
        {
            name: 'keywords',
            content: '在线工具箱,Base64转码,Base64',
        },
    ],
});

let WorkMode = ref(true);
let inputContent = ref('HelloWorld');
// 计算结果
let outputText = computed(() => {
    const decodeTemp = Base64.decode(inputContent.value);
    return WorkMode.value
        ? Base64.encode(inputContent.value)
        : /^data:.*;base64,([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(
              decodeTemp,
          )
        ? decodeTemp
        : '被玩怀了(╯—_—)╯( ┷━━━┷ ';
});

/** 复制生成的转码后 */
const copyTheOutPutText = () => {
  const text = outputText.value;
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

<style scoped></style>
