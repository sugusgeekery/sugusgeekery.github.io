import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { InitInfo, State } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";

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
  GetInformationDefInfo = "GetInformationDefInfo",
  GetQualifyDefInfo = "GetQualifyDefInfo",
  UpdateDefLoginInfo = "UpdateDefLoginInfo",
  GetUserInfo = "GetUserInfo",
  SaveUserInfo = "SaveUserInfo",
  GetCompanyInfo = "GetCompanyInfo",
  SaveCompanyInfo = "SaveCompanyInfo",
  GetPersonQualifyInfo = "GetPersonQualifyInfo",
  SavePersonQualifyInfo = "SavePersonQualifyInfo",
  GetCompQualifyInfo = "GetCompQualifyInfo",
  SaveCompanyQualifyInfo = "SaveCompanyQualifyInfo"
}

export default {
  // 初始化信息模块默认值
  [ActionTypes.GetInformationDefInfo](store: Store, params: any | InitInfo) {
    const { state, rootState, dispatch, commit } = store;
    const { loginInfo, accountInfo } = rootState;
    const { type = 0 } = accountInfo || {};
    const typeStr = type === 1 ? "公司" : type === 2 ? "个人" : "";
    commit(MutationTypes.UpdateInitInfo, { type, typeStr, loginInfo, accountInfo, ...params });
    // dispatch(ActionTypes.GetProvinceCityCountry);
    dispatch(ActionTypes.GetUserInfo);
    dispatch(ActionTypes.GetCompanyInfo);
  },

  // 初始化资质模块默认值
  [ActionTypes.GetQualifyDefInfo](store: Store, params: any | InitInfo) {
    const { state, rootState, dispatch, commit } = store;
    const { loginInfo, accountInfo } = rootState;
    const { type = 0 } = accountInfo || {};
    const typeStr = type === 1 ? "公司" : type === 2 ? "个人" : "";
    commit(MutationTypes.UpdateInitInfo, { type, typeStr, loginInfo, accountInfo, ...params });
    if (type === 1) {
      dispatch(ActionTypes.GetCompQualifyInfo);
    } else if (type === 2) {
      dispatch(ActionTypes.GetPersonQualifyInfo);
    }
  },

  // 更新是否首次注册 
  [ActionTypes.UpdateDefLoginInfo](store: Store) {
    const { state, dispatch, commit } = store;
    const { initInfo } = state;
    const { loginInfo } = initInfo;
    loginInfo.isFirstExist = false;
    commit(MutationTypes.UpdateInitInfo, { loginInfo });
    commit("UpdateLoginInfo", { isFirstExist: false }, { root: true });
  },

  // 获取省市区数据
  async [ActionTypes.GetProvinceCityCountry](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetProvinceCityCountry({});
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
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 更新供应商类型
  async [ActionTypes.ChangeSupplierType](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { typeList } = initInfo;
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
      const { success, message, data }: any = await ChangeSupplierType({ type });
      if (success) {
        commit(MutationTypes.UpdateInitInfo, { type, typeStr, typeList: (typeList => {
          for (const [a, b] of typeList.entries()) {
            typeList[a]["isSelected"] = false;
          }
          return typeList;
        })(typeList)});
        commit("UpdateAccountInfo", { type }, { root: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取用户信息
  async [ActionTypes.GetUserInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetUserInfo({});
      if (success) {
        commit(MutationTypes.UpdateUserInfo, { ...(data || {})});
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 上传头像
  [ActionTypes.UploadForm](store: Store, params: any) {
    return new Promise(async(resolve, reject) => {
      try {
        const { state, dispatch, commit } = store;
        const { file } = params || {};
        const formData = new FormData();
        formData.append("files", file);
        const { success, message, data }: any = await UploadForm(formData);
        if (success) {
          const { pics = [] } = data || {};
          // const { fileThumPath = "" } = pics[0];
          // commit(MutationTypes.UpdateUserInfo, { headImgUrl: fileThumPath });
          resolve(pics[0]);
        } else {
          Message.error(message);
          reject({});
        }
      } catch (e) {
        throw new Error(e);
      }
    })
  },
  // 提交用户信息
  async [ActionTypes.SaveUserInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { userInfo, initInfo, companyInfo } = state;
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
      const { success, message, data }: any = await SaveUserInfo({ email, headImgUrl, mobilePhoneNo: phoneNo, realName: userName, sex, telephoneNo });
      if (success) {
        // commit(MutationTypes.UpdateUserInfo, { ...(data || {})});
        Message.success(message);
        if (initInfo.type === 1) {
          dispatch(ActionTypes.SaveCompanyInfo);
        }
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取公司信息
  async [ActionTypes.GetCompanyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetCompanyInfo({});
      if (success) {
        commit(MutationTypes.UpdateCompanyInfo, { ...(data || {})});
      } else {
        Message.error(message);
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
      const { success, message, data }: any = await SaveCompanyInfo({ address, cityId, companyName, companyPhoneNo, description, districtId, officialWebsite, provinceId, publishTime, staffSize });
      if (success) {
        // commit(MutationTypes.UpdateUserInfo, data || {});
        Message.success(message);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },



  // 获取用户资质信息
  async [ActionTypes.GetPersonQualifyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetPersonQualifyInfo({});
      if (success) {
        commit(MutationTypes.UpdateUserQualify, { ...(data || {})});
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 提交用户资质信息
  async [ActionTypes.SavePersonQualifyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { userQualify } = state;
      const { idcardBackImgId, idcardFrontImgId, labelList = [] } = userQualify || {};
      const labelCodeList = (ls => {
        const arr = [];
        for (const v of ls) {
          const { isSelected, code } = v;
          if (isSelected) {
            arr.push(code);
          }
        }
        return arr;
      })(labelList);
      if (!idcardFrontImgId) {
        Message.error("请上传身份证正面照！");
        return;
      }
      if (!idcardBackImgId) {
        Message.error("请上传身份证背面照！");
        return;
      }
      if (!labelCodeList.length) {
        Message.error("请选择你拥有的生产能力标签！");
        return;
      }
      const { success, message, data }: any = await SavePersonQualifyInfo({ idcardBackImgId, idcardFrontImgId, labelCodeList });
      if (success) {
        Message.success(message);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取公司资质信息
  async [ActionTypes.GetCompQualifyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetCompQualifyInfo({});
      if (success) {
        commit(MutationTypes.UpdateCompanyQualify, { ...(data || {})});
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 提交公司资质信息
  async [ActionTypes.SaveCompanyQualifyInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { companyQualify } = state;
      const { businessLicenseImgId, creditCode, labelList = [], operIdcardBackendId, operIdcardFrontId, operIdcardNo, operName, operPhoneNo } = companyQualify || {};
      const labelCodeList = (ls => {
        const arr = [];
        for (const v of ls) {
          const { isSelected, code } = v;
          if (isSelected) {
            arr.push(code);
          }
        }
        return arr;
      })(labelList);
      if (!creditCode) {
        Message.error("请输入统一社会信用代码！");
        return;
      }
      if (!businessLicenseImgId) {
        Message.error("请上传营业执照！");
        return;
      }
      if (!operName) {
        Message.error("请输入法人姓名！");
        return;
      }
      if (!operIdcardNo) {
        Message.error("请输入身份证号码！");
        return;
      }
      if (!operPhoneNo) {
        Message.error("请输入手机电话！");
        return;
      }
      if (!operIdcardFrontId) {
        Message.error("请上传身份证正面照！");
        return;
      }
      if (!operIdcardBackendId) {
        Message.error("请上传身份证背面照！");
        return;
      }
      if (!labelCodeList.length) {
        Message.error("请选择你拥有的生产能力标签！");
        return;
      }
      const { success, message, data }: any = await SaveCompanyQualifyInfo({ businessLicenseImgId, creditCode, labelCodeList, operIdcardBackendId, operIdcardFrontId, operIdcardNo, operName, operPhoneNo });
      if (success) {
        Message.success(message);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}