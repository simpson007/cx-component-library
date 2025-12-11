"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = isSuperAdmin;
exports.isAdmin = isAdmin;
exports.getUserRole = getUserRole;
/**
 * 判断用户是否是超级管理员
 */
function isSuperAdmin(userInfo) {
    if (!userInfo?.role || !Array.isArray(userInfo.role))
        return false;
    return userInfo.role.some((r) => r.super_admin === true);
}
/**
 * 判断用户是否是管理员（包括超级管理员）
 */
function isAdmin(userInfo) {
    if (!userInfo?.role || !Array.isArray(userInfo.role))
        return false;
    return userInfo.role.some((r) => r.admin === true || r.super_admin === true);
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