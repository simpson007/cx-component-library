<template>
  <div class="shared-header">
    <div class="header-logo" @click="handleGoHome">
      <div class="img-logo" v-if="schoolInfo && Object.keys(schoolInfo).length">
        <img class="logo" :src="schoolInfo.logo" alt="logo" />
        <div class="tit">{{ schoolInfo.name }}</div>
      </div>
    </div>

    <div class="header-user-name" @click="toggleUserInfo">
      <i class="fa fa-user-o"></i>
      <span>{{ userInfo.name }}</span>
      <span class="user-menu-glyph" :class="{ show: isUserInfoShow }">▼</span>
    </div>

    <div class="header-user-info" :class="{ show: isUserInfoShow }">
      <ul>
        <li v-if="hasRoles">
          <a href="/teacher">{{ t.teacherDashboard }}</a>
        </li>
        <li v-if="hasRoles">
          <a href="/services/admin/home">{{ t.background }}</a>
        </li>
        <li v-if="isLogin">
          <a href="/account">{{ t.account }}</a>
        </li>
        <li v-if="isLogin">
          <a href="javascript:void(0)" @click.prevent="handleLogout">{{ t.logout }}</a>
        </li>
        <li v-if="!isLogin">
          <a href="javascript:void(0)" @click.prevent="handleLogin">{{ t.login }}</a>
        </li>
      </ul>
    </div>

    <!-- 自定义操作区域插槽 -->
    <div class="header-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
import { HeaderController } from '../components/Header'

export default {
  name: 'SharedHeader',
  props: {
    userInfo: { type: Object, required: true },
    schoolInfo: { type: Object, default: () => ({}) },
    isLogin: { type: Boolean, default: false },
    hasRoles: { type: Boolean, default: false },
    translations: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      isUserInfoShow: false,
      controller: null
    }
  },
  computed: {
    t() {
      return {
        teacherDashboard: this.translations.teacherDashboard || '教师后台',
        background: this.translations.background || '管理后台',
        account: this.translations.account || '账户',
        logout: this.translations.logout || '退出登录',
        login: this.translations.login || '登录',
        edit: this.translations.edit || '编辑',
        share: this.translations.share || '分享'
      }
    }
  },
  methods: {
    toggleUserInfo() {
      this.isUserInfoShow = !this.isUserInfoShow
    },
    handleLogout() {
      this.$emit('logout')
    },
    handleLogin() {
      this.$emit('login')
    },
    handleGoHome() {
      this.$emit('go-home')
    }
  }
}
</script>

<style scoped>
.shared-header {
  position: relative;
  background-color: #edae24;
  padding: 10px 0;
  min-height: 50px;
}

.header-logo {
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2000;
  cursor: pointer;
}

.img-logo {
  display: flex;
  height: 50px;
  align-items: center;
}

.img-logo .logo {
  height: 50px;
}

.img-logo .tit {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.header-user-name {
  height: 32px;
  position: relative;
  float: right;
  margin: 0.8em 20px 0.8em 0;
  white-space: nowrap;
  background-color: #0a3055;
  border-radius: 3px;
  padding: 7px 14px;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  text-align: center;
  z-index: 1998;
  cursor: pointer;
  color: #fff;
}

.user-menu-glyph {
  transition: transform 0.5s;
  display: inline-block;
}

.user-menu-glyph.show {
  transform: rotateX(180deg);
}

.header-user-info {
  background-color: white;
  text-align: left;
  white-space: nowrap;
  position: absolute;
  top: 64px;
  right: 20px;
  padding: 0;
  z-index: 1999;
  font-size: 14px;
  overflow: hidden;
  height: 0;
  transition: height 0.5s;
}

.header-user-info.show {
  height: auto;
}

.header-user-info ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header-user-info a {
  border-top: 1px solid #fff;
  display: block;
  padding: 10px;
  color: #fff;
  background-color: #0a3055;
  cursor: pointer;
  text-decoration: none;
}

.header-actions {
  position: relative;
  float: right;
  top: 0.66em;
  margin-right: 10px;
}

.edit-btn {
  border: none;
  border-radius: 3px;
  background: #0a3055;
  color: #fff;
  height: 32px;
  padding: 0 10px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 13px;
}

@media screen and (max-width: 768px) {
  .header-logo {
    left: 10px;
    top: 10px;
  }
  
  .img-logo {
    height: 40px;
  }
  
  .img-logo .logo {
    height: 40px;
  }
  
  .img-logo .tit {
    font-size: 12px;
  }
  
  .header-user-name,
  .edit-btn {
    height: 28px;
    font-size: 13px;
    padding: 0 8px;
  }
}

@media screen and (max-width: 480px) {
  .img-logo .tit {
    display: none;
  }
}
</style>
