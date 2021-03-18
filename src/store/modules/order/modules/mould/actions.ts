import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitOption } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
// import { getSessionStorage, setSessionStorage } from "@/utils/storage";

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
  
  // GetMachiningStepList,
  // GetInjectStepList,
  // FinishedMachiningStep,
  // FinishedInjectStep,
  // ConfirmMachiningFinished,
  // ConfirmInjectFinished,
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
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitOption) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitOption, params);
  },

  // 获取模具信息
  async [ActionTypes.GetMould](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { type, id, mouldProduceId } = initOption || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
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
      const { initOption } = state;
      const { mouldProduceId } = initOption || {};
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
        Message.error("请输入注塑交期");
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
        dispatch(ActionTypes.GetAllRepair);
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
      const { initOption, mould } = state;
      const { type, id } = initOption || {};
      const { index = -1 } = params || {};
      const { mouldProductList = [] } = mould || {};
      const { productId = "" } = mouldProductList[index] || {};
      const { success, message, data }: any = await NeedChangeDrawing({ productId });
      if (success) {
        dispatch(ActionTypes.GetMould);
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
      const { initOption, mould } = state;
      const { type, id } = initOption || {};
      const { opinion = -1, index = -1 } = params || {};
      const { mouldProductList = [] } = mould || {};
      const { productId = "" } = mouldProductList[index] || {};
      const { success, message, data }: any = await DfmApprovalDrawing({ productId, opinion });
      if (success) {
        dispatch(ActionTypes.GetMould);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
  // // 上传文件
  // async [ActionTypes.UploadForm](store: Store, params: any) {
  //   try {
  //     const { state, dispatch, commit } = store;
  //     const { reportList = [] } = state;
  //     const { file, index } = params || {};
  //     const { fileList } = reportList[index] || {};
  //     const formData = new FormData();
  //     formData.append("files", file);
  //     const { success, message, data }: any = await UploadForm(formData);
  //     if (success) {
  //       const { pics = [] } = data || {};
  //       const { filePath = "" } = pics[0];
  //       reportList[index].fileList = [...(fileList || []), filePath];
  //       commit(MutationTypes.UpdateReportList, reportList);
  //       commit(MutationTypes.UpdateTimestamp, new Date().getTime());
  //     } else {
  //       Message.error(message);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // },
  // // 删除图片
  // [ActionTypes.DeleteReportFile](store: Store, params: any) {
  //     const { state, dispatch, commit } = store;
  //     const { reportList = [] } = state;
  //     const { index, key } = params || {};
  //     reportList[index].fileList.splice(key, 1);
  //     commit(MutationTypes.UpdateReportList, reportList);
  // },

  // // 更新报告信息
  // [ActionTypes.UpdateReportData](store: Store, params: any) {
  //   const { state, dispatch, commit } = store;
  //   const { reportList = [] } = state;
  //   const { index, text, name, value } = params || {};
  //   if (text) {
  //     //@ts-ignore
  //     reportList[index][text][name] = value;
  //   } else {
  //     //@ts-ignore
  //     reportList[index][name] = value;
  //   }
  //   commit(MutationTypes.UpdateReportList, reportList);
  // },

  // // 提交DFM报告
  // async [ActionTypes.CommitReport](store: Store, params: any) {
  //   try {
  //     const { state, dispatch, commit } = store;
  //     const { reportList = [], initOption } = state;
  //     const { biddingId } = initOption || {};
  //     const { index } = params || {};
  //     const { describe, reportTitleId, fileList } = reportList[index] || {};
  //     if (!describe) {
  //       Message.error("请输入报告描述");
  //       return;
  //     }
  //     if (!fileList || !fileList.length) {
  //       Message.error("请上传图片");
  //       return;
  //     }
  //     const { success, message, data }: any = await CommitReport({ biddingId, describe, reportTitleId, images: fileList });
  //     if (success) {
  //       dispatch(ActionTypes.GetDfmReportList);
  //       // commit(MutationTypes.UpdateReportList, data || []);
  //     } else {
  //       Message.error(message);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // },

  // // 确认驳回DFM报告
  // async [ActionTypes.ApprovalDfmReport](store: Store, params: any) {
  //   try {
  //     const { state, dispatch, commit } = store;
  //     const { reportList = [], initOption } = state;
  //     const { type, biddingId } = initOption || {};
  //     const { index } = params || {};
  //     const { reportTitleId, approvalContent, opinion } = reportList[index] || {};
  //     if (opinion === 0 && !approvalContent) {
  //       Message.error("请输入驳回原因");
  //       return;
  //     }
  //     let fn = {};
  //     switch(type) {
  //       case Supplier.Dfm:
  //         // fn = await DfmApprovalDfmReport({ biddingId, approvalContent, reportTitleId, opinion });
  //         break;
  //       case Supplier.Machining:
  //         fn = await MachiningApprovalDfmReport({ biddingId, approvalContent, reportTitleId, opinion });
  //         break;
  //       case Supplier.Injection:
  //         fn = await InjectApprovalDfmReport({ biddingId, approvalContent, reportTitleId, opinion });
  //         break;
  //     }
  //     const { success, message, data }: any = fn;
  //     if (success) {
  //       dispatch(ActionTypes.GetDfmReportList);
  //       // commit(MutationTypes.UpdateReportList, data || []);
  //     } else {
  //       Message.error(message);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // },
  
}