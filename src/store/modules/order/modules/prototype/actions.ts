import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { Supplier } from "../../state";
import { State, InitInfo } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { ElMessage } from "element-plus";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";

import {
  GetSampleAcceptanceInfo,
  CommitSampleAcceptInfo,
  GetQuestions,
  AnswerQuestion
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
  DeleteFile = "DeleteFile",
  CommitMailInfo = "CommitMailInfo",
  GetQuestionList = "GetQuestionList",
  AnswerQuestion = "AnswerQuestion"
}

export default {
  // 初始化
  [ActionTypes.Init](store: Store, params: InitInfo) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, params);
  },

  // 获取样件
  async [ActionTypes.GetPrototype](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo } = state;
      const { type, id } = initInfo || {};
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          break;
        case Supplier.Machining:
          fn = await GetSampleAcceptanceInfo({ supplierOrderId: id });
          break;
        case Supplier.Injection:
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        const { customerQuestions } = data || {};
        const questionList = (ls => {
          for (const [a, b] of ls.entries()) {
            const { problemApprovalLogs = [] } = b;
            ls[a].reason = (list => {
              let reason = "";
              for (const [c, d] of list.entries()) {
                const { approvalType, description } = d;
                if (approvalType === 2) {
                  reason = description;
                }
              }
              return reason;
            })(problemApprovalLogs || [])
          }
          return ls;
        })(customerQuestions);
        commit(MutationTypes.UpdatePrototype, { ...(data || {}), questionList });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 更新订单号和快递公司
  [ActionTypes.UpdatePrototypeData](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { name, value, isPaste = false } = params || {};
    const { prototype, companyReturnIndex, companyReturnList } = state;
    const { reg } = companyReturnList[companyReturnIndex] || {};
    const { samplePostInfo } = prototype || {};
    if (name === "expressNum" && value) {
      if (new RegExp(reg).test(value)) {
        samplePostInfo[name] = isPaste ? (samplePostInfo[name] || "") + value : value;
      } else {
        ElMessage.error("请输入正确的快递号");
        samplePostInfo[name] = "";
      }
    } else {
      samplePostInfo[name] = isPaste ? (samplePostInfo[name] || "") + value : value;
    }
    commit(MutationTypes.UpdatePrototype, { samplePostInfo });
  },
  // 删除样件详情图片
  [ActionTypes.DeleteFile](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { prototype } = state;
    const { samplePostInfo } = prototype || {};
    const { sampleFiles } = samplePostInfo || {};
    sampleFiles.splice(index, 1);
    commit(MutationTypes.UpdatePrototype, { samplePostInfo });
  },
  

  // 提交邮寄信息
  async [ActionTypes.CommitMailInfo](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, prototype, companyReturnIndex, companyReturnList } = state;
      const { type, id } = initInfo || {};
      const { samplePostInfo } = prototype || {};
      const { expressNum, sampleConfirmation, sampleDesc, sampleFiles, sendType } = samplePostInfo || {};
      const { name } = companyReturnList[companyReturnIndex] || {};
      if (!name) {
        ElMessage.error("请选择快递公司！");
        return;
      }
      if (!expressNum) {
        ElMessage.error("请输入快递单号！");
        return;
      }
      const samplePostInfoTemp = {
        postCompany: name,
        postOrderNo: expressNum,
        sampleDesc,
        sampleFiles: sampleFiles.map((v: any) => v.fileId),
        sendType,
      };
      let fn = {};
      switch(type) {
        case Supplier.Dfm:
          break;
        case Supplier.Machining:
          fn = await CommitSampleAcceptInfo({ samplePostInfo: samplePostInfoTemp, supplierOrderId: id });
          break;
        case Supplier.Injection:
          break;
      }
      const { success, message, data }: any = fn;
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetPrototype);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 回答问题
  async [ActionTypes.AnswerQuestion](store: Store, params: any) {
    try {
      const { state, dispatch, commit } = store;
      const { initInfo, prototype } = state;
      const { questionList } = prototype || {};
      const { opinion = -1, index, replyContent = "" } = params || {};
      const { type, mouldProduceId } = initInfo || {};
      const { id, isRepair = -1, supplierAnswer} = questionList[index] || {};
      let fn = null;
      if (isRepair === null || isRepair === -1) {
        ElMessage.error("请选择是否需要修模");
        return;
      }
      if (opinion > -1) {
        if (opinion === 0 && !replyContent) {
          ElMessage.error("请输入不接受的理由");
          return;
        }
        fn = await AnswerQuestion({ needAdjust: isRepair, opinion, problemId: id, replyContent });
      } else {
        if (!supplierAnswer) {
          ElMessage.error("请输入分析内容和改善建议");
          return;
        }
        fn = await AnswerQuestion({ needAdjust: isRepair, opinion: 1, problemId: id, replyContent: supplierAnswer });
      }
      
      const { success, message, data }: any = fn;
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetPrototype);
        dispatch("order/GetCountdown", null, { root: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}