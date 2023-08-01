<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
      <UNotifications />
    </NuxtLayout>
  </div>
</template>
<script setup>
useHead({
  title: '在线工具箱-By Mintimate',
  htmlAttrs:{
    lang:'zh'
  },
  meta: [
    {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
  ],
  link: [
    {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'}
  ],
  script: [
    {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8322854923336162',
      crossorigin: 'anonymous'
    },
    {
      async: true,
      src: 'https://umami-console.mintimate.cn/script.js',
      "data-website-id": "57d362ec-45ec-417b-95dc-46855b3c8023"
    }
  ]
})
</script>