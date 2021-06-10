import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State, InitInfo } from "./state";
import { Supplier } from "../../state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { ElMessage } from "element-plus";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";
import { BASE_IMAGE_URL } from "@/config";

import {
  UploadForm
} from "@/api";
import {
  GetPlanDesignRealtime,
  GetMachinRealtime,
  GetInjectionRealtime,
  GetHotRunnerRealtime,
  CommitThreeFaceDesign,
  CommitHotRunner,
  ApprovalThreeFaceDesign,
  ApprovalHotRunner,
  GetApprovalFilePath,
  GetBOMInfo,
  ImportBom,
  ImportBomImage,
  SaveBomList,
  ApprovalBom,
  ApprovalBomImage,
} from "@/api/order/design";

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
  GetDesignList = "GetDesignList",
  UpdateVersionIndex = "UpdateVersionIndex",
  UpdateOpinion = "UpdateOpinion",
  UpdateCause = "UpdateCause",
  AddReasonFile = "AddReasonFile",
  DeleteReasonFile = "DeleteReasonFile",
  UpdateFileList = "UpdateFileList",
  CommitFile = "CommitFile",
  ApprovalDesign = "ApprovalDesign",
  GetApprovalFilePath = "GetApprovalFilePath",
  UpdateBOMInfo = "UpdateBOMInfo",
  UpdateReasonIndex = "UpdateReasonIndex",
  UpdateNavIndex = "UpdateNavIndex",
  UpdateBOMInfoPageSize = "UpdateBOMInfoPageSize",
  UpdateBOMInfoPageNum = "UpdateBOMInfoPageNum",
  GetBOMInfo = "GetBOMInfo",
  ImportBom = "ImportBom",
  ImportBomImage = "ImportBomImage",
  SaveBomList = "SaveBomList",
  ApprovalBomImage = "ApprovalBomImage",
  ApprovalBom = "ApprovalBom",
  GetReasonContent = "GetReasonContent",
  GetConfirmModel = "GetConfirmModel",
  ClearConfirmModel = "ClearConfirmModel",
  UpdateConfirmModel = "UpdateConfirmModel",
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取当前进度详情
  async [ActionTypes.GetDesignList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, mouldProduceId } = initInfo;
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          break;
        case Supplier.Design:
          fn = await GetPlanDesignRealtime({ mouldProduceId })
          break;
        case Supplier.Machining:
          fn = await GetMachinRealtime({ mouldProduceId });
          break;
        case Supplier.Injection:
          fn = await GetInjectionRealtime({ mouldProduceId });
          break;
        case Supplier.Hotrunner:
          fn = await GetHotRunnerRealtime({ mouldProduceId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        const { stepInfoList = [], canUse, fileInfoFor3DList, fileInfoForHotList, hotRunnerInfoList, mouldProduceId } = data || {};
        const designList = [];
        // uploadType: 0:默认不显示无状态；1：初始可上传；2：审核中不可上传可查看；3：驳回可更新：4：已上传未提交暂存状态；10：未上传文件，提示信息；11：审核方审核中；12：审核方只可查看
        // uploadHotrunnerType: 0:默认不显示无状态；1：初始可上传；2：审核中不可上传可查看；10：未上传文件，提示信息；11：审核方审核中；12：审核方只可查看
        // uploadHotrunner3dType: 0:默认不显示无状态；1：初始可上传；2：审核中不可上传可查看；3：驳回可更新：4：已上传未提交暂存状态；10：未上传文件，提示信息；11：审核方审核中；12：审核方只可查看
        switch(type) {
          case Supplier.Dfm:
            break;
          case Supplier.Design: {
              if (stepInfoList && stepInfoList.length) {
                for (const [a, b] of stepInfoList.entries()) {
                  const { 
                    approvalInfoList,
                    fileId,
                    fileName,
                    filePath,
                    updateTime,
                    version,
                    approveStatus, 
                    canUse, 
                    hotRunner, 
                    update3D, 
                    versionInfoList, 
                    hotRunnerInfoList, 
                    hotRunnerVersionInfoList, 
                    stepId 
                  } = b;
                  stepInfoList[a].title = stepId === "1" ? "上传3D图纸方案" : stepId === "2" ? "导入BOM表" : "--";
                  stepInfoList[a].ext = stepId === "1" ? "(.stp文件)" : stepId === "2" ? "(.xls文件)" : "--";
                  stepInfoList[a].versionInfoList = versionInfoList?.length ? versionInfoList : [];
                  stepInfoList[a].hotRunnerInfoList = hotRunnerInfoList?.length ?  hotRunnerInfoList : [];
                  stepInfoList[a].hotRunnerVersionInfoList = hotRunnerVersionInfoList?.length ? hotRunnerVersionInfoList : [];
                  stepInfoList[a].fileList = [];
                  stepInfoList[a].hotRunnerFileList = [];
                  stepInfoList[a].hotRunner3dFileList = [];

                  // 操作3d文件
                  stepInfoList[a].uploadType = 
                    // 不可操作
                    canUse === 0 ? 0
                    // 是否需要更新3D图纸
                    : update3D === 1 ? 3
                    // 有热流道
                    : hotRunnerInfoList?.length > 0 ? 0
                    // 未提交且有文件信息（已暂存）
                    : (approveStatus === 0 && fileId) ? 4
                    // 未提交
                    : approveStatus === 0 ? 1 
                    // 审核中
                    : approveStatus === 1 ? 2 
                    // 已驳回
                    : approveStatus === 2 ? 3 
                    // 已通过
                    : approveStatus === 3 ? 0
                    // 其他情况默认为无状态
                    : 0;

                  if (!(hotRunnerInfoList?.length > 0) && fileId) {
                    stepInfoList[a].versionInfoList.push({
                      allApprovalInfoList: approvalInfoList,
                      fileId,
                      fileName,
                      filePath,
                      updateTime,
                      version,
                      approveStatus, 
                    })
                  }
                  if (stepInfoList[a].versionInfoList && stepInfoList[a].versionInfoList.length) {
                    for (const [c, d] of stepInfoList[a].versionInfoList.entries()) {
                      const { allApprovalInfoList, approveStatus = -1 } = d;
                      stepInfoList[a].versionInfoList[c].approveStatus = approveStatus;
                      stepInfoList[a].versionInfoList[c].allApprovalInfoList = ((allApprovalInfoList) => {
                        const arr: any = [];
                        const temp: any = new Map();
                        for (const [a, b] of allApprovalInfoList.entries()) {
                          temp.set(b.type, { ...b, editType: 0, reasonFiles: [] });
                        }

                        // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                        if (!temp.get("1")) {
                          temp.set("1", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "1",
                            version: 0,
                            reasonFiles: [],
                          })
                        }
                        if (!temp.get("2")) {
                          temp.set("2", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "2",
                            version: 0,
                            reasonFiles: [],
                          })
                        }

                        for (const [a, b] of temp.entries()) {
                          if (b) {
                            arr.push(b);
                          }
                        }
                        return arr;
                      })(allApprovalInfoList || []);
                    }
                  }

                  // 操作热流道图纸
                  stepInfoList[a].uploadHotrunnerType = 
                    // 无需热流道
                    hotRunner === 0 ? 0
                    // 没有热流道图纸
                    : hotRunnerInfoList?.length === 0 ? 10
                    // 有热流道图纸
                    : 11;

                  if (hotRunnerInfoList && hotRunnerInfoList.length) {
                    for (const [c, d] of hotRunnerInfoList.entries()) {
                      const { opinion, cause, approvalFileId } = d;
                      stepInfoList[a].hotRunnerInfoList[c].allApprovalInfoList = [
                        {
                          type: "0",
                          cause,
                          opinion: opinion === 0 ? 0 : opinion === 1 ? null : opinion === 2 ? 1 : -1,
                          opinionDesc: "",
                          approvalTime: "",
                          approvalIds: approvalFileId,
                          editType: opinion === 1 ? 1 : 0,
                          reasonFiles: []
                        }
                      ];
                      if (hotRunner === 1 && c === hotRunnerInfoList.length - 1) {
                        stepInfoList[a].hotRunnerInfoList[c].approveStatus = opinion === 0 ? 2 : opinion === 1 ? 3 : opinion === null ? 1 : 0;
                      } else {
                        stepInfoList[a].hotRunnerInfoList[c].approveStatus = -1;
                      }
                    }
                  }

                  // 操作含热流道图纸的3d文件
                  stepInfoList[a].uploadHotrunner3dType = 
                    // 没有热流道
                    hotRunner === 0 ? 0
                    // 是否需要更新3D图纸含热流道
                    : update3D === 1 ? 3
                    // 没有热流道图纸
                    : hotRunnerInfoList?.length === 0 ? 0
                    // 未提交且有3D含热流道图纸（已暂存）
                    : approveStatus === 0 && fileId ? 4
                    // 未提交
                    : approveStatus === 0 ? 1 
                    // 审核中
                    : approveStatus === 1 ? 2 
                    // 已驳回
                    : approveStatus === 2 ? 3 
                    // 已通过
                    : approveStatus === 3 ? 2
                    // 其他默认只可查看
                    : 2;

                  if (hotRunnerInfoList?.length > 0 && fileId) {
                    stepInfoList[a].hotRunnerVersionInfoList.push({
                      allApprovalInfoList: approvalInfoList,
                      fileId,
                      fileName,
                      filePath,
                      updateTime,
                      version,
                      approveStatus, 
                    })
                  }
                  if (stepInfoList[a].hotRunnerVersionInfoList && stepInfoList[a].hotRunnerVersionInfoList.length) {
                    for (const [c, d] of stepInfoList[a].hotRunnerVersionInfoList.entries()) {
                      const { allApprovalInfoList, approveStatus = -1 } = d;
                      stepInfoList[a].hotRunnerVersionInfoList[c].approveStatus = approveStatus;
                      stepInfoList[a].hotRunnerVersionInfoList[c].allApprovalInfoList = ((allApprovalInfoList) => {
                        const arr: any = [];
                        const temp: any = new Map();
                        for (const [a, b] of allApprovalInfoList.entries()) {
                          temp.set(b.type, { ...b, editType: 0, reasonFiles: [] });
                        }

                        // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                        if (!temp.get("1")) {
                          temp.set("1", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "1",
                            version: 0,
                            reasonFiles: [],
                          })
                        }
                        if (!temp.get("2")) {
                          temp.set("2", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "2",
                            version: 0,
                            reasonFiles: [],
                          })
                        }

                        for (const [a, b] of temp.entries()) {
                          if (b) {
                            arr.push(b);
                          }
                        }
                        return arr;
                      })(allApprovalInfoList || []);
                    }
                  }
                  stepInfoList[a].versionInfoIndex = stepInfoList[a].versionInfoList?.length ? stepInfoList[a].versionInfoList.length - 1 : -1;
                  stepInfoList[a].hotRunnerInfoIndex = stepInfoList[a].hotRunnerInfoList?.length ?  stepInfoList[a].hotRunnerInfoList.length - 1 : -1;
                  stepInfoList[a].hotRunnerVersionInfoIndex = stepInfoList[a].hotRunnerVersionInfoList?.length ? stepInfoList[a].hotRunnerVersionInfoList.length - 1 : -1;
                }
                designList.push(...stepInfoList);
              }
            }
            break;
          case Supplier.Machining: {
              if (stepInfoList && stepInfoList.length) {
                for (const [a, b] of stepInfoList.entries()) {
                  const { 
                    approvalInfoList,
                    fileId,
                    fileName,
                    filePath,
                    updateTime,
                    version,
                    approveStatus, 
                    canUse, 
                    hotRunner, 
                    update3D, 
                    versionInfoList, 
                    hotRunnerInfoList, 
                    hotRunnerVersionInfoList, 
                    stepId 
                  } = b;
                  stepInfoList[a].title = stepId === "1" ? "审核3D图纸方案" : stepId === "2" ? "审核BOM表" : "--";
                  stepInfoList[a].ext = stepId === "1" ? "(.stp文件)" : stepId === "2" ? "(.xls文件)" : "--";
                  stepInfoList[a].versionInfoList = versionInfoList?.length ? versionInfoList : [];
                  stepInfoList[a].hotRunnerInfoList = hotRunnerInfoList?.length ?  hotRunnerInfoList : [];
                  stepInfoList[a].hotRunnerVersionInfoList = hotRunnerVersionInfoList?.length ? hotRunnerVersionInfoList : [];
                  stepInfoList[a].fileList = [];
                  stepInfoList[a].hotRunnerFileList = [];
                  stepInfoList[a].hotRunner3dFileList = [];

                  // 操作3d文件
                  stepInfoList[a].uploadType = 
                    // 不可操作
                    canUse === 0 ? 0 
                    // 有热流道
                    : hotRunnerInfoList?.length > 0 ? 0
                    // 没有3D图纸
                    : versionInfoList?.length === 0 ? 10
                    // 审核中
                    : approveStatus === 1 ? 11
                    // 默认无状态
                    : 0;

                  if (!(hotRunnerInfoList?.length > 0) && fileId) {
                    stepInfoList[a].versionInfoList.push({
                      allApprovalInfoList: approvalInfoList,
                      fileId,
                      fileName,
                      filePath,
                      updateTime,
                      version,
                      approveStatus, 
                    })
                  }
                  if (stepInfoList[a].versionInfoList && stepInfoList[a].versionInfoList.length) {
                    for (const [c, d] of stepInfoList[a].versionInfoList.entries()) {
                      const { allApprovalInfoList } = d;
                      stepInfoList[a].versionInfoList[c].allApprovalInfoList = ((allApprovalInfoList, isLast) => {
                        const arr: any = [];
                        const temp: any = new Map();
                        for (const [a, b] of allApprovalInfoList.entries()) {
                          const { type, opinion } = b;
                          temp.set(b.type, { 
                            ...b, 
                            // 当是最新的3D图纸的时候，并且加工方没有驳回也没有通过的情况下，可编辑操作
                            editType: isLast && type === "1" && opinion !== 0 && opinion !== 1 ? 1 : 0, 
                            reasonFiles: [] 
                          });
                        }

                        // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                        if (!temp.get("1")) {
                          temp.set("1", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: isLast ? 1 : 0,
                            opinionDesc: "",
                            type: "1",
                            version: 0,
                            reasonFiles: []
                          })
                        }
                        if (!temp.get("2")) {
                          temp.set("2", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "2",
                            version: 0,
                            reasonFiles: []
                          })
                        }

                        for (const [a, b] of temp.entries()) {
                          if (b) {
                            arr.push(b);
                          }
                        }
                        return arr;
                      })(allApprovalInfoList || [], !(hotRunnerInfoList?.length > 0) && fileId && c === stepInfoList[a].versionInfoList.length - 1);
                      if (!(hotRunnerInfoList?.length > 0) && fileId &&  c === stepInfoList[a].versionInfoList.length - 1) {
                        stepInfoList[a].versionInfoList[c].approveStatus = approveStatus;

                        // 当审批方列表有一方可编辑操作即可审批操作，理论上这里只有加工方有这种情况发生，且针对BOM表审核做的额外处理
                        if (stepInfoList[a].versionInfoList[c].allApprovalInfoList.some((v: any) => v.editType === 1)) {
                          stepInfoList[a].uploadType = 11
                        } else {
                          stepInfoList[a].uploadType = 12
                        }
                      } else {
                        stepInfoList[a].versionInfoList[c].approveStatus = -1;
                      }
                    }
                  }

                  // 操作热流道图纸（加工审批方无热流道这一说，默认无状态）
                  stepInfoList[a].uploadHotrunnerType = 0;
                  if (hotRunnerInfoList && hotRunnerInfoList.length) {
                    for (const [c, d] of hotRunnerInfoList.entries()) {
                      const { opinion, cause, approvalFileId } = d;
                      stepInfoList[a].hotRunnerInfoList[c].allApprovalInfoList = [
                        {
                          type: "1",
                          cause,
                          opinion: opinion === 0 ? 0 : opinion === 1 ? null : opinion === 2 ? 1 : -1,
                          opinionDesc: "",
                          approvalTime: "",
                          approvalIds: approvalFileId,
                          editType: 0,
                          reasonFiles: []
                        }
                      ];
                      if (hotRunner === 1 && c === hotRunnerInfoList.length - 1) {
                        stepInfoList[a].hotRunnerInfoList[c].approveStatus = opinion === 0 ? 2 : opinion === 1 ? 1 : opinion === 2 ? 3 : -1;
                      } else {
                        stepInfoList[a].hotRunnerInfoList[c].approveStatus = -1;
                      }
                    }
                  }

                  // 操作含热流道图纸的3d文件
                  stepInfoList[a].uploadHotrunner3dType = 
                    // 没有热流道
                    hotRunner === 0 ? 0
                    // 没有热流道图纸
                    : hotRunnerInfoList?.length === 0 ? 0
                    // 审核中
                    : approveStatus === 1 ? 11
                    // 没有3D含热流道图纸
                    : approveStatus === 0 && hotRunnerVersionInfoList?.length === 0 ? 10
                    // 默认只可查看
                    : 12;

                  if ((hotRunnerInfoList?.length > 0) && fileId) {
                    stepInfoList[a].hotRunnerVersionInfoList.push({
                      allApprovalInfoList: approvalInfoList,
                      fileId,
                      fileName,
                      filePath,
                      updateTime,
                      version,
                      approveStatus, 
                    })
                  }
                  if (stepInfoList[a].hotRunnerVersionInfoList && stepInfoList[a].hotRunnerVersionInfoList.length) {
                    for (const [c, d] of stepInfoList[a].hotRunnerVersionInfoList.entries()) {
                      const { allApprovalInfoList, approveStatus = -1 } = d;
                      stepInfoList[a].hotRunnerVersionInfoList[c].approveStatus = approveStatus;
                      stepInfoList[a].hotRunnerVersionInfoList[c].allApprovalInfoList = ((allApprovalInfoList, isLast) => {
                        const arr: any = [];
                        const temp: any = new Map();
                        for (const [a, b] of allApprovalInfoList.entries()) {
                          const { type, opinion } = b;
                          temp.set(b.type, {
                            ...b, 
                            // 当是最新的3D含热流道图纸的时候，并且加工方没有驳回也没有通过的情况下，可编辑操作
                            editType: isLast && type === "1" && opinion !== 0 && opinion !== 1 ? 1 : 0, 
                            reasonFiles: [] 
                          });
                        }

                        // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                        if (!temp.get("1")) {
                          temp.set("1", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: isLast ? 1 : 0,
                            opinionDesc: "",
                            type: "1",
                            version: 0,
                            reasonFiles: []
                          })
                        }
                        if (!temp.get("2")) {
                          temp.set("2", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "2",
                            version: 0,
                            reasonFiles: []
                          })
                        }

                        for (const [a, b] of temp.entries()) {
                          if (b) {
                            arr.push(b);
                          }
                        }
                        return arr;
                      })(allApprovalInfoList || [], (hotRunnerInfoList?.length > 0) && fileId && c === stepInfoList[a].hotRunnerVersionInfoList.length - 1);
                    }
                  }
                  stepInfoList[a].versionInfoIndex = stepInfoList[a].versionInfoList?.length ? stepInfoList[a].versionInfoList.length - 1 : -1;
                  stepInfoList[a].hotRunnerInfoIndex = stepInfoList[a].hotRunnerInfoList?.length ?  stepInfoList[a].hotRunnerInfoList.length - 1 : -1;
                  stepInfoList[a].hotRunnerVersionInfoIndex = stepInfoList[a].hotRunnerVersionInfoList?.length ? stepInfoList[a].hotRunnerVersionInfoList.length - 1 : -1;
                }
                designList.push(...stepInfoList);
              }
            }
            break;
          case Supplier.Injection: {
              if (stepInfoList && stepInfoList.length) {
                for (const [a, b] of stepInfoList.entries()) {
                  const { 
                    approvalInfoList,
                    fileId,
                    fileName,
                    filePath,
                    updateTime,
                    version,
                    approveStatus, 
                    canUse, 
                    hotRunner, 
                    update3D, 
                    versionInfoList, 
                    hotRunnerInfoList, 
                    hotRunnerVersionInfoList, 
                    stepId 
                  } = b;
                  stepInfoList[a].title = stepId === "1" ? "审核3D图纸方案" : stepId === "2" ? "审核BOM表" : "--";
                  stepInfoList[a].ext = stepId === "1" ? "(.stp文件)" : stepId === "2" ? "(.xls文件)" : "--";
                  stepInfoList[a].versionInfoList = versionInfoList?.length ? versionInfoList : [];
                  stepInfoList[a].hotRunnerInfoList = hotRunnerInfoList?.length ?  hotRunnerInfoList : [];
                  stepInfoList[a].hotRunnerVersionInfoList = hotRunnerVersionInfoList?.length ? hotRunnerVersionInfoList : [];
                  stepInfoList[a].fileList = [];
                  stepInfoList[a].hotRunnerFileList = [];
                  stepInfoList[a].hotRunner3dFileList = [];

                  // 操作3d文件
                  stepInfoList[a].uploadType = 
                    // 不可操作
                    canUse === 0 ? 0 
                    // 没有3D图纸
                    : versionInfoList?.length === 0 ? 10
                    // 审核中
                    : approveStatus === 1 ? 11
                    // 其他默认无状态
                    : 0;

                  if (!(hotRunnerInfoList?.length > 0) && fileId) {
                    stepInfoList[a].versionInfoList.push({
                      allApprovalInfoList: approvalInfoList,
                      fileId,
                      fileName,
                      filePath,
                      updateTime,
                      version,
                      approveStatus, 
                    })
                  }
                  if (stepInfoList[a].versionInfoList && stepInfoList[a].versionInfoList.length) {
                    for (const [c, d] of stepInfoList[a].versionInfoList.entries()) {
                      const { allApprovalInfoList } = d;
                      stepInfoList[a].versionInfoList[c].allApprovalInfoList = ((allApprovalInfoList, isLast) => {
                        const arr: any = [];
                        const temp: any = new Map();
                        for (const [a, b] of allApprovalInfoList.entries()) {
                          const { type, opinion } = b;
                          temp.set(b.type, { 
                            ...b, 
                            // 当是最新的3D图纸的时候，并且试模方没有驳回也没有通过的情况下，可编辑操作
                            editType: isLast && type === "2" && opinion !== 0 && opinion !== 1 ? 1 : 0, 
                            reasonFiles: [] 
                          });
                        }

                        // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                        if (!temp.get("2")) {
                          temp.set("2", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: isLast ? 1 : 0,
                            opinionDesc: "",
                            type: "2",
                            version: 0,
                            reasonFiles: [],
                          })
                        }
                        if (!temp.get("1")) {
                          temp.set("1", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "1",
                            version: 0,
                            reasonFiles: [],
                          })
                        }

                        for (const [a, b] of temp.entries()) {
                          if (b) {
                            arr.push(b);
                          }
                        }
                        return arr;
                      })(allApprovalInfoList || [], !(hotRunnerInfoList?.length > 0) && fileId && c === stepInfoList[a].versionInfoList.length - 1);
                      if (!(hotRunnerInfoList?.length > 0) && fileId && c === stepInfoList[a].versionInfoList.length - 1) {
                        stepInfoList[a].versionInfoList[c].approveStatus = approveStatus;

                        // 当审批方列表有一方可编辑操作即可审批操作，理论上这里只有试模方有这种情况发生，且针对BOM表审核做的额外处理
                        if (stepInfoList[a].versionInfoList[c].allApprovalInfoList.some((v: any) => v.editType === 1)) {
                          stepInfoList[a].uploadType = 11
                        } else {
                          stepInfoList[a].uploadType = 12
                        }
                      } else {
                        stepInfoList[a].versionInfoList[c].approveStatus = -1;
                      }
                    }
                  }

                  // 操作热流道图纸（试模审批方无热流道这一说，默认无状态）
                  stepInfoList[a].uploadHotrunnerType = 0;
                  if (hotRunnerInfoList && hotRunnerInfoList.length) {
                    for (const [c, d] of hotRunnerInfoList.entries()) {
                      const { opinion, cause, approvalFileId } = d;
                      stepInfoList[a].hotRunnerInfoList[c].allApprovalInfoList = [
                        {
                          type: "2",
                          cause,
                          opinion: opinion === 0 ? 0 : opinion === 1 ? null : opinion === 2 ? 1 : -1,
                          opinionDesc: "",
                          approvalTime: "",
                          approvalIds: approvalFileId,
                          editType: 0,
                          reasonFiles: []
                        }
                      ];
                      if (hotRunner === 1 && c === hotRunnerInfoList.length - 1) {
                        stepInfoList[a].hotRunnerInfoList[c].approveStatus = approveStatus;
                      } else {
                        stepInfoList[a].hotRunnerInfoList[c].approveStatus = -1;
                      }
                    }
                  }

                  // 操作含热流道图纸的3d文件
                  stepInfoList[a].uploadHotrunner3dType = 
                    // 没有热流道
                    hotRunner === 0 ? 0
                    // 没有热流道图纸
                    : hotRunnerInfoList?.length === 0 ? 0
                    // 审核中
                    : approveStatus === 1 ? 11
                    // 没有3D含热流道图纸
                    : approveStatus === 0 && hotRunnerVersionInfoList?.length === 0 ? 10
                    // 默认只能查看
                    : 12;

                  if ((hotRunnerInfoList?.length > 0) && fileId) {
                    stepInfoList[a].hotRunnerVersionInfoList.push({
                      allApprovalInfoList: approvalInfoList,
                      fileId,
                      fileName,
                      filePath,
                      updateTime,
                      version,
                      approveStatus, 
                    })
                  }
                  if (stepInfoList[a].hotRunnerVersionInfoList && stepInfoList[a].hotRunnerVersionInfoList.length) {
                    for (const [c, d] of stepInfoList[a].hotRunnerVersionInfoList.entries()) {
                      const { allApprovalInfoList, approveStatus = -1 } = d;
                      stepInfoList[a].hotRunnerVersionInfoList[c].approveStatus = approveStatus;
                      stepInfoList[a].hotRunnerVersionInfoList[c].allApprovalInfoList = ((allApprovalInfoList, isLast) => {
                        const arr: any = [];
                        const temp: any = new Map();
                        for (const [a, b] of allApprovalInfoList.entries()) {
                          const { type, opinion } = b;
                          temp.set(b.type, { 
                            ...b, 
                            // 当是最新的3D含热流道图纸的时候，并且试模方没有驳回也没有通过的情况下，可编辑操作
                            editType: isLast && type === "2" && opinion !== 0 && opinion !== 1 ? 1 : 0, 
                            reasonFiles: [] 
                          });
                        }

                        // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                        if (!temp.get("2")) {
                          temp.set("2", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: isLast ? 1 : 0,
                            opinionDesc: "",
                            type: "2",
                            version: 0,
                            reasonFiles: [],
                          })
                        }
                        if (!temp.get("1")) {
                          temp.set("1", {
                            approvalIds: "",
                            approvalTime: "",
                            cause: "",
                            opinion: null,
                            editType: 0,
                            opinionDesc: "",
                            type: "1",
                            version: 0,
                            reasonFiles: [],
                          })
                        }

                        for (const [a, b] of temp.entries()) {
                          if (b) {
                            arr.push(b);
                          }
                        }
                        return arr;
                      })(allApprovalInfoList || [], (hotRunnerInfoList?.length > 0) && fileId && c === stepInfoList[a].hotRunnerVersionInfoList.length - 1);
                    }
                  }
                  stepInfoList[a].versionInfoIndex = stepInfoList[a].versionInfoList?.length ? stepInfoList[a].versionInfoList.length - 1 : -1;
                  stepInfoList[a].hotRunnerInfoIndex = stepInfoList[a].hotRunnerInfoList?.length ?  stepInfoList[a].hotRunnerInfoList.length - 1 : -1;
                  stepInfoList[a].hotRunnerVersionInfoIndex = stepInfoList[a].hotRunnerVersionInfoList?.length ? stepInfoList[a].hotRunnerVersionInfoList.length - 1 : -1;
                }
                designList.push(...stepInfoList);
              }
            }
            break;
          case Supplier.Hotrunner: {
              const stepInfoList = [
                {
                  // 原数据
                  canUse, 
                  fileInfoFor3DList, 
                  fileInfoForHotList,
                  // hotRunnerInfoList，
                  mouldProduceId,

                  stepId: "1",
                  title: "上传热流道图纸方案",
                  ext: "(.stp文件)",
                  fileList: [],
                  hotRunnerFileList: [],
                  hotRunner3dFileList: [],
                  hotRunner: 1,

                  // 操作3d文件（热流道供应商方默认不可操作3D图纸）
                  uploadType: 0,
                  versionInfoIndex: fileInfoFor3DList?.length ? fileInfoFor3DList.length - 1 : -1,
                  versionInfoList: (ls => {
                    const arr = [];
                    if (ls && ls.length) {
                      for (const v of ls) {
                        const { fileId3D, fileName3D, filePath3D, updateTime3D } = v;
                        arr.push({
                          allApprovalInfoList: [],
                          fileId: fileId3D,
                          fileName: fileName3D,
                          filePath: filePath3D,
                          updateTime: updateTime3D,
                          version: 0,
                          approveStatus: -1,
                        })
                      }
                    }
                    return arr;
                  })(fileInfoFor3DList),

                  // 操作热流道图纸
                  uploadHotrunnerType: 
                    // 没有热流道图纸
                    hotRunnerInfoList?.length === 0 ? 1
                    // 最新热流道图纸已驳回
                    : hotRunnerInfoList[hotRunnerInfoList.length - 1].opinion === 0 ? 1 
                    // 最新热流道图纸审核中
                    : hotRunnerInfoList[hotRunnerInfoList.length - 1].opinion === 1 ? 2
                    // 最新热流道图纸已通过
                    : hotRunnerInfoList[hotRunnerInfoList.length - 1].opinion === 2 ? 2
                    // 默认无状态
                    : 0,
                  hotRunnerInfoIndex: hotRunnerInfoList?.length ? hotRunnerInfoList.length - 1 : -1,
                  hotRunnerInfoList: (ls => {
                    if (hotRunnerInfoList && hotRunnerInfoList.length) {
                      for (const [c, d] of hotRunnerInfoList.entries()) {
                        const { opinion, cause, approvalFileId } = d;
                        // 当前版本驳回或者通过，才需要显示，这里只有设计方
                        hotRunnerInfoList[c].allApprovalInfoList = opinion === 0 || opinion === 2 ? [
                          {
                            type: "0",
                            cause,
                            opinion: opinion === 0 ? 0 : opinion === 1 ? null : opinion === 2 ? 1 : -1,
                            opinionDesc: "",
                            approvalTime: "",
                            approvalIds: approvalFileId,
                            editType:  0,
                            reasonFiles: []
                          }
                        ] : [];
                        if (c === hotRunnerInfoList.length - 1) {
                          hotRunnerInfoList[c].approveStatus = opinion === 0 ? 2 : opinion === 1 ? 1 : opinion === 2 ? 3 : -1;
                        } else {
                          hotRunnerInfoList[c].approveStatus = -1;
                        }
                      }
                    }
                    return hotRunnerInfoList;
                  })(hotRunnerInfoList),

                  // 操作含热流道图纸的3d文件（热流道供应商方默认不可操作3D含热流道图纸）
                  uploadHotrunner3dType: 
                    hotRunnerInfoList?.length === 0 ? 0
                    : fileInfoForHotList?.length > 0 ? 12
                    : hotRunnerInfoList[hotRunnerInfoList.length - 1].opinion > 0 ? 0 
                    : 10,
                  hotRunnerVersionInfoIndex: fileInfoForHotList?.length ? fileInfoForHotList.length - 1 : -1,
                  hotRunnerVersionInfoList: (hotRunnerVersionInfoList => {
                    if (hotRunnerVersionInfoList && hotRunnerVersionInfoList.length) {
                      for (const [c, d] of hotRunnerVersionInfoList.entries()) {
                        const { allApprovalInfoList } = d;
                        hotRunnerVersionInfoList[c].allApprovalInfoList = ((allApprovalInfoList, isLast) => {
                          const arr: any = [];
                          const temp: any = new Map();
                          for (const [a, b] of allApprovalInfoList.entries()) {
                            temp.set(b.type, { 
                              ...b, 
                              editType: 0, 
                              reasonFiles: [] 
                            });
                          }

                          // 处理后台无数据返回时候，前端根据业务处理二次数据填充
                          if (!temp.get("1")) {
                            temp.set("1", {
                              approvalIds: "",
                              approvalTime: "",
                              cause: "",
                              opinion: null,
                              editType: 0,
                              opinionDesc: "",
                              type: "1",
                              version: 0,
                              reasonFiles: [],
                            })
                          }
                          if (!temp.get("2")) {
                            temp.set("2", {
                              approvalIds: "",
                              approvalTime: "",
                              cause: "",
                              opinion: null,
                              editType: 0,
                              opinionDesc: "",
                              type: "2",
                              version: 0,
                              reasonFiles: [],
                            })
                          }
  
                          for (const [a, b] of temp.entries()) {
                            if (b) {
                              arr.push(b);
                            }
                          }
                          return arr;
                        })(allApprovalInfoList || []);
                        if (hotRunnerVersionInfoList.length && c === hotRunnerVersionInfoList.length - 1) {
                          hotRunnerVersionInfoList[c].approveStatus = (allApprovalInfoList => {
                            let approveStatus = -1;
                            if (allApprovalInfoList && allApprovalInfoList.length) {
                              for (const [e, f] of allApprovalInfoList.entries()) {
                                const { opinion } = f;
                                if (opinion === 0) return 2;
                                if (opinion === null) return 1;
                                if (opinion === 1) {
                                  approveStatus = 3;
                                }
                              }
                            }
                            return approveStatus;
                          })(allApprovalInfoList || []);
                        } else {
                          hotRunnerVersionInfoList[c].approveStatus = -1;
                        }
                      }
                    }
                    return hotRunnerVersionInfoList;
                  })(fileInfoForHotList),
                }
              ];
              designList.push(...stepInfoList);
            }
            break;
        }
        commit(MutationTypes.UpdateDesign, { designList });
        return;
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 切换版本
  [ActionTypes.UpdateVersionIndex](store: Store, params: { b: number; d: number; status: number; }) {
    const { state, dispatch, commit } = store;
    const { design } = state;
    const { b, d, status } = params || {};
    const { designList } = design || {};
    if (designList[b]) {
      if (status === 1) {
        designList[b]["versionInfoIndex"] = d;
      } else if (status === 2) {
        designList[b]["hotRunnerInfoIndex"] = d;
      } else if (status === 3) {
        designList[b]["hotRunnerVersionInfoIndex"] = d;
      }
      commit(MutationTypes.UpdateDesign, { designList });
    }
  },
  // 更新审核类型
  [ActionTypes.UpdateOpinion](store: Store, params: { b: number; d: number; status: number; value: number; }) {
    const { state, dispatch, commit } = store;
    const { design } = state;
    const { b, d, status, value } = params || {};
    const { designList } = design || {};
    if (designList[b]) {
      if (status === 1) {
        const { versionInfoIndex, versionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
        allApprovalInfoList[d].opinion = value;
      } else if (status === 2) {
        const { hotRunnerInfoIndex, hotRunnerInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        allApprovalInfoList[d].opinion = value;
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex, hotRunnerVersionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        allApprovalInfoList[d].opinion = value;
      }
      commit(MutationTypes.UpdateDesign, { designList });
    }
  },
  // 更新审核原因
  [ActionTypes.UpdateCause](store: Store, params: { b: number; d: number; status: number; value: number; isPaste?: boolean }) {
    const { state, dispatch, commit } = store;
    const { design } = state;
    const { b, d, status, value, isPaste = false } = params || {};
    const { designList } = design || {};
    if (designList[b]) {
      if (status === 1) {
        const { versionInfoIndex, versionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
        const { cause } = allApprovalInfoList[d];
        allApprovalInfoList[d].cause = isPaste ? cause + value : value;
      } else if (status === 2) {
        const { hotRunnerInfoIndex, hotRunnerInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        const { cause } = allApprovalInfoList[d];
        allApprovalInfoList[d].cause = isPaste ? cause + value : value;
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex, hotRunnerVersionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        const { cause } = allApprovalInfoList[d];
        allApprovalInfoList[d].cause = isPaste ? cause + value : value;
      }
      commit(MutationTypes.UpdateDesign, { designList });
    }
  },
  // 添加审核原因中的图片
  [ActionTypes.AddReasonFile](store: Store, params: { b: number; d: number; status: number; value: any }) {
    const { state, dispatch, commit } = store;
    const { design } = state;
    const { b, d, status, value } = params || {};
    const { id, fileName, filePath } = value || {};
    const { designList } = design || {};
    if (designList[b]) {
      if (status === 1) {
        const { versionInfoIndex, versionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
        const { reasonFiles } = allApprovalInfoList[d] || {};
        reasonFiles.push({ fileId: id, fileName, filePath });
      } else if (status === 2) {
        const { hotRunnerInfoIndex, hotRunnerInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        const { reasonFiles } = allApprovalInfoList[d] || {};
        reasonFiles.push({ fileId: id, fileName, filePath });
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex, hotRunnerVersionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        const { reasonFiles } = allApprovalInfoList[d] || {};
        reasonFiles.push({ fileId: id, fileName, filePath });
      }
      commit(MutationTypes.UpdateDesign, { designList });
    }
  },
  // 删除审核原因中的图片
  [ActionTypes.DeleteReasonFile](store: Store, params: { b: number; d: number; f: number; status: number; value: number; }) {
    const { state, dispatch, commit } = store;
    const { design } = state;
    const { b, d, f, status, value } = params || {};
    const { designList } = design || {};
    if (designList[b]) {
      if (status === 1) {
        const { versionInfoIndex, versionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
        const { reasonFiles } = allApprovalInfoList[d] || {};
        reasonFiles.splice(f, 1);
      } else if (status === 2) {
        const { hotRunnerInfoIndex, hotRunnerInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        const { reasonFiles } = allApprovalInfoList[d] || {};
        reasonFiles.splice(f, 1);
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex, hotRunnerVersionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        const { reasonFiles } = allApprovalInfoList[d] || {};
        reasonFiles.splice(f, 1);
      }
      commit(MutationTypes.UpdateDesign, { designList });
    }
  },


  // 上传3D图纸文件
  [ActionTypes.UpdateFileList](store: Store, params: { b: number; status: number; value: any; }) {
    const { state, dispatch, commit } = store;
    const { design } = state;
    const { b, status, value } = params || {};
    const { id, fileName, filePath } = value || {};
    const { designList } = design || {};
    if (designList[b]) {
      if (status === 1) {
        designList[b].fileList = [{ fileId: id, fileName, filePath }];
      } else if (status === 2) {
        designList[b].hotRunnerFileList = [{ fileId: id, fileName, filePath }];
      } else if (status === 3) {
        designList[b].hotRunner3dFileList = [{ fileId: id, fileName, filePath }];
      }
      commit(MutationTypes.UpdateDesign, { designList });
    }
  },
  // 提交3D图纸方案或者热流道图纸方案
  async [ActionTypes.CommitFile](store: Store, params: { b: number; status: number; }) {
    try {
      const { state, dispatch, commit } = store;
      const { b, status } = params || {};
      const { initInfo, design } = state;
      const { mouldProduceId } = initInfo;
      const { designList = [] } = design || {};
      
      let fn = null;
      if (status === 1) {
        const { fileList } = designList[b] || {};
        const { fileId } = fileList[fileList.length - 1] || {};
        if (!fileId) {
          ElMessage.error("请上传3D图纸");
          return;
        }
        fn = await CommitThreeFaceDesign({ mouldProduceId, threeFacePlanFileId: fileId });
      } else if (status === 2) {
        const { hotRunnerFileList } = designList[b] || {};
        const { fileId } = hotRunnerFileList[hotRunnerFileList.length - 1] || {};
        if (!fileId) {
          ElMessage.error("请上传热流道图纸");
          return;
        }
        fn = await CommitHotRunner({ mouldProduceId, hotRunnerPlanFileId: fileId });
      } else if (status === 3) {
        const { hotRunner3dFileList } = designList[b] || {};
        const { fileId } = hotRunner3dFileList[hotRunner3dFileList.length - 1] || {};
        if (!fileId) {
          ElMessage.error("请上传含热流道的3D图纸");
          return;
        }
        fn = await CommitThreeFaceDesign({ mouldProduceId, threeFacePlanFileId: fileId });
      }
      const { success, message, data }: any = fn;
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetDesignList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 通过或者驳回3D图纸和热流道图纸方案
  [ActionTypes.ApprovalDesign](store: Store, params: { b: number, d: number, status: number }) {
    const { state, dispatch, commit } = store;
    const { b, d, status } = params || {};
    const { initInfo, design } = state;
    const { mouldProduceId } = initInfo;
    const { designList } = design || {};
    const { fileList, opinion, cause } = designList[b] || {};
    const threeFaceDesinFn = async(datas = {}) => {
      try {
        const { success, message, data }: any = await ApprovalThreeFaceDesign(datas);
        if (success) {
          ElMessage.success(message);
          dispatch(ActionTypes.GetDesignList);
          dispatch("order/GetCountdown", null, { root: true });
        } else {
          ElMessage.error(message);
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    const hotRunnerFn = async(datas = {}) => {
      try {
        const { success, message, data }: any = await ApprovalHotRunner(datas);
        if (success) {
          ElMessage.success(message);
          dispatch(ActionTypes.GetDesignList);
          dispatch("order/GetCountdown", null, { root: true });
        } else {
          ElMessage.error(message);
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    if (designList[b]) {
      if (status === 1) {
        const { versionInfoIndex, versionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
        const { reasonFiles, cause, type, opinion } = allApprovalInfoList[d] || {};
        const fileIds = reasonFiles.map((v: any) => v.fileId).join(",");
        if (opinion === 0 && (!cause || !fileIds)) {
          ElMessage.error("请输入驳回理由或上传驳回图片");
          return;
        }
        threeFaceDesinFn({ cause, fileIds, isHotRunner: 0, mouldProduceId, opinion, role: type });
      } else if (status === 2) {
        const { hotRunnerInfoIndex, hotRunnerInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        const { reasonFiles, cause, type, opinion } = allApprovalInfoList[d] || {};
        const fileIds = reasonFiles.map((v: any) => v.fileId).join(",");
        if (!cause || !fileIds) {
          ElMessage.error("请输入驳回理由或上传驳回图片");
          return;
        }
        hotRunnerFn({ cause, fileIds, mouldProduceId, opinion: 0 });
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex, hotRunnerVersionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        const { reasonFiles, cause, type, opinion } = allApprovalInfoList[d] || {};
        const fileIds = reasonFiles.map((v: any) => v.fileId).join(",");
        if (opinion === 0 && (!cause || !fileIds)) {
          ElMessage.error("请输入驳回理由或上传驳回图片");
          return;
        }
        threeFaceDesinFn({ cause, fileIds, isHotRunner: 1, mouldProduceId, opinion, role: type });
      }
    }
  },
  // 查看图片原因
  [ActionTypes.GetApprovalFilePath](store: Store, params: { b: number; d: number; f: number; status: number; }) {
    const { state, dispatch, commit } = store;
    const { b, d, f, status } = params || {};
    const { design } = state;
    const { designList } = design || {};
    const getFilePathFn = async(datas: any) => {
      try {
        const { approvalIds, cause } = datas || {};
        const { success, message, data }: any = await GetApprovalFilePath({ fileIds: approvalIds });
        if (success) {
          const fileListTemp = (l => {
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
          })(data || []);
          commit(MutationTypes.UpdateReasonContent, { isShow: true, content: cause, fileList: fileListTemp });
        } else {
          ElMessage.error(message);
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    if (designList[b]) {
      if (status === 1) {
        const { versionInfoIndex, versionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
        const { approvalIds, cause } = allApprovalInfoList[d] || {};
        if (approvalIds) {
          getFilePathFn({ approvalIds, cause });
        } else {
          commit(MutationTypes.UpdateReasonContent, { isShow: true, content: cause, fileList: [] });
        }
      } else if (status === 2) {
        const { hotRunnerInfoIndex, hotRunnerInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerInfoList[hotRunnerInfoIndex] || {};
        const { approvalIds, cause } = allApprovalInfoList[d] || {};
        if (approvalIds) {
          getFilePathFn({ approvalIds, cause });
        } else {
          commit(MutationTypes.UpdateReasonContent, { isShow: true, content: cause, fileList: [] });
        }
      } else if (status === 3) {
        const { hotRunnerVersionInfoIndex, hotRunnerVersionInfoList } = designList[b] || {};
        const { allApprovalInfoList } = hotRunnerVersionInfoList[hotRunnerVersionInfoIndex] || {};
        const { approvalIds, cause } = allApprovalInfoList[d] || {};
        if (approvalIds) {
          getFilePathFn({ approvalIds, cause });
        } else {
          commit(MutationTypes.UpdateReasonContent, { isShow: true, content: cause, fileList: [] });
        }
      }
    }
  },

  // 获取BOM表初始化信息
  async [ActionTypes.UpdateBOMInfo](store: Store, params: { b: number, editType: number; }) {
    const { state, dispatch, commit } = store;
    const { BOMInfo, design } = state;
    const { b, editType } = params || {};
    const { designList } = design || {};
    const { versionInfoIndex, versionInfoList } = designList[b] || {};
    const { allApprovalInfoList } = versionInfoList[versionInfoIndex] || {};
    const reasonList = [];
    if (allApprovalInfoList && allApprovalInfoList.length) {
      for (const [a, b] of allApprovalInfoList.entries()) {
        const { type, opinion, cause, approvalIds } = b;
        if (opinion === 0) {
          if (approvalIds) {
            try {
              const { success, message, data }: any = await GetApprovalFilePath({ fileIds: approvalIds });
              if (success) {
                const fileListTemp = (l => {
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
                })(data || []);
                reasonList.push({ 
                  text: type === "1" ? "加工方" : type === "2" ? "试模方" : "", 
                  content: cause, 
                  fileList:  fileListTemp,
                });
              } else {
                ElMessage.error(message);
              }
            } catch (e) {
              throw new Error(e);
            }
          } else {
            reasonList.push({ 
              text: type === "1" ? "加工方" : type === "2" ? "试模方" : "", 
              content: cause, 
              fileList:  [],
            });
          }
        }
      }
    }
    commit(MutationTypes.UpdateBOMInfo, { isShow: true, editType, reasonList, reasonIndex: reasonList.length - 1 });
    dispatch(ActionTypes.UpdateNavIndex, 0);
  },
  
  // 更新BOM表原因下标
  [ActionTypes.UpdateReasonIndex](store: Store, reasonIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMInfo, { reasonIndex });
  },
  // 更新BOM表导航下标
  [ActionTypes.UpdateNavIndex](store: Store, navIndex: number) {
    const { state, dispatch, commit } = store;
    const { BOMInfo } = state;
    const { navList } = BOMInfo || {};
    const { list } = navList[navIndex] || {};
    commit(MutationTypes.UpdateBOMInfo, { navIndex });
    // if (list && list.length) {
    //   return;
    // }
    dispatch(ActionTypes.UpdateBOMInfoPageNum, 1);
  },
  // 更新BOM详情每页条数
  [ActionTypes.UpdateBOMInfoPageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    const { BOMInfo } = state;
    const { navList, navIndex } = BOMInfo || {};
    if (navList[navIndex]) {
      navList[navIndex].pageSize = pageSize;
      commit(MutationTypes.UpdateBOMInfo, { navList });
      dispatch(ActionTypes.UpdateBOMInfoPageNum, 1);
    }
  },
  // 更新BOM详情页码
  [ActionTypes.UpdateBOMInfoPageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    const { BOMInfo } = state;
    const { navList, navIndex } = BOMInfo || {};
    if (navList[navIndex]) {
      navList[navIndex].pageNum = pageNum;
      commit(MutationTypes.UpdateBOMInfo, { navList });
      dispatch(ActionTypes.GetBOMInfo);
    }
  },
  // 获取BOM表详情
  async [ActionTypes.GetBOMInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, BOMInfo } = state;
      const { mouldProduceId } = initInfo;
      const { navList, navIndex } = BOMInfo || {};
      const { pageNum, pageSize, bomType } = navList[navIndex] || {};
      const { success, message, data }: any = await GetBOMInfo({ mouldProduceId, pageNum, pageSize, bomType });
      if (success) {
        const { list = [], pages, total = 0 } = data || {};
        navList[navIndex].list = list;
        navList[navIndex].pages = Number(pages);
        navList[navIndex].total = Number(total);
        commit(MutationTypes.UpdateBOMInfo, { navList, isShow: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 上传BOM表
  async [ActionTypes.ImportBom](store: Store, bomFileId: string) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, BOMInfo } = state;
      const { mouldProduceId } = initInfo;
      const { navList, navIndex } = BOMInfo || {};
      const { bomType } = navList[navIndex] || {};
      const { success, message, data }: any = await ImportBom({ mouldProduceId, bomFileId, bomType });
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetBOMInfo);
        dispatch(ActionTypes.GetDesignList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 上传BOM图表零件图纸
  async [ActionTypes.ImportBomImage](store: Store, bomDesignFiles: string[]) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo;
      const { success, message, data }: any = await ImportBomImage({ mouldProduceId, bomDesignFiles });
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetBOMInfo);
        dispatch(ActionTypes.GetDesignList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 提交BOM表
  async [ActionTypes.SaveBomList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo;
      const { success, message, data }: any = await SaveBomList({ mouldProduceId });
      if (success) {
        ElMessage.success(message);
        commit(MutationTypes.UpdateBOMInfo, { isShow: false });
        dispatch(ActionTypes.GetDesignList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 验收BOM图表
  async [ActionTypes.ApprovalBom](store: Store) {
    const { state, dispatch, commit } = store;
    const { initInfo, confirmModel } = state;
    const { mouldProduceId } = initInfo;
    const { content, fileList, isUpdate3D, opinion, role } = confirmModel || {};
    const fileIds = fileList.map(v => v.fileId).join(",");
    try {
      const { success, message, data }: any = await ApprovalBom({ mouldProduceId, cause: content, opinion, role, fileIds, update3D: Number(isUpdate3D) });
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.ClearConfirmModel);
        commit(MutationTypes.UpdateBOMInfo, { isShow: false });
        dispatch(ActionTypes.GetDesignList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 验收BOM图表零件图纸
  async [ActionTypes.ApprovalBomImage](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { initInfo, confirmModel,  } = state;
    const { mouldProduceId } = initInfo;
    const { content, fileList, mouldBomListIds, opinion, role } = confirmModel || {};
    const pictureIds = fileList.map(v => v.fileId).join(",");
    try {
      const { success, message, data }: any = await ApprovalBomImage({ mouldProduceId, cause: content, mouldBomListIds, opinion, role, pictureIds });
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.ClearConfirmModel);
        dispatch(ActionTypes.GetBOMInfo);
        dispatch(ActionTypes.GetDesignList);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 查看驳回原因
  async [ActionTypes.GetReasonContent](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { content = "", title = "驳回原因", fileList } = params || {};
    if (fileList) {
      try {
        const { success, message, data }: any = await GetApprovalFilePath({ fileIds: fileList });
        if (success) {
          const fileListTemp = (l => {
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
          })(data || []);
          commit(MutationTypes.UpdateReasonContent, { isShow: true, title, content, fileList: fileListTemp });
        } else {
          ElMessage.error(message);
        }
      } catch(e) {
        throw new Error(e);
      }
    } else {
      commit(MutationTypes.UpdateReasonContent, { isShow: true, title, content, fileList: [] });
    }
  },
  // 获取输入驳回原因弹框信息
  [ActionTypes.GetConfirmModel](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { BOMInfo } = state;
    const { navList, navIndex } = BOMInfo || {};
    const { list } = navList[navIndex] || {};
    const { approvalType, id, opinion, role, isShowUpdate3D } = params || {};
    const mouldBomListIds = approvalType === 1 ? list.map((v: any) => v.id) : [id];
    commit(MutationTypes.UpdateConfirmModel, { 
      isShow: true,
      confirm: 0,
      title: opinion === 1 ? "通过原因" : opinion === 0 ? "驳回原因" : "",
      content: "",
      fileList: [],
      isShowUpdate3D,
      isUpdate3D: false,
      approvalType, 
      opinion, 
      role,
      mouldBomListIds,
    });
  },
  // 清除输入驳回原因弹框信息
  [ActionTypes.ClearConfirmModel](store: Store) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateConfirmModel, { 
      isShow: false,
      confirm: -1,
      title: "",
      content: "",
      fileList: [],
      isShowUpdate3D: false,
      isUpdate3D: false,
      approvalType: 0, 
      opinion: -1, 
      role: 0,
      mouldBomListIds: []
    });
  },
  // 更新输入驳回原因弹框信息
  [ActionTypes.UpdateConfirmModel](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { confirmModel } = state;
    const { confirm } = params || {};
    const { approvalType } = confirmModel;
    if (confirm === 0) {
      dispatch(ActionTypes.ClearConfirmModel);
    } else if (confirm === 1) {
      commit(MutationTypes.UpdateConfirmModel, { ...params });
      if (approvalType === 1) {
        dispatch(ActionTypes.ApprovalBom);
      } else if (approvalType === 2) {
        dispatch(ActionTypes.ApprovalBomImage);
      }
    } else {
      commit(MutationTypes.UpdateConfirmModel, { ...params });
    }
  }
}