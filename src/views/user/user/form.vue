<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import User = API.User
import { updateUser } from '@/api/userController'

const userForm = ref<InstanceType<typeof ElForm>>()
const user = reactive<User>(getEmptyUser());
function getEmptyUser(): User {
  return {
    id: undefined,
    username: '',
    password: '',
    nickname: '',
    schoolId: '',
    role: undefined,
    avatar: '',
    status: 1,
    createTime: '',
    updateTime: '',
    delFlag: 0
  }
}

const rules = reactive({
  username: [{ required: true, message: '请输入账户', trigger: 'blur' }],
  password: [{ required: true, min:6, message: '请输入密码', trigger: 'blur' }],
  avatar: [{ required: true, message: '请选择头像', trigger: 'blur' }],
})


const emit = defineEmits(['refresh'])

const dialogFormVisible = ref(false)

const openDialog = async (row: User) => {
  resert()
  userForm.value?.clearValidate()


    console.log('user', row)
    Object.assign(user, row)
  user.password = ''
  dialogFormVisible.value = true
}

const onSubmit = () => {
  userForm.value?.validate((valid) => {
    if (valid) {
        updateUser(
          {id: auction.id},
          auction
        ).then(() => {
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
  userForm.value?.resetFields()
  Object.assign(user, getEmptyUser())
}

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog  v-model="dialogFormVisible" title="" width="700" :show-close="false">
    <el-form :model="user" :rules="rules" ref="userForm">
      <el-form-item label="头像" prop="avatar">
        <el-image
          style="width: 100px; height: 100px"
          :preview-teleported="true"
          :preview-src-list="[user.avatar]"
          :src="user.avatar"
          :fit="fit"
        />
      </el-form-item>
      <el-form-item label="账户" prop="username">
        <el-input v-model="user.username" placeholder="请输入账户" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" placeholder="请输入密码" clearable />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="user.nickname"  placeholder="请输入昵称" clearable />
      </el-form-item>
      <el-form-item label="学号" prop="schoolId">
        <el-input v-model="user.schoolId" placeholder="请输入学号" clearable />
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
