import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";
import { BASE_IMAGE_URL } from "@/config";

import {
  GetSelectByUser,
  GetSelectMyBidding,
  JoinBidding,
  RemoveBidding,
  UpdateMouldBidding,
  GetMouldBiddingDetail,
  GetProductTechnology,
  GetMaterialAndColor,
  GetArrangementScheme
} from "@/api/bidding";

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
  UpdateBiddingIndex = "UpdateBiddingIndex",
  GetBiddingList = "GetBiddingList",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize",
  UpdateMinPrice = "UpdateMinPrice",
  UpdateMaxPrice = "UpdateMaxPrice",
  UpdatePayDate = "UpdatePayDate",
  UpdateProvinceCityCountry = "UpdateProvinceCityCountry",
  JoinBidding = "JoinBidding",
  RemoveBidding = "RemoveBidding",
  GetBiddingDetail = "GetBiddingDetail",
  UpdateProductInfoIndex = "UpdateProductInfoIndex",
  GetMouldBiddingDetail = "GetMouldBiddingDetail",
  GetTechnology = "GetTechnology",
  GetMaterialAndColor = "GetMaterialAndColor",
  GetArrangementScheme = "GetArrangementScheme",
}

export default {
  // 初始化模块默认值
  [ActionTypes.Init](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, { ...(params || {}) });
  },

  // 更新竞价导航下标
  [ActionTypes.UpdateBiddingIndex](store: Store, biddingIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBiddingIndex, biddingIndex);
    dispatch(ActionTypes.GetBiddingList);
  },
  // 获取竞价导航列表
  async [ActionTypes.GetBiddingList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingIndex = 0, biddingList = [] } = state;
      const { type = 0, pageNum = 1, pageSize = 10 } = biddingList[biddingIndex] || {}; 
      let fn = null;
      if (biddingIndex === 0 || biddingIndex === 1) {
        fn = await GetSelectByUser({ type, pageNum, pageSize });
      } else if (biddingIndex === 2 || biddingIndex === 3) {
        fn = await GetSelectMyBidding({ type, pageNum, pageSize });
      }
      const { success, message, data }: any = fn;
      if (success) {
        const { list = [], total = 0 } = data || {};
        biddingList[biddingIndex].list = list;
        biddingList[biddingIndex].total = Number(total);
        commit(MutationTypes.UpdateBiddingList, biddingList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
  // 更新竞价导航页码
  [ActionTypes.UpdatePageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].pageNum = pageNum;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.GetBiddingList);
  },
  // 更新竞价导航每页条数
  [ActionTypes.UpdatePageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].pageSize = pageSize;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航最少价格
  [ActionTypes.UpdateMinPrice](store: Store, minPrice: string | number) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].minPrice = Number(minPrice);
    commit(MutationTypes.UpdateBiddingList, biddingList);
    // dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航最多价格
  [ActionTypes.UpdateMaxPrice](store: Store, maxPrice: string | number) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].maxPrice = Number(maxPrice);
    commit(MutationTypes.UpdateBiddingList, biddingList);
    // dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航交付日期
  [ActionTypes.UpdatePayDate](store: Store, payDate: string) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    console.log(payDate)
    biddingList[biddingIndex].payDate = payDate;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    // dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航交付地区
  [ActionTypes.UpdateProvinceCityCountry](store: Store, provinceCityCountry: string[]) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].provinceCityCountry = provinceCityCountry;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    // dispatch(ActionTypes.UpdatePageNum, 1);
  },

  // 参与竞价
  // async [ActionTypes.JoinBidding](store: Store, index: number) {
  //   try {
  //     const { state, dispatch, commit } = store;
  //     const { biddingIndex = 0, biddingList = [] } = state;
  //     const { list = [] } = biddingList[biddingIndex] || {}; 
  //     const { amount, id, workPeriod } = list[index] || {};
  //     const { success, message, data }: any = await JoinBidding({ amount, biddingHeadId: id, workPeriod });
  //     if (success) {
  //       Message.success(message);
  //       dispatch(ActionTypes.GetBiddingList);
  //     } else {
  //       Message.error(message);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // },
  // 取消竞价
  // async [ActionTypes.RemoveBidding](store: Store, index: number) {
  //   try {
  //     const { state, dispatch, commit } = store;
  //     const { biddingIndex = 0, biddingList = [] } = state;
  //     const { list = [] } = biddingList[biddingIndex] || {}; 
  //     const { amount, id, workPeriod } = list[index] || {};
  //     const { success, message, data }: any = await RemoveBidding({ amount, biddingHeadId: id, workPeriod });
  //     if (success) {
  //       Message.success(message);
  //       dispatch(ActionTypes.GetBiddingList);
  //     } else {
  //       Message.error(message);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // },

  // 更新竞价详情
  [ActionTypes.GetBiddingDetail](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    const { list = [] } = biddingList[biddingIndex] || {};
    let headId = "";
    if (biddingIndex > 1) {
      const { biddingHeadId = "" } = list[index] || {};
      headId = biddingHeadId;
    } else {
      const { id } = list[index] || {};
      headId = id;
    }
    commit(MutationTypes.UpdateBiddingDetail, { headId, biddingIndex });
    dispatch(ActionTypes.GetMouldBiddingDetail);
  },
  // 获取竞价单详情
  async [ActionTypes.GetMouldBiddingDetail](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { headId = "" } = biddingDetail || {};
      const { success, message, data }: any = await GetMouldBiddingDetail({ headId });
      if (success) {
        const { productInfos = [] } = data || {};
        const productInfoIndex = productInfos.length ? 0 : -1;
        const tempProductInfos = productInfos.map((v: any) => {
          if (v.productImage) {
            v.productImage = BASE_IMAGE_URL + v.productImage;
          }
          return v;
        });
        commit(MutationTypes.UpdateBiddingDetail, { ...(data || {}), productInfos: tempProductInfos, productInfoIndex, isShow: true, });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 切换产品列表
  // [ActionTypes.UpdateProductInfoIndex](store: Store, params: { type: number; index: number }) {
  //   const { state, dispatch, commit } = store;
  //   const { biddingDetail } = state;
  //   const { type, index } = params || {};
  //   const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
  //   if (productInfoIndex < 0) {
  //     return;
  //   }
  //   if (type === 1) {
  //     if (productInfoIndex < productInfos.length - 1) {
  //       commit(MutationTypes.UpdateBiddingDetail, { productInfoIndex: productInfoIndex + 1 });
  //     }
  //   } else if (type === 2) {
  //     if (productInfoIndex > 0) {
  //       commit(MutationTypes.UpdateBiddingDetail, { productInfoIndex: productInfoIndex - 1 });
  //     }
  //   } else if (type === 3) {
  //     commit(MutationTypes.UpdateBiddingDetail, { productInfoIndex: index });
  //   }
  // },
  // 更新竞价信息
  async [ActionTypes.JoinBidding](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { joinBiddingInfo, biddingState, headId } = biddingDetail || {}; 
      const { supplierBiddingId, amount, workPeriod } = joinBiddingInfo || {};
      let fn = null;
      if (biddingState === 1) {
        fn = await UpdateMouldBidding({ amount, id: supplierBiddingId, workPeriod });
      } else {
        fn = await JoinBidding({ amount, biddingHeadId: headId, workPeriod });
      }
      const { success, message, data }: any = fn;
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetBiddingList);
        dispatch(ActionTypes.GetMouldBiddingDetail);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 取消竞价
  async [ActionTypes.RemoveBidding](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { joinBiddingInfo, biddingState, headId } = biddingDetail || {}; 
      const { supplierBiddingId, amount, workPeriod } = joinBiddingInfo || {};
      const { success, message, data }: any = await RemoveBidding({ amount, biddingHeadId: headId, workPeriod });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetBiddingList);
        dispatch(ActionTypes.GetMouldBiddingDetail);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取竞价单二次工艺
  async [ActionTypes.GetTechnology](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
      const { id } = productInfos[productInfoIndex] || {};
      const { success, message, data }: any = await GetProductTechnology({ headId: id });
      if (success) {
        commit(MutationTypes.UpdateTechnology, { list: data || [], isShow: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取竞价单材料颜色
  async [ActionTypes.GetMaterialAndColor](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
      const { id } = productInfos[productInfoIndex] || {};
      const { success, message, data }: any = await GetMaterialAndColor({ headId: id });
      if (success) {
        commit(MutationTypes.UpdateMaterialAndColor, { ...(data || {}), isShow: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取合模方案
  async [ActionTypes.GetArrangementScheme](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
      const { id } = productInfos[productInfoIndex] || {};
      const { success, message, data }: any = await GetArrangementScheme({ orderMouldId: id });
      if (success) {
        const temp = data || {};
        const { matchedPlan } = temp || {};
        const { mouldLabeImage } = matchedPlan || {};
        let mouldLabeImages = mouldLabeImage ? mouldLabeImage.split(",") : [];
        if (mouldLabeImages.length) {
          mouldLabeImages = mouldLabeImages.map((v: string) => BASE_IMAGE_URL + v);
        }
        commit(MutationTypes.UpdateArrangementScheme, { ...temp, mouldLabeImages, isShow: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
}