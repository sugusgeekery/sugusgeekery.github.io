import { State, Advantage, Order } from "./state";

export enum MutationTypes {
  UpdateAdvantage = "UpdateAdvantage",
  UpdateOrder = "UpdateOrder",
}

export default {
  // 更新竞价指标
  [MutationTypes.UpdateAdvantage](state: State, params: Advantage) {
    const { advantage } = state;
    const temp: Advantage = advantage;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.advantage = Object.assign(advantage, temp);
    })(state, params, temp);
  },
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