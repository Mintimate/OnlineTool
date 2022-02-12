import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/networkTool /Home.vue'
import store from "../store";

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      metaInfo: {
        title: "在线工具箱-By Mintimate",
        description:"Mintimate的在线工具箱，致力于打造便民服务。为开发者、Minecraft游戏爱好者，创建方便的在线工具",
        keywords: "在线工具箱,便民根据,站点根据,开发者,开发者实用工具,IP查询,图片处理,Base64转码,字数统计,字符统计,MC服务器检测,Minecraft服务器检测",
      }
    },
    component: Home
  },
  {
    path: '/processIMG',
    name: 'processIMG',
    meta: {
      metaInfo: {
        title: "图片处理-在线工具箱",
        description: "在线处理图片，支持webp、png、bmp和jpeg/jeg图片互转，支持图片清晰度增强。支持内容识别。",
        keywords:"图片格式转换,图片清晰度增强,Webp格式转码"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/processIMG.vue')
  },
  {
    path: '/statisticsChars',
    name: 'statisticsChars',
    meta: {
      metaInfo: {
        title: "字数统计-在线工具箱",
        description: "支持统计中文、英文和特殊字符标点",
        keywords:"字数统计,中文统计,字符统计"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/calculationAndCharacters/statisticAlpha.vue')
  },
  {
    path: '/generatePWD',
    name: 'generatePWD',
    meta: {
      metaInfo: {
        title: "强密码生成-在线工具箱",
        description: "在线生成强密码，并 判断密码 强弱。纯前端实现，服务器不收集生成的密码。",
        keywords:"强密码生成,密码强度判断"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/calculationAndCharacters/generatePWD.vue')
  },
  {
    path: '/calculateTheDate',
    name: 'calculateTheDate',
    meta: {
      metaInfo: {
        title: "日期计算-在线工具箱",
        description: "在线计算两个日期之间，相隔几天；或者 计算几天后是几月几号。",
        keywords:"日期计算,几天后是几号,两个日期之间隔多久"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/calculationAndCharacters/calculateTheDate.vue')
  },
  {
    path: '/randomNumber',
    name: 'randomNumber',
    meta: {
      metaInfo: {
        title: "随机数生成-在线工具箱",
        description: "在线生成随机数、在线生成范围内的一个数",
        keywords:"随机数生成"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/calculationAndCharacters/randomNumber.vue')
  },
  {
    path: '/textBase64',
    name: 'textBase64',
    meta: {
      metaInfo: {
        title: "Base64转码-在线工具箱",
        description: "在线Base64转码",
        keywords:"Base64转码,Base64"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/calculationAndCharacters/textBase64.vue')
  },
  {
    path: '/curl',
    name: 'curl',
    meta: {
      metaInfo: {
        title: "短链接生成-在线工具箱",
        description: "在线生成短链接",
        keywords:"短链接"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/networkTool /curl.vue')
  },
  {
    path: '/mcstatus',
    name: 'mcstatus',
    meta: {
      metaInfo: {
        title: "MC服务器判断-在线工具箱",
        description: "不开启游戏，在线检测自己Minecraft服务器的状态",
        keywords:"MC服务器检测,Minecraft服务器检测,Bedrock服务器在线检测"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/mcstatus.vue')
  },
  {
    path: '/mdv',
    name: 'mdv',
    meta: {
      metaInfo: {
        title: "在线Markdown渲染-在线工具箱",
        description: "在线渲染Markdown文件",
        keywords:"Markdown渲染,Markdown"
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/markdownView.vue')
  },
  {
    path: '/gh',
    name: 'github',
    meta: {
      metaInfo: {
        title: "Github下载加速-在线工具箱",
        description: "GitHub文件下载加速",
        keywords:"CDN,GitHub,下载加速"
      }
    },
    component: () => import('../views/networkTool /GitHub.vue')
  },
  {
    path:'/oneindexM',
    name:'oneindexM',
    meta:{
      metaInfo: {
        title: "OneIndex桥接页面",
        description: "为Oneindex的安装提供网络桥接",
      }
    },
    component: () => import('../views/networkTool /oneIndex.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.metaInfo) {
    store.commit("metaModule/CHANGE_META_INFO", to.meta.metaInfo)
  }
  next()
})


export default router
