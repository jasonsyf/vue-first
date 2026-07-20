<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'
import { ElMessage } from 'element-plus'

const taskStore = useTaskStore()
const quickTaskTitle = ref('')

function handleQuickAdd() {
  if (quickTaskTitle.value.trim() !== '') {
    taskStore.addTask(quickTaskTitle.value)
    quickTaskTitle.value = ''
    ElMessage.success('🎉 快捷创建成功！可通过记事本页面查看。')
  } else {
    ElMessage.warning('请输入任务内容！')
  }
}
</script>

<template>
  <div class="home-page">
    <h2>🏠 欢迎来到 Vue3 现代前端学习空间</h2>
    <p class="subtitle">基于 Vue 3 + TypeScript + Vite + Pinia + Element Plus 建设</p>

    <!-- 聚合使用 Element Plus 的 Card 与 Statistic 统计卡片组件 -->
    <el-card class="stat-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-statistic title="待完成任务数量" :value="taskStore.activeCount" />
        </el-col>
        <el-col :span="12">
          <el-statistic title="总任务记录数" :value="taskStore.totalCount" />
        </el-col>
      </el-row>
    </el-card>

    <!-- 快捷添加工具栏组件 -->
    <div class="quick-input-box">
      <el-input 
        v-model="quickTaskTitle" 
        placeholder="首页快捷快速添加任务..." 
        size="large"
        prefix-icon="Lightning"
        @keyup.enter="handleQuickAdd"
      >
        <template #append>
          <el-button type="success" icon="Plus" @click="handleQuickAdd">快捷添加</el-button>
        </template>
      </el-input>
    </div>

    <!-- 图表导航卡片布局 -->
    <div class="cards-grid">
      <el-card shadow="hover" class="feature-card">
        <template #header>
          <div class="card-header">
            <span>📝 任务记事本系统</span>
          </div>
        </template>
        <p>提供支持持久化存储、Pinia 驱动、接口同步的完备任务板。</p>
        <el-button type="primary" class="action-btn" @click="$router.push('/todos')">进入记事本</el-button>
      </el-card>

      <el-card shadow="hover" class="feature-card">
        <template #header>
          <div class="card-header">
            <span>ℹ️ 关于与技术架构</span>
          </div>
        </template>
        <p>了解本项目的架构体系分层及相关第三方全家桶库。</p>
        <el-button type="info" plain class="action-btn" @click="$router.push('/about')">查看系统信息</el-button>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 10px 0;
}

.subtitle {
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 25px;
  background-color: #fafafa;
}

.quick-input-box {
  margin-bottom: 30px;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.feature-card {
  text-align: left;
}

.card-header {
  font-weight: bold;
}

.action-btn {
  margin-top: 15px;
  width: 100%;
}
</style>
