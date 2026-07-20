import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

import HomeView from '../views/HomeView.vue'
import TodoView from '../views/TodoView.vue'
import AboutView from '../views/AboutView.vue'
import TodoDetailView from '../views/TodoDetailView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView,
    // meta 元信息标记：表示这个页面必须要登录后才能访问！
    meta: { requiresAuth: true }
  },
  {
    path: '/todo/:id',
    name: 'todo-detail',
    component: TodoDetailView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ✨【核心学习点：router.beforeEach 全局前置路由安全守卫】✨
// 每次 URL 尝试跳转前，都会先经过这个拦截器防火墙！
router.beforeEach((to, from, next) => {
  // 检查目标路径是否标记了 requiresAuth
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('user_token')
    if (token) {
      // 身份校验通过，放行允许通过进入页面
      next()
    } else {
      // 身份校验失败，拦截并弹出警告，重定向重退会到登录页
      ElMessage.warning('🔒 该页面属于权限禁区，请先登录系统！')
      next({ name: 'login' })
    }
  } else {
    // 不需要权限校验的公开页面，直接放行
    next()
  }
})

export default router
