<script setup lang="ts">
import { ref, computed, nextTick, onMounted, watch, onUnmounted } from 'vue'
import { getAuctionItem } from '@/api/auctionItemController'
import { useRoute } from 'vue-router'
import AuctionItem = API.AuctionItem
import { addBidRecord, getBidRecords } from '@/api/bidRecordController'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const biddingRef = ref<HTMLElement | null>(null)
const auction = ref<AuctionItem>({})
const bids = ref([])

const userStore = useUserStore()
const currentUserId = userStore.user?.id
let eventSource: EventSource | null = null

const showAll = ref(false)
const MAX_VISIBLE = 15
const visibleBids = computed(() => {
  if (showAll.value) return bids.value
  return bids.value.slice(-MAX_VISIBLE)
})
const myPrice = ref(0)

const nowTime = ref(Date.now())

// 每秒更新一次当前时间
setInterval(() => {
  nowTime.value = Date.now()
}, 1000)

// 是否可以出价
const canBid = computed(() => {
  if (!auction.value.startTime || !auction.value.endTime) return false
  const start = new Date(auction.value.startTime).getTime()
  const end = new Date(auction.value.endTime).getTime()
  const now = nowTime.value
  return now >= start && now <= end
})

// 自动提醒
let startAlerted = false
let endAlerted = false

watch(nowTime, (current) => {
  if (!auction.value.startTime || !auction.value.endTime) return

  const start = new Date(auction.value.startTime).getTime()
  const end = new Date(auction.value.endTime).getTime()

  // 拍卖开始提醒
  if (!startAlerted && current >= start && current <= end) {
    ElMessage.info('拍卖开始啦，可以出价了！')
    startAlerted = true
  }

  // 拍卖结束提醒
  if (!endAlerted && current > end) {
    ElMessage.warning('拍卖已结束，不能再出价了')
    endAlerted = true
  }
})


const scrollToBottom = async () => {
  await nextTick()
  if (biddingRef.value) {
    biddingRef.value.scrollTop = biddingRef.value.scrollHeight
  }
}
const toggleHistory = async () => {
  showAll.value = !showAll.value

  // 展开历史时，自动滚到底部
  if (showAll.value) {
    await scrollToBottom()
  }
}

const isAtBottom = () => {
  const el = biddingRef.value
  if (!el) return false
  return el.scrollHeight - el.scrollTop - el.clientHeight < 5
}

watch(
  () => bids.value.length,
  async () => {
    if (isAtBottom()) {
      await scrollToBottom()
    }
  },
)

const getData = async () => {
  const itemId = auction.value.id
  const data = await getBidRecords({ itemId })
  bids.value = data.data
}

const onSubmit = () => {
  if (!auction.value.startTime || !auction.value.endTime) {
    ElMessage.warning('拍卖信息不完整，无法出价')
    return
  }

  const now = nowTime.value
  const start = new Date(auction.value.startTime).getTime()
  const end = new Date(auction.value.endTime).getTime()

  if (now < start) {
    ElMessage.warning('拍卖尚未开始，不能出价')
    return
  }

  if (now > end) {
    ElMessage.warning('拍卖已结束，不能出价')
    return
  }

  // 可以出价
  addBidRecord({
    bidPrice: myPrice.value,
    itemId: auction.value.id,
  }).then(() => {
    ElMessage.success('竞价成功')
  })
}

onMounted(async () => {
  const route = useRoute()
  console.log('id', route.params.auctionId)
  const data = await getAuctionItem({
    id: route.params.auctionId,
  })
  auction.value = data.data
  getData()
  eventSource = new EventSource('http://localhost:8080/bidRecord/subscribe')
  eventSource.addEventListener('bid', (e: MessageEvent) => {
    console.log('eventSource', e)
    const bid = JSON.parse(e.data)
    console.log("bid",bid)
    bids.value.push(bid)
    scrollToBottom()
  })
  console.log('result', data)
  await scrollToBottom()
})

onUnmounted(() => {
  eventSource?.close()
})
</script>

<template>
  <div class="auctionEvent">
    <h2 class="header">拍卖会</h2>
    <div class="message">
      <div class="title">商品名: {{ auction.title }}</div>
      <div class="startPrice">起拍价: {{ auction.startPrice }}</div>
      <div class="descripton">描述: {{ auction.description }}</div>
      <div class="stepPrice">加价: {{ auction.stepPrice }}</div>
      <div class="startTime">开拍时间: {{ auction.startTime }}</div>
      <div class="endTime">结束时间： {{ auction.endTime }}</div>
    </div>
    <div class="container"></div>
    <div class="bidding" ref="biddingRef">
      <div
        v-for="bid in visibleBids"
        :key="bid.id"
        class="bid-item"
        :class="bid.userId === currentUserId ? 'mine' : 'other'"
      >
        <div class="bubble">
          <div class="price">¥ {{ bid.bidPrice }}</div>
        </div>
      </div>

      <div v-if="bids.length > MAX_VISIBLE" class="toggle">
        <el-button type="text" size="small" @click="toggleHistory">
          {{ showAll ? '收起历史竞价' : '查看历史竞价' }}
        </el-button>
      </div>
    </div>
    <div class="auction">
      <el-form :model="myPrice" class="bid-form">
        <el-form-item label="出价" class="full-line">
          <el-input v-model="myPrice" placeholder="请出价" clearable :disabled="!canBid"/>
        </el-form-item>

        <el-form-item class="full-line">
          <el-button type="primary" @click="onSubmit" class="full-btn" :disabled="!canBid"> 拍卖 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.auctionEvent {
  height: 100%;
  width: 80%;
  border: #409eff 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  font-size: 30px;
  margin-bottom: 10px;
}

.message {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bidding {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 500px;
  min-height: 0;
}

.toggle {
  text-align: center;
  margin-top: 8px;
}

.bid-item {
  display: flex;
  margin-bottom: 12px;
}
.bid-item.other {
  justify-content: flex-start;
}

.bid-item.mine {
  justify-content: flex-end;
}
.bubble {
  display: flex;
  flex-direction: row;
}

.auction {
  width: 100%;
  display: flex;
  justify-content: center; /* 整体居中 */
}

.bid-form {
  width: 80%; /* 占父容器一行 */
}

.full-line {
  width: 100%;
}

.full-btn {
  width: 100%; /* 按钮占满一行 */
}
</style>
