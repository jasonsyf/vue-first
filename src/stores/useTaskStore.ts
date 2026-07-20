import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { type Task } from '../components/TaskItem.vue'

const LOCAL_STORAGE_KEY = 'vue_first_task_list_pinia'

export const useTaskStore = defineStore('taskStore', () => {
  const taskList = ref<Task[]>([])
  const filterMode = ref<'all' | 'active' | 'completed'>('all')

  const isLoading = ref(false)
  const errorMessage = ref('')

  const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (savedTasks) {
    try {
      taskList.value = JSON.parse(savedTasks)
    } catch (e) {
      console.error('解析 Pinia 本地缓存失败:', e)
    }
  } else {
    taskList.value = [
      { id: 1, title: '学习 Vue3 响应式 ref', isDone: true },
      { id: 2, title: '掌握 Vue Router 页面路由', isDone: true },
      { id: 3, title: '体验 Pinia 全局状态管理仓库', isDone: false }
    ]
  }

  watch(
    taskList,
    (newTaskList) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTaskList))
    },
    { deep: true }
  )

  const activeCount = computed(() => {
    return taskList.value.filter(task => !task.isDone).length
  })

  const totalCount = computed(() => taskList.value.length)

  const filteredTaskList = computed(() => {
    if (filterMode.value === 'active') {
      return taskList.value.filter(task => !task.isDone)
    } else if (filterMode.value === 'completed') {
      return taskList.value.filter(task => task.isDone)
    }
    return taskList.value
  })

  // ✨【核心学习点：基于环境变量与代理 Proxy 发起请求】✨
  async function fetchRemoteTasks() {
    isLoading.value = true
    errorMessage.value = ''
    try {
      // 从 Vite 环境变量中读取 API 前缀地址 (即 /api)
      const apiBase = import.meta.env.VITE_API_BASE_URL
      
      // 请求本地代理地址：http://localhost:5173/api/todos?_limit=5
      // Vite 开发服务器会自动将其悄悄转发给 https://jsonplaceholder.typicode.com/todos?_limit=5 并规避同源跨域拦截！
      const response = await axios.get(`${apiBase}/todos?_limit=5`)
      
      const remoteTasks: Task[] = response.data.map((item: any) => ({
        id: Date.now() + Math.random(),
        title: `[云端 API 代理请求] ${item.title}`,
        isDone: item.completed
      }))

      taskList.value = [...remoteTasks, ...taskList.value]
    } catch (error: any) {
      errorMessage.value = '拉取远程任务失败，请检查 Proxy 代理配置。'
      console.error('API 请求出错:', error)
    } finally {
      isLoading.value = false
    }
  }

  function addTask(title: string) {
    if (title.trim() !== '') {
      taskList.value.push({
        id: Date.now(),
        title: title,
        isDone: false
      })
    }
  }

  function toggleTaskStatus(id: number) {
    const targetTask = taskList.value.find(task => task.id === id)
    if (targetTask) {
      targetTask.isDone = !targetTask.isDone
    }
  }

  function deleteTask(id: number) {
    taskList.value = taskList.value.filter(task => task.id !== id)
  }

  return {
    taskList,
    filterMode,
    isLoading,
    errorMessage,
    activeCount,
    totalCount,
    filteredTaskList,
    fetchRemoteTasks,
    addTask,
    toggleTaskStatus,
    deleteTask
  }
})
