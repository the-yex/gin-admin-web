<!-- 用户管理页面 -->
<!-- art-full-height 自动计算出页面剩余高度 -->
<!-- art-table-card 一个符合系统样式的 class，同时自动撑满剩余高度 -->
<!-- 更多 useTable 使用示例请移步至 功能示例 下面的 高级表格示例或者查看官方文档 -->
<!-- useTable 文档：https://www.artd.pro/docs/zh/guide/hooks/use-table.html -->
<template>
  <div class="user-page art-full-height">
    <!-- 搜索栏 -->
    <UserSearch v-model="searchForm" v-if="hasAuth('user:manage:list')" @search="handleSearch"
      @reset="resetSearchParams"></UserSearch>

    <ElCard class="art-table-card" shadow="never">
      <!-- 表格头部 -->
      <ArtTableHeader v-model:columns="columnChecks" :loading="loading" @refresh="refreshData">
        <template #left>
          <ElSpace wrap>
            <ElButton v-if="hasAuth('user:manage:add')" @click="showDialog('add')" v-ripple>新增用户</ElButton>
          </ElSpace>
        </template>
      </ArtTableHeader>

      <!-- 表格 -->
      <ArtTable :loading="loading" :data="data" :columns="columns" :pagination="pagination"
        @selection-change="handleSelectionChange" @pagination:size-change="handleSizeChange"
        @pagination:current-change="handleCurrentChange">
      </ArtTable>

      <!-- 用户弹窗 -->
      <UserDialog v-model:visible="dialogVisible" :type="dialogType" :user-data="currentUserData"
        @submit="handleDialogSubmit" />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import ArtButtonTable from '@/components/core/forms/art-button-table/index.vue'
  import { ACCOUNT_TABLE_DATA } from '@/mock/temp/formData'
  import { useTable } from '@/hooks/core/useTable'
  import { listUsers, deleteUser } from '@/api/user'
  import UserSearch from './modules/user-search.vue'
  import UserDialog from './modules/user-dialog.vue'
  import { ElTag, ElMessageBox, ElImage } from 'element-plus'
  import { useAuth } from '@/hooks/core/useAuth'
  import { DialogType } from '@/types'
  defineOptions({ name: 'User' })
  const { hasAuth } = useAuth()
  type UserListItem = Api.SystemManage.UserItem
  // 弹窗相关
  const dialogType = ref<DialogType>('add')
  const dialogVisible = ref(false)
  const currentUserData = ref<Partial<UserListItem>>({})

  // 选中行
  const selectedRows = ref<UserListItem[]>([])

  // 搜索表单
  const searchForm = ref({
    name: undefined,
    eamil: undefined,
    status: 1
  })

  // 用户状态配置
  const USER_STATUS_CONFIG = {
    1: { type: 'success' as const, text: '正常' },
    2: { type: 'info' as const, text: '禁止登录' },
    3: { type: 'warning' as const, text: '锁定' },
  } as const
  /**
   * 获取用户状态配置
   */
  const getUserStatusConfig = (status: Api.SystemManage.UserStatus) => {
    return (
      USER_STATUS_CONFIG[status as keyof typeof USER_STATUS_CONFIG] || {
        type: 'info' as const,
        text: '未知'
      }
    )
  }
  const USER_GENDER_CONFIG = {
    1: { type: 'success' as const, text: '男' },
    2: { type: 'warning' as const, text: '女' },
  } as const
  const getUserGenderConfig = (gender: number) => {
    return (
      USER_GENDER_CONFIG[gender as keyof typeof USER_GENDER_CONFIG] || {
        type: 'info' as const,
        text: '未知'
      }
    )
  }
  const {
    columns,
    columnChecks,
    data,
    loading,
    pagination,
    getData,
    searchParams,
    resetSearchParams,
    handleSizeChange,
    handleCurrentChange,
    refreshData
  } = useTable({
    // 核心配置
    core: {
      apiFn: listUsers,
      apiParams: {
        page: 1,
        page_size: 20,
        ...searchForm.value
      },
      columnsFactory: () => [
        { type: 'selection' }, // 勾选列
        { prop: 'id', width: 60, label: '序号' },
        {
          prop: 'userInfo',
          label: '用户名',
          width: 280,
          formatter: (row: UserListItem) => {
            return h('div', { class: 'user flex-c' }, [
              h(ElImage, {
                class: 'size-9.5 rounded-md',
                src: row.avatar,
                previewSrcList: [row.avatar],
                // 图片预览是否插入至 body 元素上，用于解决表格内部图片预览样式异常
                previewTeleported: true
              }),
              h('div', { class: 'ml-2' }, [
                h('p', { class: 'username flex-c' }, [
                  row.username,
                  row.built_in
                    ? h(ElTag, {
                      type: 'warning',
                      size: 'small',
                      class: 'ml-1'
                    }, () => '系统用户')
                    : null
                ]),
                h('p', { class: 'email' }, row.email)
              ])
            ])
          }
        },
        {
          prop: 'roles',
          label: '角色',
          formatter: (row: UserListItem) => {
            const roles = row.roles || []
            const tags = roles.length
              ? roles.map(r =>
                h(ElTag, { type: 'success', size: 'small' }, () => r.name)
              )
              : [h('span', { class: 'text-gray-400' }, () => '')]
            return h('div', { class: 'flex flex-wrap gap-1 min-h-[24px]' }, tags)
          }
        },
        {
          prop: 'gender',
          label: '性别',
          formatter: (row: UserListItem) => {
            const statusConfig = getUserGenderConfig(row.gender)
            return h(ElTag, { type: statusConfig.type }, () => statusConfig.text)
          }
        },
        {
          prop: 'status',
          label: '状态',
          formatter: (row: UserListItem) => {
            const statusConfig = getUserStatusConfig(row.status)
            return h(ElTag, { type: statusConfig.type }, () => statusConfig.text)
          }
        },
        {
          prop: 'created_at',
          label: '创建日期',
          sortable: true,
          formatter: (row: UserListItem) => {
            return row.created_at ? new Date(row.created_at).toLocaleString() : ''
          }
        },
        {
          prop: 'operation',
          label: '操作',
          width: 120,
          fixed: 'right',
          formatter: (row: UserListItem) =>
            h('div', [
              h(ArtButtonTable, {
                type: 'edit',
                auth: 'user:manage:update',
                disabled: row.built_in === true,
                onClick: () => {
                  if (!row.built_in) showDialog('edit', row)
                }
              }),
              h(ArtButtonTable, {
                type: 'delete',
                auth: 'user:manage:delete',
                disabled: row.built_in === true,
                onClick: () => handleDelete(row)
              })
            ])
        }
      ]
    },
    // 数据处理
    transform: {
      // 数据转换器 - 替换头像
      dataTransformer: (records) => {
        // 类型守卫检查
        if (!Array.isArray(records)) {
          console.warn('数据转换器: 期望数组类型，实际收到:', typeof records)
          return []
        }

        // 使用本地头像替换接口返回的头像
        return records.map((item: UserListItem, index: number) => {
          return {
            ...item,
            avatar: ACCOUNT_TABLE_DATA[index % ACCOUNT_TABLE_DATA.length].avatar
          }
        })
      }
    }
  })

  /**
   * 搜索处理
   * @param params 参数
   */
  const handleSearch = (params: Record<string, any>) => {
    console.log(params)
    // 搜索参数赋值
    Object.assign(searchParams, params)
    getData()
  }

  /**
   * 显示用户弹窗
   */
  const showDialog = (type: DialogType, row?: UserListItem): void => {
    console.log('打开弹窗:', { type, row })
    dialogType.value = type
    currentUserData.value = row || {}
    nextTick(() => {
      dialogVisible.value = true
    })
  }

  /**
   * 删除用户
   */
  const handleDelete = async (row: UserListItem): Promise<void> => {
    if (row.built_in) return
    await ElMessageBox.confirm('确定要注销该用户吗？', '注销用户', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    })
    await deleteUser(row.id)
    await refreshData()
    ElMessage.success('注销成功')
  }
  /**
   * 处理弹窗提交事件
   */
  const handleDialogSubmit = async () => {
    try {

      dialogVisible.value = false
      currentUserData.value = {}
      await refreshData()
    } catch (error) {
      console.error('提交失败:', error)
    }
  }

  /**
   * 处理表格行选择变化
   */
  const handleSelectionChange = (selection: UserListItem[]): void => {
    selectedRows.value = selection
    console.log('选中行数据:', selectedRows.value)
  }
</script>
