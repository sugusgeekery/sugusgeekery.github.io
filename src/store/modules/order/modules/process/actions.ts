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

import {
  UploadForm
} from "@/api";
import {
  GetMachinSteps,
  GetAssembleSteps,
  GetInjectionSteps,
  FinishedStep,
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
  GetMachinSteps = "GetMachinSteps",
  GetAssembleSteps = "GetAssembleSteps",
  GetInjectionSteps = "GetInjectionSteps",
  FinishedStep = "FinishedStep",
  DeleteStepFile = "DeleteStepFile",
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: any | InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
    // const { type = "" } = params || {};
    // switch(type) {
    //   case Supplier.Dfm:
    //     break;
    //   case Supplier.Design:
    //     break;
    //   case Supplier.Machining:
    //     dispatch(ActionTypes.GetMachinSteps);
    //     dispatch(ActionTypes.GetAssembleSteps);
    //     break;
    //   case Supplier.Injection:
    //     dispatch(ActionTypes.GetInjectionSteps);
    //     break;
    // }
  },

  // 获取加工步骤
  async [ActionTypes.GetMachinSteps](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo || {};
      const { success, message, data }: any = await GetMachinSteps({ mouldProduceId });
      if (success) {
        const stepList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { fileInfos = [] } = b;
            ls[a].fileInfos = fileInfos && fileInfos.length ? fileInfos : [];
          }
          return ls;
        })(data || []);
        commit(MutationTypes.UpdateMachinStepList, stepList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取装配步骤
  async [ActionTypes.GetAssembleSteps](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo || {};
      const { success, message, data }: any = await GetAssembleSteps({ mouldProduceId });
      if (success) {
        const stepList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { fileInfos = [] } = b;
            ls[a].fileInfos = fileInfos && fileInfos.length ? fileInfos : [];
          }
          return ls;
        })(data || []);
        commit(MutationTypes.UpdateAssembleStepList, stepList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取试模步骤
  async [ActionTypes.GetInjectionSteps](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { mouldProduceId } = initInfo || {};
      const { success, message, data }: any = await GetInjectionSteps({ mouldProduceId });
      if (success) {
        const stepList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { fileInfos = [] } = b;
            ls[a].fileInfos = fileInfos && fileInfos.length ? fileInfos : [];
          }
          return ls;
        })(data || []);
        commit(MutationTypes.UpdateInjectionStepList, stepList);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 提交单个步骤
  async [ActionTypes.FinishedStep](store: Store, params: { type: number; index: number }) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, machinStepList = [], assembleStepList = [], injectionStepList = [] } = state;
      const { mouldProduceId } = initInfo || {};
      const { type = 0, index } = params || {};
      let fn = null;
      if (type === 1) {
        const { stepId, fileInfos } = machinStepList[index] || {};
        const fileIds = (ls => {
          const arr = [];
          for (const v of ls) {
            const { fileId } = v;
            if (fileId) {
              arr.push(fileId);
            }
          }
          return arr;
        })(fileInfos);
        fn = await FinishedStep({ mouldProduceId, fileIds, stepId });
      } else if (type === 2) {
        const { stepId, fileInfos } = assembleStepList[index] || {};
        const fileIds = (ls => {
          const arr = [];
          for (const v of ls) {
            const { fileId } = v;
            if (fileId) {
              arr.push(fileId);
            }
          }
          return arr;
        })(fileInfos);
        fn = await FinishedStep({ mouldProduceId, fileIds, stepId });
      } else if (type === 3) {
        const { stepId, fileInfos } = injectionStepList[index] || {};
        const fileIds = (ls => {
          const arr = [];
          for (const v of ls) {
            const { fileId } = v;
            if (fileId) {
              arr.push(fileId);
            }
          }
          return arr;
        })(fileInfos);
        fn = await FinishedStep({ mouldProduceId, fileIds, stepId });
      }
      const { success, message, data }: any = fn;
      if (success) {
        Message.success(message);
        if (type === 1) {
          dispatch(ActionTypes.GetMachinSteps);
          dispatch(ActionTypes.GetAssembleSteps);
        } else if (type === 2) {
          dispatch(ActionTypes.GetAssembleSteps);
        } else if (type === 3) {
          dispatch(ActionTypes.GetInjectionSteps);
        }
        dispatch("order/GetRemainTime", null, { root: true });
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
    const { machinStepList = [], assembleStepList = [], injectionStepList = [] } = state;
    const { type, index, key } = params || {};
    if (type === 1) {
      machinStepList[index].fileInfos.splice(key, 1);
      commit(MutationTypes.UpdateMachinStepList, machinStepList);
    } else if (type === 2) {
      assembleStepList[index].fileInfos.splice(key, 1);
      commit(MutationTypes.UpdateAssembleStepList, assembleStepList);
    } else if (type === 3) {
      injectionStepList[index].fileInfos.splice(key, 1);
      commit(MutationTypes.UpdateInjectionStepList, injectionStepList);
    }
  },
}