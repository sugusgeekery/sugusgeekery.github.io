import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State, InitOption } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";
// import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  GetStep,
  GetStepDetail,
  GetBOMList,
  ImportBom,
  GetBOMImageInfo,
  ImportSpareImage,
  UpdateSpareImage,
  CheckProgramme,
  CheckImage,
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
  GetStep = "GetStep",
  GetStepDetail = "GetStepDetail",
  GetBOMList = "GetBOMList",
  ImportBom = "ImportBom",
  GetBOMImageInfo = "GetBOMImageInfo",
  CacluateBOMImageInfo = "CacluateBOMImageInfo",
  CheckBOMImage = "CheckBOMImage",
  ImportSpareImage = "ImportSpareImage",
  UpdateSpareImage = "UpdateSpareImage",
  CheckProgramme = "CheckProgramme",
  CheckBOMImageAll = "CheckBOMImageAll",
  CheckImage = "CheckImage",
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitOption) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitOption, params);
  },

  // 获取方案设计进行到哪一步
  async [ActionTypes.GetStep](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { mouldNo } = initOption;
      const { success, message, data }: any = await GetStep({ mouldNo });
      if (success) {
        commit(MutationTypes.UpdateDesign, { step: data || 0 });
        dispatch(ActionTypes.GetStepDetail);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取当前进度详情
  async [ActionTypes.GetStepDetail](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { mouldNo } = initOption;
      const { success, message, data }: any = await GetStepDetail({ mouldNo });
      if (success) {
        const stepList = (ls => {
          const arr = [];
          if (ls.length) {
            for (const [a, b] of ls.entries()) {
              let text = "";
              let reviewText = "";
              let isLink = false;
              switch (a + 1) {
                case 1:
                  text = "上传3D图纸方案";
                  reviewText = "验收3D图纸方案";
                  break;
                case 2:
                  text = "导入BOM表";
                  reviewText = "验收BOM表";
                  isLink = true;
                  break;
                case 3:
                  text = "导入2D、3D图纸";
                  reviewText = "验收2D、3D图纸";
                  isLink = true;
                  break;
              }
              arr.push({
                ...b,
                label: a + 1,
                text,
                reviewText,
                isLink
              })
            }
          }
          return arr;
        })(data || []);
        commit(MutationTypes.UpdateDesign, { stepList });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取BOM表
  async [ActionTypes.GetBOMList](store: Store, showType: number = 0) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { mouldNo } = initOption;
      const { success, message, data }: any = await GetBOMList({ mouldNo });
      if (success) {
        commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true, showType });
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 上传BOM图表
  async [ActionTypes.ImportBom](store: Store, file: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { mouldNo } = initOption;
      const formData = new FormData();
      formData.append("file", file);
      const { success, message, data }: any = await ImportBom(formData, { mouldNo });
      if (success) {
        // commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true });
        dispatch(ActionTypes.GetBOMList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取BOM表零件图纸
  async [ActionTypes.GetBOMImageInfo](store: Store, showType: number = 0) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { mouldNo } = initOption;
      const { success, message, data }: any = await GetBOMImageInfo({ mouldNo });
      if (success) {
        const list = (ls => {
          for (const [a, b] of ls.entries()) {
            ls[a]["isSelected"] = false;
          }
          return ls;
        })(data || [])
        commit(MutationTypes.UpdateBOMImageInfo, { list, isShow: true, showType });
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
    commit(MutationTypes.UpdateBOMImageInfo, { isAllSelected: total === list.length });
  },
  // 选择BOM零件图纸
  [ActionTypes.CheckBOMImage](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { BOMImageInfo } = state;
    const { list } = BOMImageInfo;
    const { isSelected = false } = list[index] || {};
    list[index]["isSelected"] = !isSelected;
    commit(MutationTypes.UpdateBOMImageInfo, { list });
    dispatch(ActionTypes.CacluateBOMImageInfo);
  },
  // 全部选择BOM零件图纸
  [ActionTypes.CheckBOMImageAll](store: Store) {
    const { state, dispatch, commit } = store;
    const { BOMImageInfo } = state;
    const { list, isAllSelected = false } = BOMImageInfo;
    for (const [a, b] of list.entries()) {
      list[a]["isSelected"] = !isAllSelected;
    }
    commit(MutationTypes.UpdateBOMImageInfo, { list });
    dispatch(ActionTypes.CacluateBOMImageInfo);
  },
  // 上传BOM图表零件图纸
  async [ActionTypes.ImportSpareImage](store: Store, file: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initOption } = state;
      const { mouldNo } = initOption;
      const formData = new FormData();
      formData.append("file", file);
      const { success, message, data }: any = await ImportSpareImage(formData, { mouldNo });
      if (success) {
        // commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true });
        dispatch(ActionTypes.GetBOMImageInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 上传BOM图表零件图纸
  async [ActionTypes.UpdateSpareImage](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { file, infoId } = params || {};
      // const { initOption } = state;
      // const { mouldNo } = initOption;
      const formData = new FormData();
      formData.append("file", file);
      const { success, message, data }: any = await UpdateSpareImage(formData, { infoId });
      if (success) {
        // commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true });
        dispatch(ActionTypes.GetBOMImageInfo);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  
  // 通过或者驳回
  async [ActionTypes.CheckProgramme](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { checkResult, step } = params || {};
    const { initOption } = state;
    const { mouldNo } = initOption;
    const fn = async(datas = {}) => {
      try {
        const { success, message, data }: any = await CheckProgramme(datas);
        if (success) {
          // commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true });
          // dispatch(ActionTypes.GetBOMImageInfo);
        } else {
          Message.error(message);
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    if (checkResult === 0) {
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
            const describe = value;
            fn({ checkResult, step, mouldNo, describe });
          }
        })
        .catch(() => {});
    } else {
      fn({ checkResult, step, mouldNo, describe: "" });
    }
  },

  // 通过或者驳回
  async [ActionTypes.CheckImage](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { checkResult } = params || {};
    const { initOption, BOMImageInfo } = state;
    const { list = [] } = BOMImageInfo;
    const { mouldNo } = initOption;
    const infoIdList = (ls => {
      const arr = [];
      if (ls.length) {
        for (const [a, b] of ls.entries()) {
          const { isSelected, id } = b;
          if (isSelected) {
            arr.push(id);
          }
        }
      }
      return arr;
    })(list);
    if (!infoIdList.length) {
      Message.error("请至少选择一个图纸");
      return;
    }
    const fn = async(datas = {}) => {
      try {
        const { success, message, data }: any = await CheckImage(datas);
        if (success) {
          // commit(MutationTypes.UpdateBOMTable, { list: data || [], isShow: true });
          // dispatch(ActionTypes.GetBOMImageInfo);
        } else {
          Message.error(message);
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    if (checkResult === 0) {
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
            const describe = value;
            fn({ checkResult, infoIdList, mouldNo, describe });
          }
        })
        .catch(() => {});
    } else {
      fn({ checkResult, infoIdList, mouldNo, describe: "" });
    }
  },
  
}