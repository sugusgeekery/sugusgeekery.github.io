
import { RootState } from "./state";
import rootGetters, { RootGetterTypes } from "./getters";
import { RootMutationTypes } from "./mutations";
import { Dispatch, Commit, GetterTree } from "vuex";

import router from "@/router";
import { Message, MessageBox } from "element-ui";

import { INTERFACE_ERROR_TEXT, VERIFICATION_CODE_NUMBER } from "@/config";
import { _url2xml2file } from "@/utils/util";
import Vue from "@/main";

import {
  VerificationCodeLogin,
  GetVerificationCode,
  WechatLogin,
  Register,

  GetMyInfo,
  GetLearningGrowthReport,
  GetTrainRecommendQuestionList,
  GetTrainRecommendQuestionListTeacher,
  GetWeeklySynchronousTrainQuestionList,
  GetWeeklySynchronousTrainQuestionListTeacher,
  GetCustomizedSprintPaper,
  GetCustomizedSprintPaperTeacher,
} from "@/api";

interface Store {
  state: RootState;
  getters: GetterTree<RootState, RootState>;
  commit: Commit;
  dispatch: Dispatch;
}

export enum RootActionTypes {
  GetVerificationCode = "GetVerificationCode",
  UpdateVerificationCodeNumber = "UpdateVerificationCodeNumber",
  VerificationCodelogin = "VerificationCodelogin",
  WechatLogin = "WechatLogin",
  Register = "Register",
  UpdateNavigationIndex = "UpdateNavigationIndex",
}

// 提分训练，每周同步训练，对图片具体宽高度值转化成百分比数值
const knowledgeWidthOrHeightToPercent = async function (list: any) {
  const widthArray: number[] = [];
  const heightArray: number[] = [];
  for (const b of list) {
    for (const d of b.questionList) {
      const { questionJson } = d;
      for (const d1 of questionJson) {
        const { style } = d1;
        const { width = 0, height = 0 } = style;
        widthArray.push(width);
        heightArray.push(height);
      }
      for (const f of d.childList) {
        const { questionJson } = f;
        for (const d1 of questionJson) {
          const { style } = d1;
          const { width = 0, height = 0 } = style;
          widthArray.push(width);
          heightArray.push(height);
        }
      }
    }
  }
  const maxWidth: number = Math.max(...widthArray);
  const maxHeight: number = Math.max(...heightArray);
  for (const [a, b] of list.entries()) {
    for (const [c, d] of b.questionList.entries()) {
      const { questionJson } = d;
      for (const [c1, d1] of questionJson.entries()) {
        const { style, type, value } = d1;
        const { width = 0, height = 0 } = style;
        list[a].questionList[c].questionJson[c1].style.percentWidth = (width / maxWidth * 100).toFixed(4);
        list[a].questionList[c].questionJson[c1].style.percentHeight = (height / maxHeight * 100).toFixed(4);
        // if (type === 2) {
        //   const { file } = await _url2xml2file(value, 1);
        //   list[a].questionList[c].questionJson[c1].value = file;
        // }
      }
      for (const [e, f] of d.childList.entries()) {
        const { questionJson } = f;
        for (const [c1, d1] of questionJson.entries()) {
          const { style, type, value } = d1;
          const { width = 0, height = 0 } = style;
          list[a].questionList[c].childList[e].questionJson[c1].style.percentWidth = (width / maxWidth * 100).toFixed(4);
          list[a].questionList[c].childList[e].questionJson[c1].style.percentHeight = (height / maxHeight * 100).toFixed(4);
          // if (type === 2) {
          //   const { file } = await _url2xml2file(value, 1);
          //   list[a].questionList[c].childList[e].questionJson[c1].value = file;
          // }
        }
      } 
    }
  }
  return list;
};

// 定制冲刺，对图片具体宽高度值转化成百分比数值
const paperWidthOrHeightToPercent = function (list: any) {
  const widthArray: number[] = [];
  const heightArray: number[] = [];
  for (const b of list) {
    for (const d of b.bigQuestionList) {
      for (const f of d.smallQuestionList) {
        const { questionJson } = f;
        for (const d1 of questionJson) {
          const { style } = d1;
          const { width = 0, height = 0 } = style;
          widthArray.push(width);
          heightArray.push(height);
        }
      }
    }
  }
  const maxWidth: number = Math.max(...widthArray);
  const maxHeight: number = Math.max(...heightArray);
  for (const [a, b] of list.entries()) {
    for (const [c, d] of b.bigQuestionList.entries()) {
      for (const [e, f] of d.smallQuestionList.entries()) {
        const { questionJson } = f;
        for (const [c1, d1] of questionJson.entries()) {
          const { style } = d1;
          const { width = 0, height = 0 } = style;
          list[a].bigQuestionList[c].smallQuestionList[e].questionJson[c1].style.percentWidth = (width / maxWidth * 100).toFixed(4);
          list[a].bigQuestionList[c].smallQuestionList[e].questionJson[c1].style.percentHeight = (height / maxHeight * 100).toFixed(4);
        }
      } 
    }
  }
  return list;
};

// 错题本，对图片具体宽高度值转化成百分比数值
const questionWidthOrHeightToPercent = function (list: any) {
  // 1：批改题；2：错原题：3：推荐题；
  const handleArray = [2, 3];
  const widthArray: number[] = [];
  const heightArray: number[] = [];
  for (const b of list) {
    const { questionJson, questionType } = b;
    if (questionJson && questionJson.length && handleArray.includes(questionType)) {
      for (const d1 of questionJson) {
        const { style } = d1;
        const { width = 0, height = 0 } = style;
        widthArray.push(width);
        heightArray.push(height);
      }
    }
  }
  const maxWidth: number = Math.max(...widthArray);
  const maxHeight: number = Math.max(...heightArray);
  for (const [a, b] of list.entries()) {
    const { questionJson, questionType } = b;
    if (questionJson && questionJson.length && handleArray.includes(questionType)) {
      for (const [c1, d1] of questionJson.entries()) {
        const { style } = d1;
        const { width = 0, height = 0 } = style;
        list[a].questionJson[c1].style.percentWidth = (width / maxWidth * 100).toFixed(4);
        list[a].questionJson[c1].style.percentHeight = (height / maxHeight * 100).toFixed(4);
      }
    }
  }
  return list;
};

export default {
  // 获取验证码
  async [RootActionTypes.GetVerificationCode](store: Store, parameter: any = {}) {
    try {
      const { dispatch } = store;
      const { phone = "", type = 1 } = parameter || {};
      if (!phone) {
        Message("请输入手机号");
        return
      }
      const { code = "000", msg }: any = await GetVerificationCode({ phone, type });
      if (code == "999") {
        Message.success(msg);
        dispatch(RootActionTypes.UpdateVerificationCodeNumber);
      } else {
        Message(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 更新验证码倒计时状态
  [RootActionTypes.UpdateVerificationCodeNumber](store: Store) {
    const { commit } = store;
    let verificationCodeNumber = VERIFICATION_CODE_NUMBER;
    const s = setInterval(() => {
      if (verificationCodeNumber) {
        verificationCodeNumber--;
        commit(RootMutationTypes.UpdateVerificationCodeNumber, verificationCodeNumber);
      } else {
        clearInterval(s);
      }
    }, 1000);
  },

  // 验证码登陆
  async [RootActionTypes.VerificationCodelogin](store: Store, parameter: { phone: string; code: string; }) {
    try {
      const { dispatch, commit } = store;
      const { code = "000", msg, data }: any = await VerificationCodeLogin(parameter);
      if (code == "999") {
        const { accessToken = "" } = data || {};
        commit("updateAccessToken", accessToken);
        dispatch("getMyInfo");
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  // 验证码登陆
  async [RootActionTypes.WechatLogin](store: Store, parameter: { jsCode: string; }) {
    try {
      const { dispatch, commit } = store;
      const { code = "000", msg, data }: any = await WechatLogin(parameter);
      if (code == "999") {
        const { accessToken = "" } = data || {};
        commit("updateAccessToken", accessToken);
        dispatch("getMyInfo");
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 注册
  async [RootActionTypes.Register](store: Store, parameter: { companyName: string; userName: string; phone: string; code: string; }) {
    try {
      const { dispatch, commit } = store;
      const { code = "000", msg, data }: any = await Register(parameter);
      if (code == "999") {
        const { accessToken = "" } = data || {};
        commit("updateAccessToken", accessToken);
        dispatch("getMyInfo");
      } else {
        Message.error(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 导航跳转
  [RootActionTypes.UpdateNavigationIndex](store: Store, parameter: { navigationIndex: number; itemIndex: number; }) {
    const { state, dispatch, commit } = store;
    const { navigationIndex = -1, itemIndex = -1 } = parameter || {};
    const { navigationList = [] } = state;
    const { itemList = [] } = navigationList[navigationIndex] || {};
    if (itemList.length > 0) {
      const { path, query } = itemList[itemIndex] || {};
      commit(RootMutationTypes.UpdateNavigationIndex, itemIndex);
      navigationList[navigationIndex].itemIndex = itemIndex;
      commit(RootMutationTypes.UpdateNavigationList, navigationList);
      router.push({ path, query });
    } else {
      const { path, query } = navigationList[navigationIndex] || {};
      commit(RootMutationTypes.UpdateNavigationIndex, itemIndex);
      navigationList[navigationIndex].itemIndex = itemIndex;
      router.push({ path, query });
    }
  },



  // 退出登录
  async ["logout"](store: Store) {
    const { commit } = store;
    commit("updateAccessToken", "");
    router.push("/");
  },

  // 获取我的信息
  async ["getMyInfo"](store: Store) {
    try {
      const { commit } = store;
      const { code = "000", msg, data }: any = await GetMyInfo();
      if (code == "999") {
        commit("updateMyInfo", data || {});
        router.push("/mine");
      } else {
        Message(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  // 路由跳转
  ["navigationTo"](store: Store, navigationIndex: number) {
    const { state } = store;
    const { navigationList = [] } = state;
    const { path = "", query } = navigationList[navigationIndex] || {};
    router.push({ path, query });
  },
  // 获取孩子信息
  ["getChildInfo"](store: Store, index: number) {
    const { state, dispatch, commit } = store;
    const { myInfo, accessToken } = state;
    const { childList = [] } = myInfo;
    const { vipId, subject = "数学" } = childList[index];
    commit("updateChildInfo", { ...childList[index], subject });
    router.push("/home");

    // 获取提分训练
    commit("updateTrainRecommend", { vipId, subject });
    dispatch("getLearningGrowthReport");

    // 初始化提分训练
    // dispatch("initTrainRecommend", { knowledgePointMasteryList: [], vipId, subject, accessToken, isShowAnalysis: 1, beginTime: "", endTime: "" });

    // 初始化每周同步训练
    // const dataWeeklySynchronousTrain = {isShowAnalysis:0,subject:"语文",vipId:"747726ec-d21f-4921-9339-ca795b4297f1",initStatus: 0,platform:"ANDROID", knowledgePointMasteryList: knowledgePointMasteryListJson};
    const dataWeeklySynchronousTrain = { vipId, subject, accessToken, isShowAnalysis: 1 };
    dispatch("initWeeklySynchronousTrain", dataWeeklySynchronousTrain);

    // 初始化定制冲刺
    dispatch("initCustomizedSprintPaper", { vipId, type: 2, accessToken });

    // 初始化错题本
    // const dataWrongBook = [];
    // const dataWrongBook = { questionList: [] };
    // dispatch("initWrongBook", dataWrongBook);
  },

  // 获取成长报告
  async ["getLearningGrowthReport"](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { childInfo } = state;
      const { vipId = "", subject } = childInfo;
      const { code = "000", msg, data }: any = await GetLearningGrowthReport({ vipId, subject });
      if (code == "999") {
        const { moduleList = [] } = data || {};
        const { knowledgePointMasteryList = [] } = moduleList[0] || {};
        commit("updateTrainRecommend", { knowledgePointMasteryList });
        dispatch("getTrainRecommendQuestionList", false);
      } else {
        Message(msg);
      }
    } catch (e) {
      throw new Error(e);
    }
  },


  /**
   * 通知APP端token已失效
   * @param {Store} store 默认为当前模块下状态存储对象
   * @param {Object} params accessToken: ""
   */
  ["notifyTokenExpired"](store: Store, params: any = {}) {
    const { state } = store;
    const { platform } = state;
    Vue.$nextTick(function() {
      if (platform === "ANDROID") {
        (window as any).android.tokenExpired(JSON.stringify(params));
      } else if (platform === "IOS") {
        (window as any).webkit.messageHandlers.tokenExpired.postMessage(params);
      }
    });
  },

  // 初始化提分训练
  ["initTrainRecommend"](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { trainRecommend } = state;
    const { knowledgeList = [] } = trainRecommend;
    const parameter = typeof params === "string" ? JSON.parse(params) : params;
    const { accessToken = "", platform = "" } = parameter || {};
    commit("updateAccessToken", accessToken);
    commit("updatePlatform", platform);
    commit("updateTrainRecommend", { ...parameter, initStatus: 0 });
    dispatch("getTrainRecommendQuestionList");
  },
  // 获取提分训练
  async ["getTrainRecommendQuestionList"](store: Store, shouldLoadMore: boolean = false) {
    try {
      const { state, dispatch, commit } = store;
      const { trainRecommend } = state;
      const { permission, vipId = "", subject, knowledgePointMasteryList, beginTime, endTime, knowledgeList = [] } = trainRecommend;
      if (shouldLoadMore && !(knowledgePointMasteryList && knowledgePointMasteryList.length)) {
        return;
      }
      commit("updateTrainRecommend", { isLoading: true });
      const { code = "000", msg, data }: any = await (
        permission === 2 ?
        GetTrainRecommendQuestionListTeacher :
        GetTrainRecommendQuestionList
      )({ vipId, subject, knowledgePointMasteryList, beginTime, endTime });
      if (code == "999") {
        const { knowledgePointMasteryList = [] } = data || {};
        const knowledgeListTemp = shouldLoadMore ? [...knowledgeList, ...data?.knowledgeList] : data?.knowledgeList;
        // const knowledgeListTemp = knowledgeListJson2;
        const newKnowledgeList = await knowledgeWidthOrHeightToPercent(knowledgeListTemp);
        commit("updateTrainRecommend", { 
          knowledgePointMasteryList, 
          hasMore: knowledgePointMasteryList.length, 
          knowledgeList: newKnowledgeList, 
          isLoading: false,
          initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 2
        });
        dispatch("notifyTrainRecommendData", { initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 0 });
      } else {
        Message(msg);
        commit("updateTrainRecommend", { isLoading: false, initStatus: 2 });
        dispatch("notifyTrainRecommendData", { initStatus: 0 });
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  /**
   * 通知APP端获取提分训练状态
   * @param {Store} store 默认为当前模块下状态存储对象
   * @param {Object} params initStatus: 1：有数据；0：无数据（默认）
   */
  ["notifyTrainRecommendData"](store: Store, params: any = {}) {
    const { state } = store;
    const { trainRecommend } = state;
    const { platform } = trainRecommend;
    Vue.$nextTick(function() {
      if (platform === "ANDROID") {
        // const HTMLCode = window.document.getElementsByTagName('html')[0].innerHTML;
        (window as any).android.trainRecommendData(JSON.stringify({ ...params }));
      } else if (platform === "IOS") {
        (window as any).webkit.messageHandlers.trainRecommendData.postMessage(params);
      }
    });
  },

  // 初始化每周同步训练
  ["initWeeklySynchronousTrain"](store: Store, params: any) {
    const { state, dispatch, commit } = store;
    const { weeklySynchronousTrain } = state;
    const { knowledgeList = [], knowledgeListChinese = [], knowledgeListMath = [], knowledgeListEnglish = [] } = weeklySynchronousTrain;
    const parameter = typeof params === "string" ? JSON.parse(params) : params;
    const { accessToken = "", platform = "", subject = "" } = parameter || {};
    commit("updateAccessToken", accessToken);
    commit("updatePlatform", platform);
    commit("updateWeeklySynchronousTrain", { ...parameter, initStatus: 0 });
    if (
      !(knowledgeList && knowledgeList.length) ||
      subject === "语文" && !(knowledgeListChinese && knowledgeListChinese.length) ||
      subject === "数学" && !(knowledgeListMath && knowledgeListMath.length) ||
      subject === "英语" && !(knowledgeListEnglish && knowledgeListEnglish.length)
    ) {
      dispatch("getWeeklySynchronousTrainQuestionList", false);
    }
  },
  // 获取每周同步训练
  async ["getWeeklySynchronousTrainQuestionList"](store: Store, shouldLoadMore: boolean = false) {
    try {
      const { state, dispatch, commit } = store;
      const { weeklySynchronousTrain } = state;
      const {
        permission,
        vipId = "", 
        subject = "",
        knowledgePointMasteryList = [], 
        knowledgeList = [],
        knowledgeListChinese = [],
        knowledgeListMath = [],
        knowledgeListEnglish = []
      } = weeklySynchronousTrain || {};
      if (shouldLoadMore && !(knowledgePointMasteryList && knowledgePointMasteryList.length)) {
        return;
      }
      commit("updateWeeklySynchronousTrain", { isLoading: true });
      const { code = "000", msg, data }: any = await (
        permission === 2 ?
        GetWeeklySynchronousTrainQuestionListTeacher :
        GetWeeklySynchronousTrainQuestionList
      )({ vipId, subject, knowledgePointMasteryList });
      if (code == "999") {
        const { knowledgePointMasteryList = [] } = data || {};
        const knowledgeListTemp = shouldLoadMore ? [...knowledgeList, ...data?.knowledgeList] : data?.knowledgeList;
        const newKnowledgeList = await knowledgeWidthOrHeightToPercent(knowledgeListTemp);
        commit("updateWeeklySynchronousTrain", { 
          knowledgePointMasteryList, 
          hasMore: knowledgePointMasteryList.length, 
          knowledgeList: newKnowledgeList, 
          isLoading: false,
          initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 2
        });
        dispatch("notifyWeeklySynchronousTrainData", { initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 0 });
      } else {
        Message(msg);
        commit("updateWeeklySynchronousTrain", { isLoading: false, initStatus: 2 });
        dispatch("notifyWeeklySynchronousTrainData", { initStatus: 0 });
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  /**
   * 通知APP端获取每周同步训练状态
   * @param {Store} store 默认为当前模块下状态存储对象
   * @param {Object} params initStatus: 1：有数据；0：无数据（默认）
   */
  ["notifyWeeklySynchronousTrainData"](store: Store, params: any = {}) {
    const { state } = store;
    const { weeklySynchronousTrain } = state;
    const { platform } = weeklySynchronousTrain;
    Vue.$nextTick(function() {
      if (platform === "ANDROID") {
        (window as any).android.weeklySynchronousTrainData(JSON.stringify(params));
      } else if (platform === "IOS") {
        (window as any).webkit.messageHandlers.weeklySynchronousTrainData.postMessage(params);
      }
    });
  },

  // 初始化定制冲刺
  ["initCustomizedSprintPaper"](store: Store, params: any) {
    const { dispatch, commit } = store;
    const parameter = typeof params === "string" ? JSON.parse(params) : params;
    const { accessToken = "", platform = "" } = parameter || {};
    commit("updateAccessToken", accessToken);
    commit("updatePlatform", platform);
    commit("updateCustomizedSprintPaper", { ...parameter, initStatus: 0 });
    dispatch("getCustomizedSprintPaper");
  },
  // 获取定制冲刺
  async ["getCustomizedSprintPaper"](store: Store) {
    try {
      const { state, dispatch, commit } = store;
      const { customizedSprintPaper } = state;
      const { permission, vipId = "", type = 0, subject } = customizedSprintPaper;
      const { code = "000", msg, data }: any = await (
        permission === 2 ?
        GetCustomizedSprintPaperTeacher :
        GetCustomizedSprintPaper
      )({ vipId, type, subject });
      if (code == "999") {
        const { list = [] } = data || {};
        const newKnowledgeList = paperWidthOrHeightToPercent(list);
        commit("updateCustomizedSprintPaper", { 
          list: newKnowledgeList,
          initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 2
        });
        dispatch("notifyCustomizedSprintPaperData", { initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 0 });
      } else {
        Message(msg);
        commit("updateCustomizedSprintPaper", { initStatus: 2 });
        dispatch("notifyCustomizedSprintPaperData", { initStatus: 0 });
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  /**
   * 通知APP端获取定制冲刺状态
   * @param {Store} store 默认为当前模块下状态存储对象
   * @param {Object} params initStatus: 1：有数据；0：无数据（默认）
   */
  ["notifyCustomizedSprintPaperData"](store: Store, params: any = {}) {
    const { state } = store;
    const { customizedSprintPaper } = state;
    const { platform } = customizedSprintPaper;
    Vue.$nextTick(function() {
      if (platform === "ANDROID") {
        (window as any).android.customizedSprintPaperData(JSON.stringify(params));
      } else if (platform === "IOS") {
        (window as any).webkit.messageHandlers.customizedSprintPaperData.postMessage(params);
      }
    });
  },

  // 初始化错题本
  ["initWrongBook"](store: Store, params: any) {
    const { dispatch, commit } = store;
    const parameter = typeof params === "string" ? JSON.parse(params) : params;
    const { accessToken = "", platform = "" } = parameter || {};
    commit("updateAccessToken", accessToken);
    commit("updatePlatform", platform);
    commit("updateWrongBook", { ...parameter, initStatus: 0 });
    dispatch("getWrongBook");
  },
  // 获取错题本
  ["getWrongBook"](store: Store) {
    const { state, dispatch, commit } = store;
    const { wrongBook } = state;
    const { questionList = [] } = wrongBook;
    const newKnowledgeList = questionWidthOrHeightToPercent(questionList);
    commit("updateWrongBook", { 
      questionList: newKnowledgeList,
      initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 2
    });
    dispatch("notifyWrongBookData", { initStatus: newKnowledgeList && newKnowledgeList.length ? 1 : 0 });
  },
  /**
   * 通知APP端获取错题本状态
   * @param {Store} store 默认为当前模块下状态存储对象
   * @param {Object} params initStatus: 1：有数据；0：无数据（默认）
   */
  ["notifyWrongBookData"](store: Store, params: any = {}) {
    const { state } = store;
    const { wrongBook } = state;
    const { platform } = wrongBook;
    Vue.$nextTick(function() {
      if (platform === "ANDROID") {
        (window as any).android.wrongBookData(JSON.stringify(params));
      } else if (platform === "IOS") {
        (window as any).webkit.messageHandlers.wrongBookData.postMessage(params);
      }
    });
  },
};
