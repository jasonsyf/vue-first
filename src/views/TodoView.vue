<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/useTaskStore'
import { ElMessage } from 'element-plus'
import TaskList from '../components/TaskList.vue'

const taskStore = useTaskStore()
const newTaskTitle = ref('')

function handleAddTask() {
  if (newTaskTitle.value.trim() !== '') {
    taskStore.addTask(newTaskTitle.value)
    newTaskTitle.value = ''
    // ✨ 使用 Element Plus 全局酷炫轻提示消息弹窗
    ElMessage.success('🎉 成功创建一条新任务！')
  } else {
    ElMessage.warning('请输入有效的任务名称！')
  }
}
</script>

<template>
  <div class="todo-page">
    <div class="header-action">
      <h2>📝 任务记事本面板</h2>
      <!-- Element Plus 带 Cloud 图标和 Loading 效果的精致按钮 -->
      <el-button 
        type="primary" 
        icon="Cloudy"
        :loading="taskStore.isLoading" 
        @click="taskStore.fetchRemoteTasks"
      >
        {{ taskStore.isLoading ? '正在拉取数据...' : '同步云端示例数据' }}
      </el-button>
    </div>

    <!-- 异常 Alert 组件 -->
    <el-alert 
      v-if="taskStore.errorMessage" 
      :title="taskStore.errorMessage" 
      type="error" 
      show-icon 
      style="margin-bottom: 15px;"
    />

    <div class="stat-bar">
      <span>待完成任务：<el-badge :value="taskStore.activeCount" type="warning" /></span>
      <el-divider direction="vertical" />
      <span>总任务数：<el-badge :value="taskStore.totalCount" type="info" /></span>
    </div>

    <!-- 输入组：使用 Element Plus el-input 带 Icon 的高颜值输入框 -->
    <div class="input-group">
      <el-input
        v-model="newTaskTitle"
        placeholder="请输入需要完成的新任务..."
        size="large"
        clearable
        prefix-icon="Edit"
        @keyup.enter="handleAddTask"
      >
        <template #append>
          <el-button type="primary" icon="Plus" @click="handleAddTask">添加任务</el-button>
        </template>
      </el-input>
    </div>

    <!-- 分类单选按钮组：使用 Element Plus el-radio-group -->
    <div class="filter-group">
      <el-radio-group v-model="taskStore.filterMode" size="default">
        <el-radio-button value="all">全部任务</el-radio-button>
        <el-radio-button value="active">进行中</el-radio-button>
        <el-radio-button value="completed">已完成</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 加载与空提示：使用 Element Plus 空状态组件 el-empty -->
    <div v-if="taskStore.isLoading" class="loading-box">
      <el-icon class="is-loading" :size="30"><Loading /></el-icon>
      <p style="margin-top: 10px; color: #409eff;">正在从远程服务器同步任务，请稍候...</p>
    </div>

    <el-empty 
      v-else-if="taskStore.filteredTaskList.length === 0" 
      description="暂无符合条件的任务项目，快去添加吧！" 
    />

    <TaskList 
      v-else 
      :tasks="taskStore.filteredTaskList" 
      @toggle="taskStore.toggleTaskStatus"
      @remove="deleteId => taskStore.deleteTask(deleteId)"
    />
  </div>
</template>

<style scoped>
.todo-page {
  padding: 5px 0;
}

.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.stat-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  background-color: #f4f4f5;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

.filter-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.loading-box {
  text-align: center;
  padding: 40px 0;
}
</style>
