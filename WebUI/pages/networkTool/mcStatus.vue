<template>
  <div class="container text-center px-3 mx-auto">
    <div class="my-5">
      <h1 class="text-3xl">Minecraft服务器状态检测</h1>
    </div>
    <UCard class="text-left mb-5">
      <template #header>请在下面输入需要检测的服务器地址</template>
      <UInput
          v-model="checkFull"
          size="xl"
          placeholder="检测服务器的地址"
          icon="i-simple-icons-minecraft"
          :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
              color="gray"
              label="检测服务器状态"
              variant="link"
              :padded="false"
              @click="getMcStatus()"
          />
        </template>
      </UInput>
    </UCard>
    <div class="grid grid-cols-1">
      <div class="flex items-center justify-end gap-0.5">
        <UBadge size="sm" label="检测模式"/>
        <USelect
            size="xs"
            color="primary"
            v-model="workMode"
            :options="[
                        { name: 'Java服务器', value: 'Java' },
                        { name: 'BE服务器', value: 'BE' },
                    ]"
            option-attribute="name"
        >
        </USelect>
        <UButton @click="handleReset" size="xs" class="ml-1" label="重置"/>
      </div>
    </div>
    <div class="grid grid-cols-12 mt-5 text-left">
      <div class="col-span-12">
        <h3 class="text-xl mb-3">远程服务器信息</h3>
      </div>
      <div
          class="col-span-12 mx-1 bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden text-left"
      >
        <div class="md:flex">
          <div class="md:shrink-0">
            <img
                class="h-48 w-48 mx-auto object-cover md:h-full md:w-56"
                :src="
                                !!serverInfo.favicon
                                    ? serverInfo.favicon
                                    : '/defaultMinecraft.png'
                            "
                alt="Modern building architecture"
            />
          </div>
          <ClientOnly>
            <div v-if="isLoading" class="p-5" >
              <div
                  class="uppercase tracking-wide text-2xl text-indigo-500 dark:text-indigo-200 font-semibold"
              >
                <USkeleton class="h-8 w-[200px]" :ui="{ background: 'bg-gray-300 dark:bg-amber-100/25' }"/>
              </div>
              <div
                  class="mt-2 text-slate-500 dark:text-slate-400 w-100"
              >
                <div v-for="i in 4" :key="i" class="grid grid-cols-2 my-3 space-y-1">
                  <USkeleton class="h-5 w-[300px] md:w-[800px]" :ui="{ background: 'bg-gray-300 dark:bg-amber-100/25' }" />
                </div>
              </div>
            </div>
          <div v-else class="p-5">
            <div
                class="uppercase tracking-wide text-2xl text-indigo-500 dark:text-indigo-200 font-semibold"
            >
              {{ serverInfo.status !== -1 ? '远程服务器信息' : '等待用户操作' }}
            </div>
            <div
                v-if="serverInfo.status !== -1"
                class="mt-2 text-slate-500 dark:text-slate-400 w-100"
            >
              <div class="grid grid-cols-2">
                <div class="font-bold">服务器描述</div>
                <div v-html="serverInfo.description"/>
              </div>
              <div class="grid grid-cols-2">
                <div class="font-bold">游戏版本</div>
                <div v-html="serverInfo.version.name"/>
              </div>
              <div class="grid grid-cols-2">
                <div class="font-bold">目前状态</div>
                <div>
                  {{
                    serverInfo.status === '1'
                        ? 'Online'
                        : 'Offline'
                  }}
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="font-bold">在线人数</div>
                <div>
                  {{ serverInfo.players.online }}/{{
                    serverInfo.players.max
                  }}
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="font-bold">检测时间</div>
                <div>
                  {{
                    new Date().toLocaleString('zh-CN', {
                      timeZone: 'Asia/Shanghai',
                    })
                  }}
                </div>
              </div>
            </div>
            <div v-else
                 class="mt-2 text-slate-500 dark:text-slate-400 w-100">
              <p class="text-lg font-medium">
                <ul class="list-disc">
                  <li>免费资源，请合理使用；请勿使用本工具攻击他人服务器；</li>
                  <li>支持Java、Bedrock版本Minecraft，不支持局域网内游戏检测；</li>
                  <li>为防止资源滥用和恶意使用本工具，<span
                      class="decoration-sky-400 underline underline-offset-4 text-pink-500 dark:text-pink-300">一小时内，最多请求本工具5次；</span>；
                  </li>
                  <li>如果觉得此工具有用，可以加入我们<a
                      class="text-sky-500 dark:text-sky-300 decoration-indigo-400 underline underline-offset-4"
                      href="https://afdian.net/a/mintimate" target="_blank">爱发电</a>，赞助服务器维护费用ヾ(≧≦)〃
                  </li>
                </ul>
              </p>
            </div>
          </div>
            <template v-slot:fallback>
              <div class="p-5">
                <div
                    class="uppercase tracking-wide text-2xl text-indigo-500 dark:text-indigo-200 font-semibold"
                >等待用户操作
                </div>
                <div
                     class="mt-2 text-slate-500 dark:text-slate-400 w-100">
                  <p class="text-lg font-medium">
                    <ul class="list-disc">
                      <li>免费资源，请合理使用；请勿使用本工具攻击他人服务器；</li>
                      <li>支持Java、Bedrock版本Minecraft，不支持局域网内游戏检测；</li>
                      <li>为防止资源滥用和恶意使用本工具，<span
                          class="decoration-sky-400 underline underline-offset-4 text-pink-500 dark:text-pink-300">一小时内，最多请求本工具5次；</span>；
                      </li>
                      <li>如果觉得此工具有用，可以加入我们<a
                          class="text-sky-500 dark:text-sky-300 decoration-indigo-400 underline underline-offset-4"
                          href="https://afdian.net/a/mintimate" target="_blank">爱发电</a>，赞助服务器维护费用ヾ(≧≦)〃
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
const toast = useToast();

useHead({
  title: 'Minecraft服务器在线状态检测-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '在线检测Minecraft服务器的状态，支持Java和Bedrock版本服务器；检测成功后，返回当前的在线人数、服务器的标识信息和服务器的版本。',
    },
    {
      name: 'keywords',
      content: '在线工具箱,Minecraft服务器状态检测,Minecraft Java版本,Minecraft Bedrock版本服务器',
    },
  ],
});


// Minecraft颜色对应16进
const colorMap = {
  '§0': '#000000', // Black
  '§1': '#0000AA', // Dark Blue
  '§2': '#00AA00', // Dark Green
  '§3': '#00AAAA', // Dark Aqua
  '§4': '#AA0000', // Dark Red
  '§5': '#AA00AA', // Dark Purple
  '§6': '#FFAA00', // Gold
  '§7': '#AAAAAA', // Gray
  '§8': '#555555', // Dark Gray
  '§9': '#5555FF', // Blue
  '§a': '#55FF55', // Green
  '§b': '#55FFFF', // Aqua
  '§c': '#FF5555', // Red
  '§d': '#FF55FF', // Light Purple
  '§e': '#FFFF55', // Yellow
  '§f': '#FFFFFF', // White
};

// 被检测的服务器IP
let checkFull = ref('');

// 切换模式
let workMode = ref('Java');

// 加载模式
let isLoading = ref(false)

// 服务器响应的信息
let serverInfo = reactive({
  status: -1,
  players: {
    max: 0,
    online: 0,
    sample: [],
  },
  version: {
    name: '',
    protocol: 0,
  },
  favicon: '',
  description: '',
});
const getMcStatus = async () => {
  isLoading.value = true
  const fullAddress = checkFull.value;
  // 匹配IP地址
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // 匹配IP地址和端口号
  const ipPortRegex = /^(\d{1,3}\.){3}\d{1,3}:\d+$/;
  // 匹配IP和端口
  const domainRegex = /^(([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z0-9]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?$/;
  if(!(ipRegex.test(fullAddress) || domainRegex.test(fullAddress) || ipPortRegex.test(fullAddress))){
    toast.add({
      id: 'Module Error',
      title: '参数错误',
      description:
          '所填写的域名或IP地址非法，请检查',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
    return
  };
  serverInfo.favicon = '';
  let {status, message} = await $fetch('/api/mcStatus', {
    method: 'GET',
    params: {
      serverIP: checkFull.value,
      serverType: workMode.value,
    },
  }).catch(()=>{
    toast.add({
      id: 'Module Error',
      title: '当前不可用',
      description:
          '操作过于频繁，请等会再试试',
      icon: 'i-heroicons-face-frown-20-solid',
      timeout: 5000,
    });
  }).finally(()=>{
    isLoading.value = false;
  });
  Object.assign(serverInfo, message);
  serverInfo.status = status;
  if (serverInfo.description) {
    const output =
        (serverInfo.description.text && serverInfo.description.text) ||
        serverInfo.description;
    serverInfo.description = output
        .replace(/§[0-9a-fk-or]/gi, (match) => {
          const color = colorMap[match];
          return `<span style="color: ${color}">`;
        })
        .replace(/\n/g, '<br>');
  } else {
    serverInfo.description = "<span>服务器信息抓取失败，请检查服务器是否在线</span>"
  }
};

const handleClickInfo = () => {
  toast.add({
    id: 'Module Error',
    title: '当前不可用',
    description:
        '因为本系统被攻击者用于恶意攻击他人MC服务器，并且造成本系统服务器大量欠费；服务器还在优化，敬请期待',
    icon: 'i-heroicons-face-frown-20-solid',
    timeout: 5000,
  });
};

/** 重置 */
const handleReset = () => {
  Object.assign(serverInfo, {
    status: -1,
    players: {
      max: 0,
      online: 0,
      sample: [],
    },
    version: {
      name: '',
      protocol: 0,
    },
    favicon: '',
    description: '',
  });
  workMode.value = 'Java';
  checkFull.value = '';
};

</script>

<style scoped></style>
