import type { HeaderTranslations } from '../types';
export declare const headerCss = "\n.shared-header {\n  position: relative;\n  background-color: #edae24;\n  height: 50px;\n  display: flex;\n  align-items: center;\n}\n.shared-header .header-logo {\n  position: absolute;\n  top: 0;\n  left: 20px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  z-index: 2000;\n  cursor: pointer;\n}\n.shared-header .header-logo img {\n  height: 36px;\n}\n.shared-header .header-logo .tit {\n  margin-left: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #fff;\n  line-height: 50px;\n}\n.shared-header .header-actions {\n  position: absolute;\n  right: 116px;\n  top: 50%;\n  transform: translateY(-50%);\n  display: flex;\n  gap: 10px;\n}\n.shared-header .header-user-name {\n  position: absolute;\n  right: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  height: 32px;\n  background-color: #0a3055;\n  border-radius: 3px;\n  padding: 0 14px;\n  font-size: 14px;\n  line-height: 32px;\n  color: #fff;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  z-index: 1998;\n}\n.shared-header .header-user-info {\n  position: absolute;\n  top: 50px;\n  right: 20px;\n  background-color: #0a3055;\n  z-index: 1999;\n  overflow: hidden;\n  transition: height 0.5s;\n}\n.shared-header .header-user-info ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.shared-header .header-user-info a {\n  display: block;\n  padding: 10px 16px;\n  color: #fff;\n  text-decoration: none;\n  border-top: 1px solid rgba(255,255,255,0.2);\n}\n.shared-header .header-user-info a:hover {\n  background-color: #0d3a6a;\n}\n.shared-header .user-menu-glyph {\n  transition: transform 0.5s;\n  font-size: 12px;\n}\n.shared-header .user-menu-glyph.show {\n  transform: rotateX(180deg);\n}\n";
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
        translations: {
            type: ObjectConstructor;
            default: () => {};
        };
    };
    emits: string[];
    data(): {
        isUserInfoShow: boolean;
    };
    computed: {
        t(): Required<HeaderTranslations>;
    };
    mounted(): void;
    methods: {
        toggleUserInfo(): void;
        handleLogout(): void;
        handleLogin(): void;
        handleGoHome(): void;
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
            translations: {
                type: ObjectConstructor;
                default: () => {};
            };
        };
        emits: string[];
        data(): {
            isUserInfoShow: boolean;
        };
        computed: {
            t(): Required<HeaderTranslations>;
        };
        mounted(): void;
        methods: {
            toggleUserInfo(): void;
            handleLogout(): void;
            handleLogin(): void;
            handleGoHome(): void;
        };
        template: string;
    };
};
export default _default;
export { headerCss as styles };
export type { HeaderTranslations };
