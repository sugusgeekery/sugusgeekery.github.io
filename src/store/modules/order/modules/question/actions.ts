import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitOption } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
// import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  UploadForm
} from "@/api";
import {
  GetQuestions,
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
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitOption) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitOption, params);
  },

  // 获取流程步骤
  async [ActionTypes.GetQuestionList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { type, mouldProduceId } = initOption || {};
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
        commit(MutationTypes.UpdateQuestionList, data || []);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}