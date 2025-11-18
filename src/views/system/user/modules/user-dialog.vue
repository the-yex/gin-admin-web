<template>
  <ElDialog v-model="dialogVisible" :title="dialogType === 'add' ? '添加用户' : '编辑用户'" width="30%" align-center>
    <ElForm ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <ElFormItem label="用户名" prop="username">
        <ElInput v-model="formData.username" placeholder="请输入用户名" />
      </ElFormItem>
      <ElFormItem label="邮箱" prop="email">
        <ElInput v-model="formData.email" placeholder="请输入邮箱" />
      </ElFormItem>
      <ElFormItem label="性别" prop="gender">
        <ElSelect v-model="formData.gender">
          <ElOption v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="角色" prop="role">
        <ElSelect v-model="formData.roles" multiple>
          <ElOption v-for="role in roleOptions" :key="role.value" :value="role.value" :label="role.label" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="handleSubmit">提交</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  import { getUserOptions, createUser, updateUser } from '@/api/user'
  interface Props {
    visible: boolean
    type: string
    userData?: Partial<Api.SystemManage.UserItem>
  }

  interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'submit'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  // type RoleList = Array<Api.SystemManage.RoleItem>
  // 角色列表数据
  const roleOptions = ref<Api.Common.Option[]>([])
  const genderOptions = ref<Api.Common.Option[]>([])
  // 对话框显示控制
  const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })

  const dialogType = computed(() => props.type)

  // 表单实例
  const formRef = ref<FormInstance>()

  // 表单数据
  const formData = reactive<Partial<Api.SystemManage.UpsertUserRequest>>({
    username: '',
    email: '',
    gender: 1,
    roles: [] as number[]
  })

  // 表单验证规则
  const rules: FormRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
    role: [{ required: false, message: '请选择角色', trigger: 'blur' }]
  }
  /**
   * 初始化表单数据
   * 根据对话框类型（新增/编辑）填充表单
   */
  const initFormData = () => {
    const isEdit = props.type === 'edit' && props.userData
    const row = props.userData
    Object.assign(formData, {
      username: isEdit && row ? row.username || '' : '',
      email: isEdit && row ? row.email || '' : '',
      gender: isEdit && row ? row.gender || 1 : 1,
      roles: isEdit && row && Array.isArray(row.roles)
        ? row.roles.map(r => r.id)
        : []
    })

  }

  /**
   * 监听对话框状态变化
   * 当对话框打开时初始化表单数据并清除验证状态
   */
  watch(
    () => [props.visible, props.type, props.userData],
    async ([visible]) => {
      if (visible) {
        const options = await getUserOptions({ include_fields: ['role'] })
        roleOptions.value = options.supplement_options['role'] || []
        console.log(roleOptions.value)
        genderOptions.value = options.gender || []
        initFormData()
        nextTick(() => {
          formRef.value?.clearValidate()
        })
      }
    },
    { immediate: true }
  )

  /**
   * 提交表单
   * 验证通过后触发提交事件
   */
  const handleSubmit = async () => {
    if (!formRef.value) return

    try {
      await formRef.value.validate() // Promise 形式
      if (dialogType.value === 'add') {
        await createUser(formData)
        ElMessage.success('添加成功')
      } else if (props.userData?.id) {
        await updateUser(props.userData.id, formData)
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('用户信息缺失，无法更新')
        return
      }
      dialogVisible.value = false
      emit('submit')
    } catch (err) {
      // validate 不通过会进入这里
      console.log('表单验证未通过', err)
    }
  }
</script>
