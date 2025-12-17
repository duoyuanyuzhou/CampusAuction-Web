<script setup lang="ts">
import { getUser } from '@/api/userController'
import { computed, nextTick, onMounted, ref } from 'vue'
import User = API.User
import FormDialog from './form.vue'

const formDialogRef = ref<InstanceType<typeof FormDialog> | null>(null)

const user = ref<User>({})
const getData = async () => {
  const result = await getUser()
  user.value = result.data
}

const userStatus = computed(() => {
  if (user.value.status === 0) {
    return '正常'
  }
  return '禁用'
})

const handleEdit = async (row, status: number) => {
  console.log('row', row)
  console.log('ref', formDialogRef.value)
  await nextTick()
  formDialogRef.value?.openDialog(user.value)
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div class="user">
    <el-button type="primary" @click="handleEdit()">修改</el-button>

    <el-descriptions title="用户信息" direction="vertical" border style="margin-top: 20px">
      <el-descriptions-item :rowspan="2" :width="300" label="头像" align="center">
        <el-image style="width: 100%; height: 100%" :src="user.avatar" />
      </el-descriptions-item>
      <el-descriptions-item label="账户">{{ user.username }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ user.nickname }}</el-descriptions-item>
      <el-descriptions-item label="学号">{{ user.schoolId }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        {{ userStatus }}
      </el-descriptions-item>
    </el-descriptions>
    <FormDialog ref="formDialogRef" @refresh="getData" />
  </div>
</template>

<style scoped>
.user {
  width: 100%;
  height: 100%;
}
</style>
