import request from '@/utils/http'
// 角色相关接口
// 获取角色列表
export const listRoles = (params: Api.SystemManage.RoleSearchParams) => {
    return request.get<Api.SystemManage.RoleItem[]>({
        url: '/roles',
        params: params
    })
}

// 新增角色
export const createRole = (data: Api.SystemManage.UpsertRoleBody) => {
    return request.post({
        url: '/roles',
        data
    })
}

// 编辑角色
export const updateRole = (id: number, data: Partial<Api.SystemManage.UpsertRoleBody>) => {
    return request.put({
        url: `/roles/${id}`,
        data
    })
}

// 角色资源管理
export const assignResources = (rid: number, resources: number[]) => {
    return request.put({
        url: `/roles/${rid}/assign-resource`,
        data: {
            'resource_ids': resources
        }
    })
}

// 删除角色
export const deleteRole = (id: number) => {
    return request.delete({
        url: `/roles/${id}`
    })
}

export const getRoleDetail = (id: number) => {
    return request.get<Api.SystemManage.RoleItem>({
        url: `/roles/${id}`
    })
}