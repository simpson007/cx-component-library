import Cookies from 'js-cookie';
export function getCookies(key) {
    return Cookies.get(key);
}
export function setCookies(key, value, options) {
    Cookies.set(key, value, options);
}
export function removeCookies(key) {
    Cookies.remove(key);
}
//# sourceMappingURL=auth.js.map