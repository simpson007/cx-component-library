import axios from 'axios';
// 开发环境默认 baseUrl
const DEV_BASE_URL = 'https://cx.istemedu.com';
// 判断是否为开发环境
function isDev() {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
        return process.env.NODE_ENV === 'development';
    }
    if (typeof window !== 'undefined' && window.location) {
        return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    }
    return false;
}
// 获取默认 baseUrl
function getDefaultBaseUrl() {
    return isDev() ? DEV_BASE_URL : '';
}
let httpInstance = null;
let config = {};
export function initHttp(options) {
    config = options;
    // 如果未指定 baseUrl，根据环境自动设置
    const baseUrl = options.baseUrl !== undefined ? options.baseUrl : getDefaultBaseUrl();
    httpInstance = axios.create({
        baseURL: baseUrl,
        timeout: options.timeout || 30000
    });
    httpInstance.interceptors.request.use((reqConfig) => {
        if (options.getLanguage) {
            reqConfig.headers['Accept-Language'] = options.getLanguage();
        }
        if (options.getToken) {
            const token = options.getToken();
            if (token) {
                reqConfig.headers['Authorization'] = token;
            }
        }
        return reqConfig;
    }, (error) => Promise.reject(error));
    httpInstance.interceptors.response.use((response) => {
        if (response.status !== 200) {
            return Promise.reject(new Error(`HTTP Error: ${response.status}`));
        }
        return response.data;
    }, (error) => {
        const code = error.response?.data?.head?.code;
        if (code === '1005' || code === '1056') {
            options.onUnauthorized?.();
        }
        options.onError?.(error);
        return Promise.reject(error);
    });
    return httpInstance;
}
export function getHttpInstance() {
    if (!httpInstance) {
        throw new Error('HTTP client not initialized. Call initHttp() first.');
    }
    return httpInstance;
}
export function request(reqConfig) {
    return getHttpInstance()(reqConfig);
}
export function get(url, params) {
    return request({ url, method: 'get', params });
}
export function post(url, data) {
    return request({ url, method: 'post', data });
}
export function put(url, data) {
    return request({ url, method: 'put', data });
}
export function del(url, data) {
    return request({ url, method: 'delete', data });
}
export { config as httpConfig };
//# sourceMappingURL=http.js.map