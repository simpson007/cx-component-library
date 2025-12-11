import React, { useState, useMemo, ReactNode } from 'react'
import { HeaderController, headerStyles } from '../components/Header'
import type { HeaderProps } from '../types'

interface SharedHeaderProps extends HeaderProps {
  children?: ReactNode
}

export const SharedHeader: React.FC<SharedHeaderProps> = (props) => {
  const [isUserInfoShow, setIsUserInfoShow] = useState(false)
  
  const controller = useMemo(() => new HeaderController(props), [props])
  const menuItems = controller.getMenuItems()
  const t = controller.translations

  const toggleUserInfo = () => setIsUserInfoShow(!isUserInfoShow)

  return (
    <div style={{ position: 'relative', backgroundColor: '#edae24', padding: '10px 0', minHeight: 50 }}>
      {/* Logo */}
      <div style={headerStyles.logo} onClick={controller.handleGoHome.bind(controller)}>
        {props.schoolInfo && Object.keys(props.schoolInfo).length > 0 && (
          <div style={headerStyles.logoImage}>
            <img 
              style={headerStyles.logoImg} 
              src={props.schoolInfo.logo} 
              alt="logo" 
            />
            <div style={headerStyles.logoTitle}>{props.schoolInfo.name}</div>
          </div>
        )}
      </div>

      {/* User Name */}
      <div style={headerStyles.userName} onClick={toggleUserInfo}>
        <i className="fa fa-user-o" style={{ marginRight: 4 }} />
        <span>{props.userInfo.name}</span>
        <span 
          style={{ 
            display: 'inline-block',
            transition: 'transform 0.5s',
            transform: isUserInfoShow ? 'rotateX(180deg)' : 'none',
            marginLeft: 4
          }}
        >
          ▼
        </span>
      </div>

      {/* User Info Dropdown */}
      <div 
        style={{
          ...headerStyles.userInfo,
          height: isUserInfoShow ? 'auto' : 0
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <a href={item.href} style={headerStyles.menuItem}>
                  {item.label}
                </a>
              ) : (
                <a 
                  href="javascript:void(0)" 
                  onClick={(e) => { e.preventDefault(); item.action?.() }}
                  style={headerStyles.menuItem}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 自定义操作区域 */}
      {props.children && (
        <div style={{ position: 'absolute', right: 140, top: '50%', transform: 'translateY(-50%)' }}>
          {props.children}
        </div>
      )}
    </div>
  )
}

export default SharedHeader
