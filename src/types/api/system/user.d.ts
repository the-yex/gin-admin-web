declare namespace Api.SystemManage {
  export enum UserStatus {
    Active = 1,    // 启用：允许登录
    Disabled = 2,  // 禁用：禁止登录
    Locked = 3     // 锁定：异常登录或安全封禁
  }

  interface UserItem {
    id: number
    username: string
    email: string
    gender: number // 1- 男 2-女
    status: UserStatus
    avatar: string
    built_in: boolean
    roles: Array<Api.SystemManage.RoleItem>
    created_at: Date
    updated_at: Date
  }
  interface UserProfile {
    permissions: Array<Api.SystemManage.Permission>
    user: UserItem
  }

  type UserSearchParams = Partial<
    Pick<UserItem, 'name' | 'email' | 'status'> &
    Api.Common.CommonSearchParams
  >
  interface LoginRequest {
    account: string
    password: string
  }

  interface LoginData {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
  }

  interface RefreshTokenRequest {
    refresh_token: string
  }
  interface UpserOptionParams {
    include_fields: ?string[]
  }

  interface UserOption {
    gender: Api.Common.Option[]
    status: Api.Common.Option[]
    supplement_options: Record<string, Api.Common.Option[]>
  }

  interface UpsertUserRequest {
    username: string
    email: string
    gender: number
    roles: number[]
  }
}
