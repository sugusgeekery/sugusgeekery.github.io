import { RootState } from "@/store/state";
import rootGetters, { RootGetterTypes } from "@/store/getters";
import { State, Supplier } from "./state";
import getters, { GetterTypes } from "./getters";
import { MutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { ElMessage, ElLoading } from "element-plus";
import { getSessionStorage, setSessionStorage } from "@/utils/storage";
import { BASE_IMAGE_URL } from "@/config";
import downloadByUrl from "@/utils/downloadByUrl";

import {
  GetMouldOrderType,
  GetOrderStatus,
} from "@/api";
import {
  GetMyBidAdvantage,
  GetOrderList,
  GetCountdown,
  ExportDfm,
  GetMould,
  NeedChangeDrawing,
  DfmApprovalDrawing,
  GetArrangementScheme,
  GetContact,
} from "@/api/order";

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
  GetMouldOrderType = "GetMouldOrderType",
  GetOrderStatus = "GetOrderStatus",
  GetMyBidAdvantage = "GetMyBidAdvantage",
  GetOrderList = "GetOrderList",
  UpdatePageNum = "UpdatePageNum",
  UpdatePageSize = "UpdatePageSize",
  UpdateProjectIndex = "UpdateProjectIndex",
  UpdateStatusIndex = "UpdateStatusIndex",
  UpdateOrderNo = "UpdateOrderNo",
  GetOrderDetail = "GetOrderDetail",
  UpdateNavigationIndex = "UpdateNavigationIndex",

  GetCountdown = "GetCountdown",
  ExportDfm = "ExportDfm",
  GetMould = "GetMould",
  NeedChangeDrawing = "NeedChangeDrawing",
  DfmApprovalDrawing = "DfmApprovalDrawing",
  GetArrangementScheme = "GetArrangementScheme",
  GetContact = "GetContact",
}

export default {
  // 初始化模块默认值
  [ActionTypes.Init](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateInitInfo, { ...(params || {}) });
  },

  // 获取订单类型筛选项
  async [ActionTypes.GetMouldOrderType](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetMouldOrderType();
      if (success) {
        const projectList = (list => {
          const arr = [
            {
              text: "项目类型",
              type: "",
            },
          ];
          for (const [a, b] of list.entries()) {
            const { index, label } = b;
            arr.push({ text: label, type: index });
          }
          return arr;
        })(data || {});
        commit(MutationTypes.UpdateOrder, { projectList });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取订单状态筛选项
  async [ActionTypes.GetOrderStatus](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetOrderStatus();
      if (success) {
        const statusList = (list => {
          const arr = [
            {
              text: "全部状态",
              status: "",
            },
          ];
          for (const [a, b] of list.entries()) {
            const { index, label } = b;
            arr.push({ text: label, status: index });
          }
          return arr;
        })(data || {});
        commit(MutationTypes.UpdateOrder, { statusList });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取竞价指标
  async [ActionTypes.GetMyBidAdvantage](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { success, message, data }: any = await GetMyBidAdvantage();
      if (success) {
        const { accuracy, anerror } = data || {};
        commit(MutationTypes.UpdateAdvantage, { accuracy, anerror });
        dispatch(ActionTypes.GetMouldOrderType);
        dispatch(ActionTypes.GetOrderStatus);
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取订单列表
  async [ActionTypes.GetOrderList](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { pageNum = 1, pageSize = 10, orderNo = "", projectIndex = 0, projectList = [], statusIndex = 0, statusList = [] } = order;
      const { type = "" } = projectList[projectIndex] || {};
      const { status = "" } = statusList[statusIndex] || {};
      const { success, message, data }: any = await GetOrderList({ pageNum, pageSize, status, type, param: orderNo });
      if (success) {
        const { list = [], total } = data || {};
        commit(MutationTypes.UpdateOrder, { list, total: Number(total) });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新订单页码
  [ActionTypes.UpdatePageNum](store: Store, pageNum: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { pageNum });
    dispatch(ActionTypes.GetOrderList);
  },
  // 更新竞订单每页条数
  [ActionTypes.UpdatePageSize](store: Store, pageSize: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { pageSize });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新订单项目类型下标
  [ActionTypes.UpdateProjectIndex](store: Store, projectIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { projectIndex });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新订单全部状态下标
  [ActionTypes.UpdateStatusIndex](store: Store, statusIndex: number) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { statusIndex });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },
  // 更新订单搜索内容
  [ActionTypes.UpdateOrderNo](store: Store, orderNo: string) {
    const { state, dispatch, commit } = store;
    commit(MutationTypes.UpdateOrder, { orderNo });
    dispatch(ActionTypes.UpdatePageNum, 1);
  },

  // 跳转到订单详情
  [ActionTypes.GetOrderDetail](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { order } = state;
    const { list = [] } = order || {};
    const { type, mouldStatus = 1 } = list[index] || {};
    commit(MutationTypes.UpdateOrder, { index });
    const navigationList = [];
    switch(type) {
      case Supplier.Dfm:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告",
            path: "/order/report",
            sequenceNumber: 1,
            status: mouldStatus > 1 ? 2 : mouldStatus === 1 ? 1 : 0
          },
        ]);
        break;
      case Supplier.Design:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告",
            path: "/order/report",
            sequenceNumber: 1,
            status: mouldStatus > 1 ? 2 : mouldStatus === 1 ? 1 : 0
          },
          {
            text: "方案设计",
            path: "/order/design",
            sequenceNumber: 2,
            status: mouldStatus > 2 ? 2 : mouldStatus === 2 ? 1 : 0
          },
        ]);
        break;
      case Supplier.Machining:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        dispatch("order/process/Init", {...list[index]}, { root: true });
        dispatch("order/prototype/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告验收",
            path: "/order/report",
            sequenceNumber: 1,
            status: mouldStatus > 1 ? 2 : mouldStatus === 1 ? 1 : 0
          },
          {
            text: "设计验收",
            path: "/order/design",
            sequenceNumber: 2,
            status: mouldStatus > 2 ? 2 : mouldStatus === 2 ? 1 : 0
          },
          {
            text: "加工",
            path: "/order/process",
            sequenceNumber: 3,
            status: mouldStatus > 3 ? 2 : mouldStatus === 3 ? 1 : 0
          },
          {
            text: "样件验收",
            path: "/order/prototype",
            sequenceNumber: 4,
            status: mouldStatus > 5 ? 2 : mouldStatus === 5 ? 1 : 0
          },
        ]);
        break;
      case Supplier.Injection:
        dispatch("order/report/Init", {...list[index]}, { root: true });
        dispatch("order/design/Init", {...list[index]}, { root: true });
        dispatch("order/process/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "DFM报告验收",
            path: "/order/report",
            sequenceNumber: 1,
            status: mouldStatus > 1 ? 2 : mouldStatus === 1 ? 1 : 0
          },
          {
            text: "设计验收",
            path: "/order/design",
            sequenceNumber: 2,
            status: mouldStatus > 2 ? 2 : mouldStatus === 2 ? 1 : 0
          },
          {
            text: "试模",
            path: "/order/process",
            sequenceNumber: 3,
            status: mouldStatus > 4 ? 2 : mouldStatus === 4 ? 1 : 0
          },
        ]);
        break;
      case Supplier.Hotrunner:
        dispatch("order/design/Init", {...list[index]}, { root: true });
        navigationList.push(...[
          {
            text: "方案设计",
            path: "/order/design",
            sequenceNumber: 1,
            status: mouldStatus > 1 ? 2 : mouldStatus === 1 ? 1 : 0
          },
        ]);
        break;
    }
    const navigationIndex = (ls => {
      let index = -1;
      if (ls && ls.length) {
        for (const [a, b] of ls.entries()) {
          const { status } = b;
          if (status === 1) {
            return a;
          } else if (status === 2) {
            index = a;
          } else {
            break;
          }
        }
      }
      return index;
    })(navigationList);
    commit(MutationTypes.UpdateNavigationList, navigationList);
    dispatch(ActionTypes.UpdateNavigationIndex, navigationIndex);
  },
  // 导航跳转
  [ActionTypes.UpdateNavigationIndex](store: Store, navigationIndex: number) {
    const { state, dispatch, commit } = store;
    const { navigationList = [] } = state;
    const { path, status = 0 } = navigationList[navigationIndex] || {};
    if (!status) {
      ElMessage.error("还未到该步骤！");
      return;
    }
    commit(MutationTypes.UpdateNavigationIndex, navigationIndex);
    router.push({ path });
  },

  // 获取倒计时
  async [ActionTypes.GetCountdown](store: Store, isDownTime: boolean = true) {
    try {
      const { state, dispatch, commit } = store;
      const { order, countdown } = state;
      const { list = [], index = -1 } = order || {};
      const { id } = list[index] || {};
      const { success, message, data }: any = await GetCountdown({ orderId: id });
      if (success) {
        const tempCountdown = { ...countdown, ...(data || {})};
        const fn = (countdown: CountdownTypes) => {
          const { remainSeconds } = countdown;
          const timeNumber = Math.abs(remainSeconds);
          countdown.isTimeout = remainSeconds < 0;
          countdown.hour = Math.floor(timeNumber / (60 * 60));
          countdown.minute = Math.floor((timeNumber % (60 * 60)) / 60);
          countdown.second = timeNumber % 60;
          commit(MutationTypes.UpdateCountdown, { ...countdown });
        };
        fn(tempCountdown);
        if (tempCountdown.setTimeInterval) {
          clearInterval(tempCountdown.setTimeInterval);
        }
        if (isDownTime && tempCountdown.state === 0) {
          tempCountdown.setTimeInterval = setInterval(() => {
            tempCountdown.remainSeconds--;
            fn(tempCountdown);
          }, 1000);
          commit(MutationTypes.UpdateCountdown, { ...tempCountdown });
        }
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取联系方式
  async [ActionTypes.GetContact](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { list = [], index = -1 } = order || {};
      const { orderNo, type } = list[index] || {};
      if (Supplier.Dfm !== type || !orderNo) {
        commit(MutationTypes.UpdateContact, []);
        return;
      }
      const { success, message, data }: any = await GetContact({ orderNo });
      if (success) {
        commit(MutationTypes.UpdateContact, data || []);
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 下载dfm报告
  async [ActionTypes.ExportDfm](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { list = [], index = -1 } = order || {};
      const { id } = list[index] || {};
      if (!id) {
        return;
      }
      const elLoading = ElLoading.service({
        lock: true,
        text: '下载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const { success, message, data }: any = await ExportDfm({ supplierOrderId: id });
      if (success) {
        if (data) {
          downloadByUrl(BASE_IMAGE_URL + data, data);
        }
      } else {
        ElMessage.error(message);
      }
      elLoading.close();
    } catch (e) {
      throw new Error(e);
    }
  },

  // 获取模具产品信息
  async [ActionTypes.GetMould](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { order } = state;
      const { list = [], index = -1 } = order || {};
      const { id } = list[index] || {};
      const { success, message, data }: any = await GetMould({ orderId: id });
      if (success) {
        commit(MutationTypes.UpdateMould, data || {});
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新图纸
  async [ActionTypes.NeedChangeDrawing](store: Store, params: { opinion: number; index: number }) {
    try {
      const { state, dispatch, commit } = store;
      const { mould } = state;
      const { index = -1 } = params || {};
      const { mouldProductList = [] } = mould || {};
      const { productId = "" } = mouldProductList[index] || {};
      const { success, message, data }: any = await NeedChangeDrawing({ productId });
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetMould);
        dispatch(ActionTypes.GetCountdown);
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 确认驳回图纸
  async [ActionTypes.DfmApprovalDrawing](store: Store, params: { opinion: number; index: number }) {
    try {
      const { state, dispatch, commit } = store;
      const { mould } = state;
      const { opinion = -1, index = -1 } = params || {};
      const { mouldProductList = [] } = mould || {};
      const { productId = "" } = mouldProductList[index] || {};
      const { success, message, data }: any = await DfmApprovalDrawing({ productId, opinion });
      if (success) {
        ElMessage.success(message);
        dispatch(ActionTypes.GetMould);
        dispatch(ActionTypes.GetCountdown);
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 获取合模方案
  async [ActionTypes.GetArrangementScheme](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { mould } = state;
      const { mouldId } = mould || {};
      const { success, message, data }: any = await GetArrangementScheme({ orderMouldId: mouldId });
      if (success) {
        const temp = data || {};
        const { matchedPlan } = temp || {};
        const { mouldLabeImage } = matchedPlan || {};
        let mouldLabeImages = mouldLabeImage ? mouldLabeImage.split(",") : [];
        if (mouldLabeImages.length) {
          mouldLabeImages = mouldLabeImages.map((v: string) => BASE_IMAGE_URL + v);
        }
        commit(MutationTypes.UpdateArrangementScheme, { ...temp, mouldLabeImages, isShow: true });
      } else {
        ElMessage.error(message);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
}