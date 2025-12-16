<script setup lang="ts">
import { ref } from 'vue'

const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const auctionItemImage = ref([{

},{

},{

},{

},{

},{

},{

},{

},{

},{

}
])
</script>

<template>
  <div class="auction">
  <div class="header">
    <el-image style="width: 100%; height: 100%" :src="url" :fit="contain" />
  </div>
    <div class="title">
      汽车
    </div>
    <div class="detailed">
      <div class="item">
        <div>起拍价:12</div>
        <div>加价幅度:11</div>
      </div>
      <div class="item">
        <div>开始时间:2025-11-11 11:12</div>
        <div>结束时间:2025-11-11 11:12</div>

      </div>

    </div>
    <div class="description">
      aaaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <el-image v-for="(item,index) in auctionItemImage" :key="index" style="width: 100%;" :src="url" :fit="contain" />

  </div>
</template>

<style scoped>
.auction {
  width: 60%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.header {
  height: 300px;
}
.title {
  text-align: center;
}
.detailed {
  display: flex;
  flex-direction: column;

}
.item {
  display: flex;
  justify-content: start;
  gap: 5px;
}
</style>
