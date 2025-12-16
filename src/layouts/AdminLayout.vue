<script setup lang="ts">
import Sidebar from '@/layouts/components/Sidebar.vue'
import NavBar from '@/components/NavBar.vue'

</script>

<template>
  <div class="adminLayout">
    <el-container class="container">
      <el-aside width="300px"><Sidebar /></el-aside>
      <el-container>
        <el-header><NavBar /></el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.adminLayout {
  width: 100%;
  height: 100vh;
}

.container {
  height: 100vh;
}
</style>
