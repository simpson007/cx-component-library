import { HeaderController } from '../src/components/Header'
import type { HeaderProps } from '../src/types'

const BASE_URL = 'https://cx.istemedu.com'

// Cookie 操作
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

// 用户数据
let userInfo = {
  id: '',
  name: '游客'
}

// 学校数据
let schoolInfo = {
  logo: '',
  name: ''
}

// 日志记录
const logs: string[] = []
function addLog(message: string) {
  const time = new Date().toLocaleTimeString()
  logs.unshift(`[${time}] ${message}`)
  renderLogs()
}

function renderLogs() {
  const logPanel = document.getElementById('log-panel')
  if (logPanel) {
    logPanel.innerHTML = logs
      .slice(0, 20)
      .map((log) => `<div class="log-item">${log}</div>`)
      .join('')
  }
}

// 状态
let state = {
  isLogin: false,
  hasRoles: false,
  isUserInfoShow: false,
  proId: '',
  showLoginModal: false,
  loginLoading: false,
  loginError: '',
  currentUserData: null as any
}

// 获取学校信息 API
async function fetchSchoolInfo() {
  try {
    addLog('正在获取学校信息...')
    const response = await fetch(`${BASE_URL}/api/v1/school/info`, {
      headers: {
        Site: 'https://cx.istemedu.com/'
      }
    })
    const data = await response.json()
    if (data.head?.code === '1000' && data.body) {
      schoolInfo = {
        logo: data.body.logo || '',
        name: data.body.name || ''
      }
      addLog(`获取学校信息成功: ${schoolInfo.name}`)
      render()
    }
  } catch (error: any) {
    addLog(`获取学校信息失败: ${error.message}`)
  }
}

// 获取用户信息 API
async function fetchUserInfo() {
  const token = getCookie('token')
  if (!token) {
    addLog('未检测到 token，请登录')
    return false
  }

  try {
    addLog('正在获取用户信息...')
    const response = await fetch(`${BASE_URL}/api/v1/user/info`, {
      headers: {
        Authorization: token
      }
    })
    const data = await response.json()

    if (data.head?.code === '1000' && data.body) {
      userInfo = {
        id: String(data.body.id),
        name: data.body.name
      }
      state.isLogin = true
      state.hasRoles = true
      state.proId = String(data.body.id)
      state.currentUserData = data.body
      addLog(`获取用户信息成功: ${userInfo.name}`)
      render()
      return true
    } else if (data.head?.code === '1005' || data.head?.code === '1056') {
      // token 过期或无效
      addLog('Token 已过期，请重新登录')
      removeCookie('token')
      return false
    }
  } catch (error: any) {
    addLog(`获取用户信息失败: ${error.message}`)
  }
  return false
}

// 登录 API
async function loginApi(username: string, password: string): Promise<any> {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  addLog(`正在登录... 用户名: ${username}`)

  const response = await fetch(`${BASE_URL}/api/v1/school/login`, {
    method: 'POST',
    body: formData
  })

  const data = await response.json()

  if (data.head?.code === '1000') {
    return data.body
  } else {
    throw new Error(data.head?.msg || '登录失败')
  }
}

// 渲染登录弹框
function renderLoginModal(): string {
  return `
    <div id="login-modal-overlay" class="login-modal-overlay ${state.showLoginModal ? 'show' : ''}">
      <div class="login-modal">
        <div class="login-modal-header">
          <h3>用户登录</h3>
          <button class="login-modal-close" onclick="closeLoginModal()">&times;</button>
        </div>
        <div class="login-modal-body">
          <div id="login-error" class="login-error ${state.loginError ? 'show' : ''}">${state.loginError}</div>
          <div class="login-form-group">
            <label for="username">用户名</label>
            <input type="text" id="login-username" placeholder="请输入用户名" />
          </div>
          <div class="login-form-group">
            <label for="password">密码</label>
            <input type="password" id="login-password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="login-modal-footer">
          <button class="login-btn login-btn-cancel" onclick="closeLoginModal()">取消</button>
          <button class="login-btn login-btn-submit" id="login-submit-btn" onclick="submitLogin()" ${state.loginLoading ? 'disabled' : ''}>
            ${state.loginLoading ? '登录中...' : '登录'}
          </button>
        </div>
      </div>
    </div>
  `
}

// 渲染 Header（原版样式）
function renderHeader(): string {
  const t = {
    teacherDashboard: '教师后台',
    background: '管理后台',
    account: '账户',
    logout: '退出登录',
    login: '登录',
    edit: '编辑',
    share: '分享'
  }



  return `
    <div class="header-wrapper">
      <!-- Logo -->
      <div id="logo" onclick="handleGoHome()">
        ${
          schoolInfo.logo
            ? `
          <div class="img-logo">
            <img class="logo" src="${schoolInfo.logo}" alt="logo" />
            <div class="tit">${schoolInfo.name}</div>
          </div>
        `
            : `
          <div class="img-logo">
            <div class="tit" style="color: #fff;">加载中...</div>
          </div>
        `
        }
      </div>

      <!-- 用户名 -->
      <div id="user-name" onclick="toggleUserMenu()">
        <i class="fa fa-user-o"></i>
        <span>${userInfo.name}</span>
        <span class="user_menu_glyph ${state.isUserInfoShow ? 'show' : ''}">▼</span>
      </div>

      <!-- 用户菜单 -->
      <div id="user-info" class="${state.isUserInfoShow ? 'show' : ''}">
        <ul>
          ${
            state.hasRoles
              ? `
            <li><a href="/teacher">${t.teacherDashboard}</a></li>
            <li><a href="/services/admin/home">${t.background}</a></li>
          `
              : ''
          }
          ${
            state.isLogin
              ? `
            <li><a href="/account">${t.account}</a></li>
            <li><a href="javascript:void(0)" onclick="handleLogout()">${t.logout}</a></li>
          `
              : `
            <li><a href="javascript:void(0)" onclick="handleLogin()">${t.login}</a></li>
          `
          }
        </ul>
      </div>

      <!-- 自定义操作区域（用户可通过插槽添加按钮） -->
      <div class="header-actions" id="header-actions-slot">
        <!-- 示例：用户自定义按钮 -->
        <button class="editGameBtn" onclick="handleCustomAction('自定义按钮1')">自定义按钮</button>
      </div>
    </div>
  `
}

// 渲染用户信息展示
function renderUserInfoDisplay(): string {
  if (!state.currentUserData) {
    return ''
  }

  return `
    <div class="user-info-display">
      <h4>当前登录用户信息</h4>
      <pre>${JSON.stringify(state.currentUserData, null, 2)}</pre>
    </div>
  `
}

// 渲染整个页面
function render() {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = `
    <div class="preview-container">
      ${renderHeader()}
      ${renderLoginModal()}
      
      <div class="content">
        <div class="section">
          <h2>🎛️ 控制面板</h2>
          <div class="controls">
            <button class="control-btn ${state.isLogin ? 'primary' : 'secondary'}" onclick="toggleLogin()">
              ${state.isLogin ? '✓ 已登录' : '✗ 未登录'}
            </button>
            <button class="control-btn ${state.hasRoles ? 'primary' : 'secondary'}" onclick="toggleRoles()">
              ${state.hasRoles ? '✓ 有权限' : '✗ 无权限'}
            </button>
          </div>
          ${renderUserInfoDisplay()}
        </div>

        <div class="section">
          <h2>📡 API 演示</h2>
          <div class="api-demo">
            <div class="api-card" onclick="demoApi('getUserInfo')">
              <h4>getUserInfo()</h4>
              <p>获取用户信息</p>
            </div>
            <div class="api-card" onclick="demoApi('getApplab')">
              <h4>getApplab(id)</h4>
              <p>获取 Applab 数据</p>
            </div>
            <div class="api-card" onclick="demoApi('postSession')">
              <h4>postSession(data)</h4>
              <p>创建会话</p>
            </div>
            <div class="api-card" onclick="demoApi('uploadImage')">
              <h4>uploadImage(file)</h4>
              <p>上传图片到 OSS</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>📋 事件日志</h2>
          <div id="log-panel" class="log-panel">
            <div class="log-item" style="color: #94a3b8;">等待操作...</div>
          </div>
        </div>
      </div>
    </div>
  `

  // 绑定回车键登录
  setTimeout(() => {
    const passwordInput = document.getElementById('login-password') as HTMLInputElement
    if (passwordInput) {
      passwordInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          submitLogin()
        }
      }
    }
  }, 0)
}

// 全局函数
declare global {
  interface Window {
    toggleLogin: () => void
    toggleRoles: () => void
    toggleUserMenu: () => void
    demoApi: (name: string) => void
    handleLogout: () => void
    handleLogin: () => void
    handleGoHome: () => void
    handleCustomAction: (name: string) => void
    closeLoginModal: () => void
    submitLogin: () => void
  }
}

window.toggleUserMenu = () => {
  state.isUserInfoShow = !state.isUserInfoShow
  addLog(`${state.isUserInfoShow ? '展开' : '收起'}用户菜单`)
  render()
}

window.toggleLogin = () => {
  if (state.isLogin) {
    handleLogout()
  } else {
    handleLogin()
  }
}

window.toggleRoles = () => {
  state.hasRoles = !state.hasRoles
  addLog(`权限状态: ${state.hasRoles ? '有权限' : '无权限'}`)
  render()
}

window.demoApi = (name: string) => {
  addLog(`调用 API: ${name}() - 模拟请求中...`)
  setTimeout(() => {
    addLog(`API ${name}() 返回成功 ✓`)
  }, 500)
}

window.handleLogout = function handleLogout() {
  addLog('退出登录')
  // 清除 cookie 中的 token
  removeCookie('token')
  state.isLogin = false
  state.hasRoles = false
  state.isUserInfoShow = false
  state.currentUserData = null
  state.proId = ''
  userInfo = { id: '', name: '游客' }
  render()
}

window.handleLogin = function handleLogin() {
  addLog('打开登录弹框')
  state.showLoginModal = true
  state.loginError = ''
  state.isUserInfoShow = false
  render()

  setTimeout(() => {
    const usernameInput = document.getElementById('login-username') as HTMLInputElement
    if (usernameInput) {
      usernameInput.focus()
    }
  }, 100)
}

window.closeLoginModal = () => {
  state.showLoginModal = false
  state.loginError = ''
  state.loginLoading = false
  render()
}

window.submitLogin = async function submitLogin() {
  const usernameInput = document.getElementById('login-username') as HTMLInputElement
  const passwordInput = document.getElementById('login-password') as HTMLInputElement

  const username = usernameInput?.value?.trim()
  const password = passwordInput?.value

  if (!username) {
    state.loginError = '请输入用户名'
    render()
    return
  }

  if (!password) {
    state.loginError = '请输入密码'
    render()
    return
  }

  state.loginLoading = true
  state.loginError = ''
  render()

  try {
    const loginData = await loginApi(username, password)

    // 登录成功，将 token 存入 cookie
    addLog(`登录成功！Token 已存入 Cookie`)
    setCookie('token', loginData.token, 7)

    state.showLoginModal = false
    state.loginLoading = false

    // 调用 getUserInfo 获取用户信息
    await fetchUserInfo()

    render()
  } catch (error: any) {
    addLog(`登录失败: ${error.message}`)
    state.loginError = error.message || '登录失败，请重试'
    state.loginLoading = false
    render()
  }
}

window.handleGoHome = () => addLog('点击 Logo 返回首页')
window.handleCustomAction = (name: string) => addLog(`点击自定义按钮: ${name}`)

// 初始化
async function init() {
  render()
  addLog('预览页面加载完成')

  // 1. 获取学校信息
  await fetchSchoolInfo()

  // 2. 检查是否有 token，有则获取用户信息
  const token = getCookie('token')
  if (token) {
    addLog('检测到已有 Token，正在验证...')
    await fetchUserInfo()
  } else {
    addLog('点击用户名展开菜单，点击"登录"测试登录功能')
  }
}

init()
