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
  GetMyBidAdvantage,
  GetOrderList,

  GetOrderTime,
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
  GetMyBidAdvantage = "GetMyBidAdvantage",
  GetOrderList = "GetOrderList",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize",
  UpdateProjectIndex = "UpdateProjectIndex",
  UpdateStatusIndex = "UpdateStatusIndex",
  UpdateOrderNo = "UpdateOrderNo",
  GetOrderDetail = "GetOrderDetail",
  UpdateNavigationIndex = "UpdateNavigationIndex",

  GetOrderTime = "GetOrderTime",
}

export default {
  // 获取竞价指标
  async [ActionTypes.GetMyBidAdvantage](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, msg, data }: any = await GetMyBidAdvantage();
      if (success) {
        const { accuracy, anerror } = data || {};
        commit(MutationTypes.UpdateAdvantage, { accuracy, anerror });
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取订单列表
  async [ActionTypes.GetOrderList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { pageNum = 1, pageSize = 10, orderNo = "", projectIndex = 0, projectList = [], statusIndex = 0, statusList = [] } = order;
      const { type = "" } = projectList[projectIndex] || {};
      const { status = "" } = statusList[statusIndex] || {};
      const { success, msg, data }: any = await GetOrderList({ pageNum, pageSize, status, type, orderNo });
      if (success) {
        const { list = [], total } = data || {};
        commit(MutationTypes.UpdateOrder, { list, total: Number(total) });
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新订单页码
  [ActionTypes.UpdatePageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { pageNum });
    dispatch(ActionTypes.GetOrderList);
  },
  // 更新竞订单每页条数
  [ActionTypes.UpdatePageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { pageSize });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新订单项目类型下标
  [ActionTypes.UpdateProjectIndex](store: Store, projectIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { projectIndex });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新订单全部状态下标
  [ActionTypes.UpdateStatusIndex](store: Store, statusIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { statusIndex });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新订单搜索内容
  [ActionTypes.UpdateOrderNo](store: Store, orderNo: string) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { orderNo });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },

  // 跳转到订单详情
  [ActionTypes.GetOrderDetail](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { order } = state;
    const { list = [] } = order || {};
    const { status } = list[index] || {};
    commit(MutationTypes.UpdateOrder, { index });
    dispatch("order/design/Init", {...list[index]}, { root: true });
    // dispatch("order/information", {...list[index]}, { root: true });
    // dispatch("order/report", {...list[index]}, { root: true });
    const navigationList = [];
    if (status === "加工供应商") {
      navigationList.push(...[
        {
          text: "DFM报告",
          path: "/order/report",
        },
        {
          text: "方案设计",
          path: "/order/design",
        },
        {
          text: "模具信息",
          path: "/order/information",
        },
      ])
    } else if (status === "DFM供应商") {
      navigationList.push(...[
        {
          text: "DFM报告",
          path: "/order/report",
        },
        {
          text: "方案设计",
          path: "/order/design",
        },
        {
          text: "模具信息",
          path: "/order/information",
        },
      ])
    } else if (status === "注塑供应商") {
      navigationList.push(...[
        {
          text: "DFM报告",
          path: "/order/report",
        },
        {
          text: "方案设计",
          path: "/order/design",
        },
        {
          text: "模具信息",
          path: "/order/information",
        },
      ])
    } else {
      navigationList.push(...[
        {
          text: "DFM报告",
          path: "/order/report",
        },
        {
          text: "方案设计",
          path: "/order/design",
        },
        {
          text: "模具信息",
          path: "/order/information",
        },
      ])
    }
    commit(MutationTypes.UpdateNavigationList, navigationList);
    dispatch(ActionTypes.UpdateNavigationIndex, 1);
  },
  // 导航跳转
  [ActionTypes.UpdateNavigationIndex](store: Store, navigationIndex: number) {
    const { state, dispatch, commit } = store;
    const { navigationList = [] } = state;
    const { path } = navigationList[navigationIndex] || {};
    commit(MutationTypes.UpdateNavigationIndex, navigationIndex);
    router.push({ path });
  },

  // 获取竞价指标
  async [ActionTypes.GetOrderTime](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { list = [], index = -1 } = order || {};
      const { id } = list[index] || {};
      const { success, msg, data }: any = await GetOrderTime({ orderId: id });
      if (success) {
        // const { accuracy, anerror } = data || {};
        // commit(MutationTypes.UpdateAdvantage, { accuracy, anerror });
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}