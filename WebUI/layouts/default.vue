<style scoped></style>
<template>
    <!--  Nav-桌面-->
    <header
        class="sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75"
    >
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div class="flex items-center justify-between gap-3 h-16">
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-3">
                        <NuxtLink
                            to="/"
                            class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white"
                        >
                            <span class="hidden sm:block">Mintimate</span>
                            <span
                                class="sm:text-primary-500 dark:sm:text-primary-400"
                            >
                                在线工具箱
                            </span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex items-center justify-end flex-1 -mr-1.5 gap-3">
                    <div class="flex items-center lg:gap-1.5">
                        <div class="hidden lg:inline-block">
                            <UDropdown
                                class="mx-2"
                                :items="itemsForNetworkTools"
                                :popper="{ placement: 'bottom-start' }"
                            >
                                <span class="text-sm inline-flex items-center">
                                    网络工具
                                    <UIcon
                                        name="i-heroicons-chevron-down-20-solid"
                                    />
                                </span>
                            </UDropdown>
                            <NuxtLink
                                class="text-sm inline-flex items-center mx-2"
                                to="/processIMG"
                            >
                                图片在线处理
                            </NuxtLink>
                            <UDropdown
                                class="mx-2"
                                :item-classes="{ width: 'w-100' }"
                                :container-classes="{ width: 'w-100' }"
                                :items="itemsForAlphaTools"
                                :popper="{
                                    placement: 'bottom-start',
                                    width: 'w-100',
                                }"
                            >
                                <span class="text-sm inline-flex items-center">
                                    字符/计算工具
                                    <UIcon
                                        name="i-heroicons-chevron-down-20-solid"
                                    />
                                </span>
                            </UDropdown>
                            <NuxtLink
                                class="text-sm inline-flex items-center mx-2"
                                to="/mcstatus"
                            >
                                MC服务检测
                            </NuxtLink>
                            <NuxtLink
                                class="text-sm inline-flex items-center mx-2"
                                to="/mdv"
                            >
                                Markdown渲染
                            </NuxtLink>
                        </div>
                        <!--颜色切换-->
                        <!--
<ClientOnly>
<div class="relative" data-headlessui-state="">
<div
class="inline-flex w-full"
role="button"
id="headlessui-popover-button-1"
aria-expanded="false"
data-headlessui-state=""
>
<button
class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
type="button"
>
<span
class="i-heroicons-swatch-20-solid w-5 h-5 text-primary-500 dark:text-primary-400"
></span>
</button>
</div>
</div>
</ClientOnly>
-->

                        <!-- 暗亮切换 -->
                      <ColorModeButtom/>
                        <NuxtLink
                            to="/about"
                            rel="noopener noreferrer"
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                        >
                            <span
                                class="i-heroicons-information-circle-20-solid flex-shrink-0 h-5 w-5"
                                aria-hidden="true"
                            ></span>
                        </NuxtLink>
                        <a
                            href="https://afdian.net/a/mintimate"
                            rel="noopener noreferrer"
                            target="_blank"
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                        >
                            <span
                                class="i-heroicons-gift-20-solid flex-shrink-0 h-5 w-5"
                                aria-hidden="true"
                            ></span>
                        </a>
                        <a
                            href="https://github.com/Mintimate"
                            rel="noopener noreferrer"
                            target="_blank"
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center hidden lg:inline-flex"
                        >
                            <span
                                class="i-simple-icons-github flex-shrink-0 h-5 w-5"
                                aria-hidden="true"
                            ></span>
                        </a>
                        <!-- 移动端展开菜单 -->
                        <button
                            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center lg:hidden"
                            type="button"
                            @click="showMobileNav = !showMobileNav"
                        >
                            <span
                                :class="
                                    showMobileNav
                                        ? 'i-heroicons-x-mark-20-solid'
                                        : 'i-heroicons-bars-3-20-solid'
                                "
                                class="flex-shrink-0 h-5 w-5"
                                aria-hidden="true"
                            ></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- 移动端导航栏 -->
    <div :class="showMobileNav ? 'block' : 'hidden'">
        <div
            id="headlessui-dialog-15"
            role="dialog"
            aria-modal="true"
            data-headlessui-state="open"
        >
            <div
                id="headlessui-dialog-panel-16"
                data-headlessui-state="open"
                class="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-gray-900 lg:hidden"
            >
                <div
                    class="px-4 sm:px-6 sticky top-0 border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur z-10"
                >
                    <div class="flex items-center justify-between gap-3 h-16">
                        <div class="flex items-center gap-6">
                            <div class="flex items-center gap-3">
                                <NuxtLink
                                    to="/"
                                    class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white"
                                >
                                    <span class="hidden sm:block">
                                        Mintimate
                                    </span>
                                    <span
                                        class="sm:text-primary-500 dark:sm:text-primary-400"
                                    >
                                        在线工具箱
                                    </span>
                                </NuxtLink>
                            </div>
                        </div>
                        <div
                            class="flex items-center justify-end flex-1 -mr-1.5 gap-3"
                        >
                            <div class="flex items-center lg:gap-1.5">
                                <!--颜色切换-->
                              <ColorModeButtom/>
                                <!-- 爱发电 -->
                                <a
                                    href="https://afdian.net/a/mintimate"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                                >
                                    <span
                                        class="i-heroicons-gift-20-solid flex-shrink-0 h-5 w-5"
                                        aria-hidden="true"
                                    ></span>
                                </a>
                                <a
                                    href="https://github.com/Mintimate"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center hidden lg:inline-flex"
                                >
                                    <span
                                        class="i-simple-icons-github flex-shrink-0 h-5 w-5"
                                        aria-hidden="true"
                                    ></span>
                                </a>
                                <!-- 移动端展开菜单 -->
                                <button
                                    class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center lg:hidden"
                                    type="button"
                                    @click="showMobileNav = !showMobileNav"
                                >
                                    <span
                                        :class="
                                            showMobileNav
                                                ? 'i-heroicons-x-mark-20-solid'
                                                : 'i-heroicons-bars-3-20-solid'
                                        "
                                        class="flex-shrink-0 h-5 w-5"
                                        aria-hidden="true"
                                    ></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    @click="showMobileNav = false"
                    class="px-4 sm:px-6 py-4 sm:py-6"
                >
                    <div class="space-y-8">
                        <div class="space-y-2">
                            <p
                                class="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate leading-6"
                            >
                                网络工具
                            </p>
                            <nav
                                class="border-l border-gray-200 dark:border-gray-800 space-y-2 mt-1"
                            >
                                <template
                                    v-for="anotherItems in itemsForNetworkTools"
                                >
                                    <NuxtLink
                                        v-for="item in anotherItems"
                                        :to="item.to"
                                        class="group block border-l -ml-px lg:leading-6 flex items-center gap-2 pl-4 w-full text-sm border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                    >
                                        <UIcon :name="item.icon" />
                                        <span class="truncate relative">
                                            {{ item.label }}
                                        </span>
                                    </NuxtLink>
                                </template>
                            </nav>
                        </div>
                        <div class="space-y-2">
                            <p
                                class="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate leading-6"
                            >
                                图形工具
                            </p>
                            <nav
                                class="border-l border-gray-200 dark:border-gray-800 space-y-2 mt-1"
                            >
                                <NuxtLink
                                    to="/processIMG"
                                    class="group block border-l -ml-px lg:leading-6 flex items-center gap-2 pl-4 w-full text-sm border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    <span class="truncate relative">
                                        图片在线处理
                                    </span>
                                </NuxtLink>
                            </nav>
                        </div>
                        <div class="space-y-2">
                            <p
                                class="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate leading-6"
                            >
                                字符/计算工具
                            </p>
                            <nav
                                class="border-l border-gray-200 dark:border-gray-800 space-y-2 mt-1"
                            >
                                <template
                                    v-for="anotherItems in itemsForAlphaTools"
                                >
                                    <NuxtLink
                                        v-for="item in anotherItems"
                                        :to="item.to"
                                        class="group block border-l -ml-px lg:leading-6 flex items-center gap-2 pl-4 w-full text-sm border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                    >
                                        <UIcon :name="item.icon" />
                                        <span class="truncate relative">
                                            {{ item.label }}
                                        </span>
                                    </NuxtLink>
                                </template>
                            </nav>
                        </div>
                        <div class="space-y-2">
                            <p
                                class="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate leading-6"
                            >
                                其他工具
                            </p>
                            <nav
                                class="border-l border-gray-200 dark:border-gray-800 space-y-2 mt-1"
                            >
                                <NuxtLink
                                    to="/mcstatus"
                                    class="group block border-l -ml-px lg:leading-6 flex items-center gap-2 pl-4 w-full text-sm border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    <span class="truncate relative">
                                        MC服务检测
                                    </span>
                                </NuxtLink>
                                <NuxtLink
                                    to="/mdv"
                                    class="group block border-l -ml-px lg:leading-6 flex items-center gap-2 pl-4 w-full text-sm border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    <span class="truncate relative">
                                        Markdown渲染
                                    </span>
                                </NuxtLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="min-height: 90vh">
        <slot />
    </div>
    <footer class="mx-auto text-center text-sm my-5 container-lg">
        <span class="site-footer-owner">
            ©2021~2023
            <a href="https://www.mintimate.cn" target="_blank">Mintimate</a>
            ｜
            <a href="https://beian.miit.gov.cn" target="_blank">
                闽ICP备2021000722号-2
            </a>
        </span>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import {Modal} from "@arco-design/web-vue";
let isDarkMode = ref(false);

const itemsForNetworkTools = [
    [
        {
            label: 'IP查询',
            icon: 'i-heroicons-magnifying-glass-circle',
            shortcuts: ['IP'],
            to: '/',
        },
    ],
    [
        {
            label: 'Github加速',
            icon: 'i-simple-icons-github',
            shortcuts: ['Git'],
            to: '/gh',
        },
    ],
    [
        {
            label: '神奇长链接',
            icon: 'i-ic-round-add-link',
            shortcuts: ['长链'],
            to: '/urlMusic',
        },
    ],
];

const itemsForAlphaTools = [
    [
        {
            label: '范围随机数排列',
            icon: 'i-heroicons-pencil-square-20-solid',
            shortcuts: ['Random'],
            to: '/randomNumber',
        },
        {
            label: '统计字数/字符',
            icon: 'i-heroicons-document-duplicate-20-solid',
            shortcuts: ['Alpha'],
            to: '/statisticsChars',
        },
        {
            label: '简体繁体转换',
            icon: 'i-ic-sharp-g-translate',
            shortcuts: ['繁简'],
            to: '/zhConvertTradSimp',
        },
    ],
    [
        {
            label: 'Base64编码互转',
            icon: 'i-heroicons-archive-box-20-solid',
            shortcuts: ['Code'],
            to: '/textBase64',
        },
        {
            label: '日期计算',
            icon: 'i-heroicons-arrow-right-circle-20-solid',
            shortcuts: ['Date'],
            to: '/calculateTheDate',
        },
        {
            label: '强密码生成',
            icon: 'i-heroicons-archive-box-20-solid',
            shortcuts: ['PWD'],
            to: '/generatePWD',
        },
    ],
];

const showMobileNav = ref(false);

// onMounted(() => {
//     const theme = localStorage.getItem('tool-theme-mode');
//     isDarkMode.value = theme === 'dark';
//
//     const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
//
//     darkThemeMq.addEventListener('change', switchTheme);
// });

const handleDarkThemeChange = (e) => {
    if (isDarkMode.value) {
        document.querySelector('html').classList.add('dark');
        document.querySelector('html').classList.remove('light');
    } else {
        document.querySelector('html').classList.add('light');
        document.querySelector('html').classList.remove('dark');
    }
    localStorage.setItem(
        'tool-theme-mode',
        isDarkMode.value ? 'dark' : 'light',
    );
};

const switchTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    handleDarkThemeChange();
};
/** 打开爱发电 */
const openAiFaDian = () => {
    // Modal.success({
    //   title: '十分感谢支持＼(◎◎)／',
    //   content: '十分感谢支持，支持的汽水、奶茶和咖啡☕️，将用于服务器的支出和改善网站体验(｡>ㅅ<｡)'
    // });
    window.open('https://afdian.net/a/mintimate', '_blank');
};

/** 打开手机端悬浮 */
let popupVisible = ref(false);
</script>