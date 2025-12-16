<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

</script>

<template>
  <div class="defaultLayout">
    <el-container class="container">
      <el-header><NavBar /></el-header>
      <el-main><router-view /></el-main>
      <el-footer><Footer /></el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.defaultLayout {
  flex: 1;
  display: flex;
}

.container {
  flex: 1;
}

:deep(.el-main) {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
