import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State, InitInfo } from "./state";
import { Supplier } from "../../state";
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
  GetDfmRealtime,
  GetMachinRealtime,
  GetInjectionRealtime,
  ImportDesign,
  ApprovalDesign,
  GetBOMList,
  GetBOMImageInfo,
  ImportBom,
  ApprovalBom,
  ImportBomImage,
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
  GetStepDetail = "GetStepDetail",
  ImportDesign = "ImportDesign",
  ApprovalDesign = "ApprovalDesign",

  GetBOMListCtl = "GetBOMListCtl",
  GetBOMList = "GetBOMList",
  UpdateBOMPageSize = "UpdateBOMPageSize",
  UpdateBOMPageNum = "UpdateBOMPageNum",
  ImportBom = "ImportBom",
  ApprovalBom = "ApprovalBom",

  GetBOMImageInfoCtl = "GetBOMImageInfoCtl",
  GetBOMImageInfo = "GetBOMImageInfo",
  CacluateBOMImageInfo = "CacluateBOMImageInfo",
  UpdateBOMImagePageSize = "UpdateBOMImagePageSize",
  UpdateBOMImagePageNum = "UpdateBOMImagePageNum",
  CheckBOMImage = "CheckBOMImage",
  CheckBOMImageAll = "CheckBOMImageAll",
  ImportBomImage = "ImportBomImage",
  ApprovalBomImage = "ApprovalBomImage"
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取当前进度详情
  async [ActionTypes.GetStepDetail](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, mouldProduceId } = initInfo;
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
        case Supplier.Design:
          fn = await GetDfmRealtime({ mouldProduceId })
          break;
        case Supplier.Machining:
          fn = await GetMachinRealtime({ mouldProduceId });
          break;
        case Supplier.Injection:
          fn = await GetInjectionRealtime({ mouldProduceId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        const { stepInfoList = [] } = data || {};
        const stepInfoListTemp = (stepInfoList => {
          for (const [a, b] of stepInfoList.entries()) {
            const { approvalInfoList = [] } = b;
            stepInfoList[a].isEdit = true;
            if (approvalInfoList.length) {
              for (const [c, d] of approvalInfoList.entries()) {
                switch(type) {
                  case Supplier.Dfm:
                  case Supplier.Design:
                    break;
                  case Supplier.Machining:
                    if (d.type == 1) {
                      stepInfoList[a].isEdit = false;
                    }
                    break;
                  case Supplier.Injection:
                    if (d.type == 2) {
                      stepInfoList[a].isEdit = false;
                    }
                    break;
                }
              }
            }
          }
          return stepInfoList;
        })(stepInfoList);
        commit(MutationTypes.UpdateDesign, { stepInfoList: stepInfoListTemp });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 上传3D图纸方案
  async [ActionTypes.ImportDesign](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo;
      const { threeFacePlanFileId } = params || {};
      const { success, message, data }: any = await ImportDesign({ mouldProduceId, threeFacePlanFileId });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetStepDetail);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 通过或者驳回3D图纸
  async [ActionTypes.ApprovalDesign](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { opinion, role } = params || {};
    const { initInfo } = state;
    const { mouldProduceId } = initInfo;
    const fn = async(datas = {}) => {
      try {
        const { success, message, data }: any = await ApprovalDesign(datas);
        if (success) {
          // commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true });
          Message.success(message);
          dispatch(ActionTypes.GetStepDetail);
        } else {
          Message.error(message);
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    if (opinion === 0) {
      MessageBox({
        message: "驳回原因描述",
        title: "温馨提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
        showInput: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: true,
        roundButton: false,
        showConfirmButton: true,
        showCancelButton: true
      })
        .then(({ action, value }: any = {}) => {
          if (action === "confirm") {
            const cause = value;
            fn({ opinion, role, mouldProduceId, cause });
          }
        })
        .catch(() => {});
    } else {
      fn({ opinion, role, mouldProduceId, cause: "" });
    }
  },

  // 获取BOM表
  [ActionTypes.GetBOMListCtl](store: Store, isEdit: boolean = false) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMTable, { isEdit });
    dispatch(ActionTypes.UpdateBOMPageNum, 1);
  },
  // 获取BOM表
  async [ActionTypes.GetBOMList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, BOMTable } = state;
      const { mouldProduceId } = initInfo;
      const { pageNum, pageSize } = BOMTable;
      const { success, message, data }: any = await GetBOMList({ mouldProduceId, pageNum, pageSize });
      if (success) {
        const { list = [], pages, total } = data || {};
        commit(MutationTypes.UpdateBOMTable, { list, pages: Number(pages), total: Number(total), isShow: true });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新BOM表每页条数
  [ActionTypes.UpdateBOMPageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMTable, { pageSize });
    dispatch(ActionTypes.UpdateBOMPageNum, 1);
  },
  // 更新BOM表页码
  [ActionTypes.UpdateBOMPageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMTable, { pageNum });
    dispatch(ActionTypes.GetBOMList);
  },
  // 上传BOM图表
  async [ActionTypes.ImportBom](store: Store, bomFileId: string) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo;
      const { success, message, data }: any = await ImportBom({ mouldProduceId, bomFileId });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetBOMList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 验收BOM图表
  async [ActionTypes.ApprovalBom](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo;
      const { cause, opinion, role } = params || {};
      const { success, message, data }: any = await ApprovalBom({ mouldProduceId, cause, opinion, role });
      if (success) {
        Message.success(message);
        // dispatch(ActionTypes.GetBOMList);
        commit(MutationTypes.UpdateBOMTable, { isShow: false });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取BOM表零件图纸2D3D
  [ActionTypes.GetBOMImageInfoCtl](store: Store, isEdit: boolean = false) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMImageInfo, { isEdit });
    dispatch(ActionTypes.UpdateBOMImagePageNum, 1);
  },
  // 获取BOM表零件图纸2D3D
  async [ActionTypes.GetBOMImageInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, BOMImageInfo } = state;
      const { mouldProduceId } = initInfo;
      const { pageNum, pageSize } = BOMImageInfo;
      const { success, message, data }: any = await GetBOMImageInfo({ mouldProduceId, pageNum, pageSize });
      if (success) {
        const { list = [], pages, total = 0 } = data || {};
        const listTemp = (ls => {
          for (const [a, b] of ls.entries()) {
            ls[a]["isSelected"] = false;
          }
          return ls;
        })(list);
        commit(MutationTypes.UpdateBOMImageInfo, { list: listTemp, pages: Number(pages), total: Number(total), isShow: true });
        dispatch(ActionTypes.CacluateBOMImageInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 计算BOM零件图纸是否全选
  [ActionTypes.CacluateBOMImageInfo](store: Store) {
    const { state, dispatch, commit } = store;
    const { BOMImageInfo } = state;
    const { list } = BOMImageInfo;
    let total = 0;
    for (const [a, b] of list.entries()) {
      const { isSelected = false } = b;
      if (isSelected) {
        total++;
      }
    }
    commit(MutationTypes.UpdateBOMImageInfo, { isAllSelected: list.length > 0 && total === list.length });
  },
  // 更新BOM零件图纸表每页条数
  [ActionTypes.UpdateBOMImagePageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMImageInfo, { pageSize });
    dispatch(ActionTypes.UpdateBOMImagePageNum, 1);
  },
  // 更新BOM零件图纸表页码
  [ActionTypes.UpdateBOMImagePageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateBOMImageInfo, { pageNum });
    dispatch(ActionTypes.GetBOMImageInfo);
  },
  // 选择BOM零件图纸
  [ActionTypes.CheckBOMImage](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { BOMImageInfo } = state;
    const { list } = BOMImageInfo;
    const { isSelected = false, twoFaceFileId, threeFaceFileId } = list[index] || {};
    if (twoFaceFileId && threeFaceFileId && (list[index] || {}).state === 1) {
      list[index]["isSelected"] = !isSelected;
      commit(MutationTypes.UpdateBOMImageInfo, { list });
      dispatch(ActionTypes.CacluateBOMImageInfo);
    } else {
      Message.error("不符合选中条件");
    }
  },
  // 全部选择BOM零件图纸
  [ActionTypes.CheckBOMImageAll](store: Store) {
    const { state, dispatch, commit } = store;
    const { BOMImageInfo } = state;
    const { list, isAllSelected = false } = BOMImageInfo;
    for (const [a, b] of list.entries()) {
      const { twoFaceFileId, threeFaceFileId, state } = b;
      if (twoFaceFileId && threeFaceFileId && state) {
        list[a]["isSelected"] = !isAllSelected;
      }
    }
    commit(MutationTypes.UpdateBOMImageInfo, { list });
    dispatch(ActionTypes.CacluateBOMImageInfo);
  },
  // 上传BOM图表零件图纸
  async [ActionTypes.ImportBomImage](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo;
      const { bomDesignFiles } = params;
      const { success, message, data }: any = await ImportBomImage({ mouldProduceId, bomDesignFiles });
      if (success) {
        Message.success(message);
        dispatch(ActionTypes.GetBOMImageInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 验收BOM图表零件图纸
  async [ActionTypes.ApprovalBomImage](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { initInfo, BOMImageInfo } = state;
    const { list } = BOMImageInfo;
    const { mouldProduceId } = initInfo;
    const { cause, opinion, role } = params || {};
    const mouldBomListIds = (ls => {
      const arr = [];
      for (const v of ls) {
        const { isSelected, id } = v;
        if (isSelected) {
          arr.push(id);
        }
      }
      return arr;
    })(list);
    if (!mouldBomListIds.length) {
      Message.error("请选择后再提交");
      return;
    }
    try {
      const { success, message, data }: any = await ApprovalBomImage({ mouldProduceId, cause, mouldBomListIds, opinion });
      if (success) {
        Message.success(message);
        // dispatch(ActionTypes.GetBOMImageInfo);
        commit(MutationTypes.UpdateBOMImageInfo, { isShow: false });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
}