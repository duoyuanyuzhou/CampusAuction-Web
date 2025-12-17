<script setup lang="ts">
import FormDialog from '@/views/user/auction/form.vue'
import { onMounted, reactive, ref } from 'vue'
import OrderInfoVo = API.OrderInfoVo
import { getOrderInfoVoPage } from '@/api/orderInfoController'
import {payOrder} from '@/api/orderInfoController'
import { ElMessage } from 'element-plus'
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
  records: OrderInfoVo[]
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
  const result = await getOrderInfoVoPage();
  pageData.value = result.data;
  query.current = pageData.value.current;
  query.size = pageData.value.size;
}

const payOrderByUser = (row: OrderInfoVo) => {
  payOrder({
    orderId: row.id,
    },
    row
  ).then(()=> {
    ElMessage.success("支付成功");
    getData();
  })
}
onMounted(async () => {
  await getData();
})
</script>

<template>
  <div class="orders">

<!--    <el-row>-->
<!--      <el-col :span="24">-->
<!--        <el-form :inline="true" :model="query" label-width="100px">-->
<!--          <el-form-item label="名称">-->
<!--            <el-input v-model="query.title" placeholder="请输入名称" clearable />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="开始价格">-->
<!--            <el-input v-model="query.startPrice" placeholder="请输入开始价格" clearable />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="加价">-->
<!--            <el-input v-model="query.stepPrice" placeholder="请输入加价" clearable />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="时间">-->
<!--            <el-date-picker-->
<!--              v-model="timeRange"-->
<!--              type="datetimerange"-->
<!--              range-separator="到"-->
<!--              start-placeholder="开始时间"-->
<!--              end-placeholder="结束时间"-->
<!--              value-format="YYYY-MM-DD HH:mm"-->
<!--              clearable-->
<!--            />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="状态">-->
<!--            <el-select v-model="query.status" placeholder="请选择" style="width: 180px">-->
<!--              <el-option-->
<!--                v-for="item in AUCTION_STATUS_OPTIONS"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="getData">查询</el-button>-->
<!--            <el-button @click="onReset">重置</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-col>-->
<!--    </el-row>-->

    <el-table :data="pageData.records" style="width: 100%">
      <template #empty>
        <div style="text-align: center; padding: 40px 0">
          <el-empty description="暂时没有数据" />
        </div>
      </template>
      <el-table-column prop="itemName" label="商品" />
      <el-table-column prop="sellerUserName" label="卖家" />
      <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-select
              v-model="row.status"
              placeholder="请选择"
              size="small"
              style="width: 100%"
              disabled
            >
              <el-option
                v-for="option in Order_STATUS_OPTIONS"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </template>
      </el-table-column>
      <el-table-column prop="finalPrice" label="价格" />
      <el-table-column prop="payTime" label="支付时间" />

      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="payOrderByUser(row)"> 付款 </el-button>

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

<style scoped>
.orders {
  width: 100%;
  height: 100%;
}
</style>
