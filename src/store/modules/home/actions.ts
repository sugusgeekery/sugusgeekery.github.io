import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";

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
  Init = "Init",
  GetStatistics = "GetStatistics",
  GetToBeDeal = "GetToBeDeal",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize"
}

export default {
  // 初始化模块默认值
  [ActionTypes.Init](store: Store, params: any) {
    const { state, rootState, dispatch, commit } = store;
    const { accountInfo } = rootState;
    commit(MutationTypes.UpdateInitInfo, { ...(params || {}), accountInfo });
    dispatch(ActionTypes.GetStatistics);
    dispatch(ActionTypes.GetToBeDeal);
  },

  // 获取个人统计信息
  async [ActionTypes.GetStatistics](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetStatistics();
      if (success) {
        const { inCompleteOrderCount, messageCount, newBiddingCount, pendingOrderCount } = data || {};
        const orderMessageList = [];
        orderMessageList.push({
          text: "新竞价单",
          count: newBiddingCount || 0
        });
        orderMessageList.push({
          text: "未完成订单",
          count: inCompleteOrderCount || 0
        });
        orderMessageList.push({
          text: "待处理订单",
          count: pendingOrderCount || 0
        });
        orderMessageList.push({
          text: "新消息",
          count: messageCount || 0
        });
        commit(MutationTypes.UpdateOrderMessageList, orderMessageList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取待办任务
  async [ActionTypes.GetToBeDeal](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetToBeDeal();
      if (success) {
        const { list = [], total = 0 } = data || {};
        commit(MutationTypes.UpdateJob, { list, total: Number(total) });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新待办任务页码
  [ActionTypes.UpdatePageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateJob, { pageNum });
    dispatch(ActionTypes.GetToBeDeal);
  },
  // 更新待办任务每页条数
  [ActionTypes.UpdatePageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateJob, { pageSize });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
}