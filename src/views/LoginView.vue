<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const username = ref('admin')
const password = ref('123456')

function handleLogin() {
  if (username.value.trim() && password.value.trim()) {
    // 模拟将登录成功 Token 令牌存储在本地 localStorage 中
    localStorage.setItem('user_token', 'mock_token_123456')
    ElMessage.success('🎉 登录成功！欢迎回来！')
    
    // 登录成功后跳转到任务记事本页面
    router.push('/todos')
  } else {
    ElMessage.error('请输入用户名和密码！')
  }
}
</script>

<template>
  <div class="login-page">
    <el-card class="login-card" shadow="always">
      <template #header>
        <div class="card-header">
          🔐 系统模拟登录认证中心
        </div>
      </template>

      <el-form label-position="top">
        <el-form-item label="账号名称">
          <el-input v-model="username" prefix-icon="User" placeholder="请输入账号..." />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="password" type="password" show-password prefix-icon="Lock" placeholder="请输入密码..." />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" size="large" icon="Key" @click="handleLogin">
            一键登录系统
          </el-button>
        </el-form-item>
      </el-form>

      <el-alert 
        title="测试提示：点击一键登录模拟写入身份 Token 令牌，以解锁记事本权限。" 
        type="info" 
        :closable="false" 
        show-icon 
      />
    </el-card>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.login-card {
  width: 380px;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
