import request from '@/utils/http'

export const listPermission = () => {
    return request.get<Api.SystemManage.Permission[]>({
        url: '/permissions'
    })
}
