// Vue 组件导出
// 由于 Vue SFC 需要特殊构建工具，这里导出组件配置对象
// 用户可以直接使用或通过 defineComponent 包装

import type { HeaderTranslations } from '../types'

// 组件样式
export const headerCss = `
.shared-header {
  position: relative;
  background-color: #edae24;
  height: 50px;
  display: flex;
  align-items: center;
}
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
.shared-header .header-actions {
  position: absolute;
  right: 116px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
}
.shared-header .header-user-name {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
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
  z-index: 1998;
}
.shared-header .header-user-info {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #0a3055;
  z-index: 1999;
  overflow: hidden;
  transition: height 0.5s;
}
.shared-header .header-user-info ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.shared-header .header-user-info a {
  display: block;
  padding: 10px 16px;
  color: #fff;
  text-decoration: none;
  border-top: 1px solid rgba(255,255,255,0.2);
}
.shared-header .header-user-info a:hover {
  background-color: #0d3a6a;
}
.shared-header .user-menu-glyph {
  transition: transform 0.5s;
  font-size: 12px;
}
.shared-header .user-menu-glyph.show {
  transform: rotateX(180deg);
}
`

// 注入样式
let styleInjected = false
function injectStyle() {
  if (styleInjected || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.textContent = headerCss
  document.head.appendChild(style)
  styleInjected = true
}

// Vue 组件配置（兼容 Vue 2 和 Vue 3）
export const SharedHeader = {
  name: 'SharedHeader',
  props: {
    userInfo: { type: Object, required: true },
    schoolInfo: { type: Object, default: () => ({}) },
    isLogin: { type: Boolean, default: false },
    hasRoles: { type: Boolean, default: false },
    translations: { type: Object, default: () => ({}) }
  },
  emits: ['logout', 'login', 'go-home'],
  data() {
    return {
      isUserInfoShow: false
    }
  },
  computed: {
    t(): Required<HeaderTranslations> {
      const trans = (this as any).translations || {}
      return {
        teacherDashboard: trans.teacherDashboard || '教师后台',
        background: trans.background || '管理后台',
        account: trans.account || '账户',
        logout: trans.logout || '退出登录',
        login: trans.login || '登录'
      }
    }
  },
  mounted() {
    injectStyle()
  },
  methods: {
    toggleUserInfo() {
      ;(this as any).isUserInfoShow = !(this as any).isUserInfoShow
    },
    handleLogout() {
      ;(this as any).$emit('logout')
    },
    handleLogin() {
      ;(this as any).$emit('login')
    },
    handleGoHome() {
      ;(this as any).$emit('go-home')
    }
  },
  template: `
    <div class="shared-header">
      <div class="header-logo" @click="handleGoHome">
        <template v-if="schoolInfo && schoolInfo.logo">
          <img :src="schoolInfo.logo" alt="logo" />
          <span class="tit">{{ schoolInfo.name }}</span>
        </template>
      </div>
      
      <div class="header-actions">
        <slot name="actions"></slot>
      </div>
      
      <div class="header-user-name" @click="toggleUserInfo">
        <i class="fa fa-user-o"></i>
        <span>{{ userInfo?.name || '游客' }}</span>
        <span class="user-menu-glyph" :class="{ show: isUserInfoShow }">▼</span>
      </div>
      
      <div class="header-user-info" :style="{ height: isUserInfoShow ? 'auto' : '0' }">
        <ul>
          <li v-if="hasRoles"><a href="/teacher">{{ t.teacherDashboard }}</a></li>
          <li v-if="hasRoles"><a href="/services/admin/home">{{ t.background }}</a></li>
          <li v-if="isLogin"><a href="/account">{{ t.account }}</a></li>
          <li v-if="isLogin"><a href="javascript:void(0)" @click.prevent="handleLogout">{{ t.logout }}</a></li>
          <li v-if="!isLogin"><a href="javascript:void(0)" @click.prevent="handleLogin">{{ t.login }}</a></li>
        </ul>
      </div>
    </div>
  `
}

// Vue 插件安装函数
export function install(app: { component: (name: string, comp: unknown) => void }): void {
  injectStyle()
  app.component('SharedHeader', SharedHeader)
}

// 默认导出插件
export default {
  install,
  SharedHeader
}

// 导出类型和样式
export { headerCss as styles }
export type { HeaderTranslations }
