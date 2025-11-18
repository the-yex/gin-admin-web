import request from '@/utils/http'
// 用户相关接口
import qs from 'qs'
// 登录接口
export const login = (params: Api.SystemManage.LoginRequest) => {
    return request.post<Api.SystemManage.LoginData>({ url: '/users/login', data: params })
}

// 退出登录
export const loginOut = () => {
    return request.post<Api.Common.Response>({
        url: '/users/logout'
    })
}

// 刷新token
export const refreshToekn = (params: Api.SystemManage.RefreshTokenRequest) => {
    return request.post<Api.SystemManage.LoginData>({ url: '/user/refresh', data: params })
}

// 用户注册
export const rgisterUser = () => { }

// 获取用户信息
export const getUserProfile = () => {
    return request.get<Api.SystemManage.UserProfile>({
        url: '/users/profile'
    })
}

// 用户列表
export const listUsers = (param: Api.SystemManage.UserSearchParams) => {
    return request.get<Api.SystemManage.UserItem>({
        url: '/users',
        params: param
    })

}

// 用户options
export const getUserOptions = (params?: Api.SystemManage.UpserOptionParams) => {
    return request.get<Api.SystemManage.UserOption>({
        url: 'users/options',
        params: params,
        paramsSerializer: (params) =>
            qs.stringify(params, { indices: false })

    })
}
// 更新用户
export const updateUser = (id: number, data: Partial<Api.SystemManage.UpsertUserRequest>) => {
    return request.put<Api.Common.Response>({
        url: `/users/${id}`,
        data
    })
}

// 创建用户
export const createUser = (data: Partial<Api.SystemManage.UpsertUserRequest>) => {
    return request.post<Api.Common.Response>({
        url: '/users',
        data
    })
}

export const deleteUser = (id: number) => {
    return request.delete<Api.Common.Response>({
        url: `users/${id}`
    })
}