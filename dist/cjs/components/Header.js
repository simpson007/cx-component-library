"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerStyles = exports.HeaderController = void 0;
// 框架无关的 Header 逻辑层
class HeaderController {
    constructor(props) {
        this.props = props;
    }
    get userInfo() {
        return this.props.userInfo;
    }
    get schoolInfo() {
        return this.props.schoolInfo;
    }
    get isLogin() {
        return this.props.isLogin;
    }
    get translations() {
        return {
            logout: this.props.translations?.logout ?? '退出登录',
            login: this.props.translations?.login ?? '登录'
        };
    }
    handleLogout() {
        this.props.onLogout?.();
    }
    handleGoHome() {
        this.props.onGoHome?.();
    }
}
exports.HeaderController = HeaderController;
// Header 样式常量
exports.headerStyles = {
    container: {
        position: 'relative',
        backgroundColor: '#edae24',
        height: 50,
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        position: 'absolute',
        top: 0,
        left: 20,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        zIndex: 2000,
        cursor: 'pointer'
    },
    logoImage: {
        display: 'flex',
        height: 50,
        alignItems: 'center'
    },
    logoImg: {
        height: 36
    },
    logoTitle: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 600,
        color: '#fff',
        lineHeight: '50px'
    },
    userName: {
        height: 32,
        backgroundColor: '#0a3055',
        borderRadius: 3,
        padding: '0 14px',
        fontSize: 14,
        lineHeight: '32px',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        height: 32,
        padding: '0 14px',
        color: '#fff',
        textDecoration: 'none',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        cursor: 'pointer',
        fontSize: 14,
        backgroundColor: '#0a3055'
    },
    menuItemFirst: {
        display: 'flex',
        alignItems: 'center',
        height: 32,
        padding: '0 14px',
        color: '#fff',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: 14,
        backgroundColor: '#0a3055'
    }
};
//# sourceMappingURL=Header.js.map