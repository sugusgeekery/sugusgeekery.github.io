import { State, InitInfo, Advantage, Order, Mould } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateAdvantage = "UpdateAdvantage",
  UpdateOrder = "UpdateOrder",
  UpdateNavigationList = "UpdateNavigationList",
  UpdateNavigationIndex = "UpdateNavigationIndex",
  UpdateCountdown = "UpdateCountdown",
  UpdateMould = "UpdateMould",
  UpdateArrangementScheme = "UpdateArrangementScheme",
  UpdateContact = "UpdateContact"
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

  // 更新导航列表
  [MutationTypes.UpdateNavigationList](state: State, navigationList: Array<HpStepTypes>) {
    state.navigationList = navigationList;
  },
  // 更新导航下标
  [MutationTypes.UpdateNavigationIndex](state: State, navigationIndex: number) {
    state.navigationIndex = navigationIndex;
  },

  // 更新交付倒计时
  [MutationTypes.UpdateCountdown](state: State, params: CountdownTypes) {
    const { countdown } = state;
    const temp: CountdownTypes = countdown;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.countdown = Object.assign(countdown, temp);
    })(state, params, temp);
  },

  // 更新模具产品信息
  [MutationTypes.UpdateMould](state: State, params: Mould) {
    const { mould } = state;
    const temp: Mould = mould;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.mould = Object.assign(mould, temp);
    })(state, params, temp);
  },
  // 更新合模方案
  [MutationTypes.UpdateArrangementScheme](state: State, params: ArrangementSchemeTypes) {
    const { arrangementScheme } = state;
    const temp: ArrangementSchemeTypes = arrangementScheme;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.arrangementScheme = Object.assign(arrangementScheme, temp);
    })(state, params, temp);
  },
  // 获取联系方式
  [MutationTypes.UpdateContact](state: State, contact: Array<ContactTypes>) {
    state.contact = contact;
  }
}