import request from '@/utils/http'
import { AppRouteRecord } from '@/types/router'


// 获取菜单列表
export function fetchGetMenuList() {
  return []
  return request.get<AppRouteRecord[]>({
    url: '/api/v3/system/menus/simple'
  })
}
