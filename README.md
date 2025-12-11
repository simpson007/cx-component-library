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
import { getSchoolInfo, getUserInfo } from 'cx-component-library/api'

// 获取学校信息（无需登录）
const schoolRes = await getSchoolInfo()
console.log(schoolRes.body) // { logo: '...', name: '...' }

// 获取用户信息（需要登录）
const userRes = await getUserInfo()
console.log(userRes.body) // { id: 123, name: '张三', ... }
```

## API 列表

| 方法 | 说明 |
|------|------|
| `getUserInfo()` | 获取当前用户信息（需登录） |
| `getSchoolInfo()` | 获取学校信息（无需登录） |
| `postSchoolLogin(formData)` | 学校登录（FormData 格式） |

## 工具函数

```javascript
import { getCookies, setCookies, removeCookies } from 'cx-component-library'

setCookies('token', 'xxx')
const token = getCookies('token')
removeCookies('token')
```

## Vue 3 组件使用

### main.js 配置

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { initHttp } from 'cx-component-library/api'

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
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
```

### 组件使用

```vue
<template>
  <SharedHeader
    :user-info="userInfo"
    :school-info="schoolInfo"
    :is-login="isLogin"
    :loading="loading"
    :base-url="baseUrl"
    @logout="handleLogout"
    @login-success="handleLoginSuccess"
    @go-home="handleGoHome"
  >
    <template #actions>
      <button class="header-btn" @click="handleEdit">编辑</button>
    </template>
    <template #menu>
      <li><a href="/teacher">教师后台</a></li>
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
const loading = ref(true)
const baseUrl = 'https://cx.istemedu.com'

onMounted(async () => {
  try {
    const schoolRes = await getSchoolInfo()
    if (schoolRes.body) schoolInfo.value = schoolRes.body

    const token = document.cookie.match(/token=([^;]+)/)?.[1]
    if (token) {
      const userRes = await getUserInfo()
      if (userRes.body) {
        userInfo.value = userRes.body
        isLogin.value = true
      }
    }
  } finally {
    loading.value = false
  }
})

function handleLogout() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  isLogin.value = false
  userInfo.value = { id: '', name: '游客' }
}

function handleLoginSuccess(userData) {
  userInfo.value = userData
  isLogin.value = true
}

function handleGoHome() {
  window.location.href = '/'
}
</script>
```

## React 组件使用

```tsx
import { useEffect, useState } from 'react'
import { SharedHeader } from 'cx-component-library/react'
import { initHttp, getSchoolInfo, getUserInfo } from 'cx-component-library/api'

const BASE_URL = 'https://cx.istemedu.com'

initHttp({
  baseUrl: BASE_URL,
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null
})

function App() {
  const [userInfo, setUserInfo] = useState({ id: '', name: '游客' })
  const [schoolInfo, setSchoolInfo] = useState({ logo: '', name: '' })
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    getSchoolInfo().then(res => {
      if (res.body) setSchoolInfo(res.body)
    })

    const token = document.cookie.match(/token=([^;]+)/)?.[1]
    if (token) {
      getUserInfo().then(res => {
        if (res.body) {
          setUserInfo(res.body)
          setIsLogin(true)
        }
      })
    }
  }, [])

  return (
    <SharedHeader
      userInfo={userInfo}
      schoolInfo={schoolInfo}
      isLogin={isLogin}
      baseUrl={BASE_URL}
      onLogout={() => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        setIsLogin(false)
      }}
      onLoginSuccess={(userData) => {
        setUserInfo(userData)
        setIsLogin(true)
      }}
      onGoHome={() => window.location.href = '/'}
    />
  )
}
```

## Header 组件 Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `userInfo` | `{ id, name }` | 是 | - | 用户信息 |
| `schoolInfo` | `{ logo, name }` | 是 | - | 学校信息 |
| `isLogin` | `boolean` | 是 | - | 是否已登录 |
| `loading` | `boolean` | 否 | `false` | 加载状态（显示骨架屏） |
| `baseUrl` | `string` | 否 | `''` | API 基础地址 |
| `loginApi` | `string` | 否 | `/api/v1/school/login` | 登录接口路径 |

## Header 组件 Events

| Vue | React | 说明 |
|-----|-------|------|
| `@logout` | `onLogout` | 点击退出登录 |
| `@login-success` | `onLoginSuccess` | 登录成功 |
| `@go-home` | `onGoHome` | 点击 Logo |

## 自定义下拉菜单

默认只显示"退出登录"，可通过插槽添加自定义菜单项：

```vue
<!-- Vue -->
<SharedHeader>
  <template #menu>
    <li><a href="/teacher">教师后台</a></li>
  </template>
</SharedHeader>
```

```tsx
// React
<SharedHeader
  menuContent={<li><a href="/teacher">教师后台</a></li>}
/>
```

## 环境要求

- Node.js >= 20.0.0
- Vue 2.6+ / Vue 3.x（可选）
- React 17+ / 18+（可选）

## 更新日志

### v1.0.9
- 精简 API，只保留核心接口（getUserInfo、getSchoolInfo、postSchoolLogin）
- 移除 OSS 上传功能

### v1.0.8
- 下拉菜单每项高度改为 32px
- 默认只显示"退出登录"

### v1.0.7
- 修复按钮间距问题

### v1.0.6
- 未登录时直接显示"登录"按钮

### v1.0.5
- 新增 loading 骨架屏

### v1.0.4
- 内置登录弹框功能

## License

MIT
