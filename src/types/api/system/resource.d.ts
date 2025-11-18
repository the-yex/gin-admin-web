declare namespace Api.SystemManage {
    enum HttpMethod {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE',
        PATCH = 'PATCH'
    }
    interface Resource {
        id: number
        path: string
        method: HttpMethod
        code: string
        description: string
    }
    interface Permission {
        id: number
        name: string
        code: string
        resources: Resource[]
    }
    type PermissionList = Api.Common.Response<Permission[]>

}
