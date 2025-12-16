<template>
  <div class="login">
    <div class="header">注册</div>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px; width: 100%"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-width="100px"
    >
      <el-form-item label="账户" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" />
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" />
      </el-form-item>

      <!-- 注册链接靠右 -->
      <el-form-item style="display: flex; justify-content: flex-end; margin-bottom: 0">
        <el-button type="text" @click="$router.push('/user/login')">已有账号？登录</el-button>
      </el-form-item>

      <!-- 登录和重置按钮左右撑满 -->
      <el-form-item class="bottom">
        <el-button
          type="primary"
          style="flex: 1; margin-right: 10px"
          @click="submitForm(ruleFormRef)"
        >
          注册
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
import { registerUser } from '@/api/userController'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  password: '',
  checkPassword: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3到10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在3到10', trigger: 'blur' },
  ],
  checkPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('注册成功', ruleForm)
      // 这里可以调用注册接口
      registerUser({
          ...ruleForm
      })
        .then((res) => {
          console.log('注册成功', res)
          const result = res.data
          if (result?.code === 500) {
            ElMessage({
              message: result.message,
              type: 'error',
            })
            return
          }
          ElMessage({
            message: result.message,
            type: 'success',
          })
          setTimeout(() => {
            router.push('/user/login')
          }, 500)
        })
        .catch((err) => {
          console.error('注册失败', err)
          ElMessage({
            message: `注册失败,${err.data.message}`,
            type: 'error',
          })
        })
    } else {
      console.log('表单验证失败')
    }
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
