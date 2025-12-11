import axios from 'axios';
let httpInstance = null;
let config = {};
export function initHttp(options) {
    config = options;
    httpInstance = axios.create({
        baseURL: options.baseUrl || '',
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