import { Dictionary } from 'vue-router/types/router';

// 状态管理对象
export interface RootState {
  logInfo: LogInfo;
  userInfo: UserInfo;
  verificationCodeNumber: number;
  loginNavIndex: number;
  loginNavList: Array<LoginNav>;
  isCheckProtocol: boolean;
  isShowProtocol: boolean;
  registerNavIndex: number;
  registerNavList: Array<RegisterNav>;
  navigationIndex: number;
  navigationList: Navigation[];
};

// 登录信息
export interface LogInfo {
  accessToken: string;
  isExist: boolean;
  openId: string;
}

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
  logInfo: {
    accessToken: "",
    isExist: false,
    openId: "",
  },
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
      path: "/orderHome",
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
          path: "/account/information",
          query: {},
        },
        {
          id: "4_2",
          text: "资质申请",
          icon: "",
          path: "/account/application",
          query: {},
        },
        // {
        //   id: "4_3",
        //   text: "子账号管理",
        //   icon: "",
        //   path: "/account/management",
        //   query: {},
        // },
      ]
    },
  ],
};
export default state;
