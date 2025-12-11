"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchoolLogin = exports.getSchoolInfo = exports.getUserInfo = void 0;
const http_1 = require("./http");
// 用户相关
const getUserInfo = () => (0, http_1.get)('/api/v1/user/info');
exports.getUserInfo = getUserInfo;
// 学校相关
const getSchoolInfo = () => (0, http_1.get)('/api/v1/school/info');
exports.getSchoolInfo = getSchoolInfo;
// 登录
const postSchoolLogin = (data) => (0, http_1.post)('/api/v1/school/login', data);
exports.postSchoolLogin = postSchoolLogin;
//# sourceMappingURL=endpoints.js.map