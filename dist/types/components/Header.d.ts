import type { HeaderProps, HeaderTranslations } from '../types';
export declare class HeaderController {
    private props;
    private isUserInfoShow;
    constructor(props: HeaderProps);
    get userInfo(): import("..").UserInfo;
    get schoolInfo(): import("..").SchoolInfo;
    get isLogin(): boolean;
    get hasRoles(): boolean;
    get translations(): Required<HeaderTranslations>;
    toggleUserInfo(): boolean;
    getUserInfoVisible(): boolean;
    handleLogout(): void;
    handleLogin(): void;
    handleGoHome(): void;
    getMenuItems(): {
        label: string;
        href?: string;
        action?: () => void;
        visible: boolean;
    }[];
}
export declare const headerStyles: {
    container: {
        position: "relative";
        backgroundColor: string;
        padding: string;
        minHeight: string;
    };
    logo: {
        position: "absolute";
        top: number;
        left: string;
        zIndex: number;
    };
    logoImage: {
        display: string;
        height: string;
        alignItems: string;
    };
    logoImg: {
        height: string;
    };
    logoTitle: {
        marginLeft: string;
        fontSize: string;
        fontWeight: number;
        color: string;
    };
    userName: {
        height: string;
        position: "relative";
        float: "right";
        margin: string;
        whiteSpace: "nowrap";
        backgroundColor: string;
        borderRadius: string;
        padding: string;
        fontSize: string;
        lineHeight: string;
        boxSizing: "border-box";
        textAlign: "center";
        zIndex: number;
        color: string;
        cursor: string;
    };
    userInfo: {
        backgroundColor: string;
        textAlign: "left";
        whiteSpace: "nowrap";
        position: "absolute";
        top: string;
        right: string;
        padding: number;
        zIndex: number;
        fontSize: string;
        overflow: string;
    };
    menuItem: {
        borderTop: string;
        display: string;
        padding: string;
        color: string;
        backgroundColor: string;
        cursor: string;
        textDecoration: string;
    };
    editButton: {
        border: string;
        borderRadius: string;
        background: string;
        color: string;
        height: string;
        padding: string;
        cursor: string;
    };
};
export type { HeaderProps, HeaderTranslations };
