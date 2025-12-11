import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { HttpConfig, ApiResponse } from '../types'

let httpInstance: AxiosInstance | null = null
let config: HttpConfig = {}

export function initHttp(options: HttpConfig): AxiosInstance {
  config = options
  
  httpInstance = axios.create({
    baseURL: options.baseUrl || '',
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
