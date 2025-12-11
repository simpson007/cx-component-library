/**
 * Node.js 后端使用示例
 * 
 * 适用于 Node.js 20+ 环境
 */

import { initHttp, getUserInfo, getApplab } from '@your-org/shared-lib/api'
import { decode, generateRandomCode } from '@your-org/shared-lib'

// 初始化 HTTP 客户端（服务端场景）
function initServerApi(token: string) {
  initHttp({
    baseUrl: 'https://cx.istemedu.com',
    timeout: 30000,
    getToken: () => token,
    getLanguage: () => 'zh-CN',
    onError: (error) => {
      console.error('API Error:', error)
    }
  })
}

// 服务端调用 API 示例
async function fetchUserData(token: string) {
  initServerApi(token)
  
  try {
    const userInfo = await getUserInfo()
    console.log('User:', userInfo)
    return userInfo
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}

// 使用工具函数
function generateToken() {
  return generateRandomCode(32)
}

// 解码 Base64
function decodeOssUrl(encoded: string) {
  return decode(encoded)
}

export { fetchUserData, generateToken, decodeOssUrl }
