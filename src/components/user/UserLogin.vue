<template>
  <div class="login">
    <div class="header">登录</div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      status-icon
      style="max-width: 600px; width: 100%"
    >
      <el-form-item label="账户" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" />
      </el-form-item>

      <!-- 注册按钮靠右 -->
      <el-form-item style="display: flex; justify-content: flex-end; margin-bottom: 0">
        <el-button type="text" @click="$router.push('/user/register')">没注册，注册</el-button>
      </el-form-item>

      <!-- 登录/重置按钮左右撑满 -->
      <el-form-item class="bottom">
        <el-button
          type="primary"
          style="flex: 1; margin-right: 10px"
          @click="submitForm(ruleFormRef)"
        >
          登录
        </el-button>
        <el-button style="flex: 1" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { loginUser } from '@/api/userController'

const router = useRouter()

const userStore = useUserStore()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在3到5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在6到10', trigger: 'blur' },
  ],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (!valid) {
      return ElMessage.error('表单验证失败')
    }

    // 调用登录接口
    loginUser({ ...ruleForm })
      .then((res) => {
        const result = res.data

        ElMessage.success('登录成功')
        console.log("user",result)
        userStore.setUser(result)

        // 判断角色
        if (userStore.isAdmin) {
          return router.push('/admin/dashboard')
        }

        router.push('/')
      })
      .catch((err) => {
        console.error('登录失败', err)
        ElMessage.error(`登录失败: ${err.response?.data?.message || '未知错误'}`)
      })
  })
}


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.login {
  width: 50%;
  max-width: 600px;
  min-width: 300px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow:
    0px 22px 15px -3px rgba(0, 0, 0, 0.1),
    15px 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.bottom {
  width: 100%;
  display: flex;
  gap: 10px;
}
</style>
