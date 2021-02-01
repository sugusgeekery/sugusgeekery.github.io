import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
// import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  GetStep,
} from "@/api/order/report";

interface Store {
  rootState: RootState;
  rootGetters: GetterTree<RootState, RootState>;
  state: State;
  getters: GetterTree<State, RootState>;
  dispatch: Dispatch;
  commit: Commit;
}

export enum ActionTypes {
  UpdateNavigationIndex = "UpdateNavigationIndex",
  GetStep = "GetStep",
}

export default {
  // 导航跳转
  [ActionTypes.UpdateNavigationIndex](store: Store, navigationIndex: number) {
    const { state, dispatch, commit } = store;
    const { navigationList = [] } = state;
    const { path } = navigationList[navigationIndex] || {};
    commit(MutationTypes.UpdateNavigationIndex, navigationIndex);
    router.push({ path });
  },

  // 获取方案设计进行到哪一步
  async [ActionTypes.GetStep](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetStep();
      if (success) {
        const { accuracy, anerror } = data || {};
        // commit(MutationTypes.UpdateAdvantage, { accuracy, anerror });
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
  
}