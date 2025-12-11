"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Header_1 = require("../components/Header");
const SharedHeader = (props) => {
    const [isUserInfoShow, setIsUserInfoShow] = (0, react_1.useState)(false);
    const controller = (0, react_1.useMemo)(() => new Header_1.HeaderController(props), [props]);
    const menuItems = controller.getMenuItems();
    const t = controller.translations;
    const toggleUserInfo = () => setIsUserInfoShow(!isUserInfoShow);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', backgroundColor: '#edae24', padding: '10px 0', minHeight: 50 }, children: [(0, jsx_runtime_1.jsx)("div", { style: Header_1.headerStyles.logo, onClick: controller.handleGoHome.bind(controller), children: props.schoolInfo && Object.keys(props.schoolInfo).length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: Header_1.headerStyles.logoImage, children: [(0, jsx_runtime_1.jsx)("img", { style: Header_1.headerStyles.logoImg, src: props.schoolInfo.logo, alt: "logo" }), (0, jsx_runtime_1.jsx)("div", { style: Header_1.headerStyles.logoTitle, children: props.schoolInfo.name })] })) }), (0, jsx_runtime_1.jsxs)("div", { style: Header_1.headerStyles.userName, onClick: toggleUserInfo, children: [(0, jsx_runtime_1.jsx)("i", { className: "fa fa-user-o", style: { marginRight: 4 } }), (0, jsx_runtime_1.jsx)("span", { children: props.userInfo.name }), (0, jsx_runtime_1.jsx)("span", { style: {
                            display: 'inline-block',
                            transition: 'transform 0.5s',
                            transform: isUserInfoShow ? 'rotateX(180deg)' : 'none',
                            marginLeft: 4
                        }, children: "\u25BC" })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    ...Header_1.headerStyles.userInfo,
                    height: isUserInfoShow ? 'auto' : 0
                }, children: (0, jsx_runtime_1.jsx)("ul", { style: { listStyle: 'none', margin: 0, padding: 0 }, children: menuItems.map((item, index) => ((0, jsx_runtime_1.jsx)("li", { children: item.href ? ((0, jsx_runtime_1.jsx)("a", { href: item.href, style: Header_1.headerStyles.menuItem, children: item.label })) : ((0, jsx_runtime_1.jsx)("a", { href: "javascript:void(0)", onClick: (e) => { e.preventDefault(); item.action?.(); }, style: Header_1.headerStyles.menuItem, children: item.label })) }, index))) }) }), props.children && ((0, jsx_runtime_1.jsx)("div", { style: { position: 'absolute', right: 140, top: '50%', transform: 'translateY(-50%)' }, children: props.children }))] }));
};
exports.SharedHeader = SharedHeader;
exports.default = exports.SharedHeader;
//# sourceMappingURL=Header.js.map