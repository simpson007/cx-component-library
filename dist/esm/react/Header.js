import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo, useCallback } from 'react';
import { HeaderController, headerStyles } from '../components/Header';
import { postSchoolLogin } from '../api/endpoints';
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
export const SharedHeader = (props) => {
    const { loginApi = '/api/v1/school/login', baseUrl = '', loading = false, onLoginSuccess } = props;
    // 注入骨架屏动画样式
    React.useEffect(() => {
        injectSkeletonStyle();
    }, []);
    const [isUserInfoShow, setIsUserInfoShow] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const controller = useMemo(() => new HeaderController(props), [props]);
    const t = controller.translations;
    const toggleUserInfo = () => setIsUserInfoShow(!isUserInfoShow);
    const openLoginModal = useCallback(() => {
        setShowLoginModal(true);
        setLoginError('');
        setLoginForm({ username: '', password: '' });
        setIsUserInfoShow(false);
    }, []);
    const closeLoginModal = useCallback(() => {
        setShowLoginModal(false);
        setLoginError('');
        setLoginLoading(false);
    }, []);
    const submitLogin = useCallback(async () => {
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
            // 使用 postSchoolLogin API（会自动使用 initHttp 配置的 baseUrl）
            const data = await postSchoolLogin(formData);
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
    }, [loginForm, onLoginSuccess, closeLoginModal]);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            submitLogin();
        }
    }, [submitLogin]);
    return (_jsxs("div", { style: { position: 'relative', backgroundColor: '#edae24', height: 50, display: 'flex', alignItems: 'center' }, children: [_jsx("div", { style: headerStyles.logo, onClick: controller.handleGoHome.bind(controller), children: loading ? (_jsxs("div", { style: headerStyles.logoImage, children: [_jsx("div", { style: { ...skeletonStyles.base, ...skeletonStyles.logo } }), _jsx("div", { style: { ...skeletonStyles.base, ...skeletonStyles.title } })] })) : props.schoolInfo && Object.keys(props.schoolInfo).length > 0 ? (_jsxs("div", { style: headerStyles.logoImage, children: [_jsx("img", { style: headerStyles.logoImg, src: props.schoolInfo.logo, alt: "logo" }), _jsx("div", { style: headerStyles.logoTitle, children: props.schoolInfo.name })] })) : null }), loading ? (_jsx("div", { style: { ...skeletonStyles.base, ...skeletonStyles.user } })) : (_jsxs("div", { style: { position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 10 }, children: [props.children && (_jsx("div", { style: { display: 'flex', gap: 10 }, children: props.children })), props.isLogin ? (_jsxs("div", { style: { position: 'relative' }, children: [_jsxs("div", { style: { ...headerStyles.userName, position: 'relative', right: 'auto', top: 'auto', transform: 'none' }, onClick: toggleUserInfo, children: [_jsx("i", { className: "fa fa-user-o", style: { marginRight: 4 } }), _jsx("span", { children: props.userInfo.name }), _jsx("span", { style: {
                                            display: 'inline-block',
                                            transition: 'transform 0.5s',
                                            transform: isUserInfoShow ? 'rotateX(180deg)' : 'none',
                                            marginLeft: 4,
                                            fontSize: 12
                                        }, children: "\u25BC" })] }), _jsx("div", { style: {
                                    position: 'absolute',
                                    top: 32,
                                    right: 0,
                                    backgroundColor: '#0a3055',
                                    zIndex: 1999,
                                    overflow: 'hidden',
                                    transition: 'height 0.5s',
                                    height: isUserInfoShow ? 'auto' : 0
                                }, children: _jsxs("ul", { style: { listStyle: 'none', margin: 0, padding: 0 }, children: [props.menuContent, _jsx("li", { children: _jsx("a", { href: "javascript:void(0)", onClick: (e) => { e.preventDefault(); props.onLogout?.(); }, style: {
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
                    _jsx("button", { style: {
                            height: 32,
                            backgroundColor: '#0a3055',
                            borderRadius: 3,
                            padding: '0 14px',
                            fontSize: 14,
                            lineHeight: '32px',
                            color: '#fff',
                            cursor: 'pointer',
                            border: 'none'
                        }, onClick: openLoginModal, children: t.login }))] })), showLoginModal && (_jsx("div", { style: modalStyles.overlay, onClick: (e) => e.target === e.currentTarget && closeLoginModal(), children: _jsxs("div", { style: modalStyles.modal, children: [_jsxs("div", { style: modalStyles.header, children: [_jsx("h3", { style: modalStyles.title, children: "\u7528\u6237\u767B\u5F55" }), _jsx("button", { style: modalStyles.closeBtn, onClick: closeLoginModal, children: "\u00D7" })] }), _jsxs("div", { style: modalStyles.body, children: [loginError && _jsx("div", { style: modalStyles.error, children: loginError }), _jsxs("div", { style: modalStyles.formGroup, children: [_jsx("label", { style: modalStyles.label, children: "\u7528\u6237\u540D" }), _jsx("input", { type: "text", style: modalStyles.input, placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D", value: loginForm.username, onChange: (e) => setLoginForm(prev => ({ ...prev, username: e.target.value })), onKeyDown: handleKeyDown })] }), _jsxs("div", { style: modalStyles.formGroup, children: [_jsx("label", { style: modalStyles.label, children: "\u5BC6\u7801" }), _jsx("input", { type: "password", style: modalStyles.input, placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801", value: loginForm.password, onChange: (e) => setLoginForm(prev => ({ ...prev, password: e.target.value })), onKeyDown: handleKeyDown })] })] }), _jsxs("div", { style: modalStyles.footer, children: [_jsx("button", { style: { ...modalStyles.btn, ...modalStyles.btnCancel }, onClick: closeLoginModal, children: "\u53D6\u6D88" }), _jsx("button", { style: {
                                        ...modalStyles.btn,
                                        ...(loginLoading ? modalStyles.btnDisabled : modalStyles.btnSubmit)
                                    }, onClick: submitLogin, disabled: loginLoading, children: loginLoading ? '登录中...' : '登录' })] })] }) }))] }));
};
export default SharedHeader;
//# sourceMappingURL=Header.js.map