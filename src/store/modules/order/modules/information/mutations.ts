import { State } from "./state";

export enum MutationTypes {
  UpdateNavigationIndex = "UpdateNavigationIndex",
  // UpdateOrder = "UpdateOrder",
}

export default {
  // 更新导航下标
  [MutationTypes.UpdateNavigationIndex](state: State, navigationIndex: number) {
    state.navigationIndex = navigationIndex;
  },

  // 更新订单数据
  // [MutationTypes.UpdateOrder](state: State, params: Order) {
  //   const { order } = state;
  //   const temp: Order = order;
  //   (function<T>(state: State, params: T, temp: T) {
  //     for (const key in params) {
  //       temp[key] = params[key];
  //     }
  //     state.order = Object.assign(order, temp);
  //   })(state, params, temp);
  // },
}