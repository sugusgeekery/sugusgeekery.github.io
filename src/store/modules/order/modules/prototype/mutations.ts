import { State, InitOption, Prototype } from "./state";

export enum MutationTypes {
  UpdateInitOption = "UpdateInitOption",
  UpdatePrototype = "UpdatePrototype",
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

  // 更新样件验收信息
  [MutationTypes.UpdatePrototype](state: State, params: Prototype) {
    const { prototype } = state;
    const temp: Prototype = prototype;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.prototype = Object.assign(prototype, temp);
    })(state, params, temp);
  },
}