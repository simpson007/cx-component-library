import React, { ReactNode } from 'react';
import type { HeaderProps } from '../types';
interface SharedHeaderProps extends HeaderProps {
    children?: ReactNode;
}
export declare const SharedHeader: React.FC<SharedHeaderProps>;
export default SharedHeader;
