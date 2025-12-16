<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="query" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="query.username" placeholder="请输入用户名" clearable />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="iPageUser.records" style="width: 100%">
      <template #empty>
        <div style="text-align:center; padding: 40px 0;">
          <el-empty description="暂时没有数据" />
        </div>
      </template>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="schoolId" label="学号" />
      <el-table-column prop="role" label="状态" >
        <template #default="{ row }">
          <el-select
            v-model="row.role"
            placeholder="请选择"
            size="small"
            style="width: 100%"
            disabled
          >
            <el-option label="管理员" :value="2" />
            <el-option label="普通用户"   :value="1" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像" >
        <template #default="{ row }">
          <el-image style="width: 100px; height: 100px;" :preview-teleported="true" :preview-src-list="[row.avatar || url]" :src="row.avatar ||  url" :fit="fit" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row)"> 编辑 </el-button>
          <el-button link type="primary" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="iPageUser.total"
      :page-size="iPageUser.size"
      v-model:current-page="query.current"
      @current-change="getData"
    />
    <FormDialog ref="formDialogRef" @refresh="getData"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { deleteUser, getUserList } from '@/api/userController'
import { nextTick } from 'vue'

import FormDialog from './form.vue'
import { ElMessage } from 'element-plus'
const formDialogRef = ref<InstanceType<typeof FormDialog> | null>(null)

const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const formInline = reactive({
  username: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const handleEdit = async (row) => {
  console.log('row', row)
  console.log('ref', formDialogRef.value)
  await nextTick()
  formDialogRef.value?.openDialog(row)
}
const onReset = () => {
  formInline.user = ''
  formInline.region = ''
  formInline.date = ''
}

const handleClick = () => {
  console.log('click')
}


const iPageUser = ref<IPageUser | null>({
  records: [],
  total: 0,
  current: 1,
  size: 10,
})
const query = reactive({
  current: 1,
  size: 10,
  username: ''
})

const handleDelete = (id: number) => {
  ElMessageBox.confirm(
    '此操作将永久删除该用户，是否继续？',
    '警告',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  )
    .then(() => {
       deleteUser({id: id})
         .then((res) => {

         ElMessage.success('删除成功')
         getData();
       })
         .catch((err) => {
           ElMessage.error(err?.message || '删除失败')
         }).finally(() =>{
       })
    })
    .catch(() => {
      ElMessage.info('取消删除')

    })
}

const getData = async () => {
  const res = await getUserList({
    ...query,
  })
  console.log('user', res)
  iPageUser.value = res.data
  query.current = res.data.current;
  query.size = res.data.size;
  console.log('iPageUser', iPageUser.value)
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.user {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  padding: 20px;
}

.item {
  width: 260px;
}
</style>
