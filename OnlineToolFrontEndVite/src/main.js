import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'

/** arco组件(https://arco.design/vue/docs/start) */
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import '@arco-design/web-vue/dist/arco.css';


const app = createApp(App);
app.use(ArcoVue).use(ArcoVueIcon).use(router);
app.mount('#app');
