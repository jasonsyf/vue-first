import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'user_token'

export const useUserStore = defineStore('userStore', () => {
  // 响应式 Token 变量（初始化从 localStorage 中读取）
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))

  // 计算属性：当前是否登录
  const isLoggedIn = computed(() => !!token.value)

  // 登录动作：更新响应式变量 + 写入 localStorage
  function login(newToken = 'mock_token_123456') {
    token.value = newToken
    localStorage.setItem(TOKEN_KEY, newToken)
  }

  // 退出登录动作：清空响应式变量 + 移除 localStorage
  function logout() {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return {
    token,
    isLoggedIn,
    login,
    logout
  }
})
