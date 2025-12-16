<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'
import type AuctionItem from '@/api/types/AuctionItem'

const props = defineProps<{
  auction: AuctionItem
}>()

const { auction } = toRefs(props)

const router = useRouter()

const find = (id: number) => {
  router.push({
    name: 'auction',
    params: { auctionId: id },
  })
}
</script>


<template>
  <div class="card" @click="find(auction.id)">
    <div class="left">
      <el-image class="my-image" :src="auction.coverImage" fit="fill" />
    </div>
    <div class="right">
      <div class="title">{{auction.title}}</div>
      <div class="price">
        价格: {{auction.startPrice}}
      </div>
      <div class="description">
        {{auction.description}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  display: flex;
  justify-content: start;
  height: 150px;
  padding-bottom: 5px;
}

.left {
  flex: 1;
  min-width:0;
}
.right {
  flex: 2;
  padding: 10px;
  min-width:0;
  display: flex;
  flex-direction: column;
}

.my-image {
  width: 100%;
  height: 100%;
}

.price {
  color: rgb(255, 80, 0);

}
.description {
  flex: 1;               /* 占满剩余高度 */
  overflow: hidden;       /* 超出隐藏 */
  word-break: break-word; /* 遇到长词自动换行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: unset; /* 不固定行数，用 flex 高度控制 */
  text-overflow: ellipsis;
}

</style>
