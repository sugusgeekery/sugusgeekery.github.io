import { State, InitOption, Mould } from "./state";

export enum MutationTypes {
  UpdateInitOption = "UpdateInitOption",
  UpdateMould = "UpdateMould",
}

export default {
  // 更新初始化通用参数
  [MutationTypes.UpdateInitOption](state: State, params: InitOption) {
    const { initOption } = state;
    const temp: InitOption = initOption;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.initOption = Object.assign(initOption, temp);
    })(state, params, temp);
  },

  // 更新模具信息
  [MutationTypes.UpdateMould](state: State, params: Mould) {
    const { mould } = state;
    const temp: Mould = mould;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.mould = Object.assign(mould, temp);
    })(state, params, temp);
  },
}