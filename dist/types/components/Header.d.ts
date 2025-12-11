import type { HeaderProps, HeaderTranslations } from '../types';
export declare class HeaderController {
    private props;
    constructor(props: HeaderProps);
    get userInfo(): import("..").UserInfo;
    get schoolInfo(): import("..").SchoolInfo;
    get isLogin(): boolean;
    get hasRoles(): boolean;
    get translations(): Required<HeaderTranslations>;
    handleLogout(): void;
    handleGoHome(): void;
}
export declare const headerStyles: {
    container: {
        position: "relative";
        backgroundColor: string;
        height: number;
        display: string;
        alignItems: string;
    };
    logo: {
        position: "absolute";
        top: number;
        left: number;
        height: number;
        display: string;
        alignItems: string;
        zIndex: number;
        cursor: string;
    };
    logoImage: {
        display: string;
        height: number;
        alignItems: string;
    };
    logoImg: {
        height: number;
    };
    logoTitle: {
        marginLeft: number;
        fontSize: number;
        fontWeight: number;
        color: string;
        lineHeight: string;
    };
    userName: {
        height: number;
        backgroundColor: string;
        borderRadius: number;
        padding: string;
        fontSize: number;
        lineHeight: string;
        color: string;
        cursor: string;
        display: string;
        alignItems: string;
        gap: number;
    };
    menuItem: {
        display: string;
        alignItems: string;
        height: number;
        padding: string;
        color: string;
        textDecoration: string;
        borderTop: string;
        cursor: string;
        fontSize: number;
        backgroundColor: string;
    };
    menuItemFirst: {
        display: string;
        alignItems: string;
        height: number;
        padding: string;
        color: string;
        textDecoration: string;
        cursor: string;
        fontSize: number;
        backgroundColor: string;
    };
};
export type { HeaderProps, HeaderTranslations };
