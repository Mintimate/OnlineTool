import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 代理配置
  server: {
    proxy: {
      //代理所有 /api 的请求
      "/api": {
        // 代理请求之后的请求地址
        target: "http://localhost:8083/",
        rewrite: path => path.replace(/^\/api/, ''),
        // 跨域配置
        changeOrigin: true
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
