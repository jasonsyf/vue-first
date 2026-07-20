<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from './stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()
const authorName = ref('阳光开发者')
const appTheme = ref('#42b883')

provide('authorName', authorName)
provide('appTheme', appTheme)

function handleLogout() {
  userStore.logout()
  ElMessage.info('已成功安全退出登录。')
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <header class="navbar">
      <div class="brand">🚀 Vue3 示例系统</div>
      <nav class="nav-links">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/todos">记事本</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>

      <!-- 登录状态控制提示组 -->
      <div class="user-status">
        <template v-if="userStore.isLoggedIn">
          <el-tag type="success" size="small">已登录鉴权</el-tag>
          <el-button type="danger" size="small" link @click="handleLogout">退出登录</el-button>
        </template>
        <template v-else>
          <el-button type="primary" size="small" @click="router.push('/login')">未登录 (去登录)</el-button>
        </template>
      </div>
    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer class="footer">
      <p>© 2026 Vue-First 课程学习项目 | 作者：{{ authorName }}</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  max-width: 750px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.brand {
  font-weight: bold;
  font-size: 18px;
  color: #2c3e50;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
}

.nav-links a.router-link-active {
  background-color: #42b883;
  color: white;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.content {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 25px;
  min-height: 300px;
}

.footer {
  text-align: center;
  margin-top: 25px;
  font-size: 13px;
  color: #999;
}
</style>