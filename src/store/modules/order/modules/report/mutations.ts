import { State, InitInfo, ReportList } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateReportList = "UpdateReportList",
  UpdateTimestamp = "UpdateTimestamp",
  UpdateReasonContent = "UpdateReasonContent",
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

  // 更新报告列表
  [MutationTypes.UpdateReportList](state: State, reportList: Array<ReportList>) {
    state.reportList = reportList;
  },

  // 更新时间戳
  [MutationTypes.UpdateTimestamp](state: State, timestamp: number) {
    state.timestamp = timestamp;
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
}