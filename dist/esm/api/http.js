import axios from 'axios';
// 开发环境默认 baseUrl
const DEV_BASE_URL = 'https://cx.istemedu.com';
let httpInstance = null;
let config = {};
/**
 * 初始化 HTTP 客户端
 * @param options 配置选项
 * @param options.baseUrl API 基础地址
 *   - 开发环境：建议设置为 'https://cx.istemedu.com'
 *   - 生产环境：设置为 '' 或不传（使用相对路径）
 * @param options.isDev 是否为开发环境，设置为 true 时如果未指定 baseUrl 则自动使用开发地址
 */
export function initHttp(options) {
    config = options;
    // 确定 baseUrl
    let baseUrl;
    if (options.baseUrl !== undefined) {
        // 用户明确指定了 baseUrl
        baseUrl = options.baseUrl;
    }
    else if (options.isDev) {
        // 用户标记为开发环境，使用默认开发地址
        baseUrl = DEV_BASE_URL;
    }
    else {
        // 默认为空（生产环境）
        baseUrl = '';
    }
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