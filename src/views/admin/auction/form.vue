<script setup lang="ts">
import { ref, reactive } from 'vue'
import { updateUser } from '@/api/userController'
import { ElMessage } from 'element-plus'
import AuctionItem = API.AuctionItem
import { getAuctionItem, reviewAuctionItem } from '@/api/auctionItemController'

const rules = reactive({
  auditComment: [{ required: true, message: '请输入注解', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})

const AUCTION_STATUS_OPTIONS = [
  { label: '草稿', value: 0 },
  { label: '审核中', value: 1 },
  { label: '审核通过', value: 2 },
  { label: '竞拍中', value: 3 },
  { label: '已成交', value: 4 },
  { label: '流拍', value: 5 },
]

const auctionForm = ref<InstanceType<typeof ElForm>>()
const auction = reactive<AuctionItem>({})

const emit = defineEmits(['refresh'])
const dialogFormVisible = ref(false)
const openDialog = async (row: AuctionItem) => {
  // userForm.value.resetFields()
  console.log('auction', row)
  Object.assign(auction, row)

  const res = await getAuctionItem({
    id: row.id,
  })
  const result = res.data
  Object.assign(auction, result)

  dialogFormVisible.value = true
}

const onSubmit = () => {
  auctionForm.value?.validate((valid) => {
    if (valid) {
      reviewAuctionItem({
        auditComment: auction.auditComment,
        status: auction.status,
        id: auction.id
      }).then((res) => {
        ElMessage.success('更新成功')
        emit('refresh')
      })
        .catch((err) => {
          ElMessage.error(err?.message || '更新失败')
        })
        .finally(() => {
          dialogFormVisible.value = false
        })
    } else {
      ElMessage.error('表单校验失败')
      return
    }
  })
}
defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="" width="700" :show-close="false">
    <el-form :model="auction" :rules="rules" ref="auctionForm">
      <el-form-item label="名称">
        <el-input v-model="auction.title" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="auction.description" type="textarea" placeholder="请输入描述" clearable />
      </el-form-item>
      <el-form-item label="开始价格">
        <el-input v-model="auction.startPrice" placeholder="请输入开始价格" clearable />
      </el-form-item>
      <el-form-item label="加价">
        <el-input v-model="auction.stepPrice" placeholder="请输入加价" clearable />
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input v-model="auction.startTime" placeholder="请选择开始时间" clearable />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input v-model="auction.endTime" placeholder="请选择结束时间" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="auction.status" placeholder="请选择" size="small" style="width: 100%">
          <el-option
            v-for="item in AUCTION_STATUS_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="注解" prop="auditComment">
        <el-input v-model="auction.auditComment" placeholder="请输入注解" clearable />
      </el-form-item>
      <el-form-item label="封面图">
        <el-image
          style="width: 100px; height: 100px"
          :preview-teleported="true"
          :preview-src-list="[auction.coverImage]"
          :src="auction.coverImage"
          :fit="fit"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
