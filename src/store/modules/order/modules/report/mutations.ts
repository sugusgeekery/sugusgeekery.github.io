import { State, InitInfo, ReportList } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateReportList = "UpdateReportList",
  UpdateTimestamp = "UpdateTimestamp",
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
      state.initInfo = Object.assign({}, initInfo, temp);
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
}