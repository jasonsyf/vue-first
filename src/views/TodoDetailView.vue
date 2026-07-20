<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/useTaskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

// 从动态 URL /todo/:id 中提取出的数字 ID 参数
const taskId = computed(() => Number(route.params.id))

// 在全局仓库 Pinia 中精准定位出这条匹配的任务
const taskDetail = computed(() => {
  return taskStore.taskList.find(t => t.id === taskId.value)
})
</script>

<template>
  <div class="detail-page">
    <el-page-header @back="router.back()">
      <template #content>
        <span class="text-large font-600 mr-3"> 📋 任务详情档案 </span>
      </template>
    </el-page-header>

    <el-card v-if="taskDetail" class="detail-card" shadow="hover">
      <el-descriptions title="任务详细属性" :column="1" border>
        <el-descriptions-item label="唯一标识 (ID)">{{ taskDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="任务标题内容">
          <strong>{{ taskDetail.title }}</strong>
        </el-descriptions-item>
        <el-descriptions-item label="当前完成状态">
          <el-tag :type="taskDetail.isDone ? 'success' : 'warning'">
            {{ taskDetail.isDone ? '已完成 ✅' : '进行中 ⏳' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <div class="action-bar">
        <el-button 
          :type="taskDetail.isDone ? 'warning' : 'success'" 
          @click="taskStore.toggleTaskStatus(taskDetail.id)"
        >
          {{ taskDetail.isDone ? '标记为未完成' : '标记为已完成' }}
        </el-button>
        <el-button type="primary" plain @click="router.push('/todos')">返回任务列表</el-button>
      </div>
    </el-card>

    <el-empty v-else description="抱歉，未能在系统仓库中找到该 ID 对应的任务档案！" />
  </div>
</template>

<style scoped>
.detail-page {
  padding: 10px 0;
}

.detail-card {
  margin-top: 20px;
}

.action-bar {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}
</style>
