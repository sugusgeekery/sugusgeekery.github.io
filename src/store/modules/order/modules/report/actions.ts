import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitOption } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  UploadForm
} from "@/api";
import {
  GetDfmReportList,
  GetMachiningDfmReportList,
  GetInjectDfmReportList,
  CommitReport,
  MachiningApprovalDfmReport,
  InjectApprovalDfmReport,
} from "@/api/order/report";

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
  GetDfmReportList = "GetDfmReportList",
  UploadForm = "UploadForm",
  DeleteReportFile = "DeleteReportFile",
  UpdateReportData = "UpdateReportData",
  CommitReport = "CommitReport",
  ApprovalDfmReport = "ApprovalDfmReport"
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitOption) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitOption, params);
  },

  // 获取DFM报告或验收列表
  async [ActionTypes.GetDfmReportList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { type, id } = initOption || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
        case Supplier.Design:
          fn = await GetDfmReportList({ supplierOrderId: id });
          break;
        case Supplier.Machining:
          fn = await GetMachiningDfmReportList({ supplierOrderId: id });
          break;
        case Supplier.Injection:
          fn = await GetInjectDfmReportList({ supplierOrderId: id });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        commit(MutationTypes.UpdateReportList, data || []);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
  // 上传文件
  async [ActionTypes.UploadForm](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { reportList = [] } = state;
      const { file, index } = params || {};
      const { fileList } = reportList[index] || {};
      const formData = new FormData();
      formData.append("files", file);
      const { success, message, data }: any = await UploadForm(formData);
      if (success) {
        const { pics = [] } = data || {};
        const { filePath = "", fileName, id } = pics[0];
        reportList[index].fileList = [...(fileList || []), { filePath, fileName, id }];
        commit(MutationTypes.UpdateReportList, reportList);
        commit(MutationTypes.UpdateTimestamp, new Date().getTime());
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 删除图片
  [ActionTypes.DeleteReportFile](store: Store, params: any) {
      const { state, dispatch, commit } = store;
      const { reportList = [] } = state;
      const { index, key } = params || {};
      reportList[index].fileList.splice(key, 1);
      commit(MutationTypes.UpdateReportList, reportList);
  },

  // 更新报告信息
  [ActionTypes.UpdateReportData](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { reportList = [] } = state;
    const { index, text, name, value } = params || {};
    if (text) {
      //@ts-ignore
      reportList[index][text][name] = value;
    } else {
      //@ts-ignore
      reportList[index][name] = value;
    }
    commit(MutationTypes.UpdateReportList, JSON.parse(JSON.stringify(reportList)));
  },

  // 提交DFM报告
  async [ActionTypes.CommitReport](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { reportList = [], initOption } = state;
      const { id } = initOption || {};
      const { index } = params || {};
      const { describe, reportTitleId, fileList } = reportList[index] || {};
      const images = (fileList => {
        const images = [];
        for (const v of fileList) {
          const { id } = v;
          if (id) {
            images.push(id);
          }
        }
        return images;
      })(fileList);
      if (!describe) {
        Message.error("请输入报告描述");
        return;
      }
      if (!images || !images.length) {
        Message.error("请上传图片");
        return;
      }
      const { success, message, data }: any = await CommitReport({ supplierOrderId: id, describe, reportTitleId, images });
      if (success) {
        dispatch(ActionTypes.GetDfmReportList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 确认驳回DFM报告
  async [ActionTypes.ApprovalDfmReport](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { reportList = [], initOption } = state;
      const { type, id } = initOption || {};
      const { index } = params || {};
      const { biddingTitleId, machiningApprovalInfo, injectionApprovalInfo } = reportList[index] || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          break;
        case Supplier.Machining:
          if (machiningApprovalInfo.opinion === 0 && !machiningApprovalInfo.approvalContent) {
            Message.error("请输入驳回原因");
            return;
          }
          fn = await MachiningApprovalDfmReport({ supplierOrderId: id, approvalContent: machiningApprovalInfo.approvalContent, biddingTitleId, opinion: machiningApprovalInfo.opinion });
          break;
        case Supplier.Injection:
          if (injectionApprovalInfo.opinion === 0 && !injectionApprovalInfo.approvalContent) {
            Message.error("请输入驳回原因");
            return;
          }
          fn = await InjectApprovalDfmReport({ supplierOrderId: id, approvalContent: injectionApprovalInfo.approvalContent, biddingTitleId, opinion: injectionApprovalInfo.opinion });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        dispatch(ActionTypes.GetDfmReportList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
}