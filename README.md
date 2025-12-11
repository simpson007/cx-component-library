# cx-component-library

跨团队、跨技术栈复用的 Header 组件和 API 库。

## 特性

- 内置登录弹框，无需用户实现登录逻辑
- 支持 Vue 2/3、React、纯 JS 项目
- 登录成功自动存储 token 到 cookie
- 支持自定义操作按钮（通过插槽/children）
- 支持 loading 状态骨架屏，优化页面刷新体验
- 未登录时显示登录按钮，已登录时显示用户名+下拉菜单
- 下拉菜单内容可完全自定义

## 安装

通过 Git 仓库安装（推荐）：

```bash
# HTTPS 方式
npm install git+https://github.com/simpson007/cx-component-library.git
```

或在 package.json 中直接添加：

```json
{
  "dependencies": {
    "cx-component-library": "git+https://github.com/simpson007/cx-component-library.git"
  }
}
```

## 快速开始

### 1. 初始化 HTTP 客户端

在应用入口处初始化（必须在调用 API 之前）：

```javascript
import { initHttp } from 'cx-component-library/api'

initHttp({
  baseUrl: 'https://cx.istemedu.com',
  timeout: 30000,
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null,
  getLanguage: () => 'zh-CN',
  onUnauthorized: () => {
    window.location.href = '/login'
  }
})
```

### 2. 使用 API

```javascript
import { getSchoolInfo, getUserInfo, postSchoolLogin, uploadImage } from 'cx-component-library/api'

// 获取学校信息（无需登录）
const schoolRes = await getSchoolInfo()
console.log(schoolRes.body) // { logo: '...', name: '...' }

// 登录
const formData = new FormData()
formData.append('username', 'user')
formData.append('password', 'pass')
const loginRes = await postSchoolLogin(formData)
// 将 token 存入 cookie
document.cookie = `token=${loginRes.body.token}; path=/`

// 获取用户信息（需要登录）
const userRes = await getUserInfo()
console.log(userRes.body) // { id: 123, name: '张三', ... }

// 上传图片
const imageUrl = await uploadImage(file)
```

## 纯 JavaScript 项目使用

API 部分完全支持纯 JS 项目，无需 Vue 或 React。

### ES Module 方式

```html
<script type="module">
import { initHttp, getSchoolInfo, getUserInfo, postSchoolLogin } from 'cx-component-library/api'

// 初始化（必须先调用）
initHttp({
  baseUrl: 'https://cx.istemedu.com',
  getToken: () => getCookie('token'),
  onUnauthorized: () => location.href = '/login'
})

// 获取学校信息并渲染
const schoolRes = await getSchoolInfo()
document.getElementById('logo').src = schoolRes.body.logo
document.getElementById('school-name').textContent = schoolRes.body.name

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}
</script>
```

### CommonJS 方式（Node.js 后端）

```javascript
const { initHttp, getUserInfo } = require('cx-component-library/api')

initHttp({
  baseUrl: 'https://cx.istemedu.com',
  getToken: () => process.env.API_TOKEN
})

async function fetchData() {
  const user = await getUserInfo()
  console.log(user.body)
}

fetchData()
```

## Vue 3 组件使用

> 注意：Vue 组件使用 template 字符串，需要在 vite.config.js 中配置 `vue: { runtimeCompiler: true }` 或使用完整版 Vue。

### main.js 配置

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { initHttp } from 'cx-component-library/api'

// 初始化 API（必须在使用前调用）
initHttp({
  baseUrl: 'https://cx.istemedu.com',
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null
})

createApp(App).mount('#app')
```

### vite.config.js 配置

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 启用运行时编译器（组件使用 template 字符串）
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
```

### 组件使用

> 登录弹框已内置，点击"登录"菜单会自动弹出登录框，登录成功后触发 `@login-success` 事件。
> 使用 `loading` prop 可以在数据加载时显示骨架屏，避免页面闪烁。

```vue
<template>
  <SharedHeader
    :user-info="userInfo"
    :school-info="schoolInfo"
    :is-login="isLogin"
    :has-roles="hasRoles"
    :loading="loading"
    :base-url="baseUrl"
    @logout="handleLogout"
    @login-success="handleLoginSuccess"
    @go-home="handleGoHome"
  >
    <template #actions>
      <button class="header-btn" @click="handleEdit">编辑</button>
    </template>
  </SharedHeader>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SharedHeader } from 'cx-component-library/vue'
import { getSchoolInfo, getUserInfo } from 'cx-component-library/api'

const userInfo = ref({ id: '', name: '游客' })
const schoolInfo = ref({ logo: '', name: '' })
const isLogin = ref(false)
const hasRoles = ref(false)
const loading = ref(true) // 初始为 loading 状态
const baseUrl = 'https://cx.istemedu.com'

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

onMounted(async () => {
  try {
    // 获取学校信息
    const schoolRes = await getSchoolInfo()
    if (schoolRes.body) schoolInfo.value = schoolRes.body

    // 检查登录状态
    const token = getCookie('token')
    if (token) {
      const userRes = await getUserInfo()
      if (userRes.body) {
        userInfo.value = userRes.body
        isLogin.value = true
        hasRoles.value = true
      }
    }
  } finally {
    loading.value = false // 数据加载完成，关闭骨架屏
  }
})

function handleLogout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  isLogin.value = false
  userInfo.value = { id: '', name: '游客' }
}

// 登录成功回调（登录弹框内置，无需手动实现）
function handleLoginSuccess(userData) {
  userInfo.value = userData
  isLogin.value = true
  hasRoles.value = true
}

function handleGoHome() {
  window.location.href = '/'
}

function handleEdit() {
  console.log('编辑')
}
</script>

<style>
.header-btn {
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: 3px;
  background: #0a3055;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}
</style>
```

## Vue 2 组件使用

```vue
<template>
  <SharedHeader
    :user-info="userInfo"
    :school-info="schoolInfo"
    :is-login="isLogin"
    :has-roles="hasRoles"
    :base-url="baseUrl"
    @logout="handleLogout"
    @login-success="handleLoginSuccess"
    @go-home="handleGoHome"
  >
    <template #actions>
      <button class="header-btn" @click="handleEdit">编辑</button>
    </template>
  </SharedHeader>
</template>

<script>
import { SharedHeader } from 'cx-component-library/vue'
import { getSchoolInfo, getUserInfo } from 'cx-component-library/api'

export default {
  components: { SharedHeader },
  data() {
    return {
      userInfo: { id: '', name: '游客' },
      schoolInfo: { logo: '', name: '' },
      isLogin: false,
      hasRoles: false,
      baseUrl: 'https://cx.istemedu.com'
    }
  },
  async mounted() {
    const schoolRes = await getSchoolInfo()
    if (schoolRes.body) this.schoolInfo = schoolRes.body

    const token = this.getCookie('token')
    if (token) {
      const userRes = await getUserInfo()
      if (userRes.body) {
        this.userInfo = userRes.body
        this.isLogin = true
        this.hasRoles = true
      }
    }
  },
  methods: {
    handleLogout() {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      this.isLogin = false
      this.userInfo = { id: '', name: '游客' }
    },
    handleLoginSuccess(userData) {
      this.userInfo = userData
      this.isLogin = true
      this.hasRoles = true
    },
    handleGoHome() { window.location.href = '/' },
    handleEdit() { console.log('编辑') },
    getCookie(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? match[2] : null
    }
  }
}
</script>
```

## React 组件使用

> 登录弹框已内置，点击"登录"菜单会自动弹出登录框，登录成功后触发 `onLoginSuccess` 回调。

```tsx
import { useEffect, useState } from 'react'
import { SharedHeader } from 'cx-component-library/react'
import { initHttp, getSchoolInfo, getUserInfo } from 'cx-component-library/api'

const BASE_URL = 'https://cx.istemedu.com'

// 初始化（在应用入口调用一次）
initHttp({
  baseUrl: BASE_URL,
  getToken: () => getCookie('token')
})

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

function App() {
  const [userInfo, setUserInfo] = useState({ id: '', name: '游客' })
  const [schoolInfo, setSchoolInfo] = useState({ logo: '', name: '' })
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    getSchoolInfo().then(res => {
      if (res.body) setSchoolInfo(res.body)
    })

    const token = getCookie('token')
    if (token) {
      getUserInfo().then(res => {
        if (res.body) {
          setUserInfo(res.body)
          setIsLogin(true)
        }
      })
    }
  }, [])

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    setIsLogin(false)
    setUserInfo({ id: '', name: '游客' })
  }

  // 登录成功回调（登录弹框内置，无需手动实现）
  const handleLoginSuccess = (userData: any) => {
    setUserInfo(userData)
    setIsLogin(true)
  }

  return (
    <SharedHeader
      userInfo={userInfo}
      schoolInfo={schoolInfo}
      isLogin={isLogin}
      hasRoles={true}
      baseUrl={BASE_URL}
      onLogout={handleLogout}
      onLoginSuccess={handleLoginSuccess}
      onGoHome={() => window.location.href = '/'}
    >
      <button className="header-btn" onClick={() => console.log('编辑')}>编辑</button>
    </SharedHeader>
  )
}

export default App
```

## API 列表

### 用户相关
| 方法 | 说明 |
|------|------|
| `getUserInfo()` | 获取当前用户信息 |
| `postSchoolLogin(formData)` | 学校登录（FormData 格式） |
| `bindPhone(data)` | 绑定手机 |
| `getPhoneCode(params)` | 获取手机验证码 |

### 学校相关
| 方法 | 说明 |
|------|------|
| `getSchoolInfo()` | 获取学校信息（无需登录） |
| `getSchoolList(params)` | 获取学校列表 |

### GPT 相关
| 方法 | 说明 |
|------|------|
| `getCustomGptList(params)` | GPT 列表 |
| `getCustomGpt(id)` | GPT 详情 |
| `postCustomGpt(data)` | 创建 GPT |
| `putCustomGpt(data, id)` | 更新 GPT |
| `delCustomGpt(id)` | 删除 GPT |

### 会话相关
| 方法 | 说明 |
|------|------|
| `postSession(data)` | 创建会话 |
| `getSessionList(params)` | 会话列表 |
| `putSession(data, id)` | 更新会话 |
| `delSession(id)` | 删除会话 |

### OSS 上传
| 方法 | 说明 |
|------|------|
| `uploadImage(file)` | 上传图片 |
| `uploadVideo(file, folder)` | 上传视频 |
| `uploadText(content)` | 上传文本 |
| `uploadHtml(content)` | 上传 HTML |
| `uploadMusic(file)` | 上传音乐 |
| `uploadBase64Image(base64)` | 上传 Base64 图片 |

### 工具函数
```javascript
import { getCookies, setCookies, removeCookies, dataURLtoFile } from 'cx-component-library'

setCookies('token', 'xxx')
const token = getCookies('token')
removeCookies('token')

const file = dataURLtoFile(dataUrl, 'image.png')
```

## Header 组件 Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `userInfo` | `{ id: string, name: string }` | 是 | - | 用户信息 |
| `schoolInfo` | `{ logo: string, name: string }` | 是 | - | 学校信息 |
| `isLogin` | `boolean` | 是 | - | 是否已登录 |
| `hasRoles` | `boolean` | 否 | `false` | 是否有管理权限（显示教师后台等菜单） |
| `loading` | `boolean` | 否 | `false` | 加载状态，为 true 时显示骨架屏 |
| `baseUrl` | `string` | 否 | `''` | API 基础地址（用于登录请求） |
| `loginApi` | `string` | 否 | `/api/v1/school/login` | 登录接口路径 |
| `translations` | `object` | 否 | - | 自定义文案 |

## Header 组件 Events

| 事件（Vue） | 事件（React） | 说明 |
|-------------|---------------|------|
| `@logout` | `onLogout` | 点击退出登录 |
| `@login-success` | `onLoginSuccess` | 登录成功，参数为用户数据 |
| `@go-home` | `onGoHome` | 点击 Logo |

## 登录状态说明

- 未登录时：显示"登录"按钮，点击直接弹出登录框
- 已登录时：显示用户名+下拉箭头，点击展开下拉菜单

登录成功后会自动将 token 存入 cookie，并触发 `login-success` 事件。

## 自定义操作按钮

Vue 使用 `#actions` 插槽，React 使用 children：

```vue
<!-- Vue -->
<SharedHeader ...>
  <template #actions>
    <button>编辑</button>
    <button>分享</button>
  </template>
</SharedHeader>
```

```tsx
// React
<SharedHeader ...>
  <button>编辑</button>
  <button>分享</button>
</SharedHeader>
```

## 自定义下拉菜单

下拉菜单默认只包含"退出登录"选项。你可以通过 `#menu` 插槽（Vue）或 `menuContent` prop（React）在"退出登录"前面添加自定义菜单项：

```vue
<!-- Vue：在退出登录前添加自定义菜单项 -->
<SharedHeader ...>
  <template #menu>
    <li><a href="/teacher">教师后台</a></li>
    <li><a href="/account">账户设置</a></li>
  </template>
</SharedHeader>
```

```tsx
// React：在退出登录前添加自定义菜单项
<SharedHeader
  menuContent={
    <>
      <li><a href="/teacher" style={menuItemStyle}>教师后台</a></li>
      <li><a href="/account" style={menuItemStyle}>账户设置</a></li>
    </>
  }
  ...
/>

// 菜单项样式（可选）
const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  height: 32,
  padding: '0 14px',
  color: '#fff',
  textDecoration: 'none',
  borderTop: '1px solid rgba(255,255,255,0.2)',
  cursor: 'pointer',
  fontSize: 14
}
```

> 注意：退出登录选项始终显示在菜单最后，无需手动添加。

## 自定义文案

```javascript
const translations = {
  teacherDashboard: '教师后台',
  background: '管理后台',
  account: '账户',
  logout: '退出登录',
  login: '登录'
}
```

## 环境要求

- Node.js >= 20.0.0
- Vue 2.6+ 或 Vue 3.x（可选，需配置运行时编译器）
- React 17+ 或 React 18+（可选）

## 更新日志

### v1.0.7
- 下拉菜单每项高度改为 32px（与按钮一致）
- 默认只显示"退出登录"，其他菜单项由用户自定义
- `#menu` 插槽内容显示在"退出登录"前面

### v1.0.6
- 修复按钮间距问题，使用 flexbox 布局保持固定间距

### v1.0.5
- 未登录时直接显示"登录"按钮，点击弹出登录框
- 已登录时显示用户名+下拉箭头

### v1.0.4
- 新增 `loading` prop，支持骨架屏加载状态

### v1.0.3
- 修复 Vue 3 登录弹框响应式问题

### v1.0.2
- 内置登录弹框功能
- 登录成功自动存储 token

## License

MIT
