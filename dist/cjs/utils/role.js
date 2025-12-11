"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = isSuperAdmin;
exports.isAdmin = isAdmin;
exports.getUserRole = getUserRole;
/**
 * 获取用户角色数组（兼容 role 和 roles 两种字段名）
 */
function getRoles(userInfo) {
    if (!userInfo)
        return null;
    // API 返回的是 roles（复数），兼容 role（单数）
    const roles = userInfo.roles || userInfo.role;
    return Array.isArray(roles) ? roles : null;
}
/**
 * 判断用户是否是超级管理员
 */
function isSuperAdmin(userInfo) {
    const roles = getRoles(userInfo);
    if (!roles)
        return false;
    return roles.some((r) => r.super_admin === true);
}
/**
 * 判断用户是否是管理员（包括超级管理员）
 */
function isAdmin(userInfo) {
    const roles = getRoles(userInfo);
    if (!roles)
        return false;
    return roles.some((r) => r.admin === true || r.super_admin === true);
}
/**
 * 获取用户角色类型
 * @returns 'superAdmin' | 'admin' | 'user' | 'guest'
 */
function getUserRole(userInfo) {
    if (!userInfo || !userInfo.id)
        return 'guest';
    if (isSuperAdmin(userInfo))
        return 'superAdmin';
    if (isAdmin(userInfo))
        return 'admin';
    return 'user';
}
//# sourceMappingURL=role.js.map