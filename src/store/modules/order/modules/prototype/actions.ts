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
  GetCheckAndAcceptInfo,
  CommitMailInfo,
} from "@/api/order/prototype";

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
  GetPrototype = "GetPrototype",
  UpdatePrototypeData = "UpdatePrototypeData",
  CommitMailInfo = "CommitMailInfo"
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取流程步骤
  async [ActionTypes.GetPrototype](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, mouldProduceId } = initInfo || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          // fn = await GetDfmReportList({ biddingId });
          break;
        case Supplier.Machining:
          fn = await GetCheckAndAcceptInfo({ mouldProduceId });
          break;
        case Supplier.Injection:
          // fn = await GetInjectStepList({ biddingId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        commit(MutationTypes.UpdatePrototype, data || {});
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 更新订单号和快递公司
  [ActionTypes.UpdatePrototypeData](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { name, value } = params || {};
    const { prototype } = state;
    const { productSamplePostInfo } = prototype || {};
    productSamplePostInfo[name] = value;
    commit(MutationTypes.UpdatePrototype, { productSamplePostInfo });
  },

  // 提交邮寄信息
  async [ActionTypes.CommitMailInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, prototype } = state;
      const { type, mouldProduceId } = initInfo || {};
      const { productSamplePostInfo } = prototype || {};
      const { postCompany, postOrderNo } = productSamplePostInfo || {};
      if (!postCompany) {
        Message.error("请输入快递公司！");
        return;
      }
      if (!postOrderNo) {
        Message.error("请输入快递单号！");
        return;
      }
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          // fn = await GetDfmReportList({ mouldProduceId });
          break;
        case Supplier.Machining:
          fn = await CommitMailInfo({ mouldProduceId, postCompany, postOrderNo });
          break;
        case Supplier.Injection:
          // fn = await GetInjectStepList({ mouldProduceId });
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        dispatch(ActionTypes.GetPrototype);
      } else {
        Message.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}