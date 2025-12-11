import type { UserInfo, UserRoleType } from '../types'

/**
 * 判断用户是否是超级管理员
 */
export function isSuperAdmin(userInfo: UserInfo | null | undefined): boolean {
  if (!userInfo?.role || !Array.isArray(userInfo.role)) return false
  return userInfo.role.some((r) => r.super_admin === true)
}

/**
 * 判断用户是否是管理员（包括超级管理员）
 */
export function isAdmin(userInfo: UserInfo | null | undefined): boolean {
  if (!userInfo?.role || !Array.isArray(userInfo.role)) return false
  return userInfo.role.some((r) => r.admin === true || r.super_admin === true)
}

/**
 * 获取用户角色类型
 * @returns 'superAdmin' | 'admin' | 'user' | 'guest'
 */
export function getUserRole(userInfo: UserInfo | null | undefined): UserRoleType {
  if (!userInfo || !userInfo.id) return 'guest'
  if (isSuperAdmin(userInfo)) return 'superAdmin'
  if (isAdmin(userInfo)) return 'admin'
  return 'user'
}
