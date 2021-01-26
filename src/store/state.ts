import { Dictionary } from 'vue-router/types/router';

const icon = require("../assets/images/headicon.png");




// 我的信息
export interface MyInfo {
  userId: string;
  userName: string;
  imgUrl: string;
  homeworkRemind: number;
  problemRemind: number;
  lessonRemind: number;
  eyeCareTime: string;
  phone: string;
  easemobName: string;
  canCorrect: number;
  childList: ChildList[];
}

// 孩子列表
export interface ChildList {
  subject?: string;
  knowledgePointMasteryList?: KnowledgePointMasteryList[];
  vipId: string;
  childName: string;
  imgUrl: string;
  sex: string;
  derver: string;
  qrCodeImg: string;
  easemobName: string;
  isZybService: number;
  zybServiceList: number[];
  isLessonService: number;
  isGroupService: number;
  isBindMaster: number;
  isMain: number;
}

// 知识点列表
export interface KnowledgeList {
  knowledgeName: string;
  questionList: QuestionList[];
}

// 题目列表
export interface QuestionList {
  question:	string;
  difficulty:	number;
  optionType:	string;
  analysis:	string;
  optionAnswer:	string;
  questionJson: QuestionJson[];
  analysisJson: AnalysisJson[];
  answerJson: AnswerJson[];
  childList: QuestionList[];
}

// 题目JSON
export interface QuestionJson {
  type: number;
  value: string;
  style: {
    width?: number;
    height?: number;
    percentWidth?: number;
    percentHeight?: number;
  }
}

// 题目JSON
export interface AnalysisJson {
  index: number;
  list: QuestionJson[];
}

// 题目JSON
export interface AnswerJson {
  index: number;
  list: QuestionJson[];
}

// 知识点掌握情况
export interface KnowledgePointMasteryList {
  knowledgeName: string;
  mastery: number;
  wrongCount: number;
  knowHowDetailList: KnowHowDetailList[];
}
// 知识点掌握情况详情
export interface KnowHowDetailList {
  knowHowDetailId: string;
  knowledgeVersion: string;
}

// 提分训练
export interface TrainRecommendType {
  initStatus: number;
  accessToken: string;
  platform: string;
  permission: number;
  vipId: string;
  subject: string;
  knowledgePointMasteryList: KnowledgePointMasteryList[],
  beginTime: string;
  endTime: string;
  isShowQuestion: number;
  isShowAnalysis: number;
  isShowAnswer: number;
  hasMore: number;
  isLoading: boolean;
  distance: number;
  pages: number;
  knowledgeList: KnowledgeList[];
}

// 每周同步训练
export interface WeeklySynchronousTrainType {
  initStatus: number;
  accessToken: string;
  platform: string;
  permission: number;
  vipId: string;
  subject: string;
  knowledgePointMasteryList: KnowledgePointMasteryList[],
  isShowQuestion: number;
  isShowAnalysis: number;
  isShowAnswer: number;
  hasMore: number;
  isLoading: boolean;
  distance: number;
  pages: number;
  knowledgeList: KnowledgeList[];
  knowledgeListChinese: KnowledgeList[];
  knowledgeListMath: KnowledgeList[];
  knowledgeListEnglish: KnowledgeList[];
}

// 定制冲刺
export interface CustomizedSprintPaperType {
  initStatus: number;
  accessToken: string;
  platform: string;
  permission: number;
  vipId: string;
  type: number;
  subject: string;
  isShowAnalysis: number;
  list: CustomizedSprintPaperList[];
}

// 定制冲刺题目列表
export interface CustomizedSprintPaperList {
  subject: string;
  bigQuestionList: BigQuestionList[];
}

// 定制冲刺大题目
export interface BigQuestionList {
  smallQuestionList: SmallQuestionList[];
}

// 定制冲刺小题目
export interface SmallQuestionList {
  questionImage: string;
  questionIndex: string;
  questionJson: QuestionJson[];
}

// 错题本
export interface WrongBookType {
  initStatus: number;
  accessToken: string;
  platform: string;
  permission: number;
  questionList: WrongBookList[];
}

// 错题本题目列表
export interface WrongBookList {
  questionType: number;
  questionSize: number;
  questionJson: QuestionJson[];
}

// 状态管理对象
export interface RootState {
  accessToken: string;
  userInfo: UserInfo;
  verificationCodeNumber: number;
  loginNavIndex: number;
  loginNavList: Array<LoginNav>;
  isCheckProtocol: boolean;
  isShowProtocol: boolean;
  registerWxCode: string;
  registerNavIndex: number;
  registerNavList: Array<RegisterNav>;
  navigationIndex: number;
  navigationList: Navigation[];

  platform: string;
  myInfo: MyInfo;
  childInfo: ChildList;
  trainRecommend: TrainRecommendType;
  weeklySynchronousTrain: WeeklySynchronousTrainType;
  customizedSprintPaper: CustomizedSprintPaperType;
  wrongBook: WrongBookType;
};

// 用户信息
export interface UserInfo {

}
// 登录列表类型
export interface LoginNav {
  text: string;
}
// 注册列表类型
export interface RegisterNav {
  text: string;
}
// 导航栏
export interface Navigation {
  id: string;
  text: string;
  icon: string;
  path: string;
  query: Dictionary<string>;
  itemIndex?: number;
  itemList?: Array<Navigation>;
};

const state: RootState = {
  accessToken: "",
  userInfo: {},
  verificationCodeNumber: 0,
  loginNavIndex: 0,
  loginNavList: [
    {
      text: "扫码登录"
    },
    {
      text: "验证码登录"
    }
  ],
  isCheckProtocol: true,
  isShowProtocol: false,
  registerWxCode: "",
  registerNavIndex: 0,
  registerNavList: [
    {
      text: "微信授权"
    },
    {
      text: "信息填写"
    },
    {
      text: "开通成功"
    },
  ],
  navigationIndex: 0,
  navigationList: [
    {
      id: "1",
      text: "首页",
      icon: require("../assets/images/n_home.png"),
      path: "/home",
      query: {},
      itemIndex: -1,
      itemList: []
    },
    {
      id: "2",
      text: "订单中心",
      icon: require("../assets/images/n_order.png"),
      path: "/order",
      query: {},
      itemIndex: -1,
      itemList: []
    },
    {
      id: "3",
      text: "竞价",
      icon: require("../assets/images/n_bidding.png"),
      path: "/bidding",
      query: {},
      itemIndex: -1,
      itemList: []
    },
    {
      id: "4",
      text: "账号管理",
      icon: require("../assets/images/n_account.png"),
      path: "/account",
      query: {},
      itemIndex: -1,
      itemList: [
        {
          id: "4_1",
          text: "资料信息",
          icon: "",
          path: "/account/infomation",
          query: {},
        },
        {
          id: "4_2",
          text: "资质申请",
          icon: "",
          path: "/account/application",
          query: {},
        },
        {
          id: "4_3",
          text: "子账号管理",
          icon: "",
          path: "/account/management",
          query: {},
        },
      ]
    },
  ],


  platform: "",
  
  // navigationIndex: 0,
  // navigationList: [
  //   {
  //     id: 1,
  //     text: "首页",
  //     icon,
  //     path: "/home",
  //     query: {}
  //   },
  //   {
  //     id: 2,
  //     text: "我的",
  //     icon,
  //     path: "/mine",
  //     query: {}
  //   },
  //   {
  //     id: 11,
  //     text: "登录页",
  //     icon,
  //     path: "/login",
  //     query: {}
  //   },
  //   {
  //     id: 21,
  //     text: "提分训练",
  //     icon,
  //     path: "/train-recommend",
  //     query: {}
  //   },
  //   {
  //     id: 22,
  //     text: "每周同步训练",
  //     icon,
  //     path: "/weekly-synchronous-train",
  //     query: {}
  //   },
  //   {
  //     id: 23,
  //     text: "定制冲刺",
  //     icon,
  //     path: "/customized-sprint-paper",
  //     query: {}
  //   },
  //   {
  //     id: 24,
  //     text: "错题本",
  //     icon,
  //     path: "/wrong-book",
  //     query: {}
  //   },
  // ],
  myInfo: {
    userId: "",
    userName: "",
    imgUrl: "",
    homeworkRemind: 0,
    problemRemind: 0,
    lessonRemind: 0,
    eyeCareTime: "",
    phone: "",
    easemobName: "",
    canCorrect: 0,
    childList: []
  },
  childInfo: {
    subject: "语文",
    knowledgePointMasteryList: [],
    vipId: "",
    childName: "",
    imgUrl: "",
    sex: "",
    derver: "",
    qrCodeImg: "",
    easemobName: "",
    isZybService: 0,
    zybServiceList: [],
    isLessonService: 0,
    isGroupService: 0,
    isBindMaster: 0,
    isMain: 0
  },
  // 提分训练
  trainRecommend: {
    initStatus: 0,
    accessToken: "",
    platform: "",
    permission: 1,
    vipId: "",
    subject: "",
    knowledgePointMasteryList: [],
    beginTime: "",
    endTime: "",
    isShowQuestion: 1,
    isShowAnalysis: 0,
    isShowAnswer: 1,
    hasMore: 0,
    isLoading: false,
    distance: 100,
    pages: 0,
    knowledgeList: []
  },
  // 每周同步训练
  weeklySynchronousTrain: {
    initStatus: 0,
    accessToken: "",
    platform: "",
    permission: 1,
    vipId: "",
    subject: "",
    knowledgePointMasteryList: [],
    isShowQuestion: 1,
    isShowAnalysis: 0,
    isShowAnswer: 1,
    hasMore: 0,
    isLoading: false,
    distance: 100,
    pages: 0,
    knowledgeList: [],
    knowledgeListChinese: [],
    knowledgeListMath: [],
    knowledgeListEnglish: []
  },
  // 定制冲刺
  customizedSprintPaper: {
    initStatus: 0,
    accessToken: "",
    platform: "",
    permission: 1,
    vipId: "",
    type: 0,
    subject: "",
    isShowAnalysis: 0,
    list: []
  },
  // 错题本
  wrongBook: {
    initStatus: 0,
    accessToken: "",
    platform: "",
    permission: 1,
    questionList: []
  }
};
export default state;
