<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'

export interface Task {
  id: number
  title: string
  isDone: boolean
}

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'toggle'): void
}>()

const router = useRouter()
const authorName = inject<string>('authorName', '默认作者')
const appTheme = inject<string>('appTheme', '#42b883')

// ✨【核心学习点：router.push 编程式导航跳转】✨
function goToDetail() {
  router.push(`/todo/${props.task.id}`)
}
</script>

<template>
  <div class="task-item" :class="{ completed: task.isDone }">
    <div class="task-left">
      <el-checkbox 
        :model-value="task.isDone" 
        size="large" 
        @change="emit('toggle')" 
      />
      <span class="title">{{ task.title }}</span>
      <el-tag size="small" effect="dark" :color="appTheme" style="border: none;">
        by {{ authorName }}
      </el-tag>
    </div>

    <div class="task-right">
      <!-- 详情按钮：触发编程式路由跳转 -->
      <el-button type="info" size="small" icon="View" plain @click="goToDetail">
        详情
      </el-button>

      <el-popconfirm
        title="确定要删除这条任务吗？"
        confirm-button-text="确定"
        cancel-button-text="取消"
        confirm-button-type="danger"
        @confirm="emit('remove')"
      >
        <template #reference>
          <el-button type="danger" size="small" icon="Delete" plain>
            删除
          </el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: #fff;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.task-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.task-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-size: 14px;
  color: #303133;
}

.completed .title {
  text-decoration: line-through;
  color: #a8abb2;
}
</style>