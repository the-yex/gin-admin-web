/**
 * 用户状态管理模块
 *
 * 提供用户相关的状态管理
 *
 * ## 主要功能
 *
 * - 用户登录状态管理
 * - 用户信息存储
 * - 访问令牌和刷新令牌管理
 * - 语言设置
 * - 搜索历史记录
 * - 锁屏状态和密码管理
 * - 登出清理逻辑
 *
 * ## 使用场景
 *
 * - 用户登录和认证
 * - 权限验证
 * - 个人信息展示
 * - 多语言切换
 * - 锁屏功能
 * - 搜索历史管理
 *
 * ## 持久化
 *
 * - 使用 localStorage 存储
 * - 存储键：sys-v{version}-user
 * - 登出时自动清理
 *
 * @module store/modules/user
 * @author mortal
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LanguageEnum } from '@/enums/appEnum'
import { router } from '@/router'
import { useSettingStore } from './setting'
import { useWorktabStore } from './worktab'
import { AppRouteRecord } from '@/types/router'
import { setPageTitle } from '@/utils/router'
import { resetRouterState } from '@/router/guards/beforeEach'
import { useMenuStore } from './menu'

/**
 * 用户状态管理
 * 管理用户登录状态、个人信息、语言设置、搜索历史、锁屏状态等
 */
export const useUserStore = defineStore(
  'userStore',
  () => {
    // -------------------------
    // 基础状态
    // -------------------------
    const language = ref(LanguageEnum.ZH)
    const isLogin = ref(false)
    const info = ref<Partial<Api.SystemManage.UserProfile>>({})
    const searchHistory = ref<AppRouteRecord[]>([])
    // -------------------------
    // 安全相关状态
    // -------------------------
    const accessToken = ref('')
    const refreshToken = ref('')
    const isLock = ref(false)
    const lockPassword = ref('')
    // -------------------------
    // 依赖其他 Store（缓存实例）
    // -------------------------
    const settingStore = useSettingStore()
    const worktabStore = useWorktabStore()
    const menuStore = useMenuStore()
    // 计算属性：获取用户信息
    const getUserInfo = computed(() => ({ ...info.value }))
    // 计算属性：获取设置状态
    const getSettingState = computed(() => settingStore.$state)
    // 计算属性：获取工作台状态
    const getWorktabState = computed(() => worktabStore.$state)

    // -------------------------
    // 内部辅助函数
    // -------------------------
    const resetState = () => {
      info.value = {}
      isLogin.value = false
      isLock.value = false
      lockPassword.value = ''
      accessToken.value = ''
      refreshToken.value = ''
      searchHistory.value = []
    }
    /** 清空工作区与菜单状态 */
    const resetWorkEnv = () => {
      worktabStore.opened = []
      sessionStorage.removeItem('iframeRoutes')
      menuStore.setHomePath('')
      resetRouterState()
    }
    // -------------------------
    // Token 管理
    // -------------------------
    const setToken = (newAccessToken: string, newRefreshToken?: string) => {
      accessToken.value = newAccessToken
      if (newRefreshToken) refreshToken.value = newRefreshToken
    }

    const clearToken = () => {
      accessToken.value = ''
      refreshToken.value = ''
    }

    // -------------------------
    // 用户信息与状态操作
    // -------------------------
    const setUserInfo = (newInfo: Api.SystemManage.UserProfile) => {
      info.value = newInfo
    }

    const setLoginStatus = (status: boolean) => {
      isLogin.value = status
    }

    const setLanguage = (lang: LanguageEnum) => {
      language.value = lang
      setPageTitle(router.currentRoute.value)
    }

    const setSearchHistory = (list: AppRouteRecord[]) => {
      searchHistory.value = list
    }
    // -------------------------
    // 锁屏
    // -------------------------
    const setLockStatus = (status: boolean) => {
      isLock.value = status
    }

    const setLockPassword = (password: string) => {
      lockPassword.value = password
    }

    // -------------------------
    // 登出
    // -------------------------
    const logOut = async () => {
      try {
        // 可选调用后端登出接口
        // await api.logout?.()
      } finally {
        resetState()
        resetWorkEnv()
        await router.replace({ name: 'Login' })
      }
    }
    return {
      // 状态
      language,
      isLogin,
      isLock,
      lockPassword,
      info,
      searchHistory,
      accessToken,
      refreshToken,

      // 计算属性
      getUserInfo,
      getSettingState,
      getWorktabState,

      // 操作方法
      setUserInfo,
      setLoginStatus,
      setLanguage,
      setSearchHistory,
      setLockStatus,
      setLockPassword,
      setToken,
      clearToken,
      logOut,
      resetState
    }
  },
  {
    persist: {
      key: 'user',
      storage: localStorage
    }
  }
)
