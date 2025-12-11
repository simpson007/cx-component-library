import type { UserInfo, SchoolInfo, HeaderTranslations } from '../types';
export interface VanillaHeaderOptions {
    container: HTMLElement | string;
    userInfo?: UserInfo;
    schoolInfo?: SchoolInfo;
    isLogin?: boolean;
    loading?: boolean;
    translations?: HeaderTranslations;
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
    private render;
    private bindEvents;
    private updateMenuState;
    private updateModalState;
    private submitLogin;
    openLoginModal(): void;
    closeLoginModal(): void;
}
export default SharedHeader;
