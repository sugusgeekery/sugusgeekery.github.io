import { State, InitInfo, Mould, RepairMould } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateMould = "UpdateMould",
  UpdateRepairMouldIndex = "UpdateRepairMouldIndex",
  UpdateRepairMouldList = "UpdateRepairMouldList",
  UpdateArrangementScheme = "UpdateArrangementScheme",
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

  // 更新合模方案
  [MutationTypes.UpdateArrangementScheme](state: State, params: ArrangementSchemeTypes) {
    const { arrangementScheme } = state;
    const temp: ArrangementSchemeTypes = arrangementScheme;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.arrangementScheme = Object.assign(arrangementScheme, temp);
    })(state, params, temp);
  },
}