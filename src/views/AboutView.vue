<script setup lang="ts">
import { inject } from 'vue'

const authorName = inject<string>('authorName', '开发者')
</script>

<template>
  <div class="about-page">
    <h2>ℹ️ 关于本系统</h2>
    <p>作者：<strong>{{ authorName }}</strong></p>
    <p>技术栈：Vue 3 + Vite + TypeScript + Vue Router 4</p>
    <div class="tech-stack">
      <h4>核心掌握技能清单：</h4>
      <ul>
        <li>✅ 响应式数据绑定 (ref, reactive)</li>
        <li>✅ 双向绑定 (v-model) 与列表/条件渲染 (v-for, v-if)</li>
        <li>✅ 组件传值 (Props & Emits) 与跨层级通信 (Provide/Inject)</li>
        <li>✅ 计算属性 (computed) 与监听器 (watch)</li>
        <li>✅ 本地持久化 (localStorage) 与 生命周期 (onMounted)</li>
        <li>🚀 路由与导航 (Vue Router 4)</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 20px 0;
  line-height: 1.6;
}

.tech-stack {
  margin-top: 20px;
  padding: 15px;
  background-color: #f7f9fb;
  border-radius: 6px;
}

ul {
  padding-left: 20px;
}
</style>
