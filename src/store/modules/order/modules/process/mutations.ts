import { State, InitInfo, MachinStepList, AssembleStepList, InjectionStepList } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateMachinStepList = "UpdateMachinStepList",
  UpdateAssembleStepList = "UpdateAssembleStepList",
  UpdateInjectionStepList = "UpdateInjectionStepList"
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

  // 更新加工步骤列表
  [MutationTypes.UpdateMachinStepList](state: State, machinStepList: Array<MachinStepList>) {
    state.machinStepList = machinStepList;
  },
  // 更新装配步骤列表
  [MutationTypes.UpdateAssembleStepList](state: State, assembleStepList: Array<AssembleStepList>) {
    state.assembleStepList = assembleStepList;
  },
  // 更新注塑步骤列表
  [MutationTypes.UpdateInjectionStepList](state: State, injectionStepList: Array<InjectionStepList>) {
    state.injectionStepList = injectionStepList;
  },
}