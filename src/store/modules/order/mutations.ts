import { State, Order } from "./state";

export enum MutationTypes {
  UpdateOrder = "UpdateOrder",
}

export default {
  // 更新订单数据
  [MutationTypes.UpdateOrder](state: State, params: Order) {
    const { order } = state;
    const temp: Order = order;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.order = Object.assign(order, temp);
    })(state, params, temp);
  },
}