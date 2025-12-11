# 迁移指南

本文档说明如何将原项目的 `@src/components/header` 和 `@src/api` 迁移到使用 `@your-org/shared-lib`。

## 1. 安装依赖

```bash
# 在原项目中安装
npm install @your-org/shared-lib

# 或使用本地链接开发
cd packages/shared-lib
npm link
cd ../../
npm link @your-org/shared-lib
```

## 2. 初始化 HTTP 客户端

在 `src/main.js` 中添加初始化代码：

```javascript
// src/main.js
import { initHttp } from '@your-org/shared-lib/api'
import Cookies from 'js-cookie'

// 在 Vue 实例创建前初始化
initHttp({
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'https://cx.istemedu.com' 
    : '',
  timeout: 222222,
  getToken: () => Cookies.get('token'),
  getLanguage: () => Cookies.get('language'),
  onUnauthorized: () => {
    Cookies.remove('token')
    window.location.href = '/login'
  }
})

// 然后创建 Vue 实例
new Vue({
  // ...
})
```

## 3. 替换 API 导入

### 之前

```javascript
import { getUserInfo, getApplab, postSession } from '@/api/api'
import Http from '@/api/http'
import oss from '@/api/oss'
```

### 之后

```javascript
import { 
  getUserInfo, 
  getApplab, 
  postSession,
  uploadImage,
  uploadVideo 
} from '@your-org/shared-lib/api'
```

## 4. API 名称映射

| 原 API | 新 API |
|--------|--------|
| `getApplab(data)` | `getApplab(id)` |
| `putApplab(data, id)` | `putApplab(data, id)` |
| `postApplab(data)` | `postApplab(data)` |
| `getUserInfo()` | `getUserInfo()` |
| `getKnowledgeList()` | `getKnowledgeList()` |
| `PutCustomGpt(data, id)` | `putCustomGpt(data, id)` |
| `PostCustomGpt(data)` | `postCustomGpt(data)` |
| `GetGptCategoryList(data)` | `getGptCategoryList(params)` |
| `PostSession(data)` | `postSession(data)` |
| `GetSessionList(data)` | `getSessionList(params)` |
| `oss.UploadImage(file)` | `uploadImage(file)` |
| `oss.UploadVideos(file, data)` | `uploadVideo(file, folder)` |
| `oss.UploadBase64(base64)` | `uploadBase64Image(base64)` |

## 5. 替换 Header 组件

### 之前

```vue
<template>
  <Header :proId="proId" @edit-app="handleEdit" @share-app="handleShare" />
</template>

<script>
import Header from '@/components/header/index.vue'
</script>
```

### 之后

```vue
<template>
  <SharedHeader
    :user-info="userInfo"
    :school-info="schoolInfo"
    :is-login="isLogin"
    :has-roles="HasRoles"
    :pro-id="proId"
    :translations="translations"
    @logout="handleLogout"
    @login="handleLogin"
    @edit="handleEdit"
    @share="handleShare"
    @go-home="goHome"
  />
</template>

<script>
import { SharedHeader } from '@your-org/shared-lib/vue'
import { mapGetters } from 'vuex'

export default {
  components: { SharedHeader },
  props: ['proId'],
  computed: {
    ...mapGetters(['userInfo', 'isLogin', 'schoolInfo', 'HasRoles']),
    translations() {
      return {
        teacherDashboard: this.$t('User.teacher_dashboard'),
        background: this.$t('Administrator.background'),
        account: this.$t('User.account'),
        logout: this.$t('User.logout'),
        login: this.$t('User.login')
      }
    }
  },
  methods: {
    handleLogout() { /* ... */ },
    handleLogin() { /* ... */ },
    handleEdit() { /* ... */ },
    handleShare() { /* ... */ },
    goHome() { /* ... */ }
  }
}
</script>
```

## 6. 替换工具函数

### 之前

```javascript
import { getCookies, removeCookies } from '@/utils/auth'
import dataURLtoFile from '@/api/file'
```

### 之后

```javascript
import { getCookies, removeCookies, dataURLtoFile } from '@your-org/shared-lib'
```

## 7. OSS 上传迁移

### 之前

```javascript
import oss from '@/api/oss'

const url = await oss.UploadImage(file)
const videoUrl = await oss.UploadVideos(file, true)
const base64Url = await oss.UploadBase64(base64)
```

### 之后

```javascript
import { uploadImage, uploadVideo, uploadBase64Image } from '@your-org/shared-lib/api'

const url = await uploadImage(file)
const videoUrl = await uploadVideo(file, 'gpt-video')
const base64Url = await uploadBase64Image(base64)
```

## 8. 升级 Node.js

1. 安装 Node.js 20：
   ```bash
   nvm install 20
   nvm use 20
   ```

2. 更新 `package.json`：
   ```json
   {
     "engines": {
       "node": ">=20.0.0"
     }
   }
   ```

3. 更新依赖：
   ```bash
   # 删除旧的 node_modules
   rm -rf node_modules package-lock.json
   
   # 重新安装
   npm install
   ```

4. 更新 `node-sass` 为 `sass`（Node 20 不支持 node-sass 4.x）：
   ```bash
   npm uninstall node-sass
   npm install sass --save-dev
   ```

## 9. 逐步迁移策略

建议采用渐进式迁移：

1. **第一阶段**：安装库，初始化 HTTP 客户端
2. **第二阶段**：迁移 API 调用（可以逐个文件迁移）
3. **第三阶段**：迁移 Header 组件
4. **第四阶段**：迁移 OSS 上传
5. **第五阶段**：删除原有的 `@/api` 和 `@/components/header`

## 10. 常见问题

### Q: 如何处理自定义的 API 请求？

使用 `request` 函数：

```javascript
import { request } from '@your-org/shared-lib/api'

const res = await request({
  url: '/api/custom/endpoint',
  method: 'post',
  data: { foo: 'bar' }
})
```

### Q: 如何修改 OSS 上传的 baseUrl？

```javascript
import { setOssBaseUrl } from '@your-org/shared-lib/api'

setOssBaseUrl('https://your-api.com')
```

### Q: 如何在 React 项目中使用？

```tsx
import { SharedHeader } from '@your-org/shared-lib/react'
import { initHttp, getUserInfo } from '@your-org/shared-lib/api'

// 初始化
initHttp({ baseUrl: '...' })

// 使用组件
<SharedHeader userInfo={user} schoolInfo={school} isLogin={true} />
```
