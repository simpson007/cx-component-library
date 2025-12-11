import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { HeaderController, headerStyles } from '../components/Header';
export const SharedHeader = (props) => {
    const [isUserInfoShow, setIsUserInfoShow] = useState(false);
    const controller = useMemo(() => new HeaderController(props), [props]);
    const menuItems = controller.getMenuItems();
    const t = controller.translations;
    const toggleUserInfo = () => setIsUserInfoShow(!isUserInfoShow);
    return (_jsxs("div", { style: { position: 'relative', backgroundColor: '#edae24', padding: '10px 0', minHeight: 50 }, children: [_jsx("div", { style: headerStyles.logo, onClick: controller.handleGoHome.bind(controller), children: props.schoolInfo && Object.keys(props.schoolInfo).length > 0 && (_jsxs("div", { style: headerStyles.logoImage, children: [_jsx("img", { style: headerStyles.logoImg, src: props.schoolInfo.logo, alt: "logo" }), _jsx("div", { style: headerStyles.logoTitle, children: props.schoolInfo.name })] })) }), _jsxs("div", { style: headerStyles.userName, onClick: toggleUserInfo, children: [_jsx("i", { className: "fa fa-user-o", style: { marginRight: 4 } }), _jsx("span", { children: props.userInfo.name }), _jsx("span", { style: {
                            display: 'inline-block',
                            transition: 'transform 0.5s',
                            transform: isUserInfoShow ? 'rotateX(180deg)' : 'none',
                            marginLeft: 4
                        }, children: "\u25BC" })] }), _jsx("div", { style: {
                    ...headerStyles.userInfo,
                    height: isUserInfoShow ? 'auto' : 0
                }, children: _jsx("ul", { style: { listStyle: 'none', margin: 0, padding: 0 }, children: menuItems.map((item, index) => (_jsx("li", { children: item.href ? (_jsx("a", { href: item.href, style: headerStyles.menuItem, children: item.label })) : (_jsx("a", { href: "javascript:void(0)", onClick: (e) => { e.preventDefault(); item.action?.(); }, style: headerStyles.menuItem, children: item.label })) }, index))) }) }), props.children && (_jsx("div", { style: { position: 'absolute', right: 140, top: '50%', transform: 'translateY(-50%)' }, children: props.children }))] }));
};
export default SharedHeader;
//# sourceMappingURL=Header.js.map