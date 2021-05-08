import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitInfo } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox, Slider } from "element-ui";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";
import { BASE_IMAGE_URL } from "@/config";

import {
  GetDfmReportList,
  GetMachiningDfmReportList,
  GetInjectDfmReportList,
  CommitReport,
  SaveReport,
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
  DeleteReportFile = "DeleteReportFile",
  DeleteReportApprovalFile = "DeleteReportApprovalFile",
  UpdateReportData = "UpdateReportData",
  CommitReport = "CommitReport",
  ApprovalDfmReport = "ApprovalDfmReport",
  GetReasonContent = "GetReasonContent",
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取DFM报告或验收列表
  async [ActionTypes.GetDfmReportList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, id } = initInfo || {};
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
        const reportList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { required, fileList = [], machiningApprovalInfo, injectionApprovalInfo } = b;
            ls[a]["required"] = !!required;
            // if (fileList && fileList.length) {
            //   ls[a]["fileListUrl"] = (l => {
            //     const arr = [];
            //     for (const v of l) {
            //       const { filePath } = v;
            //       if (filePath) {
            //         arr.push(BASE_IMAGE_URL + filePath);
            //       }
            //     }
            //     return arr;
            //   })(fileList);
            // }
            // if (machiningApprovalInfo) {
            //   const { approvalFiles = [] } = machiningApprovalInfo || {};
            //   if (approvalFiles && approvalFiles.length) {
            //     ls[a].machiningApprovalInfo["approvalFilesUrl"] = (l => {
            //       const arr = [];
            //       for (const v of l) {
            //         const { filePath } = v;
            //         if (filePath) {
            //           arr.push(BASE_IMAGE_URL + filePath);
            //         }
            //       }
            //       return arr;
            //     })(approvalFiles);
            //   }
            // }
            // if (injectionApprovalInfo) {
            //   const { approvalFiles = [] } = injectionApprovalInfo || {};
            //   if (approvalFiles && approvalFiles.length) {
            //     ls[a].injectionApprovalInfo["approvalFilesUrl"] = (l => {
            //       const arr = [];
            //       for (const v of l) {
            //         const { filePath } = v;
            //         if (filePath) {
            //           arr.push(BASE_IMAGE_URL + filePath);
            //         }
            //       }
            //       return arr;
            //     })(approvalFiles);
            //   }
            // }
          }
          return ls;
        })(data || []);
        commit(MutationTypes.UpdateReportList, reportList);
        return;
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
      // reportList[index].fileListUrl.splice(key, 1);
      commit(MutationTypes.UpdateReportList, reportList);
  },
  // 删除审核图片
  [ActionTypes.DeleteReportApprovalFile](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { reportList = [], initInfo } = state;
    const { type } = initInfo || {};
    const { index, text, name, key } = params || {};
    switch(type) {
      case Supplier.Dfm:
        break;
      case Supplier.Machining:
        reportList[index].machiningApprovalInfo.approvalFiles.splice(key, 1);
        reportList[index].machiningApprovalInfo.approvalFilesUrl.splice(key, 1);
        break;
      case Supplier.Injection:
        reportList[index].injectionApprovalInfo.approvalFiles.splice(key, 1);
        reportList[index].injectionApprovalInfo.approvalFilesUrl.splice(key, 1);
        break;
    }
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
      const { reportList = [], initInfo } = state;
      const { id } = initInfo || {};
      const { type } = params || {};
      const dfmReportInfoList = [];
      if (reportList && reportList.length) {
        for (const [a, b] of reportList.entries()) {
          const { describe, reportTitleId, fileList = [], required } = b;
          const images = (fileList => {
            const images = [];
            if (fileList && fileList.length) {
              for (const v of fileList) {
                const { fileId } = v;
                if (fileId) {
                  images.push(fileId);
                }
              }
            }
            return images;
          })(fileList);
          if (type === 2 && !required) {
            if (!describe) {
              Message.error("请输入报告描述");
              return;
            }
            if (!images || !images.length) {
              Message.error("请上传图片");
              return;
            }
          }
          dfmReportInfoList.push({ reportTitleId, required: Number(!required), images, describe })
        }
      }

      // const { describe, reportTitleId, fileList } = reportList[index] || {};
      // const images = (fileList => {
      //   const images = [];
      //   for (const v of fileList) {
      //     const { fileId } = v;
      //     if (fileId) {
      //       images.push(fileId);
      //     }
      //   }
      //   return images;
      // })(fileList);
      // if (!describe) {
      //   Message.error("请输入报告描述");
      //   return;
      // }
      // if (!images || !images.length) {
      //   Message.error("请上传图片");
      //   return;
      // }
      let fn = null;
      switch(type) {
        case 1:
          fn = await SaveReport({ supplierOrderId: id, dfmReportInfoList });
          break;
        case 2:
          fn = await CommitReport({ supplierOrderId: id, dfmReportInfoList });
          break;
    }
      const { success, message, data }: any = fn;
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetDfmReportList);
        dispatch("order/GetCountdown", null, { root: true });
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
      const { reportList = [], initInfo } = state;
      const { type, id } = initInfo || {};
      const { index } = params || {};
      const { reportId, machiningApprovalInfo, injectionApprovalInfo } = reportList[index] || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          break;
        case Supplier.Machining:
          if (machiningApprovalInfo.opinion === 0 && !machiningApprovalInfo.approvalContent) {
            Message.error("请输入驳回原因");
            return;
          }
          fn = await MachiningApprovalDfmReport({ 
            approvalContent: machiningApprovalInfo.approvalContent, 
            dfmReportId: reportId, 
            opinion: machiningApprovalInfo.opinion,
            approvalFileIds: (ls => {
              const arr = [];
              if (ls && ls.length) {
                for (const v of ls) {
                  const { fileId } = v;
                  if (fileId) {
                    arr.push(fileId);
                  }
                }
              }
              return arr;
            })(machiningApprovalInfo.approvalFiles)
          });
          break;
        case Supplier.Injection:
          if (injectionApprovalInfo.opinion === 0 && !injectionApprovalInfo.approvalContent) {
            Message.error("请输入驳回原因");
            return;
          }
          fn = await InjectApprovalDfmReport({ 
            approvalContent: injectionApprovalInfo.approvalContent,
            dfmReportId: reportId, 
            opinion: injectionApprovalInfo.opinion,
            approvalFileIds: (ls => {
              const arr = [];
              if (ls && ls.length) {
                for (const v of ls) {
                  const { fileId } = v;
                  if (fileId) {
                    arr.push(fileId);
                  }
                }
              }
              return arr;
            })(injectionApprovalInfo.approvalFiles)
          });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetDfmReportList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  [ActionTypes.GetReasonContent](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { approvalContent = "", approvalFiles = [] } = params || {};
    const content = approvalContent;
    const fileList = (l => {
      const arr = [];
      if (l && l.length) {
        for (const v of l) {
          const { filePath } = v;
          if (filePath) {
            arr.push({ ...v, filePath: BASE_IMAGE_URL + filePath });
          }
        }
      }
      return arr;
    })(approvalFiles)
    commit(MutationTypes.UpdateReasonContent, { isShow: true, content, fileList });
  }
  
}