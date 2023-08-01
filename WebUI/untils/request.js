import axiox from 'axios';

const instance = axiox.create({
    baseURL: '/api_v1', //baseURL会在发送请求的时候拼接在url参数的前面
    timeout: 10000, //延迟10s
});

// 添加响应拦截器
//此处可以根据服务器的返回状态码做响应的处理
//404 404 500

instance.interceptors.response.use(
    function (response) {
        // 后台响应失败或者未知返回
        if (
            typeof response.data.flag == 'undefined' ||
            response.data.flag === false
        ) {
            return Promise.reject(response);
        }
        return Promise.resolve(response.data);
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    },
);

export function get(url, params) {
    return instance
        .get(url, {
            params,
        })
        .catch((e) => {
            console.log("请求获取数据失败")
            return Promise.reject(e);
        });
}

export function post(url, data) {
    return instance.post(url, data).catch((e) => {
        console.log("请求获取数据失败")
        console.log(e);
    });
}

export function del(url) {
    return instance.delete(url).catch((e) => {
        console.log("请求获取数据失败")
        console.log(e);
    });
}

export function put(url, data) {
    return instance.put(url, data).catch((e) => {
        console.log("请求获取数据失败")
        console.log(e);
    });
}
