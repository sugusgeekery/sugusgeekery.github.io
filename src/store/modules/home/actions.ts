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
  GetStatistics,
  GetToBeDeal
} from "@/api/home";

interface Store {
  rootState: RootState;
  rootGetters: GetterTree<RootState, RootState>;
  state: State;
  getters: GetterTree<State, RootState>;
  dispatch: Dispatch;
  commit: Commit;
}

export enum ActionTypes {
  GetStatistics = "GetStatistics",
  GetToBeDeal = "GetToBeDeal",
}

export default {
  // 获取个人统计信息
  async [ActionTypes.GetStatistics](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetStatistics();
      if (success) {
        const { inCompleteOrderCount = 0, messageCount = 0, newBiddingCount = 0, pendingOrderCount = 0 } = data || {};
        const orderMessageList = [];
        orderMessageList.push({
          text: "新竞价单",
          count: newBiddingCount
        });
        orderMessageList.push({
          text: "未完成订单",
          count: inCompleteOrderCount
        });
        orderMessageList.push({
          text: "待处理订单",
          count: pendingOrderCount
        });
        orderMessageList.push({
          text: "新消息",
          count: messageCount
        });
        commit(MutationTypes.UpdateOrderMessageList, orderMessageList);
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取待办任务
  async [ActionTypes.GetToBeDeal](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetToBeDeal();
      if (success) {
        commit(MutationTypes.UpdateJobList, data || []);
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}