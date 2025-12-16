<script setup lang="ts">
import FormDialog from './form.vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { getPage, getPageByUser } from '@/api/auctionItemController'

const formDialogRef = ref<InstanceType<typeof FormDialog> | null>(null)

const AUCTION_STATUS_OPTIONS = [
  { label: '草稿', value: 0 },
  { label: '审核中', value: 1 },
  { label: '审核通过', value: 2 },
  { label: '竞拍中', value: 3 },
  { label: '已成交', value: 4 },
  { label: '流拍', value: 5 },
]
/** 查询条件 */
const defaultQuery = {
  current: 1,
  size: 10,
  title: '',
  description: '',
  startPrice: '',
  stepPrice: '',
  startTime: '',
  endTime: '',
  status: null as number | null,
  auditComment: '',
  coverImage: '',
}

const query = reactive({ ...defaultQuery })

const timeRange = ref<[string, string] | null>(null)
/** 分页数据（一定要是 ref） */
const pageData = ref<{
  records: any[]
  total: number
  current: number
  size: number
}>({
  records: [],
  total: 0,
  current: 1,
  size: 10,
})

const buildParams = () => {
  const params: any = {
    page: query.current,
    size: query.size,
  }

  // 普通字段：非空才传
  Object.entries(query).forEach(([key, value]) => {
    if (
      value !== '' &&
      value !== null &&
      value !== undefined &&
      key !== 'current' &&
      key !== 'size'
    ) {
      params[key] = value
    }
  })

  // 时间范围：有才传
  if (timeRange.value && timeRange.value.length === 2) {
    params.startTime = timeRange.value[0]
    params.endTime = timeRange.value[1]
  }

  return params
}

const getData = async () => {
  const params = buildParams()
  const res = await getPageByUser(params)
  pageData.value = res.data
}

const onReset = () => {
  Object.assign(query, defaultQuery)
  getData()
}
const handleEdit = async (row, status:number) => {
  console.log('row', row)
  console.log('ref', formDialogRef.value)
  await nextTick()
  formDialogRef.value?.openDialog(row, status)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="auction">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="query" label-width="100px">
          <el-form-item label="名称">
            <el-input v-model="query.title" placeholder="请输入名称" clearable />
          </el-form-item>
          <el-form-item label="开始价格">
            <el-input v-model="query.startPrice" placeholder="请输入开始价格" clearable />
          </el-form-item>
          <el-form-item label="加价">
            <el-input v-model="query.stepPrice" placeholder="请输入加价" clearable />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm"
              clearable
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.status" placeholder="请选择" style="width: 180px">
              <el-option
                v-for="item in AUCTION_STATUS_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleEdit(row, 0)">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="pageData.records" style="width: 100%">
      <template #empty>
        <div style="text-align: center; padding: 40px 0">
          <el-empty description="暂时没有数据" />
        </div>
      </template>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="nickname" label="描述">
        <template #default="{ row }">
          <el-input
            v-model="row.description"
            style="width: 240px"
            :rows="2"
            type="textarea"
            placeholder="请输入描述"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column prop="startPrice" label="开始价格" />
      <el-table-column prop="stepPrice" label="加价" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="endTime" label="结束时间" />
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-select
            v-model="row.status"
            placeholder="请选择"
            size="small"
            style="width: 100%"
            disabled
          >
            <el-option label="管理员" :value="2" />
            <el-option label="普通用户" :value="1" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="coverImage" label="封面图">
        <template #default="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :preview-teleported="true"
            :preview-src-list="[row.coverImage]"
            :src="row.coverImage"
            :fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleEdit(row, 1)"> 编辑 </el-button>
          <el-button link type="primary" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
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

<style scoped></style>
