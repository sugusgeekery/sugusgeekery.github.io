import { State, OrderMessage, Job, UserMessage } from "./state";

export enum MutationTypes {
  UpdateOrderMessageList = "UpdateOrderMessageList",
  UpdateJobList = "UpdateJobList",
  UpdateUserMessageList = "UpdateUserMessageList"
}

export default {
  // 更新订单信息列表
  [MutationTypes.UpdateOrderMessageList](state: State, orderMessageList: Array<OrderMessage>) {
    state.orderMessageList = orderMessageList;
  },
  // 更新代办任务
  [MutationTypes.UpdateJobList](state: State, jobList: Array<Job>) {
    state.jobList = jobList;
  },
  // 更新个人信息列表
  [MutationTypes.UpdateUserMessageList](state: State, userMessageList: Array<UserMessage>) {
    state.userMessageList = userMessageList;
  },
}