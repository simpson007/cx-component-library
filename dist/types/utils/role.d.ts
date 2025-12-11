import type { UserInfo, UserRoleType } from '../types';
/**
 * 判断用户是否是超级管理员
 */
export declare function isSuperAdmin(userInfo: UserInfo | null | undefined): boolean;
/**
 * 判断用户是否是管理员（包括超级管理员）
 */
export declare function isAdmin(userInfo: UserInfo | null | undefined): boolean;
/**
 * 获取用户角色类型
 * @returns 'superAdmin' | 'admin' | 'user' | 'guest'
 */
export declare function getUserRole(userInfo: UserInfo | null | undefined): UserRoleType;
