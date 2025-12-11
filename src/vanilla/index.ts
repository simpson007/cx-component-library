// 原生 JS 版本的 SharedHeader 组件

import { postSchoolLogin } from '../api/endpoints'
import type { UserInfo, SchoolInfo, HeaderTranslations } from '../types'

export interface MenuItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface ActionButton {
  label: string
  onClick?: () => void
  className?: string
}

export interface VanillaHeaderOptions {
  container: HTMLElement | string
  userInfo?: UserInfo
  schoolInfo?: SchoolInfo
  isLogin?: boolean
  loading?: boolean
  translations?: HeaderTranslations
  /** 自定义操作按钮（显示在用户名/登录按钮左侧） */
  actions?: ActionButton[]
  /** 自定义下拉菜单项（显示在"退出登录"上方） */
  menuItems?: MenuItem[]
  onLogout?: () => void
  onLoginSuccess?: (userData: any) => void
  onGoHome?: () => void
}

// 组件样式
const headerCss = `
.shared-header {
  position: relative;
  background-color: #edae24;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.shared-header * { box-sizing: border-box; }
.shared-header .header-logo {
  position: absolute;
  top: 0;
  left: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 2000;
  cursor: pointer;
}
.shared-header .header-logo img {
  height: 36px;
}
.shared-header .header-logo .tit {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  line-height: 50px;
}
.shared-header .header-right {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
}
.shared-header .header-actions {
  display: flex;
  gap: 10px;
}
.shared-header .header-user-name {
  height: 32px;
  background-color: #0a3055;
  border-radius: 3px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.shared-header .header-login-btn {
  height: 32px;
  background-color: #0a3055;
  border-radius: 3px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
  border: none;
}
.shared-header .header-login-btn:hover {
  background-color: #0d3a6a;
}
.shared-header .header-user-info {
  position: absolute;
  top: 32px;
  right: 0;
  background-color: #0a3055;
  z-index: 1999;
  overflow: hidden;
  transition: height 0.3s;
  white-space: nowrap;
  min-width: max-content;
}
.shared-header .header-user-info ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.shared-header .header-user-info a {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}
.shared-header .header-user-info a:hover {
  background-color: #0d3a6a;
}
.shared-header .user-menu-glyph {
  transition: transform 0.3s;
  font-size: 12px;
}
.shared-header .user-menu-glyph.show {
  transform: rotateX(180deg);
}
@keyframes skeleton-pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
.shared-header .skeleton {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
.shared-header .skeleton-logo { width: 36px; height: 36px; }
.shared-header .skeleton-title { width: 80px; height: 16px; margin-left: 10px; }
.shared-header .skeleton-user { width: 70px; height: 32px; border-radius: 3px; }
.shared-header .login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}
.shared-header .login-modal-overlay.show {
  opacity: 1;
  visibility: visible;
}
.shared-header .login-modal {
  background: #fff;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.shared-header .login-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shared-header .login-modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}
.shared-header .login-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}
.shared-header .login-modal-body { padding: 24px 20px; }
.shared-header .login-form-group { margin-bottom: 16px; }
.shared-header .login-form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}
.shared-header .login-form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.shared-header .login-form-group input:focus {
  outline: none;
  border-color: #edae24;
}
.shared-header .login-error {
  color: #e74c3c;
  font-size: 13px;
  margin-bottom: 12px;
  display: none;
}
.shared-header .login-error.show { display: block; }
.shared-header .login-modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.shared-header .login-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
.shared-header .login-btn-cancel { background: #f5f5f5; color: #666; }
.shared-header .login-btn-submit { background: #edae24; color: #fff; }
.shared-header .login-btn-submit:disabled { background: #ccc; cursor: not-allowed; }
`

let styleInjected = false
function injectStyle() {
  if (styleInjected || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.textContent = headerCss
  document.head.appendChild(style)
  styleInjected = true
}

export class SharedHeader {
  private container: HTMLElement
  private options: VanillaHeaderOptions
  private isUserInfoShow = false
  private showLoginModal = false
  private eventsBound = false

  constructor(options: VanillaHeaderOptions) {
    injectStyle()
    this.options = options
    const container =
      typeof options.container === 'string' ? document.querySelector(options.container) : options.container
    if (!container) throw new Error('Container not found')
    this.container = container as HTMLElement
    this.bindEvents()
    this.render()
  }

  private get t() {
    return {
      logout: this.options.translations?.logout || '退出登录',
      login: this.options.translations?.login || '登录'
    }
  }

  update(options: Partial<VanillaHeaderOptions>) {
    Object.assign(this.options, options)
    this.render()
  }

  private renderActions(): string {
    const { actions } = this.options
    if (!actions || actions.length === 0) return ''
    return actions
      .map(
        (btn, i) =>
          `<button class="header-login-btn ${btn.className || ''}" data-action="custom-action" data-index="${i}">${btn.label}</button>`
      )
      .join('')
  }

  private renderMenuItems(): string {
    const { menuItems } = this.options
    if (!menuItems || menuItems.length === 0) return ''
    return menuItems
      .map(
        (item, i) =>
          `<li><a href="${item.href || 'javascript:void(0)'}" data-action="custom-menu" data-index="${i}">${item.label}</a></li>`
      )
      .join('')
  }

  private render() {
    const { userInfo, schoolInfo, isLogin, loading } = this.options

    this.container.innerHTML = `
      <div class="shared-header">
        <div class="header-logo" data-action="go-home">
          ${
            loading
              ? `
            <div class="skeleton skeleton-logo"></div>
            <div class="skeleton skeleton-title"></div>
          `
              : schoolInfo?.logo
                ? `
            <img src="${schoolInfo.logo}" alt="logo" />
            <span class="tit">${schoolInfo.name || ''}</span>
          `
                : ''
          }
        </div>
        ${
          loading
            ? `
          <div class="header-right">
            <div class="skeleton skeleton-user"></div>
          </div>
        `
            : `
          <div class="header-right">
            <div class="header-actions">${this.renderActions()}</div>
            ${
              isLogin
                ? `
              <div style="position: relative;">
                <div class="header-user-name" data-action="toggle-menu">
                  <span>${userInfo?.name || '游客'}</span>
                  <span class="user-menu-glyph ${this.isUserInfoShow ? 'show' : ''}">▼</span>
                </div>
                <div class="header-user-info" style="height: ${this.isUserInfoShow ? 'auto' : '0'}">
                  <ul>
                    ${this.renderMenuItems()}
                    <li><a href="javascript:void(0)" data-action="logout">${this.t.logout}</a></li>
                  </ul>
                </div>
              </div>
            `
                : `
              <button class="header-login-btn" data-action="open-login">${this.t.login}</button>
            `
            }
          </div>
        `
        }
        <div class="login-modal-overlay ${this.showLoginModal ? 'show' : ''}" data-action="close-modal-overlay">
          <div class="login-modal" data-action="stop">
            <div class="login-modal-header">
              <h3>用户登录</h3>
              <button class="login-modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="login-modal-body">
              <div class="login-error"></div>
              <div class="login-form-group">
                <label>用户名</label>
                <input type="text" class="sh-username" placeholder="请输入用户名" />
              </div>
              <div class="login-form-group">
                <label>密码</label>
                <input type="password" class="sh-password" placeholder="请输入密码" />
              </div>
            </div>
            <div class="login-modal-footer">
              <button class="login-btn login-btn-cancel" data-action="close-modal">取消</button>
              <button class="login-btn login-btn-submit" data-action="submit-login">登录</button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  private bindEvents() {
    if (this.eventsBound) return
    this.eventsBound = true

    // 使用事件委托，只绑定一次
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const actionEl = target.closest('[data-action]') as HTMLElement
      const action = actionEl?.dataset.action

      if (!action) return

      switch (action) {
        case 'toggle-menu':
          this.isUserInfoShow = !this.isUserInfoShow
          this.updateMenuState()
          break
        case 'logout':
          this.isUserInfoShow = false
          this.options.onLogout?.()
          break
        case 'go-home':
          this.options.onGoHome?.()
          break
        case 'open-login':
          this.showLoginModal = true
          this.updateModalState()
          break
        case 'close-modal':
          this.showLoginModal = false
          this.updateModalState()
          break
        case 'close-modal-overlay':
          // 只有点击遮罩层本身才关闭
          if (target.classList.contains('login-modal-overlay')) {
            this.showLoginModal = false
            this.updateModalState()
          }
          break
        case 'submit-login':
          this.submitLogin()
          break
        case 'custom-action': {
          // 自定义操作按钮点击
          const index = parseInt(actionEl.dataset.index || '0', 10)
          this.options.actions?.[index]?.onClick?.()
          break
        }
        case 'custom-menu': {
          // 自定义菜单项点击
          const index = parseInt(actionEl.dataset.index || '0', 10)
          const menuItem = this.options.menuItems?.[index]
          if (menuItem?.onClick) {
            e.preventDefault()
            this.isUserInfoShow = false
            this.updateMenuState()
            menuItem.onClick()
          }
          // 如果有 href 且没有 onClick，让浏览器正常跳转
          break
        }
        case 'stop':
          // 阻止冒泡到 overlay
          break
      }
    })

    // Enter 键提交
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const target = e.target as HTMLElement
        if (target.classList.contains('sh-username') || target.classList.contains('sh-password')) {
          this.submitLogin()
        }
      }
    })
  }

  private updateMenuState() {
    const glyph = this.container.querySelector('.user-menu-glyph')
    const menu = this.container.querySelector('.header-user-info') as HTMLElement
    if (glyph) {
      glyph.classList.toggle('show', this.isUserInfoShow)
    }
    if (menu) {
      menu.style.height = this.isUserInfoShow ? 'auto' : '0'
    }
  }

  private updateModalState() {
    const overlay = this.container.querySelector('.login-modal-overlay')
    const errorEl = this.container.querySelector('.login-error')
    if (overlay) {
      overlay.classList.toggle('show', this.showLoginModal)
    }
    if (errorEl && !this.showLoginModal) {
      errorEl.classList.remove('show')
    }
  }

  private async submitLogin() {
    const username = (this.container.querySelector('.sh-username') as HTMLInputElement)?.value
    const password = (this.container.querySelector('.sh-password') as HTMLInputElement)?.value
    const errorEl = this.container.querySelector('.login-error') as HTMLElement
    const submitBtn = this.container.querySelector('[data-action="submit-login"]') as HTMLButtonElement

    if (!username) {
      errorEl.textContent = '请输入用户名'
      errorEl.classList.add('show')
      return
    }
    if (!password) {
      errorEl.textContent = '请输入密码'
      errorEl.classList.add('show')
      return
    }

    errorEl.classList.remove('show')
    submitBtn.disabled = true
    submitBtn.textContent = '登录中...'

    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const data = await postSchoolLogin(formData)

      if (data.head?.code === '1000' && data.body) {
        const token = (data.body as any).token
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
        document.cookie = `token=${token}; expires=${expires}; path=/`
        this.showLoginModal = false
        this.updateModalState()
        this.options.onLoginSuccess?.(data.body)
      } else {
        errorEl.textContent = data.head?.msg || '登录失败'
        errorEl.classList.add('show')
      }
    } catch (error: any) {
      errorEl.textContent = error.message || '网络错误，请重试'
      errorEl.classList.add('show')
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = '登录'
    }
  }

  openLoginModal() {
    this.showLoginModal = true
    this.updateModalState()
  }

  closeLoginModal() {
    this.showLoginModal = false
    this.updateModalState()
  }
}

export default SharedHeader
