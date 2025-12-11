import type { HeaderTranslations } from '../types';
export declare const headerCss = "\n.shared-header {\n  position: relative;\n  background-color: #edae24;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.shared-header .header-logo {\n  position: absolute;\n  top: 0;\n  left: 20px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  z-index: 2000;\n  cursor: pointer;\n}\n.shared-header .header-logo img {\n  height: 36px;\n}\n.shared-header .header-logo .tit {\n  margin-left: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #fff;\n  line-height: 50px;\n}\n.shared-header .header-right {\n  position: absolute;\n  right: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.shared-header .header-actions {\n  display: flex;\n  gap: 10px;\n}\n.shared-header .header-user-name {\n  height: 32px;\n  background-color: #0a3055;\n  border-radius: 3px;\n  padding: 0 14px;\n  font-size: 14px;\n  line-height: 32px;\n  color: #fff;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.shared-header .header-login-btn {\n  height: 32px;\n  background-color: #0a3055;\n  border-radius: 3px;\n  padding: 0 14px;\n  font-size: 14px;\n  line-height: 32px;\n  color: #fff;\n  cursor: pointer;\n  border: none;\n}\n.shared-header .header-login-btn:hover {\n  background-color: #0d3a6a;\n}\n.shared-header .header-user-info {\n  position: absolute;\n  top: 50px;\n  right: 0;\n  background-color: #0a3055;\n  z-index: 1999;\n  overflow: hidden;\n  transition: height 0.5s;\n}\n.shared-header .header-user-info ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.shared-header .header-user-info a,\n.shared-header .header-user-info .menu-item {\n  display: flex;\n  align-items: center;\n  height: 32px;\n  padding: 0 14px;\n  color: #fff;\n  text-decoration: none;\n  border-top: 1px solid rgba(255,255,255,0.2);\n  cursor: pointer;\n  font-size: 14px;\n  box-sizing: border-box;\n}\n.shared-header .header-user-info li:first-child a,\n.shared-header .header-user-info li:first-child .menu-item {\n  border-top: none;\n}\n.shared-header .header-user-info a:hover,\n.shared-header .header-user-info .menu-item:hover {\n  background-color: #0d3a6a;\n}\n.shared-header .user-menu-glyph {\n  transition: transform 0.5s;\n  font-size: 12px;\n}\n.shared-header .user-menu-glyph.show {\n  transform: rotateX(180deg);\n}\n\n/* \u9AA8\u67B6\u5C4F\u6837\u5F0F */\n@keyframes skeleton-pulse {\n  0% { opacity: 0.6; }\n  50% { opacity: 1; }\n  100% { opacity: 0.6; }\n}\n.shared-header .skeleton {\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 4px;\n  animation: skeleton-pulse 1.5s ease-in-out infinite;\n}\n.shared-header .skeleton-logo {\n  width: 36px;\n  height: 36px;\n  border-radius: 4px;\n}\n.shared-header .skeleton-title {\n  width: 80px;\n  height: 16px;\n  margin-left: 10px;\n}\n.shared-header .skeleton-user {\n  width: 70px;\n  height: 32px;\n  position: absolute;\n  right: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  border-radius: 3px;\n}\n\n/* \u767B\u5F55\u5F39\u6846\u6837\u5F0F */\n.shared-header .login-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s;\n}\n.shared-header .login-modal-overlay.show {\n  opacity: 1;\n  visibility: visible;\n}\n.shared-header .login-modal {\n  background: #fff;\n  border-radius: 8px;\n  width: 400px;\n  max-width: 90%;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n  transform: translateY(-20px);\n  transition: transform 0.3s;\n}\n.shared-header .login-modal-overlay.show .login-modal {\n  transform: translateY(0);\n}\n.shared-header .login-modal-header {\n  padding: 16px 20px;\n  border-bottom: 1px solid #eee;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.shared-header .login-modal-header h3 {\n  margin: 0;\n  font-size: 18px;\n  color: #333;\n}\n.shared-header .login-modal-close {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #999;\n  line-height: 1;\n}\n.shared-header .login-modal-close:hover {\n  color: #333;\n}\n.shared-header .login-modal-body {\n  padding: 24px 20px;\n}\n.shared-header .login-form-group {\n  margin-bottom: 16px;\n}\n.shared-header .login-form-group label {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 14px;\n  color: #333;\n}\n.shared-header .login-form-group input {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  box-sizing: border-box;\n}\n.shared-header .login-form-group input:focus {\n  outline: none;\n  border-color: #edae24;\n}\n.shared-header .login-error {\n  color: #e74c3c;\n  font-size: 13px;\n  margin-bottom: 12px;\n  display: none;\n}\n.shared-header .login-error.show {\n  display: block;\n}\n.shared-header .login-modal-footer {\n  padding: 16px 20px;\n  border-top: 1px solid #eee;\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n}\n.shared-header .login-btn {\n  padding: 10px 24px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.shared-header .login-btn-cancel {\n  background: #f5f5f5;\n  color: #666;\n}\n.shared-header .login-btn-cancel:hover {\n  background: #eee;\n}\n.shared-header .login-btn-submit {\n  background: #edae24;\n  color: #fff;\n}\n.shared-header .login-btn-submit:hover {\n  background: #d9a020;\n}\n.shared-header .login-btn-submit:disabled {\n  background: #ccc;\n  cursor: not-allowed;\n}\n";
export declare const SharedHeader: {
    name: string;
    props: {
        userInfo: {
            type: ObjectConstructor;
            required: boolean;
        };
        schoolInfo: {
            type: ObjectConstructor;
            default: () => {};
        };
        isLogin: {
            type: BooleanConstructor;
            default: boolean;
        };
        hasRoles: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        translations: {
            type: ObjectConstructor;
            default: () => {};
        };
        loginApi: {
            type: StringConstructor;
            default: string;
        };
        baseUrl: {
            type: StringConstructor;
            default: string;
        };
    };
    emits: string[];
    expose: string[];
    data(): {
        isUserInfoShow: boolean;
        showLoginModal: boolean;
        loginLoading: boolean;
        loginError: string;
        loginForm: {
            username: string;
            password: string;
        };
    };
    computed: {
        t(): Required<HeaderTranslations>;
    };
    mounted(): void;
    methods: {
        toggleUserInfo(): void;
        handleLogout(): void;
        openLoginModal(): void;
        closeLoginModal(): void;
        submitLogin(): Promise<void>;
        handleGoHome(): void;
        handleKeydown(e: KeyboardEvent): void;
    };
    template: string;
};
export declare function install(app: {
    component: (name: string, comp: unknown) => void;
}): void;
declare const _default: {
    install: typeof install;
    SharedHeader: {
        name: string;
        props: {
            userInfo: {
                type: ObjectConstructor;
                required: boolean;
            };
            schoolInfo: {
                type: ObjectConstructor;
                default: () => {};
            };
            isLogin: {
                type: BooleanConstructor;
                default: boolean;
            };
            hasRoles: {
                type: BooleanConstructor;
                default: boolean;
            };
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            translations: {
                type: ObjectConstructor;
                default: () => {};
            };
            loginApi: {
                type: StringConstructor;
                default: string;
            };
            baseUrl: {
                type: StringConstructor;
                default: string;
            };
        };
        emits: string[];
        expose: string[];
        data(): {
            isUserInfoShow: boolean;
            showLoginModal: boolean;
            loginLoading: boolean;
            loginError: string;
            loginForm: {
                username: string;
                password: string;
            };
        };
        computed: {
            t(): Required<HeaderTranslations>;
        };
        mounted(): void;
        methods: {
            toggleUserInfo(): void;
            handleLogout(): void;
            openLoginModal(): void;
            closeLoginModal(): void;
            submitLogin(): Promise<void>;
            handleGoHome(): void;
            handleKeydown(e: KeyboardEvent): void;
        };
        template: string;
    };
};
export default _default;
export { headerCss as styles };
export type { HeaderTranslations };
