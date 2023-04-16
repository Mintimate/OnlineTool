import axiox from 'axios'
import { Notification } from '@arco-design/web-vue';

const instance = axiox.create({
  baseURL: "/api", //baseURL会在发送请求的时候拼接在url参数的前面
  timeout: 500000//延迟50s
})

// 添加响应拦截器
//此处可以根据服务器的返回状态码做响应的处理
//404 404 500

 instance.interceptors.response.use(function (response) {
   console.log(response.data)
    // 对响应数据做点什么
    if (typeof(response.data.flag)!="undefined" && !response.data.flag){
      // 对响应错误做点什么
      return Promise.reject(response.message);
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export function get(url, params) {
  return instance.get(url, {
    params
  })
    .catch(e => {
      Notification.error({
        title: '信息获取失败',
        content: '请求获取数据失败',
      })
    })
}

export function post(url, data) {
  return instance.post(url, data)
    .catch(e => {
      Notification.error({
        title: '信息获取失败',
        content: '请求获取数据失败',
      })
      console.log(e)
    })
}

export function del(url) {
  return instance.delete(url)
    .catch(e => {
      Notification.error({
        title: '信息获取失败',
        content: '请求获取数据失败',
      })
      console.log(e)
    })
}

export function put(url, data) {
  return instance.put(url, data)
    .catch(e => {
      Notification.error({
        title: '信息获取失败',
        content: '请求获取数据失败',
      })
      console.log(e)
    })
}
