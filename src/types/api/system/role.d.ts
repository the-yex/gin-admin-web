declare namespace Api.SystemManage {

  interface RoleItem {
    id: number
    name: string
    status: number
    description: string
    resources?: Api.SystemManage.Resource[]
    created_at: Date | null
    updated_at: Date | null
    built_in: boolean
  }

  type RoleSearchParams = Partial<
    Pick<RoleItem, 'name' | 'status' | 'description'> &
    Api.Common.CommonSearchParams
  >

  type UpsertRoleBody = Pick<
    RoleItem,
    'name' | 'description' | 'status'
  >
  
}
