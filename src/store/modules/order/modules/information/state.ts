
export interface State {
  mouldNo: string;
  navigationIndex: number;
  navigationList: Array<NavigationList>;
};

export interface NavigationList {
  text: string;
  path: string;
}

const state: State = {
  mouldNo: "",
  navigationIndex: 1,
  navigationList: [
    {
      text: "DFM报告",
      path: "/order/DFM/report",
    },
    {
      text: "方案设计",
      path: "/order/DFM/design",
    },
    {
      text: "模具信息",
      path: "/order/DFM/information",
    },
  ],
};

export default state;