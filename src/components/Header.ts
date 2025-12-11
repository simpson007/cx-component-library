import type { HeaderProps, HeaderTranslations } from '../types'

// 框架无关的 Header 逻辑层
export class HeaderController {
  private props: HeaderProps
  private isUserInfoShow = false

  constructor(props: HeaderProps) {
    this.props = props
  }

  get userInfo() {
    return this.props.userInfo
  }

  get schoolInfo() {
    return this.props.schoolInfo
  }

  get isLogin() {
    return this.props.isLogin
  }

  get hasRoles() {
    return this.props.hasRoles ?? false
  }

  get translations(): Required<HeaderTranslations> {
    return {
      teacherDashboard: this.props.translations?.teacherDashboard ?? '教师主页',
      background: this.props.translations?.background ?? '管理后台',
      account: this.props.translations?.account ?? '账户',
      logout: this.props.translations?.logout ?? '退出登录',
      login: this.props.translations?.login ?? '登录'
    }
  }

  toggleUserInfo() {
    this.isUserInfoShow = !this.isUserInfoShow
    return this.isUserInfoShow
  }

  getUserInfoVisible() {
    return this.isUserInfoShow
  }

  handleLogout() {
    this.props.onLogout?.()
  }

  handleLogin() {
    this.props.onLogin?.()
  }

  handleGoHome() {
    this.props.onGoHome?.()
  }

  getMenuItems() {
    const items: Array<{ label: string; href?: string; action?: () => void; visible: boolean }> = [
      {
        label: this.translations.teacherDashboard,
        href: '/teacher',
        visible: this.hasRoles
      },
      {
        label: this.translations.background,
        href: '/services/admin/home',
        visible: this.hasRoles
      },
      {
        label: this.translations.account,
        href: '/account',
        visible: this.isLogin
      },
      {
        label: this.translations.logout,
        action: () => this.handleLogout(),
        visible: this.isLogin
      },
      {
        label: this.translations.login,
        action: () => this.handleLogin(),
        visible: !this.isLogin
      }
    ]
    return items.filter(item => item.visible)
  }
}

// Header 样式常量
export const headerStyles = {
  container: {
    position: 'relative' as const,
    backgroundColor: '#edae24',
    padding: '10px 0',
    minHeight: '50px'
  },
  logo: {
    position: 'absolute' as const,
    top: 0,
    left: '20px',
    zIndex: 2000
  },
  logoImage: {
    display: 'flex',
    height: '50px',
    alignItems: 'center'
  },
  logoImg: {
    height: '50px'
  },
  logoTitle: {
    marginLeft: '10px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff'
  },
  userName: {
    height: '32px',
    position: 'relative' as const,
    float: 'right' as const,
    margin: '0.8em 20px 0.8em 0',
    whiteSpace: 'nowrap' as const,
    backgroundColor: '#0a3055',
    borderRadius: '3px',
    padding: '7px 14px',
    fontSize: '14px',
    lineHeight: '21px',
    boxSizing: 'border-box' as const,
    textAlign: 'center' as const,
    zIndex: 1998,
    color: '#fff',
    cursor: 'pointer'
  },
  userInfo: {
    backgroundColor: 'white',
    textAlign: 'left' as const,
    whiteSpace: 'nowrap' as const,
    position: 'absolute' as const,
    top: '64px',
    right: '20px',
    padding: 0,
    zIndex: 1999,
    fontSize: '14px',
    overflow: 'hidden'
  },
  menuItem: {
    borderTop: '1px solid #fff',
    display: 'block',
    padding: '10px',
    color: '#fff',
    backgroundColor: '#0a3055',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  editButton: {
    border: 'none',
    borderRadius: '3px',
    background: '#0a3055',
    color: '#fff',
    height: '32px',
    padding: '0 10px',
    cursor: 'pointer'
  }
}

export type { HeaderProps, HeaderTranslations }
