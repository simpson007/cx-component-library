/**
 * Vue 2 项目中使用示例
 * 
 * 1. 安装依赖
 * npm install @your-org/shared-lib
 * 
 * 2. 在 main.js 中初始化
 */

import Vue from 'vue'
import { initHttp } from '@your-org/shared-lib/api'
import Cookies from 'js-cookie'

// 初始化 HTTP 客户端
initHttp({
  baseUrl: process.env.NODE_ENV === 'development' 
    ? 'https://cx.istemedu.com' 
    : '',
  timeout: 30000,
  getToken: () => Cookies.get('token'),
  getLanguage: () => Cookies.get('language'),
  onUnauthorized: () => {
    Cookies.remove('token')
    const url = Cookies.get('origin') + '/login'
    window.open(url, '_self')
  },
  onError: (error) => {
    console.error('API Error:', error)
  }
})

/**
 * 3. 在组件中使用 API
 */
// MyComponent.vue
/*
<script>
import { getUserInfo, getApplab, postSession } from '@your-org/shared-lib/api'

export default {
  async mounted() {
    // 获取用户信息
    const userRes = await getUserInfo()
    console.log(userRes)
    
    // 获取 Applab
    const applabRes = await getApplab(this.$route.params.id)
    console.log(applabRes)
  },
  methods: {
    async createSession() {
      const res = await postSession({ gpt_id: 1 })
      console.log(res)
    }
  }
}
</script>
*/

/**
 * 4. 使用 Header 组件
 */
// HeaderWrapper.vue
/*
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
    @edit="$emit('edit-app')"
    @share="$emit('share-app')"
    @go-home="goHome"
  />
</template>

<script>
import { SharedHeader } from '@your-org/shared-lib/vue'
import { mapGetters, mapActions } from 'vuex'
import { removeCookies } from '@your-org/shared-lib'
import Cookies from 'js-cookie'

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
    ...mapActions(['setLoginState', 'setUserInfo']),
    async handleLogout() {
      removeCookies('token')
      await this.$store.dispatch('user/resetCookies')
      const url = Cookies.get('origin') + '/login'
      window.open(url, '_self')
    },
    handleLogin() {
      const url = Cookies.get('origin') + '/login'
      window.open(url, '_self')
    },
    goHome() {
      const url = Cookies.get('origin')
      window.open(url, '_self')
    }
  }
}
</script>
*/

/**
 * 5. 使用 OSS 上传
 */
// UploadComponent.vue
/*
<script>
import { uploadImage, uploadVideo, uploadBase64Image } from '@your-org/shared-lib/api'

export default {
  methods: {
    async handleImageUpload(file) {
      try {
        const url = await uploadImage(file)
        console.log('Image uploaded:', url)
        return url
      } catch (error) {
        console.error('Upload failed:', error)
      }
    },
    
    async handleVideoUpload(file) {
      const url = await uploadVideo(file, 'gpt-video')
      return url
    },
    
    async handleBase64Upload(base64) {
      const url = await uploadBase64Image(base64)
      return url
    }
  }
}
</script>
*/
