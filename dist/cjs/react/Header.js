"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const endpoints_1 = require("../api/endpoints");
// 组件样式（与 Vue 版本一致）
const headerCss = `
.shared-header {
  position: relative;
  background-color: #edae24;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.shared-header * {
  box-sizing: border-box;
}
.shared-header .header-logo {
  position: absolute;
  top: 0;
  left: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 2000;
  cursor: pointer;
}
.shared-header .header-logo img {
  height: 36px;
}
.shared-header .header-logo .tit {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  line-height: 50px;
}
.shared-header .header-right {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
}
.shared-header .header-actions {
  display: flex;
  gap: 10px;
}
.shared-header .header-user-name {
  height: 32px;
  background-color: #0a3055;
  border-radius: 3px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.shared-header .header-login-btn {
  height: 32px;
  background-color: #0a3055;
  border-radius: 3px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  border: none;
}
.shared-header .header-login-btn:hover {
  background-color: #0d3a6a;
}
.shared-header .header-user-info {
  position: absolute;
  top: 32px;
  right: 0;
  background-color: #0a3055;
  z-index: 1999;
  overflow: hidden;
  transition: height 0.5s;
  white-space: nowrap;
  min-width: max-content;
}
.shared-header .header-user-info ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.shared-header .header-user-info a,
.shared-header .header-user-info .menu-item {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  color: #fff;
  text-decoration: none;
  border-top: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
}
.shared-header .header-user-info li:first-child a,
.shared-header .header-user-info li:first-child .menu-item {
  border-top: none;
}
.shared-header .header-user-info a:hover,
.shared-header .header-user-info .menu-item:hover {
  background-color: #0d3a6a;
}
.shared-header .user-menu-glyph {
  transition: transform 0.5s;
  font-size: 12px;
}
.shared-header .user-menu-glyph.show {
  transform: rotateX(180deg);
}

/* 骨架屏样式 */
@keyframes skeleton-pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
.shared-header .skeleton {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
.shared-header .skeleton-logo {
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
.shared-header .skeleton-title {
  width: 80px;
  height: 16px;
  margin-left: 10px;
}
.shared-header .skeleton-user {
  width: 70px;
  height: 32px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 3px;
}

/* 登录弹框样式 */
.shared-header .login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.shared-header .login-modal {
  background: #fff;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.shared-header .login-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shared-header .login-modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}
.shared-header .login-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}
.shared-header .login-modal-close:hover {
  color: #333;
}
.shared-header .login-modal-body {
  padding: 24px 20px;
}
.shared-header .login-form-group {
  margin-bottom: 16px;
}
.shared-header .login-form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}
.shared-header .login-form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.shared-header .login-form-group input:focus {
  outline: none;
  border-color: #edae24;
}
.shared-header .login-error {
  color: #e74c3c;
  font-size: 13px;
  margin-bottom: 12px;
}
.shared-header .login-modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.shared-header .login-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.shared-header .login-btn-cancel {
  background: #f5f5f5;
  color: #666;
}
.shared-header .login-btn-cancel:hover {
  background: #eee;
}
.shared-header .login-btn-submit {
  background: #edae24;
  color: #fff;
}
.shared-header .login-btn-submit:hover {
  background: #d9a020;
}
.shared-header .login-btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}
`;
let styleInjected = false;
function injectStyle() {
    if (styleInjected || typeof document === 'undefined')
        return;
    const style = document.createElement('style');
    style.textContent = headerCss;
    document.head.appendChild(style);
    styleInjected = true;
}
const SharedHeader = (props) => {
    const { loading = false, onLoginSuccess } = props;
    // 注入样式
    (0, react_1.useEffect)(() => {
        injectStyle();
    }, []);
    const [isUserInfoShow, setIsUserInfoShow] = (0, react_1.useState)(false);
    const [showLoginModal, setShowLoginModal] = (0, react_1.useState)(false);
    const [loginLoading, setLoginLoading] = (0, react_1.useState)(false);
    const [loginError, setLoginError] = (0, react_1.useState)('');
    const [loginForm, setLoginForm] = (0, react_1.useState)({ username: '', password: '' });
    const t = (0, react_1.useMemo)(() => ({
        logout: props.translations?.logout || '退出登录',
        login: props.translations?.login || '登录'
    }), [props.translations]);
    const toggleUserInfo = () => setIsUserInfoShow(!isUserInfoShow);
    const openLoginModal = (0, react_1.useCallback)(() => {
        setShowLoginModal(true);
        setLoginError('');
        setLoginForm({ username: '', password: '' });
        setIsUserInfoShow(false);
    }, []);
    const closeLoginModal = (0, react_1.useCallback)(() => {
        setShowLoginModal(false);
        setLoginError('');
        setLoginLoading(false);
    }, []);
    const submitLogin = (0, react_1.useCallback)(async () => {
        if (!loginForm.username) {
            setLoginError('请输入用户名');
            return;
        }
        if (!loginForm.password) {
            setLoginError('请输入密码');
            return;
        }
        setLoginLoading(true);
        setLoginError('');
        try {
            const formData = new FormData();
            formData.append('username', loginForm.username);
            formData.append('password', loginForm.password);
            const data = await (0, endpoints_1.postSchoolLogin)(formData);
            if (data.head?.code === '1000' && data.body) {
                const token = data.body.token;
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `token=${token}; expires=${expires}; path=/`;
                closeLoginModal();
                onLoginSuccess?.(data.body);
            }
            else {
                setLoginError(data.head?.msg || '登录失败');
            }
        }
        catch (error) {
            setLoginError(error.message || '网络错误，请重试');
        }
        finally {
            setLoginLoading(false);
        }
    }, [loginForm, onLoginSuccess, closeLoginModal]);
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Enter') {
            submitLogin();
        }
    }, [submitLogin]);
    const handleGoHome = () => props.onGoHome?.();
    const handleLogout = () => props.onLogout?.();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "shared-header", children: [(0, jsx_runtime_1.jsx)("div", { className: "header-logo", onClick: handleGoHome, children: loading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "skeleton skeleton-logo" }), (0, jsx_runtime_1.jsx)("div", { className: "skeleton skeleton-title" })] })) : props.schoolInfo?.logo ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: props.schoolInfo.logo, alt: "logo" }), (0, jsx_runtime_1.jsx)("span", { className: "tit", children: props.schoolInfo.name })] })) : null }), loading ? ((0, jsx_runtime_1.jsx)("div", { className: "skeleton skeleton-user" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "header-right", children: [props.children && (0, jsx_runtime_1.jsx)("div", { className: "header-actions", children: props.children }), props.isLogin ? ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "header-user-name", onClick: toggleUserInfo, children: [(0, jsx_runtime_1.jsx)("i", { className: "fa fa-user-o" }), (0, jsx_runtime_1.jsx)("span", { children: props.userInfo?.name || '游客' }), (0, jsx_runtime_1.jsx)("span", { className: `user-menu-glyph ${isUserInfoShow ? 'show' : ''}`, children: "\u25BC" })] }), (0, jsx_runtime_1.jsx)("div", { className: "header-user-info", style: { height: isUserInfoShow ? 'auto' : 0 }, children: (0, jsx_runtime_1.jsxs)("ul", { children: [props.menuContent, (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "javascript:void(0)", onClick: handleLogout, children: t.logout }) })] }) })] })) : (
                    /* 未登录：显示登录按钮 */
                    (0, jsx_runtime_1.jsx)("button", { className: "header-login-btn", onClick: openLoginModal, children: t.login }))] })), showLoginModal && ((0, jsx_runtime_1.jsx)("div", { className: "login-modal-overlay", onClick: (e) => e.target === e.currentTarget && closeLoginModal(), children: (0, jsx_runtime_1.jsxs)("div", { className: "login-modal", children: [(0, jsx_runtime_1.jsxs)("div", { className: "login-modal-header", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u7528\u6237\u767B\u5F55" }), (0, jsx_runtime_1.jsx)("button", { className: "login-modal-close", onClick: closeLoginModal, children: "\u00D7" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "login-modal-body", children: [loginError && (0, jsx_runtime_1.jsx)("div", { className: "login-error", children: loginError }), (0, jsx_runtime_1.jsxs)("div", { className: "login-form-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "\u7528\u6237\u540D" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", value: loginForm.username, onChange: (e) => setLoginForm((prev) => ({ ...prev, username: e.target.value })), onKeyDown: handleKeyDown })] }), (0, jsx_runtime_1.jsxs)("div", { className: "login-form-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "\u5BC6\u7801" }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", value: loginForm.password, onChange: (e) => setLoginForm((prev) => ({ ...prev, password: e.target.value })), onKeyDown: handleKeyDown })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "login-modal-footer", children: [(0, jsx_runtime_1.jsx)("button", { className: "login-btn login-btn-cancel", onClick: closeLoginModal, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)("button", { className: "login-btn login-btn-submit", onClick: submitLogin, disabled: loginLoading, children: loginLoading ? '登录中...' : '登录' })] })] }) }))] }));
};
exports.SharedHeader = SharedHeader;
exports.default = exports.SharedHeader;
//# sourceMappingURL=Header.js.map