import axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from './auth';
const service = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 2000,
});
//请求拦截器
service.interceptors.request.use(
    config => {
        //判断是否存在token，如果存在将每个页面header都添加token
        if (getToken()) {
            config.headers['token'] = getToken();
        }
        return config;
    },
    () => {
        Message({
            type: 'error',
            message: '网络错误！',
        });
        return Promise.reject(new Error('网络错误！'));
    }
);
//响应拦截器
service.interceptors.response.use(
    res => {
        const result = res.data;
        if (result.code === 200) {
            return result;
        } else {
            // Message.error(result.msg);
            Message({
                type: 'error',
                message: result.msg || '请求错误！',
            });
            return Promise.reject(new Error(result.msg || '请求错误！'));
        }
    },
    () => {
        Message({
            type: 'error',
            message: '网络错误！',
        });
        return Promise.reject(new Error('网络错误！'));
    }
);
export default service;
