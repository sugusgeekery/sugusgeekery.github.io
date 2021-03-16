import { State, InitOption, MachinStepList, AssembleStepList, InjectionStepList } from "./state";

export enum MutationTypes {
  UpdateInitOption = "UpdateInitOption",
  UpdateMachinStepList = "UpdateMachinStepList",
  UpdateAssembleStepList = "UpdateAssembleStepList",
  UpdateInjectionStepList = "UpdateInjectionStepList"
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