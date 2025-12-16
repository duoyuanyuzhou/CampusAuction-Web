<script setup lang="ts">
import { House, Message, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const { isLogin, user } = storeToRefs(userStore)
const searchValue = ref('')
console.log('isLogin', isLogin)
const router = useRouter()

const logout = () => {
  userStore.clearUser()
  router.push('/')
}

const goHome = () => {
  router.push("/user/dashboard")
}
</script>

<template>
  <div class="navBar">
    <div class="left" @click="goHome">CampusAuction</div>

    <div class="right" v-if="isLogin">
      <div class="message" >
        <el-icon><Message /></el-icon>
      </div>
      <div class="home" @click="goHome">
        <el-icon><House /></el-icon>
      </div>
      <div class="user" @click="logout">
        <img
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          alt="图片描述"
        />
        <text>chen</text>
      </div>
    </div>
    <div class="right" v-else>
      <router-link to="/user/login">
        <el-button>登录</el-button>
      </router-link>

      <router-link to="/user/register">
        <el-button>注册</el-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.navBar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #ffffff;
  border-bottom: 2px solid #cdd0d6;
}

.left {
  flex: 1;
}

.center {
  flex: 2;
}

.right {
  flex: 1;
  display: flex;
  justify-content: end;
  gap: 15px;
}

.message {
  font-size: 20px;
}
.home {
  font-size: 20px;
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.user > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
