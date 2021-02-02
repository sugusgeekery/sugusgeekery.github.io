import { State, InitOption, ReportList } from "./state";

export enum MutationTypes {
  UpdateInitOption = "UpdateInitOption",
  UpdateReportList = "UpdateReportList",
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

  // 更新报告列表
  [MutationTypes.UpdateReportList](state: State, reportList: Array<ReportList>) {
    state.reportList = reportList;
  },
}