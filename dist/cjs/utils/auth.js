"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookies = getCookies;
exports.setCookies = setCookies;
exports.removeCookies = removeCookies;
const js_cookie_1 = __importDefault(require("js-cookie"));
function getCookies(key) {
    return js_cookie_1.default.get(key);
}
function setCookies(key, value, options) {
    js_cookie_1.default.set(key, value, options);
}
function removeCookies(key) {
    js_cookie_1.default.remove(key);
}
//# sourceMappingURL=auth.js.map