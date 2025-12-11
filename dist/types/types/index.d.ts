export interface UserInfo {
    id: string | number;
    name: string;
    [key: string]: unknown;
}
export interface SchoolInfo {
    logo: string;
    name: string;
    [key: string]: unknown;
}
export interface HttpConfig {
    baseUrl?: string;
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
    hasRoles?: boolean;
    onLogout?: () => void;
    onLogin?: () => void;
    onGoHome?: () => void;
    translations?: HeaderTranslations;
}
export interface HeaderTranslations {
    teacherDashboard?: string;
    background?: string;
    account?: string;
    logout?: string;
    login?: string;
}
export interface OssUploadOptions {
    folder?: string;
    kind?: string;
    originName?: string;
}
