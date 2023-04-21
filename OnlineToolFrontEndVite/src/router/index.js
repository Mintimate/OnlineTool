import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ip',
    component: () => import('@/views/ip.vue'),
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
