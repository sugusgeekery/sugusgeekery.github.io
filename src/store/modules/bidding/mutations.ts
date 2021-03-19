import { State, InitInfo, BiddingList, BiddingDetail, BiddingTechnology, BiddingMaterial } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateBiddingIndex = "UpdateBiddingIndex",
  UpdateBiddingList = "UpdateBiddingList",
  UpdateBiddingDetail = "UpdateBiddingDetail",
  UpdateBiddingTechnology = "UpdateBiddingTechnology",
  UpdateBiddingMaterial = "UpdateBiddingMaterial",
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
  // 更新竞价导航下标
  [MutationTypes.UpdateBiddingIndex](state: State, biddingIndex: number) {
    state.biddingIndex = biddingIndex;
  },
  // 更新竞价导航
  [MutationTypes.UpdateBiddingList](state: State, biddingList: Array<BiddingList>) {
    state.biddingList = biddingList;
  },
  // 更新竞价单详情
  [MutationTypes.UpdateBiddingDetail](state: State, params: any | BiddingDetail) {
    const { biddingDetail } = state;
    const temp: any | BiddingDetail = biddingDetail;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.biddingDetail = Object.assign(biddingDetail, temp);
      console.log(state.biddingDetail.isShow)
    })(state, params, temp);
  },
  // 更新竞价单二次工艺
  [MutationTypes.UpdateBiddingTechnology](state: State, params: any | BiddingTechnology) {
    const { biddingTechnology } = state;
    const temp: any | BiddingTechnology = biddingTechnology;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.biddingTechnology = Object.assign(biddingTechnology, temp);
    })(state, params, temp);
  },
  // 更新竞价单材料颜色
  [MutationTypes.UpdateBiddingMaterial](state: State, params: any | BiddingMaterial) {
    const { biddingMaterial } = state;
    const temp: any | BiddingMaterial = biddingMaterial;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.biddingMaterial = Object.assign(biddingMaterial, temp);
    })(state, params, temp);
  },
}