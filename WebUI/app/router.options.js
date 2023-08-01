const customRoutes = [
    {
        path: '/',
        name: 'ip',
        component: () => import('@/pages/index.vue'),
    },
    {
        // 关于页面
        path: '/about',
        name: 'about',
        component: () => import('@/pages/about.vue'),
    },
    {
        path: '/gh',
        name: 'githubCDN',
        component: () => import('@/pages/networkTool/githubCDN.vue'),
    },
    {
        path: '/processIMG',
        name: 'processImage',
        component: () => import('@/pages/processImage.vue'),
    },
    {
        path: '/textBase64',
        name: 'textBase64',
        component: () => import('@/pages/characterTool/textBase64.vue'),
    },
    {
        path: '/statisticsChars',
        name: 'statisticsChars',
        component: () => import('@/pages/characterTool/statisticAlpha.vue'),
    },
    {
        // 简体字、繁体字 互相转换
        path: '/zhConvertTradSimp',
        name: 'zhConvertTradSimp',
        component: () => import('@/pages/characterTool/zhConvertTradSimp.vue'),
    },
    {
        path: '/randomNumber',
        name: 'randomNumber',
        component: () => import('@/pages/characterTool/randomNumber.vue'),
    },
    {
        path: '/calculateTheDate',
        name: 'calculateTheDate',
        component: () => import('@/pages/dateTool/calculateTheDate.vue'),
    },
    {
        // Markdown在线渲染
        path: '/mdv',
        name: 'markdownView',
        component: () => import('@/pages/characterTool/markdownView.vue'),
    },
    {
        // 生成强密码
        path: '/generatePWD',
        name: 'complexPassword',
        component: () => import('@/pages/characterTool/complexPassword.vue'),
    },
    {
        // MC服务器检测
        path: '/mcstatus',
        name: 'mcStatus',
        component: () => import('@/pages/networkTool/mcStatus.vue'),
    },
    /** 工具类，前台不显示 */
    {
        path: '/oneindexM',
        name: 'oneindexM',
        component: () => import('@/pages/other/oneIndex.vue'),
    },
    {
        path: '/curl',
        name: 'curl',
        component: () => import('@/pages/other/curl.vue'),
    },
    {
        path: '/urlMusic',
        name: 'urlMusic',
        component: () => import('@/pages/characterTool/urlMusic.vue'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/components/error404.vue'),
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    },
];
export default {
    routes: (_routes) => [..._routes, ...customRoutes],
};
