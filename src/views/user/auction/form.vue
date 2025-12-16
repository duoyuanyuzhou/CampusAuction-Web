<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import AuctionItem = API.AuctionItem
import { addAuctionItem, getAuctionItem,  updateAuctionItem } from '@/api/auctionItemController'

const auctionForm = ref<InstanceType<typeof ElForm>>()
const auction = reactive<AuctionItem>(getEmptyAuction())

function getEmptyAuction(): AuctionItem {
  return {
    id: undefined,
    userId: undefined,
    title: '',
    description: '',
    startPrice: 0,
    currentPrice: 0,
    stepPrice: 0,
    startTime: '',
    endTime: '',
    status: 0,
    auditComment: '',
    coverImage: '',
    timeRange: []
  };
}


const rules = reactive({
  title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  startPrice: [{ required: true, message: '请输入开始价格', trigger: 'blur' }],
  stepPrice: [{ required: true, message: '请输入加价', trigger: 'blur' }],
  startTime: [{ required: true, message: '请输入开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请输结束时间', trigger: 'change' }],
  timeRange: [{ required: true, message: '请选择时间', trigger: 'change' }],

})

const AUCTION_STATUS_OPTIONS = [
  { label: '草稿', value: 0 },
  { label: '审核中', value: 1 },
  { label: '审核通过', value: 2 },
  { label: '竞拍中', value: 3 },
  { label: '已成交', value: 4 },
  { label: '流拍', value: 5 },
]
// 0 新增  1 编辑
const status = ref(-1);
watch(
  () => auction.timeRange,
  (val) => {
    if (!val || val.length !== 2) {
      return
    }
    const [start, end] = val
    auction.startTime = start
    auction.endTime = end
  }
)





const emit = defineEmits(['refresh'])
const dialogFormVisible = ref(false)
const openDialog = async (row: AuctionItem, reallyStatus: number) => {
  resert()
  auctionForm.value?.clearValidate()

  status.value = reallyStatus;
  if (status.value === 1){
    console.log('auction', row)
    Object.assign(auction, row)
    const res = await getAuctionItem({
      id: row.id,
    })
    const result = res.data
    Object.assign(auction, result)
    auction.timeRange = [auction.startTime,auction.endTime]
  }

  dialogFormVisible.value = true
}

const onSubmit = () => {
  auctionForm.value?.validate((valid) => {
    if (valid) {
      if (status.value === 1){
        updateAuctionItem(
          {id: auction.id},
          auction
        ).then((res) => {
          ElMessage.success('更新成功')
          emit('refresh')
        })
          .catch((err) => {
            ElMessage.error(err?.message || '更新失败')
          })
          .finally(() => {
            dialogFormVisible.value = false
            cancel()
          })
      }

      if (status.value === 0){
        addAuctionItem({...auction}).then((res) => {
          ElMessage.success('添加成功')
          emit('refresh')
        })
          .catch((err) => {
            ElMessage.error(err?.message || '添加失败')
          })
          .finally(() => {
            cancel()
          })
      }
    } else {
      ElMessage.error('表单校验失败')
      return
    }
  })
}

const cancel = () => {
  dialogFormVisible.value = false;
  resert();
}

const resert = () => {
  auctionForm.value?.resetFields()
  Object.assign(auction, getEmptyAuction())
  auction.timeRange = null
  status.value = -1
}

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog  v-model="dialogFormVisible" title="" width="700" :show-close="false">
    <el-form :model="auction" :rules="rules" ref="auctionForm">
      <el-form-item label="名称" prop="title">
        <el-input v-model="auction.title" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="auction.description" type="textarea" placeholder="请输入描述" clearable />
      </el-form-item>
      <el-form-item label="开始价格" prop="startPrice">
        <el-input v-model="auction.startPrice" :min="0" placeholder="请输入开始价格" clearable />
      </el-form-item>
      <el-form-item label="加价" prop="stepPrice">
        <el-input v-model="auction.stepPrice" :min="0" placeholder="请输入加价" clearable />
      </el-form-item>
      <el-form-item label="时间" prop="timeRange">
        <el-date-picker
          v-model="auction.timeRange"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="status" v-if="status !== 0">
        <el-select v-model="auction.status" placeholder="请选择" size="small" disabled style="width: 100%">
          <el-option
            v-for="item in AUCTION_STATUS_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="注解" prop="auditComment" v-if="status !== 0">
        <el-input v-model="auction.auditComment" disabled placeholder="请输入注解" clearable />
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
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
