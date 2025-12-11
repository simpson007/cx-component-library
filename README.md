# cx-component-library

跨团队、跨技术栈复用的 Header 组件和 API 库。

## 特性

- 内置登录弹框，无需用户实现登录逻辑
- 支持 Vue 2/3、React、原生 JS 项目
- 登录成功自动存储 token 到 cookie
- 支持自定义操作按钮
- 支持 loading 状态骨架屏
- 内置用户角色判断工具函数

## 安装

```bash
npm install git+https://github.com/simpson007/cx-component-library.git#v1.0.14
```

## 快速开始

### 1. 初始化 HTTP 客户端

⚠️ **必须在使用任何 API 或组件之前调用**

```javascript
import { initHttp } from 'cx-component-library/api'

initHttp({
  isDev: import.meta.env.DEV, // Vite 项目
  // isDev: process.env.NODE_ENV === 'development', // Webpack 项目
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null,
  onUnauthorized: () => {
    window.location.href = '/login'
  }
})
```

| 环境 | isDev | baseUrl |
|------|-------|---------|
| 开发环境 | `true` | 自动使用 `https://cx.istemedu.com` |
| 生产环境 | `false` | 空字符串（同域请求） |

### 2. 使用 API

```javascript
import { getSchoolInfo, getUserInfo } from 'cx-component-library/api'

const schoolRes = await getSchoolInfo()
const userRes = await getUserInfo()
```

## API 列表

| 方法 | 说明 |
|------|------|
| `getUserInfo()` | 获取当前用户信息（需登录） |
| `getSchoolInfo()` | 获取学校信息（无需登录） |
| `postSchoolLogin(formData)` | 学校登录（FormData 格式） |

## 用户角色判断

```javascript
import { getUserRole, isAdmin, isSuperAdmin } from 'cx-component-library'

const role = getUserRole(userInfo) // 'guest' | 'user' | 'admin' | 'superAdmin'

if (isAdmin(userInfo)) {
  // 显示管理后台入口
}

if (isSuperAdmin(userInfo)) {
  // 显示超级管理员功能
}
```

## 原生 JS 使用

```html
<div id="header"></div>

<script type="module">
import { initHttp, getSchoolInfo, getUserInfo } from 'cx-component-library/api'
import { SharedHeader } from 'cx-component-library/vanilla'

// 初始化 HTTP
initHttp({
  isDev: true,
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null
})

// 初始化数据
let userInfo = { id: '', name: '游客' }
let schoolInfo = { logo: '', name: '' }
let isLogin = false

// 创建 Header 组件
const header = new SharedHeader({
  container: '#header',
  userInfo,
  schoolInfo,
  isLogin,
  loading: true,
  onLogout: () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    header.update({ isLogin: false, userInfo: { id: '', name: '游客' } })
  },
  onLoginSuccess: (userData) => {
    header.update({ isLogin: true, userInfo: userData })
  },
  onGoHome: () => {
    window.location.href = '/'
  }
})

// 加载数据
async function loadData() {
  const schoolRes = await getSchoolInfo()
  if (schoolRes.body) schoolInfo = schoolRes.body

  const token = document.cookie.match(/token=([^;]+)/)?.[1]
  if (token) {
    const userRes = await getUserInfo()
    if (userRes.body) {
      userInfo = userRes.body
      isLogin = true
    }
  }

  header.update({ userInfo, schoolInfo, isLogin, loading: false })
}

loadData()
</script>
```

## Vue 3 使用

### main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { initHttp } from 'cx-component-library/api'

initHttp({
  isDev: import.meta.env.DEV,
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null
})

createApp(App).mount('#app')
```

### vite.config.js

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
    @logout="handleLogout"
    @login-success="handleLoginSuccess"
    @go-home="handleGoHome"
  >
    <template #actions>
      <button @click="handleEdit">编辑</button>
    </template>
    <template #menu>
      <li v-if="isAdminUser"><a href="/admin">管理后台</a></li>
    </template>
  </SharedHeader>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { SharedHeader } from 'cx-component-library/vue'
import { getSchoolInfo, getUserInfo } from 'cx-component-library/api'
import { isAdmin } from 'cx-component-library'

const userInfo = ref({ id: '', name: '游客' })
const schoolInfo = ref({ logo: '', name: '' })
const isLogin = ref(false)
const loading = ref(true)

const isAdminUser = computed(() => isAdmin(userInfo.value))

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

## React 使用

```tsx
import { useEffect, useState, useMemo } from 'react'
import { SharedHeader } from 'cx-component-library/react'
import { initHttp, getSchoolInfo, getUserInfo } from 'cx-component-library/api'
import { isAdmin } from 'cx-component-library'

initHttp({
  isDev: import.meta.env.DEV,
  getToken: () => document.cookie.match(/token=([^;]+)/)?.[1] || null
})

function App() {
  const [userInfo, setUserInfo] = useState({ id: '', name: '游客' })
  const [schoolInfo, setSchoolInfo] = useState({ logo: '', name: '' })
  const [isLogin, setIsLogin] = useState(false)

  const isAdminUser = useMemo(() => isAdmin(userInfo), [userInfo])

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
      menuContent={isAdminUser ? <li><a href="/admin">管理后台</a></li> : null}
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

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `userInfo` | `{ id, name, roles? }` | 是 | 用户信息 |
| `schoolInfo` | `{ logo, name }` | 是 | 学校信息 |
| `isLogin` | `boolean` | 是 | 是否已登录 |
| `loading` | `boolean` | 否 | 加载状态（显示骨架屏） |

## 环境要求

- Node.js >= 20.0.0

## 更新日志

### v1.0.14
- 登录请求改用 postSchoolLogin API（自动使用 initHttp 配置的 baseUrl）
- 新增原生 JS 版本的 SharedHeader 组件

### v1.0.13
- 修复角色判断：兼容 roles 字段名

### v1.0.12
- 修复登录请求 baseUrl 问题

### v1.0.11
- 新增 isDev 配置项

### v1.0.10
- 新增用户角色判断工具函数

## License

MIT
