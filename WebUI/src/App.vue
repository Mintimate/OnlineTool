<template>
  <a-layout>
    <a-layout-header class="layout-header">
      <div class="layout-header-menu-wrapper">
        <a-menu
          :show-collapse-button="true"
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
            <router-link to="/">
              <a-menu-item key="1_0">IP查询</a-menu-item>
            </router-link>
            <router-link to="/gh">
              <a-menu-item key="1_1">Github加速</a-menu-item>
            </router-link>
          </a-sub-menu>
          <router-link to="/processIMG">
            <a-menu-item key="2">
              <template #icon>
                <icon-file-image/>
              </template>
              图片在线处理
            </a-menu-item>
          </router-link>
          <a-sub-menu key="3">
            <template #icon>
              <icon-bulb/>
            </template>
            <template #title>字符/计算工具</template>
            <a-dgroup title="字符">
              <router-link to="/randomNumber">
                <a-menu-item key="3_1">范围随机数排列</a-menu-item>
              </router-link>
              <router-link to="/statisticsChars">
                <a-menu-item key="3_2">统计字数/字符</a-menu-item>
              </router-link>
              <router-link to="/textBase64">
                <a-menu-item key="3_3">Base64编码互转</a-menu-item>
              </router-link>
            </a-dgroup>
            <a-dgroup title="计算">
              <router-link to="/calculateTheDate">
                <a-menu-item key="3_4">日期计算</a-menu-item>
              </router-link>
              <router-link to="">
                <a-menu-item key="3_5">强密码生成</a-menu-item>
              </router-link>
            </a-dgroup>

          </a-sub-menu>
          <a-menu-item key="4">
            <template #icon>
              <icon-robot/>
            </template>
            MC服务检测
          </a-menu-item>
          <a-menu-item key="5">
            <template #icon>
              <icon-pen/>
            </template>
            Markdown渲染
          </a-menu-item>
          <a href="https://www.mintimate.cn" target="_blank">
            <a-menu-item key="6">
              <template #icon>
                <icon-public/>
              </template>
              个人博客
            </a-menu-item>
          </a>
        </a-menu>
      </div>
      <div class="layout-header-menu-wrapper-right">
        <a-menu
          class="layout-header-menu"
          style="text-align: right"
          mode="horizontal"
        >
          <a-menu-item style="margin-right: auto" key="7">
            <template #icon>
              <icon-thumb-up-fill/>
            </template>
            赞助
          </a-menu-item>
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
/** 图标设置 */
:deep(.arco-menu-icon) {
  margin-right: 5px !important;
}

:deep(.arco-menu-has-icon) {
  margin-right: 5px !important;
}

:deep(.arco-menu-horizontal .arco-menu-item) {
  padding: 0 8px;
}

:deep(.arco-menu-horizontal) {
  padding-left: 5px;
}

a {
  text-decoration: none;
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 主要 */
.layout-header-menu-wrapper {
  flex-grow: 1;
}

@media (max-width: 1024px) {
  .layout-header-menu-wrapper-right {
    flex-grow: 1;
    display: none;
  }
}

@media (min-width: 1024px) {
  .layout-header-menu-wrapper-right {
    flex-grow: 1;
    display: block;
  }
}

/* 下拉菜单 */
.arco-trigger-content{
  :deep(.arco-trigger-menu){
    max-height: 500px!important;
  }
}

</style>
