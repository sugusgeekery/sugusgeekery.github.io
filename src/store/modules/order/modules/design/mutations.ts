import { State, InitOption, Design } from "./state";

export enum MutationTypes {
  UpdateInitOption = "UpdateInitOption",
  UpdateDesign = "UpdateDesign",
  UpdateBOMTable = "UpdateBOMTable",
  UpdateBOMImageInfo = "UpdateBOMImageInfo",
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

  // 更新方案设计
  [MutationTypes.UpdateDesign](state: State, params: Design) {
    const { design } = state;
    const temp: Design = design;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.design = Object.assign(design, temp);
    })(state, params, temp);
  },

  // 更新BOM表弹框
  [MutationTypes.UpdateBOMTable](state: State, params: any) {
    const { BOMTable } = state;
    const temp: any = BOMTable;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.BOMTable = Object.assign(BOMTable, temp);
    })(state, params, temp);
  },

  // 更新BOM表零件图纸
  [MutationTypes.UpdateBOMImageInfo](state: State, params: any) {
    const { BOMImageInfo } = state;
    const temp: any = BOMImageInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.BOMImageInfo = Object.assign(BOMImageInfo, temp);
    })(state, params, temp);
  },
}