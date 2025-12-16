<script setup lang="ts">
import Card from '@/components/Card.vue'
import { onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getPage } from '@/api/auctionItemController'
import AuctionItem = API.AuctionItem

const query = reactive({
  current: 1,
  size: 10,
  total: null,
  title: null
})
const select = ref('')

const data = ref<AuctionItem[]>([])
 const getData = async ()=> {
  const res = await getPage({
    ...query,
    page: query.current
  });
   query.current = res.data.current
   query.size = res.data.size
   query.total = res.data.total
   data.value.push(...res.data.records)
}
onMounted(async () => {
  getData()
})
const loadMore = () => {
  console.log('加载更多')
  query.current += 1
  getData()
}

</script>


<template>
  <div class="home">
    <div class="title">CampusAuction</div>

    <div class="search">
      <el-input v-model="query.title">
        <template #prepend>
          <el-select v-model="select" style="width: 115px">
            <el-option label="Restaurant" value="1" />
            <el-option label="Order No." value="2" />
            <el-option label="Tel" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="getData"/>
        </template>
      </el-input>
    </div>

    <!-- ⭐ 核心 -->
    <el-scrollbar
      class="scroll"
      @end-reached="loadMore"
    >
      <Card
        v-for="(item, index) in data"
        :key="index"
        :auction="item"
      />
    </el-scrollbar>
  </div>
</template>


<style scoped>
.home {
  width: 60%;
  margin: auto;
  height: 100vh; /* 必须有高度 */
  display: flex;
  flex-direction: column;
}

.search {
  padding-bottom: 20px;
}

.scroll {
  flex: 1;              /* 占满剩余高度 */
  overflow: hidden;     /* 交给 el-scrollbar 管 */
}

/* 如果你不想要右侧滚动条 */
:deep(.el-scrollbar__bar.is-vertical) {
  display: none;
}
:deep(.el-scrollbar__wrap) {
  margin-right: 0;
}
</style>

