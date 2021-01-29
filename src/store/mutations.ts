import { setLocalStorage, setSessionStorage }  from "@/utils/storage";
import { RootState, LogInfo, UserInfo, Navigation } from "./state";

export enum RootMutationTypes {
  UpdateLogInfo = "UpdateLogInfo",
  UpdateUserInfo = "UpdateUserInfo",
  UpdateVerificationCodeNumber = "UpdateVerificationCodeNumber",
  UpdateLoginNavIndex = "UpdateLoginNavIndex",
  UpdateRegisterNavIndex = "UpdateRegisterNavIndex",
  UpdateIsCheckProtocol = "UpdateIsCheckProtocol",
  UpdateIsShowProtocol = "UpdateIsShowProtocol",
  UpdateNavigationIndex = "UpdateNavigationIndex",
  UpdateNavigationList = "UpdateNavigationList",
}

export default {
  // 更新登录信息
  [RootMutationTypes.UpdateLogInfo](state: RootState, params: LogInfo) {
    const { logInfo } = state;
    const { accessToken } = logInfo || {};
    if (accessToken) {
      setSessionStorage("accessToken", accessToken);
      setLocalStorage("accessToken", accessToken);
    }
    const temp: LogInfo = logInfo;
    (function<T>(state: RootState, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.logInfo = Object.assign(logInfo, temp);
    })(state, params, temp);
  },
  // 更新用户信息
  [RootMutationTypes.UpdateUserInfo](state: RootState, params: UserInfo) {
    const { userInfo } = state;
    const temp: UserInfo = userInfo;
    (function<T>(state: RootState, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.userInfo = Object.assign(userInfo, temp);
    })(state, params, temp);
  },
  // 更新验证码倒计时状态
  [RootMutationTypes.UpdateVerificationCodeNumber](
    state: RootState,
    verificationCodeNumber: number
  ) {
    state.verificationCodeNumber = verificationCodeNumber;
  },
  // 更新登录导航切换
  [RootMutationTypes.UpdateLoginNavIndex](
    state: RootState,
    loginNavIndex: number
  ) {
    state.loginNavIndex = loginNavIndex;
  },
  // 更新注册导航切换
  [RootMutationTypes.UpdateRegisterNavIndex](
    state: RootState,
    registerNavIndex: number
  ) {
    state.registerNavIndex = registerNavIndex;
  },
  // 更新是否选择协议
  [RootMutationTypes.UpdateIsCheckProtocol](
    state: RootState,
    isCheckProtocol: boolean
  ) {
    state.isCheckProtocol = isCheckProtocol;
  },
  // 更新是否查看协议
  [RootMutationTypes.UpdateIsShowProtocol](
    state: RootState,
    isShowProtocol: boolean
  ) {
    state.isShowProtocol = isShowProtocol;
  },

  // 更新导航下标
  [RootMutationTypes.UpdateNavigationIndex](
    state: RootState,
    navigationIndex: number
  ) {
    state.navigationIndex = navigationIndex;
  },
  // 更新导航列表
  [RootMutationTypes.UpdateNavigationList](
    state: RootState,
    navigationList: Navigation[]
  ) {
    state.navigationList = navigationList;
  },
};
