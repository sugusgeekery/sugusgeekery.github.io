import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { DefInfo, State } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
// import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  UploadForm
} from "@/api";
import {
  GetProvinceCityCountry,
  ChangeSupplierType,
  GetUserInfo,
  SaveUserInfo,
  GetPersonQualifyInfo,
  SavePersonQualifyInfo,
  GetCompanyInfo,
  SaveCompanyInfo,
  GetCompQualifyInfo,
  SaveCompanyQualifyInfo
} from "@/api/account";

interface Store {
  rootState: RootState;
  rootGetters: GetterTree<RootState, RootState>;
  state: State;
  getters: GetterTree<State, RootState>;
  dispatch: Dispatch;
  commit: Commit;
}

export enum ActionTypes {
  GetProvinceCityCountry = "GetProvinceCityCountry",
  UploadForm = "UploadForm",
  ChangeSupplierType = "ChangeSupplierType",
  GetDefInfo = "GetDefInfo",
  GetUserInfo = "GetUserInfo",
  SaveUserInfo = "SaveUserInfo",
  GetCompanyInfo = "GetCompanyInfo",
  SaveCompanyInfo = "SaveCompanyInfo",
}

export default {
  // 初始化模块默认值
  [ActionTypes.GetDefInfo](store: Store, params: any | DefInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateDefInfo, params);
    dispatch(ActionTypes.GetProvinceCityCountry);
    dispatch(ActionTypes.GetUserInfo);
    dispatch(ActionTypes.GetCompanyInfo);
  },

  // 获取省市区数据
  async [ActionTypes.GetProvinceCityCountry](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetProvinceCityCountry({});
      if (success) {
        const { provinceCityDistrict = [] } = data || {};
        const fn: any = function(l: any) {
          const a = [];
          for (const v of l) {
            const { code = 0, name = "", children = [] } = v;
            if (children && children.length) {
              a.push({ label: name, value: code, children: fn(children) });
            } else {
              a.push({ label: name, value: code });
            }
          }
          return a;
        }
        const provinceCityDistrictList = fn(provinceCityDistrict);
        commit(MutationTypes.UpdateProvinceCityDistrict, provinceCityDistrictList);
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取用户信息
  async [ActionTypes.ChangeSupplierType](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { defInfo } = state;
      const { typeList } = defInfo;
      const { type, typeStr } = (typeList => {
        for (const [a, b] of typeList.entries()) {
          const { type, text, isSelected } = b;
          if (isSelected) return { type, typeStr: text };
        }
        return { type: 0, typeStr: "" };
      })(typeList);
      if (!type) {
        Message.error("请选择供应商类型！");
        return;
      }
      const { success, msg, data }: any = await ChangeSupplierType({ type });
      if (success) {
        commit(MutationTypes.UpdateDefInfo, { type, typeStr, typeList: (typeList => {
          for (const [a, b] of typeList.entries()) {
            typeList[a]["isSelected"] = false;
          }
          return typeList;
        })(typeList)});
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取用户信息
  async [ActionTypes.GetUserInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetUserInfo({});
      if (success) {
        commit(MutationTypes.UpdateUserInfo, { ...(data || {})});
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 上传文件
  async [ActionTypes.UploadForm](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { file } = params || {};
      const formData = new FormData();
      formData.append("files", file);
      const { success, msg, data }: any = await UploadForm(formData);
      if (success) {
        const { pics = [] } = data || {};
        const { fileThumPath = "" } = pics[0];
        commit(MutationTypes.UpdateUserInfo, { headImgUrl: fileThumPath });
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 提交用户信息
  async [ActionTypes.SaveUserInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { userInfo, defInfo, companyInfo } = state;
      console.log(userInfo);
      const { email, headImgUrl, phoneNo, userName, sex, telephoneNo } = userInfo || {};
      if (!headImgUrl) {
        Message.error("请上传头像！");
        return;
      }
      if (!userName) {
        Message.error("请输入真实姓名！");
        return;
      }
      if (!phoneNo) {
        Message.error("请输入手机号！");
        return;
      }
      const { success, msg, data }: any = await SaveUserInfo({ email, headImgUrl, mobilePhoneNo: phoneNo, realName: userName, sex, telephoneNo });
      if (success) {
        // commit(MutationTypes.UpdateUserInfo, { ...(data || {})});
        if (defInfo.type === 1) {
          dispatch(ActionTypes.SaveCompanyInfo);
        }
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取公司信息
  async [ActionTypes.GetCompanyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetCompanyInfo({});
      if (success) {
        commit(MutationTypes.UpdateCompanyInfo, { ...(data || {})});
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 提交公司信息
  async [ActionTypes.SaveCompanyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { userInfo, companyInfo } = state;
      console.log(userInfo, companyInfo);
      const { address, cityId, companyName, companyPhoneNo, description, districtId, officialWebsite = "", provinceId, publishTime, staffSize } = companyInfo || {};
      if (!companyName) {
        Message.error("请输入公司名称！");
        return;
      }
      if (!staffSize) {
        Message.error("请输入公司人数！");
        return;
      }
      if (!publishTime) {
        Message.error("请选择成立时间！");
        return;
      }
      if (!publishTime) {
        Message.error("请选择成立时间！");
        return;
      }
      if (!companyPhoneNo) {
        Message.error("请输入公司电话！");
        return;
      }
      if (!provinceId || !cityId || !districtId || !address) {
        Message.error("请选择公司地址！");
        return;
      }
      if (!description) {
        Message.error("请输入公司详情！");
        return;
      }
      const { success, msg, data }: any = await SaveCompanyInfo({ address, cityId, companyName, companyPhoneNo, description, districtId, officialWebsite, provinceId, publishTime, staffSize });
      if (success) {
        // commit(MutationTypes.UpdateUserInfo, data || {});
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}