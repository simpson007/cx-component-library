"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const Header_1 = require("../components/Header");
// 登录弹框样式
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'all 0.3s'
    },
    modal: {
        background: '#fff',
        borderRadius: 8,
        width: 400,
        maxWidth: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    header: {
        padding: '16px 20px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        margin: 0,
        fontSize: 18,
        color: '#333'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: 24,
        cursor: 'pointer',
        color: '#999',
        lineHeight: 1
    },
    body: {
        padding: '24px 20px'
    },
    formGroup: {
        marginBottom: 16
    },
    label: {
        display: 'block',
        marginBottom: 6,
        fontSize: 14,
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #ddd',
        borderRadius: 4,
        fontSize: 14,
        boxSizing: 'border-box'
    },
    error: {
        color: '#e74c3c',
        fontSize: 13,
        marginBottom: 12
    },
    footer: {
        padding: '16px 20px',
        borderTop: '1px solid #eee',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12
    },
    btn: {
        padding: '10px 24px',
        border: 'none',
        borderRadius: 4,
        fontSize: 14,
        cursor: 'pointer'
    },
    btnCancel: {
        background: '#f5f5f5',
        color: '#666'
    },
    btnSubmit: {
        background: '#edae24',
        color: '#fff'
    },
    btnDisabled: {
        background: '#ccc',
        cursor: 'not-allowed'
    }
};
// 骨架屏样式
const skeletonStyles = {
    base: {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
        animation: 'skeleton-pulse 1.5s ease-in-out infinite'
    },
    logo: {
        width: 36,
        height: 36,
        borderRadius: 4
    },
    title: {
        width: 80,
        height: 16,
        marginLeft: 10
    },
    user: {
        width: 70,
        height: 32,
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: 3
    }
};
// 注入骨架屏动画样式
let skeletonStyleInjected = false;
function injectSkeletonStyle() {
    if (skeletonStyleInjected || typeof document === 'undefined')
        return;
    const style = document.createElement('style');
    style.textContent = `
    @keyframes skeleton-pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;
    document.head.appendChild(style);
    skeletonStyleInjected = true;
}
const SharedHeader = (props) => {
    const { loginApi = '/api/v1/school/login', baseUrl = '', loading = false, onLoginSuccess } = props;
    // 注入骨架屏动画样式
    react_1.default.useEffect(() => {
        injectSkeletonStyle();
    }, []);
    const [isUserInfoShow, setIsUserInfoShow] = (0, react_1.useState)(false);
    const [showLoginModal, setShowLoginModal] = (0, react_1.useState)(false);
    const [loginLoading, setLoginLoading] = (0, react_1.useState)(false);
    const [loginError, setLoginError] = (0, react_1.useState)('');
    const [loginForm, setLoginForm] = (0, react_1.useState)({ username: '', password: '' });
    const controller = (0, react_1.useMemo)(() => new Header_1.HeaderController(props), [props]);
    const t = controller.translations;
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
            const url = baseUrl + loginApi;
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.head?.code === '1000' && data.body) {
                // 登录成功，存储 token 到 cookie
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
    }, [loginForm, baseUrl, loginApi, onLoginSuccess, closeLoginModal]);
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Enter') {
            submitLogin();
        }
    }, [submitLogin]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', backgroundColor: '#edae24', height: 50, display: 'flex', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("div", { style: Header_1.headerStyles.logo, onClick: controller.handleGoHome.bind(controller), children: loading ? ((0, jsx_runtime_1.jsxs)("div", { style: Header_1.headerStyles.logoImage, children: [(0, jsx_runtime_1.jsx)("div", { style: { ...skeletonStyles.base, ...skeletonStyles.logo } }), (0, jsx_runtime_1.jsx)("div", { style: { ...skeletonStyles.base, ...skeletonStyles.title } })] })) : props.schoolInfo && Object.keys(props.schoolInfo).length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: Header_1.headerStyles.logoImage, children: [(0, jsx_runtime_1.jsx)("img", { style: Header_1.headerStyles.logoImg, src: props.schoolInfo.logo, alt: "logo" }), (0, jsx_runtime_1.jsx)("div", { style: Header_1.headerStyles.logoTitle, children: props.schoolInfo.name })] })) : null }), loading ? ((0, jsx_runtime_1.jsx)("div", { style: { ...skeletonStyles.base, ...skeletonStyles.user } })) : ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 10 }, children: [props.children && ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: 10 }, children: props.children })), props.isLogin ? ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { ...Header_1.headerStyles.userName, position: 'relative', right: 'auto', top: 'auto', transform: 'none' }, onClick: toggleUserInfo, children: [(0, jsx_runtime_1.jsx)("i", { className: "fa fa-user-o", style: { marginRight: 4 } }), (0, jsx_runtime_1.jsx)("span", { children: props.userInfo.name }), (0, jsx_runtime_1.jsx)("span", { style: {
                                            display: 'inline-block',
                                            transition: 'transform 0.5s',
                                            transform: isUserInfoShow ? 'rotateX(180deg)' : 'none',
                                            marginLeft: 4,
                                            fontSize: 12
                                        }, children: "\u25BC" })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    position: 'absolute',
                                    top: 32,
                                    right: 0,
                                    backgroundColor: '#0a3055',
                                    zIndex: 1999,
                                    overflow: 'hidden',
                                    transition: 'height 0.5s',
                                    height: isUserInfoShow ? 'auto' : 0
                                }, children: (0, jsx_runtime_1.jsxs)("ul", { style: { listStyle: 'none', margin: 0, padding: 0 }, children: [props.menuContent, (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "javascript:void(0)", onClick: (e) => { e.preventDefault(); props.onLogout?.(); }, style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    height: 32,
                                                    padding: '0 14px',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    borderTop: props.menuContent ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                                    cursor: 'pointer',
                                                    fontSize: 14
                                                }, children: t.logout }) })] }) })] })) : (
                    /* 未登录：显示登录按钮 */
                    (0, jsx_runtime_1.jsx)("button", { style: {
                            height: 32,
                            backgroundColor: '#0a3055',
                            borderRadius: 3,
                            padding: '0 14px',
                            fontSize: 14,
                            lineHeight: '32px',
                            color: '#fff',
                            cursor: 'pointer',
                            border: 'none'
                        }, onClick: openLoginModal, children: t.login }))] })), showLoginModal && ((0, jsx_runtime_1.jsx)("div", { style: modalStyles.overlay, onClick: (e) => e.target === e.currentTarget && closeLoginModal(), children: (0, jsx_runtime_1.jsxs)("div", { style: modalStyles.modal, children: [(0, jsx_runtime_1.jsxs)("div", { style: modalStyles.header, children: [(0, jsx_runtime_1.jsx)("h3", { style: modalStyles.title, children: "\u7528\u6237\u767B\u5F55" }), (0, jsx_runtime_1.jsx)("button", { style: modalStyles.closeBtn, onClick: closeLoginModal, children: "\u00D7" })] }), (0, jsx_runtime_1.jsxs)("div", { style: modalStyles.body, children: [loginError && (0, jsx_runtime_1.jsx)("div", { style: modalStyles.error, children: loginError }), (0, jsx_runtime_1.jsxs)("div", { style: modalStyles.formGroup, children: [(0, jsx_runtime_1.jsx)("label", { style: modalStyles.label, children: "\u7528\u6237\u540D" }), (0, jsx_runtime_1.jsx)("input", { type: "text", style: modalStyles.input, placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", value: loginForm.username, onChange: (e) => setLoginForm(prev => ({ ...prev, username: e.target.value })), onKeyDown: handleKeyDown })] }), (0, jsx_runtime_1.jsxs)("div", { style: modalStyles.formGroup, children: [(0, jsx_runtime_1.jsx)("label", { style: modalStyles.label, children: "\u5BC6\u7801" }), (0, jsx_runtime_1.jsx)("input", { type: "password", style: modalStyles.input, placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", value: loginForm.password, onChange: (e) => setLoginForm(prev => ({ ...prev, password: e.target.value })), onKeyDown: handleKeyDown })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: modalStyles.footer, children: [(0, jsx_runtime_1.jsx)("button", { style: { ...modalStyles.btn, ...modalStyles.btnCancel }, onClick: closeLoginModal, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)("button", { style: {
                                        ...modalStyles.btn,
                                        ...(loginLoading ? modalStyles.btnDisabled : modalStyles.btnSubmit)
                                    }, onClick: submitLogin, disabled: loginLoading, children: loginLoading ? '登录中...' : '登录' })] })] }) }))] }));
};
exports.SharedHeader = SharedHeader;
exports.default = exports.SharedHeader;
//# sourceMappingURL=Header.js.map