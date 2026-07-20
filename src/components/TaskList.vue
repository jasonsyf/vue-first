<script setup lang="ts">
import TaskItem, { type Task } from './TaskItem.vue'

defineProps<{
  tasks: Task[]
}>()

defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()
</script>

<template>
  <!-- 中间层组件 TaskList：完全不需要帮 TaskItem 传递作者名字或主题配置！ -->
  <ul class="task-list">
    <TaskItem 
      v-for="task in tasks" 
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', task.id)"
      @remove="$emit('remove', task.id)"
    />
  </ul>
</template>

<style scoped>
.task-list {
  padding: 0;
  list-style: none;
}
</style>
