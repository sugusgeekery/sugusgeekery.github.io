import { State, InitInfo, OrderMessage, Job, UserMessage } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateOrderMessageList = "UpdateOrderMessageList",
  UpdateJob = "UpdateJob",
  UpdateUserMessageList = "UpdateUserMessageList"
}

export default {
  // 更新初始化通用参数
  [MutationTypes.UpdateInitInfo](state: State, params: InitInfo) {
    const { initInfo } = state;
    const temp: InitInfo = initInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.initInfo = Object.assign(initInfo, temp);
    })(state, params, temp);
  },

  // 更新订单信息列表
  [MutationTypes.UpdateOrderMessageList](state: State, orderMessageList: Array<OrderMessage>) {
    state.orderMessageList = orderMessageList;
  },
  // 更新代办任务
  [MutationTypes.UpdateJob](state: State, params: Job) {
    const { job } = state;
    const temp: Job = job;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.job = Object.assign(job, temp);
    })(state, params, temp);
  },
  // 更新个人信息列表
  [MutationTypes.UpdateUserMessageList](state: State, userMessageList: Array<UserMessage>) {
    state.userMessageList = userMessageList;
  },
}