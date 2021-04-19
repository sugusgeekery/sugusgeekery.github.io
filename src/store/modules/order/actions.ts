import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State, Supplier } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  GetMouldOrderType,
  GetOrderStatus,
  GetMyBidAdvantage,
  GetOrderList,
  GetCountdown
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
  Init = "Init",
  GetMouldOrderType = "GetMouldOrderType",
  GetOrderStatus = "GetOrderStatus",
  GetMyBidAdvantage = "GetMyBidAdvantage",
  GetOrderList = "GetOrderList",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize",
  UpdateProjectIndex = "UpdateProjectIndex",
  UpdateStatusIndex = "UpdateStatusIndex",
  UpdateOrderNo = "UpdateOrderNo",
  GetOrderDetail = "GetOrderDetail",
  UpdateNavigationIndex = "UpdateNavigationIndex",

  GetCountdown = "GetCountdown",
}

export default {
  // 初始化模块默认值
  [ActionTypes.Init](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, { ...(params || {}) });
  },

  // 获取订单类型筛选项
  async [ActionTypes.GetMouldOrderType](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetMouldOrderType();
      if (success) {
        const projectList = (list => {
          const arr = [
            {
              text: "项目类型",
              type: "",
            },
          ];
          for (const [a, b] of list.entries()) {
            const { index, label } = b;
            arr.push({ text: label, type: index });
          }
          return arr;
        })(data || {});
        commit(MutationTypes.UpdateOrder, { projectList });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取订单状态筛选项
  async [ActionTypes.GetOrderStatus](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetOrderStatus();
      if (success) {
        const statusList = (list => {
          const arr = [
            {
              text: "全部状态",
              status: "",
            },
          ];
          for (const [a, b] of list.entries()) {
            const { index, label } = b;
            arr.push({ text: label, status: index });
          }
          return arr;
        })(data || {});
        commit(MutationTypes.UpdateOrder, { statusList });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取竞价指标
  async [ActionTypes.GetMyBidAdvantage](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetMyBidAdvantage();
      if (success) {
        const { accuracy, anerror } = data || {};
        commit(MutationTypes.UpdateAdvantage, { accuracy, anerror });
        dispatch(ActionTypes.GetMouldOrderType);
        dispatch(ActionTypes.GetOrderStatus);
      } else {
        Message.error(message);
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
      const { success, message, data }: any = await GetOrderList({ pageNum, pageSize, status, type, orderNo });
      if (success) {
        const { list = [], total } = data || {};
        commit(MutationTypes.UpdateOrder, { list, total: Number(total) });
      } else {
        Message.error(message);
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
    const { type } = list[index] || {};
    commit(MutationTypes.UpdateOrder, { index });
    const navigationList = [];
    switch(type) {
      case Supplier.Dfm:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        dispatch("order/mould/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告",
            path: "/order/report",
          },
          {
            text: "模具信息",
            path: "/order/mould",
          },
        ]);
        break;
      case Supplier.Design:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        dispatch("order/mould/Init", {...list[index]}, { root: true });
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
            path: "/order/mould",
          },
        ]);
        break;
      case Supplier.Machining:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        dispatch("order/process/Init", {...list[index]}, { root: true });
        dispatch("order/prototype/Init", {...list[index]}, { root: true });
        dispatch("order/question/Init", {...list[index]}, { root: true });
        dispatch("order/mould/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告验收",
            path: "/order/report",
          },
          {
            text: "设计验收",
            path: "/order/design",
          },
          {
            text: "加工",
            path: "/order/process",
          },
          {
            text: "样件验收",
            path: "/order/prototype",
          },
          {
            text: "问题回复",
            path: "/order/question",
          },
          {
            text: "修模报价",
            path: "/order/mould",
          },
        ]);
        break;
      case Supplier.Injection:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        dispatch("order/process/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告验收",
            path: "/order/report",
          },
          {
            text: "设计验收",
            path: "/order/design",
          },
          {
            text: "试模",
            path: "/order/process",
          },
        ]);
        break;
    }
    commit(MutationTypes.UpdateNavigationList, navigationList);
    dispatch(ActionTypes.UpdateNavigationIndex, 0);
  },
  // 导航跳转
  [ActionTypes.UpdateNavigationIndex](store: Store, navigationIndex: number) {
    const { state, dispatch, commit } = store;
    const { navigationList = [] } = state;
    const { path } = navigationList[navigationIndex] || {};
    commit(MutationTypes.UpdateNavigationIndex, navigationIndex);
    router.push({ path });
  },

  // 获取倒计时
  async [ActionTypes.GetCountdown](store: Store, isDownTime: boolean = true) {
    try {
      const { state, dispatch, commit } = store;
      const { order, countdown } = state;
      const { list = [], index = -1 } = order || {};
      const { id } = list[index] || {};
      const { success, message, data }: any = await GetCountdown({ orderId: id });
      if (success) {
        const tempCountdown = { ...countdown, ...(data || {})};
        const fn = (countdown: CountdownTypes) => {
          const { remainSeconds } = countdown;
          const timeNumber = Math.abs(remainSeconds);
          countdown.isTimeout = remainSeconds < 0;
          countdown.hour = Math.floor(timeNumber / (60 * 60));
          countdown.minute = Math.floor((timeNumber % (60 * 60)) / 60);
          countdown.second = timeNumber % 60;
          commit(MutationTypes.UpdateCountdown, { ...countdown });
        };
        fn(tempCountdown);
        if (tempCountdown.setTimeInterval) {
          clearInterval(tempCountdown.setTimeInterval);
        }
        if (isDownTime && tempCountdown.state === 0) {
          tempCountdown.setTimeInterval = setInterval(() => {
            tempCountdown.remainSeconds--;
            fn(tempCountdown);
          }, 1000);
          commit(MutationTypes.UpdateCountdown, { ...tempCountdown });
        }
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}