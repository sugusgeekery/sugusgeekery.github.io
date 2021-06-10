import { State, InitInfo, Design } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateDesign = "UpdateDesign",
  UpdateBOMTable = "UpdateBOMTable",
  UpdateBOMImageInfo = "UpdateBOMImageInfo",
  UpdateBOMInfo = "UpdateBOMInfo",
  UpdateReasonContent = "UpdateReasonContent",
  UpdateConfirmModel = "UpdateConfirmModel",
  UpdateDesignVersion = "UpdateDesignVersion",
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
  // 更新BOM表零件图纸
  [MutationTypes.UpdateBOMInfo](state: State, params: any) {
    const { BOMInfo } = state;
    const temp: any = BOMInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.BOMInfo = Object.assign(BOMInfo, temp);
    })(state, params, temp);
  },
  // 更新驳回原因通用参数
  [MutationTypes.UpdateReasonContent](state: State, params: ReasonContentTypes) {
    const { reasonContent } = state;
    const temp: ReasonContentTypes = reasonContent;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.reasonContent = Object.assign(reasonContent, temp);
    })(state, params, temp);
  },
  // 更新驳回请求弹框内容
  [MutationTypes.UpdateConfirmModel](state: State, params: ConfirmModelTypes) {
    const { confirmModel } = state;
    const temp: ConfirmModelTypes = confirmModel;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.confirmModel = Object.assign(confirmModel, temp);
    })(state, params, temp);
  },

  // 更新方案设计记录
  [MutationTypes.UpdateDesignVersion](state: State, params: DesignVersionTypes) {
    const { designVersion } = state;
    const temp: DesignVersionTypes = designVersion;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.designVersion = Object.assign(designVersion, temp);
    })(state, params, temp);
  },
}