import { State, InitOption, Mould, RepairMould } from "./state";

export enum MutationTypes {
  UpdateInitOption = "UpdateInitOption",
  UpdateMould = "UpdateMould",
  UpdateRepairMouldIndex = "UpdateRepairMouldIndex",
  UpdateRepairMouldList = "UpdateRepairMouldList",
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

  // 更新修模列表下标
  [MutationTypes.UpdateRepairMouldIndex](state: State, repairMouldIndex: number) {
    state.repairMouldIndex = repairMouldIndex;
  },
  // 更新修模列表
  [MutationTypes.UpdateRepairMouldList](state: State, repairMouldList: Array<RepairMould>) {
    state.repairMouldList = repairMouldList;
  },
}