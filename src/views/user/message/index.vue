<script setup lang="ts">
import FormDialog from '@/views/user/auction/form.vue'
import { onMounted, reactive, ref } from 'vue'
import { getUserMessagePage } from '@/api/userMessageController'
import UserMessage = API.UserMessage

const Order_STATUS_OPTIONS = [
  { label: '待支付', value: 0 },
  { label: '已支付', value: 1 },
  { label: '已取消', value: 2 },
  { label: '已完成', value: 3 },
]

const defaultQuery = {
  current: 1,
  size: 10,
}

const query = reactive({ ...defaultQuery })

/** 查询条件 */


const pageData = ref<{
  records: UserMessage[]
  total: number
  current: number
  size: number
}>({
  records: [],
  total: 0,
  current: 1,
  size: 10,
})

const getData =async () => {
  const result = await getUserMessagePage();
  pageData.value = result.data;
  query.current = pageData.value.current;
  query.size = pageData.value.size;
}


onMounted(async () => {
  await getData();
})
</script>

<template>
  <div class="message">
    <el-table :data="pageData.records" style="width: 100%">
      <template #empty>
        <div style="text-align: center; padding: 40px 0">
          <el-empty description="暂时没有数据" />
        </div>
      </template>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="content" label="内容" />

    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageData.total"
      :page-size="query.size"
      v-model:current-page="query.current"
      @current-change="getData"
    />

    <FormDialog ref="formDialogRef" @refresh="getData" />
  </div>
</template>

<style scoped>
.message {
  width: 100%;
  height: 100%;
}
</style>
