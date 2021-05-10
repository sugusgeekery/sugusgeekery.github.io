
import { RootState } from "./state";
import rootGetters, { RootGetterTypes } from "./getters";
import { RootMutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";

import { INTERFACE_ERROR_TEXT, VERIFICATION_CODE_NUMBER } from "@/config";
import { _url2xml2file } from "@/utils/util";

import {
  GetVerificationCode,
  VerificationCodeLogin,
  WechatLogin,
  PhoneLogin,
  Register,
  GetAccountInfo,
  Logout
} from "@/api";

interface Store {
  state: RootState;
  getters: GetterTree<RootState, RootState>;
  commit: Commit;
  dispatch: Dispatch;
}

export enum RootActionTypes {
  Init = "Init",
  GetVerificationCode = "GetVerificationCode",
  UpdateVerificationCodeNumber = "UpdateVerificationCodeNumber",
  VerificationCodelogin = "VerificationCodelogin",
  WechatLogin = "WechatLogin",
  PhoneLogin = "PhoneLogin",
  Register = "Register",
  GetAccountInfo = "GetAccountInfo",
  UpdateNavigationIndex = "UpdateNavigationIndex",
  Logout = "Logout"
}

export default {
  // 初始化模块默认值
  [RootActionTypes.Init](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    commit(RootMutationTypes.UpdateInitInfo, { ...(params || {}) });
  },

  // 获取验证码
  async [RootActionTypes.GetVerificationCode](store: Store, parameter: any = {}) {
    try {
      const { dispatch } = store;
      const { phone = "", type = 0 } = parameter || {};
      if (!phone) {
        Message("请输入手机号");
        return
      }
      const { success, message }: any = await GetVerificationCode({ phone, type });
      if (success) {
        Message.success(message);
        dispatch(RootActionTypes.UpdateVerificationCodeNumber);
      } else {
        Message(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新验证码倒计时状态
  [RootActionTypes.UpdateVerificationCodeNumber](store: Store) {
    const { commit } = store;
    let verificationCodeNumber = VERIFICATION_CODE_NUMBER;
    const s = setInterval(() => {
      if (verificationCodeNumber) {
        verificationCodeNumber--;
        commit(RootMutationTypes.UpdateVerificationCodeNumber, verificationCodeNumber);
      } else {
        clearInterval(s);
      }
    }, 1000);
  },

  // 验证码登陆
  async [RootActionTypes.VerificationCodelogin](store: Store, parameter: { phone: string; code: string; }) {
    try {
      const { dispatch, commit } = store;
      const { success, message, data }: any = await VerificationCodeLogin(parameter);
      if (success) {
        const { token } = data || {};
        commit(RootMutationTypes.UpdateLoginInfo, { token });
        dispatch(RootActionTypes.GetAccountInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 手机号直接登陆（方便开发测试人员调试用的）
  async [RootActionTypes.PhoneLogin](store: Store, parameter: { phoneNo: string; }) {
    try {
      const { dispatch, commit } = store;
      const { success, message, data }: any = await PhoneLogin(parameter);
      if (success) {
        const { token } = data || {};
        commit(RootMutationTypes.UpdateLoginInfo, { token });
        dispatch(RootActionTypes.GetAccountInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 微信扫码登陆或者去注册
  async [RootActionTypes.WechatLogin](store: Store, parameter: { jsCode: string; }) {
    try {
      const { dispatch, commit } = store;
      const { success, message, data }: any = await WechatLogin(parameter);
      if (success) {
        const { accessToken = "", exist = false, openId = "", supplierInfo, token } = data || {};
        commit(RootMutationTypes.UpdateLoginInfo, { accessToken, exist, openId, supplierInfo, token });
        if (!exist) {
          if (openId) {
            commit(RootMutationTypes.UpdateRegisterNavIndex, 1);
            router.push("/register");
          } else {
            Message.error("请扫码重试！");
          }
        } else {
          dispatch(RootActionTypes.GetAccountInfo);
        }
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 注册
  async [RootActionTypes.Register](store: Store, parameter: { companyName: string; userName: string; phone: string; code: string; }) {
    try {
      const { state, dispatch, commit } = store;
      const { loginInfo } = state;
      const { accessToken, openId } = loginInfo || {};
      const { success, message, data }: any = await Register({ ...parameter, accessToken, openId });
      if (success) {
        const { exist, supplierInfo, token } = data || {};
        commit(RootMutationTypes.UpdateLoginInfo, { exist, supplierInfo, token, isFirstExist: true });
        dispatch(RootActionTypes.GetAccountInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取账号信息
  async [RootActionTypes.GetAccountInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { loginInfo } = state;
      const { isFirstExist } = loginInfo || {};
      const { success, message, data }: any = await GetAccountInfo({});
      if (success) {
        const { openId } = data || {};
        commit(RootMutationTypes.UpdateAccountInfo, { ...(data || {}) });
        if (!openId) {
          Message.error("请先关注微信公众号！");
          return;
        }
        if (!isFirstExist) {
          router.push("/home");
        } else {
          commit(RootMutationTypes.UpdateRegisterNavIndex, 2);
        }
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 退出登录
  async [RootActionTypes.Logout](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await Logout();
      if (success) {
        commit(RootMutationTypes.UpdateLoginInfo, { accessToken: "", exist: "", openId: "", supplierInfo: {}, token: "", isFirstExist: false });
        commit(RootMutationTypes.UpdateAccountInfo, {});
        router.push("/login");
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 导航跳转
  [RootActionTypes.UpdateNavigationIndex](store: Store, parameter: { navigationIndex: number; itemIndex: number; }) {
    const { state, dispatch, commit } = store;
    const { navigationIndex = -1, itemIndex = -1 } = parameter || {};
    const { navigationList = [] } = state;
    const { itemList = [] } = navigationList[navigationIndex] || {};
    if (itemList.length > 0) {
      const { path, query } = itemList[itemIndex] || {};
      commit(RootMutationTypes.UpdateNavigationIndex, navigationIndex);
      navigationList[navigationIndex].itemIndex = itemIndex;
      commit(RootMutationTypes.UpdateNavigationList, navigationList);
      router.push({ path, query });
    } else {
      const { path, query } = navigationList[navigationIndex] || {};
      commit(RootMutationTypes.UpdateNavigationIndex, navigationIndex);
      router.push({ path, query });
    }
  },
};
