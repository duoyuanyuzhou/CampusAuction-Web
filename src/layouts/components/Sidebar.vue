<template>
  <div class="sidebar">
    <div class="title">后台管理系统</div>

    <el-menu :default-active="$route.path" router>
      <template v-for="item in menuItems" :key="item.fullPath">
        <el-sub-menu v-if="item.children?.length" :index="item.fullPath">
          <template #title>
            <el-icon v-if="item.meta?.icon"><component :is="Icons[item.meta.icon]" /></el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.fullPath" :index="child.fullPath">
            <el-icon v-if="child.meta?.icon"><component :is="Icons[child.meta.icon]" /></el-icon>
            <span>{{ child.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.fullPath">
          <el-icon v-if="item.meta?.icon"><component :is="Icons[item.meta.icon]" /></el-icon>
          <span>{{ item.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>

  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import router from '@/router'
import * as Icons from '@element-plus/icons-vue'

const userStore = useUserStore()

// 获取原始嵌套路由
const routes = router.options.routes || []

const baseRoute = routes.find(r =>
  r.meta?.role === (userStore.isAdmin ? 'admin' : 'user')
)


const appendFullPath = (routes: any[], parentPath = '') =>
  routes
    .filter(r => r.meta?.title)
    .map(r => ({
      ...r,
      fullPath: r.path.startsWith('/') ? r.path : `${parentPath}/${r.path}`.replace(/\/+/g, '/'),
      children: r.children ? appendFullPath(r.children, parentPath) : []
    }))


const menuItems = baseRoute?.children ? appendFullPath(baseRoute.children, baseRoute.path) : []

// 注册图标（可选）
Object.entries(Icons).forEach(([key, component]) => {
  component.name = key
})

</script>


<style scoped>
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.el-menu) { flex: 1; }

.title {
  text-align: center;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
}
</style>
