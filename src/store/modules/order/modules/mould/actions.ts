import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitInfo } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";
import { BASE_IMAGE_URL } from "@/config";

import {
  UploadForm
} from "@/api";
import {
  GetProducts,
  NeedChangeDrawing,
  DfmApprovalDrawing,
  GetMouldDetail,
  GetAllRepair,
  CommitRepairMould,
  GetArrangementScheme,
} from "@/api/order/mould";

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
  GetMould = "GetMould",
  NeedChangeDrawing = "NeedChangeDrawing",
  DfmApprovalDrawing = "DfmApprovalDrawing",
  GetAllRepair = "GetAllRepair",
  UpdateRepairMould = "UpdateRepairMould",
  CommitRepairMould = "CommitRepairMould",
  GetArrangementScheme = "GetArrangementScheme",
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取模具信息
  async [ActionTypes.GetMould](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, id, mouldProduceId } = initInfo || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
        case Supplier.Design:
          fn = await GetProducts({ orderId: id });
          break;
        case Supplier.Machining:
          fn = await GetMouldDetail({ mouldProduceId });
          break;
        case Supplier.Injection:
          // fn = await GetInjectStepList({ biddingId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        commit(MutationTypes.UpdateMould, data || {});
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取修模列表
  async [ActionTypes.GetAllRepair](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo || {};
      const { success, message, data }: any = await GetAllRepair({ mouldProduceId });
      if (success) {
        const repairMouldList = data || [];
        commit(MutationTypes.UpdateRepairMouldList, repairMouldList);
        commit(MutationTypes.UpdateRepairMouldIndex, repairMouldList.length - 1);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新修模数据
  [ActionTypes.UpdateRepairMould](store: Store, params: { key: string; value: number | string; }) {
    const { state, dispatch, commit } = store;
    const { repairMouldIndex, repairMouldList } = state;
    const { key, value } = params || {};
    repairMouldList[repairMouldIndex][key] = value;
    commit(MutationTypes.UpdateRepairMouldList, repairMouldList);
  },
  // 提交修模信息
  async [ActionTypes.CommitRepairMould](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { mould, repairMouldIndex, repairMouldList } = state;
      const { mouldId } = mould || {};
      const { repairAmount, repairDeliveryDays, planDesignTime, machinTime, injectionTime } = repairMouldList[repairMouldIndex] || {};
      if (!repairAmount) {
        Message.error("请输入修模报价");
        return;
      }
      if (!repairDeliveryDays) {
        Message.error("请输入修模交期");
        return;
      }
      if (!planDesignTime) {
        Message.error("请输入设计交期");
        return;
      }
      if (!machinTime) {
        Message.error("请输入加工交期");
        return;
      }
      if (!injectionTime) {
        Message.error("请输入试模交期");
        return;
      }
      const { success, message, data }: any = await CommitRepairMould({ 
        mouldId, 
        amount: repairAmount, 
        repairDeliveryDays, 
        planDesignDays: planDesignTime, 
        machinDays: machinTime, 
        injectionDays: injectionTime
      });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetAllRepair);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 更新图纸
  async [ActionTypes.NeedChangeDrawing](store: Store, params: { opinion: number; index: number }) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, mould } = state;
      const { type, id } = initInfo || {};
      const { index = -1 } = params || {};
      const { mouldProductList = [] } = mould || {};
      const { productId = "" } = mouldProductList[index] || {};
      const { success, message, data }: any = await NeedChangeDrawing({ productId });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetMould);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 确认驳回图纸
  async [ActionTypes.DfmApprovalDrawing](store: Store, params: { opinion: number; index: number }) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, mould } = state;
      const { type, id } = initInfo || {};
      const { opinion = -1, index = -1 } = params || {};
      const { mouldProductList = [] } = mould || {};
      const { productId = "" } = mouldProductList[index] || {};
      const { success, message, data }: any = await DfmApprovalDrawing({ productId, opinion });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetMould);
        dispatch("order/GetCountdown", null, { root: true });
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
      const { mould } = state;
      const { mouldId } = mould || {};
      const { success, message, data }: any = await GetArrangementScheme({ orderMouldId: mouldId });
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