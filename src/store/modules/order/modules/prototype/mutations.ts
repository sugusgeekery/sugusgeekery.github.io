import { State, InitInfo, Prototype } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdatePrototype = "UpdatePrototype",
}

export default {
  // 更新初始化通用参数
  [MutationTypes.UpdateInitInfo](state: State, params: InitInfo) {
    const { initInfo } = state;
    const temp: InitInfo = initInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.initInfo = Object.assign(initInfo, temp);
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