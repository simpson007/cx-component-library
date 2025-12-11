import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { HttpConfig, ApiResponse } from '../types'

// 开发环境默认 baseUrl
const DEV_BASE_URL = 'https://cx.istemedu.com'

let httpInstance: AxiosInstance | null = null
let config: HttpConfig = {}
let currentBaseUrl = ''

/**
 * 初始化 HTTP 客户端
 * @param options 配置选项
 * @param options.baseUrl API 基础地址
 *   - 开发环境：建议设置为 'https://cx.istemedu.com'
 *   - 生产环境：设置为 '' 或不传（使用相对路径）
 * @param options.isDev 是否为开发环境，设置为 true 时如果未指定 baseUrl 则自动使用开发地址
 */
export function initHttp(options: HttpConfig): AxiosInstance {
  config = options

  // 确定 baseUrl
  let baseUrl: string
  if (options.baseUrl !== undefined) {
    // 用户明确指定了 baseUrl
    baseUrl = options.baseUrl
  } else if (options.isDev) {
    // 用户标记为开发环境，使用默认开发地址
    baseUrl = DEV_BASE_URL
  } else {
    // 默认为空（生产环境）
    baseUrl = ''
  }

  currentBaseUrl = baseUrl

  httpInstance = axios.create({
    baseURL: baseUrl,
    timeout: options.timeout || 30000
  })

  httpInstance.interceptors.request.use(
    (reqConfig) => {
      if (options.getLanguage) {
        reqConfig.headers['Accept-Language'] = options.getLanguage()
      }
      if (options.getToken) {
        const token = options.getToken()
        if (token) {
          reqConfig.headers['Authorization'] = token
        }
      }
      return reqConfig
    },
    (error) => Promise.reject(error)
  )

  httpInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status !== 200) {
        return Promise.reject(new Error(`HTTP Error: ${response.status}`))
      }
      return response.data
    },
    (error) => {
      const code = error.response?.data?.head?.code
      if (code === '1005' || code === '1056') {
        options.onUnauthorized?.()
      }
      options.onError?.(error)
      return Promise.reject(error)
    }
  )

  return httpInstance
}

export function getHttpInstance(): AxiosInstance {
  if (!httpInstance) {
    throw new Error('HTTP client not initialized. Call initHttp() first.')
  }
  return httpInstance
}

export function request<T = unknown>(reqConfig: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return getHttpInstance()(reqConfig)
}

export function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
  return request<T>({ url, method: 'get', params })
}

export function post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
  return request<T>({ url, method: 'post', data })
}

export function put<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
  return request<T>({ url, method: 'put', data })
}

export function del<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
  return request<T>({ url, method: 'delete', data })
}

export { config as httpConfig }

/**
 * 获取当前配置的 baseUrl
 */
export function getBaseUrl(): string {
  return currentBaseUrl
}
