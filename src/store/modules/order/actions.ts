import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "mint-ui";
// import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {

} from "@/api/order";

interface Store {
  rootState: RootState;
  rootGetters: GetterTree<RootState, RootState>;
  state: State;
  getters: GetterTree<State, RootState>;
  dispatch: Dispatch;
  commit: Commit;
}

export enum ActionTypes {
  // InitWeeklyReport = "InitWeeklyReport",
  // GetWeeklyReport = "GetWeeklyReport",
}

export default {
  // 初始化模块默认值
  // [ActionTypes.InitWeeklyReport](store: Store, params: any) {
  //   const { state, dispatch, commit } = store;
  //   const { platform = "", accessToken = "", vipId = "", subject = "", beginTime = "", endTime = "" } = params || {};
  //   commit(MutationTypes.UpdateWeeklyReport, { platform, accessToken, vipId, subject, beginTime, endTime });
  //   dispatch(ActionTypes.GetWeeklyReport);
  // },
  // 获取
  // async [ActionTypes.GetWeeklyReport](store: Store) {
  //   try {
  //     const { state, dispatch, commit } = store;
  //     const { weeklyReport } = state;
  //     const { accessToken = "", vipId = "", subject = "", beginTime = "", endTime = "" } = weeklyReport;
  //     if (!vipId) {
  //       Message.error("vipId为空，不知道是要展示谁的周报哦！！！");
  //       return;
  //     }
  //     const { code = "000", msg, data }: any = await GetLearningGrowthReportV2({ vipId, subject, beginTime, endTime }, { accessToken });
  //     if (code == "999") {
  //       const weeklyReport = (report => {
  //         return report;
  //       })(data || {});
  //       commit(MutationTypes.UpdateWeeklyReport, weeklyReport);
  //     } else {
  //       Message.error(msg);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // },

  
}