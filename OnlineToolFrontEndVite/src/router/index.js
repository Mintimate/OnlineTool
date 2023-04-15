import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ip',
    component: () => import('@/views/ip.vue')
  },
  {
    path: '/textBase64',
    name: 'textBase64',
    component: () => import('@/views/characterTool/textBase64.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
