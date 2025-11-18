declare namespace Api.Auth {
  interface LoginParams {
    userName: string
    password: string
  }

  interface LoginResponse {
    token: string
    refreshToken: string
  }

  interface UserInfo {
    roles: string[]
    userId: number
    userName: string
    email: string
    avatar?: string
  }
}
