import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'

/** arco组件(https://arco.design/vue/docs/start) */
import ArcoVue from '@arco-design/web-vue';
// 图标
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import '@arco-design/web-vue/dist/arco.css';
import { Notification } from '@arco-design/web-vue';



const app = createApp(App);
Notification._context = app._context;
app.use(ArcoVue).use(ArcoVueIcon).use(router);
app.mount('#app');
