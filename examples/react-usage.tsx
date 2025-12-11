/**
 * React 项目中使用示例
 * 
 * 1. 安装依赖
 * npm install @your-org/shared-lib
 */

import React, { useEffect, useState } from 'react'
import { initHttp, getUserInfo, getApplab, postSession } from '@your-org/shared-lib/api'
import { SharedHeader } from '@your-org/shared-lib/react'
import { uploadImage } from '@your-org/shared-lib/api'
import type { UserInfo, SchoolInfo } from '@your-org/shared-lib'

// 2. 在应用入口初始化 HTTP 客户端
function initializeApi() {
  initHttp({
    baseUrl: import.meta.env.DEV 
      ? 'https://cx.istemedu.com' 
      : '',
    timeout: 30000,
    getToken: () => localStorage.getItem('token'),
    getLanguage: () => localStorage.getItem('language') || 'zh-CN',
    onUnauthorized: () => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    },
    onError: (error) => {
      console.error('API Error:', error)
    }
  })
}

// 3. 使用 Header 组件
function AppHeader() {
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: '', name: '' })
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({ logo: '', name: '' })
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    loadUserInfo()
  }, [])

  async function loadUserInfo() {
    try {
      const res = await getUserInfo()
      if (res.body) {
        setUserInfo(res.body as UserInfo)
        setIsLogin(true)
      }
    } catch (error) {
      setIsLogin(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setIsLogin(false)
    window.location.href = '/login'
  }

  function handleLogin() {
    window.location.href = '/login'
  }

  return (
    <SharedHeader
      userInfo={userInfo}
      schoolInfo={schoolInfo}
      isLogin={isLogin}
      hasRoles={true}
      onLogout={handleLogout}
      onLogin={handleLogin}
      onEdit={() => console.log('edit')}
      onShare={() => console.log('share')}
      onGoHome={() => window.location.href = '/'}
      translations={{
        teacherDashboard: '教师后台',
        background: '管理后台',
        account: '账户',
        logout: '退出登录',
        login: '登录',
        edit: '编辑',
        share: '分享'
      }}
    />
  )
}

// 4. 使用 API 的 Hook
function useApplab(id: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await getApplab(id)
        setData(res.body)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return { data, loading, error }
}

// 5. 文件上传组件
function ImageUploader() {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const url = await uploadImage(file)
      setImageUrl(url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>上传中...</p>}
      {imageUrl && <img src={imageUrl} alt="uploaded" />}
    </div>
  )
}

// 6. 完整应用示例
export default function App() {
  useEffect(() => {
    initializeApi()
  }, [])

  return (
    <div>
      <AppHeader />
      <main>
        <ImageUploader />
      </main>
    </div>
  )
}
