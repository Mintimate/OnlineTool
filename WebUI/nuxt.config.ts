// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxthq/ui','@nuxtjs/color-mode'],
    ssr: true,
    colorMode: {
        classSuffix: '', // 在 dark 或 light 类名后面添加 -mode 后缀
        storageKey: 'tool-theme-mode' // 存储颜色模式的键名，用于在本地存储中存储颜色模式的值
    },
    app:{
        // 生成的静态资源根目录
        buildAssetsDir:"/_toolStatic/",
        rootId:"contentId",
    },
    build: {
        transpile: ['compute-scroll-into-view'],
    },
    vite: {
        plugins: [
            Components({
                dts: true,
                resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
            }),
        ],
    },
    nitro: {
        devProxy: {
            '/api_v1': {
                target: 'http://127.0.0.1:8083/',
                prependPath: true,
                changeOrigin: true,
            },
        },
    },
    runtimeConfig:{
      public:{
          apiBase:'/api_v2'
      }
    },
    ui: {
        // 激活图标
        icons: ['heroicons', 'simple-icons', 'ic'],
    },
    css: [
        '@/assets/css/main.css'
    ],
});
