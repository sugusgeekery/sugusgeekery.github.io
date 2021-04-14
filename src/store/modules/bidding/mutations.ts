import { State, InitInfo, BiddingList, BiddingDetailTypes } from "./state";

export enum MutationTypes {
  UpdateInitInfo = "UpdateInitInfo",
  UpdateBiddingIndex = "UpdateBiddingIndex",
  UpdateBiddingList = "UpdateBiddingList",
  UpdateBiddingDetail = "UpdateBiddingDetail",
  UpdateMaterialAndColor = "UpdateMaterialAndColor",
  UpdateTechnology = "UpdateTechnology",
  UpdateArrangementScheme = "UpdateArrangementScheme",
  UpdateProductInfo = "UpdateProductInfo",
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
      state.initInfo = Object.assign({}, initInfo, temp);
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
  [MutationTypes.UpdateBiddingDetail](state: State, params: any | BiddingDetailTypes) {
    const { biddingDetail } = state;
    const temp: any | BiddingDetailTypes = biddingDetail;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.biddingDetail = Object.assign({}, biddingDetail, temp);
    })(state, params, temp);
  },
 
  // 更新竞价单材料颜色
  [MutationTypes.UpdateMaterialAndColor](state: State, params: MaterialAndColorTypes) {
    const { materialAndColor } = state;
    const temp: MaterialAndColorTypes = materialAndColor;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.materialAndColor = Object.assign({}, materialAndColor, temp);
    })(state, params, temp);
  },
  // 更新竞价单二次工艺
  [MutationTypes.UpdateTechnology](state: State, params: TechnologyTypes) {
    const { technology } = state;
    const temp: TechnologyTypes = technology;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.technology = Object.assign({}, technology, temp);
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
      state.arrangementScheme = Object.assign({}, arrangementScheme, temp);
    })(state, params, temp);
  },
  // 更新产品详情
  [MutationTypes.UpdateProductInfo](state: State, params: ProductInfoTypes) {
    const { productInfo } = state;
    const temp: ProductInfoTypes = productInfo;
    (function<T>(state: State, params: T, temp: T) {
      for (const key in params) {
        temp[key] = params[key];
      }
      state.productInfo = Object.assign({}, productInfo, temp);
    })(state, params, temp);
  },
}