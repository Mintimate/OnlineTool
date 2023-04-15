<template>
  <a-layout>
    <a-layout-header class="layout-header">
      <div class="layout-header-menu-wrapper">
        <a-menu
          :default-open-keys="['0']"
          :default-selected-keys="['0_2']"
          mode="horizontal"
        >
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '20px' }">
            Mintimate
          </a-menu-item>
          <a-sub-menu key="1">
            <template #icon>
              <icon-bug></icon-bug>
            </template>
            <template #title>网络工具</template>
            <a-menu-item key="1_0"><a href="/">IP查询</a></a-menu-item>
            <a-menu-item key="1_1">Github加速</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="2">图片在线处理</a-menu-item>
          <a-menu-item key="3"><a href="/textBase64">字符/计算工具</a></a-menu-item>
          <a-menu-item key="4">MC服务器检测</a-menu-item>
          <a-menu-item key="5">Markdown在线渲染</a-menu-item>
          <a-menu-item key="6">个人博客</a-menu-item>
        </a-menu>
      </div>
      <div class="layout-header-menu-wrapper">
        <a-menu
          class="layout-header-menu"
          :openKeys="['1']"
          style="text-align: right"
          mode="horizontal"
        >
          <a-menu-item style="margin-right: auto" key="7">赞助</a-menu-item>
          <a-menu-item style="margin-right: auto" key="8">纯粹的在线工具</a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
</script>

<style scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 主要 */
.layout-header-menu-wrapper {
  flex-grow: 1;
}

</style>
