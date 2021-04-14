import { setLocalStorage, setSessionStorage }  from "@/utils/storage";
import { RootState, InitInfo, LoginInfo, AccountInfo, Navigation } from "./state";

export enum RootMutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateLoginInfo = "UpdateLoginInfo",
  UpdateAccountInfo = "UpdateAccountInfo",
  UpdateVerificationCodeNumber = "UpdateVerificationCodeNumber",
  UpdateLoginNavIndex = "UpdateLoginNavIndex",
  UpdateRegisterNavIndex = "UpdateRegisterNavIndex",
  UpdateIsCheckProtocol = "UpdateIsCheckProtocol",
  UpdateIsShowProtocol = "UpdateIsShowProtocol",
  UpdateNavigationIndex = "UpdateNavigationIndex",
  UpdateNavigationList = "UpdateNavigationList",
}

export default {
  // 更新初始化通用参数
  [RootMutationTypes.UpdateInitInfo](state: RootState, params: InitInfo) {
    const { initInfo } = state;
    const temp: InitInfo = initInfo;
    (function<T>(state: RootState, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.initInfo = Object.assign({}, initInfo, temp);
    })(state, params, temp);
  },

  // 更新登录信息
  [RootMutationTypes.UpdateLoginInfo](state: RootState, params: LoginInfo) {
    const { loginInfo } = state;
    const { token } = loginInfo || {};
    if (token) {
      setSessionStorage("token", token);
      setLocalStorage("token", token);
    }
    const temp: LoginInfo = loginInfo;
    (function<T>(state: RootState, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.loginInfo = Object.assign({}, loginInfo, temp);
    })(state, params, temp);
  },
  // 更新账号信息
  [RootMutationTypes.UpdateAccountInfo](state: RootState, params: AccountInfo) {
    const { accountInfo } = state;
    const temp: AccountInfo = accountInfo;
    (function<T>(state: RootState, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.accountInfo = Object.assign({}, accountInfo, temp);
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
