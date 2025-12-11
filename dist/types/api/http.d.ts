import { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { HttpConfig, ApiResponse } from '../types';
declare let config: HttpConfig;
/**
 * 初始化 HTTP 客户端
 * @param options 配置选项
 * @param options.baseUrl API 基础地址
 *   - 开发环境：建议设置为 'https://cx.istemedu.com'
 *   - 生产环境：设置为 '' 或不传（使用相对路径）
 * @param options.isDev 是否为开发环境，设置为 true 时如果未指定 baseUrl 则自动使用开发地址
 */
export declare function initHttp(options: HttpConfig): AxiosInstance;
export declare function getHttpInstance(): AxiosInstance;
export declare function request<T = unknown>(reqConfig: AxiosRequestConfig): Promise<ApiResponse<T>>;
export declare function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>;
export declare function post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
export declare function put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
export declare function del<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>>;
export { config as httpConfig };
