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
  GetMachiningStepList,
  GetInjectStepList,
  FinishedMachiningStep,
  FinishedInjectStep,
  ConfirmMachiningFinished,
  ConfirmInjectFinished,
} from "@/api/order/process";

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
  GetStepList = "GetStepList",
  UploadForm = "UploadForm",
  DeleteStepFile = "DeleteStepFile",
  FinishStep = "FinishStep",
  CommitStep = "CommitStep",

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

  // 获取流程步骤
  async [ActionTypes.GetStepList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { type, biddingId } = initOption || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          // fn = await GetDfmReportList({ biddingId });
          break;
        case Supplier.Machining:
          fn = await GetMachiningStepList({ biddingId });
          break;
        case Supplier.Injection:
          fn = await GetInjectStepList({ biddingId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        const stepList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { filePath } = b;
            ls[a].fileList = filePath ? [{ filePath }] : [];
          }
          return ls;
        })(data || []);
        commit(MutationTypes.UpdateStepList, stepList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 提交单个步骤
  async [ActionTypes.FinishStep](store: Store, index: number) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption, stepList = [] } = state;
      const { type, biddingId } = initOption || {};
      const { stepId, fileList } = stepList[index] || {};
      const { fileId } = fileList[0] || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          // fn = await GetDfmReportList({ biddingId });
          break;
        case Supplier.Machining:
          fn = await FinishedMachiningStep({ biddingId, fileId, stepId });
          break;
        case Supplier.Injection:
          fn = await FinishedInjectStep({ biddingId, fileId, stepId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        dispatch(ActionTypes.GetStepList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 提交最终步骤
  async [ActionTypes.CommitStep](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { type, biddingId } = initOption || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          // fn = await GetDfmReportList({ biddingId });
          break;
        case Supplier.Machining:
          fn = await ConfirmMachiningFinished({ biddingId});
          break;
        case Supplier.Injection:
          fn = await ConfirmInjectFinished({ biddingId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        dispatch(ActionTypes.GetStepList);
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
      const { stepList = [] } = state;
      const { file, index } = params || {};
      const { fileList } = stepList[index] || {};
      const formData = new FormData();
      formData.append("files", file);
      const { success, message, data }: any = await UploadForm(formData);
      if (success) {
        const { pics = [] } = data || {};
        const { filePath = "", id = "" } = pics[0];
        stepList[index].fileList = [...(fileList || []), { filePath, fileId: id }];
        console.log(stepList[index].fileList)
        commit(MutationTypes.UpdateStepList, stepList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 删除图片
  [ActionTypes.DeleteStepFile](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { stepList = [] } = state;
    const { index, key } = params || {};
    stepList[index].fileList.splice(key, 1);
    commit(MutationTypes.UpdateStepList, stepList);
  },
}