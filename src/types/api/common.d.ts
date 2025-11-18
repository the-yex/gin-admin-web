declare namespace Api.Common {
  interface PaginationParams {
    page: number
    page_size: number
    total: number
  }
  interface Response<T = any> {
    code: number
    message: string
    data: T
  }
  interface Option {
    label: string
    value: any
  }

  type CommonSearchParams = Pick<PaginationParams, 'page' | 'page_size'>

  interface PaginatedResponse<T = any> {
    data: T[]
    page: number
    page_size: number
    total: number
  }

  type EnableStatus = '1' | '2'
}
