<script setup>
useHead({
  title: '乐谱长链生成器-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '对给定的超链接/URL，进行编码，生成长链接。没什么特殊意义，但是有趣~ 快来编写你的乐章吧~',
    },
    {
      name: 'keywords',
      content: '在线工具箱,长链接生成,链接转乐谱,超链接转乐谱',
    },
  ],
});
const toast = useToast();
import {toUTF8Array} from "~/untils/longUrlMake";
let originUrl = ref("")
let generateUrl = ref("……等待用户操作……")

const handleToMakeLongUrl = () =>{
  try {
    new URL(originUrl.value)
  } catch (e) {
    let oldValue = originUrl.value
    originUrl.value = "Invalid URL! Ops!!"
    let times = 0
    toast.add({
      id: 'Module Success',
      title: '乐谱编写失败',
      description: '所填写的并不是URL地址',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
    let i = setInterval(async () => {
      if (++times == 6) {
        clearInterval(i)
        originUrl.value = oldValue
      }
    }, 150)
    return
  }
  const enc = ["♫", "♪", "♬", "¶"]
  // 获取utf8数组
  let UTF8Array = toUTF8Array(originUrl.value)
      // 转换为base 4字符串
      // padstart非常重要！否则会丢失前导0
      .map(n => n.toString(4).padStart(4, "0"))
      // 转换为字符数组
      .join("").split("")
      // 映射到o的不同形式
      .map(x => enc[parseInt(x)])
      // 连接成单个字符串
      .join("");
  toast.add({
    id: 'Module Success',
    title: '乐谱编写成功',
    description: '快去用生成的乐谱进行奏乐吧',
    icon: 'i-heroicons-face-smile-20-solid',
    timeout: 5000,
  });
  generateUrl.value = "https://tool.mintimate.cn/musicUrl/"+UTF8Array;
}

const copyTheOutPutText = () => {
  const text = generateUrl.value;
  navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.add({
          id: 'Module Success',
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

<template>
  <div class="container text-center px-3 mx-auto">
    <div class="my-5">
      <h1 class="text-3xl">神奇长链接生成器</h1>
    </div>
    <UCard class="text-left mb-5">
      <template #header>
        请在下面输入需要转换的地址
      </template>
      <UInput v-model="originUrl"
              size="xl"
              lg:placeholder="请输入需要被转换的源地址(http/https)"
              placeholder="(http/https)" icon="i-ic-round-add-link" :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
          <UButton
              color="gray"
              label="生成长链接"
              variant="link"
              :padded="false"
              @click="handleToMakeLongUrl()"
          />
        </template>
      </UInput>
    </UCard>
    <UCard class="text-left mt-10">
      <template #header>
        生成的长链接
      </template>
      <p class="break-all	text-center">{{generateUrl}}<UIcon @click="copyTheOutPutText" class="cursor-pointer" name="i-ic-baseline-file-copy"/></p>
    </UCard>
  </div>

</template>

<style scoped>

</style>