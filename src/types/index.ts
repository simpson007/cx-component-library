// 通用类型定义
export interface UserRole {
  admin?: boolean
  super_admin?: boolean
  [key: string]: unknown
}

export interface UserInfo {
  id: string | number
  name: string
  role?: UserRole[]
  [key: string]: unknown
}

// 用户角色类型
export type UserRoleType = 'guest' | 'user' | 'admin' | 'superAdmin'

export interface SchoolInfo {
  logo: string
  name: string
  [key: string]: unknown
}

export interface HttpConfig {
  baseUrl?: string
  timeout?: number
  getToken?: () => string | null
  getLanguage?: () => string | null
  onUnauthorized?: () => void
  onError?: (error: Error) => void
}

export interface ApiResponse<T = unknown> {
  head?: {
    code: string
    msg: string
  }
  body?: T
  data?: T
}

export interface HeaderProps {
  userInfo: UserInfo
  schoolInfo: SchoolInfo
  isLogin: boolean
  onLogout?: () => void
  onGoHome?: () => void
  translations?: HeaderTranslations
}

export interface HeaderTranslations {
  logout?: string
  login?: string
}
