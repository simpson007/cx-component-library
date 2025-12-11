// Vue 组件导出
// 内置登录弹框的 Header 组件
// 组件样式（包含骨架屏动画）
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
.shared-header .header-login-btn {
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
  border: none;
  z-index: 1998;
}
.shared-header .header-login-btn:hover {
  background-color: #0d3a6a;
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
.shared-header .header-user-info a,
.shared-header .header-user-info .menu-item {
  display: block;
  padding: 10px 16px;
  color: #fff;
  text-decoration: none;
  border-top: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
}
.shared-header .header-user-info a:hover,
.shared-header .header-user-info .menu-item:hover {
  background-color: #0d3a6a;
}
.shared-header .user-menu-glyph {
  transition: transform 0.5s;
  font-size: 12px;
}
.shared-header .user-menu-glyph.show {
  transform: rotateX(180deg);
}

/* 骨架屏样式 */
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
.shared-header .skeleton-logo {
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
.shared-header .skeleton-title {
  width: 80px;
  height: 16px;
  margin-left: 10px;
}
.shared-header .skeleton-user {
  width: 70px;
  height: 32px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 3px;
}

/* 登录弹框样式 */
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
  transform: translateY(-20px);
  transition: transform 0.3s;
}
.shared-header .login-modal-overlay.show .login-modal {
  transform: translateY(0);
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
.shared-header .login-modal-close:hover {
  color: #333;
}
.shared-header .login-modal-body {
  padding: 24px 20px;
}
.shared-header .login-form-group {
  margin-bottom: 16px;
}
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
  box-sizing: border-box;
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
.shared-header .login-error.show {
  display: block;
}
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
.shared-header .login-btn-cancel {
  background: #f5f5f5;
  color: #666;
}
.shared-header .login-btn-cancel:hover {
  background: #eee;
}
.shared-header .login-btn-submit {
  background: #edae24;
  color: #fff;
}
.shared-header .login-btn-submit:hover {
  background: #d9a020;
}
.shared-header .login-btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}
`;
let styleInjected = false;
function injectStyle() {
    if (styleInjected || typeof document === 'undefined')
        return;
    const style = document.createElement('style');
    style.textContent = headerCss;
    document.head.appendChild(style);
    styleInjected = true;
}
// Vue 组件配置
export const SharedHeader = {
    name: 'SharedHeader',
    props: {
        userInfo: { type: Object, required: true },
        schoolInfo: { type: Object, default: () => ({}) },
        isLogin: { type: Boolean, default: false },
        hasRoles: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        translations: { type: Object, default: () => ({}) },
        loginApi: { type: String, default: '/api/v1/school/login' },
        baseUrl: { type: String, default: '' }
    },
    emits: ['logout', 'login-success', 'go-home'],
    expose: ['openLoginModal', 'closeLoginModal', 'showLoginModal'],
    data() {
        return {
            isUserInfoShow: false,
            showLoginModal: false,
            loginLoading: false,
            loginError: '',
            loginForm: { username: '', password: '' }
        };
    },
    computed: {
        t() {
            const self = this;
            const trans = self.translations || {};
            return {
                teacherDashboard: trans.teacherDashboard || '教师后台',
                background: trans.background || '管理后台',
                account: trans.account || '账户',
                logout: trans.logout || '退出登录',
                login: trans.login || '登录'
            };
        }
    },
    mounted() {
        injectStyle();
    },
    methods: {
        toggleUserInfo() {
            const self = this;
            if (self.isLogin) {
                self.isUserInfoShow = !self.isUserInfoShow;
            }
        },
        handleLogout() {
            this.$emit('logout');
        },
        openLoginModal() {
            const self = this;
            self.showLoginModal = true;
            self.loginError = '';
            self.loginForm = { username: '', password: '' };
            self.isUserInfoShow = false;
        },
        closeLoginModal() {
            const self = this;
            self.showLoginModal = false;
            self.loginError = '';
            self.loginLoading = false;
        },
        async submitLogin() {
            const self = this;
            if (!self.loginForm.username) {
                self.loginError = '请输入用户名';
                return;
            }
            if (!self.loginForm.password) {
                self.loginError = '请输入密码';
                return;
            }
            self.loginLoading = true;
            self.loginError = '';
            try {
                const formData = new FormData();
                formData.append('username', self.loginForm.username);
                formData.append('password', self.loginForm.password);
                const url = self.baseUrl + self.loginApi;
                const response = await fetch(url, { method: 'POST', body: formData });
                const data = await response.json();
                if (data.head?.code === '1000' && data.body) {
                    const token = data.body.token;
                    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
                    document.cookie = 'token=' + token + '; expires=' + expires + '; path=/';
                    self.closeLoginModal();
                    self.$emit('login-success', data.body);
                }
                else {
                    self.loginError = data.head?.msg || '登录失败';
                }
            }
            catch (error) {
                self.loginError = error.message || '网络错误，请重试';
            }
            finally {
                self.loginLoading = false;
            }
        },
        handleGoHome() {
            this.$emit('go-home');
        },
        handleKeydown(e) {
            if (e.key === 'Enter') {
                this.submitLogin();
            }
        }
    },
    template: `
    <div class="shared-header">
      <!-- Logo 区域 -->
      <div class="header-logo" @click="handleGoHome">
        <template v-if="loading">
          <div class="skeleton skeleton-logo"></div>
          <div class="skeleton skeleton-title"></div>
        </template>
        <template v-else-if="schoolInfo && schoolInfo.logo">
          <img :src="schoolInfo.logo" alt="logo" />
          <span class="tit">{{ schoolInfo.name }}</span>
        </template>
      </div>

      <!-- 自定义操作区域 -->
      <div class="header-actions" v-if="!loading">
        <slot name="actions"></slot>
      </div>

      <!-- 用户信息区域 -->
      <template v-if="loading">
        <div class="skeleton skeleton-user"></div>
      </template>
      <template v-else-if="isLogin">
        <!-- 已登录：显示用户名+下拉箭头 -->
        <div class="header-user-name" @click="toggleUserInfo">
          <i class="fa fa-user-o"></i>
          <span>{{ userInfo?.name || '游客' }}</span>
          <span class="user-menu-glyph" :class="{ show: isUserInfoShow }">▼</span>
        </div>
        <div class="header-user-info" :style="{ height: isUserInfoShow ? 'auto' : '0' }">
          <slot name="menu">
            <ul>
              <li v-if="hasRoles"><a href="/teacher">{{ t.teacherDashboard }}</a></li>
              <li v-if="hasRoles"><a href="/services/admin/home">{{ t.background }}</a></li>
              <li><a href="/account">{{ t.account }}</a></li>
              <li><a href="javascript:void(0)" @click.prevent="handleLogout">{{ t.logout }}</a></li>
            </ul>
          </slot>
        </div>
      </template>
      <template v-else>
        <!-- 未登录：显示登录按钮 -->
        <button class="header-login-btn" @click="openLoginModal">{{ t.login }}</button>
      </template>

      <!-- 登录弹框 -->
      <div class="login-modal-overlay" :class="{ show: showLoginModal }" @click.self="closeLoginModal">
        <div class="login-modal">
          <div class="login-modal-header">
            <h3>用户登录</h3>
            <button class="login-modal-close" @click="closeLoginModal">&times;</button>
          </div>
          <div class="login-modal-body">
            <div class="login-error" :class="{ show: loginError }">{{ loginError }}</div>
            <div class="login-form-group">
              <label>用户名</label>
              <input type="text" v-model="loginForm.username" placeholder="请输入用户名" @keydown="handleKeydown" />
            </div>
            <div class="login-form-group">
              <label>密码</label>
              <input type="password" v-model="loginForm.password" placeholder="请输入密码" @keydown="handleKeydown" />
            </div>
          </div>
          <div class="login-modal-footer">
            <button class="login-btn login-btn-cancel" @click="closeLoginModal">取消</button>
            <button class="login-btn login-btn-submit" @click="submitLogin" :disabled="loginLoading">
              {{ loginLoading ? '登录中...' : '登录' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};
export function install(app) {
    injectStyle();
    app.component('SharedHeader', SharedHeader);
}
export default { install, SharedHeader };
export { headerCss as styles };
//# sourceMappingURL=index.js.map