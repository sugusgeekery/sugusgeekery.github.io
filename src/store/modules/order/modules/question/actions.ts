import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitInfo } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  GetQuestions,
  AnswerQuestion
} from "@/api/order/question";

interface Store {
  rootState: RootState;
  rootGetters: GetterTree<RootState, RootState>;
  state: State;
  getters: GetterTree<State, RootState>;
  dispatch: Dispatch;
  commit: Commit;
}

export enum ActionTypes {
  Init = "Init",
  GetQuestionList = "GetQuestionList",
  AnswerQuestion = "AnswerQuestion"
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取问题列表
  async [ActionTypes.GetQuestionList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, mouldProduceId } = initInfo || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          // fn = await GetDfmReportList({ biddingId });
          break;
        case Supplier.Machining:
          fn = await GetQuestions({ mouldProduceId });
          break;
        case Supplier.Injection:
          // fn = await GetInjectStepList({ biddingId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        const questionList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { problemApprovalLogs = [] } = b;
            ls[a].reason = (list => {
              let reason = "";
              for (const [c, d] of list.entries()) {
                const { approvalType, description } = d;
                if (approvalType === 2) {
                  reason = description;
                }
              }
              return reason;
            })(problemApprovalLogs || [])
          }
          return ls;
        })(data || []);
        commit(MutationTypes.UpdateQuestionList, questionList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 回答问题
  async [ActionTypes.AnswerQuestion](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, questionList } = state;
      const { opinion = -1, index, replyContent = "" } = params || {};
      const { type, mouldProduceId } = initInfo || {};
      const { id, isRepair = -1, supplierAnswer} = questionList[index] || {};
      let fn = null;
      if (isRepair === null || isRepair === -1) {
        Message.error("请选择是否需要修模");
        return;
      }
      if (opinion > -1) {
        if (opinion === 0 && !replyContent) {
          Message.error("请输入不接受的理由");
          return;
        }
        fn = await AnswerQuestion({ needAdjust: isRepair, opinion, problemId: id, replyContent });
      } else {
        if (!supplierAnswer) {
          Message.error("请输入分析内容和改善建议");
          return;
        }
        fn = await AnswerQuestion({ needAdjust: isRepair, opinion: 1, problemId: id, replyContent: supplierAnswer });
      }
      
      const { success, message, data }: any = fn;
      if (success) {
        Message.success(message);
        // commit(MutationTypes.UpdateQuestionList, data || []);
        dispatch(ActionTypes.GetQuestionList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}