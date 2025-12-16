<script setup lang="ts">

import { ref, reactive } from 'vue'
import User = API.User
import { updateUser } from '@/api/userController'
import { ElMessage } from 'element-plus'

const rules = reactive({
  username: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' },
  ],
  nickname: [
    { required: false, message: '请输入昵称', trigger: 'blur' },
  ],
  schoolId: [
    { required: false, message: '请输入学号', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' },
  ],
  avatar: [
    { required: true, message: '请上传头像', trigger: 'change' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' },
  ],
})

const userForm = ref<InstanceType<typeof ElForm>>();


const emit = defineEmits(['refresh']);
const dialogFormVisible = ref(false)
const user = reactive<User>({});
const openDialog = (row: User) => {
  // userForm.value.resetFields()
  console.log("user",row)
  Object.assign(user, row)


  dialogFormVisible.value = true

};

const onSubmit = () => {
  userForm.value?.validate((valid) => {
    if (valid) {
      updateUser(user)
        .then((res) => {

          ElMessage.success('更新成功')
          emit('refresh')
        })
        .catch((err) => {
          ElMessage.error(err?.message || '更新失败')
        }).finally(() =>{
        dialogFormVisible.value = false
      })
    } else {
      ElMessage.error("表单校验失败")
      return;
    }
  })
}
defineExpose({
  openDialog,
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="" width="700" :show-close="false">
    <el-form :model="user" :rules="rules" ref="userForm">
      <el-form-item label="账户" prop="username">
        <el-input v-model="user.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="user.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学号" prop="schoolId">
        <el-input v-model="user.schoolId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
          <el-select
            v-model="user.role"
            placeholder="请选择"
            size="small"
            style="width: 100%"
            disabled
          >
            <el-option label="管理员" :value="2" />
            <el-option label="普通用户"   :value="1" />
          </el-select>
      </el-form-item>
      <el-form-item prop="avatar" label="头像" >
          <el-image style="width: 100px; height: 100px;" :preview-teleported="true" :preview-src-list="[user.avatar]" :src="user.avatar" fit="fill" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
          <el-select
            v-model="user.status"
            placeholder="请选择"
            size="small"
            style="width: 100%"
          >
            <el-option label="正常" :value="0" />
            <el-option label="禁用"   :value="1" />
          </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>


</style>
