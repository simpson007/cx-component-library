import React, { ReactNode } from 'react';
import type { HeaderProps } from '../types';
interface SharedHeaderProps extends HeaderProps {
    children?: ReactNode;
    menuContent?: ReactNode;
    loading?: boolean;
    onLoginSuccess?: (userData: any) => void;
}
export declare const SharedHeader: React.FC<SharedHeaderProps>;
export default SharedHeader;
