<script setup>
useHead({
  title: '关于网站-在线工具箱',
  meta: [
    {
      name: 'description',
      content:
          '此处是在线工具箱的关于页面,包含网站介绍、联系信息等内容。欢迎使用我们的工具箱,提升效率!',
    },
    {
      name: 'keywords',
      content: '在线工具箱,工具箱,关于页面,网站介绍,友情链接',
    },
  ],
});

const sourceMoreInfoWeb =[
  {
    title:'Mintimate\'s Blog',
    subTitle: '也可以称作: 雨月空间站；我的博客',
    description:'分享一些代码、项目和新技术，偶尔也荒腔走板聊聊生活(o′ω`o)ノ',
    href:'https://www.mintimate.cn',
    imageSrc:'https://mintimate.cn/custom/img/favicon/favicon.png',
    imageAlt:'雨月空间站',
  },
  {
    title:'薄荷拼音输入法',
    subTitle: 'oh-my-rime、mint输入法',
    description:'基于rime开源输入法框架，配置的一个输入法模板',
    href:'https://www.mintimate.cc',
    imageSrc:'https://avatars.githubusercontent.com/u/10554324?s=200&v=4',
    imageAlt:'oh-my-rime',
  },
  {
    title:'Mintimate\'s Youtube',
    subTitle: '我的Youtube空间地址',
    description:'人挺少的，以至于连广告收入都没有~',
    href:'https://www.youtube.com/@mintimate',
    imageSrc:'https://imagehost.mintimate.cn/icon/youtube.png',
    imageAlt:'Mintimate\'s Youtube',
  },
  {
    title:'Mintimate\'s Bilibili',
    subTitle: '我的Bilibili空间地址',
    description:'技术教程视频；不过我B站人挺少的，以至于做一次视频就要花自己不少钱和时间，入不敷出……',
    href:'https://space.bilibili.com/355567627',
    imageSrc:'https://imagehost.mintimate.cn/icon/bilibili.png',
    imageAlt:'Mintimate\'s Bilibili',
  },
  {
    title:'爱发电粉丝交流平台',
    subTitle: '我的爱发电平台地址',
    description:'本来是想留邮箱或者QQ等联系方式的，但是奈何广告多，还有太多来求教的学生群体，实在没时间，只能用平台来加高门槛了',
    href:'https://afdian.net/a/mintimate',
    imageSrc:'https://imagehost.mintimate.cn/icon/aifadian.png',
    imageStyle: ['no-round'],
    imageAlt:'爱发电粉丝平台',
  },
]

  const len = sourceMoreInfoWeb.length;
  const groupSize = Math.ceil(len / 3);

  let moreInfoWebGroupA = sourceMoreInfoWeb.slice(0, groupSize);
  const remaining = sourceMoreInfoWeb.length - moreInfoWebGroupA.length;
  let moreInfoWebGroupB = sourceMoreInfoWeb.slice(groupSize, groupSize + Math.ceil(remaining / 2));
  let moreInfoWebGroupC = sourceMoreInfoWeb.slice(groupSize + Math.ceil(remaining / 2));

const isItemInArray = (element,array) => {
  if (!array) {
    return false;
  }
  return array.includes(element);
}
</script>

<template>
  <div class="container-lg text-center px-3 mx-auto">
    <h2 class="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white mt-5">关于本站</h2>
    <section>
      <figure class="md:flex bg-slate-100 rounded-3xl p-8 md:p-0 dark:bg-slate-800 mt-5">
        <img class="w-24 h-24 md:w-72 md:h-auto md:rounded-3xl rounded-full mx-auto " src="/avatar.png" alt="Mintimate"
             width="512" height="512">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-medium">
              我们团队主要：
              <ul class="list-disc">
                <li>精通Linux操作系统使用以及基于Linux网站部署和编译。（Almost：RHCE级别）；</li>
                <li>软件全栈工程师（SQL可能不是很熟，最起码存储过程不是，哈哈）；</li>
                <li>精通DaVinci、Affinity Photo，业余Blogger；</li>
              </ul>
              所以，我们的内容创作。主要集中于：
              Java、Linux/Mac使用。同时我们会自己制作内容封面、视频教程。
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-sky-500 dark:text-sky-400">
              More Essential
            </div>
            <div class="text-slate-700 dark:text-slate-500">
              <ul class="list-disc">
                <li>网站资源都是免费的，并且也不会进行任何资料收集或出售给第三方公司，请放心使用(￣∇￣)</li>
                <li>网站功能更新也不能保证，部分功能受限于成本，在高峰期可能存在资源耗尽而无法使用的情况。</li>
              </ul>

            </div>
          </figcaption>
        </div>
      </figure>
    </section>
    <section class="text-center px-8 mt-20 sm:my-3 md:my-5">
      <h2 class="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white">About More</h2>
      <figure>
        <blockquote><p class="mt-6 max-w-3xl mx-auto text-lg">
          这里包含更多网站的信息，包括一些我们的联系方式、其他网站和项目。希望有你感兴趣的东西~</p></blockquote>
      </figure>
    </section>
    <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <ul class="space-y-8">
        <li class="text-sm leading-6" v-for="item in moreInfoWebGroupA">
          <figure
              class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5 text-center md:text-left">
            <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
              <p>{{item.description}}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <img :src="item.imageSrc" :alt="item.imageAlt"
                   :class="isItemInArray('no-round',item.imageStyle) ? 'rounded-full' : ''"
                   class="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async">
              <div class="flex-auto">
                <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                  <a :href="item.href" tabindex="0">
                    <span class="absolute inset-0"></span>{{ item.title }}
                  </a></div>
                <div class="mt-0.5">
                  {{item.subTitle}}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
      <ul class="space-y-8">
        <li class="text-sm leading-6" v-for="item in moreInfoWebGroupB">
          <figure
              class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
            <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
              <p>{{item.description}}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <img :src="item.imageSrc" :alt="item.imageAlt"
                   :class="isItemInArray('no-round',item.imageStyle) ? 'rounded-full' : ''"
                   class="flex-none w-14 h-14 object-cover" loading="lazy" decoding="async">
              <div class="flex-auto">
                <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                  <a :href="item.href" tabindex="0">
                    <span class="absolute inset-0"></span>{{ item.title }}
                  </a></div>
                <div class="mt-0.5">
                  {{item.subTitle}}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
      <ul class="space-y-8">
        <li class="text-sm leading-6" v-for="item in moreInfoWebGroupC">
          <figure
              class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5 text-center md:text-right">
            <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
              <p>{{item.description}}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <img :src="item.imageSrc" :alt="item.imageAlt"
                   :class="isItemInArray('no-round',item.imageStyle) ? 'rounded-full' : ''"
                   class="flex-none w-14 h-14 object-cover" loading="lazy" decoding="async">
              <div class="flex-auto">
                <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                  <a :href="item.href" tabindex="0">
                    <span class="absolute inset-0"></span>{{ item.title }}
                  </a></div>
                <div class="mt-0.5">
                  {{item.subTitle}}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>