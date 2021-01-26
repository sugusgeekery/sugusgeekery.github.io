import { setLocalStorage, setSessionStorage }  from "@/utils/storage";
import { RootState, LogInfo, UserInfo, Navigation, MyInfo, ChildList } from "./state";

export enum RootMutationTypes {
  UpdateLogInfo = "UpdateLogInfo",
  UpdateUserInfo = "UpdateUserInfo",
  UpdateVerificationCodeNumber = "UpdateVerificationCodeNumber",
  UpdateLoginNavIndex = "UpdateLoginNavIndex",
  // UpdateRegisterWxCode = "UpdateRegisterWxCode",
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
  // 更新注册微信code
  // [RootMutationTypes.UpdateRegisterWxCode](
  //   state: RootState,
  //   registerWxCode: string
  // ) {
  //   state.registerWxCode = registerWxCode;
  // },
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


  // 更新token
  // ["updateAccessToken"](state: RootState, accessToken: string = "") {
  //   if (accessToken) {
  //     state.accessToken = accessToken;
  //     setLocalStorage("accessToken", accessToken);
  //   }
  // },
  // 更新platform
  ["updatePlatform"](state: RootState, platform: string = "") {
    state.platform = platform;
  },

  

  // 更新孩子列表
  ["updateMyInfo"](state: RootState, myInfo: MyInfo) {
    state.myInfo = myInfo;
  },
  // 更新孩子信息
  ["updateChildInfo"](state: RootState, parameter: any) {
    const { childInfo } = state;
    const obj: any = {};
    for (const i in parameter) {
      obj[i] = parameter[i];
    }
    state.childInfo = Object.assign(childInfo, obj);
  },
  // 更新提分训练
  ["updateTrainRecommend"](state: RootState, parameter: any) {
    const { trainRecommend } = state;
    const obj: any = {};
    for (const i in parameter) {
      obj[i] = parameter[i];
    }
    state.trainRecommend = Object.assign(trainRecommend, obj);
  },
  // 更新每周同步训练
  ["updateWeeklySynchronousTrain"](state: RootState, parameter: any) {
    const { weeklySynchronousTrain } = state;
    const obj: any = {};
    for (const i in parameter) {
      obj[i] = parameter[i];
    }
    state.weeklySynchronousTrain = Object.assign(weeklySynchronousTrain, obj);
  },
  // 更新定制冲刺
  ["updateCustomizedSprintPaper"](state: RootState, parameter: any) {
    const { customizedSprintPaper } = state;
    const obj: any = {};
    for (const i in parameter) {
      obj[i] = parameter[i];
    }
    state.customizedSprintPaper = Object.assign(customizedSprintPaper, obj);
  },
  // 更新错题本
  ["updateWrongBook"](state: RootState, parameter: any) {
    const { wrongBook } = state;
    const obj: any = {};
    for (const i in parameter) {
      obj[i] = parameter[i];
    }
    state.wrongBook = Object.assign(wrongBook, obj);
  },
};
