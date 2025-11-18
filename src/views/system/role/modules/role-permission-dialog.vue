<template>
  <ElDialog v-model="visible" title="资源权限管理" width="520px" align-center class="el-dialog-border" @close="handleClose">
    <ElScrollbar height="70vh">
      <ElTree ref="treeRef" :data="processedMenuList" show-checkbox node-key="code" :default-expand-all="isExpandAll"
        :props="defaultProps">
      </ElTree>
    </ElScrollbar>
    <template #footer>

      <ElButton @click="toggleExpandAll">{{ isExpandAll ? '全部收起' : '全部展开' }}</ElButton>
      <ElButton @click="toggleSelectAll" style="margin-left: 8px">{{
        isSelectAll ? '取消全选' : '全部选择'
        }}</ElButton>
      <ElButton type="primary" @click="savePermission">保存</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { formatMenuTitle } from '@/utils/router'
  import { getRoleDetail, assignResources } from '@/api/role'
  import { listPermission } from '@/api/permission'

  type RoleItem = Api.SystemManage.RoleItem
  type Permission = Api.SystemManage.Permission
  interface Props {
    modelValue: boolean
    roleData?: RoleItem
  }

  interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'success'): void
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    roleData: undefined
  })

  const emit = defineEmits<Emits>()
  const treeRef = ref()
  const isExpandAll = ref(true)
  // const isSelectAll = ref(false)
  const permissionList = ref<Permission[]>([])
  /**
   * 弹窗显示状态双向绑定
   */
  const visible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  /**
   * 菜单节点类型
   */
  interface MenuNode {
    id: number   // 选中的资源ID用来绑定资源的
    label: string  // ui显示的label
    code: string
    children?: MenuNode[]
    [key: string]: any
  }

  /**
   * 处理菜单数据，将 permission 列表 转换为树形子节点
   * 递归处理菜单树，将权限列表展开为可选择的子节点
   */
  const processedMenuList = computed(() => {
    const processNode = (permission: Permission): MenuNode => {
      // 权限节点
      const permNode: MenuNode = {
        id: permission.id,
        label: permission.name,
        code: `${permission.id}_${permission.code}`,
        children: [],
      }

      // 资源节点
      if (permission.resources?.length) {
        permNode.children = permission.resources.map((res) => ({
          id: res.id,
          label: res.description,
          code: `${res.id}_${res.code}`,
        }))
      }

      return permNode
    }
    return (permissionList.value as Permission[]).map(processNode)
  })

  /**
   * 树形组件配置
   */
  const defaultProps = {
    children: 'children',
    label: (data: any) => formatMenuTitle(data.meta?.title) || data.label || ''
  }

  /**
   * 监听弹窗打开，初始化权限数据
   */
  watch(
    () => [props.modelValue],
    async ([newVal]) => {
      if (!newVal || !props.roleData) return

      const [roleDetail, permissions] = await Promise.all([
        getRoleDetail(props.roleData.id),
        listPermission()
      ])
      permissionList.value = permissions
      nextTick(() => {
        treeRef.value?.setCheckedKeys(roleDetail.resources!.map((res) => `${ res.id }_${ res.code }`) ?? [])
      })
    }
  )
  /**
   * 关闭弹窗并清空选中状态
   */
  const handleClose = () => {
    visible.value = false
    treeRef.value?.setCheckedKeys([])
  }
  /**
   * 保存权限配置
   */
  const savePermission = async () => {
    const tree = treeRef.value
    if (!tree) return
    const nodes = tree.getCheckedNodes().filter((node: MenuNode) => !node.children?.length)
    const resourceIds = nodes.map((res: Permission) => res.id)
    await assignResources(props.roleData!.id, resourceIds)
    ElMessage.success('权限保存成功')
    emit('success')
    handleClose()
  }

  /**
   * 切换全部展开/收起状态
   */
  const toggleExpandAll = () => {
    const tree = treeRef.value
    if (!tree) return

    const nodes = tree.store.nodesMap
    // 这里保留 any，因为 Element Plus 的内部节点类型较复杂
    Object.values(nodes).forEach((node: any) => {
      node.expanded = !isExpandAll.value
    })

    isExpandAll.value = !isExpandAll.value
  }

  /**
   * 切换全选/取消全选状态
   */
  const allKeys = computed(() => getAllNodeKeys(processedMenuList.value))

  const toggleSelectAll = () => {
    const tree = treeRef.value
    if (!tree) return
    tree.setCheckedKeys(isSelectAll.value ? [] : allKeys.value)
  }

  /**
   * 递归获取所有节点的 key
   * @param nodes 节点列表
   * @returns 所有节点的 key 数组
   */
  const getAllNodeKeys = (nodes: MenuNode[]): string[] => {
    const keys: string[] = []
    const traverse = (nodeList: MenuNode[]): void => {
      nodeList.forEach((node) => {
        if (node.code) keys.push(node.code)
        if (node.children?.length) traverse(node.children)
      })
    }
    traverse(nodes)
    return keys
  }

  /**
   * 处理树节点选中状态变化
   * 同步更新全选按钮状态
   */
  const isSelectAll = computed(() => {
    const tree = treeRef.value
    if (!tree) return false

    const checkedKeys = tree.getCheckedKeys() ?? []
    const allKeys = getAllNodeKeys(processedMenuList.value)

    return checkedKeys.length === allKeys.length && allKeys.length > 0
  })

</script>
