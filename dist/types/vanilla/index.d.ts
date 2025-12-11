import type { UserInfo, SchoolInfo, HeaderTranslations } from '../types';
export interface MenuItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface ActionButton {
    label: string;
    onClick?: () => void;
    className?: string;
}
export interface VanillaHeaderOptions {
    container: HTMLElement | string;
    userInfo?: UserInfo;
    schoolInfo?: SchoolInfo;
    isLogin?: boolean;
    loading?: boolean;
    translations?: HeaderTranslations;
    /** 自定义操作按钮（显示在用户名/登录按钮左侧） */
    actions?: ActionButton[];
    /** 自定义下拉菜单项（显示在"退出登录"上方） */
    menuItems?: MenuItem[];
    onLogout?: () => void;
    onLoginSuccess?: (userData: any) => void;
    onGoHome?: () => void;
}
export declare class SharedHeader {
    private container;
    private options;
    private isUserInfoShow;
    private showLoginModal;
    private eventsBound;
    constructor(options: VanillaHeaderOptions);
    private get t();
    update(options: Partial<VanillaHeaderOptions>): void;
    private renderActions;
    private renderMenuItems;
    private render;
    private bindEvents;
    private updateMenuState;
    private updateModalState;
    private submitLogin;
    openLoginModal(): void;
    closeLoginModal(): void;
}
export default SharedHeader;
