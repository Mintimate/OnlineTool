import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ip',
    component: () => import('@/views/ip.vue'),
  },
  {
    path: '/gh',
    name: 'githubCDN',
    component: () => import('@/views/networkTool/githubCDN.vue')
  },
  {
    path: '/processIMG',
    name: 'processImage',
    component: () => import('@/views/processImage.vue'),
  },
  {
    path: '/textBase64',
    name: 'textBase64',
    component: () => import('@/views/characterTool/textBase64.vue')
  },
  {
    path: '/statisticsChars',
    name: 'statisticsChars',
    component: () => import('@/views/characterTool/statisticAlpha.vue')
  },
  {
    path: '/randomNumber',
    name: 'randomNumber',
    component: () => import('@/views/characterTool/randomNumber.vue')
  },
  {
    path: '/calculateTheDate',
    name: 'calculateTheDate',
    component:()=>import('@/views/dateTool/calculateTheDate.vue')
  },
  {
    path: '/oneindexM',
    name: 'oneindexM',
    component: () => import('@/views/other/oneIndex.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
