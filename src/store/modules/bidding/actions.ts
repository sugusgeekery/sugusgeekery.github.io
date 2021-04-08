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
  GetMouldOrderType,
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
  GetMouldOrderType = "GetMouldOrderType",
  UpdateBiddingIndex = "UpdateBiddingIndex",
  GetBiddingList = "GetBiddingList",
  CaculateCountdown = "CaculateCountdown",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize",
  UpdateMinPrice = "UpdateMinPrice",
  UpdateMaxPrice = "UpdateMaxPrice",
  UpdatePayDate = "UpdatePayDate",
  UpdateUnit = "UpdateUnit",
  UpdateMouldTypes = "UpdateMouldTypes",
  UpdateProvinceCityCountry = "UpdateProvinceCityCountry",
  JoinBidding = "JoinBidding",
  RemoveBidding = "RemoveBidding",
  GetBiddingDetail = "GetBiddingDetail",
  UpdateProductInfoIndex = "UpdateProductInfoIndex",
  GetMouldBiddingDetail = "GetMouldBiddingDetail",
  GetTechnology = "GetTechnology",
  GetMaterialAndColor = "GetMaterialAndColor",
  GetArrangementScheme = "GetArrangementScheme",
  GetProductInfo = "GetProductInfo",
}

export default {
  // 初始化模块默认值
  [ActionTypes.Init](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, { ...(params || {}) });
  },

  // 获取订单类型筛选项
  async [ActionTypes.GetMouldOrderType](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingIndex = 0, biddingList = [] } = state;
      const { type = 0, pageNum = 1, pageSize = 10 } = biddingList[biddingIndex] || {}; 
      const { success, message, data }: any = await GetMouldOrderType();
      if (success) {
        const projectList = (list => {
          const arr = [
            // {
            //   text: "项目类型",
            //   type: "",
            // },
          ];
          for (const [a, b] of list.entries()) {
            const { index, label } = b;
            arr.push({ text: label, type: index });
          }
          return arr;
        })(data || {});
        biddingList[biddingIndex].mouldTypes = [];
        biddingList[biddingIndex].projectIndex = projectList.length ? 0 : -1;
        biddingList[biddingIndex].projectList = projectList;
        commit(MutationTypes.UpdateBiddingList, biddingList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 更新竞价导航下标
  [ActionTypes.UpdateBiddingIndex](store: Store, biddingIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBiddingIndex, biddingIndex);
    dispatch(ActionTypes.GetMouldOrderType);
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 获取竞价导航列表
  async [ActionTypes.GetBiddingList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingIndex = 0, biddingList = [] } = state;
      const { type = 0, pageNum = 1, pageSize = 10 } = biddingList[biddingIndex] || {}; 
      let fn = null;
      if (biddingIndex === 0 || biddingIndex === 1) {
        const { mouldTypes, minPrice, maxPrice, payDate, unit } = biddingList[biddingIndex] || {};
        fn = await GetSelectByUser({ type, pageNum, pageSize, workPeriod: payDate, minAmount: minPrice, maxAmount: maxPrice, mouldTypes: mouldTypes && mouldTypes.join(","), unit });
      } else if (biddingIndex === 2 || biddingIndex === 3) {
        fn = await GetSelectMyBidding({ type, pageNum, pageSize });
      }
      const { success, message, data }: any = fn;
      if (success) {
        const { list = [], total = 0 } = data || {};
        biddingList[biddingIndex].list = list;
        biddingList[biddingIndex].total = Number(total);
        commit(MutationTypes.UpdateBiddingList, biddingList);
        dispatch(ActionTypes.CaculateCountdown);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 计算倒计时
  [ActionTypes.CaculateCountdown](store: Store, isCountdown: boolean = true) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    const { type = 0, pageNum = 1, pageSize = 10, setTimeInterval } = biddingList[biddingIndex] || {}; 
    if (biddingIndex === 0 || biddingIndex === 1) {
      const { list = [] } = biddingList[biddingIndex] || {};
      if (list.length) {
        const fn = (ls: any) => {
          if (ls && ls.length) {
            for (const [a, b] of ls.entries()) {
              const { termTime } = b;
              ls[a].countdown = { 
                isTimeout: false,
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                minute: 0,
                second: 0,
              };
              if (termTime) {
                const time = termTime.replace("-", "/");
                const remainSeconds = (new Date(time).getTime() - new Date().getTime()) / 1000;
                const timeNumber = Math.abs(remainSeconds);
                ls[a].countdown.isTimeout = remainSeconds < 0;
                if (remainSeconds < 0) {
                  continue;
                }
                // 多少年
                ls[a].countdown.year = Math.floor(timeNumber / (60 * 60 * 24 * 365));
                // 多少月
                ls[a].countdown.month = Math.floor(timeNumber / (60 * 60 * 24 * 30));
                // 多少天
                ls[a].countdown.day = Math.floor(timeNumber / (60 * 60 * 24));
                ls[a].countdown.hour = Math.floor((timeNumber % (60 * 60 * 24)) / (60 * 60));
                ls[a].countdown.minute = Math.floor((timeNumber % (60 * 60)) / 60);
                ls[a].countdown.second = Math.floor((timeNumber % (60 * 1)) / 1);
                // console.log(ls[a].countdown.day, ls[a].countdown.hour, ls[a].countdown.minute, ls[a].countdown.second);
              }
            }
          }
          biddingList[biddingIndex].list = JSON.parse(JSON.stringify(ls));
          commit(MutationTypes.UpdateBiddingList, biddingList);
        };
        fn(list);
        if (setTimeInterval) {
          clearInterval(setTimeInterval);
        }
        if (isCountdown) {
          const setTimeIntervalTemp = setInterval(() => {
            fn(list);
          }, 1000);
          biddingList[biddingIndex].setTimeInterval = setTimeIntervalTemp;
          commit(MutationTypes.UpdateBiddingList, biddingList);
        }
      } else {
        if (setTimeInterval) {
          clearInterval(setTimeInterval);
        }
      }
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
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航最多价格
  [ActionTypes.UpdateMaxPrice](store: Store, maxPrice: string | number) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].maxPrice = Number(maxPrice);
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航交付日期
  [ActionTypes.UpdatePayDate](store: Store, payDate: string) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].payDate = payDate;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航交付日期单位
  [ActionTypes.UpdateUnit](store: Store, label: string) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    const { units = [] } = biddingList[biddingIndex] || {};
    const fn = (ls: Array<any>, name: string, str: string, value: string) => {
      if (ls.length) {
        for (const v of ls) {
          if (v[name] === str) {
            return v[value];
          }
        }
      }
      return "";
    };
    biddingList[biddingIndex].unit = fn(units, "label", label, "value");
    biddingList[biddingIndex].unitDes = label;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航项目类型
  [ActionTypes.UpdateMouldTypes](store: Store, mouldTypes: string[]) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].mouldTypes = mouldTypes;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新竞价导航交付地区
  [ActionTypes.UpdateProvinceCityCountry](store: Store, provinceCityCountry: string[]) {
    const { state, dispatch, commit } = store;
    const { biddingIndex = 0, biddingList = [] } = state;
    biddingList[biddingIndex].provinceCityCountry = provinceCityCountry;
    commit(MutationTypes.UpdateBiddingList, biddingList);
    dispatch(ActionTypes.UpdatePageNum, 1);
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
            v.productImageFull = BASE_IMAGE_URL + v.productImage;
          }
          if (v.fileUrl) {
            v.fileUrlFull = BASE_IMAGE_URL + v.fileUrl;
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
      const { orderMouldId } = productInfos[productInfoIndex] || {};
      const { success, message, data }: any = await GetArrangementScheme({ orderMouldId });
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

  // 获取产品详情
  [ActionTypes.GetProductInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { biddingDetail } = state;
      const { productInfoIndex = -1, productInfos = [] } = biddingDetail || {};
      const productInfo = productInfos[productInfoIndex] || {};
      commit(MutationTypes.UpdateProductInfo, { ...productInfo, isShow: true });
      // const { success, message, data }: any = await GetArrangementScheme({ orderMouldId: id });
      // if (success) {
      //   const temp = data || {};
      //   const { matchedPlan } = temp || {};
      //   const { mouldLabeImage } = matchedPlan || {};
      //   let mouldLabeImages = mouldLabeImage ? mouldLabeImage.split(",") : [];
      //   if (mouldLabeImages.length) {
      //     mouldLabeImages = mouldLabeImages.map((v: string) => BASE_IMAGE_URL + v);
      //   }
      //   commit(MutationTypes.UpdateArrangementScheme, { ...temp, mouldLabeImages, isShow: true });
      // } else {
      //   Message.error(message);
      // }
    } catch (e) {
      throw new Error(e);
    }
  },
  
}