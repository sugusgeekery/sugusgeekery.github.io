import { GetterTree } from "vuex";
import { RootState } from "./state";

export enum RootGetterTypes {
  // GradeIndex = "GradeIndex",
};

const getters: GetterTree<RootState, RootState> = {

};

export default getters;

// 获取每周同步训练
// async ["getWeeklySynchronousTrainQuestionList"](store: Store, shouldLoadMore: boolean = false) {
//   try {
//     const { state, commit } = store;
//     const { weeklySynchronousTrain } = state;
//     const { initStatus = 0, vipId = "", subject = "", knowledgePointMasteryList = [], knowledgeList = [] } = weeklySynchronousTrain;
//     if (initStatus && !(knowledgePointMasteryList && knowledgePointMasteryList.length)) {
//       return;
//     }
//     commit("updateWeeklySynchronousTrain", { isLoading: true });
//     // const { code = "000", msg = "", data = {} }: any = await GetWeeklySynchronousTrainQuestionList({ vipId, subject, knowledgePointMasteryList });
//     const a: any = await GetCustomizedSprintPaper({ vipId, type: 1 });
//     const { code = "000", msg, data = {} } = a || {};
//     if (code == "999") {
//       const { knowledgePointMasteryList = [] } = data || {};
//       const knowledgeListTemp = shouldLoadMore ? [...knowledgeList, ...data?.knowledgeList] : data?.knowledgeList;
//       commit("updateWeeklySynchronousTrain", { 
//         knowledgePointMasteryList, 
//         hasMore: knowledgePointMasteryList.length, 
//         knowledgeList: knowledgeWidthOrHeightToPercent(knowledgeListTemp), 
//         isLoading: false,
//         initStatus: knowledgeWidthOrHeightToPercent(knowledgeListTemp) && knowledgeWidthOrHeightToPercent(knowledgeListTemp).length ? 1 : 2
//       });
//     } else {
//       Toast(msg);
//       commit("updateWeeklySynchronousTrain", { isLoading: false, initStatus: 2 });
//     }
//   } catch (e) {
//     throw new Error(e);
//   }
// },
