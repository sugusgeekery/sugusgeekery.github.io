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
  GetOrderList
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
  GetOrderList = "GetOrderList",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize",
  UpdateProjectIndex = "UpdateProjectIndex",
  UpdateStatusIndex = "UpdateStatusIndex",
  UpdateMouldNo = "UpdateMouldNo",
  GetOrderDetail = "GetOrderDetail",
}

export default {
  // 初始化模块默认值
  // [ActionTypes.InitWeeklyReport](store: Store, params: any) {
  //   const { state, dispatch, commit } = store;
  //   const { platform = "", accessToken = "", vipId = "", subject = "", beginTime = "", endTime = "" } = params || {};
  //   commit(MutationTypes.UpdateWeeklyReport, { platform, accessToken, vipId, subject, beginTime, endTime });
  //   dispatch(ActionTypes.GetWeeklyReport);
  // },
  // 获取订单列表
  async [ActionTypes.GetOrderList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { pageNum = 1, pageSize = 10, mouldNo = "", projectIndex = 0, projectList = [], statusIndex = 0, statusList = [] } = order;
      const { type = "" } = projectList[projectIndex] || {};
      const { status = "" } = statusList[statusIndex] || {};
      const { code = "000", msg, data }: any = await GetOrderList({ pageNum, pageSize, status, type, mouldNo });
      if (code == "999") {
        const { records = [], total } = data || {};
        commit(MutationTypes.UpdateOrder, { list: records, total });
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
  [ActionTypes.UpdateMouldNo](store: Store, mouldNo: string) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { mouldNo });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },

  // 跳转到订单详情
  [ActionTypes.GetOrderDetail](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { order } = state;
    const { list = [] } = order || {};
    const { id = "" } = list[index] || {};
    // commit(MutationTypes.UpdateOrderDetail, {});
    // dispatch(ActionTypes.UpdatePageNum, 1);
  },
  
}