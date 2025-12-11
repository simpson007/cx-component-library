export interface UserRole {
    admin?: boolean;
    super_admin?: boolean;
    [key: string]: unknown;
}
export interface UserInfo {
    id: string | number;
    name: string;
    role?: UserRole[];
    [key: string]: unknown;
}
export type UserRoleType = 'guest' | 'user' | 'admin' | 'superAdmin';
export interface SchoolInfo {
    logo: string;
    name: string;
    [key: string]: unknown;
}
export interface HttpConfig {
    /** API 基础地址，开发环境建议设置为 'https://cx.istemedu.com'，生产环境设置为 '' */
    baseUrl?: string;
    /** 是否为开发环境，设置为 true 时如果未指定 baseUrl 则自动使用 https://cx.istemedu.com */
    isDev?: boolean;
    timeout?: number;
    getToken?: () => string | null;
    getLanguage?: () => string | null;
    onUnauthorized?: () => void;
    onError?: (error: Error) => void;
}
export interface ApiResponse<T = unknown> {
    head?: {
        code: string;
        msg: string;
    };
    body?: T;
    data?: T;
}
export interface HeaderProps {
    userInfo: UserInfo;
    schoolInfo: SchoolInfo;
    isLogin: boolean;
    onLogout?: () => void;
    onGoHome?: () => void;
    translations?: HeaderTranslations;
}
export interface HeaderTranslations {
    logout?: string;
    login?: string;
}
