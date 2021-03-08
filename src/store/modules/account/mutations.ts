import { State, DefInfo, ProvinceCityDistrict, UserInfo, CompanyInfo, UserQualify, CompanyQualify } from "./state";

export enum MutationTypes {
  UpdateDefInfo = "UpdateDefInfo",
  UpdateProvinceCityDistrict = "UpdateProvinceCityDistrict",
  UpdateUserInfo = "UpdateUserInfo",
  UpdateCompanyInfo = "UpdateCompanyInfo",
  UpdateUserQualify = "UpdateUserQualify",
  UpdateCompanyQualify = "UpdateCompanyQualify",
}

export default {
  // 更新初始化数据
  [MutationTypes.UpdateDefInfo](state: State, params: any | DefInfo) {
    const { defInfo } = state;
    const temp: any | DefInfo = defInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.defInfo = Object.assign(defInfo, temp);
    })(state, params, temp);
  },
  // 更新省市区列表
  [MutationTypes.UpdateProvinceCityDistrict](state: State, provinceCityDistrict: Array<ProvinceCityDistrict>) {
    state.provinceCityDistrict = provinceCityDistrict;
  },
  // 更新用户信息
  [MutationTypes.UpdateUserInfo](state: State, params: any | UserInfo) {
    const { userInfo } = state;
    const temp: any | UserInfo = userInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.userInfo = Object.assign(userInfo, temp);
    })(state, params, temp);
  },
  // 更新公司信息
  [MutationTypes.UpdateCompanyInfo](state: State, params: any | CompanyInfo) {
    const { companyInfo } = state;
    const temp: any | CompanyInfo = companyInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.companyInfo = Object.assign(companyInfo, temp);
    })(state, params, temp);
  },
  // 更新用户资质信息
  [MutationTypes.UpdateUserQualify](state: State, params: any | UserQualify) {
    const { userQualify } = state;
    const temp: any | UserQualify = userQualify;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.userQualify = Object.assign(userQualify, temp);
    })(state, params, temp);
  },
  // 更新公司资质信息
  [MutationTypes.UpdateCompanyQualify](state: State, params: any | CompanyQualify) {
    const { companyQualify } = state;
    const temp: any | CompanyQualify = companyQualify;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.companyQualify = Object.assign(companyQualify, temp);
    })(state, params, temp);
  },
}