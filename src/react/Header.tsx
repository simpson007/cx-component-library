import React, { useState, useMemo, ReactNode, useCallback } from 'react'
import { HeaderController, headerStyles } from '../components/Header'
import { postSchoolLogin } from '../api/endpoints'
import type { HeaderProps } from '../types'

interface SharedHeaderProps extends HeaderProps {
  children?: ReactNode
  menuContent?: ReactNode
  loginApi?: string
  baseUrl?: string
  loading?: boolean
  onLoginSuccess?: (userData: any) => void
}

// 登录弹框样式
const modalStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    transition: 'all 0.3s'
  },
  modal: {
    background: '#fff',
    borderRadius: 8,
    width: 400,
    maxWidth: '90%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
  },
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: 18,
    color: '#333'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    color: '#999',
    lineHeight: 1
  },
  body: {
    padding: '24px 20px'
  },
  formGroup: {
    marginBottom: 16
  },
  label: {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: 4,
    fontSize: 14,
    boxSizing: 'border-box' as const
  },
  error: {
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 12
  },
  footer: {
    padding: '16px 20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12
  },
  btn: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: 4,
    fontSize: 14,
    cursor: 'pointer'
  },
  btnCancel: {
    background: '#f5f5f5',
    color: '#666'
  },
  btnSubmit: {
    background: '#edae24',
    color: '#fff'
  },
  btnDisabled: {
    background: '#ccc',
    cursor: 'not-allowed'
  }
}

// 骨架屏样式
const skeletonStyles: Record<string, React.CSSProperties> = {
  base: {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    animation: 'skeleton-pulse 1.5s ease-in-out infinite'
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 4
  },
  title: {
    width: 80,
    height: 16,
    marginLeft: 10
  },
  user: {
    width: 70,
    height: 32,
    position: 'absolute' as const,
    right: 20,
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: 3
  }
}

// 注入骨架屏动画样式
let skeletonStyleInjected = false
function injectSkeletonStyle() {
  if (skeletonStyleInjected || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.textContent = `
    @keyframes skeleton-pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `
  document.head.appendChild(style)
  skeletonStyleInjected = true
}

export const SharedHeader: React.FC<SharedHeaderProps> = (props) => {
  const { loginApi = '/api/v1/school/login', baseUrl = '', loading = false, onLoginSuccess } = props
  
  // 注入骨架屏动画样式
  React.useEffect(() => {
    injectSkeletonStyle()
  }, [])
  
  const [isUserInfoShow, setIsUserInfoShow] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  
  const controller = useMemo(() => new HeaderController(props), [props])
  const t = controller.translations

  const toggleUserInfo = () => setIsUserInfoShow(!isUserInfoShow)

  const openLoginModal = useCallback(() => {
    setShowLoginModal(true)
    setLoginError('')
    setLoginForm({ username: '', password: '' })
    setIsUserInfoShow(false)
  }, [])

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false)
    setLoginError('')
    setLoginLoading(false)
  }, [])

  const submitLogin = useCallback(async () => {
    if (!loginForm.username) {
      setLoginError('请输入用户名')
      return
    }
    if (!loginForm.password) {
      setLoginError('请输入密码')
      return
    }

    setLoginLoading(true)
    setLoginError('')

    try {
      const formData = new FormData()
      formData.append('username', loginForm.username)
      formData.append('password', loginForm.password)

      // 使用 postSchoolLogin API（会自动使用 initHttp 配置的 baseUrl）
      const data = await postSchoolLogin(formData)

      if (data.head?.code === '1000' && data.body) {
        // 登录成功，存储 token 到 cookie
        const token = (data.body as any).token
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
        document.cookie = `token=${token}; expires=${expires}; path=/`

        closeLoginModal()
        onLoginSuccess?.(data.body)
      } else {
        setLoginError(data.head?.msg || '登录失败')
      }
    } catch (error: any) {
      setLoginError(error.message || '网络错误，请重试')
    } finally {
      setLoginLoading(false)
    }
  }, [loginForm, onLoginSuccess, closeLoginModal])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitLogin()
    }
  }, [submitLogin])



  return (
    <div style={{ position: 'relative', backgroundColor: '#edae24', height: 50, display: 'flex', alignItems: 'center' }}>
      {/* Logo */}
      <div style={headerStyles.logo} onClick={controller.handleGoHome.bind(controller)}>
        {loading ? (
          <div style={headerStyles.logoImage}>
            <div style={{ ...skeletonStyles.base, ...skeletonStyles.logo }} />
            <div style={{ ...skeletonStyles.base, ...skeletonStyles.title }} />
          </div>
        ) : props.schoolInfo && Object.keys(props.schoolInfo).length > 0 ? (
          <div style={headerStyles.logoImage}>
            <img 
              style={headerStyles.logoImg} 
              src={props.schoolInfo.logo} 
              alt="logo" 
            />
            <div style={headerStyles.logoTitle}>{props.schoolInfo.name}</div>
          </div>
        ) : null}
      </div>

      {/* 右侧区域：自定义按钮 + 用户/登录 */}
      {loading ? (
        <div style={{ ...skeletonStyles.base, ...skeletonStyles.user }} />
      ) : (
        <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* 自定义操作区域 */}
          {props.children && (
            <div style={{ display: 'flex', gap: 10 }}>
              {props.children}
            </div>
          )}

          {/* User Name / Login Button */}
          {props.isLogin ? (
            <div style={{ position: 'relative' }}>
              {/* 已登录：显示用户名+下拉箭头 */}
              <div style={{ ...headerStyles.userName, position: 'relative', right: 'auto', top: 'auto', transform: 'none' }} onClick={toggleUserInfo}>
                <i className="fa fa-user-o" style={{ marginRight: 4 }} />
                <span>{props.userInfo.name}</span>
                <span 
                  style={{ 
                    display: 'inline-block',
                    transition: 'transform 0.5s',
                    transform: isUserInfoShow ? 'rotateX(180deg)' : 'none',
                    marginLeft: 4,
                    fontSize: 12
                  }}
                >
                  ▼
                </span>
              </div>

              {/* User Info Dropdown */}
              <div 
                style={{
                  position: 'absolute',
                  top: 32,
                  right: 0,
                  backgroundColor: '#0a3055',
                  zIndex: 1999,
                  overflow: 'hidden',
                  transition: 'height 0.5s',
                  height: isUserInfoShow ? 'auto' : 0
                }}
              >
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {/* 用户自定义菜单项 */}
                  {props.menuContent}
                  {/* 退出登录（始终显示） */}
                  <li>
                    <a 
                      href="javascript:void(0)" 
                      onClick={(e) => { e.preventDefault(); props.onLogout?.() }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 32,
                        padding: '0 14px',
                        color: '#fff',
                        textDecoration: 'none',
                        borderTop: props.menuContent ? '1px solid rgba(255,255,255,0.2)' : 'none',
                        cursor: 'pointer',
                        fontSize: 14
                      }}
                    >
                      {t.logout}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            /* 未登录：显示登录按钮 */
            <button 
              style={{
                height: 32,
                backgroundColor: '#0a3055',
                borderRadius: 3,
                padding: '0 14px',
                fontSize: 14,
                lineHeight: '32px',
                color: '#fff',
                cursor: 'pointer',
                border: 'none'
              }}
              onClick={openLoginModal}
            >
              {t.login}
            </button>
          )}
        </div>
      )}

      {/* 登录弹框 */}
      {showLoginModal && (
        <div style={modalStyles.overlay} onClick={(e) => e.target === e.currentTarget && closeLoginModal()}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.header}>
              <h3 style={modalStyles.title}>用户登录</h3>
              <button style={modalStyles.closeBtn} onClick={closeLoginModal}>&times;</button>
            </div>
            <div style={modalStyles.body}>
              {loginError && <div style={modalStyles.error}>{loginError}</div>}
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>用户名</label>
                <input
                  type="text"
                  style={modalStyles.input}
                  placeholder="请输入用户名"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div style={modalStyles.formGroup}>
                <label style={modalStyles.label}>密码</label>
                <input
                  type="password"
                  style={modalStyles.input}
                  placeholder="请输入密码"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div style={modalStyles.footer}>
              <button 
                style={{ ...modalStyles.btn, ...modalStyles.btnCancel }} 
                onClick={closeLoginModal}
              >
                取消
              </button>
              <button
                style={{ 
                  ...modalStyles.btn, 
                  ...(loginLoading ? modalStyles.btnDisabled : modalStyles.btnSubmit) 
                }}
                onClick={submitLogin}
                disabled={loginLoading}
              >
                {loginLoading ? '登录中...' : '登录'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SharedHeader
